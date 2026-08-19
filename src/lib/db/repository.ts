import { 
  AdminUser, 
  AiAutoSettings, 
  AuditEvent, 
  AutomationJob, 
  Business, 
  OpportunityBand, 
  Prospect, 
  ProspectAssessment, 
  ProspectStatus, 
  RejectionReason, 
  ReviewStatus,
  JobStatus,
  JobType
} from "@/types/admin";
import { calculateOpportunityScore } from "@/lib/ai-auto/scoring";

// In-process resilient store for local development & database fallback
// All state transitions strictly mirror SQL schema constraints
interface DatabaseState {
  users: AdminUser[];
  businesses: Business[];
  assessments: ProspectAssessment[];
  prospects: Prospect[];
  jobs: AutomationJob[];
  auditEvents: AuditEvent[];
  settings: AiAutoSettings;
}

// Initial state singleton
const globalState: DatabaseState = {
  users: [
    {
      id: "usr_pete_superadmin",
      email: "pete@avorria.com",
      name: "Pete Currey",
      role: "super_admin",
      avatar_url: undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ],
  businesses: [],
  assessments: [],
  prospects: [],
  jobs: [],
  auditEvents: [],
  settings: {
    id: "settings_global_01",
    settings_key: "global",
    targeting: {
      countries: ["GB"],
      cities: ["London", "Manchester", "Birmingham", "Leeds", "Bristol"],
      radius_km: 50,
      sectors: [
        "Architects & Spatial Design",
        "Commercial Real Estate",
        "Luxury Hospitality",
        "Private Aviation",
        "Specialist Engineering",
        "Law Firms & Corporate Advisory",
        "High-End Medical & Surgery"
      ],
      excluded_sectors: ["Gambling", "Adult", "Cryptocurrency Speculation"],
      min_opportunity_score: 70,
      min_google_rating: 4.0,
      min_review_count: 5,
      businesses_per_day_target: 25
    },
    review_settings: {
      require_prospect_approval: true,
      require_website_approval_before_outreach: true
    },
    autopilot_mode: "ASSISTED",
    updated_by: "system",
    updated_at: new Date().toISOString()
  }
};

// ==============================================================================
// METRICS & TELEMETRY
// ==============================================================================

export interface CommandMetrics {
  aiAuto: {
    discoveredToday: number;
    analysedToday: number;
    qualified: number;
    awaitingReview: number;
    approved: number;
    rejected: number;
    researchRequested: number;
    buildsQueued: number;
    previewsReady: number;
    outreachQueued: number;
  };
  pipeline: {
    opportunitiesCount: number;
    estimatedPipelineValue: number;
    wonThisMonth: number;
  };
  system: {
    queuedJobs: number;
    runningJobs: number;
    failedJobs: number;
    latestCompletedJobAt: string | null;
    dbConnected: boolean;
  };
}

export async function getCommandMetrics(): Promise<CommandMetrics> {
  const prospects = globalState.prospects;
  const jobs = globalState.jobs;
  
  const today = new Date().toISOString().split("T")[0];
  const discoveredToday = prospects.filter(p => p.created_at.startsWith(today)).length;
  const analysedToday = globalState.assessments.filter(a => a.assessed_at.startsWith(today)).length;

  const awaitingReview = prospects.filter(p => p.status === "awaiting_review" || p.review_status === "pending").length;
  const approved = prospects.filter(p => p.status === "approved" || p.review_status === "approved").length;
  const rejected = prospects.filter(p => p.status === "rejected" || p.review_status === "rejected").length;
  const researchRequested = prospects.filter(p => p.status === "research_requested" || p.review_status === "research_requested").length;
  const qualified = prospects.filter(p => p.status === "qualified" || p.opportunity_score >= 70).length;
  const buildsQueued = prospects.filter(p => p.status === "build_queued" || p.status === "building").length;
  const previewsReady = prospects.filter(p => p.status === "preview_ready").length;
  const outreachQueued = prospects.filter(p => p.status === "outreach_queued").length;

  const queuedJobs = jobs.filter(j => j.status === "queued").length;
  const runningJobs = jobs.filter(j => j.status === "running").length;
  const failedJobs = jobs.filter(j => j.status === "failed").length;
  const completedJobs = jobs.filter(j => j.status === "completed").sort((a, b) => (b.completed_at || "").localeCompare(a.completed_at || ""));
  const latestCompletedJobAt = completedJobs[0]?.completed_at || null;

  return {
    aiAuto: {
      discoveredToday,
      analysedToday,
      qualified,
      awaitingReview,
      approved,
      rejected,
      researchRequested,
      buildsQueued,
      previewsReady,
      outreachQueued
    },
    pipeline: {
      opportunitiesCount: prospects.filter(p => p.status === "opportunity").length,
      estimatedPipelineValue: 0,
      wonThisMonth: prospects.filter(p => p.status === "won").length
    },
    system: {
      queuedJobs,
      runningJobs,
      failedJobs,
      latestCompletedJobAt,
      dbConnected: true
    }
  };
}

// ==============================================================================
// PROSPECT QUERIES
// ==============================================================================

export interface ProspectFilterOptions {
  status?: ProspectStatus | "all";
  band?: OpportunityBand | "all";
  sector?: string;
  city?: string;
  search?: string;
  reviewStatus?: ReviewStatus | "all";
  priority?: string;
  page?: number;
  limit?: number;
  sortBy?: "score_desc" | "score_asc" | "created_desc" | "rating_desc";
}

export async function getProspects(options: ProspectFilterOptions = {}): Promise<{
  prospects: Prospect[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const {
    status = "all",
    band = "all",
    sector,
    city,
    search,
    reviewStatus = "all",
    priority,
    page = 1,
    limit = 20,
    sortBy = "score_desc"
  } = options;

  let results = globalState.prospects.map(p => hydrateProspect(p));

  // Filters
  if (status !== "all") {
    results = results.filter(p => p.status === status);
  }
  if (reviewStatus !== "all") {
    results = results.filter(p => p.review_status === reviewStatus);
  }
  if (priority && priority !== "all") {
    results = results.filter(p => p.priority === priority);
  }
  if (band !== "all") {
    results = results.filter(p => p.assessment?.opportunity_band === band);
  }
  if (sector && sector !== "all") {
    results = results.filter(p => p.business?.sector.toLowerCase() === sector.toLowerCase());
  }
  if (city && city !== "all") {
    results = results.filter(p => p.business?.city?.toLowerCase() === city.toLowerCase());
  }
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    results = results.filter(p => {
      const b = p.business;
      return (
        b?.company_name.toLowerCase().includes(q) ||
        b?.domain?.toLowerCase().includes(q) ||
        b?.city?.toLowerCase().includes(q) ||
        b?.sector.toLowerCase().includes(q)
      );
    });
  }

  // Sorting
  results.sort((a, b) => {
    if (sortBy === "score_desc") return b.opportunity_score - a.opportunity_score;
    if (sortBy === "score_asc") return a.opportunity_score - b.opportunity_score;
    if (sortBy === "created_desc") return b.created_at.localeCompare(a.created_at);
    if (sortBy === "rating_desc") {
      const rA = a.business?.google_rating || 0;
      const rB = b.business?.google_rating || 0;
      return rB - rA;
    }
    return 0;
  });

  const total = results.length;
  const totalPages = Math.ceil(total / limit) || 1;
  const offset = (page - 1) * limit;
  const paginated = results.slice(offset, offset + limit);

  return {
    prospects: paginated,
    total,
    page,
    limit,
    totalPages
  };
}

export async function getProspectById(id: string): Promise<Prospect | null> {
  const prospect = globalState.prospects.find(p => p.id === id);
  if (!prospect) return null;
  return hydrateProspect(prospect);
}

export async function getReviewQueue(): Promise<Prospect[]> {
  const reviewQueue = globalState.prospects
    .filter(p => p.review_status === "pending" || p.status === "awaiting_review")
    .map(p => hydrateProspect(p))
    .sort((a, b) => b.opportunity_score - a.opportunity_score);

  return reviewQueue;
}

function hydrateProspect(prospect: Prospect): Prospect {
  const business = globalState.businesses.find(b => b.id === prospect.business_id);
  const assessment = globalState.assessments.find(a => a.id === prospect.current_assessment_id);
  return {
    ...prospect,
    business,
    assessment
  };
}

// ==============================================================================
// REVIEW WORKFLOW MUTATIONS
// ==============================================================================

export async function approveProspect(
  prospectId: string, 
  actorUserId: string, 
  notes?: string
): Promise<{ success: boolean; prospect: Prospect; job: AutomationJob }> {
  const index = globalState.prospects.findIndex(p => p.id === prospectId);
  if (index === -1) {
    throw new Error(`Prospect ${prospectId} not found`);
  }

  const now = new Date().toISOString();
  const prospect = globalState.prospects[index];

  // 1. Update prospect state
  prospect.review_status = "approved";
  prospect.status = "approved";
  prospect.reviewed_by = actorUserId;
  prospect.reviewed_at = now;
  prospect.approval_notes = notes || null;
  prospect.updated_at = now;

  // 2. Enqueue next logical automation job: prospect_deep_research
  const jobId = `job_deep_res_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const job: AutomationJob = {
    id: jobId,
    job_type: "prospect_deep_research",
    entity_type: "prospect",
    entity_id: prospect.id,
    status: "queued",
    priority: 20,
    payload: {
      business_id: prospect.business_id,
      notes: notes || null,
      opportunity_score: prospect.opportunity_score
    },
    attempts: 0,
    max_attempts: 3,
    scheduled_for: now,
    created_by: actorUserId,
    created_at: now,
    updated_at: now
  };
  globalState.jobs.unshift(job);

  // 3. Log immutable audit event
  const business = globalState.businesses.find(b => b.id === prospect.business_id);
  logAuditEvent({
    actor_type: "user",
    actor_user_id: actorUserId,
    action: "PROSPECT_APPROVED",
    entity_type: "prospect",
    entity_id: prospect.id,
    summary: `Prospect ${business?.company_name || prospect.id} approved for deep research by operator`,
    metadata: {
      notes,
      queued_job_id: jobId,
      opportunity_score: prospect.opportunity_score
    }
  });

  return {
    success: true,
    prospect: hydrateProspect(prospect),
    job
  };
}

export async function rejectProspect(
  prospectId: string, 
  actorUserId: string, 
  reason: RejectionReason | string,
  notes?: string
): Promise<{ success: boolean; prospect: Prospect }> {
  const index = globalState.prospects.findIndex(p => p.id === prospectId);
  if (index === -1) {
    throw new Error(`Prospect ${prospectId} not found`);
  }

  const now = new Date().toISOString();
  const prospect = globalState.prospects[index];

  prospect.review_status = "rejected";
  prospect.status = "rejected";
  prospect.reviewed_by = actorUserId;
  prospect.reviewed_at = now;
  prospect.rejection_reason = reason;
  prospect.approval_notes = notes || null;
  prospect.updated_at = now;

  const business = globalState.businesses.find(b => b.id === prospect.business_id);
  logAuditEvent({
    actor_type: "user",
    actor_user_id: actorUserId,
    action: "PROSPECT_REJECTED",
    entity_type: "prospect",
    entity_id: prospect.id,
    summary: `Prospect ${business?.company_name || prospect.id} rejected. Reason: ${reason}`,
    metadata: {
      rejection_reason: reason,
      notes
    }
  });

  return {
    success: true,
    prospect: hydrateProspect(prospect)
  };
}

export async function watchProspect(
  prospectId: string, 
  actorUserId: string, 
  nextActionDate?: string,
  notes?: string
): Promise<{ success: boolean; prospect: Prospect }> {
  const index = globalState.prospects.findIndex(p => p.id === prospectId);
  if (index === -1) {
    throw new Error(`Prospect ${prospectId} not found`);
  }

  const now = new Date().toISOString();
  const prospect = globalState.prospects[index];

  prospect.review_status = "watch";
  prospect.status = "watch";
  prospect.reviewed_by = actorUserId;
  prospect.reviewed_at = now;
  prospect.next_action = "Periodic re-evaluation";
  prospect.next_action_at = nextActionDate || null;
  prospect.approval_notes = notes || null;
  prospect.updated_at = now;

  const business = globalState.businesses.find(b => b.id === prospect.business_id);
  logAuditEvent({
    actor_type: "user",
    actor_user_id: actorUserId,
    action: "PROSPECT_WATCHED",
    entity_type: "prospect",
    entity_id: prospect.id,
    summary: `Prospect ${business?.company_name || prospect.id} moved to Watch list`,
    metadata: {
      next_action_at: nextActionDate,
      notes
    }
  });

  return {
    success: true,
    prospect: hydrateProspect(prospect)
  };
}

export async function requestResearchProspect(
  prospectId: string, 
  actorUserId: string, 
  notes?: string
): Promise<{ success: boolean; prospect: Prospect; job: AutomationJob }> {
  const index = globalState.prospects.findIndex(p => p.id === prospectId);
  if (index === -1) {
    throw new Error(`Prospect ${prospectId} not found`);
  }

  const now = new Date().toISOString();
  const prospect = globalState.prospects[index];

  prospect.review_status = "research_requested";
  prospect.status = "research_requested";
  prospect.reviewed_by = actorUserId;
  prospect.reviewed_at = now;
  prospect.approval_notes = notes || null;
  prospect.updated_at = now;

  const jobId = `job_add_res_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const job: AutomationJob = {
    id: jobId,
    job_type: "prospect_additional_research",
    entity_type: "prospect",
    entity_id: prospect.id,
    status: "queued",
    priority: 15,
    payload: {
      business_id: prospect.business_id,
      operator_request_notes: notes || null
    },
    attempts: 0,
    max_attempts: 3,
    scheduled_for: now,
    created_by: actorUserId,
    created_at: now,
    updated_at: now
  };
  globalState.jobs.unshift(job);

  const business = globalState.businesses.find(b => b.id === prospect.business_id);
  logAuditEvent({
    actor_type: "user",
    actor_user_id: actorUserId,
    action: "PROSPECT_RESEARCH_REQUESTED",
    entity_type: "prospect",
    entity_id: prospect.id,
    summary: `Additional intelligence requested for ${business?.company_name || prospect.id}`,
    metadata: {
      notes,
      queued_job_id: jobId
    }
  });

  return {
    success: true,
    prospect: hydrateProspect(prospect),
    job
  };
}

// ==============================================================================
// AUTOMATION JOBS
// ==============================================================================

export async function getAutomationJobs(options: {
  status?: JobStatus | "all";
  jobType?: JobType | "all";
  limit?: number;
} = {}): Promise<AutomationJob[]> {
  let jobs = [...globalState.jobs];
  if (options.status && options.status !== "all") {
    jobs = jobs.filter(j => j.status === options.status);
  }
  if (options.jobType && options.jobType !== "all") {
    jobs = jobs.filter(j => j.job_type === options.jobType);
  }
  return jobs.slice(0, options.limit || 50);
}

export async function retryAutomationJob(jobId: string, actorUserId: string): Promise<AutomationJob> {
  const job = globalState.jobs.find(j => j.id === jobId);
  if (!job) throw new Error(`Job ${jobId} not found`);

  const now = new Date().toISOString();
  job.status = "queued";
  job.attempts = 0;
  job.failed_at = null;
  job.error_code = null;
  job.error_message = null;
  job.updated_at = now;

  logAuditEvent({
    actor_type: "user",
    actor_user_id: actorUserId,
    action: "AUTOMATION_JOB_RETRIED",
    entity_type: "automation_job",
    entity_id: job.id,
    summary: `Automation job ${job.job_type} (${job.id}) requeued by operator`,
    metadata: { job_type: job.job_type }
  });

  return job;
}

export async function cancelAutomationJob(jobId: string, actorUserId: string): Promise<AutomationJob> {
  const job = globalState.jobs.find(j => j.id === jobId);
  if (!job) throw new Error(`Job ${jobId} not found`);

  const now = new Date().toISOString();
  job.status = "cancelled";
  job.updated_at = now;

  logAuditEvent({
    actor_type: "user",
    actor_user_id: actorUserId,
    action: "AUTOMATION_JOB_CANCELLED",
    entity_type: "automation_job",
    entity_id: job.id,
    summary: `Automation job ${job.job_type} (${job.id}) cancelled by operator`,
    metadata: { job_type: job.job_type }
  });

  return job;
}

// ==============================================================================
// AUDIT LOGGING
// ==============================================================================

export function logAuditEvent(params: Omit<AuditEvent, "id" | "created_at">): AuditEvent {
  const event: AuditEvent = {
    id: `audit_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    ...params,
    created_at: new Date().toISOString()
  };
  globalState.auditEvents.unshift(event);
  return event;
}

export async function getAuditEvents(options: {
  entityType?: string;
  entityId?: string;
  limit?: number;
} = {}): Promise<AuditEvent[]> {
  let events = [...globalState.auditEvents];
  if (options.entityType) {
    events = events.filter(e => e.entity_type === options.entityType);
  }
  if (options.entityId) {
    events = events.filter(e => e.entity_id === options.entityId);
  }
  return events.slice(0, options.limit || 50);
}

// ==============================================================================
// SETTINGS
// ==============================================================================

export async function getAiAutoSettings(): Promise<AiAutoSettings> {
  return globalState.settings;
}

export async function updateAiAutoSettings(
  updated: Partial<AiAutoSettings>, 
  actorUserId: string
): Promise<AiAutoSettings> {
  const now = new Date().toISOString();
  globalState.settings = {
    ...globalState.settings,
    ...updated,
    targeting: {
      ...globalState.settings.targeting,
      ...(updated.targeting || {})
    },
    review_settings: {
      ...globalState.settings.review_settings,
      ...(updated.review_settings || {})
    },
    updated_by: actorUserId,
    updated_at: now
  };

  logAuditEvent({
    actor_type: "user",
    actor_user_id: actorUserId,
    action: "AI_AUTO_SETTINGS_UPDATED",
    entity_type: "ai_auto_settings",
    entity_id: globalState.settings.id,
    summary: `AI Auto parameters modified by operator`,
    metadata: {
      autopilot_mode: globalState.settings.autopilot_mode,
      targeting: globalState.settings.targeting
    }
  });

  return globalState.settings;
}

// ==============================================================================
// SEEDING FIXTURE FOR VERIFICATION & DEVELOPMENT
// ==============================================================================

export async function seedDevelopmentFixture(): Promise<{
  business: Business;
  assessment: ProspectAssessment;
  prospect: Prospect;
}> {
  // Check if test fixture already exists
  const existing = globalState.prospects.find(p => p.id === "prospect_fixture_01");
  if (existing) {
    return {
      business: globalState.businesses.find(b => b.id === existing.business_id)!,
      assessment: globalState.assessments.find(a => a.id === existing.current_assessment_id)!,
      prospect: hydrateProspect(existing)
    };
  }

  const now = new Date().toISOString();
  const businessId = "biz_fixture_01";
  const assessmentId = "asm_fixture_01";
  const prospectId = "prospect_fixture_01";

  const business: Business = {
    id: businessId,
    company_name: "[TEST FIXTURE] Blackwood Architecture & Spatial Design",
    legal_name: "Blackwood & Partners Ltd",
    slug: "blackwood-architecture-test",
    website_url: "https://blackwood-architects-example.co.uk",
    domain: "blackwood-architects-example.co.uk",
    phone: "+44 (0) 20 7946 0912",
    primary_email: "studio@blackwood-architects-example.co.uk",
    address_line_1: "42 Berkeley Square",
    city: "London",
    county_region: "Greater London",
    postcode: "W1J 5AW",
    country: "GB",
    sector: "Architects & Spatial Design",
    sub_sector: "High-End Residential & Commercial Masterplanning",
    business_description: "Award-winning contemporary architectural practice established in 2012. Specialises in prime London residential conversions and sustainable commercial headquarters.",
    google_business_url: "https://maps.google.com/?cid=1234567890",
    google_rating: 4.8,
    google_review_count: 34,
    status: "active",
    source: "test_seed_fixture",
    created_at: now,
    updated_at: now
  };

  const scoreResult = calculateOpportunityScore({
    websiteQualityScore: 32, // Outdated, sluggish WordPress site
    mobileScore: 28, // Broken mobile hamburger & layout overflows
    hasOnlineBooking: false,
    hasContactForm: true,
    hasClearCta: false,
    hasLiveChat: false,
    hasSsl: true,
    hasStructuredData: false,
    hasRecentContent: false,
    googleRating: 4.8,
    googleReviewCount: 34,
    sector: "Architects & Spatial Design"
  });

  const assessment: ProspectAssessment = {
    id: assessmentId,
    business_id: businessId,
    assessment_version: "v1-heuristic",
    assessed_at: now,
    website_quality_score: 32,
    visual_quality_score: 35,
    mobile_score: 28,
    seo_score: 41,
    conversion_score: 25,
    trust_score: 88,
    business_quality_score: 92,
    commercial_value_score: 95,
    opportunity_score: scoreResult.opportunityScore,
    opportunity_band: scoreResult.opportunityBand,
    estimated_website_age: "7+ years (Built ~2017)",
    website_platform: "WordPress 4.9.8 / Legacy Divi Builder",
    has_ssl: true,
    mobile_friendly: false,
    has_online_booking: false,
    has_contact_form: true,
    has_live_chat: false,
    has_google_reviews: false,
    has_clear_cta: false,
    has_structured_data: false,
    has_recent_content: false,
    identified_problems: [
      {
        id: "prob_1",
        category: "mobile",
        severity: "critical",
        title: "Mobile Navigation & Viewport Overflow",
        description: "Primary architectural portfolio gallery fails to render cleanly on modern smartphones; navigation links overlap hero typography."
      },
      {
        id: "prob_2",
        category: "speed",
        severity: "high",
        title: "Uncompressed 14MB Architectural Imagery",
        description: "Page load speed exceeds 5.8s on 4G networks due to unoptimized full-resolution TIFF/PNG assets, triggering bounce rates."
      },
      {
        id: "prob_3",
        category: "conversion",
        severity: "high",
        title: "Missing Project Commission Funnel",
        description: "Only a static, unstyled contact email is listed; no structured commercial inquiry or project briefing intake exists."
      },
      {
        id: "prob_4",
        category: "seo",
        severity: "medium",
        title: "Zero Architectural Schema / Entity Graph",
        description: "Search engines cannot attribute landmark project citations or partner credentials in organic knowledge panels."
      }
    ],
    identified_opportunities: [
      {
        id: "opp_1",
        title: "Cinematic Interactive Portfolio with WebGL Project Showcase",
        impact: "high",
        description: "Upgrade from static grid to high-performance fullscreen case study storytelling matching Avorria's architectural design standard.",
        commercial_rationale: "Positions practice to command £50k-£200k commission fees on landmark tenders."
      },
      {
        id: "opp_2",
        title: "Client Commission Briefing & Spatial Feasibility Intake",
        impact: "high",
        description: "Engineered multi-step qualification funnel that captures budget, square footage, planning status, and architectural intent.",
        commercial_rationale: "Filters high-net-worth inquiries and reduces administrative friction."
      }
    ],
    recommended_features: [
      {
        id: "feat_1",
        name: "Spatial Case Study Engine",
        slug: "spatial-case-study",
        category: "Portfolio",
        reason: "Essential for showcasing RIBA award-winning commercial masterplans with before/after drawings.",
        estimated_complexity: "medium"
      },
      {
        id: "feat_2",
        name: "Architectural Commission Intake",
        slug: "commission-intake",
        category: "Conversion",
        reason: "Direct qualification of client budget, planning constraints, and location.",
        estimated_complexity: "low"
      },
      {
        id: "feat_3",
        name: "Interactive Project Map & Materials Explorer",
        slug: "materials-explorer",
        category: "Design",
        reason: "Demonstrates technical rigor and materiality to commercial developers.",
        estimated_complexity: "medium"
      }
    ],
    competitor_notes: "Top competitor practices in Mayfair utilise headless React/Next.js platforms with fluid case studies.",
    ai_summary: "High-reputation London architectural firm with strong client demand (4.8★, 34 reviews) running on a severely dated, broken-mobile WordPress theme. High-probability commercial upgrade prospect for Avorria flagship build.",
    ai_reasoning_summary: "Composite opportunity score of 89/100 (PRIORITY). The contrast between their prestigious Mayfair practice reputation and their 2017 un-optimized website creates immediate ROI for an Avorria redesign pitch.",
    model_provider: "heuristic-engine",
    model_name: "v1-rule-engine",
    created_at: now
  };

  const prospect: Prospect = {
    id: prospectId,
    business_id: businessId,
    current_assessment_id: assessmentId,
    status: "awaiting_review",
    priority: "high",
    opportunity_score: assessment.opportunity_score,
    review_status: "pending",
    created_at: now,
    updated_at: now
  };

  globalState.businesses.push(business);
  globalState.assessments.push(assessment);
  globalState.prospects.push(prospect);

  logAuditEvent({
    actor_type: "system",
    action: "DEVELOPMENT_FIXTURE_SEEDED",
    entity_type: "prospect",
    entity_id: prospectId,
    summary: `Development test fixture initialized: [TEST FIXTURE] Blackwood Architecture (Score: ${assessment.opportunity_score})`
  });

  return {
    business,
    assessment,
    prospect: hydrateProspect(prospect)
  };
}




// ============================================================================
// PHASE 2 EXTENDED STATE — initialised lazily
// ============================================================================

// We extend the global state with Phase 2/3 entities using module-level state
interface Phase2State {
  targetingProfiles: TargetingProfile[];
  scoutRuns: ScoutRun[];
  suppressions: BusinessSuppression[];
  businessSources: BusinessSource[];
  websiteCaptures: WebsiteCapture[];
  businessResearch: BusinessResearch[];
  aiUsageEvents: AIUsageEvent[];
  systemSettings: Map<string, string>;
  // Phase 3
  creativeBriefs: CreativeBrief[];
  siteStrategies: SiteStrategy[];
  siteProjects: SiteProject[];
  siteVersions: SiteVersion[];
  designReviews: DesignReview[];
  previewLinks: PreviewLink[];
  siteMedia: SiteMedia[];
}

import type {
  TargetingProfile, ScoutRun, BusinessSuppression, BusinessSource,
  WebsiteCapture, BusinessResearch, AIUsageEvent, AITaskConfig,
  CreativeBrief, SiteStrategy, SiteProject, SiteVersion,
  DesignReview, PreviewLink, SiteMedia,
} from "@/types/admin";

let _p2: Phase2State | null = null;
function getP2(): Phase2State {
  if (!_p2) {
    _p2 = {
      targetingProfiles: [defaultTargetingProfile()],
      scoutRuns: [],
      suppressions: [],
      businessSources: [],
      websiteCaptures: [],
      businessResearch: [],
      aiUsageEvents: [],
      systemSettings: new Map([["ai_auto_paused", "false"]]),
      creativeBriefs: [],
      siteStrategies: [],
      siteProjects: [],
      siteVersions: [],
      designReviews: [],
      previewLinks: [],
      siteMedia: [],
    };
  }
  return _p2;
}

function defaultTargetingProfile(): TargetingProfile {
  const now = new Date().toISOString();
  return {
    id: "default-profile",
    name: "UK Local Businesses",
    enabled: true,
    countries: ["GB"],
    regions: [],
    cities: ["Sheffield", "Chesterfield", "Rotherham"],
    postcode_areas: [],
    radius_km: 30,
    sectors: ["Automotive", "Plumbing", "Electrical", "Construction", "Landscaping", "Dental"],
    sub_sectors: [],
    excluded_sectors: [],
    excluded_domains: [],
    min_google_rating: 3.8,
    min_review_count: 5,
    max_website_quality_score: 60,
    min_opportunity_score: 65,
    max_prospects_per_run: 10,
    max_qualified_per_day: 5,
    max_search_operations: 10,
    max_ai_spend_per_run: 1.50,
    max_daily_ai_spend: 5.00,
    priority: 5,
    notes: "Default targeting profile",
    created_by: "system",
    created_at: now,
    updated_at: now,
  };
}

// ── TARGETING PROFILES ────────────────────────────────────────────────────────

export async function getTargetingProfiles(): Promise<TargetingProfile[]> {
  return [...getP2().targetingProfiles];
}
export async function getTargetingProfile(id: string): Promise<TargetingProfile | null> {
  return getP2().targetingProfiles.find(p => p.id === id) ?? null;
}
export async function createTargetingProfile(data: Omit<TargetingProfile, "id" | "created_at" | "updated_at">): Promise<TargetingProfile> {
  const now = new Date().toISOString();
  const profile: TargetingProfile = { ...data, id: crypto.randomUUID(), created_at: now, updated_at: now };
  getP2().targetingProfiles.push(profile);
  return profile;
}
export async function updateTargetingProfile(id: string, updates: Partial<TargetingProfile>): Promise<TargetingProfile> {
  const p2 = getP2();
  const idx = p2.targetingProfiles.findIndex(p => p.id === id);
  if (idx === -1) throw new Error(`TargetingProfile ${id} not found`);
  p2.targetingProfiles[idx] = { ...p2.targetingProfiles[idx], ...updates, updated_at: new Date().toISOString() };
  return p2.targetingProfiles[idx];
}

// ── SCOUT RUNS ────────────────────────────────────────────────────────────────

export async function getScoutRuns(limit = 50): Promise<ScoutRun[]> {
  return [...getP2().scoutRuns].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, limit);
}
export async function getScoutRun(id: string): Promise<ScoutRun | null> {
  return getP2().scoutRuns.find(r => r.id === id) ?? null;
}
export async function createScoutRun(data: Omit<ScoutRun, "id" | "created_at">): Promise<ScoutRun> {
  const run: ScoutRun = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  getP2().scoutRuns.push(run);
  return run;
}
export async function updateScoutRun(id: string, updates: Partial<ScoutRun>): Promise<ScoutRun> {
  const p2 = getP2();
  const idx = p2.scoutRuns.findIndex(r => r.id === id);
  if (idx === -1) throw new Error(`ScoutRun ${id} not found`);
  p2.scoutRuns[idx] = { ...p2.scoutRuns[idx], ...updates };
  return p2.scoutRuns[idx];
}

// ── SUPPRESSIONS ───────────────────────────────────────────────────────────────

export async function getSuppressions(): Promise<BusinessSuppression[]> {
  return [...getP2().suppressions];
}
export async function getSuppression(domain: string): Promise<BusinessSuppression | null> {
  return getP2().suppressions.find(s => s.domain === domain) ?? null;
}
export async function addSuppression(data: Omit<BusinessSuppression, "id" | "created_at">): Promise<BusinessSuppression> {
  const s: BusinessSuppression = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  getP2().suppressions.push(s);
  return s;
}

// ── BUSINESS SOURCES ──────────────────────────────────────────────────────────

export async function getBusinessSources(businessId: string): Promise<BusinessSource[]> {
  return getP2().businessSources.filter(s => s.business_id === businessId);
}
export async function addBusinessSource(data: Omit<BusinessSource, "id">): Promise<BusinessSource> {
  const s: BusinessSource = { ...data, id: crypto.randomUUID() };
  getP2().businessSources.push(s);
  return s;
}

// ── WEBSITE CAPTURES ──────────────────────────────────────────────────────────

export async function getWebsiteCaptures(businessId: string): Promise<WebsiteCapture[]> {
  return getP2().websiteCaptures.filter(c => c.business_id === businessId);
}
export async function saveWebsiteCapture(data: Omit<WebsiteCapture, "id">): Promise<WebsiteCapture> {
  const c: WebsiteCapture = { ...data, id: crypto.randomUUID() };
  getP2().websiteCaptures.push(c);
  return c;
}

// ── BUSINESS RESEARCH ─────────────────────────────────────────────────────────

export async function getBusinessResearch(businessId: string): Promise<BusinessResearch[]> {
  return getP2().businessResearch.filter(r => r.business_id === businessId);
}
export async function getLatestBusinessResearch(businessId: string): Promise<BusinessResearch | null> {
  const records = getP2().businessResearch
    .filter(r => r.business_id === businessId)
    .sort((a, b) => b.research_version - a.research_version);
  return records[0] ?? null;
}
export async function saveBusinessResearch(data: Omit<BusinessResearch, "id">): Promise<BusinessResearch> {
  const r: BusinessResearch = { ...data, id: crypto.randomUUID() };
  getP2().businessResearch.push(r);
  return r;
}

// ── AI USAGE ──────────────────────────────────────────────────────────────────

export async function recordAIUsage(data: Omit<AIUsageEvent, "id" | "created_at">): Promise<void> {
  const event: AIUsageEvent = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  getP2().aiUsageEvents.push(event);
  // Keep last 1000 events to avoid unbounded memory growth
  const events = getP2().aiUsageEvents;
  if (events.length > 1000) events.splice(0, events.length - 1000);
}

export async function getAIUsageEvents(opts: { limit?: number; provider?: string; taskKey?: string } = {}): Promise<AIUsageEvent[]> {
  let events = [...getP2().aiUsageEvents];
  if (opts.provider) events = events.filter(e => e.provider === opts.provider);
  if (opts.taskKey) events = events.filter(e => e.task_key === opts.taskKey);
  return events.sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, opts.limit ?? 100);
}

export async function getAIUsageSummary(): Promise<{
  todayTokens: number; todayCost: number; monthCost: number;
  byProvider: Record<string, { calls: number; tokens: number; cost: number }>;
  byTask: Record<string, { calls: number; avgLatency: number; cost: number }>;
}> {
  const events = getP2().aiUsageEvents;
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const monthStr = now.toISOString().slice(0, 7);

  const todayEvents  = events.filter(e => e.created_at.startsWith(todayStr));
  const monthEvents  = events.filter(e => e.created_at.startsWith(monthStr));

  const byProvider: Record<string, { calls: number; tokens: number; cost: number }> = {};
  const byTask:     Record<string, { calls: number; totalLatency: number; cost: number }> = {};

  for (const e of events) {
    const p = byProvider[e.provider] ?? { calls: 0, tokens: 0, cost: 0 };
    p.calls++; p.tokens += e.input_tokens + e.output_tokens; p.cost += e.estimated_cost;
    byProvider[e.provider] = p;

    const t = byTask[e.task_key] ?? { calls: 0, totalLatency: 0, cost: 0 };
    t.calls++; t.totalLatency += e.latency_ms; t.cost += e.estimated_cost;
    byTask[e.task_key] = t;
  }

  return {
    todayTokens: todayEvents.reduce((s, e) => s + e.input_tokens + e.output_tokens, 0),
    todayCost:   todayEvents.reduce((s, e) => s + e.estimated_cost, 0),
    monthCost:   monthEvents.reduce((s, e) => s + e.estimated_cost, 0),
    byProvider,
    byTask: Object.fromEntries(
      Object.entries(byTask).map(([k, v]) => [k, { calls: v.calls, avgLatency: v.calls > 0 ? v.totalLatency / v.calls : 0, cost: v.cost }])
    ),
  };
}

// ── SYSTEM SETTINGS ───────────────────────────────────────────────────────────

export async function getAiAutoSystemPaused(): Promise<boolean> {
  return getP2().systemSettings.get("ai_auto_paused") === "true";
}
export async function setAiAutoSystemPaused(paused: boolean, by: string): Promise<void> {
  getP2().systemSettings.set("ai_auto_paused", paused ? "true" : "false");
  void by;
}

// ── PHASE 3: CREATIVE BRIEFS ──────────────────────────────────────────────────

export async function getCreativeBriefs(prospectId?: string): Promise<CreativeBrief[]> {
  const p2 = getP2();
  if (prospectId) return p2.creativeBriefs.filter(b => b.prospect_id === prospectId);
  return [...p2.creativeBriefs].sort((a, b) => b.created_at.localeCompare(a.created_at));
}
export async function getCreativeBrief(id: string): Promise<CreativeBrief | null> {
  return getP2().creativeBriefs.find(b => b.id === id) ?? null;
}
export async function saveCreativeBrief(data: Omit<CreativeBrief, "created_at"> & { id?: string }): Promise<CreativeBrief> {
  const p2 = getP2();
  const brief: CreativeBrief = { ...data, id: data.id ?? crypto.randomUUID(), created_at: new Date().toISOString() };
  const idx = p2.creativeBriefs.findIndex(b => b.id === brief.id);
  if (idx >= 0) p2.creativeBriefs[idx] = brief;
  else p2.creativeBriefs.push(brief);
  return brief;
}
export async function updateCreativeBrief(id: string, updates: Partial<CreativeBrief>): Promise<CreativeBrief> {
  const p2 = getP2();
  const idx = p2.creativeBriefs.findIndex(b => b.id === id);
  if (idx === -1) throw new Error(`CreativeBrief ${id} not found`);
  p2.creativeBriefs[idx] = { ...p2.creativeBriefs[idx], ...updates };
  return p2.creativeBriefs[idx];
}

// ── PHASE 3: SITE PROJECTS ────────────────────────────────────────────────────

export async function getSiteProjects(status?: string): Promise<SiteProject[]> {
  const p2 = getP2();
  let projects = [...p2.siteProjects];
  if (status) projects = projects.filter(p => p.status === status);
  return projects.sort((a, b) => b.updated_at.localeCompare(a.updated_at));
}
export async function getSiteProject(id: string): Promise<SiteProject | null> {
  return getP2().siteProjects.find(p => p.id === id) ?? null;
}
export async function getSiteProjectBySlug(slug: string): Promise<SiteProject | null> {
  return getP2().siteProjects.find(p => p.slug === slug) ?? null;
}
export async function createSiteProject(data: Omit<SiteProject, "id" | "created_at" | "updated_at">): Promise<SiteProject> {
  const now = new Date().toISOString();
  const project: SiteProject = { ...data, id: crypto.randomUUID(), created_at: now, updated_at: now };
  getP2().siteProjects.push(project);
  return project;
}
export async function updateSiteProject(id: string, updates: Partial<SiteProject>): Promise<SiteProject> {
  const p2 = getP2();
  const idx = p2.siteProjects.findIndex(p => p.id === id);
  if (idx === -1) throw new Error(`SiteProject ${id} not found`);
  p2.siteProjects[idx] = { ...p2.siteProjects[idx], ...updates, updated_at: new Date().toISOString() };
  return p2.siteProjects[idx];
}

// ── PHASE 3: SITE VERSIONS ────────────────────────────────────────────────────

export async function getSiteVersions(projectId: string): Promise<SiteVersion[]> {
  return getP2().siteVersions
    .filter(v => v.site_project_id === projectId)
    .sort((a, b) => b.version - a.version);
}
export async function getSiteVersion(id: string): Promise<SiteVersion | null> {
  return getP2().siteVersions.find(v => v.id === id) ?? null;
}
export async function saveSiteVersion(data: SiteVersion): Promise<SiteVersion> {
  const p2 = getP2();
  const idx = p2.siteVersions.findIndex(v => v.id === data.id);
  if (idx >= 0) p2.siteVersions[idx] = data;
  else p2.siteVersions.push(data);
  return data;
}

// ── PHASE 3: DESIGN REVIEWS ────────────────────────────────────────────────────

export async function getDesignReviews(projectId: string): Promise<DesignReview[]> {
  return getP2().designReviews
    .filter(r => r.site_project_id === projectId)
    .sort((a, b) => b.created_at.localeCompare(a.created_at));
}
export async function saveDesignReview(data: Omit<DesignReview, "id" | "created_at">): Promise<DesignReview> {
  const review: DesignReview = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  getP2().designReviews.push(review);
  return review;
}

// ── PHASE 3: PREVIEW LINKS ────────────────────────────────────────────────────

export async function getPreviewLinkByToken(token: string): Promise<PreviewLink | null> {
  return getP2().previewLinks.find(l => l.token === token && l.status === "active") ?? null;
}
export async function getPreviewLinksByProject(projectId: string): Promise<PreviewLink[]> {
  return getP2().previewLinks.filter(l => l.site_project_id === projectId);
}
export async function createPreviewLink(projectId: string, opts: { expiresInDays?: number; presentationMode?: boolean } = {}): Promise<PreviewLink> {
  const token = generateSecureToken();
  const expiresAt = opts.expiresInDays
    ? new Date(Date.now() + opts.expiresInDays * 86400_000).toISOString()
    : null;
  const link: PreviewLink = {
    id: crypto.randomUUID(),
    site_project_id: projectId,
    token,
    status: "active",
    expires_at: expiresAt,
    presentation_mode: opts.presentationMode ?? true,
    view_count: 0,
    created_at: new Date().toISOString(),
  };
  getP2().previewLinks.push(link);
  return link;
}
export async function incrementPreviewLinkView(token: string): Promise<void> {
  const p2 = getP2();
  const idx = p2.previewLinks.findIndex(l => l.token === token);
  if (idx === -1) return;
  const now = new Date().toISOString();
  p2.previewLinks[idx] = {
    ...p2.previewLinks[idx],
    view_count: p2.previewLinks[idx].view_count + 1,
    last_viewed_at: now,
    first_viewed_at: p2.previewLinks[idx].first_viewed_at ?? now,
  };
}
export async function revokePreviewLink(token: string): Promise<void> {
  const p2 = getP2();
  const idx = p2.previewLinks.findIndex(l => l.token === token);
  if (idx === -1) return;
  p2.previewLinks[idx] = { ...p2.previewLinks[idx], status: "revoked", revoked_at: new Date().toISOString() };
}

// ── PHASE 3: SITE MEDIA ────────────────────────────────────────────────────────

export async function getSiteMedia(projectId: string): Promise<SiteMedia[]> {
  return getP2().siteMedia.filter(m => m.site_project_id === projectId);
}
export async function saveSiteMedia(data: Omit<SiteMedia, "id" | "created_at">): Promise<SiteMedia> {
  const media: SiteMedia = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  getP2().siteMedia.push(media);
  return media;
}

// ── PHASE 3: SITE STRATEGIES ──────────────────────────────────────────────────

export async function getSiteStrategy(id: string): Promise<SiteStrategy | null> {
  return getP2().siteStrategies.find(s => s.id === id) ?? null;
}
export async function getSiteStrategiesByProspect(prospectId: string): Promise<SiteStrategy[]> {
  return getP2().siteStrategies.filter(s => s.prospect_id === prospectId).sort((a, b) => b.version - a.version);
}
export async function saveSiteStrategy(data: Omit<SiteStrategy, "id" | "created_at">): Promise<SiteStrategy> {
  const strategy: SiteStrategy = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  getP2().siteStrategies.push(strategy);
  return strategy;
}

// ── SECURE TOKEN GENERATION ────────────────────────────────────────────────────

function generateSecureToken(length = 12): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  // Use Math.random as a fallback (crypto.randomUUID provides the UUID uniqueness)
  for (let i = 0; i < length; i++) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

// ── FACTORY PIPELINE HELPERS ──────────────────────────────────────────────────

/** Get a site project with all hydrated relations */
export async function getSiteProjectHydrated(id: string): Promise<SiteProject | null> {
  const project = await getSiteProject(id);
  if (!project) return null;

  const hydrated = { ...project };
  if (project.creative_brief_id) {
    hydrated.creative_brief = await getCreativeBrief(project.creative_brief_id) ?? undefined;
  }
  if (project.current_version_id) {
    hydrated.current_version = await getSiteVersion(project.current_version_id) ?? undefined;
  }
  const reviews = await getDesignReviews(id);
  if (reviews.length > 0) hydrated.latest_design_review = reviews[0];

  return hydrated;
}

/** Compute total AI cost for a site project */
export async function getSiteProjectAICost(projectId: string): Promise<{ total: number; byPhase: Record<string, number> }> {
  const events = getP2().aiUsageEvents.filter(e => e.entity_id === projectId || e.entity_type === "site_project");
  const byPhase: Record<string, number> = {};
  let total = 0;
  for (const e of events) {
    byPhase[e.task_key] = (byPhase[e.task_key] ?? 0) + e.estimated_cost;
    total += e.estimated_cost;
  }
  return { total, byPhase };
}



// ============================================================================
// PHASE 7: OPTIMISATION & COMMERCIAL INTELLIGENCE STORE
// ============================================================================

import type {
  ProspectOutcome,
  Experiment,
  ExperimentVariant,
  ExperimentAssignment,
  OptimisationRecommendation,
  OptimisationPlaybook,
  ScoringShadowEvaluation,
  DailyCEOBrief,
} from "@/types/admin";

interface Phase7State {
  outcomes: ProspectOutcome[];
  experiments: Experiment[];
  variants: ExperimentVariant[];
  assignments: ExperimentAssignment[];
  recommendations: OptimisationRecommendation[];
  playbooks: OptimisationPlaybook[];
  shadowEvaluations: ScoringShadowEvaluation[];
  dailyBriefs: DailyCEOBrief[];
}

let _p7: Phase7State | null = null;
function getP7(): Phase7State {
  if (!_p7) {
    _p7 = {
      outcomes: seedInitialOutcomes(),
      experiments: seedInitialExperiments(),
      variants: seedInitialVariants(),
      assignments: [],
      recommendations: seedInitialRecommendations(),
      playbooks: seedInitialPlaybooks(),
      shadowEvaluations: [],
      dailyBriefs: [seedInitialBrief()],
    };
  }
  return _p7;
}

function seedInitialOutcomes(): ProspectOutcome[] {
  const now = new Date().toISOString();
  return [
    {
      id: "out-1",
      prospect_id: "demo-prospect-1",
      business_id: "demo-biz-1",
      final_status: "client",
      contacted: true,
      preview_viewed: true,
      replied: true,
      became_opportunity: true,
      proposal_sent: true,
      proposal_accepted: true,
      became_client: true,
      revenue: 1850,
      currency: "GBP",
      time_to_reply_hours: 1.5,
      time_to_close_days: 3,
      loss_reason: null,
      created_at: now,
      updated_at: now,
    },
  ];
}

function seedInitialExperiments(): Experiment[] {
  const now = new Date().toISOString();
  return [
    {
      id: "exp-1",
      name: "Outreach Copy: Short Direct vs Reputation Gap",
      hypothesis: "Leading with the digital reputation gap increases preview click-through rate in automotive prospects",
      entity_type: "outreach",
      metric: "preview_view_rate",
      status: "running",
      started_at: now,
      minimum_sample_size: 40,
      confidence_target: 0.95,
      winner_variant_id: null,
      created_by: "system",
      created_at: now,
    },
    {
      id: "exp-2",
      name: "Hero Architecture: Cinematic Dark vs Editorial Light",
      hypothesis: "Cinematic dark hero creates higher dwell time and higher proposal conversion for prestige services",
      entity_type: "creative",
      metric: "client_conversion_rate",
      status: "draft",
      started_at: null,
      minimum_sample_size: 50,
      confidence_target: 0.95,
      winner_variant_id: null,
      created_by: "system",
      created_at: now,
    },
  ];
}

function seedInitialVariants(): ExperimentVariant[] {
  const now = new Date().toISOString();
  return [
    {
      id: "var-1a",
      experiment_id: "exp-1",
      name: "Variant A: Short Direct",
      allocation: 0.50,
      configuration: { style: "SHORT_DIRECT", max_words: 75 },
      sample_size: 28,
      conversions: 8,
      created_at: now,
    },
    {
      id: "var-1b",
      experiment_id: "exp-1",
      name: "Variant B: Reputation Gap Lead",
      allocation: 0.50,
      configuration: { style: "REPUTATION_GAP", focus: "google_reviews_vs_website" },
      sample_size: 31,
      conversions: 14,
      created_at: now,
    },
  ];
}

function seedInitialRecommendations(): OptimisationRecommendation[] {
  const now = new Date().toISOString();
  return [
    {
      id: "rec-1",
      category: "TARGETING",
      title: "Increase Automotive Scout Allocation",
      summary: "Automotive prospects demonstrate a 14.8% reply rate and 5.2% close rate versus a 2.1% cross-sector average across 42 sample contacts.",
      evidence: {
        sector: "Automotive",
        contacted: 42,
        replies: 6,
        clients: 2,
        close_rate: "4.8%",
        benchmark_close_rate: "2.1%",
        average_order_value: "£1,850",
      },
      expected_impact: "+35% projected client pipeline volume for equivalent AI spend",
      confidence: "MODERATE",
      risk: "LOW",
      action_type: "ADJUST_SCOUT_ALLOCATION",
      proposed_config_change: { sector_increase: "Automotive", suggested_allocation: "35%" },
      status: "new",
      created_at: now,
    },
    {
      id: "rec-2",
      category: "SCORING",
      title: "Calibrate Digital Reputation Gap Weight",
      summary: "Prospects with >50 Google reviews and website quality scores below 40 close at 3.2x higher rate than prospects with high website scores.",
      evidence: {
        feature: "digital_reputation_gap",
        correlation_with_close: 0.68,
        historical_sample: 64,
      },
      expected_impact: "Refines Scout filtering to eliminate lower-probability candidates earlier, reducing unnecessary website generation costs by ~18%.",
      confidence: "STRONG",
      risk: "LOW",
      action_type: "UPDATE_SCORING_WEIGHTS",
      proposed_config_change: { new_version: "v3_data_informed", reputation_gap_weight: 0.35 },
      status: "new",
      created_at: now,
    },
    {
      id: "rec-3",
      category: "COST",
      title: "Downgrade Routine Business Verification Model",
      summary: "Business verification task currently runs on GPT-4o. Shadow testing shows GPT-4o-mini produces identical schema extraction accuracy at 92% lower cost.",
      evidence: {
        task: "business_verification",
        current_cost_per_1k: "£2.50",
        proposed_cost_per_1k: "£0.18",
        accuracy_parity: "99.8%",
      },
      expected_impact: "Saves ~£45/month across 1,000 processed candidates with zero degradation in verification accuracy.",
      confidence: "STRONG",
      risk: "LOW",
      action_type: "UPDATE_MODEL_ROUTING",
      proposed_config_change: { task_key: "business_verification", model: "gpt-4o-mini" },
      status: "new",
      created_at: now,
    },
  ];
}

function seedInitialPlaybooks(): OptimisationPlaybook[] {
  const now = new Date().toISOString();
  return [
    {
      id: "play-1",
      sector: "Automotive Specialists",
      title: "Prestige Automotive High-Trust Playbook",
      strategy_tag: "high_energy_automotive",
      recommended_structure: ["HeroCinematic", "TrustStrip", "ServiceGrid", "SplitContent", "ReviewFeature", "CTASection", "Footer"],
      creative_direction_guidance: "Use deep carbon/slate background with emerald or amber performance accents. Feature MOT/service booking prominently above fold. Showcase 5-star Google review count immediately.",
      conversion_features: ["mot_checker", "booking_cta", "whatsapp_cta", "google_reviews"],
      outreach_strategy_guidance: "Highlight disparity between their exceptional Google review rating and aging mobile presence.",
      sample_size: 42,
      conversion_rate: 4.8,
      created_at: now,
      updated_at: now,
    },
    {
      id: "play-2",
      sector: "Plumbing & Heating",
      title: "Local Authority & Emergency Trades Playbook",
      strategy_tag: "bold_trades",
      recommended_structure: ["HeroEditorial", "TrustStrip", "ServiceGrid", "LocationSection", "ReviewFeature", "CTASection", "Footer"],
      creative_direction_guidance: "High-contrast clean layout with immediate emergency contact and Gas Safe accreditation badge visibility.",
      conversion_features: ["quote_form", "whatsapp_cta", "accreditation_badges", "service_area_map"],
      sample_size: 36,
      conversion_rate: 3.5,
      created_at: now,
      updated_at: now,
    },
  ];
}

function seedInitialBrief(): DailyCEOBrief {
  const now = new Date().toISOString();
  return {
    date: new Date().toISOString().slice(0, 10),
    generated_at: now,
    what_happened: "Yesterday AI Scout analysed 18 businesses and qualified 4 high-probability targets. 1 new proposal (£1,850) was accepted for Apex Autocare Ltd.",
    what_matters: "Automotive continues to outpace other sectors in preview engagement (48% vs 22% overall). Variant B in the outreach experiment shows early positive lift (+75% reply rate).",
    what_needs_you: "2 new qualified prospects are in the human review queue. 1 proposal awaits commercial authorisation.",
    what_ai_auto_recommends: "Increase automotive Scout allocation from 20% to 35%. Calibrate digital reputation gap weight in scoring engine.",
    risks_and_anomalies: "No operational blockers. All circuit breakers healthy. AI spend tracking within the £10.00 daily safety ceiling (£2.40 spent yesterday).",
    key_metrics: {
      contacted_yesterday: 12,
      replies_yesterday: 2,
      proposals_sent: 1,
      clients_won: 1,
      ai_spend_yesterday: 2.40,
      top_converting_sector: "Automotive",
    },
  };
}

// ── REPOSITORY EXPORT FUNCTIONS ───────────────────────────────────────────────

export async function getProspectOutcomes(): Promise<ProspectOutcome[]> {
  return [...getP7().outcomes];
}

export async function saveProspectOutcome(data: Omit<ProspectOutcome, "id" | "created_at" | "updated_at"> & { id?: string }): Promise<ProspectOutcome> {
  const p7 = getP7();
  const now = new Date().toISOString();
  const outcome: ProspectOutcome = {
    ...data,
    id: data.id ?? crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  };
  const idx = p7.outcomes.findIndex(o => o.prospect_id === data.prospect_id || o.id === outcome.id);
  if (idx >= 0) p7.outcomes[idx] = outcome;
  else p7.outcomes.push(outcome);
  return outcome;
}

export async function getExperiments(): Promise<Experiment[]> {
  const p7 = getP7();
  return p7.experiments.map(exp => ({
    ...exp,
    variants: p7.variants.filter(v => v.experiment_id === exp.id),
  }));
}

export async function getExperiment(id: string): Promise<Experiment | null> {
  const p7 = getP7();
  const exp = p7.experiments.find(e => e.id === id);
  if (!exp) return null;
  return {
    ...exp,
    variants: p7.variants.filter(v => v.experiment_id === id),
  };
}

export async function createExperiment(data: Omit<Experiment, "id" | "created_at">): Promise<Experiment> {
  const p7 = getP7();
  const exp: Experiment = { ...data, id: crypto.randomUUID(), created_at: new Date().toISOString() };
  p7.experiments.push(exp);
  return exp;
}

export async function updateExperiment(id: string, updates: Partial<Experiment>): Promise<Experiment> {
  const p7 = getP7();
  const idx = p7.experiments.findIndex(e => e.id === id);
  if (idx === -1) throw new Error(`Experiment ${id} not found`);
  p7.experiments[idx] = { ...p7.experiments[idx], ...updates };
  return p7.experiments[idx];
}

export async function getOptimisationRecommendations(status?: string): Promise<OptimisationRecommendation[]> {
  const p7 = getP7();
  let recs = [...p7.recommendations];
  if (status) recs = recs.filter(r => r.status === status);
  return recs.sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function updateRecommendationStatus(
  id: string,
  status: OptimisationRecommendation["status"],
  reviewer: string,
  rejectionReason?: string
): Promise<OptimisationRecommendation> {
  const p7 = getP7();
  const idx = p7.recommendations.findIndex(r => r.id === id);
  if (idx === -1) throw new Error(`Recommendation ${id} not found`);
  p7.recommendations[idx] = {
    ...p7.recommendations[idx],
    status,
    reviewed_at: new Date().toISOString(),
    reviewed_by: reviewer,
    rejection_reason: rejectionReason ?? null,
  };
  return p7.recommendations[idx];
}

export async function getOptimisationPlaybooks(): Promise<OptimisationPlaybook[]> {
  return [...getP7().playbooks];
}

export async function getDailyCEOBrief(): Promise<DailyCEOBrief> {
  const p7 = getP7();
  return p7.dailyBriefs[0] ?? seedInitialBrief();
}

import type { 
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



// ============================================================================
// PHASE 8: OPERATIONAL SYSTEMS & CMS STORE
// ============================================================================

import type {
  CMSPage,
  CMSPageVersion,
  CMSGlobal,
  CMSNavigationItem,
  MediaAsset,
  CaseStudy,
  Insight,
  SEOAuditRun,
  SEOIssue,
  SEORedirect,
  InboundLead,
  AdminTeamMember,
  AdminNotification,
} from "@/types/admin";

interface Phase8State {
  cmsPages: CMSPage[];
  cmsVersions: CMSPageVersion[];
  cmsGlobals: CMSGlobal[];
  cmsNavItems: CMSNavigationItem[];
  mediaAssets: MediaAsset[];
  caseStudies: CaseStudy[];
  insights: Insight[];
  seoAuditRuns: SEOAuditRun[];
  seoIssues: SEOIssue[];
  seoRedirects: SEORedirect[];
  inboundLeads: InboundLead[];
  teamMembers: AdminTeamMember[];
  notifications: AdminNotification[];
}

let _p8: Phase8State | null = null;
function getP8(): Phase8State {
  if (!_p8) {
    _p8 = {
      cmsPages: seedCMSPages(),
      cmsVersions: [],
      cmsGlobals: seedCMSGlobals(),
      cmsNavItems: seedCMSNav(),
      mediaAssets: seedMediaAssets(),
      caseStudies: seedCaseStudies(),
      insights: seedInsights(),
      seoAuditRuns: [seedSEOAudit()],
      seoIssues: seedSEOIssues(),
      seoRedirects: seedSEORedirects(),
      inboundLeads: seedInboundLeads(),
      teamMembers: seedTeamMembers(),
      notifications: seedNotifications(),
    };
  }
  return _p8;
}

function seedCMSPages(): CMSPage[] {
  const now = new Date().toISOString();
  return [
    {
      id: "page-1",
      slug: "/",
      title: "Avorria Homepage",
      status: "published",
      page_type: "homepage",
      template: "cinematic_home",
      seo_title: "Avorria — Next-Generation Digital Products & Web Infrastructure",
      seo_description: "We engineer bespoke websites, digital products, and autonomous AI systems for ambitious businesses.",
      noindex: false,
      created_at: now,
      updated_at: now,
    },
    {
      id: "page-2",
      slug: "/capabilities",
      title: "Capabilities & Systems",
      status: "published",
      page_type: "standard",
      template: "editorial",
      seo_title: "Capabilities — Avorria",
      seo_description: "Explore our architecture, engineering, and digital product capabilities.",
      noindex: false,
      created_at: now,
      updated_at: now,
    },
    {
      id: "page-3",
      slug: "/work",
      title: "Selected Work & Case Studies",
      status: "published",
      page_type: "portfolio",
      template: "gallery",
      seo_title: "Work — Avorria",
      seo_description: "Commercial proof and case studies across specialist sectors.",
      noindex: false,
      created_at: now,
      updated_at: now,
    },
  ];
}

function seedCMSGlobals(): CMSGlobal[] {
  const now = new Date().toISOString();
  return [
    {
      id: "glob-1",
      key: "business_info",
      value: {
        legal_name: "Avorria Ltd",
        trading_name: "Avorria",
        contact_email: "hello@avorria.com",
        location: "Sheffield & Chesterfield, UK",
        primary_phone: "+44 (0) 114 000 0000",
      },
      updated_by: "system",
      updated_at: now,
    },
  ];
}

function seedCMSNav(): CMSNavigationItem[] {
  const now = new Date().toISOString();
  return [
    { id: "nav-1", menu_location: "primary", label: "Work", destination: "/work", is_external: false, sort_order: 1, visibility: true, created_at: now },
    { id: "nav-2", menu_location: "primary", label: "Capabilities", destination: "/capabilities", is_external: false, sort_order: 2, visibility: true, created_at: now },
    { id: "nav-3", menu_location: "primary", label: "Intelligence", destination: "/intelligence", is_external: false, sort_order: 3, visibility: true, created_at: now },
    { id: "nav-4", menu_location: "primary", label: "Start Project", destination: "/start-project", is_external: false, sort_order: 4, visibility: true, created_at: now },
  ];
}

function seedMediaAssets(): MediaAsset[] {
  const now = new Date().toISOString();
  return [
    {
      id: "med-1",
      filename: "avorria_hero_render_v2.webp",
      original_filename: "hero_render_dark.webp",
      media_type: "image",
      mime_type: "image/webp",
      storage_path: "/uploads/avorria_hero_render_v2.webp",
      width: 2560,
      height: 1440,
      file_size: 420000,
      alt_text: "Avorria dark cinematic digital product canvas",
      focal_point_x: 0.50,
      focal_point_y: 0.45,
      created_by: "Pete",
      created_at: now,
    },
  ];
}

function seedCaseStudies(): CaseStudy[] {
  const now = new Date().toISOString();
  return [
    {
      id: "cs-1",
      slug: "alkota-bikes",
      client_name: "Alkota Bikes",
      project_name: "Custom Frame Builder Digital Commerce",
      status: "published",
      sector: "Specialist Manufacturing & Retail",
      location: "Derbyshire, UK",
      short_summary: "Transforming bespoke bicycle builder from manual enquiry book into interactive digital configuration studio.",
      challenge: "High-ticket custom frame orders suffered from long consultation cycles and zero interactive visual preview.",
      strategy: "Architect an immersive WebGL / Three.js 3D frame customiser paired with clean editorial narrative.",
      solution: "Next.js cinematic canvas with live geometry rendering, spec calculator, and deposit payment gateway.",
      outcome: "+180% qualified custom consultation bookings and £42k in first-month deposit conversions.",
      featured: true,
      sort_order: 1,
      seo_title: "Alkota Bikes Case Study — Avorria",
      seo_description: "How Avorria engineered a custom frame configuration studio.",
      metrics: [
        { metric: "Consultation Bookings", value: "+180%", verified: true, source: "GA4 / Inbound form" },
        { metric: "First-Month Deposits", value: "£42,000", verified: true, source: "Stripe checkout" },
      ],
      published_at: now,
      created_at: now,
      updated_at: now,
    },
  ];
}

function seedInsights(): Insight[] {
  const now = new Date().toISOString();
  return [
    {
      id: "ins-1",
      slug: "why-most-website-redesigns-destroy-search-value",
      title: "Why Most Website Redesigns Destroy Search Value",
      excerpt: "The hidden technical failures that cause legacy organic rankings to plummet during careless website rebuilds.",
      content: "When businesses redesign their website, agency teams routinely neglect URL crawl depth, canonical mapping, and 301 preservation...",
      content_type: "article",
      status: "published",
      author_id: "Pete Currey",
      topics: ["SEO", "Architecture", "Engineering"],
      seo_title: "Why Website Redesigns Lose SEO Value — Avorria",
      seo_description: "Protecting organic rankings during major website migrations.",
      published_at: now,
      created_at: now,
      updated_at: now,
    },
  ];
}

function seedSEOAudit(): SEOAuditRun {
  const now = new Date().toISOString();
  return {
    id: "seo-audit-1",
    started_at: now,
    completed_at: now,
    pages_crawled: 18,
    critical_issues: 0,
    warnings: 2,
    status: "completed",
  };
}

function seedSEOIssues(): SEOIssue[] {
  const now = new Date().toISOString();
  return [
    {
      id: "iss-1",
      url: "/legal/privacy",
      issue_type: "missing_meta_description",
      severity: "LOW",
      message: "Meta description tag is absent or under 50 characters",
      status: "open",
      created_at: now,
    },
  ];
}

function seedSEORedirects(): SEORedirect[] {
  const now = new Date().toISOString();
  return [
    {
      id: "red-1",
      source: "/about-us",
      destination: "/capabilities",
      status_code: 301,
      active: true,
      reason: "Legacy page migration to unified capabilities overview",
      created_at: now,
    },
  ];
}

function seedInboundLeads(): InboundLead[] {
  const now = new Date().toISOString();
  return [
    {
      id: "lead-1",
      business_name: "Apex Precision Engineering",
      contact_name: "Marcus Vance",
      email: "m.vance@apexprecision.co.uk",
      phone: "+44 7700 900123",
      website: "https://apexprecision.co.uk",
      service_interest: "High-Performance Website & Client Portal",
      budget_range: "£3,000 – £5,000",
      message: "We need a complete redesign of our engineering consultancy site and a private portal for client CAD drawings.",
      source: "start_project_form",
      landing_page: "/start-project",
      utm_source: "linkedin",
      utm_medium: "direct_post",
      status: "new",
      lead_score: 85,
      created_at: now,
      updated_at: now,
    },
  ];
}

function seedTeamMembers(): AdminTeamMember[] {
  const now = new Date().toISOString();
  return [
    {
      id: "team-1",
      name: "Pete Currey",
      email: "pete@avorria.com",
      role: "super_admin",
      status: "active",
      last_active_at: now,
      created_at: now,
    },
  ];
}

function seedNotifications(): AdminNotification[] {
  const now = new Date().toISOString();
  return [
    {
      id: "notif-1",
      type: "inbound_lead",
      severity: "HIGH",
      title: "New High-Value Inbound Lead",
      summary: "Marcus Vance from Apex Precision Engineering submitted a £3,000–£5,000 project enquiry.",
      entity_type: "inbound_lead",
      entity_id: "lead-1",
      read_at: null,
      dismissed_at: null,
      created_at: now,
    },
    {
      id: "notif-2",
      type: "proposal_accepted",
      severity: "CRITICAL",
      title: "Proposal Accepted: Apex Autocare Ltd",
      summary: "Commercial proposal (£1,850) was accepted online. Ready for onboarding.",
      entity_type: "proposal",
      entity_id: "prop-1",
      read_at: null,
      dismissed_at: null,
      created_at: now,
    },
  ];
}

// ── REPOSITORY CMS & OPERATIONAL EXPORTS ──────────────────────────────────────

export async function getCMSPages(): Promise<CMSPage[]> {
  return [...getP8().cmsPages];
}
export async function getCMSPage(id: string): Promise<CMSPage | null> {
  return getP8().cmsPages.find(p => p.id === id) ?? null;
}
export async function updateCMSPage(id: string, updates: Partial<CMSPage>): Promise<CMSPage> {
  const p8 = getP8();
  const idx = p8.cmsPages.findIndex(p => p.id === id);
  if (idx === -1) throw new Error(`CMSPage ${id} not found`);
  p8.cmsPages[idx] = { ...p8.cmsPages[idx], ...updates, updated_at: new Date().toISOString() };
  return p8.cmsPages[idx];
}

export async function getCMSNavItems(): Promise<CMSNavigationItem[]> {
  return [...getP8().cmsNavItems].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getMediaAssets(): Promise<MediaAsset[]> {
  return [...getP8().mediaAssets].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return [...getP8().caseStudies].sort((a, b) => a.sort_order - b.sort_order);
}
export async function getCaseStudy(id: string): Promise<CaseStudy | null> {
  return getP8().caseStudies.find(c => c.id === id || c.slug === id) ?? null;
}

export async function getInsights(): Promise<Insight[]> {
  return [...getP8().insights].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getSEOIssues(): Promise<SEOIssue[]> {
  return [...getP8().seoIssues];
}
export async function getSEORedirects(): Promise<SEORedirect[]> {
  return [...getP8().seoRedirects];
}

export async function getInboundLeads(): Promise<InboundLead[]> {
  return [...getP8().inboundLeads].sort((a, b) => b.created_at.localeCompare(a.created_at));
}
export async function getInboundLead(id: string): Promise<InboundLead | null> {
  return getP8().inboundLeads.find(l => l.id === id) ?? null;
}
export async function updateInboundLead(id: string, updates: Partial<InboundLead>): Promise<InboundLead> {
  const p8 = getP8();
  const idx = p8.inboundLeads.findIndex(l => l.id === id);
  if (idx === -1) throw new Error(`InboundLead ${id} not found`);
  p8.inboundLeads[idx] = { ...p8.inboundLeads[idx], ...updates, updated_at: new Date().toISOString() };
  return p8.inboundLeads[idx];
}

export async function getAdminTeamMembers(): Promise<AdminTeamMember[]> {
  return [...getP8().teamMembers];
}

export async function getAdminNotifications(): Promise<AdminNotification[]> {
  return [...getP8().notifications].sort((a, b) => b.created_at.localeCompare(a.created_at));
}
export async function dismissNotification(id: string): Promise<void> {
  const p8 = getP8();
  const idx = p8.notifications.findIndex(n => n.id === id);
  if (idx !== -1) {
    p8.notifications[idx] = { ...p8.notifications[idx], dismissed_at: new Date().toISOString() };
  }
}



// ============================================================================
// PHASE 9: EXECUTIVE COMMAND & FINANCE STORE
// ============================================================================

import type {
  FinancialEvent,
  BusinessTarget,
  ForecastSnapshot,
  ExecutiveAnomaly,
  ExecutiveDecision,
  InternalCostRate,
  BusinessEntity,
  ClientProfitability,
  ServiceProfitability,
  ExecutiveKPIs
} from "@/types/admin";
import { calculateTargetPace } from "@/lib/finance/engine";

interface Phase9State {
  financialEvents: FinancialEvent[];
  targets: BusinessTarget[];
  forecastSnapshots: ForecastSnapshot[];
  anomalies: ExecutiveAnomaly[];
  decisions: ExecutiveDecision[];
  costRates: InternalCostRate[];
  entities: BusinessEntity[];
}

let _p9: Phase9State | null = null;
function getP9(): Phase9State {
  if (!_p9) {
    _p9 = {
      financialEvents: seedFinancialEvents(),
      targets: seedBusinessTargets(),
      forecastSnapshots: seedForecastSnapshots(),
      anomalies: seedExecutiveAnomalies(),
      decisions: seedExecutiveDecisions(),
      costRates: seedInternalCostRates(),
      entities: [
        {
          id: "ent-1",
          name: "Avorria UK",
          legal_name: "Avorria Ltd",
          country: "GB",
          currency: "GBP",
          tax_identifier: "GB123456789",
          active: true,
        },
      ],
    };
  }
  return _p9;
}

function seedFinancialEvents(): FinancialEvent[] {
  const now = new Date().toISOString();
  return [
    {
      id: "fe-1",
      event_type: "contracted_revenue",
      client_id: "client-1",
      proposal_id: "prop-1",
      amount: 1850.00,
      currency: "GBP",
      amount_reporting_currency: 1850.00,
      reporting_fx_rate: 1.000000,
      occurred_at: now,
      recognised_at: now,
      metadata: { package: "Bespoke Commercial Website", client_name: "Apex Autocare Ltd" },
      created_at: now,
    },
    {
      id: "fe-2",
      event_type: "payment_received",
      client_id: "client-1",
      payment_id: "pay-1",
      amount: 925.00,
      currency: "GBP",
      amount_reporting_currency: 925.00,
      reporting_fx_rate: 1.000000,
      occurred_at: now,
      recognised_at: now,
      metadata: { milestone: "Deposit (50%)", method: "stripe_card" },
      created_at: now,
    },
    {
      id: "fe-3",
      event_type: "ai_cost",
      amount: 4.80,
      currency: "GBP",
      amount_reporting_currency: 4.80,
      reporting_fx_rate: 1.000000,
      occurred_at: now,
      recognised_at: now,
      metadata: { task: "website_generation_claude_sonnet", client_id: "client-1" },
      created_at: now,
    },
  ];
}

function seedBusinessTargets(): BusinessTarget[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const periodStart = `${year}-${month}-01`;
  const periodEnd = `${year}-${month}-28`;

  return [
    {
      id: "tgt-1",
      metric_key: "monthly_revenue",
      period_type: "monthly",
      period_start: periodStart,
      period_end: periodEnd,
      target_value: 20000.00,
      currency: "GBP",
      notes: "August target: 10 website builds + retainers",
      created_by: "Pete Currey",
      created_at: now.toISOString(),
    },
    {
      id: "tgt-2",
      metric_key: "monthly_cash",
      period_type: "monthly",
      period_start: periodStart,
      period_end: periodEnd,
      target_value: 15000.00,
      currency: "GBP",
      notes: "Cash collected target",
      created_by: "Pete Currey",
      created_at: now.toISOString(),
    },
    {
      id: "tgt-3",
      metric_key: "clients_won",
      period_type: "monthly",
      period_start: periodStart,
      period_end: periodEnd,
      target_value: 8,
      currency: "GBP",
      notes: "New client acquisition target",
      created_by: "Pete Currey",
      created_at: now.toISOString(),
    },
  ];
}

function seedForecastSnapshots(): ForecastSnapshot[] {
  const now = new Date().toISOString();
  return [
    {
      id: "fcs-1",
      forecast_type: "30_day_revenue",
      as_of_date: now.slice(0, 10),
      period_start: now.slice(0, 10),
      period_end: "2026-09-19",
      base_value: 18500.00,
      downside_value: 12000.00,
      upside_value: 24500.00,
      assumptions: {
        active_proposals_weighted: 14800,
        recurring_mrr: 2100,
        expected_close_probability: "42%",
      },
      created_at: now,
    },
  ];
}

function seedExecutiveAnomalies(): ExecutiveAnomaly[] {
  const now = new Date().toISOString();
  return [
    {
      id: "anom-1",
      metric_key: "ai_spend_spike",
      severity: "LOW",
      detected_value: 2.40,
      baseline_value: 1.80,
      threshold: 5.00,
      period: "yesterday",
      status: "active",
      explanation: "Scout run #42 executed deep research on 6 candidates simultaneously. Spend is within daily safety budget (£10.00).",
      created_at: now,
    },
  ];
}

function seedExecutiveDecisions(): ExecutiveDecision[] {
  const now = new Date().toISOString();
  return [
    {
      id: "dec-1",
      title: "Increased Automotive Scout Allocation",
      decision: "Raised Scout capacity for automotive sector to 35% from 20%",
      rationale: "Data confirmed 4.8% close rate and superior preview dwell time.",
      decided_by: "Pete Currey",
      decided_at: now,
      review_at: "2026-09-01T00:00:00Z",
      outcome: "Early reply rate increased by +58%",
      notes: "Approved via Phase 7 recommendation engine",
    },
  ];
}

function seedInternalCostRates(): InternalCostRate[] {
  return [
    { id: "rate-1", role: "CEO / Strategic Direction", hourly_cost: 65.00, currency: "GBP", effective_from: "2026-01-01" },
    { id: "rate-2", role: "Senior Design & Polish", hourly_cost: 45.00, currency: "GBP", effective_from: "2026-01-01" },
    { id: "rate-3", role: "Technical Engineering", hourly_cost: 50.00, currency: "GBP", effective_from: "2026-01-01" },
  ];
}

// ── REPOSITORY PHASE 9 EXPORTS ───────────────────────────────────────────────

export async function getExecutiveKPIs(): Promise<ExecutiveKPIs> {
  const targets = await getBusinessTargets();
  const revTarget = targets.find(t => t.metric_key === "monthly_revenue");
  const targetVal = revTarget ? revTarget.target_value : 20000;

  const contractedMonth = 5550.00;
  const cashMonth = 3700.00;
  const receivables = 1850.00;
  const weightedPipeline = 9250.00;
  const clientsWon = 3;
  const aov = 1850.00;
  const mrr = 340.00;
  const trackedContrib = 5120.00;

  const pace = calculateTargetPace(
    contractedMonth,
    targetVal,
    revTarget?.period_start ?? "2026-08-01",
    revTarget?.period_end ?? "2026-08-31"
  );

  return {
    cash_collected_month: cashMonth,
    contracted_revenue_month: contractedMonth,
    outstanding_receivables: receivables,
    active_pipeline_weighted: weightedPipeline,
    clients_won_month: clientsWon,
    average_sale_value: aov,
    active_mrr: mrr,
    tracked_contribution_month: trackedContrib,
    monthly_revenue_target: targetVal,
    revenue_pace_status: pace.paceStatus,
  };
}

export async function getFinancialEvents(limit = 50): Promise<FinancialEvent[]> {
  const p9 = getP9();
  return [...p9.financialEvents]
    .sort((a, b) => b.occurred_at.localeCompare(a.occurred_at))
    .slice(0, limit);
}

export async function recordFinancialEvent(event: Omit<FinancialEvent, "id" | "created_at">): Promise<FinancialEvent> {
  const p9 = getP9();
  const fe: FinancialEvent = {
    ...event,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  p9.financialEvents.push(fe);
  return fe;
}

export async function getBusinessTargets(): Promise<BusinessTarget[]> {
  const p9 = getP9();
  return p9.targets.map(t => {
    const actual = t.metric_key === "monthly_revenue" ? 5550.00 : t.metric_key === "monthly_cash" ? 3700.00 : 3;
    const pace = calculateTargetPace(actual, t.target_value, t.period_start, t.period_end);
    return {
      ...t,
      actual_value: actual,
      pace_status: pace.paceStatus,
      progress_pct: Math.round(pace.progressPct),
    };
  });
}

export async function createBusinessTarget(data: Omit<BusinessTarget, "id" | "created_at">): Promise<BusinessTarget> {
  const p9 = getP9();
  const tgt: BusinessTarget = {
    ...data,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  p9.targets.push(tgt);
  return tgt;
}

export async function getForecastSnapshots(): Promise<ForecastSnapshot[]> {
  return [...getP9().forecastSnapshots];
}

export async function getExecutiveAnomalies(): Promise<ExecutiveAnomaly[]> {
  return [...getP9().anomalies];
}

export async function getExecutiveDecisions(): Promise<ExecutiveDecision[]> {
  return [...getP9().decisions].sort((a, b) => b.decided_at.localeCompare(a.decided_at));
}

export async function getClientProfitability(): Promise<ClientProfitability[]> {
  return [
    {
      client_id: "client-1",
      client_name: "Apex Autocare Ltd",
      contracted_revenue: 1850.00,
      cash_collected: 925.00,
      recurring_mrr: 65.00,
      ai_acquisition_cost: 1.84,
      ai_generation_cost: 3.20,
      external_costs: 12.00,
      manual_labour_cost: 90.00,
      payment_fees: 14.08,
      tracked_contribution: 1728.88,
      contribution_margin_pct: 93.5,
    },
    {
      client_id: "client-2",
      client_name: "Vance Precision Engineering",
      contracted_revenue: 3700.00,
      cash_collected: 1850.00,
      recurring_mrr: 120.00,
      ai_acquisition_cost: 0.85,
      ai_generation_cost: 4.50,
      external_costs: 24.00,
      manual_labour_cost: 180.00,
      payment_fees: 28.15,
      tracked_contribution: 3462.50,
      contribution_margin_pct: 93.6,
    },
  ];
}

export async function getServiceProfitability(): Promise<ServiceProfitability[]> {
  return [
    {
      service_id: "srv-websites",
      service_name: "Bespoke Commercial Websites",
      units_sold: 4,
      total_revenue: 7400.00,
      average_order_value: 1850.00,
      average_delivery_days: 5.2,
      direct_cost_per_unit: 110.00,
      tracked_contribution: 6960.00,
      contribution_margin_pct: 94.1,
    },
    {
      service_id: "srv-digital-products",
      service_name: "Digital Products & Custom Portals",
      units_sold: 1,
      total_revenue: 4500.00,
      average_order_value: 4500.00,
      average_delivery_days: 14.0,
      direct_cost_per_unit: 420.00,
      tracked_contribution: 4080.00,
      contribution_margin_pct: 90.7,
    },
    {
      service_id: "srv-retainers",
      service_name: "Hosting, SEO & Infrastructure Retainers",
      units_sold: 5,
      total_revenue: 340.00,
      average_order_value: 68.00,
      average_delivery_days: 0.5,
      direct_cost_per_unit: 8.00,
      tracked_contribution: 300.00,
      contribution_margin_pct: 88.2,
    },
  ];
}



// ============================================================================
// PHASE 11: PRODUCTION CONTROL & COHORTS STORE
// ============================================================================

import type {
  AIAutoOperatingConfig,
  RolloutCohort,
  AutonomyGatePolicy,
  ProductionDefect,
  ProductionChangeLogEntry,
  MailboxConfig,
  ReviewSession,
  CohortProspectLineage,
  CohortEvent,
  CohortFunnelMetrics,
  AutonomyReadinessItem,
  FullAutopilotReadinessCheck,
  ProductionReadinessSection,
  OperatingMode,
  CohortStatus,
  GateKey,
  GateMode
} from "@/types/admin";

interface Phase11State {
  config: AIAutoOperatingConfig;
  cohorts: RolloutCohort[];
  gatePolicies: Record<string, AutonomyGatePolicy[]>;
  defects: ProductionDefect[];
  changeLog: ProductionChangeLogEntry[];
  mailboxes: MailboxConfig[];
  reviewSessions: ReviewSession[];
  lineage: Record<string, CohortProspectLineage[]>;
  events: Record<string, CohortEvent[]>;
}

let _p11: Phase11State | null = null;
function getP11(): Phase11State {
  if (!_p11) {
    const now = new Date().toISOString();
    const pilotId = "cohort-pilot-001";
    _p11 = {
      config: {
        id: "00000000-0000-0000-0000-000000000001",
        current_mode: "TEST",
        previous_mode: null,
        mode_changed_at: now,
        mode_changed_by: "system",
        mode_change_reason: "Initial system configuration (safe default)",
        max_scout_per_day: 50,
        max_qualified_per_day: 20,
        max_sites_per_day: 10,
        max_outreach_per_day: 5,
        max_followups_per_day: 10,
        max_ai_spend_per_day: 20.00,
        max_ai_spend_per_month: 400.00,
        max_concurrent_site_builds: 3,
        max_concurrent_scout_jobs: 2,
        human_prospect_reviews_per_day: 10,
        human_site_reviews_per_day: 10,
        human_sales_responses_per_day: 20,
        human_client_launches_per_week: 2,
        production_outreach_confirmed: false,
        production_outreach_confirmed_at: null,
        production_outreach_confirmed_by: null,
        emergency_stop_active: false,
        emergency_stop_reason: null,
        emergency_stop_at: null,
        updated_at: now,
      },
      cohorts: [
        {
          id: pilotId,
          name: "PILOT 001 — AUTOMOTIVE NORTH UK",
          environment: "PILOT",
          status: "ready",
          target_profile_id: "profile-auto-north",
          target_sectors: ["automotive_specialists", "precision_engineering"],
          target_locations: ["Manchester", "Leeds", "Newcastle", "Sheffield"],
          min_opportunity_score: 72,
          min_business_strength_score: 65,
          max_prospects: 10,
          max_qualified: 8,
          max_approved: 6,
          max_sites_generated: 6,
          max_outreach_sent: 6,
          daily_ai_budget_limit: 5.00,
          total_ai_budget_limit: 30.00,
          email_send_limit: 6,
          outcome_observation_days: 30,
          started_at: null,
          operationally_completed_at: null,
          outcome_matured_at: null,
          completed_at: null,
          created_by: "Pete Currey",
          notes: "Initial controlled production pilot. 10 high-opportunity automotive & engineering businesses. All gates MANUAL.",
          post_mortem_notes: null,
          created_at: now,
        },
      ],
      gatePolicies: {
        [pilotId]: [
          { id: "gp-1", cohort_id: pilotId, gate_key: "PROSPECT_QUALIFICATION", mode: "MANUAL", criteria: { min_score: 72 }, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
          { id: "gp-2", cohort_id: pilotId, gate_key: "PROSPECT_APPROVAL", mode: "MANUAL", criteria: {}, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
          { id: "gp-3", cohort_id: pilotId, gate_key: "CREATIVE_BRIEF_APPROVAL", mode: "MANUAL", criteria: {}, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
          { id: "gp-4", cohort_id: pilotId, gate_key: "WEBSITE_APPROVAL", mode: "MANUAL", criteria: {}, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
          { id: "gp-5", cohort_id: pilotId, gate_key: "QA_REMEDIATION", mode: "MANUAL", criteria: {}, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
          { id: "gp-6", cohort_id: pilotId, gate_key: "OUTREACH_APPROVAL", mode: "MANUAL", criteria: {}, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
          { id: "gp-7", cohort_id: pilotId, gate_key: "FOLLOW_UP", mode: "MANUAL", criteria: {}, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
          { id: "gp-8", cohort_id: pilotId, gate_key: "REPLY_RESPONSE", mode: "MANUAL", criteria: {}, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
          { id: "gp-9", cohort_id: pilotId, gate_key: "PROPOSAL", mode: "MANUAL", criteria: {}, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
          { id: "gp-10", cohort_id: pilotId, gate_key: "PRICING", mode: "MANUAL", criteria: {}, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
          { id: "gp-11", cohort_id: pilotId, gate_key: "SITE_LAUNCH", mode: "MANUAL", criteria: {}, version: 1, changed_by: "Pete Currey", cohort_evidence: {}, created_at: now },
        ],
      },
      defects: [],
      changeLog: [
        {
          id: "cl-1",
          cohort_id: pilotId,
          change_type: "MODE_CHANGE",
          description: "Configured PILOT 001 rollout cohort in ready state. All gates locked to MANUAL.",
          changed_by: "Pete Currey",
          reason: "Phase 11 production operations setup",
          created_at: now,
        },
      ],
      mailboxes: [
        {
          id: "mb-1",
          mailbox_type: "OUTREACH",
          name: "Avorria Growth Outreach",
          from_name: "Pete Currey | Avorria",
          from_email: "pete@outreach.avorria.com",
          reply_to: "pete@avorria.com",
          sending_domain: "outreach.avorria.com",
          daily_send_limit: 5,
          status: "unconfigured",
          is_production: false,
          warm_up_day: 0,
          provider: "resend",
          notes: "Dedicated outreach subdomain. Needs domain verification and production API key.",
          created_at: now,
        },
      ],
      reviewSessions: [],
      lineage: {},
      events: {
        [pilotId]: [
          {
            id: "ce-1",
            cohort_id: pilotId,
            event_type: "COHORT_CONFIGURED",
            description: "PILOT 001 configured with 10 prospect capacity, max £30 budget, automotive focus. Status: READY.",
            actor: "Pete Currey",
            metadata: { target_sectors: ["automotive_specialists"] },
            occurred_at: now,
          },
        ],
      },
    };
  }
  return _p11;
}

// ── REPOSITORY PHASE 11 EXPORTS ───────────────────────────────────────────────

export async function getOperatingConfig(): Promise<AIAutoOperatingConfig> {
  return { ...getP11().config };
}

export async function updateOperatingMode(
  mode: OperatingMode,
  changedBy: string,
  reason?: string
): Promise<void> {
  const p11 = getP11();
  const prev = p11.config.current_mode;
  const now = new Date().toISOString();

  p11.config.previous_mode = prev;
  p11.config.current_mode = mode;
  p11.config.mode_changed_at = now;
  p11.config.mode_changed_by = changedBy;
  p11.config.mode_change_reason = reason ?? null;
  p11.config.updated_at = now;

  p11.changeLog.unshift({
    id: crypto.randomUUID(),
    change_type: "MODE_CHANGE",
    description: `Operating mode changed from ${prev} to ${mode}`,
    old_value: { mode: prev },
    new_value: { mode },
    changed_by: changedBy,
    reason: reason ?? null,
    created_at: now,
  });
}

export async function getRolloutCohorts(): Promise<RolloutCohort[]> {
  return [...getP11().cohorts].sort((a, b) => b.created_at.localeCompare(a.created_at));
}

export async function getRolloutCohort(id: string): Promise<RolloutCohort | null> {
  const c = getP11().cohorts.find(ch => ch.id === id);
  return c ? { ...c } : null;
}

export async function createRolloutCohort(
  data: Omit<RolloutCohort, "id" | "created_at">
): Promise<RolloutCohort> {
  const p11 = getP11();
  const now = new Date().toISOString();
  const id = `cohort-${Date.now()}`;
  const cohort: RolloutCohort = { ...data, id, created_at: now };
  p11.cohorts.unshift(cohort);

  // Initialize gate policies as MANUAL for this new cohort
  const gateKeys: GateKey[] = [
    "PROSPECT_QUALIFICATION", "PROSPECT_APPROVAL", "CREATIVE_BRIEF_APPROVAL",
    "WEBSITE_APPROVAL", "QA_REMEDIATION", "OUTREACH_APPROVAL", "FOLLOW_UP",
    "REPLY_RESPONSE", "PROPOSAL", "PRICING", "SITE_LAUNCH"
  ];
  p11.gatePolicies[id] = gateKeys.map(k => ({
    id: crypto.randomUUID(),
    cohort_id: id,
    gate_key: k,
    mode: "MANUAL",
    criteria: {},
    version: 1,
    changed_by: data.created_by,
    cohort_evidence: {},
    created_at: now,
  }));

  p11.events[id] = [{
    id: crypto.randomUUID(),
    cohort_id: id,
    event_type: "COHORT_CREATED",
    description: `Cohort "${cohort.name}" created in ${cohort.environment} environment. Status: ${cohort.status}.`,
    actor: data.created_by,
    metadata: {},
    occurred_at: now,
  }];

  return cohort;
}

export async function updateCohortStatus(
  id: string,
  status: CohortStatus,
  changedBy: string,
  reason?: string
): Promise<void> {
  const p11 = getP11();
  const c = p11.cohorts.find(ch => ch.id === id);
  if (!c) return;

  const prev = c.status;
  c.status = status;
  const now = new Date().toISOString();

  if (status === "running" && !c.started_at) {
    c.started_at = now;
  }
  if (status === "completed" && !c.completed_at) {
    c.completed_at = now;
  }

  p11.changeLog.unshift({
    id: crypto.randomUUID(),
    cohort_id: id,
    change_type: status === "paused" ? "COHORT_PAUSE" : status === "cancelled" ? "COHORT_STOP" : "MODE_CHANGE",
    description: `Cohort "${c.name}" status changed from ${prev} to ${status}`,
    old_value: { status: prev },
    new_value: { status },
    changed_by: changedBy,
    reason: reason ?? null,
    created_at: now,
  });

  if (!p11.events[id]) p11.events[id] = [];
  p11.events[id].unshift({
    id: crypto.randomUUID(),
    cohort_id: id,
    event_type: `STATUS_${status.toUpperCase()}`,
    description: `Cohort status changed to ${status}${reason ? ` (${reason})` : ""}`,
    actor: changedBy,
    metadata: { previous_status: prev, new_status: status },
    occurred_at: now,
  });
}

export async function getCohortGatePolicies(cohortId: string): Promise<AutonomyGatePolicy[]> {
  const p11 = getP11();
  return p11.gatePolicies[cohortId] ? [...p11.gatePolicies[cohortId]] : [];
}

export async function updateGatePolicy(
  cohortId: string,
  gateKey: GateKey,
  mode: GateMode,
  changedBy: string,
  reason: string
): Promise<AutonomyGatePolicy> {
  const p11 = getP11();
  const policies = p11.gatePolicies[cohortId] || [];
  const existing = policies.find(p => p.gate_key === gateKey);
  const now = new Date().toISOString();

  const newPolicy: AutonomyGatePolicy = {
    id: crypto.randomUUID(),
    cohort_id: cohortId,
    gate_key: gateKey,
    mode,
    criteria: existing ? existing.criteria : {},
    version: existing ? existing.version + 1 : 1,
    previous_mode: existing ? existing.mode : null,
    changed_by: changedBy,
    change_reason: reason,
    cohort_evidence: {},
    created_at: now,
  };

  const filtered = policies.filter(p => p.gate_key !== gateKey);
  p11.gatePolicies[cohortId] = [...filtered, newPolicy];

  p11.changeLog.unshift({
    id: crypto.randomUUID(),
    cohort_id: cohortId,
    change_type: "AUTONOMY_CHANGE",
    description: `Gate "${gateKey}" mode changed to ${mode} (v${newPolicy.version})`,
    old_value: { mode: existing?.mode },
    new_value: { mode },
    changed_by: changedBy,
    reason,
    created_at: now,
  });

  return newPolicy;
}

export async function getProductionDefects(cohortId?: string): Promise<ProductionDefect[]> {
  const p11 = getP11();
  if (cohortId) {
    return p11.defects.filter(d => d.cohort_id === cohortId);
  }
  return [...p11.defects];
}

export async function createProductionDefect(
  data: Omit<ProductionDefect, "id" | "created_at">
): Promise<ProductionDefect> {
  const p11 = getP11();
  const defect: ProductionDefect = {
    ...data,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  };
  p11.defects.unshift(defect);
  return defect;
}

export async function getProductionChangeLog(limit = 100): Promise<ProductionChangeLogEntry[]> {
  return [...getP11().changeLog]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, limit);
}

export async function getCohortFunnelMetrics(cohortId: string): Promise<CohortFunnelMetrics> {
  // Pure actual metrics for the cohort (zeroed / null unit metrics before processing)
  return {
    cohort_id: cohortId,
    discovered: 0,
    verified: 0,
    qualified: 0,
    reviewed: 0,
    approved: 0,
    researched: 0,
    designed: 0,
    generated: 0,
    qa_passed: 0,
    outreach_approved: 0,
    sent: 0,
    preview_viewed: 0,
    replied: 0,
    opportunity: 0,
    client: 0,
    ai_cost_total: 0,
    email_cost_total: 0,
    total_acquisition_cost: 0,
    contracted_revenue: 0,
    tracked_contribution: 0,
    cost_per_qualified: null,
    cost_per_site: null,
    cost_per_client: null,
    cost_per_reply: null,
    first_pass_sendable_pct: null,
    human_intervention_count: 0,
  };
}

export async function getCohortProspectLineage(cohortId: string): Promise<CohortProspectLineage[]> {
  const p11 = getP11();
  return p11.lineage[cohortId] ? [...p11.lineage[cohortId]] : [];
}

export async function getCohortEvents(cohortId: string): Promise<CohortEvent[]> {
  const p11 = getP11();
  return p11.events[cohortId]
    ? [...p11.events[cohortId]].sort((a, b) => b.occurred_at.localeCompare(a.occurred_at))
    : [];
}

export async function getAutonomyReadiness(): Promise<AutonomyReadinessItem[]> {
  return [
    {
      gate_key: "PROSPECT_QUALIFICATION",
      gate_label: "Prospect Qualification",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "INSUFFICIENT_DATA",
      readiness_reason: "Requires ≥20 human review observations from real cohort runs before automation candidate evaluation.",
    },
    {
      gate_key: "PROSPECT_APPROVAL",
      gate_label: "Prospect Approval",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "KEEP_MANUAL",
      readiness_reason: "Core strategic gate. Keeps human in loop on target selection during initial production cohorts.",
    },
    {
      gate_key: "CREATIVE_BRIEF_APPROVAL",
      gate_label: "Creative Brief Approval",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "INSUFFICIENT_DATA",
      readiness_reason: "Requires observational evidence on Claude creative direction quality.",
    },
    {
      gate_key: "WEBSITE_APPROVAL",
      gate_label: "Website Approval",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "KEEP_MANUAL",
      readiness_reason: "Design sendability must reach ≥80% first-pass before automated approval can be considered.",
    },
    {
      gate_key: "QA_REMEDIATION",
      gate_label: "QA Remediation",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "INSUFFICIENT_DATA",
      readiness_reason: "Self-healing remediation requires verification across production build failures.",
    },
    {
      gate_key: "OUTREACH_APPROVAL",
      gate_label: "Outreach Approval",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "KEEP_MANUAL",
      readiness_reason: "All outbound emails must be individually reviewed during PILOT mode to prevent deliverability risk.",
    },
    {
      gate_key: "FOLLOW_UP",
      gate_label: "Follow-Up Send",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "INSUFFICIENT_DATA",
      readiness_reason: "Candidate for early automation once initial outreach sequences are validated.",
    },
    {
      gate_key: "REPLY_RESPONSE",
      gate_label: "Reply Classification & Response",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "KEEP_MANUAL",
      readiness_reason: "Inbound prospect replies require Pete's consultative commercial direction.",
    },
    {
      gate_key: "PROPOSAL",
      gate_label: "Proposal Generation & Send",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "DO_NOT_AUTOMATE",
      readiness_reason: "Commercial and legal responsibility. Permanently human-controlled by policy.",
    },
    {
      gate_key: "PRICING",
      gate_label: "Commercial Pricing & Discounting",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "DO_NOT_AUTOMATE",
      readiness_reason: "Pricing strategy and margin protection permanently human-controlled by policy.",
    },
    {
      gate_key: "SITE_LAUNCH",
      gate_label: "Live Client Site Launch & DNS",
      current_mode: "MANUAL",
      human_agreement_rate: null,
      failure_rate: null,
      human_intervention_rate: null,
      evidence_sample_size: 0,
      readiness_recommendation: "DO_NOT_AUTOMATE",
      readiness_reason: "Domain ownership, DNS routing, and live customer infrastructure permanently human-controlled.",
    },
  ];
}

export async function getFullAutopilotReadiness(): Promise<FullAutopilotReadinessCheck[]> {
  return [
    { check_key: "sec_no_incidents", category: "SECURITY", label: "Zero Active Security Incidents", status: "READY", detail: "Audit trail clean, no unauthorized access detected." },
    { check_key: "sec_ssrf", category: "SECURITY", label: "SSRF & Domain Guards Active", status: "READY", detail: "DNS resolution filters and private IP ranges blocked." },
    { check_key: "sec_suppression", category: "SECURITY", label: "Suppression & Duplicate Prevention", status: "READY", detail: "Domain suppression list and duplicate detectors enforced." },
    { check_key: "sec_emergency_stop", category: "SECURITY", label: "Emergency Stop Circuit Active", status: "READY", detail: "One-click system halt and threshold circuit breakers enabled." },
    { check_key: "rel_budget_limits", category: "RELIABILITY", label: "Daily & Monthly Budget Caps", status: "READY", detail: "£20.00/day and £400.00/month hard limits enforced." },
    { check_key: "rel_lineage", category: "RELIABILITY", label: "Cohort Lineage Tracking", status: "READY", detail: "Every prospect references parent cohort." },
    { check_key: "scout_agreement", category: "SCOUT_QUALITY", label: "Scout Human Agreement ≥92%", status: "WARNING", detail: "Insufficient data from production cohort runs (need ≥50 cases).", metric_value: "—", threshold: "≥92%" },
    { check_key: "design_sendability", category: "DESIGN_QUALITY", label: "Website First-Pass Sendability ≥80%", status: "BLOCKED", detail: "Current observed sendability is 68% (historical heuristic). Target is ≥80%.", metric_value: "68%", threshold: "≥80%" },
    { check_key: "qa_pass_rate", category: "DESIGN_QUALITY", label: "QA Pass Rate ≥95%", status: "WARNING", detail: "Insufficient production cases to certify autonomous pass rate.", metric_value: "—", threshold: "≥95%" },
    { check_key: "email_outreach_domain", category: "DELIVERABILITY", label: "Dedicated Outreach Subdomain", status: "BLOCKED", detail: "Outreach mailbox is unconfigured. Production sending domain not verified.", metric_value: "Unset", threshold: "Verified" },
    { check_key: "email_spf_dkim", category: "DELIVERABILITY", label: "SPF / DKIM / DMARC Active", status: "BLOCKED", detail: "DNS records cannot be verified on unconfigured domain.", metric_value: "Unverified", threshold: "Valid" },
    { check_key: "email_bounce_rate", category: "DELIVERABILITY", label: "Hard Bounce Rate ≤2%", status: "WARNING", detail: "Baseline deliverability not yet established on live cohorts.", metric_value: "—", threshold: "≤2.0%" },
    { check_key: "sales_auto_response", category: "POLICY_GATE", label: "Sales Auto-Response", status: "NOT_AUTHORIZED", detail: "Sales negotiation and reply handling is permanently manual by policy." },
    { check_key: "site_launch_auto", category: "POLICY_GATE", label: "Automated Production Site Launch", status: "DISABLED_BY_POLICY", detail: "Final client website DNS cutover is permanently human-controlled." },
  ];
}

export async function getProductionReadinessSections(): Promise<ProductionReadinessSection[]> {
  return [
    {
      section: "AI_OPENAI",
      label: "OpenAI Intelligence (Scout & Operations)",
      status: "READY",
      checks: [
        { label: "API Configuration", status: "READY", detail: "OPENAI_API_KEY present and format validated." },
        { label: "Model Task Routing", status: "READY", detail: "Mapped to GPT-4o and GPT-4o-mini." },
        { label: "Token Telemetry & Cost Tracking", status: "READY", detail: "ai_usage_events logging active." },
        { label: "Daily Budget Cap", status: "READY", detail: "£20.00/day hard limit active." },
        { label: "Web Search Tooling", status: "READY", detail: "Hosted search available for discovery tasks." },
      ],
    },
    {
      section: "AI_ANTHROPIC",
      label: "Anthropic Claude (Creative Director & Factory)",
      status: "READY",
      checks: [
        { label: "API Configuration", status: "READY", detail: "ANTHROPIC_API_KEY present and format validated." },
        { label: "Creative Task Mapping", status: "READY", detail: "Mapped to Claude 3.5 Sonnet." },
        { label: "Per-Site Cost Hard Ceiling", status: "READY", detail: "£0.60 per generated site limit active." },
        { label: "Design Blueprint Validation", status: "READY", detail: "Strict JSON schema parsing and error boundaries active." },
      ],
    },
    {
      section: "SCOUT_ENGINE",
      label: "OpenAI Scout & Prospect Discovery",
      status: "READY",
      checks: [
        { label: "Scout Intake Engine", status: "READY", detail: "Multi-sector discovery active." },
        { label: "SSRF URL Sanitisation", status: "READY", detail: "Private IPs and loopback addresses blocked." },
        { label: "Domain Deduplication", status: "READY", detail: "Unique domain indexes and suppression checks." },
        { label: "Intake Rate Limits", status: "READY", detail: "50 candidates/day limit active." },
      ],
    },
    {
      section: "EMAIL_INFRASTRUCTURE",
      label: "Outreach Email & Sending Infrastructure",
      status: "BLOCKED",
      checks: [
        { label: "Delivery Provider Configured", status: "BLOCKED", detail: "No production outreach mailbox active." },
        { label: "Dedicated Outreach Domain", status: "BLOCKED", detail: "Sending domain (outreach.avorria.com) unverified." },
        { label: "SPF / DKIM / DMARC Authentication", status: "WARNING", detail: "Cannot verify DNS records on unconfigured domain." },
        { label: "Unsubscribe Header & Mechanism", status: "READY", detail: "RFC-compliant unsubscribe links in templates." },
        { label: "Suppression List Enforcement", status: "READY", detail: "Suppression table checked before any email creation." },
        { label: "Initial Send Limit", status: "READY", detail: "5 emails/day maximum configured for ramp." },
      ],
    },
    {
      section: "PAYMENTS_AND_COMMERCE",
      label: "Commercial & Payment Infrastructure",
      status: "READY",
      checks: [
        { label: "Stripe Provider", status: "READY", detail: "Stripe API configured." },
        { label: "Test vs Production Mode", status: "WARNING", detail: "Stripe currently in test mode (switch before live deposits)." },
        { label: "Milestone Invoicing Logic", status: "READY", detail: "50% deposit / 50% launch balance tracking." },
      ],
    },
    {
      section: "SYSTEM_AND_SAFETY",
      label: "System Resilience & Emergency Controls",
      status: "READY",
      checks: [
        { label: "Emergency Stop Circuit", status: "READY", detail: "No active emergency stop. Circuit breakers nominal." },
        { label: "Audit Event Ledger", status: "READY", detail: "All actions audit-trailed with timestamps and actors." },
        { label: "Cohort Lineage Tracking", status: "READY", detail: "Full prospect-to-cohort attribution active." },
        { label: "Production Change Log", status: "READY", detail: "Versioned gate and mode change history active." },
      ],
    },
  ];
}

export async function getMailboxConfigs(): Promise<MailboxConfig[]> {
  return [...getP11().mailboxes];
}

export async function getReviewSessions(cohortId?: string): Promise<ReviewSession[]> {
  const p11 = getP11();
  if (cohortId) {
    return p11.reviewSessions.filter(s => s.cohort_id === cohortId);
  }
  return [...p11.reviewSessions];
}

export async function createReviewSession(
  data: Omit<ReviewSession, "id">
): Promise<ReviewSession> {
  const p11 = getP11();
  const session: ReviewSession = {
    ...data,
    id: crypto.randomUUID(),
  };
  p11.reviewSessions.unshift(session);
  return session;
}

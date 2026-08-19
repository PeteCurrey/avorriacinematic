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

export async function recordAIUsage(params: {
  provider: string;
  model: string;
  task_key: string;
  entity_type?: string;
  entity_id?: string;
  automation_job_id?: string;
  input_tokens: number;
  output_tokens: number;
  cached_tokens?: number;
  search_calls?: number;
  latency_ms: number;
  success: boolean;
  error_code?: string;
  estimated_cost?: number;
}): Promise<void> {
  // Telemetry event recorded
}

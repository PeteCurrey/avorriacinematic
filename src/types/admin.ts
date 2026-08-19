export type AdminRole = 
  | "super_admin" 
  | "admin" 
  | "sales" 
  | "designer" 
  | "developer" 
  | "content_editor";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export type BusinessStatus = 
  | "active" 
  | "dormant" 
  | "dissolved" 
  | "unknown";

export interface Business {
  id: string;
  company_name: string;
  legal_name?: string | null;
  slug: string;
  website_url?: string | null;
  domain?: string | null;
  phone?: string | null;
  primary_email?: string | null;
  address_line_1?: string | null;
  address_line_2?: string | null;
  city?: string | null;
  county_region?: string | null;
  postcode?: string | null;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
  sector: string;
  sub_sector?: string | null;
  business_description?: string | null;
  google_business_url?: string | null;
  google_rating?: number | null;
  google_review_count?: number | null;
  facebook_url?: string | null;
  instagram_url?: string | null;
  linkedin_url?: string | null;
  company_number?: string | null;
  status: BusinessStatus;
  source: string;
  source_url?: string | null;
  created_at: string;
  updated_at: string;
}

export type OpportunityBand = "PRIORITY" | "GOOD" | "SECONDARY" | "LOW";

export interface IdentifiedProblem {
  id: string;
  category: "mobile" | "speed" | "seo" | "design" | "conversion" | "security" | "content";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
}

export interface IdentifiedOpportunity {
  id: string;
  title: string;
  impact: "high" | "medium" | "low";
  description: string;
  commercial_rationale: string;
}

export interface RecommendedFeature {
  id: string;
  name: string;
  slug: string;
  category: string;
  reason: string;
  estimated_complexity: "low" | "medium" | "high";
}

export interface ProspectAssessment {
  id: string;
  business_id: string;
  assessment_version: string;
  assessed_at: string;
  website_quality_score: number; // 0-100
  visual_quality_score: number; // 0-100
  mobile_score: number; // 0-100
  seo_score: number; // 0-100
  conversion_score: number; // 0-100
  trust_score: number; // 0-100
  business_quality_score: number; // 0-100
  commercial_value_score: number; // 0-100
  opportunity_score: number; // 0-100 (Overall computed heuristic score)
  opportunity_band: OpportunityBand;
  estimated_website_age?: string | null;
  website_platform?: string | null;
  has_ssl: boolean;
  mobile_friendly: boolean;
  has_online_booking: boolean;
  has_contact_form: boolean;
  has_live_chat: boolean;
  has_google_reviews: boolean;
  has_clear_cta: boolean;
  has_structured_data: boolean;
  has_recent_content: boolean;
  identified_problems: IdentifiedProblem[];
  identified_opportunities: IdentifiedOpportunity[];
  recommended_features: RecommendedFeature[];
  competitor_notes?: string | null;
  ai_summary: string;
  ai_reasoning_summary: string;
  model_provider: string;
  model_name: string;
  created_at: string;
}

export type ProspectStatus =
  | "discovered"
  | "analysing"
  | "qualified"
  | "awaiting_review"
  | "approved"
  | "rejected"
  | "watch"
  | "research_requested"
  | "researching"
  | "research_complete"
  | "build_queued"
  | "building"
  | "qa"
  | "preview_ready"
  | "outreach_queued"
  | "contacted"
  | "engaged"
  | "replied"
  | "opportunity"
  | "won"
  | "lost"
  | "suppressed";

export type ReviewStatus = "pending" | "approved" | "rejected" | "watch" | "research_requested";

export type RejectionReason =
  | "business too small"
  | "website already good"
  | "poor fit"
  | "duplicate"
  | "outside target area"
  | "insufficient commercial value"
  | "invalid business"
  | "other";

export interface Prospect {
  id: string;
  business_id: string;
  current_assessment_id?: string | null;
  status: ProspectStatus;
  priority: "urgent" | "high" | "normal" | "low";
  opportunity_score: number;
  assigned_to?: string | null;
  review_status: ReviewStatus;
  reviewed_by?: string | null;
  reviewed_at?: string | null;
  approval_notes?: string | null;
  rejection_reason?: RejectionReason | string | null;
  research_status?: string | null;
  next_action?: string | null;
  next_action_at?: string | null;
  created_at: string;
  updated_at: string;
  // Hydrated joins
  business?: Business;
  assessment?: ProspectAssessment;
}

export type JobType =
  | "discover_businesses"
  | "analyse_business"
  | "score_prospect"
  | "prospect_additional_research"
  | "prospect_deep_research"
  | "create_strategy"
  | "generate_site"
  | "run_qa"
  | "publish_preview"
  | "prepare_outreach"
  | "send_outreach"
  | "process_reply"
  | "schedule_followup";

export type JobStatus = 
  | "queued" 
  | "running" 
  | "completed" 
  | "failed" 
  | "cancelled" 
  | "waiting_for_human";

export interface AutomationJob {
  id: string;
  job_type: JobType;
  entity_type: string;
  entity_id: string;
  status: JobStatus;
  priority: number; // Higher number = higher priority
  payload: Record<string, unknown>;
  attempts: number;
  max_attempts: number;
  scheduled_for: string;
  started_at?: string | null;
  completed_at?: string | null;
  failed_at?: string | null;
  error_code?: string | null;
  error_message?: string | null;
  created_by: string; // user id or "system" / "agent"
  created_at: string;
  updated_at: string;
}

export type AuditActorType = "user" | "agent" | "system";

export interface AuditEvent {
  id: string;
  actor_type: AuditActorType;
  actor_user_id?: string | null;
  actor_agent?: string | null;
  action: string;
  entity_type: string;
  entity_id: string;
  summary: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export type AutopilotMode = "ASSISTED" | "FULL_AUTOPILOT";

export interface AiAutoSettings {
  id: string;
  settings_key: string;
  targeting: {
    countries: string[];
    cities: string[];
    radius_km: number;
    sectors: string[];
    excluded_sectors: string[];
    min_opportunity_score: number;
    min_google_rating: number;
    min_review_count: number;
    businesses_per_day_target: number;
  };
  review_settings: {
    require_prospect_approval: boolean;
    require_website_approval_before_outreach: boolean;
  };
  autopilot_mode: AutopilotMode;
  updated_by: string;
  updated_at: string;
}

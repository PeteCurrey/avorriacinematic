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


// ============================================================================
// PHASE 2 TYPES — AI SCOUT
// ============================================================================

export interface TargetingProfile {
  id: string;
  name: string;
  enabled: boolean;
  countries: string[];
  regions: string[];
  cities: string[];
  postcode_areas: string[];
  radius_km: number;
  sectors: string[];
  sub_sectors: string[];
  excluded_sectors: string[];
  excluded_domains: string[];
  min_google_rating: number;
  min_review_count: number;
  max_website_quality_score: number;
  min_opportunity_score: number;
  max_prospects_per_run: number;
  max_qualified_per_day: number;
  max_search_operations: number;
  max_ai_spend_per_run: number;
  max_daily_ai_spend: number;
  priority: number;
  notes?: string | null;
  last_run_at?: string | null;
  last_run_status?: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type ScoutRunStatus = "queued" | "running" | "completed" | "completed_with_errors" | "failed" | "cancelled";

export interface ScoutRun {
  id: string;
  targeting_profile_id?: string | null;
  status: ScoutRunStatus;
  test_mode: boolean;
  started_at?: string | null;
  completed_at?: string | null;
  businesses_found: number;
  businesses_new: number;
  businesses_duplicate: number;
  businesses_verified: number;
  websites_analysed: number;
  prospects_qualified: number;
  prospects_rejected: number;
  ai_cost_estimate: number;
  error_count: number;
  error_log: string[];
  triggered_by: string;
  notes?: string | null;
  created_at: string;
  // Hydrated
  targeting_profile?: TargetingProfile;
}

export interface BusinessSource {
  id: string;
  business_id: string;
  source_type: string;
  source_url?: string | null;
  source_name?: string | null;
  captured_at: string;
  confidence?: number | null;
  raw_reference?: string | null;
  metadata?: Record<string, unknown>;
}

export interface BusinessSuppression {
  id: string;
  domain?: string | null;
  company_name_pattern?: string | null;
  reason: string;
  suppressed_by: string;
  notes?: string | null;
  created_at: string;
}

export interface WebsiteCapture {
  id: string;
  business_id: string;
  url: string;
  viewport: "desktop" | "mobile";
  storage_path?: string | null;
  captured_at?: string | null;
  status: "pending" | "captured" | "not_configured" | "failed";
  error_message?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface BusinessResearch {
  id: string;
  business_id: string;
  prospect_id?: string | null;
  research_version: number;
  company_summary?: string | null;
  positioning?: string | null;
  services?: unknown[];
  service_areas?: unknown[];
  target_customers?: string | null;
  differentiators?: unknown[];
  reputation_summary?: string | null;
  reviews_summary?: string | null;
  brand_observations?: string | null;
  logo_assets?: unknown[];
  brand_colours?: unknown[];
  typography_observations?: string | null;
  contact_information?: Record<string, unknown>;
  social_profiles?: Record<string, unknown>;
  accreditations?: unknown[];
  team_information?: unknown[];
  opening_hours?: Record<string, unknown>;
  frequently_asked_questions?: unknown[];
  key_claims?: unknown[];
  content_sources?: unknown[];
  competitor_context?: string | null;
  recommended_site_features?: unknown[];
  potential_conversion_improvements?: unknown[];
  unresolved_questions?: unknown[];
  confidence?: number | null;
  researched_at: string;
  provider?: string | null;
  model?: string | null;
  prompt_version?: string | null;
  scoring_version?: string | null;
}

export interface AITaskConfig {
  id: string;
  task_key: string;
  provider: "openai" | "anthropic";
  model: string;
  reasoning_effort?: "low" | "medium" | "high";
  enabled: boolean;
  fallback_provider?: "openai" | "anthropic";
  fallback_model?: string;
  temperature?: number;
  max_output_tokens?: number;
  timeout_seconds: number;
  max_retries: number;
  created_at: string;
  updated_at: string;
}

export interface AIUsageEvent {
  id: string;
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
  estimated_cost: number;
  created_at: string;
}

export interface AIProviderStatus {
  provider: "openai" | "anthropic";
  configured: boolean;
  connected: boolean;
  error?: string;
  testedAt?: string;
}

// ============================================================================
// PHASE 3 TYPES — CREATIVE DIRECTOR & WEBSITE FACTORY
// ============================================================================

export type CreativeBriefStatus = "draft" | "approved" | "superseded" | "archived";

export interface CreativeBrief {
  id: string;
  prospect_id: string;
  business_id: string;
  research_id?: string | null;
  version: number;
  status: CreativeBriefStatus;
  provider: string;
  model?: string | null;
  prompt_version?: string | null;
  strategy_summary?: string | null;
  positioning?: string | null;
  primary_objective?: string | null;
  target_audience?: unknown[];
  tone?: unknown[];
  visual_direction?: Record<string, unknown>;
  photography_direction?: Record<string, unknown>;
  typography_direction?: Record<string, unknown>;
  colour_strategy?: Record<string, unknown>;
  layout_direction?: string | null;
  interaction_direction?: unknown[];
  animation_direction?: unknown[];
  hero_concept?: Record<string, unknown>;
  narrative_flow?: string | null;
  trust_strategy?: unknown[];
  conversion_strategy?: unknown[];
  recommended_pages?: unknown[];
  homepage_sections?: unknown[];
  recommended_features?: unknown[];
  avoid_list?: unknown[];
  implementation_notes?: string | null;
  confidence?: number | null;
  approved_at?: string | null;
  approved_by?: string | null;
  created_at: string;
}

export interface SiteStrategy {
  id: string;
  prospect_id: string;
  creative_brief_id?: string | null;
  version: number;
  provider?: string | null;
  model?: string | null;
  prompt_version?: string | null;
  primary_conversion_goal?: string | null;
  secondary_conversion_goals?: unknown[];
  navigation?: unknown[];
  page_map?: unknown[];
  homepage_strategy?: Record<string, unknown>;
  page_strategies?: unknown[];
  feature_strategy?: unknown[];
  content_strategy?: string | null;
  seo_considerations?: unknown[];
  mobile_strategy?: string | null;
  created_at: string;
}

export type SiteProjectStatus =
  | "strategy" | "generating" | "generated" | "needs_review"
  | "revision_requested" | "ready_for_qa" | "qa" | "preview_ready" | "archived";

export interface SiteProject {
  id: string;
  prospect_id: string;
  business_id: string;
  creative_brief_id?: string | null;
  site_strategy_id?: string | null;
  status: SiteProjectStatus;
  slug: string;
  title: string;
  current_version_id?: string | null;
  preview_status: "none" | "generating" | "live" | "error";
  ai_cost_total: number;
  auto_revision_count: number;
  max_auto_revisions: number;
  created_at: string;
  updated_at: string;
  // Hydrated
  creative_brief?: CreativeBrief;
  current_version?: SiteVersion;
  latest_design_review?: DesignReview;
}

export interface SiteVersion {
  id: string;
  site_project_id: string;
  version: number;
  source_type: "generated" | "revised" | "manual" | "restored";
  configuration: Record<string, unknown>;
  content: Record<string, unknown>;
  design_tokens: DesignTokens;
  page_definitions: PageDefinition[];
  component_definitions: ComponentDefinition[];
  generated_code_reference?: string | null;
  provider?: string | null;
  model?: string | null;
  prompt_version?: string | null;
  generation_status: "pending" | "generating" | "complete" | "failed";
  notes?: string | null;
  created_at: string;
  created_by: string;
}

export interface DesignTokens {
  background: string;
  surface: string;
  text_primary: string;
  text_secondary: string;
  border: string;
  accent: string;
  accent_secondary?: string;
  heading_font: string;
  body_font: string;
  type_scale: "compact" | "standard" | "generous";
  spacing_scale: "tight" | "standard" | "spacious";
  radius_scale: "none" | "subtle" | "moderate";
  content_width: "narrow" | "standard" | "wide" | "full";
  animation_intensity: "none" | "subtle" | "moderate";
  motion_duration: "fast" | "standard" | "cinematic";
  image_treatment: "sharp" | "slightly-dark" | "warm" | "cool" | "natural";
  navigation_style: "minimal" | "standard" | "bold";
}

export interface ComponentDefinition {
  id: string;
  component_key: string;
  variant?: string;
  props: Record<string, unknown>;
  order: number;
  page_id?: string;
  section_id?: string;
}

export interface PageDefinition {
  id: string;
  slug: string;
  title: string;
  meta_description?: string;
  sections: ComponentDefinition[];
  seo_priority?: number;
}

export interface DesignReview {
  id: string;
  site_project_id: string;
  site_version_id?: string | null;
  provider: string;
  model: string;
  prompt_version?: string | null;
  overall_score?: number | null;
  visual_score?: number | null;
  hierarchy_score?: number | null;
  typography_score?: number | null;
  imagery_score?: number | null;
  brand_score?: number | null;
  conversion_score?: number | null;
  mobile_score?: number | null;
  originality_score?: number | null;
  ai_slop_score?: number | null;
  issues?: unknown[];
  recommendations?: unknown[];
  auto_revision_applied?: boolean;
  passed_threshold?: boolean;
  created_at: string;
}

export interface PreviewLink {
  id: string;
  site_project_id: string;
  token: string;
  status: "active" | "expired" | "revoked";
  expires_at?: string | null;
  presentation_mode: boolean;
  first_viewed_at?: string | null;
  last_viewed_at?: string | null;
  view_count: number;
  created_at: string;
  revoked_at?: string | null;
}

export interface SiteMedia {
  id: string;
  site_project_id?: string | null;
  business_id?: string | null;
  source_type: "business_website" | "social" | "stock" | "generated" | "manual_upload" | "placeholder";
  source_url?: string | null;
  storage_path?: string | null;
  media_type: "image" | "video" | "logo" | "icon" | "background";
  width?: number | null;
  height?: number | null;
  quality_score?: number | null;
  usage_status: "available" | "hero" | "gallery" | "service" | "background" | "logo" | "archived";
  rights_notes?: string | null;
  alt_text?: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
}


// ============================================================================
// PHASE 7: OPTIMISATION & COMMERCIAL INTELLIGENCE TYPES
// ============================================================================

export interface ProspectOutcome {
  id: string;
  prospect_id: string;
  business_id: string;
  final_status: string;
  contacted: boolean;
  preview_viewed: boolean;
  replied: boolean;
  became_opportunity: boolean;
  proposal_sent: boolean;
  proposal_accepted: boolean;
  became_client: boolean;
  revenue: number;
  currency: string;
  time_to_reply_hours?: number | null;
  time_to_close_days?: number | null;
  loss_reason?: string | null;
  created_at: string;
  updated_at: string;
}

export type ExperimentStatus = "draft" | "running" | "paused" | "completed" | "inconclusive" | "cancelled";

export interface Experiment {
  id: string;
  name: string;
  hypothesis: string;
  entity_type: string;
  metric: string;
  status: ExperimentStatus;
  started_at?: string | null;
  ended_at?: string | null;
  minimum_sample_size: number;
  confidence_target: number;
  winner_variant_id?: string | null;
  created_by: string;
  created_at: string;
  variants?: ExperimentVariant[];
}

export interface ExperimentVariant {
  id: string;
  experiment_id: string;
  name: string;
  allocation: number;
  configuration: Record<string, unknown>;
  sample_size: number;
  conversions: number;
  created_at: string;
}

export interface ExperimentAssignment {
  id: string;
  experiment_id: string;
  entity_id: string;
  variant_id: string;
  assigned_at: string;
}

export type RecommendationCategory =
  | "TARGETING"
  | "SCORING"
  | "MODEL_ROUTING"
  | "CREATIVE"
  | "OUTREACH"
  | "FOLLOWUP"
  | "PRICING"
  | "COST"
  | "CAPACITY"
  | "OPERATION";

export type RecommendationConfidence = "INSUFFICIENT_DATA" | "EARLY_SIGNAL" | "MODERATE" | "STRONG";
export type RecommendationRisk = "LOW" | "MEDIUM" | "HIGH";
export type RecommendationStatus = "new" | "accepted" | "rejected" | "deferred" | "implemented" | "expired";

export interface OptimisationRecommendation {
  id: string;
  category: RecommendationCategory;
  title: string;
  summary: string;
  evidence: Record<string, unknown>;
  expected_impact: string;
  confidence: RecommendationConfidence;
  risk: RecommendationRisk;
  action_type: string;
  proposed_config_change: Record<string, unknown>;
  status: RecommendationStatus;
  rejection_reason?: string | null;
  reviewed_at?: string | null;
  reviewed_by?: string | null;
  created_at: string;
}

export interface OptimisationPlaybook {
  id: string;
  sector: string;
  title: string;
  strategy_tag: string;
  recommended_structure: unknown[];
  creative_direction_guidance?: string | null;
  conversion_features: unknown[];
  outreach_strategy_guidance?: string | null;
  sample_size: number;
  conversion_rate?: number | null;
  created_at: string;
  updated_at: string;
}

export interface ScoringShadowEvaluation {
  id: string;
  scoring_version: string;
  weights: Record<string, number>;
  prospect_id: string;
  original_score: number;
  shadow_score: number;
  original_decision: string;
  shadow_decision: string;
  actual_outcome?: string | null;
  created_at: string;
}

export interface DailyCEOBrief {
  date: string;
  generated_at: string;
  what_happened: string;
  what_matters: string;
  what_needs_you: string;
  what_ai_auto_recommends: string;
  risks_and_anomalies: string;
  key_metrics: {
    contacted_yesterday: number;
    replies_yesterday: number;
    proposals_sent: number;
    clients_won: number;
    ai_spend_yesterday: number;
    top_converting_sector: string;
  };
}


// ============================================================================
// PHASE 8: OPERATIONAL SYSTEMS & CMS TYPES
// ============================================================================

export type CMSPageStatus = "draft" | "review" | "scheduled" | "published" | "archived";

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  status: CMSPageStatus;
  page_type: string;
  template: string;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
  social_title?: string | null;
  social_description?: string | null;
  social_image_id?: string | null;
  noindex: boolean;
  published_version_id?: string | null;
  created_at: string;
  updated_at: string;
  current_version?: CMSPageVersion;
}

export interface CMSPageVersion {
  id: string;
  page_id: string;
  version: number;
  content: Record<string, unknown>;
  created_by: string;
  created_at: string;
  publication_status: string;
  notes?: string | null;
}

export interface CMSGlobal {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_by: string;
  updated_at: string;
}

export interface CMSNavigationItem {
  id: string;
  menu_location: "primary" | "footer" | "mobile";
  label: string;
  destination: string;
  is_external: boolean;
  sort_order: number;
  parent_id?: string | null;
  visibility: boolean;
  created_at: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  original_filename: string;
  media_type: "image" | "video" | "document";
  mime_type: string;
  storage_path: string;
  width?: number | null;
  height?: number | null;
  file_size: number;
  alt_text?: string | null;
  caption?: string | null;
  source?: string | null;
  rights?: string | null;
  photographer_creator?: string | null;
  usage_notes?: string | null;
  focal_point_x: number;
  focal_point_y: number;
  created_by: string;
  created_at: string;
}

export interface CaseStudyMetric {
  metric: string;
  value: string;
  source?: string;
  verified: boolean;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client_name: string;
  project_name: string;
  status: "draft" | "review" | "published" | "archived";
  sector: string;
  location?: string | null;
  short_summary: string;
  challenge: string;
  strategy: string;
  solution: string;
  outcome: string;
  hero_media_id?: string | null;
  featured: boolean;
  sort_order: number;
  seo_title?: string | null;
  seo_description?: string | null;
  metrics: CaseStudyMetric[];
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  content_type: "article" | "guide" | "opinion" | "project_note" | "news" | "research";
  status: "draft" | "review" | "scheduled" | "published" | "archived";
  author_id: string;
  hero_media_id?: string | null;
  topics: string[];
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
  social_image_id?: string | null;
  published_at?: string | null;
  scheduled_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SEOAuditRun {
  id: string;
  started_at: string;
  completed_at?: string | null;
  pages_crawled: number;
  critical_issues: number;
  warnings: number;
  status: "running" | "completed" | "failed";
}

export interface SEOIssue {
  id: string;
  audit_run_id?: string | null;
  url: string;
  issue_type: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
  message: string;
  status: "open" | "resolved" | "ignored";
  created_at: string;
}

export interface SEORedirect {
  id: string;
  source: string;
  destination: string;
  status_code: number;
  active: boolean;
  reason?: string | null;
  created_at: string;
}

export interface InboundLead {
  id: string;
  business_name: string;
  contact_name: string;
  email: string;
  phone?: string | null;
  website?: string | null;
  service_interest?: string | null;
  budget_range?: string | null;
  message: string;
  source: string;
  landing_page?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  status: "new" | "reviewed" | "qualified" | "contacted" | "converted_to_opportunity" | "not_qualified" | "spam" | "archived";
  lead_score: number;
  assigned_to?: string | null;
  sales_opportunity_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AdminTeamMember {
  id: string;
  name: string;
  email: string;
  role: "super_admin" | "admin" | "sales" | "designer" | "developer" | "content_editor";
  status: "active" | "invited" | "disabled";
  invited_at?: string | null;
  last_active_at?: string | null;
  created_at: string;
}

export interface AdminNotification {
  id: string;
  user_id?: string | null;
  type: string;
  severity: "CRITICAL" | "HIGH" | "NORMAL" | "LOW";
  title: string;
  summary: string;
  entity_type?: string | null;
  entity_id?: string | null;
  read_at?: string | null;
  dismissed_at?: string | null;
  created_at: string;
}


// ============================================================================
// PHASE 9: EXECUTIVE COMMAND & FINANCIAL INTELLIGENCE TYPES
// ============================================================================

export type FinancialEventType =
  | "contracted_revenue"
  | "payment_received"
  | "refund"
  | "external_cost"
  | "ai_cost"
  | "email_cost"
  | "data_cost"
  | "hosting_cost"
  | "contractor_cost"
  | "manual_adjustment";

export interface FinancialEvent {
  id: string;
  event_type: FinancialEventType;
  client_id?: string | null;
  project_id?: string | null;
  proposal_id?: string | null;
  payment_id?: string | null;
  service_id?: string | null;
  amount: number;
  currency: string;
  amount_reporting_currency: number;
  reporting_fx_rate: number;
  occurred_at: string;
  recognised_at?: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export type TargetPaceStatus = "AHEAD" | "ON_TRACK" | "AT_RISK" | "BEHIND";

export interface BusinessTarget {
  id: string;
  metric_key: string;
  period_type: "monthly" | "quarterly" | "annual";
  period_start: string;
  period_end: string;
  target_value: number;
  currency: string;
  notes?: string | null;
  created_by: string;
  created_at: string;
  actual_value?: number;
  pace_status?: TargetPaceStatus;
  progress_pct?: number;
}

export interface ForecastSnapshot {
  id: string;
  forecast_type: string;
  as_of_date: string;
  period_start: string;
  period_end: string;
  base_value: number;
  downside_value: number;
  upside_value: number;
  assumptions: Record<string, unknown>;
  created_at: string;
}

export interface ExecutiveAnomaly {
  id: string;
  metric_key: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  detected_value: number;
  baseline_value: number;
  threshold: number;
  period: string;
  status: "active" | "investigating" | "resolved" | "ignored";
  explanation: string;
  created_at: string;
  resolved_at?: string | null;
}

export interface ExecutiveDecision {
  id: string;
  title: string;
  decision: string;
  rationale: string;
  linked_recommendation_id?: string | null;
  decided_by: string;
  decided_at: string;
  review_at?: string | null;
  outcome?: string | null;
  notes?: string | null;
}

export interface InternalCostRate {
  id: string;
  role: string;
  hourly_cost: number;
  currency: string;
  effective_from: string;
}

export interface BusinessEntity {
  id: string;
  name: string;
  legal_name: string;
  country: string;
  currency: string;
  tax_identifier?: string | null;
  active: boolean;
}

export interface ClientProfitability {
  client_id: string;
  client_name: string;
  contracted_revenue: number;
  cash_collected: number;
  recurring_mrr: number;
  ai_acquisition_cost: number;
  ai_generation_cost: number;
  external_costs: number;
  manual_labour_cost: number;
  payment_fees: number;
  tracked_contribution: number;
  contribution_margin_pct: number;
}

export interface ServiceProfitability {
  service_id: string;
  service_name: string;
  units_sold: number;
  total_revenue: number;
  average_order_value: number;
  average_delivery_days: number;
  direct_cost_per_unit: number;
  tracked_contribution: number;
  contribution_margin_pct: number;
}

export interface ExecutiveKPIs {
  cash_collected_month: number;
  contracted_revenue_month: number;
  outstanding_receivables: number;
  active_pipeline_weighted: number;
  clients_won_month: number;
  average_sale_value: number;
  active_mrr: number;
  tracked_contribution_month: number;
  monthly_revenue_target: number;
  revenue_pace_status: TargetPaceStatus;
}


// ============================================================================
// PHASE 11: PRODUCTION CONTROL & COHORTS TYPES
// ============================================================================

export type OperatingMode = 'TEST' | 'PILOT' | 'CONTROLLED_PRODUCTION' | 'SCALED_PRODUCTION' | 'FULL_AUTOPILOT';

export type CohortStatus = 'draft' | 'ready' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';

export type GateMode = 'MANUAL' | 'ASSISTED' | 'CONTROLLED_AUTO' | 'AUTO';

export type GateKey =
  | 'PROSPECT_QUALIFICATION'
  | 'PROSPECT_APPROVAL'
  | 'CREATIVE_BRIEF_APPROVAL'
  | 'WEBSITE_APPROVAL'
  | 'QA_REMEDIATION'
  | 'OUTREACH_APPROVAL'
  | 'FOLLOW_UP'
  | 'REPLY_RESPONSE'
  | 'PROPOSAL'
  | 'PRICING'
  | 'SITE_LAUNCH';

export interface AIAutoOperatingConfig {
  id: string;
  current_mode: OperatingMode;
  previous_mode?: string | null;
  mode_changed_at: string;
  mode_changed_by: string;
  mode_change_reason?: string | null;
  max_scout_per_day: number;
  max_qualified_per_day: number;
  max_sites_per_day: number;
  max_outreach_per_day: number;
  max_followups_per_day: number;
  max_ai_spend_per_day: number;
  max_ai_spend_per_month: number;
  max_concurrent_site_builds: number;
  max_concurrent_scout_jobs: number;
  human_prospect_reviews_per_day: number;
  human_site_reviews_per_day: number;
  human_sales_responses_per_day: number;
  human_client_launches_per_week: number;
  production_outreach_confirmed: boolean;
  production_outreach_confirmed_at?: string | null;
  production_outreach_confirmed_by?: string | null;
  emergency_stop_active: boolean;
  emergency_stop_reason?: string | null;
  emergency_stop_at?: string | null;
  updated_at: string;
}

export interface RolloutCohort {
  id: string;
  name: string;
  environment: 'TEST' | 'PILOT' | 'CONTROLLED_PRODUCTION' | 'SCALED_PRODUCTION';
  status: CohortStatus;
  target_profile_id?: string | null;
  target_sectors?: string[] | null;
  target_locations?: string[] | null;
  min_opportunity_score: number;
  min_business_strength_score: number;
  max_prospects: number;
  max_qualified: number;
  max_approved: number;
  max_sites_generated: number;
  max_outreach_sent: number;
  daily_ai_budget_limit: number;
  total_ai_budget_limit: number;
  email_send_limit: number;
  outcome_observation_days: number;
  started_at?: string | null;
  operationally_completed_at?: string | null;
  outcome_matured_at?: string | null;
  completed_at?: string | null;
  created_by: string;
  notes?: string | null;
  post_mortem_notes?: string | null;
  created_at: string;
}

export interface AutonomyGatePolicy {
  id: string;
  cohort_id?: string | null;
  gate_key: GateKey;
  mode: GateMode;
  criteria: Record<string, unknown>;
  version: number;
  previous_mode?: string | null;
  changed_by: string;
  change_reason?: string | null;
  cohort_evidence: Record<string, unknown>;
  created_at: string;
}

export interface ProductionDefect {
  id: string;
  cohort_id?: string | null;
  prospect_id?: string | null;
  system: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'DATA' | 'PROMPT' | 'MODEL' | 'CODE' | 'PROVIDER' | 'CONFIGURATION' | 'HUMAN_ERROR' | 'UNKNOWN';
  defect_type: string;
  description: string;
  detected_by: string;
  status: 'open' | 'investigating' | 'resolved' | 'wont_fix';
  resolution?: string | null;
  auto_pause_triggered: boolean;
  created_at: string;
  resolved_at?: string | null;
}

export interface ProductionChangeLogEntry {
  id: string;
  cohort_id?: string | null;
  change_type: string;
  description: string;
  old_value?: Record<string, unknown> | null;
  new_value?: Record<string, unknown> | null;
  changed_by: string;
  reason?: string | null;
  created_at: string;
}

export interface MailboxConfig {
  id: string;
  mailbox_type: 'OUTREACH' | 'TRANSACTIONAL' | 'REPLY_INBOX';
  name: string;
  from_name: string;
  from_email: string;
  reply_to?: string | null;
  sending_domain: string;
  daily_send_limit: number;
  status: 'unconfigured' | 'warming' | 'active' | 'paused' | 'suspended';
  is_production: boolean;
  warm_up_day?: number | null;
  provider: string;
  notes?: string | null;
  created_at: string;
}

export interface ReviewSession {
  id: string;
  cohort_id?: string | null;
  session_type: 'PROSPECT_REVIEW' | 'SITE_REVIEW' | 'OUTREACH_REVIEW';
  started_by: string;
  started_at: string;
  completed_at?: string | null;
  total_items: number;
  approved: number;
  rejected: number;
  revised: number;
  skipped: number;
  scout_quality_rating?: number | null;
  design_quality_rating?: number | null;
  email_quality_rating?: number | null;
  system_confidence_rating?: number | null;
  session_notes?: string | null;
}

export interface CohortProspectLineage {
  id: string;
  cohort_id: string;
  prospect_id: string;
  discovered_at?: string | null;
  verified_at?: string | null;
  qualified_at?: string | null;
  reviewed_at?: string | null;
  approved_at?: string | null;
  researched_at?: string | null;
  designed_at?: string | null;
  generated_at?: string | null;
  qa_passed_at?: string | null;
  outreach_approved_at?: string | null;
  sent_at?: string | null;
  preview_viewed_at?: string | null;
  replied_at?: string | null;
  opportunity_at?: string | null;
  client_at?: string | null;
  design_sendability?: 'SENDABLE' | 'NEEDS_WORK' | 'UNSENDABLE' | null;
  design_rejection_reason?: string | null;
  outreach_edit_distance?: 'UNCHANGED' | 'MINOR_EDIT' | 'MAJOR_EDIT' | 'REWRITTEN' | null;
  scout_human_rejected?: boolean | null;
  scout_rejection_reason?: string | null;
  ai_cost_discovery: number;
  ai_cost_research: number;
  ai_cost_generation: number;
  ai_cost_qa: number;
  ai_cost_total: number;
  created_at: string;
}

export interface CohortEvent {
  id: string;
  cohort_id: string;
  prospect_id?: string | null;
  event_type: string;
  description: string;
  actor: string;
  metadata: Record<string, unknown>;
  occurred_at: string;
}

export interface CohortFunnelMetrics {
  cohort_id: string;
  discovered: number;
  verified: number;
  qualified: number;
  reviewed: number;
  approved: number;
  researched: number;
  designed: number;
  generated: number;
  qa_passed: number;
  outreach_approved: number;
  sent: number;
  preview_viewed: number;
  replied: number;
  opportunity: number;
  client: number;
  ai_cost_total: number;
  email_cost_total: number;
  total_acquisition_cost: number;
  contracted_revenue: number;
  tracked_contribution: number;
  cost_per_qualified: number | null;
  cost_per_site: number | null;
  cost_per_client: number | null;
  cost_per_reply: number | null;
  first_pass_sendable_pct: number | null;
  human_intervention_count: number;
}

export interface AutonomyReadinessItem {
  gate_key: GateKey;
  gate_label: string;
  current_mode: GateMode;
  human_agreement_rate?: number | null;
  failure_rate?: number | null;
  human_intervention_rate?: number | null;
  evidence_sample_size: number;
  readiness_recommendation: 'KEEP_MANUAL' | 'READY_FOR_ASSISTED' | 'READY_FOR_CONTROLLED_AUTO' | 'INSUFFICIENT_DATA' | 'DO_NOT_AUTOMATE';
  readiness_reason: string;
}

export interface FullAutopilotReadinessCheck {
  check_key: string;
  category: string;
  label: string;
  status: 'READY' | 'WARNING' | 'BLOCKED' | 'NOT_AUTHORIZED' | 'DISABLED_BY_POLICY';
  detail: string;
  metric_value?: string | null;
  threshold?: string | null;
}

export interface ProductionReadinessSection {
  section: string;
  label: string;
  status: 'READY' | 'WARNING' | 'BLOCKED';
  checks: Array<{
    label: string;
    status: 'READY' | 'WARNING' | 'BLOCKED';
    detail: string;
  }>;
}

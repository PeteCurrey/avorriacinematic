/**
 * AVORRIA — AI LAYER TYPES
 *
 * All AI task definitions, provider constants, model routing types,
 * and shared structured output schemas.
 */

export const AI_TASKS = {
  business_discovery:     "business_discovery",
  business_normalisation: "business_normalisation",
  business_verification:  "business_verification",
  website_analysis:       "website_analysis",
  prospect_qualification: "prospect_qualification",
  prospect_summary:       "prospect_summary",
  additional_research:    "additional_research",
  deep_research:          "deep_research",
  creative_direction:     "creative_direction",
  design_generation:      "design_generation",
  visual_qa:              "visual_qa",
  outreach_copy:          "outreach_copy",
  reply_classification:   "reply_classification",
} as const;

export type TaskKey = keyof typeof AI_TASKS;
export type AIProvider = "openai" | "anthropic";

export const OPENAI_MODELS = {
  LUNA:  "gpt-4o-mini",
  TERRA: "gpt-4o",
  SOL:   "gpt-4o",
} as const;

export const ANTHROPIC_MODELS = {
  SONNET: "claude-sonnet-4-5",
  OPUS:   "claude-opus-4-5",
} as const;

export interface AITaskConfig {
  id: string;
  task_key: string;
  provider: AIProvider;
  model: string;
  reasoning_effort?: "low" | "medium" | "high";
  enabled: boolean;
  fallback_provider?: AIProvider;
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

export interface AITaskInput<T = Record<string, unknown>> {
  task: TaskKey;
  payload: T;
  entityType?: string;
  entityId?: string;
  jobId?: string;
  forceModel?: string;
  forceProvider?: AIProvider;
}

export interface AITaskUsage {
  inputTokens: number;
  outputTokens: number;
  cachedTokens?: number;
  searchCalls?: number;
  latencyMs: number;
  estimatedCost: number;
}

export interface AITaskOutput<T = Record<string, unknown>> {
  success: boolean;
  result?: T;
  error?: string;
  errorCode?: string;
  provider: AIProvider;
  model: string;
  usedFallback?: boolean;
  usage: AITaskUsage;
}

export type OpenAIContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string; detail?: "low" | "high" | "auto" } };

export interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string | OpenAIContentPart[];
}

export interface WebsiteAssessmentResult {
  visual_quality_score: number;
  mobile_score: number;
  conversion_score: number;
  trust_score: number;
  website_quality_score: number;
  estimated_age: string;
  major_issues: string[];
  strengths: string[];
  missing_features: string[];
  commercial_opportunities: string[];
  recommended_features: string[];
  summary: string;
  confidence: number;
}

export interface DiscoveredBusiness {
  company_name: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  sector?: string;
  google_rating?: number;
  google_review_count?: number;
  source_url?: string;
  discovery_source: string;
}

export interface BusinessDiscoveryResult {
  businesses: DiscoveredBusiness[];
  search_queries_used?: string[];
}

export interface ProspectQualificationResult {
  qualifies: boolean;
  reason: string;
  recommendation: "STRONG_TARGET" | "TARGET" | "MAYBE" | "DO_NOT_TARGET";
  reasoning: string;
  confidence: number;
}

export interface DeepResearchResult {
  company_summary: string;
  positioning: string;
  services: string[];
  service_areas: string[];
  target_customers: string;
  differentiators: string[];
  reputation_summary: string;
  reviews_summary: string;
  brand_observations: string;
  brand_colours: string[];
  typography_observations: string;
  contact_information: Record<string, string>;
  social_profiles: Record<string, string>;
  accreditations: string[];
  competitor_context: string;
  recommended_site_features: string[];
  potential_conversion_improvements: string[];
  unresolved_questions: string[];
  confidence: number;
}

export interface AdditionalResearchResult {
  additional_signals: string[];
  updated_summary: string;
  new_sources: string[];
  confidence_change: number;
  revised_recommendation?: "STRONG_TARGET" | "TARGET" | "MAYBE" | "DO_NOT_TARGET";
  revised_reasoning: string;
}

export function clampScore(value: unknown): number {
  const n = Number(value);
  if (isNaN(n)) return 0;
  return Math.round(Math.max(0, Math.min(100, n)));
}

export function clampConfidence(value: unknown): number {
  const n = Number(value);
  if (isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

export function validateWebsiteAssessment(raw: unknown): WebsiteAssessmentResult {
  if (!raw || typeof raw !== "object") throw new Error("Assessment result is not an object");
  const r = raw as Record<string, unknown>;
  return {
    visual_quality_score:     clampScore(r.visual_quality_score),
    mobile_score:             clampScore(r.mobile_score),
    conversion_score:         clampScore(r.conversion_score),
    trust_score:              clampScore(r.trust_score),
    website_quality_score:    clampScore(r.website_quality_score),
    estimated_age:            typeof r.estimated_age === "string" ? r.estimated_age : "Unknown",
    major_issues:             Array.isArray(r.major_issues) ? (r.major_issues as unknown[]).map(String) : [],
    strengths:                Array.isArray(r.strengths) ? (r.strengths as unknown[]).map(String) : [],
    missing_features:         Array.isArray(r.missing_features) ? (r.missing_features as unknown[]).map(String) : [],
    commercial_opportunities: Array.isArray(r.commercial_opportunities) ? (r.commercial_opportunities as unknown[]).map(String) : [],
    recommended_features:     Array.isArray(r.recommended_features) ? (r.recommended_features as unknown[]).map(String) : [],
    summary:                  typeof r.summary === "string" ? r.summary : "",
    confidence:               clampConfidence(r.confidence),
  };
}

export function validateQualificationResult(raw: unknown): ProspectQualificationResult {
  if (!raw || typeof raw !== "object") throw new Error("Qualification result is not an object");
  const r = raw as Record<string, unknown>;
  const validRecs = ["STRONG_TARGET", "TARGET", "MAYBE", "DO_NOT_TARGET"] as const;
  const rec = validRecs.includes(r.recommendation as typeof validRecs[number])
    ? (r.recommendation as ProspectQualificationResult["recommendation"])
    : "MAYBE";
  return {
    qualifies:      Boolean(r.qualifies),
    reason:         typeof r.reason === "string" ? r.reason : "No reason provided",
    recommendation: rec,
    reasoning:      typeof r.reasoning === "string" ? r.reasoning : "",
    confidence:     clampConfidence(r.confidence),
  };
}

export function validateDiscoveryResult(raw: unknown): BusinessDiscoveryResult {
  if (!raw || typeof raw !== "object") return { businesses: [] };
  const r = raw as Record<string, unknown>;
  const rawList = Array.isArray(r.businesses) ? r.businesses : [];
  const businesses: DiscoveredBusiness[] = [];
  for (const item of rawList) {
    if (!item || typeof item !== "object") continue;
    const b = item as Record<string, unknown>;
    if (!b.company_name) continue;
    businesses.push({
      company_name:        String(b.company_name),
      website:             typeof b.website === "string" ? b.website : undefined,
      phone:               typeof b.phone === "string" ? b.phone : undefined,
      email:               typeof b.email === "string" ? b.email : undefined,
      address:             typeof b.address === "string" ? b.address : undefined,
      city:                typeof b.city === "string" ? b.city : undefined,
      country:             typeof b.country === "string" ? b.country : undefined,
      sector:              typeof b.sector === "string" ? b.sector : undefined,
      google_rating:       typeof b.google_rating === "number" ? b.google_rating : undefined,
      google_review_count: typeof b.google_review_count === "number" ? b.google_review_count : undefined,
      source_url:          typeof b.source_url === "string" ? b.source_url : undefined,
      discovery_source:    typeof b.discovery_source === "string" ? b.discovery_source : "openai_web_search",
    });
  }
  return {
    businesses,
    search_queries_used: Array.isArray(r.search_queries_used)
      ? (r.search_queries_used as unknown[]).map(String)
      : undefined,
  };
}

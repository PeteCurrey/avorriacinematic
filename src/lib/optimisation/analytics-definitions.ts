/**
 * AVORRIA — CANONICAL METRIC DEFINITIONS (Phase 7)
 * Single source of truth for all funnel / commercial calculations.
 */

export type ConfidenceLabel =
  | "INSUFFICIENT_DATA"
  | "EARLY_SIGNAL"
  | "MODERATE"
  | "STRONG";

export type LearningMode = "OBSERVE" | "RECOMMEND" | "CONTROLLED_AUTO";

// Current production learning mode — defaults to RECOMMEND
export const LEARNING_MODE: LearningMode = "RECOMMEND";

// Minimum sample sizes for confidence levels
export const CONFIDENCE_THRESHOLDS = {
  INSUFFICIENT_DATA: 0,
  EARLY_SIGNAL: 10,
  MODERATE: 50,
  STRONG: 200,
} as const;

/** Classify a sample count into a confidence label */
export function getConfidence(n: number): ConfidenceLabel {
  if (n >= CONFIDENCE_THRESHOLDS.STRONG) return "STRONG";
  if (n >= CONFIDENCE_THRESHOLDS.MODERATE) return "MODERATE";
  if (n >= CONFIDENCE_THRESHOLDS.EARLY_SIGNAL) return "EARLY_SIGNAL";
  return "INSUFFICIENT_DATA";
}

/** Compute rate with safety guard — never divide by zero */
export function safeRate(numerator: number, denominator: number): number {
  if (denominator === 0) return 0;
  return numerator / denominator;
}

/** Format a rate as % string */
export function pct(numerator: number, denominator: number, decimals = 1): string {
  if (denominator === 0) return "—";
  return `${(safeRate(numerator, denominator) * 100).toFixed(decimals)}%`;
}

/**
 * Funnel step definitions.
 * Denominators are explicitly specified to prevent different pages using different bases.
 */
export interface FunnelStepDef {
  key: string;
  label: string;
  description: string;
  numeratorField: string;
  denominatorField: string;
}

export const FUNNEL_STEPS: FunnelStepDef[] = [
  { key: "qualified_rate",   label: "Qualified / Discovered",      description: "Businesses discovered by Scout that passed qualification",                 numeratorField: "qualified",     denominatorField: "discovered" },
  { key: "approved_rate",    label: "Approved / Reviewed",         description: "Prospects sent to Pete that were approved for outreach",                   numeratorField: "approved",      denominatorField: "reviewed" },
  { key: "contacted_rate",   label: "Contacted / Approved",        description: "Approved prospects where outreach was actually sent",                      numeratorField: "contacted",     denominatorField: "approved" },
  { key: "view_rate",        label: "Preview Viewed / Contacted",  description: "Outreach recipients that opened the preview at least once",                numeratorField: "preview_views", denominatorField: "contacted" },
  { key: "reply_rate",       label: "Reply / Contacted",           description: "Prospects that sent any reply. Denominator: successfully contacted",       numeratorField: "replies",       denominatorField: "contacted" },
  { key: "positive_rate",    label: "Positive / Replied",          description: "Replies classified as positive, interested or a price request",            numeratorField: "positive_replies", denominatorField: "replies" },
  { key: "opportunity_rate", label: "Opportunity / Replied",       description: "Replied prospects that advanced to a formal sales opportunity",            numeratorField: "opportunities", denominatorField: "replies" },
  { key: "proposal_rate",    label: "Proposal / Opportunity",      description: "Opportunities where a proposal was sent",                                  numeratorField: "proposals",     denominatorField: "opportunities" },
  { key: "close_rate",       label: "Client / Proposal",           description: "Proposals that resulted in a signed, paying client",                       numeratorField: "clients",       denominatorField: "proposals" },
  { key: "conversion_rate",  label: "Client / Contacted",          description: "End-to-end conversion: how many contacted prospects become clients",       numeratorField: "clients",       denominatorField: "contacted" },
];

/**
 * Revenue / financial field definitions.
 * All amounts stored in minor currency units (pence) internally.
 */
export interface RevenueBreakdown {
  pipeline_value:     number;  // proposed but not accepted
  contracted_revenue: number;  // accepted proposals
  payments_received:  number;  // confirmed paid
  recurring_revenue:  number;  // hosting / retainer
}

export type CostCategory =
  | "ai"
  | "email"
  | "data"
  | "payment_fees"
  | "hosting"
  | "manual"
  | "other";

export const COST_LABELS: Record<CostCategory, string> = {
  ai:           "AI (OpenAI + Anthropic)",
  email:        "Email Provider",
  data:         "Data / Research APIs",
  payment_fees: "Payment Processing Fees",
  hosting:      "Infrastructure & Hosting",
  manual:       "Manual Labour (where recorded)",
  other:        "Other External Costs",
};

// Creative strategy taxonomy — controlled list, AI must not invent outside this set
export const CREATIVE_STRATEGY_TAGS = [
  "editorial_minimal",
  "cinematic_dark",
  "premium_industrial",
  "clean_clinical",
  "local_trust",
  "high_energy_automotive",
  "architectural",
  "bold_trades",
  "professional_services",
  "warm_hospitality",
  "modern_medical",
] as const;
export type CreativeStrategyTag = typeof CREATIVE_STRATEGY_TAGS[number];

// Outreach variant taxonomy
export const OUTREACH_STRATEGY_TAGS = [
  "DIRECT",
  "REPUTATION_GAP",
  "WE_BUILT_THIS",
  "LOCAL_OBSERVATION",
  "FEATURE_OPPORTUNITY",
  "SHORT",
  "LONG",
] as const;
export type OutreachStrategyTag = typeof OUTREACH_STRATEGY_TAGS[number];

// Loss reasons — Pete edits via UI, but these are seeds
export const LOSS_REASONS = [
  "PRICE",
  "NO_BUDGET",
  "NO_RESPONSE",
  "TIMING",
  "USED_COMPETITOR",
  "KEPT_EXISTING_SITE",
  "INTERNAL_RESOURCE",
  "DECISION_DELAYED",
  "POOR_FIT",
  "OTHER",
] as const;
export type LossReason = typeof LOSS_REASONS[number];

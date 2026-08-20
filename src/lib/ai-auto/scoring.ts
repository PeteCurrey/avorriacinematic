// Type-only: `import type` keeps this out of the emitted JS, which matters for
// any runtime that strips types rather than bundling (and is correct anyway).
import type { OpportunityBand, ProspectAssessment } from "@/types/admin";

export interface ScoringWeights {
  websiteQualityGapWeight: number; // 0.25 (Lower existing website quality = higher Avorria opportunity)
  mobileExperienceGapWeight: number; // 0.20 (Poor mobile = high redesign urgency)
  conversionArchitectureGapWeight: number; // 0.20 (Missing CTA/booking/lead capture = immediate ROI)
  seoAndStructureGapWeight: number; // 0.15 (Missing structured data/SSL = low hanging fruit)
  businessReputationWeight: number; // 0.10 (High rating/reviews = established business with budget)
  commercialSectorWeight: number; // 0.10 (High-ticket/high-margin sector = high willingness to pay)
}

export const DEFAULT_V1_WEIGHTS: ScoringWeights = {
  websiteQualityGapWeight: 0.25,
  mobileExperienceGapWeight: 0.20,
  conversionArchitectureGapWeight: 0.20,
  seoAndStructureGapWeight: 0.15,
  businessReputationWeight: 0.10,
  commercialSectorWeight: 0.10,
};

export const HIGH_VALUE_SECTORS: Record<string, number> = {
  "Architects": 95,
  "Architecture & Spatial Design": 95,
  "Commercial Real Estate": 95,
  "Specialist Engineering": 90,
  "Luxury Hospitality": 90,
  "Private Aviation": 95,
  "Law Firms & Corporate Advisory": 85,
  "High-End Medical & Surgery": 85,
  "Financial Technology & Wealth": 90,
  "Marine & Yachting": 90,
  "Industrial Manufacturing": 80,
  "Creative Agencies": 75,
  "Professional Services": 70,
};

export function computeOpportunityBand(score: number): OpportunityBand {
  if (score >= 85) return "PRIORITY";
  if (score >= 70) return "GOOD";
  if (score >= 50) return "SECONDARY";
  return "LOW";
}

export interface ScoreInput {
  websiteQualityScore: number; // 0-100 (where 100 is pristine modern site, 0 is broken/outdated)
  mobileScore: number; // 0-100 (where 100 is perfect mobile, 0 is unusable on mobile)
  hasOnlineBooking: boolean;
  hasContactForm: boolean;
  hasClearCta: boolean;
  hasLiveChat: boolean;
  hasSsl: boolean;
  hasStructuredData: boolean;
  hasRecentContent: boolean;
  googleRating?: number | null;
  googleReviewCount?: number | null;
  sector: string;
  customWeights?: Partial<ScoringWeights>;
}

export interface ScoringResult {
  opportunityScore: number;
  opportunityBand: OpportunityBand;
  breakdown: {
    websiteGapScore: number; // 0-100
    mobileGapScore: number; // 0-100
    conversionGapScore: number; // 0-100
    technicalGapScore: number; // 0-100
    businessLegitimacyScore: number; // 0-100
    sectorValueScore: number; // 0-100
  };
  rationale: string[];
  engineVersion: string;
}

/**
 * v1 Heuristic Opportunity Scoring Engine
 * Computes commercial opportunity for Avorria's high-end web & AI acquisition engine.
 * A high opportunity score means the business is established/solvent but has a substandard digital presence.
 */
export function calculateOpportunityScore(input: ScoreInput): ScoringResult {
  const weights: ScoringWeights = {
    ...DEFAULT_V1_WEIGHTS,
    ...(input.customWeights || {}),
  };

  // 1. Website Quality Gap: (100 - quality). The worse their current site, the higher the opportunity.
  const websiteGapScore = Math.max(0, Math.min(100, 100 - input.websiteQualityScore));

  // 2. Mobile Gap: (100 - mobile). The worse their mobile layout, the greater the redesign pressure.
  const mobileGapScore = Math.max(0, Math.min(100, 100 - input.mobileScore));

  // 3. Conversion Gap: missing standard commercial conversion mechanisms
  let conversionDeficit = 0;
  if (!input.hasClearCta) conversionDeficit += 35;
  if (!input.hasContactForm) conversionDeficit += 30;
  if (!input.hasOnlineBooking) conversionDeficit += 25;
  if (!input.hasLiveChat) conversionDeficit += 10;
  const conversionGapScore = Math.min(100, conversionDeficit);

  // 4. Technical / SEO Gap
  let techDeficit = 0;
  if (!input.hasSsl) techDeficit += 40;
  if (!input.hasStructuredData) techDeficit += 35;
  if (!input.hasRecentContent) techDeficit += 25;
  const technicalGapScore = Math.min(100, techDeficit);

  // 5. Business Legitimacy / Solvency: established businesses with good reviews have commercial budget
  let businessLegitimacyScore = 50; // default baseline
  if (input.googleRating && input.googleRating >= 4.5) {
    businessLegitimacyScore += 30;
  } else if (input.googleRating && input.googleRating >= 4.0) {
    businessLegitimacyScore += 20;
  }
  if (input.googleReviewCount && input.googleReviewCount > 50) {
    businessLegitimacyScore += 20;
  } else if (input.googleReviewCount && input.googleReviewCount > 15) {
    businessLegitimacyScore += 10;
  }
  businessLegitimacyScore = Math.min(100, businessLegitimacyScore);

  // 6. Sector Commercial Value
  const sectorValueScore = HIGH_VALUE_SECTORS[input.sector] || 65;

  // Compute weighted composite score (0-100)
  const rawScore = 
    (websiteGapScore * weights.websiteQualityGapWeight) +
    (mobileGapScore * weights.mobileExperienceGapWeight) +
    (conversionGapScore * weights.conversionArchitectureGapWeight) +
    (technicalGapScore * weights.seoAndStructureGapWeight) +
    (businessLegitimacyScore * weights.businessReputationWeight) +
    (sectorValueScore * weights.commercialSectorWeight);

  const opportunityScore = Math.round(Math.max(0, Math.min(100, rawScore)));
  const opportunityBand = computeOpportunityBand(opportunityScore);

  // Generate explainable rationale
  const rationale: string[] = [];
  if (websiteGapScore >= 60) {
    rationale.push(`Significant visual and architectural deficiency in current digital presence (quality rating: ${input.websiteQualityScore}/100).`);
  }
  if (mobileGapScore >= 50) {
    rationale.push(`Mobile viewport degradation compromises high-intent mobile visitors (mobile score: ${input.mobileScore}/100).`);
  }
  if (conversionGapScore >= 50) {
    rationale.push("Absence of primary conversion mechanics (e.g. structured contact funnel, explicit action prompts).");
  }
  if (businessLegitimacyScore >= 75) {
    rationale.push(`Strong commercial reputation (${input.googleRating || "4.5"}★ rating with ${input.googleReviewCount || 20}+ reviews) indicates solvency and commercial capacity.`);
  }
  if (sectorValueScore >= 85) {
    rationale.push(`High-ticket commercial sector (${input.sector}) with elevated project commission margin potential.`);
  }

  return {
    opportunityScore,
    opportunityBand,
    breakdown: {
      websiteGapScore: Math.round(websiteGapScore),
      mobileGapScore: Math.round(mobileGapScore),
      conversionGapScore: Math.round(conversionGapScore),
      technicalGapScore: Math.round(technicalGapScore),
      businessLegitimacyScore: Math.round(businessLegitimacyScore),
      sectorValueScore: Math.round(sectorValueScore),
    },
    rationale,
    engineVersion: "v1 heuristic scoring",
  };
}

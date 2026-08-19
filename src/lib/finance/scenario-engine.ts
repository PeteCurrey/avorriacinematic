/**
 * AVORRIA — CEO SCENARIO SIMULATION & REVERSE TARGET ENGINE (Phase 9)
 * Pure deterministic arithmetic for revenue planning, capacity constraints, and unit costs.
 */

export interface ScenarioInputs {
  dailyScoutDiscoveries: number;
  qualificationRate: number;      // e.g. 0.25 (25%)
  humanApprovalRate: number;      // e.g. 0.85 (85%)
  previewViewRate: number;        // e.g. 0.40 (40%)
  outreachReplyRate: number;      // e.g. 0.18 (18%)
  proposalCloseRate: number;      // e.g. 0.35 (35%)
  averageOrderValue: number;      // e.g. 1850 (£)
  aiCostPerScoutedSite: number;   // e.g. 0.28 (£)
  aiCostPerGeneratedPreview: number; // e.g. 0.45 (£)
  manualHoursPerClient: number;   // e.g. 2.5 (hrs)
  internalHourlyRate: number;     // e.g. 45 (£/hr)
  recurringAttachRate: number;    // e.g. 0.30 (30%)
  averageMRRPerAttach: number;    // e.g. 65 (£/mo)
}

export interface ScenarioOutputs {
  monthlyScouted: number;
  monthlyQualified: number;
  monthlyApproved: number;
  monthlyPreviewsGenerated: number;
  monthlyOutreachSent: number;
  monthlyPreviewViews: number;
  monthlyReplies: number;
  monthlyProposals: number;
  monthlyClientsWon: number;
  monthlyContractedRevenue: number;
  monthlyAddedMRR: number;
  monthlyDirectCosts: {
    aiScoutSpend: number;
    aiGenerationSpend: number;
    manualLabourCost: number;
    paymentProcessingFees: number; // ~1.5% + 20p
    totalDirectCost: number;
  };
  monthlyTrackedContribution: number;
  contributionMarginPct: number;
  operationalBottlenecks: string[];
}

export function runForwardScenario(inputs: ScenarioInputs): ScenarioOutputs {
  const monthlyScouted = inputs.dailyScoutDiscoveries * 30;
  const monthlyQualified = Math.round(monthlyScouted * inputs.qualificationRate);
  const monthlyApproved = Math.round(monthlyQualified * inputs.humanApprovalRate);
  const monthlyPreviewsGenerated = monthlyApproved;
  const monthlyOutreachSent = monthlyApproved;
  const monthlyPreviewViews = Math.round(monthlyOutreachSent * inputs.previewViewRate);
  const monthlyReplies = Math.round(monthlyOutreachSent * inputs.outreachReplyRate);
  const monthlyProposals = Math.round(monthlyReplies * 0.70); // 70% of positive replies get proposals
  const monthlyClientsWon = Math.max(1, Math.round(monthlyProposals * inputs.proposalCloseRate));

  const monthlyContractedRevenue = monthlyClientsWon * inputs.averageOrderValue;
  const monthlyAddedMRR = Math.round(monthlyClientsWon * inputs.recurringAttachRate * inputs.averageMRRPerAttach);

  const aiScoutSpend = Math.round(monthlyScouted * inputs.aiCostPerScoutedSite);
  const aiGenerationSpend = Math.round(monthlyPreviewsGenerated * inputs.aiCostPerGeneratedPreview);
  const manualLabourCost = Math.round(monthlyClientsWon * inputs.manualHoursPerClient * inputs.internalHourlyRate);
  const paymentProcessingFees = Math.round(monthlyContractedRevenue * 0.015 + monthlyClientsWon * 0.20);
  const totalDirectCost = aiScoutSpend + aiGenerationSpend + manualLabourCost + paymentProcessingFees;

  const monthlyTrackedContribution = monthlyContractedRevenue - totalDirectCost;
  const contributionMarginPct = monthlyContractedRevenue > 0
    ? (monthlyTrackedContribution / monthlyContractedRevenue) * 100
    : 0;

  const operationalBottlenecks: string[] = [];
  if (monthlyApproved > 250) {
    operationalBottlenecks.push("Daily human review volume exceeds recommended 10/day threshold (Pete bandwidth limit).");
  }
  if (monthlyClientsWon > 15) {
    operationalBottlenecks.push(`Monthly onboarding capacity (${monthlyClientsWon} clients) requires dedicated client success buffer.`);
  }

  return {
    monthlyScouted,
    monthlyQualified,
    monthlyApproved,
    monthlyPreviewsGenerated,
    monthlyOutreachSent,
    monthlyPreviewViews,
    monthlyReplies,
    monthlyProposals,
    monthlyClientsWon,
    monthlyContractedRevenue,
    monthlyAddedMRR,
    monthlyDirectCosts: {
      aiScoutSpend,
      aiGenerationSpend,
      manualLabourCost,
      paymentProcessingFees,
      totalDirectCost,
    },
    monthlyTrackedContribution,
    contributionMarginPct,
    operationalBottlenecks,
  };
}

export interface ReverseTargetInputs {
  targetRevenueGoal: number; // e.g. 50000 (£)
  averageOrderValue: number; // e.g. 1850 (£)
  closeRateFromContacted: number; // e.g. 0.045 (4.5%)
  approvalRate: number;      // e.g. 0.85 (85%)
  qualificationRate: number; // e.g. 0.25 (25%)
  aiCostPerScoutCandidate: number; // e.g. 0.35 (£)
}

export interface ReverseTargetResult {
  targetRevenueGoal: number;
  requiredClients: number;
  requiredContactedProspects: number;
  requiredApprovedProspects: number;
  requiredQualifiedProspects: number;
  requiredScoutDiscoveries: number;
  dailyScoutCadence: number;
  estimatedAISpend: number;
  estimatedContribution: number;
  feasibilityWarnings: string[];
}

/** Reverse engineer the required operational funnel to hit a target monthly revenue */
export function calculateReverseTarget(inputs: ReverseTargetInputs): ReverseTargetResult {
  const requiredClients = Math.ceil(inputs.targetRevenueGoal / inputs.averageOrderValue);
  const requiredContactedProspects = Math.ceil(requiredClients / Math.max(0.001, inputs.closeRateFromContacted));
  const requiredApprovedProspects = Math.ceil(requiredContactedProspects / Math.max(0.01, inputs.approvalRate));
  const requiredQualifiedProspects = Math.ceil(requiredApprovedProspects / Math.max(0.01, inputs.qualificationRate));
  const requiredScoutDiscoveries = requiredQualifiedProspects * 4; // ~25% qual
  const dailyScoutCadence = Math.ceil(requiredScoutDiscoveries / 30);

  const estimatedAISpend = Math.round(requiredScoutDiscoveries * inputs.aiCostPerScoutCandidate + requiredApprovedProspects * 0.45);
  const estimatedContribution = inputs.targetRevenueGoal - estimatedAISpend;

  const feasibilityWarnings: string[] = [];
  if (dailyScoutCadence > 150) {
    feasibilityWarnings.push("Scout API volume exceeds default daily rate limit. Provider tier upgrade required.");
  }
  if (requiredClients > 20) {
    feasibilityWarnings.push(`Fulfilling ${requiredClients} clients/mo exceeds single-operator capacity. Client production assistance required.`);
  }

  return {
    targetRevenueGoal: inputs.targetRevenueGoal,
    requiredClients,
    requiredContactedProspects,
    requiredApprovedProspects,
    requiredQualifiedProspects,
    requiredScoutDiscoveries,
    dailyScoutCadence,
    estimatedAISpend,
    estimatedContribution,
    feasibilityWarnings,
  };
}

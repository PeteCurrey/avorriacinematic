/**
 * AVORRIA — OPTIMISATION RECOMMENDATION ENGINE (Phase 7)
 * Generates evidence-backed recommendations. Never applies automatically.
 * All recommendations require Pete's explicit approval.
 */

import { getConfidence, safeRate, CONFIDENCE_THRESHOLDS } from "./analytics-definitions";
import type { ConfidenceLabel } from "./analytics-definitions";

export interface SegmentPerformance {
  segment: string;
  discovered: number;
  qualified: number;
  contacted: number;
  replies: number;
  positive_replies: number;
  clients: number;
  revenue: number;
  ai_cost: number;
}

export interface Recommendation {
  id: string;
  category: "TARGETING" | "SCORING" | "MODEL_ROUTING" | "CREATIVE" | "OUTREACH" | "PRICING" | "COST" | "OPERATION";
  title: string;
  summary: string;
  evidence: Record<string, unknown>;
  expected_impact: string;
  confidence: ConfidenceLabel;
  risk: "LOW" | "MEDIUM" | "HIGH";
  action_type: string;
  proposed_config_change: Record<string, unknown>;
  what: string;
  why: string;
  rollback: string;
}

/**
 * Analyse segment performance and produce recommendations.
 * Only emits recommendations where confidence >= EARLY_SIGNAL.
 */
export function evaluateTargetingRecommendations(segments: SegmentPerformance[]): Recommendation[] {
  const recs: Recommendation[] = [];
  const overall = segments.reduce(
    (acc, s) => ({
      contacted: acc.contacted + s.contacted,
      clients: acc.clients + s.clients,
    }),
    { contacted: 0, clients: 0 }
  );
  const overallRate = safeRate(overall.clients, overall.contacted);

  for (const seg of segments) {
    const confidence = getConfidence(seg.contacted);
    if (confidence === "INSUFFICIENT_DATA") continue;

    const segRate = safeRate(seg.clients, seg.contacted);
    const relativeLift = overallRate > 0 ? (segRate - overallRate) / overallRate : 0;

    // Recommend increase if substantially above average with moderate+ confidence
    if (relativeLift >= 0.5 && confidence !== "EARLY_SIGNAL") {
      recs.push({
        id: `targeting_increase_${seg.segment.toLowerCase().replace(/\W+/g, "_")}`,
        category: "TARGETING",
        title: `Increase allocation: ${seg.segment}`,
        summary: `${seg.segment} converts at ${(segRate * 100).toFixed(1)}% vs ${(overallRate * 100).toFixed(1)}% overall (${Math.round(relativeLift * 100)}% relative lift).`,
        evidence: { segment: seg.segment, contacted: seg.contacted, clients: seg.clients, segRate, overallRate, relativeLift },
        expected_impact: `+${Math.round(relativeLift * 20)}% clients per 100 contacted at current performance`,
        confidence,
        risk: "LOW",
        action_type: "ADJUST_SCOUT_ALLOCATION",
        proposed_config_change: { sector_increase: seg.segment, suggested_delta: "+10%" },
        what: `Increase ${seg.segment} Scout allocation`,
        why: `Historical data shows ${Math.round(relativeLift * 100)}% higher contacted→client rate versus overall average with ${seg.contacted} sample contacts`,
        rollback: `Revert targeting profile allocation weights to previous version in /admin/ai-auto/targets`,
      });
    }

    // Recommend stop/reduce if clearly below and enough data
    if (relativeLift <= -0.5 && confidence === "STRONG" && seg.ai_cost > 0) {
      const costPerClient = seg.clients > 0 ? seg.ai_cost / seg.clients : seg.ai_cost;
      recs.push({
        id: `targeting_reduce_${seg.segment.toLowerCase().replace(/\W+/g, "_")}`,
        category: "TARGETING",
        title: `Reduce allocation: ${seg.segment}`,
        summary: `${seg.segment} converts at ${(segRate * 100).toFixed(1)}% with high AI cost per client. Strong evidence suggests reallocation improves economics.`,
        evidence: { segment: seg.segment, contacted: seg.contacted, clients: seg.clients, segRate, overallRate, costPerClient },
        expected_impact: `Estimated -${Math.round(Math.abs(relativeLift) * 10)}% AI spend with same client volume`,
        confidence,
        risk: "MEDIUM",
        action_type: "REDUCE_SCOUT_ALLOCATION",
        proposed_config_change: { sector_reduce: seg.segment, suggested_delta: "-10%" },
        what: `Reduce ${seg.segment} Scout allocation`,
        why: `Strong-signal data (n=${seg.contacted}) shows below-average conversion. High AI cost per client of ${costPerClient.toFixed(2)}.`,
        rollback: `Revert targeting profile allocation weights to previous version in /admin/ai-auto/targets`,
      });
    }
  }

  return recs;
}

/** AI cost efficiency analysis recommendations */
export function evaluateAICostRecommendations(
  taskMetrics: Array<{ task: string; calls: number; cost: number; avgQualityScore?: number }>
): Recommendation[] {
  const recs: Recommendation[] = [];
  const totalCost = taskMetrics.reduce((s, t) => s + t.cost, 0);

  for (const task of taskMetrics) {
    const pct = totalCost > 0 ? task.cost / totalCost : 0;
    if (pct > 0.30 && task.calls >= 20) {
      recs.push({
        id: `cost_reduce_${task.task}`,
        category: "COST",
        title: `Review AI cost: ${task.task}`,
        summary: `${task.task} accounts for ${(pct * 100).toFixed(0)}% of total AI spend across ${task.calls} calls.`,
        evidence: { task: task.task, cost: task.cost, totalCost, proportion: pct, calls: task.calls },
        expected_impact: "Downgrade to cheaper model or reduce call frequency to reduce overall AI spend",
        confidence: "MODERATE",
        risk: "MEDIUM",
        action_type: "REVIEW_MODEL_ROUTING",
        proposed_config_change: { review_task: task.task },
        what: `Review model assignment for ${task.task}`,
        why: `This single task accounts for more than 30% of total AI spend. Review whether a lower-cost model would maintain acceptable quality.`,
        rollback: `Revert AI task router config to previous task_config version`,
      });
    }
  }

  return recs;
}

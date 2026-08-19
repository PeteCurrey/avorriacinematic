/**
 * AVORRIA — FINANCIAL INTELLIGENCE & REVENUE ENGINE (Phase 9)
 * Canonical calculations for cash, contracted revenue, receivables ageing, and client unit economics.
 */

import type {
  FinancialEvent,
  BusinessTarget,
  TargetPaceStatus,
  ClientProfitability,
  ServiceProfitability,
  ExecutiveKPIs
} from "@/types/admin";

/** Calculate target pacing deterministically based on time elapsed */
export function calculateTargetPace(
  actual: number,
  target: number,
  periodStart: string,
  periodEnd: string
): { paceStatus: TargetPaceStatus; paceRatio: number; progressPct: number } {
  if (target <= 0) return { paceStatus: "ON_TRACK", paceRatio: 1, progressPct: 100 };

  const start = new Date(periodStart).getTime();
  const end = new Date(periodEnd).getTime();
  const now = Date.now();

  const totalDuration = Math.max(1, end - start);
  const elapsed = Math.max(0, Math.min(totalDuration, now - start));
  const timeElapsedRatio = elapsed / totalDuration;

  const progressPct = (actual / target) * 100;
  if (timeElapsedRatio === 0) return { paceStatus: "ON_TRACK", paceRatio: 1, progressPct };

  const expectedProgress = target * timeElapsedRatio;
  const paceRatio = expectedProgress > 0 ? actual / expectedProgress : 1;

  let paceStatus: TargetPaceStatus = "ON_TRACK";
  if (paceRatio >= 1.15) paceStatus = "AHEAD";
  else if (paceRatio >= 0.90) paceStatus = "ON_TRACK";
  else if (paceRatio >= 0.70) paceStatus = "AT_RISK";
  else paceStatus = "BEHIND";

  return { paceStatus, paceRatio, progressPct };
}

export interface ReceivablesAgeingBucket {
  bucket: "current" | "1_7_days" | "8_30_days" | "31_60_days" | "over_60_days";
  label: string;
  totalAmount: number;
  count: number;
  items: Array<{
    id: string;
    clientName: string;
    amount: number;
    currency: string;
    dueDate: string;
    daysOverdue: number;
  }>;
}

/** Ageing calculation for outstanding payment milestones */
export function calculateReceivablesAgeing(
  unpaidItems: Array<{ id: string; clientName: string; amount: number; currency: string; dueDate: string }>
): ReceivablesAgeingBucket[] {
  const now = Date.now();
  const buckets: Record<string, ReceivablesAgeingBucket> = {
    current: { bucket: "current", label: "Current (Upcoming)", totalAmount: 0, count: 0, items: [] },
    "1_7_days": { bucket: "1_7_days", label: "1–7 Days Overdue", totalAmount: 0, count: 0, items: [] },
    "8_30_days": { bucket: "8_30_days", label: "8–30 Days Overdue", totalAmount: 0, count: 0, items: [] },
    "31_60_days": { bucket: "31_60_days", label: "31–60 Days Overdue", totalAmount: 0, count: 0, items: [] },
    over_60_days: { bucket: "over_60_days", label: "60+ Days Overdue", totalAmount: 0, count: 0, items: [] },
  };

  for (const item of unpaidItems) {
    const dueTime = new Date(item.dueDate).getTime();
    const diffDays = Math.floor((now - dueTime) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) {
      buckets.current.totalAmount += item.amount;
      buckets.current.count += 1;
      buckets.current.items.push({ ...item, daysOverdue: 0 });
    } else if (diffDays <= 7) {
      buckets["1_7_days"].totalAmount += item.amount;
      buckets["1_7_days"].count += 1;
      buckets["1_7_days"].items.push({ ...item, daysOverdue: diffDays });
    } else if (diffDays <= 30) {
      buckets["8_30_days"].totalAmount += item.amount;
      buckets["8_30_days"].count += 1;
      buckets["8_30_days"].items.push({ ...item, daysOverdue: diffDays });
    } else if (diffDays <= 60) {
      buckets["31_60_days"].totalAmount += item.amount;
      buckets["31_60_days"].count += 1;
      buckets["31_60_days"].items.push({ ...item, daysOverdue: diffDays });
    } else {
      buckets.over_60_days.totalAmount += item.amount;
      buckets.over_60_days.count += 1;
      buckets.over_60_days.items.push({ ...item, daysOverdue: diffDays });
    }
  }

  return Object.values(buckets);
}

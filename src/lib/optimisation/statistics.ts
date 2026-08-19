/**
 * AVORRIA — LIGHTWEIGHT STATISTICS UTILITY (Phase 7)
 * Bayesian-inspired proportion comparison for business decisions.
 * Deliberately simple — avoids academic complexity while preventing
 * stupid decisions from noise.
 */

export interface ProportionResult {
  rate: number;
  lower95: number;
  upper95: number;
  n: number;
}

/** Wilson score confidence interval for a proportion */
export function wilsonCI(successes: number, n: number, z = 1.96): { lower: number; upper: number } {
  if (n === 0) return { lower: 0, upper: 1 };
  const p = successes / n;
  const z2 = z * z;
  const denom = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denom;
  const spread = (z * Math.sqrt(p * (1 - p) / n + z2 / (4 * n * n))) / denom;
  return {
    lower: Math.max(0, center - spread),
    upper: Math.min(1, center + spread),
  };
}

/** Describe a proportion with confidence interval */
export function proportion(successes: number, n: number): ProportionResult {
  const ci = wilsonCI(successes, n);
  return {
    rate: n > 0 ? successes / n : 0,
    lower95: ci.lower,
    upper95: ci.upper,
    n,
  };
}

/**
 * Determine if variant B is statistically better than control A.
 * Uses a simple Chi-squared approximation (two-proportion z-test).
 * Returns p-value and whether it meets the target significance level.
 */
export function twoProportionTest(
  controlSuccess: number, controlN: number,
  variantSuccess: number, variantN: number,
): { pValue: number; significant: boolean; relativeLift: number } {
  if (controlN === 0 || variantN === 0) {
    return { pValue: 1, significant: false, relativeLift: 0 };
  }
  const p1 = controlSuccess / controlN;
  const p2 = variantSuccess / variantN;
  const pooled = (controlSuccess + variantSuccess) / (controlN + variantN);

  if (pooled === 0 || pooled === 1) {
    return { pValue: 1, significant: false, relativeLift: 0 };
  }

  const se = Math.sqrt(pooled * (1 - pooled) * (1 / controlN + 1 / variantN));
  if (se === 0) return { pValue: 1, significant: false, relativeLift: 0 };

  const z = Math.abs(p2 - p1) / se;
  // Two-tailed p-value approximation from z-score
  const pValue = 2 * (1 - normalCDF(z));
  const relativeLift = p1 > 0 ? (p2 - p1) / p1 : 0;

  return { pValue, significant: pValue < 0.05, relativeLift };
}

/** Standard normal CDF approximation (Abramowitz & Stegun) */
function normalCDF(z: number): number {
  const a1 = 0.319381530, a2 = -0.356563782, a3 = 1.781477937;
  const a4 = -1.821255978, a5 = 1.330274429;
  const p = 0.2316419;
  const t = 1 / (1 + p * z);
  const t2 = t * t, t3 = t2 * t, t4 = t3 * t, t5 = t4 * t;
  return 1 - (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-z * z / 2) *
    (a1 * t + a2 * t2 + a3 * t3 + a4 * t4 + a5 * t5);
}

/** Determine experiment conclusion from results */
export function experimentConclusion(
  controlSuccess: number, controlN: number,
  variantSuccess: number, variantN: number,
  minSampleSize: number,
): "INSUFFICIENT_SAMPLE" | "INCONCLUSIVE" | "LIKELY_WINNER" | "WINNER" | "NEGATIVE" | "NO_MATERIAL_DIFFERENCE" {
  if (controlN < minSampleSize || variantN < minSampleSize) return "INSUFFICIENT_SAMPLE";

  const { pValue, significant, relativeLift } = twoProportionTest(controlSuccess, controlN, variantSuccess, variantN);

  if (Math.abs(relativeLift) < 0.05) return "NO_MATERIAL_DIFFERENCE"; // <5% lift
  if (!significant && pValue < 0.20) return "LIKELY_WINNER"; // trend but not significant
  if (!significant) return "INCONCLUSIVE";
  if (significant && relativeLift < 0) return "NEGATIVE";
  if (significant && relativeLift >= 0.10) return "WINNER"; // >10% lift + significant
  return "LIKELY_WINNER";
}

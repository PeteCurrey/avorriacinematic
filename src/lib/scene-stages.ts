/**
 * AVORRIA — SCENE STAGE TIMING UTILITIES
 *
 * All sub-stage opacity and visibility calculations must use these functions.
 * Enforces a maximum 0.05 overlap between adjacent primary stages.
 *
 * Progress values are 0.0 → 1.0 (normalised scene progress).
 */

/**
 * Calculate opacity for a stage with fade-in and fade-out ramps.
 *
 * @param p       Current scene progress (0–1)
 * @param enter   Progress at which fade-in begins
 * @param peak    Progress at which stage is fully opaque (opacity 1.0)
 * @param exit    Progress at which fade-out begins
 * @param leave   Progress at which stage is fully transparent (opacity 0)
 */
export function stageOpacity(
  p: number,
  enter: number,
  peak: number,
  exit: number,
  leave: number
): number {
  if (p <= enter || p >= leave) return 0;
  if (p < peak) {
    const ramp = peak - enter;
    return ramp > 0 ? Math.min(1, (p - enter) / ramp) : 1;
  }
  if (p <= exit) return 1;
  const ramp = leave - exit;
  return ramp > 0 ? Math.max(0, 1 - (p - exit) / ramp) : 0;
}

/**
 * Returns true when a stage should be mounted in the DOM.
 * Unmounts stages well outside their visible range to reduce render cost.
 *
 * @param p      Current scene progress (0–1)
 * @param enter  Progress at which stage becomes relevant
 * @param leave  Progress at which stage is no longer relevant
 * @param buffer Extra progress margin to keep stage mounted for safety (default 0.02)
 */
export function stageMounted(
  p: number,
  enter: number,
  leave: number,
  buffer = 0.02
): boolean {
  return p >= enter - buffer && p <= leave + buffer;
}

/**
 * CSS visibility value for a stage — prevents invisible elements from
 * intercepting pointer events or contributing to paint.
 */
export function stageVisibility(opacity: number): "visible" | "hidden" {
  return opacity > 0.01 ? "visible" : "hidden";
}

/**
 * Compute a transform value (Y translate in px or %) for entrance/exit motion.
 * Returns 0 when stage is at peak. Returns `distance` when not yet entered.
 */
export function stageEntranceY(
  p: number,
  enter: number,
  peak: number,
  distance = 40
): number {
  if (p >= peak) return 0;
  if (p <= enter) return distance;
  return distance * (1 - (p - enter) / (peak - enter));
}

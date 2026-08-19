export interface ViewportAnchor {
  id: string;
  fraction: number; // 0.0 to 1.0 of viewport height
  label: string;
}

export const VIEWPORT_ANCHORS = {
  TOP_SAFE: { id: "top_safe", fraction: 0.10, label: "TOP SAFE" },
  UPPER_FOCAL: { id: "upper_focal", fraction: 0.34, label: "UPPER FOCAL" },
  CENTRE: { id: "centre", fraction: 0.50, label: "CENTRE" },
  LOWER_FOCAL: { id: "lower_focal", fraction: 0.66, label: "LOWER FOCAL" },
  BOTTOM_SAFE: { id: "bottom_safe", fraction: 0.90, label: "BOTTOM SAFE" },
} as const;

export type ViewportAnchorKey = keyof typeof VIEWPORT_ANCHORS;

export function getAnchorPx(anchor: ViewportAnchor, containerHeight: number): number {
  return anchor.fraction * containerHeight;
}

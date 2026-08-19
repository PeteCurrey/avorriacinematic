export const MOTION_DURATIONS = {
  micro: 0.16,
  fast: 0.28,
  standard: 0.45,
  slow: 0.8,
  cinematic: 1.4
} as const;

export const MOTION_EASINGS = {
  avorriaOut: "expo.out",
  avorriaInOut: "expo.inOut",
  avorriaCinematic: "power3.out",
  avorriaSignal: "power2.out",
  avorriaLinear: "none"
} as const;

export type MotionTiming = "micro" | "fast" | "standard" | "slow" | "cinematic";
export type MotionEasing = "outQuad" | "outExpo" | "inOutExpo" | "cinematic";

export interface MotionConfig {
  reducedMotion: boolean;
  hasHardwareAcceleration: boolean;
  dprCap: number;
}

export type SceneId =
  | "scene-00-void"
  | "scene-01-precision"
  | "scene-02-signal"
  | "scene-03-alkota"
  | "scene-04-breath"
  | "scene-05-careeros"
  | "scene-06-build"
  | "scene-07-nestiq"
  | "scene-08-search"
  | "scene-09-drawdown"
  | "scene-10-systems"
  | "scene-11-entirefm"
  | "scene-12-work"
  | "scene-13-ogn"
  | "scene-14-lab"
  | "scene-15-manifesto"
  | "scene-16-proof"
  | "scene-17-intelligence"
  | "scene-18-finale";

export type BackgroundMode = "black" | "surface" | "transparent" | "custom";
export type ForegroundMode = "standard" | "high-contrast" | "inverted";
export type ReducedMotionStrategy = "static" | "simplified-motion" | "skip";
export type MobileStrategy = "desktopCinematic" | "mobileCinematic" | "mobileSimplified" | "mobileStatic";
export type MediaPriority = "high" | "normal" | "low" | "lazy";

export interface SceneConfig {
  id: SceneId;
  index: number;
  label: string;
  chapter?: string;
  minHeight?: string; // e.g. "100vh", "150vh", "300vh"
  mobileHeight?: string; // e.g. "90svh", "240svh", "natural"
  mobileSceneClass?: "A" | "B" | "C"; // A: Light, B: Recomposed, C: Re-art-directed
  bgMode?: BackgroundMode;
  fgMode?: ForegroundMode;
  pinningEligibility: boolean;
  webglRequirement: boolean;
  mediaPriority: MediaPriority;
  reducedMotionStrategy: ReducedMotionStrategy;
  mobileStrategy: MobileStrategy;
  analyticsName: string;
  debugMode?: boolean;
}

export interface SceneComponentProps {
  config: SceneConfig;
  className?: string;
}

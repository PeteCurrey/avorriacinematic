import { SceneId } from "./scene";

export type TransitionType =
  | "SHARED_ELEMENT"
  | "GEOMETRIC_TRANSFORMATION"
  | "SEMANTIC_TRANSFORMATION"
  | "BLACKOUT_SILENCE"
  | "NATURAL_DOCUMENT_FLOW";

export type EnergyClass =
  | "SILENCE"
  | "PRECISION"
  | "CONTROL"
  | "SPECTACLE"
  | "INTERACTIVE"
  | "NATURAL";

export interface SceneTransitionEntry {
  id: string;
  fromScene: SceneId;
  toScene: SceneId | "footer";
  transitionType: TransitionType;
  outgoingAnchor: string;
  incomingAnchor: string;
  ownershipTransferAt: number; // 0.0 - 1.0 of outgoing scene
  preloadStart: number;
  cleanupStart: number;
  cleanupCompleteAt: number;
  reducedMotionStrategy: string;
  mobileStrategy: string;
  debugLabel: string;
}

import { NestIQChapterConfig } from "@/types/nestiq-scene";

export const NESTIQ_CHAPTERS: NestIQChapterConfig[] = [
  { id: "handoff", label: "BUILD HANDOFF / PROPERTY FRAME", startProgress: 0.0, endProgress: 0.12 },
  { id: "property", label: "PROPERTY FOCUS & LENS", startProgress: 0.12, endProgress: 0.27 },
  { id: "context", label: "CONTEXTUAL SIGNAL EXTENSION", startProgress: 0.27, endProgress: 0.43 },
  { id: "map", label: "NEIGHBOURHOOD MAP", startProgress: 0.43, endProgress: 0.63 },
  { id: "landscape", label: "SPATIAL DATA LANDSCAPE", startProgress: 0.63, endProgress: 0.78 },
  { id: "decision", label: "DECISION INTELLIGENCE", startProgress: 0.78, endProgress: 0.90 },
  { id: "contribution", label: "AVORRIA CONTRIBUTION", startProgress: 0.90, endProgress: 0.96 },
  { id: "release", label: "RELEASE / SILENCE", startProgress: 0.96, endProgress: 1.0 }
];

export const NESTIQ_DELIVERABLES = [
  { code: "01", title: "SPATIAL PRODUCT STRATEGY & UX" },
  { code: "02", title: "PROPERTY VALUATION & CONTEXT ARCHITECTURE" },
  { code: "03", title: "HIGH-PERFORMANCE VECTOR MAPPING ENGINE" },
  { code: "04", title: "DYNAMIC COMPARABLE ANALYSIS SYSTEMS" },
  { code: "05", title: "FULL-STACK DIGITAL PLATFORM ENGINEERING" }
];

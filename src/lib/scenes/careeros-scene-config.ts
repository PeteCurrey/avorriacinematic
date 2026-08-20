import type { CareerOSChapterConfig, CareerTwinNode } from "@/types/careeros-scene";

export const CAREEROS_CHAPTERS: CareerOSChapterConfig[] = [
  { id: "human", label: "HUMAN ARRIVAL", startProgress: 0.0, endProgress: 0.12 },
  { id: "conversation", label: "STRUCTURED CONVERSATION", startProgress: 0.12, endProgress: 0.30 },
  { id: "twin", label: "CAREER TWIN GRAPH", startProgress: 0.30, endProgress: 0.50 },
  { id: "opportunities", label: "OPPORTUNITY LANDSCAPE", startProgress: 0.50, endProgress: 0.67 },
  { id: "demo", label: "LIVE AI INTERACTION", startProgress: 0.67, endProgress: 0.84 },
  { id: "contribution", label: "AVORRIA CONTRIBUTION", startProgress: 0.84, endProgress: 0.94 },
  { id: "release", label: "RELEASE / SILENCE", startProgress: 0.94, endProgress: 1.0 }
];

export const CAREER_TWIN_NODES: CareerTwinNode[] = [
  { id: "n1", label: "BSc Computer Science", category: "education", xPercent: 25, yPercent: 35 },
  { id: "n2", label: "React & TypeScript Systems", category: "skill", xPercent: 40, yPercent: 28 },
  { id: "n3", label: "Design Engineering", category: "interest", xPercent: 60, yPercent: 32 },
  { id: "n4", label: "High-Scale Digital Products", category: "goal", xPercent: 75, yPercent: 45 },
  { id: "n5", label: "Remote / Hybrid Constraint", category: "constraint", xPercent: 35, yPercent: 62 },
  { id: "n6", label: "Staff Creative Technologist", category: "opportunity", xPercent: 65, yPercent: 65 }
];

export const CAREEROS_DELIVERABLES = [
  { code: "01", title: "AI PRODUCT STRATEGY & ARCHITECTURE" },
  { code: "02", title: "CAREER TWIN GRAPH & DATA MODELLING" },
  { code: "03", title: "HUMAN-CENTRED CONVERSATIONAL UX/UI" },
  { code: "04", title: "RECOMMENDATION & MATCHING SYSTEMS" },
  { code: "05", title: "FULL-STACK WEB PLATFORM DEVELOPMENT" }
];

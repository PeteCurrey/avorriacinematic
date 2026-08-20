import type { AlkotaChapterConfig } from "@/types/alkota-scene";

export const ALKOTA_CHAPTERS: AlkotaChapterConfig[] = [
  { id: "handoff", label: "HANDOFF / ARRIVAL", startProgress: 0.0, endProgress: 0.08 },
  { id: "material", label: "MATERIAL & FINISH", startProgress: 0.08, endProgress: 0.26 },
  { id: "engineering", label: "STRUCTURAL KINEMATICS", startProgress: 0.26, endProgress: 0.46 },
  { id: "product", label: "THE OBJECT / PRODUCT HERO", startProgress: 0.46, endProgress: 0.65 },
  { id: "digital", label: "PHYSICAL TO DIGITAL", startProgress: 0.65, endProgress: 0.82 },
  { id: "contribution", label: "AVORRIA CONTRIBUTION", startProgress: 0.82, endProgress: 0.92 },
  { id: "release", label: "RELEASE / SILENCE", startProgress: 0.92, endProgress: 1.0 }
];

export const ALKOTA_WORK_COMPONENTS = [
  { code: "01", title: "BRAND SYSTEM & STRATEGY" },
  { code: "02", title: "INDUSTRIAL DESIGN STORYTELLING" },
  { code: "03", title: "DIGITAL PRODUCT & FLAGSHIP UI" },
  { code: "04", title: "INTERACTIVE 3D & MOTION ARCHITECTURE" },
  { code: "05", title: "PERFORMANCE FRONTEND ENGINEERING" }
];

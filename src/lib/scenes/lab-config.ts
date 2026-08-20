import type { LabExperiment } from "@/types/lab";

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "adaptive-interface",
    slug: "adaptive-interface",
    number: "01",
    title: "Adaptive Interface",
    hypothesis: "If a user declares intent upfront, can the same content reorganise itself to serve that intent without reloading?",
    descriptor: "INTENT-DRIVEN CONTENT REORGANISATION",
    status: "PROTOTYPE",
    interactionType: "INTENT SELECTION",
    implementationNote: "DETERMINISTIC",
    mobileSupport: true
  },
  {
    id: "voice-interface",
    slug: "voice-interface",
    number: "02",
    title: "Voice Interface",
    hypothesis: "Can voice become a usable navigation and query surface for a dense information product, with text as a full fallback?",
    descriptor: "SPEECH AS INTERFACE NAVIGATION",
    status: "EXPERIMENT",
    interactionType: "SPEECH & TEXT COMMAND",
    implementationNote: "BROWSER_API",
    mobileSupport: true,
    privacyNote: "Microphone access requires explicit permission. No transcript stored or transmitted."
  },
  {
    id: "vision-study",
    slug: "vision-study",
    number: "03",
    title: "Vision Structure",
    hypothesis: "Can structured visual annotation of curated sample images communicate typographic and spatial principles more effectively than written description alone?",
    descriptor: "VISUAL INTERPRETATION & STRUCTURAL ANNOTATION",
    status: "STUDY",
    interactionType: "SAMPLE SELECTION & INSPECTION",
    implementationNote: "DETERMINISTIC",
    mobileSupport: true,
    privacyNote: "No camera access. No user image upload. Curated samples only."
  },
  {
    id: "3d-product",
    slug: "3d-product",
    number: "04",
    title: "3D Product Object",
    hypothesis: "Can a WebGL 3D object communicate physical product geometry and material quality more effectively than photography at equivalent file size?",
    descriptor: "PHYSICAL TO DIGITAL PRODUCT INTERPOLATION",
    status: "PROTOTYPE",
    interactionType: "POINTER DRAG / TOUCH ROTATION",
    implementationNote: "DETERMINISTIC",
    mobileSupport: true
  },
  {
    id: "agent-system",
    slug: "agent-system",
    number: "05",
    title: "Bounded Agent Flow",
    hypothesis: "Given a project goal, can a bounded AI agent system generate a useful structured operational plan — while keeping every step visible and reversible?",
    descriptor: "GOAL TO STRUCTURED PLAN EXECUTION",
    status: "EXPERIMENT",
    interactionType: "GOAL INPUT & PLAN GENERATION",
    implementationNote: "AI_ASSISTED",
    mobileSupport: true,
    privacyNote: "Your goal input is sent to an AI API for structured plan generation. No storage or analytics."
  },
  {
    id: "data-reasoning",
    slug: "data-reasoning",
    number: "06",
    title: "Data Reasoning Field",
    hypothesis: "Can a user toggling priority axes on a visualisation develop meaningful intuition about multidimensional data without instruction?",
    descriptor: "MANIPULABLE DIMENSIONS & PRIORITY WEIGHTING",
    status: "EXPERIMENT",
    interactionType: "PRIORITY TOGGLE & LENS SELECTION",
    implementationNote: "ILLUSTRATIVE_DATA",
    mobileSupport: true
  }
];

export function getExperimentBySlug(slug: string): LabExperiment | undefined {
  return LAB_EXPERIMENTS.find((e) => e.slug === slug);
}

export const EXPERIMENT_SLUGS = LAB_EXPERIMENTS.map((e) => e.slug);

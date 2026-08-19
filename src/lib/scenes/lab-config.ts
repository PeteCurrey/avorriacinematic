import { LabExperiment } from "@/types/lab";

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "generative",
    slug: "generative-interface",
    number: "01",
    title: "Generative Interface",
    descriptor: "ADAPTIVE HIERARCHY BASED ON INTENT",
    status: "PROTOTYPE",
    interactionType: "INTENT SELECTION"
  },
  {
    id: "voice",
    slug: "voice-interface",
    number: "02",
    title: "Voice Control",
    descriptor: "SPEECH AS INTERFACE NAVIGATION",
    status: "EXPERIMENT",
    interactionType: "SPEECH & TEXT COMMAND"
  },
  {
    id: "vision",
    slug: "vision-study",
    number: "03",
    title: "Vision Structure",
    descriptor: "VISUAL INTERPRETATION & ANNOTATION",
    status: "STUDY",
    interactionType: "SAMPLE SELECTION & INSPECTION"
  },
  {
    id: "3d",
    slug: "3d-product",
    number: "04",
    title: "3D Interactive Object",
    descriptor: "PHYSICAL TO DIGITAL PRODUCT INTERPOLATION",
    status: "PROTOTYPE",
    interactionType: "POINTER DRAG / TOUCH ROTATION"
  },
  {
    id: "agent",
    slug: "agent-system",
    number: "05",
    title: "Autonomous Agent Flow",
    descriptor: "GOAL TO STRUCTURED PLAN EXECUTION",
    status: "STUDY",
    interactionType: "PLAN PIPELINE EXECUTION"
  },
  {
    id: "data",
    slug: "data-reasoning",
    number: "06",
    title: "Data Reasoning Field",
    descriptor: "MANIPULABLE DIMENSIONS & CLUSTERING",
    status: "EXPERIMENT",
    interactionType: "ANALYTICAL LENS TOGGLE"
  }
];

export interface LabExperiment {
  id: string;
  slug: string;
  number: string;
  title: string;
  hypothesis: string;
  descriptor: string;
  status: "PROTOTYPE" | "EXPERIMENT" | "STUDY" | "LIVE";
  interactionType: string;
  implementationNote: "DETERMINISTIC" | "AI_ASSISTED" | "BROWSER_API" | "ILLUSTRATIVE_DATA";
  mobileSupport: boolean;
  privacyNote?: string;
}

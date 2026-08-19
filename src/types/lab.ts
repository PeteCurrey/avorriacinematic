export interface LabExperiment {
  id: string;
  slug: string;
  number: string;
  title: string;
  descriptor: string;
  status: "PROTOTYPE" | "EXPERIMENT" | "STUDY";
  interactionType: string;
}

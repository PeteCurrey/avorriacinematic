export type CareerOSChapter =
  | "human"
  | "conversation"
  | "twin"
  | "opportunities"
  | "demo"
  | "contribution"
  | "release";

export interface CareerOSChapterConfig {
  id: CareerOSChapter;
  label: string;
  startProgress: number;
  endProgress: number;
}

export interface CareerTwinNode {
  id: string;
  label: string;
  category: "education" | "skill" | "interest" | "goal" | "constraint" | "opportunity";
  xPercent: number;
  yPercent: number;
}

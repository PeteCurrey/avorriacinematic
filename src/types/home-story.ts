export interface HomeSectionStory {
  id: string;
  number: string;
  title: string;
  questionAnswered: string;
  purpose: string;
  motionEnergy: "HIGH" | "MEDIUM-HIGH" | "MEDIUM" | "LOW" | "VERY LOW";
  targetHeightDesktop: string;
  targetHeightMobile: string;
  componentsMounted: string[];
  primaryMedia: string[];
}

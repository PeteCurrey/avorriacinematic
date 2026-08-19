export interface WorkWallProject {
  id: string;
  slug: string;
  number: string;
  title: string;
  sector: string;
  capability: string;
  imagePath: string;
  aspectRatio: "16/10" | "4/3" | "3/4" | "1/1" | "16/9" | "2/1";
  colStart: number;
  colSpan: number;
  caseStudyAvailable: boolean;
}

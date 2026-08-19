export interface WorkWallProject {
  id: string;
  slug: string;
  number: string;
  title: string;
  sector: string;
  capability: string;
  imagePath: string;
  caseStudyAvailable: boolean;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  mediaBackground?: string;
}

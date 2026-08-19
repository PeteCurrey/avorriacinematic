export type CapabilityType = "build" | "search" | "systems";

export interface ProjectMedia {
  src: string;
  type: "image" | "video" | "3d";
  alt: string;
  poster?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
}

export interface CaseStudySection {
  title: string;
  narrative: string;
  media?: ProjectMedia[];
  deliverables?: string[];
}

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  sequenceNumber: string; // e.g. "01", "02"
  sector: string;
  capabilities: CapabilityType[];
  shortDescription: string;
  longDescription: string;
  projectURL?: string;
  heroMedia?: ProjectMedia;
  thumbnailMedia?: ProjectMedia;
  hoverMedia?: ProjectMedia;
  theme?: {
    primaryColor?: string;
    surfaceColor?: string;
  };
  year: number | string;
  status: "live" | "in-development" | "archived" | "confidential";
  featured: boolean;
  homepageFeature: boolean;
  caseStudyAvailable: boolean;
  caseStudySections?: CaseStudySection[];
  seo: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface Capability {
  slug: CapabilityType;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  outcomes: string[];
  deliverables: string[];
  deliverablesList: {
    title: string;
    description: string;
  }[];
  relatedProjects: string[]; // project slugs
}

export interface LabItem {
  slug: string;
  title: string;
  date: string;
  tag: string;
  summary: string;
  status: "active" | "concept" | "archived";
  experimentType: "3d" | "ai" | "motion" | "shader";
}

export interface IntelligenceArticle {
  slug: string;
  title: string;
  publishDate: string;
  readingTime: string;
  category: string;
  summary: string;
  content: string;
}

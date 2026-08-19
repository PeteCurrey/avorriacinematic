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

export type ServiceSlug =
  | "websites"
  | "digital-products"
  | "seo"
  | "performance-marketing"
  | "ai-automation";

export interface ServiceOfferingItem {
  id: string;
  code: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface ProblemSolutionItem {
  problem: string;
  symptom: string;
  solution: string;
  outcome: string;
}

export interface ServiceProofItem {
  projectSlug: string;
  title: string;
  entityType: "CLIENT WORK" | "AVORRIA VENTURE";
  sector: string;
  problem: string;
  role: string;
  whatWasBuilt: string;
  mediaSrc: string;
  mediaAlt: string;
  caseStudyAvailable: boolean;
  tags: string[];
}

export interface ServiceMethodologyStep {
  number: string;
  phase: string;
  title: string;
  duration?: string;
  description: string;
  deliverables: string[];
  technicalDetails?: string[];
}

export interface ServiceDefinition {
  slug: ServiceSlug;
  code: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  proposition: string;
  supportingStatement: string;
  heroSummary: string;
  deliverablesSummary: string[];
  offerings: ServiceOfferingItem[];
  problemsSolved: ProblemSolutionItem[];
  methodology: ServiceMethodologyStep[];
  proofProjects: ServiceProofItem[];
  relatedServices: {
    slug: ServiceSlug;
    code: string;
    title: string;
    reason: string;
  }[];
  finalCta: {
    heading: string;
    description: string;
    buttonText: string;
    projectServiceParam: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    schemaType?: string;
  };
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

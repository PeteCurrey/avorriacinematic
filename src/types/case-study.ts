import { ProjectRelationship, ProjectStatus, MediaStatus } from "./work";

export type PublicationStatus = "DRAFT" | "REVIEW" | "PUBLISHED" | "ARCHIVED";

export type HeroMode =
  | "PRODUCT"
  | "HUMAN"
  | "SPATIAL"
  | "INTERFACE"
  | "DATA_DENSE"
  | "TRANSFORMATION"
  | "TYPOGRAPHIC"
  | "CUSTOM";

export type ChapterType =
  | "STATEMENT"
  | "MEDIA"
  | "SPLIT"
  | "PROCESS"
  | "INTERFACE"
  | "DATA"
  | "TRANSFORMATION"
  | "TIMELINE"
  | "PROOF"
  | "QUOTE"
  | "GALLERY"
  | "VIDEO"
  | "CUSTOM";

export type CaseStudyRole =
  | "STRATEGY"
  | "PRODUCT"
  | "UX"
  | "UI"
  | "BRAND"
  | "WEB"
  | "DEVELOPMENT"
  | "AI"
  | "AUTOMATION"
  | "SEARCH"
  | "DATA"
  | "3D"
  | "CONTENT"
  | "SYSTEMS"
  | "RESEARCH"
  | "SYSTEM_ARCHITECTURE";

export interface CaseStudyTheme {
  background: string;
  foreground: string;
  muted: string;
  quiet?: string;
  accent: string;
  surface: string;
  surfaceSubtle?: string;
  mediaBorder?: string;
  signalColour?: string;
  headerMode: "NORMAL" | "PROJECT_LIGHT" | "PROJECT_DARK" | "IMMERSIVE";
}

export interface CaseStudyMediaItem {
  id: string;
  type: "IMAGE" | "VIDEO" | "UI_CAPTURE" | "MOBILE_CAPTURE" | "3D" | "DIAGRAM" | "MAP" | "BEFORE_AFTER";
  src: string;
  mobileSrc?: string;
  poster?: string;
  alt: string;
  caption?: string;
  aspectRatio: string;
  width?: number;
  height?: number;
  status: MediaStatus;
  priority?: boolean;
}

export interface CaseStudyEvidenceItem {
  id: string;
  type: "DELIVERABLE" | "DEPLOYMENT" | "TECHNICAL" | "PERFORMANCE" | "BUSINESS_OUTCOME" | "QUOTE" | "PUBLIC_RELEASE";
  value: string;
  unit?: string;
  description: string;
  source: string;
  period?: string;
  methodology?: string;
  verified: boolean;
}

export interface CaseStudyChapter {
  id: string;
  type: ChapterType;
  title?: string;
  eyebrow?: string;
  body?: string;
  secondaryBody?: string;
  media?: CaseStudyMediaItem[];
  evidence?: CaseStudyEvidenceItem[];
  quote?: {
    text: string;
    author: string;
    role: string;
    company?: string;
  };
  customComponentKey?: string;
  layout?: "FULL_WIDTH" | "SPLIT" | "NARROW" | "ASYMMETRIC";
  caption?: string;
  beforeAfter?: {
    beforeLabel: string;
    beforeMedia: CaseStudyMediaItem;
    afterLabel: string;
    afterMedia: CaseStudyMediaItem;
    summary?: string;
  };
}

export interface NextProjectConfig {
  slug: string;
  title: string;
  projectIndex?: string;
  descriptor: string;
  heroMedia: string;
  themeAccent?: string;
  isEndOfSeries?: boolean;
}

export interface CaseStudyConfig {
  projectSlug: string;
  canonicalTitle: string;
  projectIndex?: string;
  publicationStatus: PublicationStatus;
  publishedAt?: string;
  updatedAt?: string;
  heroMode: HeroMode;
  heroMedia: CaseStudyMediaItem;
  theme: CaseStudyTheme;
  relationship: ProjectRelationship;
  status: ProjectStatus;
  roles: CaseStudyRole[];
  scopeSummary: string;
  capabilities: string[];
  year: number | string;
  externalUrl?: string;
  introNarrative: string[];
  chapters: CaseStudyChapter[];
  evidenceIds?: string[];
  relatedCapabilities?: string[];
  relatedIntelligence?: string[];
  nextProject?: NextProjectConfig;
  seo: {
    metaTitle: string;
    metaDescription: string;
    ogImage?: string;
  };
}

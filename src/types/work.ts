export type WorkProjectTier = "FEATURED" | "SELECTED" | "ARCHIVE";

export type FeaturedLayoutType =
  | "FULL_BLEED"
  | "SPLIT"
  | "PORTRAIT"
  | "WIDE_EDITORIAL"
  | "DATA_DENSE"
  | "TRANSFORMATION";

export type ProjectRelationship = "CLIENT" | "VENTURE" | "INTERNAL" | "PARTNERSHIP" | "UNKNOWN";

export type ProjectStatus = "LIVE" | "DELIVERED" | "DEPLOYED" | "IN DEVELOPMENT" | "ARCHIVED" | "CONCEPT";

export type MediaStatus = "FINAL" | "TEMPORARY" | "MISSING" | "ARCHIVE_QUALITY" | "DEV_ONLY" | "STALE";

export interface WorkProject {
  projectIndex?: string; // e.g. "001 / ALKOTA" (Canonical featured only)
  slug: string;
  title: string;
  shortTitle: string;
  sector: string;
  descriptor: string;
  tier: WorkProjectTier;
  layoutVariant?: FeaturedLayoutType;
  relationship: ProjectRelationship;
  status: ProjectStatus;
  caseStudyAvailable: boolean;
  externalUrl?: string;
  capabilities: string[];
  role?: string;
  year?: number | string;
  heroMedia: string;
  mobileMedia?: string;
  previewVideo?: string;
  aspectRatio: string;
  mediaStatus: MediaStatus;
  palette?: {
    accent?: string;
    surface?: string;
  };
  shortSummary: string;
  colStart?: number;
  colSpan?: number;
}

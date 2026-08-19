export interface ProjectIdentity {
  projectIndex: string; // e.g. "001 / ALKOTA"
  canonicalName: string;
  slug: string;
  category: string;
  descriptor: string;
  galleryOrder: number;
  workWallOrder: number;
  featuredPriority: number;
  relationship: "CLIENT" | "VENTURE" | "PARTNERSHIP";
  status: "LIVE" | "DELIVERED" | "DEPLOYED" | "IN DEVELOPMENT";
  caseStudyAvailable: boolean;
}

export const CANONICAL_PROJECTS: ProjectIdentity[] = [
  {
    projectIndex: "001 / ALKOTA",
    canonicalName: "Alkota Bikes",
    slug: "alkota-bikes",
    category: "FLAGSHIP PRODUCT EXPERIENCE",
    descriptor: "PERFORMANCE PRODUCT / DIGITAL EXPERIENCE",
    galleryOrder: 1,
    workWallOrder: 1,
    featuredPriority: 1,
    relationship: "CLIENT",
    status: "IN DEVELOPMENT",
    caseStudyAvailable: true
  },
  {
    projectIndex: "002 / CAREEROS",
    canonicalName: "CareerOS",
    slug: "careeros",
    category: "AI PRODUCT ARCHITECTURE",
    descriptor: "HUMAN INTELLIGENCE / AI PLATFORM",
    galleryOrder: 2,
    workWallOrder: 2,
    featuredPriority: 2,
    relationship: "VENTURE",
    status: "LIVE",
    caseStudyAvailable: true
  },
  {
    projectIndex: "003 / NESTIQ",
    canonicalName: "NestIQ",
    slug: "nestiq",
    category: "SPATIAL DATA & PROPERTY INTELLIGENCE",
    descriptor: "SPATIAL DATA & PROPERTY INTELLIGENCE",
    galleryOrder: 3,
    workWallOrder: 3,
    featuredPriority: 3,
    relationship: "VENTURE",
    status: "LIVE",
    caseStudyAvailable: true
  },
  {
    projectIndex: "004 / DRAWDOWN.TRADING",
    canonicalName: "Drawdown.Trading",
    slug: "drawdown-trading",
    category: "HIGH-DENSITY FINANCIAL SOFTWARE",
    descriptor: "HIGH-DENSITY FINANCIAL SOFTWARE",
    galleryOrder: 4,
    workWallOrder: 4,
    featuredPriority: 4,
    relationship: "VENTURE",
    status: "LIVE",
    caseStudyAvailable: true
  },
  {
    projectIndex: "005 / ENTIREFM",
    canonicalName: "EntireFM",
    slug: "entirefm",
    category: "OPERATIONAL CAFM SYSTEM",
    descriptor: "OPERATIONAL CAFM SYSTEM",
    galleryOrder: 5,
    workWallOrder: 5,
    featuredPriority: 5,
    relationship: "CLIENT",
    status: "DEPLOYED",
    caseStudyAvailable: true
  },
  {
    projectIndex: "006 / ONE GREAT NORTHERN",
    canonicalName: "One Great Northern",
    slug: "one-great-northern",
    category: "INDUSTRIAL INFRASTRUCTURE",
    descriptor: "MOBILE CRANE HIRE & CONTRACT LIFTING",
    galleryOrder: 6,
    workWallOrder: 6,
    featuredPriority: 6,
    relationship: "CLIENT",
    status: "DELIVERED",
    caseStudyAvailable: false
  }
];

export function getProjectIdentity(slug: string): ProjectIdentity | undefined {
  return CANONICAL_PROJECTS.find((p) => p.slug === slug);
}

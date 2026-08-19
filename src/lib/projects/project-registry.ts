export interface ProjectIdentity {
  projectIndex: string; // e.g. "001 / ALKOTA"
  canonicalName: string;
  slug: string;
  category: string;
  galleryOrder: number;
  workWallOrder: number;
  featuredPriority: number;
  relationship: "CLIENT" | "VENTURE" | "PARTNERSHIP";
  status: "LIVE" | "DELIVERED" | "DEPLOYED" | "IN ACTIVE DEVELOPMENT";
}

export const CANONICAL_PROJECTS: ProjectIdentity[] = [
  {
    projectIndex: "001 / ALKOTA",
    canonicalName: "Alkota Bikes",
    slug: "alkota-bikes",
    category: "FLAGSHIP PRODUCT EXPERIENCE",
    galleryOrder: 5,
    workWallOrder: 1,
    featuredPriority: 1,
    relationship: "CLIENT",
    status: "DELIVERED"
  },
  {
    projectIndex: "002 / CAREEROS",
    canonicalName: "CareerOS",
    slug: "careeros",
    category: "AI PRODUCT ARCHITECTURE",
    galleryOrder: 1,
    workWallOrder: 2,
    featuredPriority: 2,
    relationship: "VENTURE",
    status: "LIVE"
  },
  {
    projectIndex: "003 / NESTIQ",
    canonicalName: "NestIQ",
    slug: "nestiq",
    category: "SPATIAL DATA & PROPERTY INTELLIGENCE",
    galleryOrder: 2,
    workWallOrder: 3,
    featuredPriority: 3,
    relationship: "VENTURE",
    status: "LIVE"
  },
  {
    projectIndex: "004 / DRAWDOWN.TRADING",
    canonicalName: "Drawdown.Trading",
    slug: "drawdown",
    category: "HIGH-DENSITY FINANCIAL SOFTWARE",
    galleryOrder: 3,
    workWallOrder: 4,
    featuredPriority: 4,
    relationship: "VENTURE",
    status: "LIVE"
  },
  {
    projectIndex: "005 / ENTIREFM",
    canonicalName: "EntireFM",
    slug: "entirefm",
    category: "OPERATIONAL CAFM SYSTEM",
    galleryOrder: 4,
    workWallOrder: 5,
    featuredPriority: 5,
    relationship: "CLIENT",
    status: "DEPLOYED"
  },
  {
    projectIndex: "006 / ONE GREAT NORTHERN",
    canonicalName: "One Great Northern",
    slug: "one-great-northern",
    category: "DIGITAL TRANSFORMATION & LEASING",
    galleryOrder: 6,
    workWallOrder: 10,
    featuredPriority: 6,
    relationship: "CLIENT",
    status: "DELIVERED"
  }
];

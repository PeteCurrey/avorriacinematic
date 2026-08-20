import { WorkWallProject } from "@/types/work-wall";

export const CLIENT_WORK_PROJECTS: WorkWallProject[] = [
  {
    id: "alkota",
    slug: "alkota-bikes",
    number: "001",
    title: "Alkota Bikes",
    sector: "PERFORMANCE CYCLING",
    capability: "PRODUCT / BRAND / DIGITAL",
    imagePath: "/media/projects/alkota/product/naked-carbon-hero.jpg",
    caseStudyAvailable: true,
    objectFit: "cover",
    objectPosition: "center center"
  },
  {
    id: "entirefm",
    slug: "entirefm",
    number: "005",
    title: "EntireFM",
    sector: "FACILITIES OPERATIONS",
    capability: "OPERATIONS / SYSTEMS",
    imagePath: "/media/projects/entirefm/interface/homepage-desktop.png",
    caseStudyAvailable: true,
    objectFit: "cover",
    objectPosition: "center top",
    mediaBackground: "#080808"
  },
  {
    id: "aesuk",
    slug: "aesuk",
    number: "SELECTED",
    title: "AESUK",
    sector: "INDUSTRIAL ENGINEERING",
    capability: "WEB / TECHNICAL SYSTEMS",
    imagePath: "/media/projects/aesuk/aesuk-hero.svg",
    caseStudyAvailable: true,
    objectFit: "cover",
    objectPosition: "center center"
  },
  {
    id: "steward",
    slug: "steward-farming",
    number: "SELECTED",
    title: "Steward Farming",
    sector: "AGTECH & AGRONOMY",
    capability: "LAND MANAGEMENT / UX",
    imagePath: "/media/projects/steward/steward-hero.svg",
    caseStudyAvailable: true,
    objectFit: "cover",
    objectPosition: "center center"
  },
  {
    id: "travis",
    slug: "travis-gps",
    number: "SELECTED",
    title: "Travis GPS",
    sector: "HARDWARE & TELEMETRY",
    capability: "DEVICE INTERFACE / IOT",
    imagePath: "/media/projects/travis/travis-hero.svg",
    caseStudyAvailable: true,
    objectFit: "contain",
    objectPosition: "center center",
    mediaBackground: "#0b101b"
  },
  {
    id: "ogn",
    slug: "one-great-northern",
    number: "006",
    title: "One Great Northern",
    sector: "INDUSTRIAL INFRASTRUCTURE",
    capability: "CRANE HIRE & OPERATIONS",
    imagePath: "/media/projects/ogn/ogn-industrial.svg",
    caseStudyAvailable: false,
    objectFit: "cover",
    objectPosition: "center center"
  }
];

export const VENTURE_PROJECTS: WorkWallProject[] = [
  {
    id: "careeros",
    slug: "careeros",
    number: "002",
    title: "CareerOS",
    sector: "HUMAN INTELLIGENCE",
    capability: "AI / PRODUCT / UX",
    imagePath: "/media/projects/careeros/interface/homepage-desktop.png",
    caseStudyAvailable: true,
    objectFit: "cover",
    objectPosition: "center top"
  },
  {
    id: "nestiq",
    slug: "nestiq",
    number: "003",
    title: "NestIQ",
    sector: "PROPERTY INTELLIGENCE",
    capability: "SPATIAL DATA / PRODUCT",
    imagePath: "/media/projects/nestiq/interface/homepage-desktop.png",
    caseStudyAvailable: true,
    objectFit: "cover",
    objectPosition: "center top",
    mediaBackground: "#080808"
  },
  {
    id: "amplios",
    slug: "amplios",
    number: "SELECTED",
    title: "Amplios",
    sector: "CAMPERVAN ENGINEERING",
    capability: "SCHEMATICS / BUILD SYSTEMS",
    imagePath: "/media/projects/amplios/interface/homepage-desktop.png",
    caseStudyAvailable: false,
    objectFit: "cover",
    objectPosition: "center top"
  },
  {
    id: "drawdown",
    slug: "drawdown-trading",
    number: "004",
    title: "Drawdown.Trading",
    sector: "FINANCIAL INTELLIGENCE",
    capability: "HIGH-DENSITY DATA / UX",
    imagePath: "/media/projects/drawdown/interface/dashboard.png",
    caseStudyAvailable: true,
    objectFit: "contain",
    objectPosition: "center center",
    mediaBackground: "#18181b"
  }
];

export const WORK_WALL_PROJECTS: WorkWallProject[] = [
  ...CLIENT_WORK_PROJECTS,
  ...VENTURE_PROJECTS
];

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
    aspectRatio: "16/10",
    colStart: 1,
    colSpan: 8,
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
    imagePath: "/media/projects/entirefm/entirefm-operational.svg",
    aspectRatio: "16/10",
    colStart: 9,
    colSpan: 4,
    caseStudyAvailable: true,
    objectFit: "contain",
    objectPosition: "center center",
    mediaBackground: "#080d1a"
  },
  {
    id: "aesuk",
    slug: "aesuk",
    number: "SELECTED",
    title: "AESUK",
    sector: "INDUSTRIAL ENGINEERING",
    capability: "WEB / TECHNICAL SYSTEMS",
    imagePath: "/media/projects/aesuk/aesuk-hero.svg",
    aspectRatio: "4/3",
    colStart: 1,
    colSpan: 5,
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
    aspectRatio: "1/1",
    colStart: 6,
    colSpan: 3,
    caseStudyAvailable: true,
    objectFit: "contain",
    objectPosition: "center center",
    mediaBackground: "#0b101b"
  },
  {
    id: "steward",
    slug: "steward-farming",
    number: "SELECTED",
    title: "Steward Farming",
    sector: "AGTECH & AGRONOMY",
    capability: "LAND MANAGEMENT / UX",
    imagePath: "/media/projects/steward/steward-hero.svg",
    aspectRatio: "16/10",
    colStart: 9,
    colSpan: 4,
    caseStudyAvailable: true,
    objectFit: "cover",
    objectPosition: "center center"
  },
  {
    id: "amplios",
    slug: "amplios",
    number: "SELECTED",
    title: "Amplios",
    sector: "DIGITAL PRODUCT",
    capability: "BRAND / DEVELOPMENT",
    imagePath: "/media/projects/amplios/amplios-hero.svg",
    aspectRatio: "4/3",
    colStart: 1,
    colSpan: 6,
    caseStudyAvailable: true,
    objectFit: "cover",
    objectPosition: "center center"
  },
  {
    id: "ogn",
    slug: "one-great-northern",
    number: "006",
    title: "One Great Northern",
    sector: "INDUSTRIAL INFRASTRUCTURE",
    capability: "CRANE HIRE & OPERATIONS",
    imagePath: "/media/projects/ogn/ogn-industrial.svg",
    aspectRatio: "16/9",
    colStart: 7,
    colSpan: 6,
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
    imagePath: "/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg",
    aspectRatio: "3/4",
    colStart: 1,
    colSpan: 4,
    caseStudyAvailable: true,
    objectFit: "cover",
    objectPosition: "50% 30%"
  },
  {
    id: "nestiq",
    slug: "nestiq",
    number: "003",
    title: "NestIQ",
    sector: "PROPERTY INTELLIGENCE",
    capability: "SPATIAL DATA / PRODUCT",
    imagePath: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
    aspectRatio: "4/3",
    colStart: 5,
    colSpan: 4,
    caseStudyAvailable: true,
    objectFit: "contain",
    objectPosition: "center center",
    mediaBackground: "#0a0e17"
  },
  {
    id: "drawdown",
    slug: "drawdown-trading",
    number: "004",
    title: "Drawdown.Trading",
    sector: "FINANCIAL INTELLIGENCE",
    capability: "HIGH-DENSITY DATA / UX",
    imagePath: "/media/projects/drawdown/interface/dashboard.png",
    aspectRatio: "16/10",
    colStart: 9,
    colSpan: 4,
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

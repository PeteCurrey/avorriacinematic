import type { WorkProject } from "@/types/work";

/**
 * AVORRIA CANONICAL WORK REGISTRY
 * Unified portfolio dataset for /work and case-study architecture.
 * Factual metadata only — no fabricated statistics or unearned awards.
 */

export const WORK_PORTFOLIO: WorkProject[] = [
  // ==========================================
  // FEATURED FLAGSHIPS (001 – 006)
  // ==========================================
  {
    projectIndex: "001 / ALKOTA",
    slug: "alkota-bikes",
    title: "Alkota Bikes",
    shortTitle: "Alkota",
    sector: "PRECISION ENGINEERING / CYCLING",
    descriptor: "PERFORMANCE PRODUCT / DIGITAL EXPERIENCE",
    tier: "FEATURED",
    layoutVariant: "WIDE_EDITORIAL",
    relationship: "CLIENT",
    status: "IN DEVELOPMENT",
    caseStudyAvailable: true,
    capabilities: ["PRODUCT", "BRAND", "DIGITAL ENGINEERING"],
    role: "Digital flagship platform, frame architecture visualizer, and brand identity",
    year: 2025,
    heroMedia: "/media/projects/alkota/product/naked-carbon-hero.jpg",
    mobileMedia: "/media/projects/alkota/product/naked-carbon-hero.jpg",
    aspectRatio: "16/10",
    mediaStatus: "FINAL",
    palette: {
      accent: "#4D9FFF",
      surface: "#111111"
    },
    shortSummary: "High-performance digital flagship and custom frame architecture for bespoke carbon bicycles."
  },
  {
    projectIndex: "002 / CAREEROS",
    slug: "careeros",
    title: "CareerOS",
    shortTitle: "CareerOS",
    sector: "ARTIFICIAL INTELLIGENCE / ENTERPRISE",
    descriptor: "HUMAN INTELLIGENCE / AI PLATFORM",
    tier: "FEATURED",
    layoutVariant: "PORTRAIT",
    relationship: "VENTURE",
    status: "LIVE",
    caseStudyAvailable: true,
    capabilities: ["AI SYSTEMS", "PRODUCT DESIGN", "UX ARCHITECTURE"],
    role: "Autonomous talent acceleration platform and intelligent Career Twin workflow",
    year: 2025,
    heroMedia: "/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg",
    mobileMedia: "/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg",
    aspectRatio: "3/4",
    mediaStatus: "FINAL",
    palette: {
      accent: "#38BDF8",
      surface: "#0D1117"
    },
    shortSummary: "Intelligent career orchestration infrastructure and AI-driven talent development workflows."
  },
  {
    projectIndex: "003 / NESTIQ",
    slug: "nestiq",
    title: "NestIQ",
    shortTitle: "NestIQ",
    sector: "REAL ESTATE INTELLIGENCE / DATA",
    descriptor: "SPATIAL DATA & PROPERTY INTELLIGENCE",
    tier: "FEATURED",
    layoutVariant: "SPLIT",
    relationship: "VENTURE",
    status: "LIVE",
    caseStudyAvailable: true,
    capabilities: ["SPATIAL DATA", "SEARCH ARCHITECTURE", "PRODUCT"],
    role: "Institutional real estate search intelligence and automated valuation modeling",
    year: 2024,
    heroMedia: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
    mobileMedia: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
    aspectRatio: "4/3",
    mediaStatus: "FINAL",
    palette: {
      accent: "#34D399",
      surface: "#0F172A"
    },
    shortSummary: "Institutional real estate search intelligence, spatial data layers, and valuation models."
  },
  {
    projectIndex: "004 / DRAWDOWN.TRADING",
    slug: "drawdown-trading",
    title: "Drawdown.Trading",
    shortTitle: "Drawdown",
    sector: "QUANTITATIVE FINANCE / TRADING",
    descriptor: "HIGH-DENSITY FINANCIAL SOFTWARE",
    tier: "FEATURED",
    layoutVariant: "DATA_DENSE",
    relationship: "VENTURE",
    status: "LIVE",
    caseStudyAvailable: true,
    capabilities: ["DATA VISUALISATION", "SYSTEMS ARCHITECTURE", "UX"],
    role: "Low-latency trading analytics interface and disciplined risk control systems",
    year: 2024,
    heroMedia: "/media/projects/drawdown/interface/dashboard.png",
    mobileMedia: "/media/projects/drawdown/interface/dashboard.png",
    aspectRatio: "16/10",
    mediaStatus: "FINAL",
    palette: {
      accent: "#F59E0B",
      surface: "#18181B"
    },
    shortSummary: "High-frequency analytics dashboard, risk mitigation architecture, and quantitative execution UI."
  },
  {
    projectIndex: "005 / ENTIREFM",
    slug: "entirefm",
    title: "EntireFM",
    shortTitle: "EntireFM",
    sector: "FACILITIES MANAGEMENT / LOGISTICS",
    descriptor: "OPERATIONAL CAFM SYSTEM",
    tier: "FEATURED",
    layoutVariant: "DATA_DENSE",
    relationship: "CLIENT",
    status: "DEPLOYED",
    caseStudyAvailable: true,
    capabilities: ["SYSTEMS", "DISPATCH AUTOMATION", "SEARCH ARCHITECTURE"],
    role: "Commercial facilities management digital operations platform and technician dispatch",
    year: 2024,
    heroMedia: "/media/projects/entirefm/entirefm-operational.svg",
    mobileMedia: "/media/projects/entirefm/entirefm-operational.svg",
    aspectRatio: "16/10",
    mediaStatus: "FINAL",
    palette: {
      accent: "#60A5FA",
      surface: "#0B132B"
    },
    shortSummary: "Nationwide facilities management operations platform, dispatch automation, and organic search architecture."
  },
  {
    projectIndex: "006 / ONE GREAT NORTHERN",
    slug: "one-great-northern",
    title: "One Great Northern",
    shortTitle: "One Great Northern",
    sector: "INDUSTRIAL INFRASTRUCTURE",
    descriptor: "MOBILE CRANE HIRE & CONTRACT LIFTING",
    tier: "FEATURED",
    layoutVariant: "TRANSFORMATION",
    relationship: "CLIENT",
    status: "DELIVERED",
    caseStudyAvailable: false,
    capabilities: ["DIGITAL PLATFORM", "BRAND ARCHITECTURE"],
    role: "Industrial operations digital infrastructure and equipment fleet catalog",
    year: 2024,
    heroMedia: "/media/projects/ogn/ogn-industrial.svg",
    mobileMedia: "/media/projects/ogn/ogn-industrial.svg",
    aspectRatio: "16/9",
    mediaStatus: "FINAL",
    palette: {
      accent: "#E2E8F0",
      surface: "#1E293B"
    },
    shortSummary: "Mobile crane hire, contract lifting, and industrial plant logistics infrastructure."
  },

  // ==========================================
  // SELECTED WORK (SECONDARY CURATED SET)
  // ==========================================
  {
    projectIndex: "SELECTED // AESUK",
    slug: "aesuk",
    title: "AESUK",
    shortTitle: "AESUK",
    sector: "RENEWABLE ENERGY / INFRASTRUCTURE",
    descriptor: "INDUSTRIAL ENGINEERING & ENERGY SYSTEMS",
    tier: "SELECTED",
    relationship: "CLIENT",
    status: "LIVE",
    caseStudyAvailable: true,
    externalUrl: "https://aesuk.co",
    capabilities: ["BUILD", "TECHNICAL VISIBILITY"],
    role: "Digital platform engineering, industrial energy sizing engine, and technical SEO architecture",
    year: 2024,
    heroMedia: "/media/projects/aesuk/aesuk-hero.svg",
    aspectRatio: "4/3",
    colStart: 1,
    colSpan: 7,
    mediaStatus: "FINAL",
    palette: {
      accent: "#10B981",
      surface: "#0C0E14"
    },
    shortSummary: "Renewable energy engineering systems and commercial installation platform for solar and storage."
  },
  {
    projectIndex: "SELECTED // TRAVIS GPS",
    slug: "travis-gps",
    title: "Travis GPS",
    shortTitle: "Travis GPS",
    sector: "TELEMATICS / HARDWARE",
    descriptor: "FLEET TELEMETRY & ASSET TRACKING",
    tier: "SELECTED",
    relationship: "CLIENT",
    status: "LIVE",
    caseStudyAvailable: true,
    capabilities: ["SYSTEMS", "IOT INTERFACE"],
    role: "Real-time telematics dashboard, geofence event engine, and IoT hardware data ingestion",
    year: 2023,
    heroMedia: "/media/projects/travis/travis-hero.svg",
    aspectRatio: "1/1",
    colStart: 8,
    colSpan: 5,
    mediaStatus: "FINAL",
    palette: {
      accent: "#38BDF8",
      surface: "#0B101B"
    },
    shortSummary: "Real-time fleet tracking hardware integration with responsive management console."
  },
  {
    projectIndex: "SELECTED // STEWARD",
    slug: "steward-farming",
    title: "Steward Farming",
    shortTitle: "Steward",
    sector: "AGRI-TECH / ECOLOGICAL",
    descriptor: "SOIL CARBON ACCOUNTING & LAND MANAGEMENT",
    tier: "SELECTED",
    relationship: "CLIENT",
    status: "LIVE",
    caseStudyAvailable: true,
    capabilities: ["BUILD", "DATA SYSTEMS"],
    role: "Spatial parcel heatmap UI, soil carbon measurement engine, and farmer mobile data capture",
    year: 2023,
    heroMedia: "/media/projects/steward/steward-hero.svg",
    aspectRatio: "16/10",
    colStart: 1,
    colSpan: 5,
    mediaStatus: "FINAL",
    palette: {
      accent: "#84CC16",
      surface: "#0D1309"
    },
    shortSummary: "Ecological data visualisations and farmer portal for measuring soil carbon capture."
  },
  {
    projectIndex: "SELECTED // AMPLIOS",
    slug: "amplios",
    title: "Amplios",
    shortTitle: "Amplios",
    sector: "HEALTHCARE / LIFE SCIENCES",
    descriptor: "CLINICAL TRIAL OPERATIONS & COMMUNICATIONS",
    tier: "SELECTED",
    relationship: "CLIENT",
    status: "LIVE",
    caseStudyAvailable: true,
    capabilities: ["BUILD", "SEARCH ARCHITECTURE"],
    role: "Clinical trial portal, patient pre-screener eligibility engine, and regulatory search taxonomy",
    year: 2023,
    heroMedia: "/media/projects/amplios/amplios-hero.svg",
    aspectRatio: "4/3",
    colStart: 6,
    colSpan: 7,
    mediaStatus: "FINAL",
    palette: {
      accent: "#2DD4BF",
      surface: "#0A1214"
    },
    shortSummary: "Secure digital infrastructure for clinical operations, patient recruitment, and trial management."
  },

  // ==========================================
  // ARCHIVE / DOCUMENTED WORK
  // ==========================================
  {
    slug: "forecourt",
    title: "Forecourt",
    shortTitle: "Forecourt",
    sector: "AUTOMOTIVE / RETAIL",
    descriptor: "AUTOMOTIVE INVENTORY ECOSYSTEM",
    tier: "ARCHIVE",
    relationship: "CLIENT",
    status: "LIVE",
    caseStudyAvailable: false,
    capabilities: ["BUILD", "SYSTEMS"],
    year: 2023,
    heroMedia: "/media/projects/forecourt/forecourt-hero.svg",
    aspectRatio: "16/10",
    mediaStatus: "ARCHIVE_QUALITY",
    shortSummary: "High-conversion vehicle inventory platform, automated finance calculators, and dealer CRM."
  },
  {
    slug: "avorria-hospitality",
    title: "Avorria Hospitality",
    shortTitle: "Hospitality",
    sector: "LUXURY HOSPITALITY / BOOKING",
    descriptor: "BESPOKE RESERVATION ENGINE",
    tier: "ARCHIVE",
    relationship: "INTERNAL",
    status: "DELIVERED",
    caseStudyAvailable: false,
    capabilities: ["BUILD", "COMMERCE"],
    year: 2023,
    heroMedia: "/media/projects/hospitality/hospitality-hero.svg",
    aspectRatio: "16/10",
    mediaStatus: "ARCHIVE_QUALITY",
    shortSummary: "Direct booking architecture with room-tier visual storytelling and frictionless checkout flows."
  },
  {
    slug: "avorria-cycles",
    title: "Avorria Cycles",
    shortTitle: "Cycles",
    sector: "MOBILITY / COMMERCE",
    descriptor: "CUSTOM BICYCLE BUILDER & COMMERCE",
    tier: "ARCHIVE",
    relationship: "INTERNAL",
    status: "DELIVERED",
    caseStudyAvailable: false,
    capabilities: ["BUILD", "SYSTEMS"],
    year: 2023,
    heroMedia: "/media/projects/cycles/cycles-hero.svg",
    aspectRatio: "16/10",
    mediaStatus: "ARCHIVE_QUALITY",
    shortSummary: "E-commerce architecture with component-level 3D configurator and automated inventory fulfillment."
  },
  {
    slug: "jpc-trailers",
    title: "JPC Trailers",
    shortTitle: "JPC Trailers",
    sector: "COMMERCIAL VEHICLES / HEAVY EQUIPMENT",
    descriptor: "TECHNICAL CATALOG & DEALER NETWORK",
    tier: "ARCHIVE",
    relationship: "CLIENT",
    status: "LIVE",
    caseStudyAvailable: false,
    capabilities: ["BUILD", "SEARCH ARCHITECTURE"],
    year: 2023,
    heroMedia: "/media/projects/jpc/jpc-hero.svg",
    aspectRatio: "16/10",
    mediaStatus: "ARCHIVE_QUALITY",
    shortSummary: "Technical catalog, load specification calculators, and nationwide dealer enquiry infrastructure."
  },
  {
    slug: "deep-anchor",
    title: "Deep Anchor",
    shortTitle: "Deep Anchor",
    sector: "MARINE ENGINEERING / OFFSHORE",
    descriptor: "OFFSHORE MOORING ANALYTICS & CERTIFICATION",
    tier: "ARCHIVE",
    relationship: "CLIENT",
    status: "DELIVERED",
    caseStudyAvailable: false,
    capabilities: ["BUILD", "SYSTEMS"],
    year: 2022,
    heroMedia: "/media/projects/anchor/anchor-hero.svg",
    aspectRatio: "16/10",
    mediaStatus: "ARCHIVE_QUALITY",
    shortSummary: "High-integrity engineering documentation, load analysis data sheets, and offshore certification tracking."
  }
];

export const FEATURED_WORK = WORK_PORTFOLIO.filter((p) => p.tier === "FEATURED");
export const SELECTED_WORK = WORK_PORTFOLIO.filter((p) => p.tier === "SELECTED");
export const ARCHIVE_WORK = WORK_PORTFOLIO.filter((p) => p.tier === "ARCHIVE");

export function getWorkProjectBySlug(slug: string): WorkProject | undefined {
  return WORK_PORTFOLIO.find((p) => p.slug === slug);
}

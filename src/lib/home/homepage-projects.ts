export interface ShowcaseMediaFitConfig {
  fit: "cover" | "contain";
  desktopObjectPosition: string;
  mobileObjectPosition: string;
  background: string;
}

export interface HomepageProjectFeatureDef {
  projectIndex: string;
  slug: string;
  relationship: "CLIENT WORK" | "AVORRIA VENTURE" | "SELECTED WORK";
  headline: string;
  capabilitiesLine: string;
  desktopMedia: string;
  mobileMedia: string;
  caseStudyAvailable: boolean;
  fitConfig: ShowcaseMediaFitConfig;
}

export const HOMEPAGE_FEATURED_PROJECTS: HomepageProjectFeatureDef[] = [
  {
    projectIndex: "001 / ALKOTA",
    slug: "alkota-bikes",
    relationship: "CLIENT WORK",
    headline: "Digital flagship for a high-performance bicycle brand.",
    capabilitiesLine: "WEB DESIGN / UX ARCHITECTURE / BESPOKE COMMERCE",
    desktopMedia: "/media/projects/alkota/interface/homepage-desktop.png",
    mobileMedia: "/media/projects/alkota/interface/homepage-mobile.png",
    caseStudyAvailable: true,
    fitConfig: {
      fit: "cover",
      desktopObjectPosition: "center top",
      mobileObjectPosition: "center top",
      background: "#080808"
    }
  },
  {
    projectIndex: "002 / FORECOURIQ",
    slug: "forecour-iq",
    relationship: "SELECTED WORK",
    headline: "Automated appraisal and valuation intelligence for UK dealerships.",
    capabilitiesLine: "AUTOMOTIVE VALUATION / APPRAISAL ENGINE / DEALER PLATFORM",
    desktopMedia: "/media/projects/forecour-iq/interface/homepage-desktop.png",
    mobileMedia: "/media/projects/forecour-iq/interface/homepage-mobile.png",
    caseStudyAvailable: false,
    fitConfig: {
      fit: "cover",
      desktopObjectPosition: "center top",
      mobileObjectPosition: "center top",
      background: "#080808"
    }
  },
  {
    projectIndex: "003 / AMPLIOS",
    slug: "amplios",
    relationship: "AVORRIA VENTURE",
    headline: "The UK's definitive engineering platform for serious self-build conversions.",
    capabilitiesLine: "VEHICLE SCHEMATICS / BUILD SYSTEMS / TECHNICAL GEAR COMMERCE",
    desktopMedia: "/media/projects/amplios/interface/homepage-desktop.png",
    mobileMedia: "/media/projects/amplios/interface/homepage-mobile.png",
    caseStudyAvailable: false,
    fitConfig: {
      fit: "cover",
      desktopObjectPosition: "center top",
      mobileObjectPosition: "center top",
      background: "#080808"
    }
  },
  {
    projectIndex: "004 / CAREEROS",
    slug: "careeros",
    relationship: "AVORRIA VENTURE",
    headline: "Human-centred career intelligence.",
    capabilitiesLine: "AI SYSTEMS / PRODUCT DESIGN / UX ARCHITECTURE",
    desktopMedia: "/media/projects/careeros/interface/homepage-desktop.png",
    mobileMedia: "/media/projects/careeros/interface/homepage-mobile.png",
    caseStudyAvailable: true,
    fitConfig: {
      fit: "cover",
      desktopObjectPosition: "center top",
      mobileObjectPosition: "center top",
      background: "#080808"
    }
  },
  {
    projectIndex: "005 / NESTIQ",
    slug: "nestiq",
    relationship: "AVORRIA VENTURE",
    headline: "Property intelligence built around better decisions.",
    capabilitiesLine: "SPATIAL DATA / SEARCH ARCHITECTURE / PRODUCT",
    desktopMedia: "/media/projects/nestiq/interface/homepage-desktop.png",
    mobileMedia: "/media/projects/nestiq/interface/homepage-mobile.png",
    caseStudyAvailable: true,
    fitConfig: {
      fit: "cover",
      desktopObjectPosition: "center top",
      mobileObjectPosition: "center top",
      background: "#080808"
    }
  },
  {
    projectIndex: "006 / ENTIREFM",
    slug: "entirefm",
    relationship: "CLIENT WORK",
    headline: "Digital operations for facilities that never stop.",
    capabilitiesLine: "OPERATIONAL SYSTEMS / DISPATCH AUTOMATION / TECHNICAL SEO",
    desktopMedia: "/media/projects/entirefm/interface/homepage-desktop.png",
    mobileMedia: "/media/projects/entirefm/interface/homepage-mobile.png",
    caseStudyAvailable: true,
    fitConfig: {
      fit: "cover",
      desktopObjectPosition: "center top",
      mobileObjectPosition: "center top",
      background: "#080808"
    }
  }
];

export interface ShowcaseMediaFitConfig {
  fit: "cover" | "contain";
  desktopObjectPosition: string;
  mobileObjectPosition: string;
  background: string;
}

export interface HomepageProjectFeatureDef {
  projectIndex: string;
  slug: string;
  relationship: "CLIENT WORK" | "AVORRIA VENTURE";
  headline: string;
  capabilitiesLine: string;
  desktopMedia: string;
  mobileMedia: string;
  secondaryMedia?: string;
  secondaryFitConfig?: ShowcaseMediaFitConfig;
  caseStudyAvailable: boolean;
  fitConfig: ShowcaseMediaFitConfig;
  isComposition?: boolean; // For custom layout inside the canonical aperture (e.g. CareerOS split)
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
    secondaryMedia: "/media/projects/alkota/product/naked-carbon-hero.jpg",
    caseStudyAvailable: true,
    fitConfig: {
      fit: "cover",
      desktopObjectPosition: "center top",
      mobileObjectPosition: "center top",
      background: "#080808"
    },
    secondaryFitConfig: {
      fit: "cover",
      desktopObjectPosition: "50% 50%",
      mobileObjectPosition: "45% 50%",
      background: "#080808"
    }
  },
  {
    projectIndex: "002 / CAREEROS",
    slug: "careeros",
    relationship: "AVORRIA VENTURE",
    headline: "Human-centred career intelligence.",
    capabilitiesLine: "AI SYSTEMS / PRODUCT DESIGN / UX ARCHITECTURE",
    desktopMedia: "/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg",
    mobileMedia: "/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg",
    caseStudyAvailable: true,
    isComposition: true,
    fitConfig: {
      fit: "cover",
      desktopObjectPosition: "50% 30%",
      mobileObjectPosition: "50% 25%",
      background: "#0a0d14"
    }
  },
  {
    projectIndex: "003 / NESTIQ",
    slug: "nestiq",
    relationship: "AVORRIA VENTURE",
    headline: "Property intelligence built around better decisions.",
    capabilitiesLine: "SPATIAL DATA / SEARCH ARCHITECTURE / PRODUCT",
    desktopMedia: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
    mobileMedia: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
    caseStudyAvailable: true,
    fitConfig: {
      fit: "contain",
      desktopObjectPosition: "50% 50%",
      mobileObjectPosition: "50% 50%",
      background: "#0a0e17"
    }
  },
  {
    projectIndex: "005 / ENTIREFM",
    slug: "entirefm",
    relationship: "CLIENT WORK",
    headline: "Digital operations for facilities that never stop.",
    capabilitiesLine: "OPERATIONAL SYSTEMS / DISPATCH AUTOMATION / TECHNICAL SEO",
    desktopMedia: "/media/projects/entirefm/entirefm-operational.svg",
    mobileMedia: "/media/projects/entirefm/entirefm-operational.svg",
    caseStudyAvailable: true,
    fitConfig: {
      fit: "contain",
      desktopObjectPosition: "50% 50%",
      mobileObjectPosition: "50% 50%",
      background: "#080d1a"
    }
  }
];

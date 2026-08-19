import { ProjectIdentity, getProjectIdentity } from "@/lib/projects/project-registry";

export interface HomepageProjectFeatureDef {
  projectIndex: string;
  slug: string;
  relationship: "CLIENT WORK" | "AVORRIA VENTURE";
  headline: string;
  capabilitiesLine: string;
  desktopMedia: string;
  mobileMedia: string;
  secondaryMedia?: string;
  caseStudyAvailable: boolean;
  aspectMode: "FULL_BLEED" | "LANDSCAPE" | "UI_LANDSCAPE" | "PORTRAIT_SPLIT";
}

export const HOMEPAGE_FEATURED_PROJECTS: HomepageProjectFeatureDef[] = [
  {
    projectIndex: "001 / ALKOTA",
    slug: "alkota-bikes",
    relationship: "CLIENT WORK",
    headline: "Digital flagship for a high-performance carbon bicycle brand.",
    capabilitiesLine: "WEB DESIGN / UX ARCHITECTURE / BESPOKE COMMERCE",
    desktopMedia: "/media/projects/alkota/interface/homepage-desktop.png",
    mobileMedia: "/media/projects/alkota/interface/homepage-mobile.png",
    secondaryMedia: "/media/projects/alkota/product/naked-carbon-hero.jpg",
    caseStudyAvailable: true,
    aspectMode: "FULL_BLEED"
  },
  {
    projectIndex: "002 / CAREEROS",
    slug: "careeros",
    relationship: "AVORRIA VENTURE",
    headline: "Human-centred career intelligence and autonomous talent acceleration.",
    capabilitiesLine: "AI SYSTEMS / PRODUCT DESIGN / UX ARCHITECTURE",
    desktopMedia: "/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg",
    mobileMedia: "/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg",
    secondaryMedia: "/media/projects/careeros/hero/hero_career_world_desktop.jpg",
    caseStudyAvailable: true,
    aspectMode: "PORTRAIT_SPLIT"
  },
  {
    projectIndex: "003 / NESTIQ",
    slug: "nestiq",
    relationship: "AVORRIA VENTURE",
    headline: "Property intelligence built around faster, higher-confidence decisions.",
    capabilitiesLine: "SPATIAL DATA / SEARCH ARCHITECTURE / PRODUCT",
    desktopMedia: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
    mobileMedia: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
    caseStudyAvailable: true,
    aspectMode: "UI_LANDSCAPE"
  },
  {
    projectIndex: "005 / ENTIREFM",
    slug: "entirefm",
    relationship: "CLIENT WORK",
    headline: "Digital operations for a commercial facilities business that never stops.",
    capabilitiesLine: "OPERATIONAL SYSTEMS / DISPATCH AUTOMATION / TECHNICAL SEO",
    desktopMedia: "/media/projects/entirefm/entirefm-operational.svg",
    mobileMedia: "/media/projects/entirefm/entirefm-operational.svg",
    caseStudyAvailable: true,
    aspectMode: "LANDSCAPE"
  }
];

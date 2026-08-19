import { HomeSectionStory } from "@/types/home-story";

export const HOME_SECTIONS: HomeSectionStory[] = [
  {
    id: "01-hero",
    number: "01",
    title: "01 / HERO — PRECISION AS POWER",
    questionAnswered: "Who is Avorria & what do we sell?",
    purpose: "Establishes commercial identity (Digital Marketing / Web / AI Studio) with high contrast and early settled typography.",
    motionEnergy: "HIGH",
    targetHeightDesktop: "170vh",
    targetHeightMobile: "140svh",
    componentsMounted: ["Scene01Precision"],
    primaryMedia: ["Signal Line WebGL / CSS Hybrid"]
  },
  {
    id: "02-selected-work",
    number: "02",
    title: "02 / SELECTED WORK SHOWCASE",
    questionAnswered: "What calibre of work does Avorria build?",
    purpose: "Film-reel showreel presenting 6 authentic homepages (Alkota, ForecourIQ, Amplios, CareerOS, NestIQ, EntireFM) in one uniform canonical 16:9 aperture.",
    motionEnergy: "HIGH",
    targetHeightDesktop: "700vh",
    targetHeightMobile: "640svh",
    componentsMounted: ["HomeSelectedWorkShowcase", "HomepageProjectFeature", "ShowcaseMediaAperture"],
    primaryMedia: [
      "/media/projects/alkota/interface/homepage-desktop.png",
      "/media/projects/forecour-iq/interface/homepage-desktop.png",
      "/media/projects/amplios/interface/homepage-desktop.png",
      "/media/projects/careeros/interface/homepage-desktop.png",
      "/media/projects/nestiq/interface/homepage-desktop.png",
      "/media/projects/entirefm/interface/homepage-desktop.png"
    ]
  },
  {
    id: "03-capabilities",
    number: "03",
    title: "03 / CAPABILITIES SHOWCASE",
    questionAnswered: "What can Avorria do for your business?",
    purpose: "Spatial un-boxed presentation grouping BUILD (Web/Products), SEARCH (Technical SEO), and SYSTEMS (AI Systems).",
    motionEnergy: "MEDIUM-HIGH",
    targetHeightDesktop: "360vh",
    targetHeightMobile: "300svh",
    componentsMounted: ["HomeCapabilitiesShowcase"],
    primaryMedia: ["Vector Typography & Engineering Principles"]
  },
  {
    id: "04-work-index",
    number: "04",
    title: "04 / WORK INDEX & ARCHIVE",
    questionAnswered: "What is the broader range of client work?",
    purpose: "Natural scroll dual-tier portfolio wall split into Selected Client Work and Avorria Ventures with art-directed image framing.",
    motionEnergy: "LOW",
    targetHeightDesktop: "Natural Scroll",
    targetHeightMobile: "Natural Scroll",
    componentsMounted: ["Scene12Work", "WorkWallItem"],
    primaryMedia: ["7 Client Case Studies + 3 Venture Case Studies"]
  },
  {
    id: "05-lab",
    number: "05",
    title: "05 / AVORRIA LAB",
    questionAnswered: "What cutting-edge systems and interfaces are we exploring?",
    purpose: "Natural scroll preview of top 3 active research prototypes (Adaptive UI, Voice Navigation, Vision Structure).",
    motionEnergy: "MEDIUM",
    targetHeightDesktop: "Natural Scroll",
    targetHeightMobile: "Natural Scroll",
    componentsMounted: ["HomeLabTeaser"],
    primaryMedia: ["Interactive Lab Prototype Previews"]
  },
  {
    id: "06-manifesto",
    number: "06",
    title: "06 / MANIFESTO",
    questionAnswered: "What are Avorria's first principles?",
    purpose: "Silent, confident 4-statement grid with 84vh of stationary hold time.",
    motionEnergy: "VERY LOW",
    targetHeightDesktop: "140vh",
    targetHeightMobile: "130svh",
    componentsMounted: ["Scene15Manifesto"],
    primaryMedia: ["High-Contrast Typography"]
  },
  {
    id: "07-intelligence",
    number: "07",
    title: "07 / INTELLIGENCE",
    questionAnswered: "How does Avorria think about digital advantage?",
    purpose: "Natural scroll editorial perspectives, architectural essays, and strategic thinking.",
    motionEnergy: "LOW",
    targetHeightDesktop: "Natural Scroll",
    targetHeightMobile: "Natural Scroll",
    componentsMounted: ["Scene17Intelligence"],
    primaryMedia: ["Editorial Articles & Technical Guides"]
  },
  {
    id: "08-finale",
    number: "08",
    title: "08 / FINALE",
    questionAnswered: "How do we engage and start a project?",
    purpose: "High-impact closing scene with 102vh stationary hold and direct CTA channels.",
    motionEnergy: "HIGH",
    targetHeightDesktop: "170vh",
    targetHeightMobile: "150svh",
    componentsMounted: ["Scene18Finale"],
    primaryMedia: ["Engagement Form / Direct Contact Channels"]
  }
];

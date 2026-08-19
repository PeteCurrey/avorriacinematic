export interface HomeSectionDef {
  id: string;
  order: number;
  title: string;
  questionAnswered: string;
  motionEnergy: "HIGH" | "MEDIUM-HIGH" | "MEDIUM" | "LOW" | "VERY LOW";
  isPinned: boolean;
  targetHeightDesktop: string;
  targetHeightMobile: string;
  purpose: string;
}

export const HOME_SECTIONS: HomeSectionDef[] = [
  {
    id: "hero",
    order: 1,
    title: "01 / HERO — PRECISION AS POWER",
    questionAnswered: "WHO IS AVORRIA & WHAT DO WE DO?",
    motionEnergy: "HIGH",
    isPinned: true,
    targetHeightDesktop: "170vh",
    targetHeightMobile: "140svh",
    purpose: "Definitive studio statement, commercial proposition, and capability line."
  },
  {
    id: "selected-work",
    order: 2,
    title: "02 / SELECTED WORK SHOWCASE",
    questionAnswered: "WHAT CALIBRE OF WORK DOES AVORRIA PRODUCE?",
    motionEnergy: "HIGH",
    isPinned: true,
    targetHeightDesktop: "460vh",
    targetHeightMobile: "410svh",
    purpose: "Film-reel showcase of 4 flagships: Alkota (Client), CareerOS (Venture), NestIQ (Venture), EntireFM (Client)."
  },
  {
    id: "capabilities",
    order: 3,
    title: "03 / CAPABILITIES SHOWCASE",
    questionAnswered: "WHAT CAN AVORRIA DO FOR MY BUSINESS?",
    motionEnergy: "MEDIUM-HIGH",
    isPinned: true,
    targetHeightDesktop: "300vh",
    targetHeightMobile: "270svh",
    purpose: "Consolidated, grouped capabilities: BUILD (Digital Products), SEARCH (Technical SEO), SYSTEMS (AI & Automation)."
  },
  {
    id: "work-index",
    order: 4,
    title: "04 / WORK INDEX & ARCHIVE",
    questionAnswered: "WHAT IS THE BROADER RANGE & PROOF OF CLIENT WORK?",
    motionEnergy: "LOW",
    isPinned: false,
    targetHeightDesktop: "natural",
    targetHeightMobile: "natural",
    purpose: "Natural editorial grid organized strictly into Selected Client Work and Avorria Ventures."
  },
  {
    id: "lab",
    order: 5,
    title: "05 / AVORRIA LAB",
    questionAnswered: "WHAT CUTTING-EDGE SYSTEMS & INTERFACES ARE WE EXPLORING?",
    motionEnergy: "MEDIUM",
    isPinned: false,
    targetHeightDesktop: "natural",
    targetHeightMobile: "natural",
    purpose: "Curated 3-experiment interactive preview into generative UI, voice, and spatial models."
  },
  {
    id: "manifesto",
    order: 6,
    title: "06 / MANIFESTO",
    questionAnswered: "WHAT ARE AVORRIA'S FIRST PRINCIPLES?",
    motionEnergy: "VERY LOW",
    isPinned: true,
    targetHeightDesktop: "140vh",
    targetHeightMobile: "130svh",
    purpose: "Silent, stationary 4-principle grid holding for over 70vh of physical scroll distance."
  },
  {
    id: "intelligence",
    order: 7,
    title: "07 / INTELLIGENCE",
    questionAnswered: "HOW DOES AVORRIA THINK ABOUT TECHNICAL ADVANTAGE?",
    motionEnergy: "LOW",
    isPinned: false,
    targetHeightDesktop: "natural",
    targetHeightMobile: "natural",
    purpose: "Quiet editorial perspectives and architectural essays."
  },
  {
    id: "finale",
    order: 8,
    title: "08 / FINALE — START A PROJECT",
    questionAnswered: "HOW DO WE ENGAGE AND BUILD SOMETHING UNFAIR?",
    motionEnergy: "HIGH",
    isPinned: true,
    targetHeightDesktop: "170vh",
    targetHeightMobile: "150svh",
    purpose: "Direct commercial proposition and long-hold interactive CTA."
  }
];

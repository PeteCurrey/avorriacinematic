export interface CapabilityDefinition {
  id: string;
  index: string;
  chapterNumber: string;
  category: string;
  title: string;
  description: string;
  services: string[];
  footerStatement: string;
  href: string;
  ctaLabel: string;
}

export const CAPABILITY_ITEMS: CapabilityDefinition[] = [
  {
    id: "build",
    index: "01",
    chapterNumber: "01 / CAPABILITY",
    category: "DIGITAL PRODUCTS & ENGINEERING",
    title: "BUILD",
    description: "Digital flagships, custom web applications, and high-conversion commerce infrastructure.",
    services: ["WEB DESIGN", "DEVELOPMENT", "PRODUCT DESIGN", "COMMERCE"],
    footerStatement: "WE DON'T DECORATE. WE ENGINEER ADVANTAGE.",
    href: "/services/websites",
    ctaLabel: "EXPLORE BUILD"
  },
  {
    id: "search",
    index: "02",
    chapterNumber: "02 / CAPABILITY",
    category: "TECHNICAL SEARCH & VISIBILITY",
    title: "SEARCH",
    description: "Visibility is engineered. Technical SEO architecture, entity graphs, and algorithmic discovery systems.",
    services: ["TECHNICAL SEO", "CONTENT ARCHITECTURE", "MIGRATIONS", "DISCOVERY"],
    footerStatement: "SEARCH ADVANTAGE THROUGH ARCHITECTURE",
    href: "/services/seo",
    ctaLabel: "EXPLORE SEARCH"
  },
  {
    id: "systems",
    index: "03",
    chapterNumber: "03 / CAPABILITY",
    category: "AI SYSTEMS & AUTOMATION",
    title: "SYSTEMS",
    description: "Make it think. Autonomous workflows, custom AI integrations, internal tools, and closed-loop pipelines.",
    services: ["AI SYSTEMS", "AUTOMATION", "INTERNAL TOOLS", "WORKFLOW ENGINES"],
    footerStatement: "CLOSED-LOOP AUTONOMOUS PIPELINES",
    href: "/services/ai-automation",
    ctaLabel: "EXPLORE SYSTEMS"
  }
];

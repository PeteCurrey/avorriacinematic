import type { CaseStudyConfig } from "@/types/case-study";

/**
 * SYNTHETIC DEVELOPMENT FIXTURE
 * For architecture and visual verification in /dev/case-study only.
 * Not for production indexing or public claims.
 */

export const DEV_SYNTHETIC_FIXTURE: CaseStudyConfig = {
  projectSlug: "synthetic-dev-fixture",
  canonicalTitle: "Synthetic Dev Fixture",
  projectIndex: "DEV / FIXTURE",
  publicationStatus: "DRAFT",
  publishedAt: "2025-01-01",
  heroMode: "PRODUCT",
  heroMedia: {
    id: "dev-hero-media",
    type: "IMAGE",
    src: "/media/projects/alkota/alkota-product-hero.svg",
    alt: "Synthetic Development Fixture Showcase",
    aspectRatio: "16/10",
    status: "DEV_ONLY",
    priority: true
  },
  theme: {
    background: "#080808",
    foreground: "#F3F3F0",
    muted: "#888884",
    accent: "#4D9FFF",
    surface: "#111111",
    mediaBorder: "rgba(77, 159, 255, 0.16)",
    signalColour: "#4D9FFF",
    headerMode: "PROJECT_DARK"
  },
  relationship: "INTERNAL",
  status: "IN DEVELOPMENT",
  roles: ["STRATEGY", "PRODUCT", "UX", "DEVELOPMENT", "SYSTEM_ARCHITECTURE"],
  scopeSummary: "Comprehensive test harness validating all hero modes, chapter components, and proof verification rules.",
  capabilities: ["BUILD", "SYSTEMS", "SEARCH"],
  year: 2025,
  introNarrative: [
    "This synthetic fixture validates the Case Study Framework architecture prior to Phase 25 flagship authoring.",
    "It demonstrates chapter composition, custom theme injection, responsive layouts, and proof validation without relying on production client data."
  ],
  chapters: [
    {
      id: "dev-statement",
      type: "STATEMENT",
      eyebrow: "01 // THESIS VERIFICATION",
      title: "EDITORIAL STATEMENT CHAPTER",
      body: "Demonstrating high-impact typographic statement composition with responsive character measure and semantic heading hierarchy."
    },
    {
      id: "dev-media",
      type: "MEDIA",
      eyebrow: "02 // FULL-BLEED VISUALS",
      title: "MEDIA COMPONENT CHAPTER",
      caption: "High-resolution architectural capture with aspect-ratio reservation",
      media: [
        {
          id: "dev-media-still",
          type: "IMAGE",
          src: "/media/projects/ogn/ogn-industrial.svg",
          alt: "Synthetic media capture",
          aspectRatio: "16/9",
          status: "FINAL"
        }
      ]
    },
    {
      id: "dev-split",
      type: "SPLIT",
      eyebrow: "03 // ASYMMETRIC SPREAD",
      title: "NARRATIVE & SYSTEM METRIC SPLIT",
      body: "Combining architectural paragraph measure on the left with responsive visual media on the right.",
      secondaryBody: "Subordinate technical spec paragraph providing deeper operational context.",
      media: [
        {
          id: "dev-split-still",
          type: "IMAGE",
          src: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
          alt: "Synthetic split media",
          aspectRatio: "4/3",
          status: "FINAL"
        }
      ]
    },
    {
      id: "dev-proof",
      type: "PROOF",
      eyebrow: "04 // VERIFIED OUTCOMES",
      title: "EVIDENCE & METRIC ADAPTER",
      body: "Only verified evidence items pass validation and render publicly.",
      evidence: [
        {
          id: "ev-01",
          type: "TECHNICAL",
          value: "0.8s",
          unit: "LCP",
          description: "Sub-second initial paint under synthetic throttling",
          source: "Synthetic CI Lighthouse benchmark",
          verified: true
        },
        {
          id: "ev-02",
          type: "PERFORMANCE",
          value: "100%",
          unit: "WCAG AA",
          description: "Full keyboard, focus trap, and landmark compliance",
          source: "Automated a11y audit suite",
          verified: true
        }
      ]
    },
    {
      id: "dev-quote",
      type: "QUOTE",
      quote: {
        text: "The framework enables each project to define its world without losing the Avorria engineering discipline.",
        author: "Avorria Engineering",
        role: "Systems Architecture",
        company: "Studio"
      }
    }
  ],
  nextProject: {
    slug: "alkota-bikes",
    title: "Alkota Bikes",
    projectIndex: "001 / ALKOTA",
    descriptor: "PERFORMANCE PRODUCT / DIGITAL EXPERIENCE",
    heroMedia: "/media/projects/alkota/alkota-product-hero.svg",
    themeAccent: "#4D9FFF"
  },
  seo: {
    metaTitle: "Synthetic Dev Fixture — Case Study Framework | Avorria",
    metaDescription: "Internal development fixture validating the Avorria V2 Case Study Framework."
  }
};

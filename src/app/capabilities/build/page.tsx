import React from "react";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { CapabilityHero } from "@/components/capabilities/CapabilityHero";
import { CapabilityOfferings, CapabilityOfferingItem } from "@/components/capabilities/CapabilityOfferings";
import { CapabilityArchitecture } from "@/components/capabilities/CapabilityArchitecture";
import { CapabilityProof, CapabilityProofProject } from "@/components/capabilities/CapabilityProof";
import { CapabilityProcess } from "@/components/capabilities/CapabilityProcess";
import { CapabilityCTA } from "@/components/capabilities/CapabilityCTA";

export async function generateMetadata() {
  return generatePageMetadata({
    title: "Build — Digital Design & Engineering | Avorria",
    description: "Avorria designs and builds high-performance digital products, bespoke web applications, interactive configurators, and modern platforms with sub-second performance.",
    path: "/capabilities/build",
  });
}

const BUILD_OFFERINGS: CapabilityOfferingItem[] = [
  {
    id: "offering-web-platforms",
    code: "01 // PLATFORMS",
    title: "Digital Flagships & Web Platforms",
    description: "Bespoke digital flagships engineered for commercial gravity, rapid page delivery, and distinctive brand authority without generic template constraints.",
    whoItIsFor: "Ambitious founders, premium physical product brands, and commercial real estate organizations.",
    problemsSolved: [
      "Slow, bloated agency WordPress/Webflow templates",
      "Generic brand perception indistinguishable from competitors",
      "Poor mobile performance and broken Core Web Vitals"
    ],
    deliverables: [
      "Custom Next.js App Router Architecture",
      "Surgical Responsive Typography",
      "Sub-Second Asset Delivery",
      "Semantic HTML & SEO Foundations"
    ]
  },
  {
    id: "offering-web-apps",
    code: "02 // APPLICATIONS",
    title: "Web Applications & SaaS Systems",
    description: "High-density web applications, analytics workspaces, and operational portals engineered for speed, complex workflows, and cognitive clarity.",
    whoItIsFor: "Technology scale-ups, financial systems, and B2B platforms requiring deep workflow coordination.",
    problemsSolved: [
      "Cluttered interfaces causing user decision fatigue",
      "Sluggish UI rendering under dense datasets",
      "Fragile component state and unmaintainable codebases"
    ],
    deliverables: [
      "Strict TypeScript Frontend Architecture",
      "Modular State Management",
      "Real-Time Telemetry & Data Grids",
      "Role-Based Access & Security Headers"
    ]
  },
  {
    id: "offering-ux-product-design",
    code: "03 // UX / PRODUCT",
    title: "Product Design & Interaction Architecture",
    description: "Rigorous user journey modeling, interaction design, and cognitive friction reduction from concept to production-ready design primitives.",
    whoItIsFor: "Product leaders launching new digital ventures or overhauling high-friction legacy products.",
    problemsSolved: [
      "High drop-off rates during complex user journeys",
      "Ambiguous user onboarding and configuration flows",
      "Disconnect between design mockups and real code"
    ],
    deliverables: [
      "User Journey & Information Architecture Maps",
      "High-Fidelity Interactive Prototypes",
      "Friction-Free Form & Input Design",
      "Micro-Interactions & State Choreography"
    ]
  },
  {
    id: "offering-configurators-commerce",
    code: "04 // COMMERCE",
    title: "Product Configurators & Commerce Systems",
    description: "Interactive 2D and 3D product visualizers, geometry calculators, and headless checkout journeys that turn technical choices into desirable decisions.",
    whoItIsFor: "Engineered physical product manufacturers, bespoke hardware brands, and direct-to-consumer innovators.",
    problemsSolved: [
      "Standard ecommerce carts unable to handle custom specifications",
      "Customers overwhelmed by technical options and dimensions",
      "Sluggish 3D experiences that crash mobile devices"
    ],
    deliverables: [
      "Interactive Product State Selectors",
      "Headless Checkout & Reservation Flows",
      "Lightweight 2D/3D Asset Optimization",
      "Instant Specification Calculation"
    ]
  },
  {
    id: "offering-design-systems",
    code: "05 // DESIGN SYSTEMS",
    title: "Design Systems & Tokenized Component Libraries",
    description: "Production-grade design systems unifying typography scales, color primitives, spacing tokens, and reusable accessible components.",
    whoItIsFor: "Growing engineering teams needing to scale product development velocity without losing visual consistency.",
    problemsSolved: [
      "Inconsistent UI components scattered across multiple codebases",
      "Slow front-end velocity and repetitive rework",
      "Accessibility violations across customer touchpoints"
    ],
    deliverables: [
      "Tokenized Design Primitive Libraries",
      "WCAG 2.2 AA Compliant Component Sets",
      "Interactive Storybook / Component Labs",
      "Zero-Dependency CSS & Tailwind Primitives"
    ]
  },
  {
    id: "offering-portals-tools",
    code: "06 // INTERNAL TOOLS",
    title: "Client Portals & Operational Workspaces",
    description: "Bespoke client areas, field technician interfaces, and internal administration tools engineered for daily operational resilience.",
    whoItIsFor: "Operations-intensive businesses, logistics teams, and facilities management networks.",
    problemsSolved: [
      "Spreadsheet chaos and manual email dispatching",
      "Field teams struggling with desktop-only tools on mobile",
      "Lack of real-time auditability and job status tracking"
    ],
    deliverables: [
      "Offline-Capable Mobile Web Applications",
      "Centralized Dispatch & Triage Consoles",
      "Durable Audit Logs & Compliance Records",
      "Fast API Ingestion & Webhook Endpoints"
    ]
  }
];

const ARCHITECTURE_PRINCIPLES = [
  {
    number: "01",
    title: "Zero Template Bloat",
    description: "Every line of code is handwritten for your specific product. No generic multipurpose themes, no unnecessary frameworks, and no third-party tracking scripts.",
    metric: "0kb",
    metricLabel: "UNUSED FRAMEWORK OVERHEAD"
  },
  {
    number: "02",
    title: "Sub-Second Performance",
    description: "Engineered for instantaneous delivery across global CDNs with server-side rendering, streaming HTML, and optimized modern image pipelines.",
    metric: "< 0.8s",
    metricLabel: "LARGEST CONTENTFUL PAINT (LCP)"
  },
  {
    number: "03",
    title: "Strict Accessibility",
    description: "Full WCAG 2.2 AA compliance: semantic landmarks, screen-reader optimized headings, keyboard focus management, and high-contrast typography.",
    metric: "100%",
    metricLabel: "KEYBOARD NAVIGABILITY & CONTRAST"
  },
  {
    number: "04",
    title: "TypeScript Discipline",
    description: "End-to-end type safety eliminating runtime exceptions and ensuring durable maintainability across long-term platform lifecycles.",
    metric: "100%",
    metricLabel: "TYPE-SAFE COMPONENT ARCHITECTURE"
  }
];

const CURATED_PROOF_PROJECTS: CapabilityProofProject[] = [
  {
    slug: "alkota-bikes",
    projectIndex: "001 / ALKOTA",
    title: "Alkota Bikes",
    category: "PERFORMANCE PRODUCT // DIGITAL CONFIGURATOR",
    description: "A precision digital flagship and product configuration experience translating high-performance titanium cycling craftsmanship into an interactive digital world.",
    impactSummary: "Delivered bespoke product configurator, reservation journey, and sub-second asset delivery without marketing clutter.",
    mediaSrc: "/media/projects/alkota/alkota-product-hero.svg",
    mediaAlt: "Alkota Bikes digital flagship showcase",
    tags: ["PRODUCT_DESIGN", "CONFIGURATOR", "NEXT_JS", "BRAND"]
  },
  {
    slug: "careeros",
    projectIndex: "002 / CAREEROS",
    title: "CareerOS",
    category: "AI PRODUCT ARCHITECTURE // TALENT PLATFORM",
    description: "A human-centred AI career platform organizing career intelligence, dynamic Career Twin graph models, and conversational mentor workflows.",
    impactSummary: "Engineered full-stack SaaS platform, conversational interaction design, and structured opportunity surfaces.",
    mediaSrc: "/media/projects/careeros/careeros-portrait.svg",
    mediaAlt: "CareerOS human intelligence platform showcase",
    tags: ["AI_PRODUCT", "SAAS", "INTERACTION_DESIGN", "GRAPH_UI"]
  },
  {
    slug: "nestiq",
    projectIndex: "003 / NESTIQ",
    title: "NestIQ",
    category: "SPATIAL DATA // PROPERTY INTELLIGENCE",
    description: "An institutional real estate intelligence platform synthesizing cadastral boundaries, planning permissions, and travel-time isochrones into an actionable decision interface.",
    impactSummary: "Engineered high-throughput spatial search engine, vector map tiling, and multi-criteria query interface.",
    mediaSrc: "/media/projects/nestiq/nestiq-ui-preview.svg",
    mediaAlt: "NestIQ property intelligence decision interface",
    tags: ["SPATIAL_DATA", "SEARCH_ENGINE", "DECISION_UI", "VECTOR_MAP"]
  },
  {
    slug: "one-great-northern",
    projectIndex: "006 / ONE GREAT NORTHERN",
    title: "One Great Northern",
    category: "COMMERCIAL TRANSFORMATION // LEASING SHOWCASE",
    description: "Strategic commercial brand repositioning and editorial digital leasing platform transforming an architectural landmark into a modern showcase.",
    impactSummary: "Transformed static template brochure into high-resolution editorial floorplate experience with direct leasing enquiry funnel.",
    mediaSrc: "/media/projects/ogn/ogn-new-desktop.svg",
    mediaAlt: "One Great Northern editorial leasing platform",
    tags: ["REPOSITIONING", "EDITORIAL", "WEB_DEVELOPMENT", "COMMERCIAL"]
  }
];

const ENGAGEMENT_STEPS = [
  {
    number: "01",
    name: "Strategy & Technical Architecture",
    duration: "WEEKS 1–2",
    description: "We map your commercial goals, user journeys, data requirements, and technical boundaries into an unambiguous delivery roadmap.",
    deliverables: [
      "Technical Architecture Blueprint",
      "User Journey & Scope Matrix",
      "Technology Stack Specification"
    ]
  },
  {
    number: "02",
    name: "Design Primitives & Prototyping",
    duration: "WEEKS 2–4",
    description: "We create bespoke typography scales, spatial tokens, and high-fidelity interactive prototypes tested against real product workflows.",
    deliverables: [
      "Interactive Interface Prototype",
      "Tokenized Design Primitives",
      "Responsive Layout Proofs"
    ]
  },
  {
    number: "03",
    name: "Full-Stack Front-End Engineering",
    duration: "WEEKS 4–8",
    description: "We build your platform with modern Next.js App Router, strict TypeScript, modular components, and seamless API integrations.",
    deliverables: [
      "Production-Grade Next.js Codebase",
      "API & Database Pipeline Integrations",
      "State Management & Form Handling"
    ]
  },
  {
    number: "04",
    name: "Hardening & Production Launch",
    duration: "WEEKS 8+",
    description: "We execute rigorous cross-browser testing, Core Web Vitals optimization, accessibility auditing, and seamless cloud deployment.",
    deliverables: [
      "100% Core Web Vitals Audit Pass",
      "WCAG 2.2 AA Accessibility Sign-Off",
      "Automated CI/CD Deployment Pipeline"
    ]
  }
];

export default function BuildCapabilityPage() {
  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white pt-24 sm:pt-32">
      {/* 01 // Hero Proposition */}
      <CapabilityHero
        code="01 // BUILD"
        title="BUILD"
        tagline="BUILD. DIGITAL PRODUCTS PEOPLE WANT TO USE."
        description="We design and engineer bespoke digital products, high-conversion web platforms, interactive configurators, and resilient web applications with surgical typography, sub-second performance, and uncompromising engineering quality."
        primaryCtaText="START A BUILD PROJECT"
        primaryCtaHref="/start-project"
      />

      {/* 02 // Concrete Commercial Offerings */}
      <CapabilityOfferings
        sectionEyebrow="01 // WHAT WE BUILD"
        sectionTitle="COMMERCIAL CAPABILITIES & SOLUTIONS"
        sectionDescription="Clear, focused software engineering and design services tailored to ambitious businesses requiring distinct digital advantage."
        offerings={BUILD_OFFERINGS}
      />

      {/* 03 // Why Architecture Matters */}
      <CapabilityArchitecture
        sectionEyebrow="02 // THE AVORRIA STANDARD"
        sectionTitle="WHY ARCHITECTURE MATTERS"
        principles={ARCHITECTURE_PRINCIPLES}
      />

      {/* 04 // Selected Proof & Case Study Links */}
      <CapabilityProof
        sectionEyebrow="03 // VERIFIED EVIDENCE"
        sectionTitle="ENGINEERED WORK IN PRODUCTION"
        projects={CURATED_PROOF_PROJECTS}
      />

      {/* 05 // Engagement & Delivery Process */}
      <CapabilityProcess
        sectionEyebrow="04 // HOW WE WORK"
        sectionTitle="ENGAGEMENT & DELIVERY METHODOLOGY"
        steps={ENGAGEMENT_STEPS}
      />

      {/* 06 // Commercial CTA */}
      <CapabilityCTA
        capabilityName="BUILD"
        ctaHeading="HAVE A PRODUCT OR PLATFORM TO ENGINEER?"
        ctaDescription="We partner with founders, executive teams, and commercial organizations to build category-defining digital products. Let's discuss scope, timelines, and technical requirements."
        buttonText="START A BUILD PROJECT"
        buttonHref="/start-project"
      />
    </main>
  );
}

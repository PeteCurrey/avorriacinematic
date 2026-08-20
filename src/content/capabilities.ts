import type { Capability } from "@/types/content";

export const CAPABILITIES: Capability[] = [
  {
    slug: "build",
    title: "BUILD",
    subtitle: "Digital Design & Engineering",
    tagline: "Surgical digital interfaces and resilient web architecture.",
    description: "We design and build bespoke digital products, editorial platforms, and enterprise web applications. Every interface is constructed with surgical typography, precise interaction design, and uncompromising performance.",
    outcomes: [
      "Sub-second page load times and perfect Core Web Vitals",
      "Bespoke brand expression without generic templates",
      "Accessible, responsive, and resilient front-end engineering",
      "Scalable Next.js and React component architectures"
    ],
    deliverables: [
      "Custom Web Applications & Next.js Platforms",
      "Cinematic Brand Experiences & WebGL Interfaces",
      "Design Systems & Tokenized Component Libraries",
      "Interactive Product Configurators & Calculators"
    ],
    deliverablesList: [
      {
        title: "Digital Flagships & Web Platforms",
        description: "Custom digital platforms built with Next.js App Router, strict TypeScript, and surgical design systems."
      },
      {
        title: "Application UI & Design Systems",
        description: "Production-grade design systems unifying typography, spatial tokens, and interaction primitives."
      },
      {
        title: "Motion & Interactive Choreography",
        description: "GSAP scroll sequences, smooth progressive transitions, and GPU-optimized micro-interactions."
      }
    ],
    relatedProjects: ["alkota-bikes", "careeros", "one-great-northern"]
  },
  {
    slug: "search",
    title: "SEARCH",
    subtitle: "Organic Visibility & Technical Architecture",
    tagline: "Engineering-led organic search dominance and information architecture.",
    description: "Search is not an afterthought or keyword padding. We architect search performance from the server up: semantic markup, clean crawl trees, structured data schemas, and high-intent programmatic landing architectures.",
    outcomes: [
      "Clean search engine indexation and crawl budget efficiency",
      "Dominant organic positioning in competitive commercial sectors",
      "Semantic HTML and JSON-LD structured data compliance",
      "Authoritative editorial and programmatic content frameworks"
    ],
    deliverables: [
      "Technical SEO Auditing & Architectural Remediation",
      "Information Architecture & Clean URL Taxonomy",
      "Programmatic SEO & Content Matrix Engineering",
      "Search Intent Mapping & Organic Growth Strategy"
    ],
    deliverablesList: [
      {
        title: "Technical Search Architecture",
        description: "Server-side rendering, semantic landmarks, XML sitemaps, robots protocol, and crawl hierarchy."
      },
      {
        title: "Structured Data & Entity Modeling",
        description: "Deep schema.org implementation for rich snippets, knowledge graph entities, and commercial relevance."
      },
      {
        title: "High-Intent Content Engineering",
        description: "Editorial information architecture designed to capture high-value organic search demand."
      }
    ],
    relatedProjects: ["nestiq", "entirefm", "aesuk"]
  },
  {
    slug: "systems",
    title: "SYSTEMS",
    subtitle: "AI Systems & Digital Infrastructure",
    tagline: "Autonomous workflows, AI agents, and custom operational backbones.",
    description: "We engineer intelligent digital infrastructure that eliminates operational friction. From LLM agent orchestration and automated client portals to high-throughput data processing pipelines.",
    outcomes: [
      "Automated multi-step workflows replacing manual overhead",
      "Custom AI agent integration into existing business tools",
      "Unified internal dashboards and operational clarity",
      "Secure, auditable data pipelines and API integrations"
    ],
    deliverables: [
      "Custom AI Agent Orchestration & Workflow Pipelines",
      "Enterprise Portals & Client Dashboards",
      "API Integrations & Third-Party Service Synchronization",
      "Quantitative & Operational Analytics Dashboards"
    ],
    deliverablesList: [
      {
        title: "AI Agent & Workflow Orchestration",
        description: "Custom autonomous agent workflows integrated with real-time operational datasets."
      },
      {
        title: "Operational Dashboards & Portals",
        description: "High-density data interfaces for mission-critical monitoring, analytics, and dispatch."
      },
      {
        title: "Data Pipeline & API Engineering",
        description: "Resilient backend services connecting disparate business systems into a cohesive layer."
      }
    ],
    relatedProjects: ["careeros", "drawdown-trading", "entirefm"]
  }
];

export function getCapabilityBySlug(slug: string): Capability | undefined {
  return CAPABILITIES.find((c) => c.slug === slug);
}

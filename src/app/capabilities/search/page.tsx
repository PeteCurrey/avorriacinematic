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
    title: "Search — Organic Visibility & Technical Architecture | Avorria",
    description: "Avorria architects organic search visibility from the server up: technical SEO, information architecture, structured data schemas, and high-throughput crawl trees.",
    path: "/capabilities/search",
  });
}

const SEARCH_OFFERINGS: CapabilityOfferingItem[] = [
  {
    id: "offering-technical-seo",
    code: "01 // TECHNICAL ARCHITECTURE",
    title: "Technical Search Architecture & Crawl Engineering",
    description: "Server-side rendering, clean HTTP response codes, automated XML sitemap graphs, and crawl budget optimisation ensuring search engine bots index 100% of critical pages.",
    whoItIsFor: "Web platforms, high-volume catalogs, and headless applications suffering from client-side JavaScript rendering issues.",
    problemsSolved: [
      "Client-side rendered content failing to index in search engines",
      "Crawl budget wasted on duplicate, faceted, or orphaned parameters",
      "Server latency and poor Time-to-First-Byte (TTFB) suppressing rank"
    ],
    deliverables: [
      "Full Server-Side Rendering (SSR) & Streaming",
      "Dynamic XML Sitemaps & Robots.txt Protocol",
      "Canonical URL & Parameter Governance",
      "Clean HTTP Header & Status Code Routing"
    ]
  },
  {
    id: "offering-ia-taxonomy",
    code: "02 // TAXONOMY",
    title: "Information Architecture & URL Taxonomy",
    description: "Hierarchical topic clusters, siloed routing trees, and deterministic internal linking graphs that establish unambiguous topical authority.",
    whoItIsFor: "Complex content ecosystems, multi-service companies, and expanding enterprise software platforms.",
    problemsSolved: [
      "Keyword cannibalization across fragmented overlapping pages",
      "Confusing, multi-level URL paths that confuse search crawlers",
      "Weak internal page authority distribution and buried content"
    ],
    deliverables: [
      "Logical Hierarchy & URL Routing Blueprints",
      "Semantic Topic Cluster & Silo Structures",
      "Automated Breadcrumb & Internal Link Graphs",
      "Intent-Mapped Navigation Architecture"
    ]
  },
  {
    id: "offering-structured-data",
    code: "03 // ENTITY MODELING",
    title: "Structured Data & Entity Graph Modeling",
    description: "Deep Schema.org JSON-LD semantic graphs modeling organizations, products, technical specifications, and locations for rich results and Knowledge Graph recognition.",
    whoItIsFor: "Direct-to-consumer brands, B2B services, and real estate platforms targeting high-visibility SERP features.",
    problemsSolved: [
      "Zero rich snippet visibility in competitive search results",
      "Ambiguous business entity representation in knowledge graphs",
      "Disconnected metadata across multi-domain corporate structures"
    ],
    deliverables: [
      "Comprehensive Schema.org JSON-LD Graph Architecture",
      "Entity Resolution for Knowledge Panels & Answer Engines",
      "Product, Article, Organization, and Dataset Schemas",
      "Automated Schema Validation & Linting in CI/CD"
    ]
  },
  {
    id: "offering-platform-migrations",
    code: "04 // MIGRATIONS",
    title: "Platform & CMS Search Migrations",
    description: "Comprehensive risk-mitigation frameworks for website rebuilds, CMS shifts, and domain consolidations — preserving decades of historical organic authority.",
    whoItIsFor: "Established brands and commercial organizations undertaking full digital redesigns or headless platform transitions.",
    problemsSolved: [
      "Catastrophic traffic drops following unmanaged agency redesigns",
      "Broken legacy backlinks and neglected 404 error cascades",
      "Loss of historical search rankings during URL restructuring"
    ],
    deliverables: [
      "1:1 Comprehensive 301 Redirect Mapping Engines",
      "Pre-Launch & Post-Launch Staging Crawl Audits",
      "Historical Backlink Equity Preservation",
      "Real-Time Post-Launch Indexation Telemetry"
    ]
  },
  {
    id: "offering-programmatic-seo",
    code: "05 // PROGRAMMATIC",
    title: "Programmatic Search & Data-Driven Matrices",
    description: "Scalable, high-intent database-driven landing page architectures designed to capture thousands of long-tail commercial queries with zero thin-content penalties.",
    whoItIsFor: "Directory platforms, marketplaces, property intelligence engines, and multi-location service providers.",
    problemsSolved: [
      "Manual inability to build thousands of localized or asset-specific pages",
      "Thin-content algorithmic demotions caused by poor templating",
      "Slow database queries throttling large-scale page generation"
    ],
    deliverables: [
      "Static Site Generated (SSG) Landing Matrix Engines",
      "Dynamic Entity Interpolation with Rich Unique Data",
      "Indexation Tiering & Quality Gatekeeper Rules",
      "Automated Canonical Bounding for Low-Value Combinations"
    ]
  },
  {
    id: "offering-ai-search",
    code: "06 // AI DISCOVERABILITY",
    title: "AI Search & Modern Retrieval Architecture",
    description: "Engineering platforms for discovery within AI answer engines, generative search experiences, and LLM-powered citation pipelines.",
    whoItIsFor: "Future-facing technology companies, research organizations, and brands seeking resilient discoverability beyond traditional blue links.",
    problemsSolved: [
      "Invisibility within conversational search engines and AI summaries",
      "Unstructured content failing to be extracted as factual citations",
      "Lack of clean API-accessible content for modern search indexers"
    ],
    deliverables: [
      "Semantic HTML Extraction & Markdown Feeds",
      "Fact-Dense Semantic Architecture for LLM Citations",
      "Structured Authoritative Proof & Source Attribution",
      "Vector-Ready Knowledge Base Architecture"
    ]
  }
];

const SEARCH_PRINCIPLES = [
  {
    number: "01",
    title: "Search Starts in Code",
    description: "Organic visibility is not a marketing plugin installed after launch. It is engineered directly into server routes, HTML landmarks, and data models from Day 0.",
    metric: "Day 0",
    metricLabel: "ARCHITECTURAL INTEGRATION"
  },
  {
    number: "02",
    title: "Server-Side Authority",
    description: "Search bots receive fully rendered, semantic HTML on the initial byte. Zero reliance on brittle client-side JavaScript execution or delayed indexing queues.",
    metric: "100%",
    metricLabel: "PRE-RENDERED BOT VISIBILITY"
  },
  {
    number: "03",
    title: "Entity Graph Clarity",
    description: "We translate your organization and products into structured data entities recognized by both traditional search algorithms and generative AI answer engines.",
    metric: "JSON-LD",
    metricLabel: "SEMANTIC GRAPH SCHEMAS"
  },
  {
    number: "04",
    title: "Zero Snake-Oil Guarantees",
    description: "We never make fake ranking promises or manipulate search engines with spam. We engineer durable technical foundations that command organic relevance.",
    metric: "0%",
    metricLabel: "UNSUPPORTED RANKING CLAIMS"
  }
];

const CURATED_SEARCH_PROJECTS: CapabilityProofProject[] = [
  {
    slug: "nestiq",
    projectIndex: "003 / NESTIQ",
    title: "NestIQ",
    category: "SPATIAL DATA // SEARCH ARCHITECTURE",
    description: "An institutional real estate intelligence platform built on a high-throughput spatial query engine, cadastral boundary indexing, and travel-time isochrone search.",
    impactSummary: "Delivered sub-100ms multi-parameter search engine, vector spatial tiles, and rich geographic entity indexing.",
    mediaSrc: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
    mediaAlt: "NestIQ spatial search query interface",
    tags: ["SPATIAL_SEARCH", "VECTOR_TILES", "SEARCH_ENGINE", "DATA_MODEL"]
  },
  {
    slug: "entirefm",
    projectIndex: "005 / ENTIREFM",
    title: "EntireFM",
    category: "FACILITIES MANAGEMENT // REGIONAL TAXONOMY",
    description: "A nationwide commercial facilities management operations platform engineered with a multi-location geographic taxonomy and asset hierarchy search architecture.",
    impactSummary: "Delivered regional organic search hierarchy, estate-level entity indexing, and automated work-order dispatch routing.",
    mediaSrc: "/media/projects/entirefm/entirefm-operational.svg",
    mediaAlt: "EntireFM operational search and dispatch platform",
    tags: ["REGIONAL_TAXONOMY", "IA_ARCHITECTURE", "MULTI_SITE", "SYSTEMS"]
  },
  {
    slug: "aesuk",
    projectIndex: "SELECTED / AESUK",
    title: "AESUK",
    category: "INDUSTRIAL RENEWABLES // TECHNICAL VISIBILITY",
    description: "Renewable energy engineering systems and commercial installation platform architected with strict technical SEO, semantic structured data, and clean crawl hierarchies.",
    impactSummary: "Engineered clean semantic sitemaps, industrial schema modeling, and zero-loss platform migration architecture.",
    mediaSrc: "/media/projects/aesuk/aesuk-hero.svg",
    mediaAlt: "AESUK renewable energy platform",
    tags: ["TECHNICAL_SEO", "SCHEMA_MODELING", "MIGRATION", "INFRASTRUCTURE"]
  }
];

const SEARCH_ENGAGEMENT_STEPS = [
  {
    number: "01",
    name: "Technical Audit & Crawl Analysis",
    duration: "WEEKS 1–2",
    description: "We inspect your server infrastructure, crawl budget efficiency, canonical hierarchy, indexation status, and rendering bottlenecks with full diagnostic precision.",
    deliverables: [
      "Technical Search & Crawl Audit",
      "Indexation & Status Code Analysis",
      "Core Web Vitals Remediation Map"
    ]
  },
  {
    number: "02",
    name: "Taxonomy & Entity Architecture",
    duration: "WEEKS 2–3",
    description: "We design clean URL hierarchies, semantic topic clusters, internal link graphs, and Schema.org JSON-LD entity structures tailored to your commercial domain.",
    deliverables: [
      "URL Taxonomy & Routing Blueprint",
      "Internal Linking Graph Model",
      "Schema.org Entity Architecture"
    ]
  },
  {
    number: "03",
    name: "Implementation & Server Engineering",
    duration: "WEEKS 3–6",
    description: "We engineer server-side rendering pipelines, dynamic sitemaps, structured data schemas, and 301 redirect engines directly into your codebase.",
    deliverables: [
      "Production-Grade SSR Implementation",
      "Automated Schema Validation Pipeline",
      "1:1 URL Redirect Engine (if migrating)"
    ]
  },
  {
    number: "04",
    name: "Indexation Governance & Telemetry",
    duration: "ONGOING",
    description: "We monitor bot crawl activity, index coverage, search console telemetry, and Core Web Vitals to maintain sustainable technical dominance.",
    deliverables: [
      "Search Console Crawl Governance",
      "Index Coverage Verification",
      "Continuous Technical Search Auditing"
    ]
  }
];

export default function SearchCapabilityPage() {
  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white pt-24 sm:pt-32">
      {/* 01 // Hero Proposition */}
      <CapabilityHero
        code="02 // SEARCH"
        title="SEARCH"
        tagline="SEARCH. VISIBILITY IS ENGINEERED."
        description="Search is not an afterthought, a marketing plugin, or keyword padding. We architect organic visibility from the server up: technical SEO, crawl budget efficiency, structured data entity models, and resilient information architectures."
        primaryCtaText="ENGINEER YOUR VISIBILITY"
        primaryCtaHref="/start-project"
      />

      {/* 02 // Concrete Commercial Offerings */}
      <CapabilityOfferings
        sectionEyebrow="01 // WHAT WE DELIVER"
        sectionTitle="TECHNICAL SEARCH SOLUTIONS"
        sectionDescription="Engineering-led search architecture designed for platforms, high-volume catalogs, and enterprise websites requiring sustainable organic discovery."
        offerings={SEARCH_OFFERINGS}
      />

      {/* 03 // Why Architecture Matters */}
      <CapabilityArchitecture
        sectionEyebrow="02 // THE AVORRIA SEARCH STANDARD"
        sectionTitle="WHY SEARCH ARCHITECTURE MATTERS"
        principles={SEARCH_PRINCIPLES}
      />

      {/* 04 // Selected Proof & Case Study Links */}
      <CapabilityProof
        sectionEyebrow="03 // PROVEN SEARCH ARCHITECTURES"
        sectionTitle="VERIFIED SEARCH & DISCOVERY SYSTEMS"
        projects={CURATED_SEARCH_PROJECTS}
      />

      {/* 05 // Engagement & Delivery Process */}
      <CapabilityProcess
        sectionEyebrow="04 // HOW WE WORK"
        sectionTitle="SEARCH DELIVERY METHODOLOGY"
        steps={SEARCH_ENGAGEMENT_STEPS}
      />

      {/* 06 // Commercial CTA */}
      <CapabilityCTA
        capabilityName="SEARCH"
        ctaHeading="READY TO ENGINEER YOUR ORGANIC VISIBILITY?"
        ctaDescription="Whether building a new high-throughput platform, restructuring a legacy taxonomy, or planning a zero-loss website migration — let's discuss your technical search requirements."
        buttonText="ENGINEER YOUR VISIBILITY"
        buttonHref="/start-project"
      />
    </main>
  );
}

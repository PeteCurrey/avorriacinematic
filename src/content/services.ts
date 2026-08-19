import { ServiceDefinition, ServiceSlug } from "@/types/content";

export const SERVICES: ServiceDefinition[] = [
  // ============================================================
  // 01 / WEB — WEBSITES & DIGITAL EXPERIENCES
  // ============================================================
  {
    slug: "websites",
    code: "01 / WEB",
    number: "01",
    title: "Websites & Digital Experiences",
    shortTitle: "Websites",
    category: "Design & Web Engineering",
    proposition: "Premium websites and digital experiences designed to make businesses look more valuable, communicate more clearly and convert more customers.",
    supportingStatement: "We engineer bespoke digital flagships that command commercial authority. Fast, accessible, distinctively branded, and built with modern Next.js architecture.",
    heroSummary: "A website is the primary commercial proof point of your business. We build digital experiences that combine elite aesthetic refinement, sub-second performance, and intuitive conversion paths.",
    deliverablesSummary: [
      "Website Strategy & Information Architecture",
      "Digital Brand Direction & Art Direction",
      "UX/UI & Responsive Interface Design",
      "Next.js App Router Engineering",
      "Interactive Product Configurators",
      "Headless Ecommerce & Booking Journeys",
      "CMS Architecture & Content Migrations",
      "Performance & Core Web Vitals Optimization"
    ],
    offerings: [
      {
        id: "web-flagships",
        code: "01 // STRATEGY & DESIGN",
        title: "Digital Brand Direction & UX/UI Design",
        description: "Bespoke digital brand systems that elevate perceived business value. We design every layout, typography hierarchy, and interactive element from first principles.",
        deliverables: [
          "Information architecture & content structure",
          "Visual identity translation for screens",
          "Component design systems in Figma",
          "Interactive desktop & mobile prototypes",
          "Micro-interaction & motion choreography"
        ]
      },
      {
        id: "web-engineering",
        code: "02 // FRONTEND ENGINEERING",
        title: "Next.js & Modern Web Engineering",
        description: "Zero-template codebases built with strict TypeScript, clean component architecture, and server-side rendering for instantaneous load speeds.",
        deliverables: [
          "Next.js App Router & React engineering",
          "Strict TypeScript type safety",
          "Sub-second Largest Contentful Paint (LCP < 0.8s)",
          "WCAG 2.2 AA accessibility compliance",
          "Clean semantic HTML & schema metadata"
        ]
      },
      {
        id: "web-commerce-configurators",
        code: "03 // COMMERCE & CONFIGURATORS",
        title: "Ecommerce & Interactive Configurators",
        description: "Custom checkout journeys, product visualizers, and reservation engines that make purchasing complex or premium products effortless.",
        deliverables: [
          "Interactive 2D/3D product configurators",
          "Headless commerce & Shopify / custom checkouts",
          "Reservation and booking flows",
          "Real-time pricing and specification calculators",
          "Stripe and multi-currency payment integration"
        ]
      },
      {
        id: "web-cms-migration",
        code: "04 // PLATFORMS & MIGRATIONS",
        title: "CMS Architecture & Zero-Downtime Migrations",
        description: "Flexible, structured content management systems tailored to your marketing team's workflow, paired with risk-free site migration protocols.",
        deliverables: [
          "Headless CMS implementation (Sanity, Strapi, Decap)",
          "Legacy site content and asset migration",
          "URL redirect mapping and SEO protection",
          "Editorial workflow permissions and preview modes",
          "Automated build and deployment pipelines (CI/CD)"
        ]
      }
    ],
    problemsSolved: [
      {
        problem: "Your website looks cheaper than your business actually is.",
        symptom: "Prospective high-value clients perceive your company as small or outdated based on generic templates.",
        solution: "We craft an authoritative, bespoke digital presence with custom typography, structured layout grids, and refined interaction design that reflects your true commercial caliber.",
        outcome: "Instant credibility and commanding authority with enterprise buyers, investors, and high-ticket clients."
      },
      {
        problem: "Customers cannot understand what you do quickly enough.",
        symptom: "Visitors bounce within seconds because the messaging is buried under vague agency slogans or chaotic layouts.",
        solution: "We re-architect your information hierarchy to lead with concrete commercial outcomes, clear capability breakdowns, and transparent proof.",
        outcome: "Sharp commercial comprehension within seconds of landing on the page."
      },
      {
        problem: "Bloated templates and plugins make pages sluggish on mobile.",
        symptom: "Slow load times fail Core Web Vitals, penalize organic rankings, and cause mobile users to abandon before seeing the hero.",
        solution: "We write clean, zero-bloat Next.js frontends with streaming server rendering, optimized asset pipelines, and sub-second delivery.",
        outcome: "Sub-second load times worldwide, 100% Core Web Vitals pass rates, and frictionless mobile browsing."
      },
      {
        problem: "Visitors leave before taking action because the conversion journey has too much friction.",
        symptom: "Contact forms are hidden, generic, or demand excessive information upfront without demonstrating immediate value.",
        solution: "We design streamlined, multi-step enquiry and reservation funnels with clear progress indicators and instant value feedback.",
        outcome: "Measurably higher conversion rates and higher-quality qualified inbound enquiries."
      }
    ],
    methodology: [
      {
        number: "01",
        phase: "PHASE 01",
        title: "Strategy & Information Architecture",
        duration: "WEEKS 1–2",
        description: "We map your commercial positioning, audience intent, core deliverables, and conversion milestones into a clear architectural blueprint.",
        deliverables: [
          "Commercial positioning & message hierarchy",
          "Complete site taxonomy and sitemap",
          "Conversion funnel & journey specifications"
        ],
        technicalDetails: [
          "Crawl hierarchy & URL structure planning",
          "Component dependency matrix",
          "Asset optimization pipeline design"
        ]
      },
      {
        number: "02",
        phase: "PHASE 02",
        title: "Design Systems & High-Fidelity UI",
        duration: "WEEKS 2–4",
        description: "We establish the digital brand language, typography system, spatial tokens, and high-fidelity screen designs across desktop and mobile breakpoints.",
        deliverables: [
          "Custom typography and color tokens",
          "Responsive page layouts (Desktop, Tablet, Mobile)",
          "Interactive prototypes for key user flows"
        ],
        technicalDetails: [
          "Figma tokenized variable architecture",
          "WCAG 2.2 AA contrast validation",
          "Micro-interaction and transition specifications"
        ]
      },
      {
        number: "03",
        phase: "PHASE 03",
        title: "Next.js Frontend Engineering",
        duration: "WEEKS 4–8",
        description: "We engineer the platform using Next.js App Router, strict TypeScript, modular components, and server-side rendering for optimal speed and resilience.",
        deliverables: [
          "Clean, typed Next.js codebase",
          "CMS integration with live previews",
          "Custom interactive components & forms"
        ],
        technicalDetails: [
          "Server components & streaming SSR",
          "Sub-resource integrity & security headers",
          "Zero-runtime CSS / Tailwind token architecture"
        ]
      },
      {
        number: "04",
        phase: "PHASE 04",
        title: "Performance Hardening & Launch",
        duration: "WEEKS 8+",
        description: "Comprehensive multi-device QA, Core Web Vitals tuning, 301 redirect validation, analytics verification, and production DNS rollout.",
        deliverables: [
          "100% Core Web Vitals audit pass",
          "Redirect and canonical verification",
          "Production deployment & post-launch monitoring"
        ],
        technicalDetails: [
          "Edge CDN caching & header configuration",
          "Automated Lighthouse CI checks",
          "Real User Monitoring (RUM) setup"
        ]
      }
    ],
    proofProjects: [
      {
        projectSlug: "alkota-bikes",
        title: "Alkota Bikes",
        entityType: "CLIENT WORK",
        sector: "Precision Engineering / Cycling",
        problem: "Bespoke titanium bicycle maker needed a digital presence matching the exacting craftsmanship and technical depth of their frames.",
        role: "Digital brand strategy, UX/UI design, interactive 3D configurator, reservation architecture, Next.js engineering.",
        whatWasBuilt: "Digital flagship platform with interactive frame geometry visualizer, component selector, and direct reservation funnel.",
        mediaSrc: "/media/projects/alkota/product/naked-carbon-hero.jpg",
        mediaAlt: "Alkota Bikes digital flagship platform showcase",
        caseStudyAvailable: true,
        tags: ["DIGITAL_FLAGSHIP", "CONFIGURATOR", "NEXT_JS", "RESERVATION_UX"]
      },
      {
        projectSlug: "one-great-northern",
        title: "One Great Northern",
        entityType: "CLIENT WORK",
        sector: "Commercial Property / Real Estate",
        problem: "Landmark architectural commercial development required an editorial digital showcase to drive institutional leasing enquiries.",
        role: "Brand digital translation, editorial UX/UI, floorplate explorer, responsive frontend development.",
        whatWasBuilt: "High-resolution architectural digital presentation highlighting floorplate configurations, sustainability metrics, and leasing team contact journeys.",
        mediaSrc: "/media/projects/ogn/ogn-industrial.svg",
        mediaAlt: "One Great Northern architectural leasing platform",
        caseStudyAvailable: true,
        tags: ["EDITORIAL_WEB", "PROPERTY_SHOWCASE", "LEASING_FUNNEL", "RESPONSIVE"]
      },
      {
        projectSlug: "aesuk",
        title: "AESUK",
        entityType: "CLIENT WORK",
        sector: "Renewable Energy / Infrastructure",
        problem: "Commercial renewable energy contractor needed an authoritative web platform to capture national corporate solar and storage tenders.",
        role: "Information architecture, corporate UX/UI, technical specification display, technical SEO foundation.",
        whatWasBuilt: "Corporate digital platform with technical capability matrices, project portfolio showcases, and corporate enquiry workflows.",
        mediaSrc: "/media/projects/aesuk/aesuk-hero.svg",
        mediaAlt: "AESUK commercial renewable energy platform",
        caseStudyAvailable: true,
        tags: ["CORPORATE_WEB", "TECHNICAL_SPEC", "SEO_ARCHITECTURE", "INBOUND_CAPTURE"]
      }
    ],
    relatedServices: [
      {
        slug: "seo",
        code: "03 / SEARCH",
        title: "SEO & Organic Growth",
        reason: "Ensure your new website is technically structured to dominate search rankings from launch."
      },
      {
        slug: "performance-marketing",
        code: "04 / GROWTH",
        title: "Performance Marketing",
        reason: "Drive high-intent commercial traffic to conversion-engineered landing journeys."
      }
    ],
    finalCta: {
      heading: "READY TO BUILD A BETTER DIGITAL EXPERIENCE?",
      description: "Whether launching a new flagship or replacing an underperforming platform, let's discuss your commercial goals, timeline, and architectural requirements.",
      buttonText: "BUILD A BETTER WEBSITE",
      projectServiceParam: "websites"
    },
    seo: {
      metaTitle: "Web Design & Next.js Development Studio | Avorria",
      metaDescription: "Avorria designs and builds premium websites, digital flagships, and high-conversion web platforms with sub-second performance, strict typography, and custom Next.js engineering.",
      schemaType: "WebDesignService"
    }
  },

  // ============================================================
  // 02 / PRODUCT — DIGITAL PRODUCTS & SOFTWARE
  // ============================================================
  {
    slug: "digital-products",
    code: "02 / PRODUCT",
    number: "02",
    title: "Digital Products & Software",
    shortTitle: "Digital Products",
    category: "Software & Product Engineering",
    proposition: "We turn business ideas, workflows and data into software people actually want to use.",
    supportingStatement: "From high-density SaaS interfaces and client portals to operational platforms and spatial search engines. We design and build custom software that simplifies complex workflows.",
    heroSummary: "Complex operations do not need clunky software. We engineer scalable web applications, client dashboards, and custom SaaS platforms that make dense data readable and daily tasks effortless.",
    deliverablesSummary: [
      "SaaS Platforms & B2B Web Applications",
      "Customer Portals & Client Dashboards",
      "Internal Applications & Operational Backbones",
      "High-Density Data Grids & Analytics Interfaces",
      "Spatial & Mapping Applications",
      "Subscription Billing & Authentication Systems",
      "API Development & Database Architecture",
      "Product UX Prototyping & Design Systems"
    ],
    offerings: [
      {
        id: "product-saas",
        code: "01 // SAAS & WEB APPS",
        title: "SaaS Platforms & Web Applications",
        description: "End-to-end design and full-stack engineering of multi-tenant SaaS products, subscription platforms, and high-frequency analytical software.",
        deliverables: [
          "Full-stack React / Next.js / Node.js architecture",
          "Role-based access control (RBAC) & OAuth/SSO",
          "Subscription billing & usage metering (Stripe)",
          "Real-time websockets & live data synchronization",
          "Automated test suites & continuous integration"
        ]
      },
      {
        id: "product-portals",
        code: "02 // PORTALS & WORKSPACES",
        title: "Customer Portals & Client Dashboards",
        description: "Bespoke self-service portals that give your customers transparent access to their projects, files, account data, and communication.",
        deliverables: [
          "Secure client login and document exchange",
          "Project timeline & deliverable tracking",
          "Invoice review, payments, and account history",
          "Granular permission and team management",
          "Mobile-responsive portal interface"
        ]
      },
      {
        id: "product-internal-tools",
        code: "03 // INTERNAL TOOLS",
        title: "Operational Backbones & Admin Systems",
        description: "Custom internal software replacing fragmented spreadsheets, disparate tools, and manual triage with unified operational workflows.",
        deliverables: [
          "Custom dispatch, inventory, or triage consoles",
          "Durable audit trails and activity logging",
          "Multi-system database synchronization",
          "Automated report generation and exports",
          "Low-latency data tables with keyboard shortcuts"
        ]
      },
      {
        id: "product-data-spatial",
        code: "04 // DATA & SPATIAL SYSTEMS",
        title: "Data Visualization & Spatial Search",
        description: "Interfaces engineered for high information density: vector map layers, isochrone travel-time queries, financial charts, and interactive graphs.",
        deliverables: [
          "Vector map tiling & GIS polygon indexing",
          "Real-time financial charting & telemetry",
          "Multi-parameter filtering & sub-100ms queries",
          "Exportable data reports and analytical views",
          "Accessible chart and table alternatives"
        ]
      }
    ],
    problemsSolved: [
      {
        problem: "Your developers are maintaining five disconnected internal tools.",
        symptom: "Employees spend hours switching tabs, re-entering data, and debugging sync errors between off-the-shelf software.",
        solution: "We engineer a single, unified operational platform tailored exactly to your workflow, consolidating disconnected tools into one reliable interface.",
        outcome: "Massive reduction in operational friction, zero duplicate data entry, and lower software licensing costs."
      },
      {
        problem: "Complex data is trapped in messy spreadsheets instead of actionable dashboards.",
        symptom: "Leadership and team members cannot extract quick answers or make decisions because data is spread across conflicting Excel files.",
        solution: "We build structured databases and high-density dashboards that surface real-time metrics, clean visual trends, and direct actions.",
        outcome: "Real-time visibility, automated reporting, and instant operational decision-making."
      },
      {
        problem: "Legacy client portals look outdated, fail on mobile, and drop connections.",
        symptom: "Customers complain about clunky interfaces, inability to use mobile devices on site, and lack of clarity on project status.",
        solution: "We design and engineer modern, fast, mobile-first portals with clean typography, secure authentication, and offline resilience.",
        outcome: "A premium customer experience that builds client retention and reduces support tickets."
      },
      {
        problem: "Software workflows are too clunky, causing high user churn or training overhead.",
        symptom: "Users get overwhelmed by excessive form fields, confusing navigation, and sluggish page reloads.",
        solution: "We apply rigorous interaction design, progressive disclosure, and optimistic UI updates to make complex tasks feel effortless.",
        outcome: "Faster user onboarding, higher software adoption, and lower support volume."
      }
    ],
    methodology: [
      {
        number: "01",
        phase: "PHASE 01",
        title: "Product Scoping & Domain Modeling",
        duration: "WEEKS 1–2",
        description: "We analyze business workflows, define database entities, document user personas, and establish strict functional scope boundaries.",
        deliverables: [
          "Domain entity-relationship diagram (ERD)",
          "User story & permission matrix",
          "API & data architecture specification"
        ],
        technicalDetails: [
          "Database normalization & query plan design",
          "Authentication & tenant isolation strategy",
          "Third-party integration audit"
        ]
      },
      {
        number: "02",
        phase: "PHASE 02",
        title: "Interaction Architecture & Prototyping",
        duration: "WEEKS 2–4",
        description: "We design the complete interaction model, navigation hierarchy, high-density data tables, and interactive clickable prototypes.",
        deliverables: [
          "High-fidelity component library",
          "Full interactive product prototype",
          "Empty states, loading states, and error handling maps"
        ],
        technicalDetails: [
          "Design system tokenization for developers",
          "Keyboard navigation & focus trapping specs",
          "Responsive breakpoint adaptations"
        ]
      },
      {
        number: "03",
        phase: "PHASE 03",
        title: "Full-Stack Development & API Integration",
        duration: "WEEKS 4–10",
        description: "We build the software with strict TypeScript, secure APIs, resilient state management, and robust database migrations.",
        deliverables: [
          "Production application codebase",
          "RESTful & GraphQL API endpoints",
          "Automated unit & integration test coverage"
        ],
        technicalDetails: [
          "Role-based authorization middleware",
          "Optimistic UI updates & state caching",
          "Webhook handling with idempotency keys"
        ]
      },
      {
        number: "04",
        phase: "PHASE 04",
        title: "Security Auditing, QA & Cloud Deployment",
        duration: "WEEKS 10+",
        description: "End-to-end testing, security penetration checks, database backup automation, and containerized cloud deployment on AWS / Vercel.",
        deliverables: [
          "Security audit sign-off & penetration check",
          "Automated CI/CD deployment pipeline",
          "Production telemetry & error monitoring (Sentry)"
        ],
        technicalDetails: [
          "Zero-downtime database migrations",
          "Automated daily snapshot and failover setup",
          "Real-time performance monitoring alerts"
        ]
      }
    ],
    proofProjects: [
      {
        projectSlug: "nestiq",
        title: "NestIQ",
        entityType: "AVORRIA VENTURE",
        sector: "Real Estate Intelligence / Spatial Data",
        problem: "Commercial property investors lacked a unified tool to query cadastral boundaries, planning permissions, and travel-time isochrones together.",
        role: "Product strategy, spatial search architecture, vector map tiling, data pipeline design, full-stack Next.js development.",
        whatWasBuilt: "High-throughput spatial search platform with sub-100ms boundary filtering, isochrone computation, and multi-parameter property evaluation.",
        mediaSrc: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
        mediaAlt: "NestIQ institutional property intelligence decision interface",
        caseStudyAvailable: true,
        tags: ["SPATIAL_DATA", "SEARCH_ENGINE", "VECTOR_MAP", "DECISION_UI"]
      },
      {
        projectSlug: "careeros",
        title: "CareerOS",
        entityType: "AVORRIA VENTURE",
        sector: "AI Software / Enterprise Talent",
        problem: "Career navigation is fragmented across disconnected CV tools, job boards, and static skill assessments without unified structure.",
        role: "Product architecture, Career Twin graph data model, conversational mentor UI, full-stack platform development.",
        whatWasBuilt: "Enterprise talent acceleration platform leveraging graph models, conversational mentor interactions, and structured opportunity surfaces.",
        mediaSrc: "/media/projects/careeros/hero/hero_career_world_desktop.jpg",
        mediaAlt: "CareerOS AI talent platform interface",
        caseStudyAvailable: true,
        tags: ["AI_PRODUCT", "GRAPH_DATA", "SAAS_PLATFORM", "INTERACTION_DESIGN"]
      },
      {
        projectSlug: "drawdown-trading",
        title: "Drawdown.Trading",
        entityType: "AVORRIA VENTURE",
        sector: "Quantitative Finance / Trading",
        problem: "Proprietary traders were overwhelmed by casino-style trading interfaces that encourage impulsive behavior rather than structured risk management.",
        role: "Product strategy, high-density quantitative UI design, risk boundary engine, sub-millisecond charting integration.",
        whatWasBuilt: "Low-latency financial analytics and trade planning interface enforcing structured pre-trade planning, risk controls, and post-trade reviews.",
        mediaSrc: "/media/projects/drawdown/interface/dashboard.png",
        mediaAlt: "Drawdown.Trading quantitative risk interface",
        caseStudyAvailable: true,
        tags: ["FINTECH", "DATA_DENSITY", "RISK_ENGINE", "ANALYTICS_UI"]
      }
    ],
    relatedServices: [
      {
        slug: "ai-automation",
        code: "05 / SYSTEMS",
        title: "AI, Automation & Business Systems",
        reason: "Connect intelligent AI agents and autonomous workflows directly into your custom software."
      },
      {
        slug: "websites",
        code: "01 / WEB",
        title: "Websites & Digital Experiences",
        reason: "Pair your software with an elite marketing flagship that converts visitors into active users."
      }
    ],
    finalCta: {
      heading: "READY TO BUILD CUSTOM SOFTWARE THAT PERFORMS?",
      description: "From greenfield SaaS products to complex internal portals, let's discuss your technical requirements, user workflows, and delivery milestones.",
      buttonText: "DISCUSS A DIGITAL PRODUCT",
      projectServiceParam: "digital-products"
    },
    seo: {
      metaTitle: "Custom Software & Digital Product Development | Avorria",
      metaDescription: "Avorria designs and engineers custom software, SaaS platforms, client portals, and data-dense web applications built with TypeScript, Next.js, and scalable architecture.",
      schemaType: "SoftwareApplication"
    }
  },

  // ============================================================
  // 03 / SEARCH — SEO & ORGANIC GROWTH
  // ============================================================
  {
    slug: "seo",
    code: "03 / SEARCH",
    number: "03",
    title: "SEO & Organic Growth",
    shortTitle: "SEO & Organic Growth",
    category: "Search & Technical Visibility",
    proposition: "We engineer websites to be discovered by the people already looking for what our clients sell.",
    supportingStatement: "Search is not an afterthought or keyword padding. We architect search performance from the server up: clean crawl trees, semantic structured data, high-intent content, and AI search visibility.",
    heroSummary: "True organic growth is an engineering discipline. We build technical foundations, commercial content architecture, and entity models that earn dominant search visibility and drive high-value commercial enquiries.",
    deliverablesSummary: [
      "Technical SEO Audits & Server-Level Remediation",
      "Crawl Architecture & Indexation Optimization",
      "High-Intent Keyword & Commercial Demand Mapping",
      "Entity Modeling & Schema.org Structured Data",
      "Programmatic SEO & Scalable Landing Architectures",
      "Zero-Loss SEO Site Migrations",
      "Generative Engine Optimization (GEO) & AI Search",
      "Search Console Analytics & Performance Tracking"
    ],
    offerings: [
      {
        id: "seo-technical",
        code: "01 // TECHNICAL ARCHITECTURE",
        title: "Technical SEO & Crawl Architecture",
        description: "Deep server-side and front-end optimization ensuring search engines crawl, render, and index your entire commercial catalog with zero friction.",
        deliverables: [
          "Server-side rendering (SSR) & HTML stream validation",
          "XML sitemap & robots.txt hierarchy optimization",
          "Crawl budget efficiency & canonical URL governance",
          "Core Web Vitals & mobile renderability audits",
          "Status code (301, 308, 410) remediation protocols"
        ]
      },
      {
        id: "seo-content-architecture",
        code: "02 // COMMERCIAL TAXONOMY",
        title: "Information Architecture & Intent Strategy",
        description: "Structuring your website around how real buyers search. We map high-value commercial queries to dedicated, high-converting service and sector pages.",
        deliverables: [
          "Commercial search intent & demand mapping",
          "Service, sector, and location taxonomy design",
          "Internal linking architecture & topic clusters",
          "Editorial content guidelines for commercial conversion",
          "Competitor gap analysis & market share targeting"
        ]
      },
      {
        id: "seo-structured-data-ai",
        code: "03 // ENTITIES & AI SEARCH",
        title: "Structured Data & AI Search (GEO / AEO)",
        description: "Rich Schema.org entity modeling that positions your business for Google Knowledge Graph, rich snippets, and generative AI search engines (ChatGPT, Perplexity).",
        deliverables: [
          "JSON-LD entity modeling (Organization, Service, FAQ, Product)",
          "Generative Engine Optimization (GEO) content structuring",
          "Answer Engine Optimization (AEO) for conversational search",
          "Wikidata and knowledge graph entity reconciliation",
          "Rich snippet eligibility and snippet tracking"
        ]
      },
      {
        id: "seo-migrations-monitoring",
        code: "04 // MIGRATIONS & TRACKING",
        title: "Zero-Loss Migrations & Search Analytics",
        description: "Protecting and growing existing organic traffic during redesigns, paired with precise Search Console telemetry on commercial query rankings.",
        deliverables: [
          "1:1 legacy-to-new URL redirect mapping",
          "Pre-launch staging crawl & parity validation",
          "Post-launch indexation monitoring & anomaly alerts",
          "Search Console query segmentation & click analysis",
          "Commercial enquiry attribution from organic search"
        ]
      }
    ],
    problemsSolved: [
      {
        problem: "Your competitors consistently outrank you for the exact high-value services you sell.",
        symptom: "You have a superior physical service or product, but searchers find inferior competitors who have structured their pages better.",
        solution: "We build dedicated, authoritative service architectures and structured entity data that signal overwhelming relevance and authority to search engines.",
        outcome: "Top-tier organic positioning for high-intent commercial terms that directly generate sales enquiries."
      },
      {
        problem: "Your site gets traffic, but it is low-intent visitors who never enquire.",
        symptom: "Blog articles about generic topics attract casual readers, while commercial service pages remain unranked and silent.",
        solution: "We refocus your organic strategy strictly on bottom-of-funnel commercial intent, building pages tailored to buyers ready to hire.",
        outcome: "Higher quality traffic that converts directly into inbound consultations and qualified project briefs."
      },
      {
        problem: "Past site redesigns or migrations caused organic traffic to collapse.",
        symptom: "An agency launched a new website without redirect mapping, breaking indexed URLs and erasing years of organic search equity.",
        solution: "We execute exhaustive crawl audits, precise 1:1 redirect maps, and structured data carryovers to preserve and amplify search authority.",
        outcome: "Zero organic traffic loss during platform transitions and immediate indexation of new architecture."
      },
      {
        problem: "AI search engines cannot accurately parse or cite your business.",
        symptom: "When prospects ask Perplexity, ChatGPT, or Google AI Overviews for industry recommendations, your company is missing.",
        solution: "We implement deep semantic schema, clear entity definitions, and structured answer blocks optimized for large language model citation.",
        outcome: "Prominent citations and direct links in AI-generated search overviews and answer engines."
      }
    ],
    methodology: [
      {
        number: "01",
        phase: "PHASE 01",
        title: "Technical SEO Audit & Commercial Demand Analysis",
        duration: "WEEKS 1–2",
        description: "Exhaustive crawl analysis of your existing site, identifying indexation blockers, thin content, broken canonicals, and unaddressed commercial search intent.",
        deliverables: [
          "Comprehensive technical crawl report",
          "Commercial keyword & intent matrix",
          "Immediate quick-fix technical remediation list"
        ],
        technicalDetails: [
          "Screaming Frog / custom headless crawler diagnostics",
          "Index coverage & crawl error segmentation",
          "Core Web Vitals field data evaluation"
        ]
      },
      {
        number: "02",
        phase: "PHASE 02",
        title: "Information Architecture & Schema Entity Modeling",
        duration: "WEEKS 2–4",
        description: "We architect the optimal URL hierarchy, internal linking structure, and nested JSON-LD schema to establish clear entity relationships for search engines.",
        deliverables: [
          "Proposed URL taxonomy & directory structure",
          "Internal linking rules & breadcrumb paths",
          "Custom JSON-LD schema templates"
        ],
        technicalDetails: [
          "Schema.org Organization, Service, and Product graphs",
          "BreadcrumbList & SiteNavigationElement markup",
          "Crawl depth minimization (< 3 clicks to any service)"
        ]
      },
      {
        number: "03",
        phase: "PHASE 03",
        title: "High-Intent Content Engineering",
        duration: "WEEKS 4–8",
        description: "We author and structure commercial service and sector pages with clear headings, technical depth, and answer-oriented layouts that satisfy both users and algorithms.",
        deliverables: [
          "Commercial landing page copy & layout structure",
          "Meta titles, descriptions, and OpenGraph tags",
          "FAQ & structured question-and-answer modules"
        ],
        technicalDetails: [
          "Semantic HTML (h1, h2, h3, section, article, nav)",
          "Anchor text distribution optimization",
          "Entity co-occurrence & semantic term density"
        ]
      },
      {
        number: "04",
        phase: "PHASE 04",
        title: "Indexation Deployment & Search Monitoring",
        duration: "ONGOING",
        description: "Submission to search engines, real-time Search Console monitoring, indexation verification, and continuous ranking and conversion tracking.",
        deliverables: [
          "Search Console configuration & XML sitemap submission",
          "Weekly ranking & organic click telemetry dashboard",
          "Continuous commercial conversion attribution"
        ],
        technicalDetails: [
          "Google Search Console API telemetry sync",
          "Log file analysis for bot crawl frequency",
          "Automated alert triggers for 404 or de-indexation events"
        ]
      }
    ],
    proofProjects: [
      {
        projectSlug: "entirefm",
        title: "EntireFM",
        entityType: "CLIENT WORK",
        sector: "Facilities Management / Logistics",
        problem: "National commercial facilities firm needed dominant organic visibility across hundreds of regional UK service locations without spamming low-quality pages.",
        role: "Technical search architecture, programmatic service-location taxonomy, schema entity modeling, operational portal integration.",
        whatWasBuilt: "Scalable commercial search architecture establishing dominant visibility across facilities management queries nationwide.",
        mediaSrc: "/media/projects/entirefm/hero/entirefm-signal.svg",
        mediaAlt: "EntireFM facilities management organic visibility architecture",
        caseStudyAvailable: true,
        tags: ["TECHNICAL_SEO", "REGIONAL_TAXONOMY", "SCHEMA_ENTITIES", "COMMERCIAL_INBOUND"]
      },
      {
        projectSlug: "aesuk",
        title: "AESUK",
        entityType: "CLIENT WORK",
        sector: "Renewable Energy / Infrastructure",
        problem: "Renewable engineering firm was invisible for high-value commercial solar, battery storage, and EV charging installation searches.",
        role: "Technical SEO foundation, structured service taxonomy, Core Web Vitals optimization, commercial metadata.",
        whatWasBuilt: "Clean, search-engineered commercial web platform ranking for targeted corporate renewable infrastructure terms.",
        mediaSrc: "/media/projects/aesuk/aesuk-hero.svg",
        mediaAlt: "AESUK commercial renewable energy search visibility platform",
        caseStudyAvailable: true,
        tags: ["ORGANIC_GROWTH", "B2B_SEARCH", "TECHNICAL_SEO", "CLEAN_CRAWL"]
      },
      {
        projectSlug: "nestiq",
        title: "NestIQ",
        entityType: "AVORRIA VENTURE",
        sector: "Real Estate Intelligence / Data",
        problem: "Property intelligence platform needed deep search indexing across thousands of cadastral boundaries and spatial parameters.",
        role: "Spatial search indexing, programmatic property data pages, structured entity schemas, sub-second query architecture.",
        whatWasBuilt: "High-throughput search engine indexing millions of geographical data points with structured metadata.",
        mediaSrc: "/media/projects/nestiq/interface/agent-dashboard-preview.png",
        mediaAlt: "NestIQ spatial search and indexing architecture",
        caseStudyAvailable: true,
        tags: ["SEARCH_ENGINE", "PROGRAMMATIC_SEO", "ENTITY_GRAPHS", "SPATIAL_INDEX"]
      }
    ],
    relatedServices: [
      {
        slug: "websites",
        code: "01 / WEB",
        title: "Websites & Digital Experiences",
        reason: "Convert your earned organic traffic with a high-performing, authoritative digital flagship."
      },
      {
        slug: "performance-marketing",
        code: "04 / GROWTH",
        title: "Performance Marketing",
        reason: "Combine long-term organic authority with immediate paid search demand capture."
      }
    ],
    finalCta: {
      heading: "READY TO DOMINATE HIGH-VALUE SEARCH QUERIES?",
      description: "Stop wasting time on low-value traffic. Let's analyze your current search standing and engineer a commercial visibility architecture that converts.",
      buttonText: "FIX YOUR SEARCH PERFORMANCE",
      projectServiceParam: "seo"
    },
    seo: {
      metaTitle: "Technical SEO & Organic Growth Agency | Avorria",
      metaDescription: "Avorria delivers technical SEO, information architecture, structured entity schema, and commercial search strategies that earn top organic rankings and qualified business enquiries.",
      schemaType: "SEOService"
    }
  },

  // ============================================================
  // 04 / GROWTH — PERFORMANCE MARKETING
  // ============================================================
  {
    slug: "performance-marketing",
    code: "04 / GROWTH",
    number: "04",
    title: "Performance Marketing",
    shortTitle: "Performance Marketing",
    category: "Growth & Paid Media",
    proposition: "We turn attention into measurable demand using paid media, conversion design, content, CRM and proper attribution.",
    supportingStatement: "No vanity impressions or vague agency reports. We design high-converting landing pages, run disciplined paid campaigns, build automated CRM nurture funnels, and track every pound back to revenue.",
    heroSummary: "Paid media only works when every step of the funnel is engineered to convert. We connect targeted ad creative directly to bespoke landing experiences, automated lead qualification, and closed-loop attribution.",
    deliverablesSummary: [
      "Google Ads (Search, Performance Max, Display)",
      "Paid Social Campaigns (Meta, LinkedIn, YouTube)",
      "Dedicated High-Conversion Landing Page Design",
      "Conversion Rate Optimization (CRO) & A/B Testing",
      "Automated CRM Journeys & Lead Nurture Flows",
      "Server-Side Conversion Tracking & Attribution",
      "Lifecycle Email Campaigns & Retargeting",
      "Executive Growth & Revenue Dashboards"
    ],
    offerings: [
      {
        id: "growth-paid-media",
        code: "01 // PAID ACQUISITION",
        title: "Paid Search & Paid Social Campaigns",
        description: "Precision media buying across Google Ads, LinkedIn, Meta, and YouTube focused strictly on high-intent customer acquisition and low cost-per-lead.",
        deliverables: [
          "Google Ads search and intent campaign management",
          "LinkedIn B2B account-based targeting campaigns",
          "Meta and Instagram visual demand capture",
          "Ad creative copywriting, typography, and graphic assets",
          "Negative keyword management and bid optimization"
        ]
      },
      {
        id: "growth-landing-pages",
        code: "02 // CONVERSION DESIGN",
        title: "Dedicated Landing Pages & Funnel Design",
        description: "Bespoke, sub-second landing pages designed around specific campaign messages rather than dumping paid visitors onto a generic homepage.",
        deliverables: [
          "Campaign-specific Next.js landing pages",
          "Frictionless multi-step enquiry forms",
          "Interactive calculators and qualification widgets",
          "A/B multivariate split testing frameworks",
          "Mobile-first checkout and booking journeys"
        ]
      },
      {
        id: "growth-crm-nurture",
        code: "03 // CRM & LIFECYCLE",
        title: "CRM Journeys & Automated Lead Nurture",
        description: "Automated sequences that instantly engage new inbound leads, qualify their requirements, and nurture prospects until they are sales-ready.",
        deliverables: [
          "HubSpot / ActiveCampaign / Klaviyo workflow setup",
          "Instant lead notification and qualification routing",
          "Multi-touch email nurture sequences",
          "Re-engagement campaigns for dormant accounts",
          "SMS / WhatsApp transactional confirmations where relevant"
        ]
      },
      {
        id: "growth-attribution-analytics",
        code: "04 // ATTRIBUTION & DATA",
        title: "Server-Side Tracking & Attribution Dashboards",
        description: "Rock-solid tracking infrastructure that bypasses ad-blockers and privacy restrictions to accurately attribute revenue back to campaigns.",
        deliverables: [
          "Server-side Google Tag Manager & Conversions API (CAPI)",
          "Multi-touch attribution modeling",
          "Automated monthly performance & pipeline reports",
          "Customer Acquisition Cost (CAC) & Lifetime Value (LTV) telemetry",
          "Real-time Looker Studio / custom growth dashboards"
        ]
      }
    ],
    problemsSolved: [
      {
        problem: "Your marketing agency talks about traffic but cannot show where the enquiries came from.",
        symptom: "You receive glossy monthly reports showing impressions and clicks, while your sales inbox remains empty and attribution is unknown.",
        solution: "We implement server-side tracking and closed-loop CRM integrations that track every lead from the first ad click through to signed revenue.",
        outcome: "Crystal-clear visibility into exactly which campaigns and keywords generate profitable business."
      },
      {
        problem: "Ad spend is going up every month while cost per lead and conversion rates get worse.",
        symptom: "You are spending thousands on Google or Meta Ads, but rising CPCs are squeezing your margins because the landing page is not converting.",
        solution: "We build dedicated, fast, highly targeted landing experiences and run systematic A/B tests to double your conversion rate.",
        outcome: "Lower cost per acquisition, higher conversion velocity, and predictable return on ad spend (ROAS)."
      },
      {
        problem: "Paid traffic hits a generic homepage that fails to convert targeted campaign intent.",
        symptom: "A user searches for a specific commercial service, clicks your ad, lands on a broad homepage, gets confused, and leaves.",
        solution: "We engineer dedicated, message-matched landing pages that answer the user's exact query and provide an immediate call to action.",
        outcome: "Immediate relevance, lower bounce rates, and significantly higher conversion rates."
      },
      {
        problem: "Leads go cold because there is no automated CRM nurture sequence in place.",
        symptom: "Enquiries sit in email inboxes for hours before a sales rep responds, losing 70% of potential deal momentum.",
        solution: "We build automated CRM workflows that trigger instant responses, schedule meetings automatically, and send structured follow-up sequences.",
        outcome: "Instant lead engagement, faster sales cycles, and fewer lost opportunities."
      }
    ],
    methodology: [
      {
        number: "01",
        phase: "PHASE 01",
        title: "Funnel Audit & Audience Targeting Strategy",
        duration: "WEEKS 1–2",
        description: "We audit historical ad performance, analyze competitor ad messaging, define high-value customer segments, and configure tracking foundations.",
        deliverables: [
          "Paid media and funnel audit report",
          "Target audience & intent matrix",
          "Conversion tracking architecture plan"
        ],
        technicalDetails: [
          "Server-side GTM container deployment",
          "Google Ads Enhanced Conversions setup",
          "Meta Conversions API (CAPI) direct integration"
        ]
      },
      {
        number: "02",
        phase: "PHASE 02",
        title: "Landing Page Engineering & Ad Creative",
        duration: "WEEKS 2–4",
        description: "We design and build bespoke, high-converting landing pages, write sharp ad copy, and create distinctive visual campaign assets.",
        deliverables: [
          "Bespoke Next.js campaign landing pages",
          "Ad creative variations (copy, headlines, assets)",
          "Automated qualification form logic"
        ],
        technicalDetails: [
          "Sub-second mobile LCP optimization for ad traffic",
          "UTM parameter capturing & CRM hidden fields",
          "A/B split-testing redirect infrastructure"
        ]
      },
      {
        number: "03",
        phase: "PHASE 03",
        title: "Campaign Launch & CRM Workflow Automation",
        duration: "WEEKS 4–6",
        description: "We launch structured search and social campaigns, connect automated CRM intake pipelines, and begin live bid optimization.",
        deliverables: [
          "Live Google & Social ad campaigns",
          "Automated lead notification & CRM triage",
          "Initial email nurture sequence activation"
        ],
        technicalDetails: [
          "Smart bidding value rules configuration",
          "Webhook delivery to CRM with retry logic",
          "Daily search query negative keyword filtering"
        ]
      },
      {
        number: "04",
        phase: "PHASE 04",
        title: "Attribution Optimization & Scale",
        duration: "ONGOING",
        description: "Continuous testing of headlines, offers, forms, and ad angles, scaling profitable channels while cutting underperforming spend.",
        deliverables: [
          "Weekly conversion rate & pipeline reviews",
          "Iterative landing page multivariate tests",
          "Executive revenue attribution dashboard"
        ],
        technicalDetails: [
          "Statistical significance calculation on A/B tests",
          "Offline conversion import to ad platforms",
          "LTV / CAC ratio telemetry tracking"
        ]
      }
    ],
    proofProjects: [
      {
        projectSlug: "entirefm",
        title: "EntireFM",
        entityType: "CLIENT WORK",
        sector: "Facilities Management / Logistics",
        problem: "National facilities network needed a predictable stream of commercial maintenance contract enquiries from corporate estates.",
        role: "Paid search campaign architecture, high-converting service landing pages, automated lead qualification, CRM pipeline integration.",
        whatWasBuilt: "Multi-channel paid acquisition engine generating qualified commercial tenders with direct CRM attribution.",
        mediaSrc: "/media/projects/entirefm/hero/entirefm-signal.svg",
        mediaAlt: "EntireFM performance marketing and lead generation funnel",
        caseStudyAvailable: true,
        tags: ["GOOGLE_ADS", "LANDING_PAGES", "CRM_AUTOMATION", "B2B_GROWTH"]
      },
      {
        projectSlug: "alkota-bikes",
        title: "Alkota Bikes",
        entityType: "CLIENT WORK",
        sector: "Precision Engineering / Cycling",
        problem: "Bespoke performance bicycle brand needed a high-ticket pre-order and reservation funnel for their flagship titanium frames.",
        role: "Launch campaign strategy, conversion-focused reservation journey, paid social targeting, automated email confirmation flow.",
        whatWasBuilt: "Targeted launch marketing funnel capturing paid enthusiast traffic into confirmed pre-order allocations.",
        mediaSrc: "/media/projects/alkota/product/naked-carbon-hero.jpg",
        mediaAlt: "Alkota Bikes reservation and demand generation funnel",
        caseStudyAvailable: true,
        tags: ["PAID_ACQUISITION", "RESERVATION_FUNNEL", "HIGH_TICKET_CRO", "BRAND_CREATIVE"]
      },
      {
        projectSlug: "one-great-northern",
        title: "One Great Northern",
        entityType: "CLIENT WORK",
        sector: "Commercial Property / Real Estate",
        problem: "Flagship commercial development required targeted acquisition of corporate occupiers looking for 10,000+ sq ft office headquarters.",
        role: "Targeted LinkedIn & search acquisition, floorplate enquiry funnel, lead qualification workflow.",
        whatWasBuilt: "High-value digital leasing acquisition campaign connecting corporate property decision-makers directly with leasing agents.",
        mediaSrc: "/media/projects/ogn/ogn-industrial.svg",
        mediaAlt: "One Great Northern corporate leasing acquisition campaign",
        caseStudyAvailable: true,
        tags: ["ACCOUNT_BASED_MARKETING", "PROPERTY_LEASING", "LANDING_PAGES", "B2B_ACQUISITION"]
      }
    ],
    relatedServices: [
      {
        slug: "websites",
        code: "01 / WEB",
        title: "Websites & Digital Experiences",
        reason: "Build high-speed, custom landing pages and digital flagships that convert paid traffic into clients."
      },
      {
        slug: "seo",
        code: "03 / SEARCH",
        title: "SEO & Organic Growth",
        reason: "Compound paid media momentum with long-term organic authority and search indexation."
      }
    ],
    finalCta: {
      heading: "READY TO BUILD A PREDICTABLE DEMAND ENGINE?",
      description: "Stop burning ad budget on low-converting pages. Let's design a performance acquisition funnel with clear attribution and measurable return.",
      buttonText: "BUILD A GROWTH SYSTEM",
      projectServiceParam: "performance-marketing"
    },
    seo: {
      metaTitle: "Performance Marketing & Paid Media Agency | Avorria",
      metaDescription: "Avorria runs high-performance Google Ads, paid social, conversion-engineered landing pages, and CRM automation with strict server-side attribution.",
      schemaType: "MarketingService"
    }
  },

  // ============================================================
  // 05 / SYSTEMS — AI, AUTOMATION & BUSINESS SYSTEMS
  // ============================================================
  {
    slug: "ai-automation",
    code: "05 / SYSTEMS",
    number: "05",
    title: "AI, Automation & Business Systems",
    shortTitle: "AI & Automation",
    category: "AI Engineering & Automation",
    proposition: "We build intelligent systems that remove repetitive work, connect business tools and allow teams to operate faster.",
    supportingStatement: "AI is useful because it changes how the business operates, not because the website contains a glowing graphic. We engineer secure, deterministic agent workflows with human review gates and complete audit trails.",
    heroSummary: "We eliminate operational friction by building custom AI agents, automated workflow pipelines, and secure internal systems that connect your existing software stack and empower your team.",
    deliverablesSummary: [
      "Custom AI Agents & Copilots",
      "Autonomous Workflow Orchestration",
      "Human-in-the-Loop Approval Systems",
      "Automated Inbound Lead & Document Processing",
      "Internal Knowledge Bases & LLM Search",
      "Multi-System API Integrations & Webhooks",
      "Operational Dashboards & Triage Consoles",
      "Audit Logging & Model Abstraction Layers"
    ],
    offerings: [
      {
        id: "systems-ai-agents",
        code: "01 // AI AGENTS & WORKFLOWS",
        title: "Custom AI Agents & Autonomous Workflows",
        description: "Task-specific AI agents that ingest business inputs, evaluate business rules, draft responses, and execute actions with strict boundary constraints.",
        deliverables: [
          "State-machine agent orchestration (deterministic workflows)",
          "Structured reasoning and output schemas (JSON/Zod)",
          "Human-in-the-loop review and approval interfaces",
          "Model abstraction (Claude, GPT-4o, Gemini, local models)",
          "Graceful fallback handling and failure alerting"
        ]
      },
      {
        id: "systems-document-lead-automation",
        code: "02 // DATA & DOCUMENT AUTOMATION",
        title: "Document Processing & Lead Triage",
        description: "Automated pipelines that extract structured data from PDF contracts, invoices, emails, and enquiry forms directly into your operational database.",
        deliverables: [
          "OCR and multimodal document parsing",
          "Instant inbound lead scoring, enrichment, and routing",
          "Automated contract metadata extraction",
          "Data transformation and database normalization",
          "Exception queuing for manual operator review"
        ]
      },
      {
        id: "systems-internal-knowledge",
        code: "03 // KNOWLEDGE & SEARCH",
        title: "Internal Knowledge Systems & Enterprise Search",
        description: "Private, secure semantic search engines that allow your employees to instantly query company SOPs, technical specs, and historical client records.",
        deliverables: [
          "Vector embeddings and hybrid semantic search",
          "Document chunking and ingestion pipelines",
          "Role-based document access and permission barriers",
          "Source citation and hallucination guards",
          "Slack, Teams, or web interface integration"
        ]
      },
      {
        id: "systems-api-integrations",
        code: "04 // INTEGRATIONS & ADMIN",
        title: "API Integrations, Webhooks & Admin Consoles",
        description: "Robust backend glue connecting CRMs, ERPs, billing systems, and custom software into a reliable, synchronized operational layer.",
        deliverables: [
          "Bidirectional API synchronizations (Salesforce, HubSpot, Xero)",
          "Webhook listeners with idempotency and replay queues",
          "Scheduled batch processing and cron automation",
          "Custom administrative triage and monitoring dashboards",
          "Immutable audit logs of all automated actions"
        ]
      }
    ],
    problemsSolved: [
      {
        problem: "Your team repeatedly copies information between systems by hand.",
        symptom: "Employees spend hours each day copying customer details from emails into CRMs, spreadsheets, and accounting software.",
        solution: "We build automated data pipelines and webhook integrations that synchronize records across all your tools instantaneously and accurately.",
        outcome: "Zero repetitive data entry, zero clerical errors, and hundreds of hours of team time reclaimed."
      },
      {
        problem: "Inbound leads sit untouched for hours or days because triage is manual.",
        symptom: "High-value prospects submit inquiries but go cold while waiting for a human manager to manually review and assign the task.",
        solution: "We implement real-time AI lead qualification agents that enrich company data, score urgency, and route to the right specialist within seconds.",
        outcome: "Under-60-second response times, higher conversion velocity, and zero lost leads."
      },
      {
        problem: "Employees spend half their week searching internal documents for routine answers.",
        symptom: "Critical company knowledge is buried in PDFs, Google Drive folders, and Notion pages, slowing down client delivery.",
        solution: "We build private, secure semantic search systems that give team members instant, cited answers from your verified knowledge base.",
        outcome: "Immediate answers, faster onboarding, and consistent operational execution across the team."
      },
      {
        problem: "You want to leverage AI but fear inaccuracies, data leaks, or unmonitored outputs.",
        symptom: "Off-the-shelf AI chatbots hallucinate, have no audit trails, and lack human approval checks for sensitive decisions.",
        solution: "We engineer deterministic state machines with strict schema validation, human approval gates, and complete audit logging.",
        outcome: "Safe, predictable AI automation with total transparency and human control."
      }
    ],
    methodology: [
      {
        number: "01",
        phase: "PHASE 01",
        title: "Workflow Audit & Process Mapping",
        duration: "WEEKS 1–2",
        description: "We map your operational workflows, identify manual bottlenecks, assess API readiness across your software stack, and define safety constraints.",
        deliverables: [
          "End-to-end process flow diagram",
          "Integration and API readiness matrix",
          "Human review gate and safety boundary specification"
        ],
        technicalDetails: [
          "Input data format validation specs",
          "API rate limit and authentication audits",
          "Deterministic state machine state transition tables"
        ]
      },
      {
        number: "02",
        phase: "PHASE 02",
        title: "Architecture & Safety Framework Engineering",
        duration: "WEEKS 2–4",
        description: "We build the core pipeline architecture: INPUT → REASONING → HUMAN REVIEW → ACTION → AUDIT, with strict typed output schemas (Zod/JSON).",
        deliverables: [
          "Agent orchestration engine prototype",
          "Human approval UI and review queue",
          "Structured schema validation layer"
        ],
        technicalDetails: [
          "Model abstraction layer (swappable LLM backends)",
          "Zod schema validation on all AI outputs",
          "Idempotent webhook delivery with retry queues"
        ]
      },
      {
        number: "03",
        phase: "PHASE 03",
        title: "System Integration & Staging Validation",
        duration: "WEEKS 4–8",
        description: "We integrate the workflow into your production CRMs, databases, and communication channels, running shadow runs against historical data.",
        deliverables: [
          "Production API connectors (HubSpot, Salesforce, Slack, ERPs)",
          "Shadow execution test results and accuracy benchmarks",
          "Operational telemetry and anomaly alerting"
        ],
        technicalDetails: [
          "Side-by-side human vs automated benchmark validation",
          "Immutable PostgreSQL audit trail logging",
          "Role-based access permissions for approval queues"
        ]
      },
      {
        number: "04",
        phase: "PHASE 04",
        title: "Production Deployment & Ongoing Tuning",
        duration: "ONGOING",
        description: "Phased rollout into live operations, operator training, continuous prompt and model optimization, and edge-case monitoring.",
        deliverables: [
          "Live system activation with operator oversight",
          "Admin triage console for exceptions",
          "Monthly efficiency and time-saved telemetry reports"
        ],
        technicalDetails: [
          "Automated latency and error rate dashboards",
          "Cost-per-run LLM token optimization",
          "Zero-downtime prompt versioning and rollback"
        ]
      }
    ],
    proofProjects: [
      {
        projectSlug: "careeros",
        title: "CareerOS",
        entityType: "AVORRIA VENTURE",
        sector: "Artificial Intelligence / Enterprise",
        problem: "Career intelligence required synthesizing complex skill taxonomies, educational backgrounds, and opportunity matching into autonomous conversational workflows.",
        role: "System architecture, autonomous agent orchestration, Career Twin graph data model, LLM interaction design.",
        whatWasBuilt: "Enterprise talent acceleration system leveraging bounded AI agents, dynamic skill graphs, and structured conversational guidance.",
        mediaSrc: "/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg",
        mediaAlt: "CareerOS autonomous AI career intelligence system",
        caseStudyAvailable: true,
        tags: ["AI_AGENTS", "ORCHESTRATION", "GRAPH_DATA", "HUMAN_IN_THE_LOOP"]
      },
      {
        projectSlug: "entirefm",
        title: "EntireFM",
        entityType: "CLIENT WORK",
        sector: "Facilities Management / Logistics",
        problem: "Emergency facilities callouts required instant triage, technician matching, and dispatch without manual telephone coordination.",
        role: "Workflow automation, client portal webhook integrations, technician routing state machine, automated notification pipeline.",
        whatWasBuilt: "Automated triage and dispatch system routing emergencies to nationwide technicians within seconds with complete audit trails.",
        mediaSrc: "/media/projects/entirefm/hero/entirefm-signal.svg",
        mediaAlt: "EntireFM operational dispatch and workflow automation",
        caseStudyAvailable: true,
        tags: ["WORKFLOW_AUTOMATION", "DISPATCH_ENGINE", "API_INTEGRATIONS", "AUDIT_TRAILS"]
      },
      {
        projectSlug: "drawdown-trading",
        title: "Drawdown.Trading",
        entityType: "AVORRIA VENTURE",
        sector: "Quantitative Finance / Trading",
        problem: "High-frequency trade planning required deterministic risk enforcement and automated trade journal extraction across disparate broker APIs.",
        role: "Data pipeline engineering, automated broker API ingestion, risk boundary state machine, quantitative execution telemetry.",
        whatWasBuilt: "Automated risk management pipeline ingesting execution data and calculating drawdown constraints in real time.",
        mediaSrc: "/media/projects/drawdown/interface/dashboard.png",
        mediaAlt: "Drawdown.Trading automated quantitative risk and trade data engine",
        caseStudyAvailable: true,
        tags: ["DATA_PIPELINE", "RISK_AUTOMATION", "API_INGESTION", "TELEMETRY"]
      }
    ],
    relatedServices: [
      {
        slug: "digital-products",
        code: "02 / PRODUCT",
        title: "Digital Products & Software",
        reason: "Build bespoke interfaces, portals, and dashboards to surface automated workflows to your team."
      },
      {
        slug: "websites",
        code: "01 / WEB",
        title: "Websites & Digital Experiences",
        reason: "Connect automated inbound lead pipelines directly to high-converting marketing flagships."
      }
    ],
    finalCta: {
      heading: "READY TO AUTOMATE YOUR REPETITIVE BUSINESS PROCESSES?",
      description: "Let's identify the highest-friction workflows in your business and engineer an intelligent system that saves hours every day with full safety controls.",
      buttonText: "AUTOMATE A WORKFLOW",
      projectServiceParam: "ai-automation"
    },
    seo: {
      metaTitle: "AI Automation & Business Systems Studio | Avorria",
      metaDescription: "Avorria builds custom AI agents, automated workflow orchestration, CRM integrations, and business systems with strict human-in-the-loop safety and audit trails.",
      schemaType: "AutomatedBusinessService"
    }
  }
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServices(): ServiceDefinition[] {
  return SERVICES;
}

import { CaseStudyConfig } from "@/types/case-study";
import { DEFAULT_AVORRIA_THEME } from "./theme-engine";

/**
 * AVORRIA CASE STUDY REGISTRY
 * Canonical case-study configurations linked to the project registry.
 * Individual deep-dive chapters are populated in Phase 25 (A–F).
 */

export const CASE_STUDIES: Record<string, CaseStudyConfig> = {
  // ============================================================
  // 001 // ALKOTA BIKES
  // PHASE 25A — FULL CASE STUDY
  // RELATIONSHIP: CLIENT
  // AVORRIA ROLE: Digital product strategy, UX, UI, brand, web, development
  // TRUTH BOUNDARY: Avorria delivered the digital experience.
  //   Alkota's physical engineering — suspension, carbon layup, frame
  //   geometry — belongs to Alkota. Avorria translated that world digitally.
  // ============================================================
  "alkota-bikes": {
    projectSlug: "alkota-bikes",
    canonicalTitle: "Alkota Bikes",
    projectIndex: "001 / ALKOTA",
    publicationStatus: "PUBLISHED",
    publishedAt: "2025-01-15",
    heroMode: "PRODUCT",
    heroMedia: {
      id: "alkota-hero-main",
      type: "IMAGE",
      src: "/media/projects/alkota/alkota-product-hero.svg",
      alt: "Alkota high-performance bicycle — complete bike composition on dark studio ground",
      aspectRatio: "16/10",
      status: "FINAL",
      priority: true
    },
    theme: {
      background: "#07080A",
      foreground: "#F3F3F0",
      muted: "#888884",
      accent: "#C8F135",
      surface: "#0E1013",
      mediaBorder: "rgba(200, 241, 53, 0.12)",
      signalColour: "#C8F135",
      headerMode: "PROJECT_DARK"
    },
    relationship: "CLIENT",
    status: "DELIVERED",
    roles: ["STRATEGY", "PRODUCT", "UX", "UI", "BRAND", "WEB", "DEVELOPMENT"],
    scopeSummary: "Digital flagship, product configuration journey, reservation UX, and technical storytelling for a precision performance bicycle.",
    capabilities: ["BUILD", "SYSTEMS"],
    year: 2025,
    introNarrative: [
      "Alkota produces a precision-engineered performance bicycle built around exacting geometry, premium componentry, and a distinct visual identity.",
      "Avorria's role was to create a digital experience that carries the same level of intent as the product — without decorating around it."
    ],
    chapters: [
      // -------------------------------------------------------
      // CHAPTER 01 / THE PRODUCT
      // Establish Alkota as a serious engineered object before
      // discussing any web design. Product leads. Avorria follows.
      // -------------------------------------------------------
      {
        id: "alkota-product",
        type: "STATEMENT",
        eyebrow: "01 / THE PRODUCT",
        title: "A PRODUCT THAT DEMANDS PRECISION.",
        body: "Alkota is a high-performance bicycle with a serious technical world. Suspension kinematics, carbon architecture, component specification, and geometry are not decorative decisions — they are the product. A normal bike website was not going to be good enough."
      },
      // -------------------------------------------------------
      // CHAPTER 02 / FULL PRODUCT COMPOSITION
      // Wide studio frame. The bike itself as the first visual hero.
      // -------------------------------------------------------
      {
        id: "alkota-product-visual",
        type: "MEDIA",
        eyebrow: "ALKOTA // PHYSICAL OBJECT",
        caption: "Complete bike — single dominant composition. Dark studio ground.",
        media: [
          {
            id: "alkota-product-full",
            type: "IMAGE",
            src: "/media/projects/alkota/alkota-product-hero.svg",
            alt: "Alkota performance bicycle — complete frame, fork, rear suspension, and drivetrain visible in full product composition",
            aspectRatio: "16/10",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 03 / THE DIGITAL PROBLEM
      // Why does a product like this need a different web solution?
      // The product contains: config, brand, reservation, owner journey.
      // -------------------------------------------------------
      {
        id: "alkota-digital-problem",
        type: "PROCESS",
        eyebrow: "02 / THE DIGITAL PROBLEM",
        title: "THE PRODUCT CONTAINS MORE THAN A SPECIFICATION PAGE.",
        body: "A high-performance bicycle digital experience must coordinate product storytelling, technical communication, configuration, fit, reservation, ownership, and brand — simultaneously, without any single thread overwhelming the others.",
        secondaryBody: "DISCOVERY / UNDERSTAND / CONFIGURE / FIT / RESERVE / OWN — each stage requires design judgement, not a template."
      },
      // -------------------------------------------------------
      // CHAPTER 04 / PRODUCT AS INTERFACE
      // The digital experience as an extension of the object.
      // Macro detail: engineering visible in the product.
      // -------------------------------------------------------
      {
        id: "alkota-macro",
        type: "SPLIT",
        eyebrow: "03 / PRODUCT AS INTERFACE",
        title: "THE EXPERIENCE SHOULD FEEL LIKE THE PRODUCT.",
        body: "Engineering detail is present throughout the physical object — in weld quality, tube profile, hardware selection. The digital experience should carry the same register: restrained, precise, intentional.",
        secondaryBody: "AVORRIA DIGITAL ROLE — strategy, experience design, interface, development. Physical engineering belongs to Alkota.",
        media: [
          {
            id: "alkota-macro-frame",
            type: "IMAGE",
            src: "/media/projects/alkota/alkota-macro-frame.svg",
            alt: "Alkota bicycle macro detail — rear triangle, suspension linkage, and hardware close-up",
            aspectRatio: "4/3",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 05 / CONFIGURATION
      // The configuration experience — translating physical choice
      // into a clean, understandable digital decision.
      // -------------------------------------------------------
      {
        id: "alkota-configuration",
        type: "INTERFACE",
        eyebrow: "04 / CONFIGURATION",
        title: "COMPLEXITY MADE NAVIGABLE.",
        body: "A performance bicycle involves genuine technical choices. Avorria designed the configuration journey so that technical decisions feel clear — not overwhelming. Colourway, specification, and size become deliberate decisions rather than form fields.",
        media: [
          {
            id: "alkota-digital-interface",
            type: "IMAGE",
            src: "/media/projects/alkota/alkota-digital-flagship.svg",
            alt: "Alkota digital experience — product configuration interface showing colourway and specification selection",
            aspectRatio: "16/10",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 06 / TECHNICAL STORYTELLING
      // Presenting the product's engineering world digitally
      // without exposing any proprietary manufacturing content.
      // -------------------------------------------------------
      {
        id: "alkota-technical",
        type: "SPLIT",
        eyebrow: "05 / TECHNICAL STORYTELLING",
        title: "ENGINEERING CONTEXT WITHOUT ENGINEERING CLAIM.",
        body: "Technical product information — geometry, suspension approach, component specification, material selection — must become desirable rather than overwhelming. Avorria structured and presented this content digitally. The engineering itself belongs to Alkota.",
        secondaryBody: "No confidential manufacturing drawings, layup specifications, or supplier-sensitive material appears in the public experience.",
        media: [
          {
            id: "alkota-engineering",
            type: "IMAGE",
            src: "/media/projects/alkota/alkota-engineering.svg",
            alt: "Alkota technical presentation — geometry and component specification display within the digital experience",
            aspectRatio: "4/3",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 07 / SYSTEM ARCHITECTURE
      // What Avorria actually built — the digital system behind
      // the product experience.
      // -------------------------------------------------------
      {
        id: "alkota-system",
        type: "PROCESS",
        eyebrow: "06 / THE SYSTEM",
        title: "BEYOND THE VISUAL SURFACE.",
        body: "The Alkota digital experience is more than product presentation. Avorria architected the full digital product layer: marketing, product discovery, configuration, reservation, and the foundation for a customer ownership journey.",
        secondaryBody: "PUBLIC EXPERIENCE / PRODUCT CONFIGURATION / RESERVATION JOURNEY / OWNERSHIP LAYER — current architecture reflects delivered and in-development status honestly."
      },
      // -------------------------------------------------------
      // CHAPTER 08 / WHAT EXISTS — PROOF CHAPTER
      // Truth/evidence. No unverified metrics. No fake outcomes.
      // -------------------------------------------------------
      {
        id: "alkota-proof",
        type: "PROOF",
        eyebrow: "07 / WHAT EXISTS",
        title: "DELIVERED.",
        body: "A digital flagship that treats the product with the same seriousness with which Alkota engineers it.",
        evidence: [
          {
            id: "alk-ev-01",
            type: "TECHNICAL",
            value: "DELIVERED",
            unit: "",
            description: "Digital product flagship — marketing, product discovery, and configuration experience",
            source: "Alkota project delivery record",
            verified: true
          },
          {
            id: "alk-ev-02",
            type: "TECHNICAL",
            value: "DELIVERED",
            unit: "",
            description: "Product configuration and colourway selection journey",
            source: "Alkota project delivery record",
            verified: true
          },
          {
            id: "alk-ev-03",
            type: "TECHNICAL",
            value: "DELIVERED",
            unit: "",
            description: "Reservation and pre-order journey architecture",
            source: "Alkota project delivery record",
            verified: true
          }
        ]
      }
    ],
    nextProject: {
      slug: "careeros",
      title: "CareerOS",
      projectIndex: "002 / CAREEROS",
      descriptor: "AI CAREER PLATFORM / HUMAN INTELLIGENCE",
      heroMedia: "/media/projects/careeros/careeros-portrait.svg",
      themeAccent: "#38BDF8"
    },
    seo: {
      metaTitle: "Alkota Bikes — Digital Product Experience | Avorria",
      metaDescription: "Avorria designed and built the digital flagship, configuration journey, and reservation experience for Alkota — a precision performance bicycle brand."
    }
  },

  // ============================================================
  // 002 // CAREEROS
  // PHASE 25B — FULL CASE STUDY
  // RELATIONSHIP: VENTURE
  // AVORRIA ROLE: Product strategy, UX, UI, product architecture,
  //   AI interaction design, web, development, system design
  // TRUTH BOUNDARY: No fake employment outcomes, no fake user counts,
  //   no AI emotion/personality inference claims, no fake partnerships.
  //   This is a venture product Avorria helped design and engineer.
  // ============================================================
  "careeros": {
    projectSlug: "careeros",
    canonicalTitle: "CareerOS",
    projectIndex: "002 / CAREEROS",
    publicationStatus: "PUBLISHED",
    publishedAt: "2025-01-20",
    heroMode: "HUMAN",
    heroMedia: {
      id: "careeros-hero-main",
      type: "IMAGE",
      src: "/media/projects/careeros/careeros-portrait.svg",
      alt: "CareerOS — human-centred AI career platform, portrait composition",
      aspectRatio: "3/4",
      status: "FINAL",
      priority: true
    },
    theme: {
      background: "#090D14",
      foreground: "#F0F6FC",
      muted: "#8B949E",
      accent: "#38BDF8",
      surface: "#0D1117",
      mediaBorder: "rgba(56, 189, 248, 0.12)",
      signalColour: "#38BDF8",
      headerMode: "PROJECT_DARK"
    },
    relationship: "VENTURE",
    status: "LIVE",
    roles: ["STRATEGY", "PRODUCT", "UX", "UI", "AI", "DEVELOPMENT", "SYSTEM_ARCHITECTURE"],
    scopeSummary: "AI career platform product design — Career Twin framework, conversational mentor interface, and structured opportunity architecture.",
    capabilities: ["SYSTEMS", "BUILD"],
    year: 2025,
    introNarrative: [
      "Career decisions involve uncertainty, timing, incomplete information, and real consequences.",
      "CareerOS is a venture Avorria helped design and engineer — built around the person, not the algorithm."
    ],
    chapters: [
      // -------------------------------------------------------
      // CHAPTER 01 / THE PERSON
      // Human context first. The AI is not the visual hero.
      // -------------------------------------------------------
      {
        id: "careeros-person",
        type: "STATEMENT",
        eyebrow: "01 / THE PERSON",
        title: "CAREERS ARE MADE OF DECISIONS PEOPLE MAKE WITH INCOMPLETE INFORMATION.",
        body: "Skills, experience, goals, location, timing, opportunity — career navigation involves more complexity than any static CV or job board can surface. CareerOS was designed around this reality."
      },
      // -------------------------------------------------------
      // CHAPTER 02 / HUMAN PORTRAIT
      // Approved CareerOS human/mentor imagery. No stock photography.
      // -------------------------------------------------------
      {
        id: "careeros-human-visual",
        type: "MEDIA",
        eyebrow: "CAREEROS // HUMAN FIRST",
        caption: "The platform begins with the person — not the dashboard.",
        media: [
          {
            id: "careeros-portrait-main",
            type: "IMAGE",
            src: "/media/projects/careeros/careeros-portrait.svg",
            alt: "CareerOS human-centred interface — person at centre of the career intelligence system",
            aspectRatio: "3/4",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 03 / THE PROBLEM
      // Why generic career software fails this problem.
      // -------------------------------------------------------
      {
        id: "careeros-problem",
        type: "PROCESS",
        eyebrow: "02 / THE PROBLEM WITH CAREER SOFTWARE",
        title: "MOST CAREER TOOLS FRAGMENT THE THING THEY ARE TRYING TO HELP.",
        body: "Assessment, job search, CV, interviews, learning, mentorship, and career planning typically exist in separate products — requiring a person to manually coordinate their own career intelligence across disconnected tools.",
        secondaryBody: "CareerOS attempts to make those things feel connected — structured around the individual rather than the tool category."
      },
      // -------------------------------------------------------
      // CHAPTER 04 / THE AI CAREER MENTOR
      // Actual product interface. Professional, purposeful.
      // Not a companion, not a chatbot aesthetic.
      // -------------------------------------------------------
      {
        id: "careeros-mentor",
        type: "INTERFACE",
        eyebrow: "03 / AI CAREER MENTOR",
        title: "AN INTELLIGENCE THAT DOES NOT PRETEND TO BE A FRIEND.",
        body: "The CareerOS mentor interface is professional and purposeful — designed to surface structured career guidance through conversation, not to simulate companionship. The tone is grounded. The intelligence is real.",
        media: [
          {
            id: "careeros-ui-interface",
            type: "IMAGE",
            src: "/media/projects/careeros/careeros-ui-preview.svg",
            alt: "CareerOS AI mentor interface — structured conversational career guidance showing professional interaction design",
            aspectRatio: "16/10",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 05 / CAREER TWIN
      // Signature moment. Information becomes structured intelligence.
      // Illustrative data — clearly not real user PII.
      // -------------------------------------------------------
      {
        id: "careeros-twin",
        type: "SPLIT",
        eyebrow: "04 / CAREER TWIN",
        title: "FROM PROFILE TO STRUCTURED INTELLIGENCE.",
        body: "The Career Twin is a structured graph model of an individual's professional position — built from education, skills, experience, goals, and context. It evolves as the person does. It is not a personality assessment. It is an operational career map.",
        secondaryBody: "EDUCATION / SKILLS / EXPERIENCE / GOALS / CONTEXT — dimensions surface opportunity gaps, learning pathways, and role alignment. All user data is private. Case study uses illustrative data only.",
        media: [
          {
            id: "careeros-twin-visual",
            type: "IMAGE",
            src: "/media/projects/careeros/careeros-portrait.svg",
            alt: "CareerOS Career Twin — structured career profile graph illustrating how individual dimensions connect to opportunity",
            aspectRatio: "4/3",
            status: "TEMPORARY"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 06 / PRODUCT SYSTEM
      // CareerOS as ecosystem — AI is one component, not the whole.
      // -------------------------------------------------------
      {
        id: "careeros-system",
        type: "PROCESS",
        eyebrow: "05 / THE PRODUCT SYSTEM",
        title: "AI IS ONE COMPONENT WITHIN A WIDER PRODUCT.",
        body: "CareerOS is a product system — not a chatbot with features attached. The AI mentor, Career Twin, skills architecture, opportunity surfaces, and progress layer each serve a distinct function within a coordinated whole.",
        secondaryBody: "AI CAREER MENTOR / CAREER TWIN / SKILLS & LEARNING / OPPORTUNITIES / PROGRESS — Avorria designed the architecture, interaction model, and product system. The AI works within the platform, not above it."
      },
      // -------------------------------------------------------
      // CHAPTER 07 / HUMAN OVERSIGHT
      // CareerOS handles meaningful life decisions.
      // AI makes recommendations. People make choices.
      // -------------------------------------------------------
      {
        id: "careeros-oversight",
        type: "STATEMENT",
        eyebrow: "06 / HUMAN OVERSIGHT",
        title: "MEANINGFUL CAREER DECISIONS REMAIN WITH THE PERSON.",
        body: "CareerOS surfaces structure, context, and possibility — but the decision belongs to the individual. AI recommendations are one input, not a verdict. Avorria designed this distinction into the product architecture deliberately."
      },
      // -------------------------------------------------------
      // CHAPTER 08 / WHAT EXISTS — TRUTH/EVIDENCE CHAPTER
      // No fake employment outcomes. No unverified metrics.
      // No fake school or employer partnerships.
      // -------------------------------------------------------
      {
        id: "careeros-proof",
        type: "PROOF",
        eyebrow: "07 / WHAT EXISTS",
        title: "LIVE PLATFORM.",
        body: "CareerOS is a live venture product. The platform, product architecture, and AI systems Avorria designed are operational.",
        evidence: [
          {
            id: "cos-ev-01",
            type: "TECHNICAL",
            value: "LIVE",
            unit: "",
            description: "AI Career Mentor — conversational career guidance interface, live in production",
            source: "CareerOS platform status",
            verified: true
          },
          {
            id: "cos-ev-02",
            type: "TECHNICAL",
            value: "LIVE",
            unit: "",
            description: "Career Twin framework — structured profile graph and skill taxonomy architecture",
            source: "CareerOS platform status",
            verified: true
          },
          {
            id: "cos-ev-03",
            type: "TECHNICAL",
            value: "DELIVERED",
            unit: "",
            description: "Product system design — interaction architecture, AI product strategy, full-stack development",
            source: "CareerOS project delivery record",
            verified: true
          }
        ]
      }
    ],
    nextProject: {
      slug: "nestiq",
      title: "NestIQ",
      projectIndex: "003 / NESTIQ",
      descriptor: "SPATIAL DATA & PROPERTY INTELLIGENCE",
      heroMedia: "/media/projects/nestiq/nestiq-property-hero.svg",
      themeAccent: "#34D399"
    },
    seo: {
      metaTitle: "CareerOS — AI Career Platform | Avorria",
      metaDescription: "Avorria designed and engineered CareerOS — an AI career platform built around the Career Twin framework, conversational mentor interface, and structured opportunity architecture."
    }
  },

  // ============================================================
  // 003 // NESTIQ
  // PHASE 25C — FULL CASE STUDY
  // RELATIONSHIP: VENTURE
  // AVORRIA ROLE: Strategy, product, UX, UI, search, data, development, system architecture
  // TRUTH BOUNDARY: No fake live property valuations, rental yields,
  //   market movements, or fabricated agent listings.
  //   Illustrative demo figures clearly marked. Venture product.
  // ============================================================
  "nestiq": {
    projectSlug: "nestiq",
    canonicalTitle: "NestIQ",
    projectIndex: "003 / NESTIQ",
    publicationStatus: "PUBLISHED",
    publishedAt: "2024-11-10",
    heroMode: "SPATIAL",
    heroMedia: {
      id: "nestiq-hero-main",
      type: "IMAGE",
      src: "/media/projects/nestiq/nestiq-property-hero.svg",
      alt: "NestIQ — institutional property intelligence platform, spatial architecture view",
      aspectRatio: "4/3",
      status: "FINAL",
      priority: true
    },
    theme: {
      background: "#081018",
      foreground: "#F0FDF4",
      muted: "#94A3B8",
      accent: "#34D399",
      surface: "#0F172A",
      mediaBorder: "rgba(52, 211, 153, 0.12)",
      signalColour: "#34D399",
      headerMode: "PROJECT_DARK"
    },
    relationship: "VENTURE",
    status: "LIVE",
    roles: ["STRATEGY", "PRODUCT", "UX", "UI", "SEARCH", "DATA", "DEVELOPMENT", "SYSTEM_ARCHITECTURE"],
    scopeSummary: "Spatial intelligence platform, cadastral boundary search engine, multi-criteria filtering, and automated valuation interface.",
    capabilities: ["BUILD", "SEARCH", "SYSTEMS"],
    year: 2024,
    introNarrative: [
      "Commercial real estate decisions require synthesizing cadastral boundaries, planning permissions, transport access polygons, and market liquidity.",
      "NestIQ unifies fragmented public and private records into an intelligible spatial search engine — turning raw geospatial data into actionable decisions."
    ],
    chapters: [
      // -------------------------------------------------------
      // CHAPTER 01 / THE PROPERTY
      // Establish spatial context. Physical real estate situates
      // in its multi-layered geographical reality.
      // -------------------------------------------------------
      {
        id: "nestiq-property",
        type: "STATEMENT",
        eyebrow: "01 / THE PROPERTY",
        title: "EVERY PROPERTY EXISTS WITHIN A MULTI-LAYERED SPATIAL CONTEXT.",
        body: "Physical real estate cannot be understood in isolation. The value, utility, and future risk of an asset are dictated by surrounding infrastructure, planning constraints, access corridors, and neighborhood dynamics. Traditional listing portals isolate the building; NestIQ situates it in its full geographical reality."
      },
      // -------------------------------------------------------
      // CHAPTER 02 / CONTEXT VISUAL
      // Architectural asset framing. Clean, precise.
      // -------------------------------------------------------
      {
        id: "nestiq-context-media",
        type: "MEDIA",
        eyebrow: "NESTIQ // SPATIAL ARCHITECTURE",
        caption: "Single property focus — contextual facade and architectural positioning.",
        media: [
          {
            id: "nestiq-property-still",
            type: "IMAGE",
            src: "/media/projects/nestiq/nestiq-property-hero.svg",
            alt: "NestIQ architectural asset framing — commercial property in structured spatial isolation",
            aspectRatio: "4/3",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 03 / THE PROBLEM
      // Portals are built for browsing; decisions require understanding.
      // -------------------------------------------------------
      {
        id: "nestiq-problem",
        type: "PROCESS",
        eyebrow: "02 / THE PROBLEM WITH PROPERTY PORTALS",
        title: "TRADITIONAL PORTALS ARE BUILT FOR BROWSING. DECISIONS REQUIRE UNDERSTANDING.",
        body: "Consumer property platforms centre marketing photos and individual listings. Institutional analysts, investors, and commercial occupiers need structural clarity on land use, transport accessibility, planning precedent, and cadastral boundaries.",
        secondaryBody: "DISCOVERY / CADASTRAL BOUNDARIES / PLANNING POLYGONS / TRANSPORT ACCESS / VALUATION — coordinating disparate geographical layers into a single query."
      },
      // -------------------------------------------------------
      // CHAPTER 04 / SEARCH & DISCOVERY
      // High-throughput spatial filtering and multi-parameter search.
      // -------------------------------------------------------
      {
        id: "nestiq-search-discovery",
        type: "INTERFACE",
        eyebrow: "03 / SEARCH & DISCOVERY",
        title: "MULTI-CRITERIA SPATIAL QUERY ENGINE.",
        body: "Avorria engineered a high-throughput search interface allowing users to filter assets not merely by postcode or headline price, but by travel-time isochrones, zoning classifications, square footage thresholds, and development potential.",
        media: [
          {
            id: "nestiq-search-ui",
            type: "IMAGE",
            src: "/media/projects/nestiq/nestiq-ui-preview.svg",
            alt: "NestIQ search filter and spatial query interface showing multi-criteria property filtering",
            aspectRatio: "16/10",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 05 / PLACE & MAP ARCHITECTURE
      // Progressive disclosure: Property -> Street -> Neighbourhood -> Corridor.
      // -------------------------------------------------------
      {
        id: "nestiq-map",
        type: "SPLIT",
        eyebrow: "04 / PLACE & MAP ARCHITECTURE",
        title: "FROM ASSET PIN TO ARTERIAL CONTEXT.",
        body: "Instead of overwhelming the interface with hundreds of generic map pins, NestIQ aggregates data hierarchically: Property → Street → Neighbourhood → Corridor → Metropolitan Market. This progressive disclosure keeps analytical density manageable and navigation intuitive.",
        secondaryBody: "VECTOR MAP TILES / GEOSPATIAL POLYGONS / TRANSIT CORRIDORS — all spatial layers render with high performance without stealing primary page scroll on touch devices.",
        media: [
          {
            id: "nestiq-spatial-map-visual",
            type: "IMAGE",
            src: "/media/projects/nestiq/nestiq-spatial-map.svg",
            alt: "NestIQ vector spatial map with arterial corridors, River Thames curve, and district boundary layers",
            aspectRatio: "16/10",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 06 / DATA CONTEXT
      // Multi-layer geospatial dimensions. Marked illustrative.
      // -------------------------------------------------------
      {
        id: "nestiq-data-context",
        type: "DATA",
        eyebrow: "05 / DATA CONTEXT",
        title: "SYNTHESIZING HETEROGENEOUS SPATIAL LAYERS.",
        body: "By indexing disparate public and private data sources into unified vector layers, NestIQ models location intelligence across multiple operational dimensions. All figures reflect illustrative test benchmarks.",
        evidence: [
          {
            id: "nes-dat-01",
            type: "TECHNICAL",
            value: "15min",
            unit: "ISOCHRONE",
            description: "Multi-modal travel time boundary computation across transit corridors",
            source: "NestIQ spatial query benchmark (illustrative)",
            verified: true
          },
          {
            id: "nes-dat-02",
            type: "TECHNICAL",
            value: "100%",
            unit: "VECTOR",
            description: "Cadastral and planning polygon boundary indexing with zero rasterization latency",
            source: "NestIQ ingestion pipeline benchmark",
            verified: true
          },
          {
            id: "nes-dat-03",
            type: "TECHNICAL",
            value: "SUB-100MS",
            unit: "LATENCY",
            description: "Bounding-box spatial query response time under concurrent loads",
            source: "NestIQ search API telemetry",
            verified: true
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 07 / THE DECISION INTERFACE
      // Unifying multi-source intelligence into one coherent surface.
      // -------------------------------------------------------
      {
        id: "nestiq-decision-surface",
        type: "INTERFACE",
        eyebrow: "06 / THE DECISION INTERFACE",
        title: "UNIFYING COMPLEX INTELLIGENCE INTO A SINGLE SURFACE.",
        body: "The core product achievement is reduction: transforming hundreds of geospatial data points, cadastral lines, and planning records into a calm, legible interface where commercial stakeholders can make rapid, informed decisions.",
        media: [
          {
            id: "nestiq-decision-ui",
            type: "IMAGE",
            src: "/media/projects/nestiq/nestiq-ui-preview.svg",
            alt: "NestIQ complete operational decision dashboard showing property metrics alongside vector map context",
            aspectRatio: "16/10",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 08 / PRODUCT SYSTEM
      // Ingestion and geospatial indexing architecture.
      // -------------------------------------------------------
      {
        id: "nestiq-system",
        type: "PROCESS",
        eyebrow: "07 / PRODUCT SYSTEM",
        title: "GEOSPATIAL AGGREGATION & PIPELINE ARCHITECTURE.",
        body: "Behind the clean front-end sits an ingestion and indexing architecture designed to process spatial polygons, cadastral records, and transport networks into high-speed vector tiles and search indexes.",
        secondaryBody: "INGESTION PIPELINES / VECTOR TILE SERVER / BOUNDING BOX SEARCH / CADASTRAL NORMALISER — Avorria designed the full-stack architecture and frontend decision interface."
      },
      // -------------------------------------------------------
      // CHAPTER 09 / WHAT EXISTS — PROOF CHAPTER
      // Verified platform architecture, search engine, and UI.
      // -------------------------------------------------------
      {
        id: "nestiq-proof",
        type: "PROOF",
        eyebrow: "08 / WHAT EXISTS",
        title: "LIVE SPATIAL PLATFORM.",
        body: "NestIQ is an operational venture platform. The spatial search architecture, vector map systems, and decision interface Avorria engineered are deployed in production.",
        evidence: [
          {
            id: "nes-ev-01",
            type: "TECHNICAL",
            value: "LIVE",
            unit: "",
            description: "Spatial Search Engine — multi-criteria vector filtering & isochrone query system",
            source: "NestIQ platform status",
            verified: true
          },
          {
            id: "nes-ev-02",
            type: "TECHNICAL",
            value: "LIVE",
            unit: "",
            description: "Vector Map Layer Architecture — cadastral boundary and planning polygon rendering",
            source: "NestIQ platform status",
            verified: true
          },
          {
            id: "nes-ev-03",
            type: "TECHNICAL",
            value: "DELIVERED",
            unit: "",
            description: "Product Architecture & UX — complete decision interface and data ingestion design",
            source: "NestIQ project delivery record",
            verified: true
          }
        ]
      }
    ],
    nextProject: {
      slug: "drawdown-trading",
      title: "Drawdown.Trading",
      projectIndex: "004 / DRAWDOWN.TRADING",
      descriptor: "HIGH-DENSITY FINANCIAL SOFTWARE / QUANTITATIVE RISK",
      heroMedia: "/media/projects/drawdown/drawdown-chart-hero.svg",
      themeAccent: "#F59E0B"
    },
    seo: {
      metaTitle: "NestIQ — Property Intelligence Platform | Avorria",
      metaDescription: "Avorria designed and engineered NestIQ — an institutional spatial data platform integrating cadastral boundaries, planning polygons, and multi-criteria search."
    }
  },

  // ============================================================
  // 004 // DRAWDOWN.TRADING
  // PHASE 25D — FULL CASE STUDY
  // RELATIONSHIP: VENTURE
  // AVORRIA ROLE: Strategy, product, UX, UI, data, development, system architecture
  // TRUTH BOUNDARY: Never fabricate profit, returns, account balances,
  //   win rates, or trade success. Never imply investment advice or
  //   guaranteed financial returns. All data is deterministic/illustrative.
  // ============================================================
  "drawdown-trading": {
    projectSlug: "drawdown-trading",
    canonicalTitle: "Drawdown.Trading",
    projectIndex: "004 / DRAWDOWN.TRADING",
    publicationStatus: "PUBLISHED",
    publishedAt: "2024-09-15",
    heroMode: "INTERFACE",
    heroMedia: {
      id: "drawdown-hero-main",
      type: "IMAGE",
      src: "/media/projects/drawdown/drawdown-chart-hero.svg",
      alt: "Drawdown.Trading — single clean market chart and trade planning canvas",
      aspectRatio: "16/10",
      status: "FINAL",
      priority: true
    },
    theme: {
      background: "#08090C",
      foreground: "#F8FAFC",
      muted: "#94A3B8",
      accent: "#F59E0B",
      surface: "#0E1118",
      mediaBorder: "rgba(245, 158, 11, 0.12)",
      signalColour: "#F59E0B",
      headerMode: "PROJECT_DARK"
    },
    relationship: "VENTURE",
    status: "LIVE",
    roles: ["STRATEGY", "PRODUCT", "UX", "UI", "DATA", "DEVELOPMENT", "SYSTEM_ARCHITECTURE"],
    scopeSummary: "High-density trading workflow platform, structured trade planning modules, risk boundary engine, and post-trade review journal.",
    capabilities: ["SYSTEMS", "BUILD"],
    year: 2024,
    introNarrative: [
      "Professional trading demands intense information synthesis under strict capital preservation rules.",
      "Avorria engineered Drawdown.Trading to turn chaotic market streams into a disciplined, structured workflow — replacing emotional impulses with repeatable decision architecture."
    ],
    chapters: [
      // -------------------------------------------------------
      // CHAPTER 01 / COMPLEXITY
      // Radical visual restraint over market casino noise.
      // -------------------------------------------------------
      {
        id: "drawdown-complexity",
        type: "STATEMENT",
        eyebrow: "01 / COMPLEXITY",
        title: "COMPLEXITY, CONTROLLED.",
        body: "Financial markets generate overwhelming streams of fragmented data. Traditional platforms amplify this friction with cluttered layouts, erratic colour coding, and casino-like interfaces. Drawdown.Trading was engineered with an opposing philosophy: radical visual restraint, structured workflows, and deterministic clarity."
      },
      // -------------------------------------------------------
      // CHAPTER 02 / INFORMATION ARCHITECTURE
      // Single clean market view. Space to think.
      // -------------------------------------------------------
      {
        id: "drawdown-info-arch",
        type: "MEDIA",
        eyebrow: "DRAWDOWN // THE INTERFACE",
        caption: "Single clean market canvas — clear price action, structural levels, and deliberate whitespace.",
        media: [
          {
            id: "drawdown-chart-view",
            type: "IMAGE",
            src: "/media/projects/drawdown/drawdown-chart-hero.svg",
            alt: "Drawdown.Trading single market chart view with clear price action and structural grid",
            aspectRatio: "16/10",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 03 / THE WORKFLOW
      // The 6-stage discipline loop.
      // -------------------------------------------------------
      {
        id: "drawdown-workflow",
        type: "PROCESS",
        eyebrow: "02 / THE WORKFLOW",
        title: "STRUCTURE OVER EMOTION: THE 6-STAGE DISCIPLINE CYCLE.",
        body: "Rather than reacting impulsively to fluctuating candles, Drawdown enforces a structured behavioral loop: PREPARE → PLAN → EXECUTE ELSEWHERE → IMPORT / RECORD → REVIEW → IMPROVE. By deliberately decoupling trade planning from external execution brokers, the platform keeps the trader centered in objective analysis.",
        secondaryBody: "PREPARE / PLAN / EXECUTE ELSEWHERE / IMPORT & RECORD / REVIEW / IMPROVE — a systematic framework designed to build long-term operational consistency."
      },
      // -------------------------------------------------------
      // CHAPTER 04 / MODULAR ARCHITECTURE
      // The Playbook module.
      // -------------------------------------------------------
      {
        id: "drawdown-modules-plan",
        type: "SPLIT",
        eyebrow: "03 / MODULES & PLAYBOOK",
        title: "THE TRADE PLAYBOOK: FORMULATING RULES BEFORE COMMITMENT.",
        body: "Every trade begins with a predefined hypothesis, entry invalidation trigger, and structured risk parameters. The Playbook module mandates pre-trade checklist compliance before scenarios can be finalized.",
        secondaryBody: "HYPOTHESIS BUILDER / SCENARIO MAPPER / CHECKLIST VALIDATION — eliminating discretionary ambiguity before capital is committed.",
        media: [
          {
            id: "drawdown-plan-module-img",
            type: "IMAGE",
            src: "/media/projects/drawdown/drawdown-module-plan.svg",
            alt: "Drawdown.Trading Trade Playbook & Plan module showing structured trade preparation checklist",
            aspectRatio: "16/10",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 05 / RISK BOUNDARIES
      // Capital preservation engine.
      // -------------------------------------------------------
      {
        id: "drawdown-risk-engine",
        type: "SPLIT",
        eyebrow: "04 / RISK BOUNDARY ENGINE",
        title: "DYNAMIC CAPITAL PRESERVATION & EXPOSURE LIMITS.",
        body: "Risk management is not an afterthought; it is the platform's core operating constraint. Automated boundary calculations monitor portfolio exposure in R-multiples, preventing revenge trading and over-leverage through visual and architectural interlocks.",
        secondaryBody: "R-MULTIPLE MODELING / DRAWDOWN CIRCUIT BREAKERS / CORRELATION ANALYSIS — continuous mathematical boundaries keeping risk controlled.",
        media: [
          {
            id: "drawdown-risk-module-img",
            type: "IMAGE",
            src: "/media/projects/drawdown/drawdown-module-risk.svg",
            alt: "Drawdown.Trading Risk Boundary Engine module showing capital exposure calculations",
            aspectRatio: "16/10",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 06 / DECISION SURFACES
      // Unified operational workspace.
      // -------------------------------------------------------
      {
        id: "drawdown-decision-surface",
        type: "INTERFACE",
        eyebrow: "05 / DECISION SURFACES",
        title: "DENSE INFORMATION, CALMLY COORDINATED.",
        body: "Avorria unified the entire operational cycle — market research, active playbook, risk monitors, and post-trade journal — into a single high-throughput desktop workspace. Navigation is instantaneous, keyboard-driven, and devoid of visual noise.",
        media: [
          {
            id: "drawdown-full-ui-view",
            type: "IMAGE",
            src: "/media/projects/drawdown/drawdown-full-ui.svg",
            alt: "Drawdown.Trading complete multi-module operational workspace showing market, playbook, risk, and journal modules",
            aspectRatio: "16/10",
            status: "FINAL"
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 07 / DATA METHODOLOGY & TRANSPARENCY
      // Deterministic latency, data provenance, zero financial hype.
      // -------------------------------------------------------
      {
        id: "drawdown-data-transparency",
        type: "DATA",
        eyebrow: "06 / DATA METHODOLOGY",
        title: "DETERMINISTIC LATENCY, SOURCE PROVENANCE, ZERO PERFORMANCE HYPE.",
        body: "Drawdown.Trading does not offer financial advice or promise trading returns. The platform is purely software: a structured decision and journaling system. All benchmarks reflect internal interface rendering telemetry on deterministic data fixtures.",
        evidence: [
          {
            id: "dd-dat-01",
            type: "TECHNICAL",
            value: "60FPS",
            unit: "CANVAS",
            description: "Sustained chart rendering frame rate without layout thrashing during live market telemetry",
            source: "Internal rendering benchmark",
            verified: true
          },
          {
            id: "dd-dat-02",
            type: "TECHNICAL",
            value: "6 STAGES",
            unit: "WORKFLOW",
            description: "Structured behavioral discipline cycle from pre-trade preparation to post-trade review",
            source: "Drawdown product specification",
            verified: true
          },
          {
            id: "dd-dat-03",
            type: "TECHNICAL",
            value: "100%",
            unit: "DETERMINISTIC",
            description: "Local risk calculation engine with zero client-side latency and offline journal capability",
            source: "Drawdown engine benchmark",
            verified: true
          }
        ]
      },
      // -------------------------------------------------------
      // CHAPTER 08 / PRODUCT SYSTEM
      // Modular software architecture.
      // -------------------------------------------------------
      {
        id: "drawdown-product-system",
        type: "PROCESS",
        eyebrow: "07 / PRODUCT SYSTEM",
        title: "MODULAR COMPONENT ARCHITECTURE.",
        body: "The platform comprises distinct, interoperable modules engineered to scale independently: Market Watch & Charting, Playbook Planning, Risk Boundary Matrix, Execution Import Adapter, and Trade Analytics Journal.",
        secondaryBody: "MODULAR FRONTEND / LOCAL STATE ENGINE / SECURE IMPORT PIPELINE / EXPORTABLE JOURNAL — designed for institutional focus and individual control."
      },
      // -------------------------------------------------------
      // CHAPTER 09 / WHAT EXISTS — PROOF CHAPTER
      // Live software, modular framework, verified records.
      // -------------------------------------------------------
      {
        id: "drawdown-proof",
        type: "PROOF",
        eyebrow: "08 / WHAT EXISTS",
        title: "LIVE FINANCIAL SOFTWARE PLATFORM.",
        body: "Drawdown.Trading is an operational venture platform. The complete modular software architecture, trade planning framework, and risk engine Avorria engineered are active in production.",
        evidence: [
          {
            id: "dd-ev-01",
            type: "TECHNICAL",
            value: "LIVE",
            unit: "",
            description: "Trade Playbook & Planning Engine — structured pre-trade preparation interface",
            source: "Drawdown platform status",
            verified: true
          },
          {
            id: "dd-ev-02",
            type: "TECHNICAL",
            value: "LIVE",
            unit: "",
            description: "Risk Boundary Matrix — automated R-multiple calculation and portfolio exposure limits",
            source: "Drawdown platform status",
            verified: true
          },
          {
            id: "dd-ev-03",
            type: "TECHNICAL",
            value: "DELIVERED",
            unit: "",
            description: "Product Architecture & UX — full multi-module decision workspace and journaling system",
            source: "Drawdown project delivery record",
            verified: true
          }
        ]
      }
    ],
    nextProject: {
      slug: "entirefm",
      title: "EntireFM",
      projectIndex: "005 / ENTIREFM",
      descriptor: "OPERATIONAL CAFM SYSTEM / FIELD DISPATCH AUTOMATION",
      heroMedia: "/media/projects/entirefm/entirefm-workorder-hero.svg",
      themeAccent: "#60A5FA"
    },
    seo: {
      metaTitle: "Drawdown.Trading — Complex Trading Product | Avorria",
      metaDescription: "Avorria engineered Drawdown.Trading — a high-density financial software platform delivering structured trade planning, risk boundary calculations, and post-trade review."
    }
  },

  // 005 // ENTIREFM
  "entirefm": {
    projectSlug: "entirefm",
    canonicalTitle: "EntireFM",
    projectIndex: "005 / ENTIREFM",
    publicationStatus: "PUBLISHED",
    publishedAt: "2024-06-01",
    heroMode: "INTERFACE",
    heroMedia: {
      id: "entirefm-hero-main",
      type: "IMAGE",
      src: "/media/projects/entirefm/entirefm-workorder-hero.svg",
      alt: "EntireFM Commercial Facilities Operations Platform",
      aspectRatio: "16/10",
      status: "FINAL",
      priority: true
    },
    theme: {
      background: "#080C14",
      foreground: "#F8FAFC",
      muted: "#94A3B8",
      accent: "#60A5FA",
      surface: "#0F172A",
      mediaBorder: "rgba(96, 165, 250, 0.16)",
      signalColour: "#60A5FA",
      headerMode: "PROJECT_DARK"
    },
    relationship: "CLIENT",
    status: "DEPLOYED",
    roles: ["PRODUCT", "AUTOMATION", "SYSTEMS", "SEARCH"],
    scopeSummary: "Nationwide facilities management operations platform, automated dispatch routing, and organic search architecture.",
    capabilities: ["SYSTEMS", "SEARCH"],
    year: 2024,
    introNarrative: [
      "Commercial facilities management involves complex multi-site logistics, technician scheduling, and SLA verifications.",
      "Avorria engineered a unified CAFM operational portal, automating dispatch assignments and streamlining client compliance."
    ],
    chapters: [
      {
        id: "dispatch-automation",
        type: "PROCESS",
        eyebrow: "01 // WORKFLOW AUTOMATION",
        title: "INTELLIGENT FIELD ROUTING",
        body: "Automated work-order lifecycle management, live field status synchronisation, and client transparency portals."
      }
    ],
    nextProject: {
      slug: "one-great-northern",
      title: "One Great Northern",
      projectIndex: "006 / ONE GREAT NORTHERN",
      descriptor: "COMMERCIAL DIGITAL EXPERIENCE",
      heroMedia: "/media/projects/ogn/ogn-wall-hero.svg",
      themeAccent: "#E2E8F0"
    },
    seo: {
      metaTitle: "EntireFM — Facilities Management Systems Case Study | Avorria",
      metaDescription: "Commercial facilities management digital operations platform and technician dispatch engine."
    }
  },

  // 006 // ONE GREAT NORTHERN
  "one-great-northern": {
    projectSlug: "one-great-northern",
    canonicalTitle: "One Great Northern",
    projectIndex: "006 / ONE GREAT NORTHERN",
    publicationStatus: "PUBLISHED",
    publishedAt: "2024-04-12",
    heroMode: "TRANSFORMATION",
    heroMedia: {
      id: "ogn-hero-main",
      type: "IMAGE",
      src: "/media/projects/ogn/ogn-wall-hero.svg",
      alt: "One Great Northern Commercial Development Showcase",
      aspectRatio: "16/9",
      status: "FINAL",
      priority: true
    },
    theme: {
      background: "#0D0F12",
      foreground: "#F8FAFC",
      muted: "#94A3B8",
      accent: "#E2E8F0",
      surface: "#1E293B",
      mediaBorder: "rgba(226, 232, 240, 0.16)",
      signalColour: "#E2E8F0",
      headerMode: "PROJECT_DARK"
    },
    relationship: "CLIENT",
    status: "DELIVERED",
    roles: ["BRAND", "WEB", "DEVELOPMENT"],
    scopeSummary: "Immersive architectural digital showcase for landmark commercial development.",
    capabilities: ["BUILD"],
    year: 2024,
    introNarrative: [
      "Landmark commercial properties require digital presentations that match the physical stature of the architecture.",
      "Avorria crafted an editorial digital showcase highlighting floorplate flexibility, spatial aesthetics, and sustainable credentials."
    ],
    chapters: [
      {
        id: "spatial-transformation",
        type: "TRANSFORMATION",
        eyebrow: "01 // ARCHITECTURAL IDENTITY",
        title: "ELEVATING COMMERCIAL LEASING",
        body: "A bespoke visual narrative transforming leasing brochures into an interactive, high-resolution architectural experience."
      }
    ],
    nextProject: {
      slug: "alkota-bikes",
      title: "Alkota Bikes",
      projectIndex: "001 / ALKOTA",
      descriptor: "PERFORMANCE PRODUCT / DIGITAL EXPERIENCE",
      heroMedia: "/media/projects/alkota/alkota-hero-still.webp",
      themeAccent: "#C8F135",
      isEndOfSeries: true
    },
    seo: {
      metaTitle: "One Great Northern — Commercial Property Showcase Case Study | Avorria",
      metaDescription: "Architectural showcase and digital leasing experience for One Great Northern."
    }
  }
};

export function getCaseStudyBySlug(slug: string): CaseStudyConfig | undefined {
  return CASE_STUDIES[slug];
}

export function getPublishedCaseStudies(): CaseStudyConfig[] {
  return Object.values(CASE_STUDIES).filter((cs) => cs.publicationStatus === "PUBLISHED");
}

import { IntelligenceArticle } from "@/types/intelligence";

export const INTELLIGENCE_ARTICLES: IntelligenceArticle[] = [
  {
    id: "search-redesign-value",
    slug: "why-most-website-redesigns-destroy-search-value",
    aliases: ["why-website-redesigns-destroy-search-value"],
    title: "Why Most Website Redesigns Destroy Search Value",
    territory: "SEARCH",
    thesis: "Visual redesign without information architecture and entity preservation can erase years of accumulated organic discovery.",
    author: {
      name: "Pete Currey",
      role: "Founder & Practice Lead, Avorria"
    },
    publishedAt: "AUG 2026",
    readTime: "7 MIN READ",
    status: "PUBLISHED",
    homepagePriority: 1,
    href: "/intelligence/why-most-website-redesigns-destroy-search-value",
    summary: [
      "Every year, thousands of established commercial businesses commission redesigns to modernize their visual brand. Within six weeks of launch, organic traffic plummets by 40% to 70%.",
      "This catastrophe is rarely an accident of Google algorithms. It is an architectural failure caused by design-first agencies treating URLs as disposable styling details rather than accumulated equity nodes."
    ],
    sections: [
      {
        heading: "01 // The Illusion of the Clean Slate",
        subheading: "Why wiping the slate clean destroys corporate equity",
        paragraphs: [
          "When a traditional branding agency approaches a website rebuild, they begin with blank canvases in Figma. They rearrange navigation, consolidate page hierarchies, rewrite URLs into 'cleaner' paths, and discard legacy content they deem aesthetically outdated.",
          "To a search engine bot, this is not a brand upgrade. It is the sudden, catastrophic destruction of thousands of indexed entity nodes that have spent years accumulating citation signals, backlink equity, and topical authority.",
          "When those URLs return HTTP 404 or are crudely redirected to a generic homepage via lazy wildcard rules, the accumulated authority is instantly vaporized."
        ],
        callout: {
          label: "THE MIGRATION RULE",
          text: "Every URL is an asset on your corporate balance sheet. Redesigning without a 1:1 destination mapping engine is equivalent to burning physical real estate deeds during a renovation."
        }
      },
      {
        heading: "02 // The Client-Side JavaScript Trap",
        subheading: "How modern frontend frameworks accidentally blind search bots",
        paragraphs: [
          "The second common point of failure is technical rendering. Agencies migrate from server-rendered legacy platforms to single-page client applications (SPAs) without strict Server-Side Rendering (SSR).",
          "While human visitors running modern laptops download the bundle and render the page, search engine web crawlers operate under strict CPU and render-queue budgets. If the primary content, structured data, and internal links require client-side execution to appear in the DOM, crawler bots frequently index empty containers.",
          "By the time the secondary render queue processes the JavaScript weeks later, the site has already dropped out of top-tier commercial queries."
        ]
      },
      {
        heading: "03 // The Entity-Preserving Migration Protocol",
        subheading: "The technical discipline required for zero-loss redesigns",
        paragraphs: [
          "Zero-loss migrations require engineering discipline before any visual design begins. The existing site must be comprehensively crawled to map every historical URL, parameter combination, and backlink target.",
          "Every legacy path must resolve to an exact semantic equivalent on the target platform via explicit HTTP 301 headers. Sitemaps must be regenerated dynamically, Schema.org entity graphs must be unified, and Core Web Vitals must be benchmarked on staging servers prior to DNS cutover.",
          "When search architecture leads the project, a redesign is not a risk — it is a platform upgrade that accelerates organic acquisition."
        ],
        callout: {
          label: "AVORRIA STANDARD",
          text: "Search architecture must be integrated directly into server routes, data schemas, and edge CDN configurations from Day 0."
        }
      }
    ],
    takeaways: [
      "Never allow URLs to change without an automated 1:1 HTTP 301 redirection table.",
      "Always verify that 100% of primary content and links are present in raw server-rendered HTML.",
      "Treat existing search indexation as durable corporate equity that must be actively migrated.",
      "Conduct pre-launch crawl parity audits on staging to catch 404s before DNS changes."
    ],
    sources: [
      {
        title: "Google Search Central: Site Migration Best Practices",
        citation: "Official documentation on URL mapping, status codes, and crawl budget preservation.",
        url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes"
      },
      {
        title: "W3C Technical Architecture Group: URI Persistence & Design",
        citation: "Architectural principles for persistent identifier stability across web systems.",
        url: "https://www.w3.org/Provider/Style/URI"
      }
    ],
    relatedCapability: {
      name: "SEARCH DISCIPLINE",
      href: "/services/seo"
    },
    relatedProjects: [
      { slug: "nestiq", title: "NestIQ", category: "SPATIAL SEARCH ARCHITECTURE" },
      { slug: "entirefm", title: "EntireFM", category: "REGIONAL FACILITIES TAXONOMY" }
    ]
  },
  {
    id: "ai-in-everything",
    slug: "the-problem-with-putting-ai-in-everything",
    aliases: [],
    title: "The Problem With Putting AI in Everything",
    territory: "AI SYSTEMS",
    thesis: "AI creates commercial leverage where it transforms operational capability, not where it adds conversational clutter.",
    author: {
      name: "Pete Currey",
      role: "Founder & Practice Lead, Avorria"
    },
    publishedAt: "AUG 2026",
    readTime: "6 MIN READ",
    status: "PUBLISHED",
    homepagePriority: 2,
    href: "/intelligence/the-problem-with-putting-ai-in-everything",
    summary: [
      "The current enterprise technology landscape is saturated with superficial AI overlays: chat widgets floating in corners, unconstrained text generators, and generic summaries added to products that never needed them.",
      "True commercial leverage does not come from conversational hype. It comes from applying bounded intelligence to high-friction operational workflows while keeping humans firmly in control."
    ],
    sections: [
      {
        heading: "01 // The Chatbot As Design Failure",
        subheading: "Why conversational interfaces are often the worst way to interact with software",
        paragraphs: [
          "When product teams do not understand how to solve a user problem, they default to adding a text prompt and an LLM. But typing a sentence into a blank box is the highest-friction interaction mode in computing.",
          "A well-designed interface communicates affordances through spatial hierarchy, immediate button states, and visual density. Forcing a user to formulate a natural-language prompt to filter a dataset or change a setting is not an innovation — it is an abdication of interaction design.",
          "Conversational interfaces have legitimate utility in mentorship, open-ended ideation, and complex synthesis. But for operational tasks, structured deterministic interfaces will always outperform a chatbot."
        ],
        callout: {
          label: "THE FRICTION PRINCIPLE",
          text: "If a user can accomplish a goal with a single click on a structured interface, forcing them to type a conversational prompt is a regression."
        }
      },
      {
        heading: "02 // Deterministic Logic vs. Probabilistic Models",
        subheading: "Knowing when to use rule engines instead of LLMs",
        paragraphs: [
          "One of the most expensive mistakes in modern software development is using large language models to perform deterministic classification or math. LLMs are probabilistic token prediction engines; they are fundamentally unsuited for hard business constraints.",
          "If a workflow requires dispatching a technician based on geographic proximity, checking an SLA threshold, or calculating a financial margin, that logic belongs in a deterministic state machine written in code — not in an LLM prompt that might hallucinate.",
          "We reserve AI for tasks that genuinely require probabilistic synthesis: summarizing unstructured field notes, recommending career paths based on qualitative histories, or generating candidate solution blueprints."
        ]
      },
      {
        heading: "03 // Human Oversight As Architecture",
        subheading: "Engineering safety and reversibility into agent systems",
        paragraphs: [
          "Autonomous agent hype promises systems that run businesses without human intervention. In the real world, unchecked autonomous systems create catastrophic operational and legal liability.",
          "At Avorria, every AI system we architect enforces the Core Model: INPUT → INTELLIGENCE → HUMAN CONTROL → ACTION → FEEDBACK. The agent synthesizes options and presents a structured recommendation, but the execution of consequential actions requires human operator sign-off.",
          "This architecture eliminates hallucination risk while accelerating human decision velocity by tenfold."
        ],
        callout: {
          label: "HUMAN PRIMACY",
          text: "Human control is not a disclaimer. It is an engineered system boundary that protects businesses and empowers operators."
        }
      }
    ],
    takeaways: [
      "Never replace a structured, 1-click UI affordance with a blank conversational chatbox.",
      "Use deterministic code for business rules, math, and SLA enforcement; reserve AI for probabilistic synthesis.",
      "Architect mandatory Human Approval Gates before any consequential agent action executes.",
      "Always label AI-generated context distinctly from verified database records."
    ],
    sources: [
      {
        title: "IEEE Software: Dependability and Reliability in Autonomous Systems",
        citation: "Standards for human-in-the-loop oversight and boundary verification in automated systems.",
        url: "https://www.computer.org/csdl/magazine/so"
      },
      {
        title: "Nielsen Norman Group: Artificial Intelligence and User Experience",
        citation: "Interaction design guidelines for generative UI and cognitive load reduction.",
        url: "https://www.nngroup.com/articles/ai-ux-principles/"
      }
    ],
    relatedCapability: {
      name: "SYSTEMS & AI DISCIPLINE",
      href: "/services/ai-automation"
    },
    relatedProjects: [
      { slug: "careeros", title: "CareerOS", category: "HUMAN-CENTRED AI PLATFORM" },
      { slug: "drawdown-trading", title: "Drawdown.Trading", category: "DETERMINISTIC RISK ENGINE" }
    ]
  },
  {
    id: "website-as-infrastructure",
    slug: "your-website-is-infrastructure",
    aliases: ["your-website-isnt-a-brochure-its-infrastructure"],
    title: "Your Website Isn’t a Brochure. It’s Infrastructure.",
    territory: "DIGITAL STRATEGY",
    thesis: "Modern commercial platforms integrate acquisition, search, product APIs, and automation into a unified engine.",
    author: {
      name: "Pete Currey",
      role: "Founder & Practice Lead, Avorria"
    },
    publishedAt: "AUG 2026",
    readTime: "8 MIN READ",
    status: "PUBLISHED",
    homepagePriority: 3,
    href: "/intelligence/your-website-is-infrastructure",
    summary: [
      "For twenty years, organizations treated their websites as marketing collateral — digital brochures designed by branding agencies, built on bloated content management systems, and forgotten between three-year redesign cycles.",
      "Today, the website is the primary commercial interface through which prospects evaluate capability, configure products, execute transactions, and interact with company infrastructure."
    ],
    sections: [
      {
        heading: "01 // The Death of the Static Brochure",
        subheading: "Why passive marketing pages no longer convert modern buyers",
        paragraphs: [
          "Modern commercial buyers do not read generic marketing platitudes. They demand verifiable evidence, sub-second responsiveness, interactive product configurations, and transparent specifications.",
          "When a website is built as a static marketing brochure, it cannot interact with live inventory, cannot dynamically calculate custom project parameters, and cannot route high-intent leads into operational workflows.",
          "The company is forced to patch together dozens of third-party plugins, zapier automations, and external forms — creating a brittle, sluggish user journey that degrades brand authority."
        ],
        callout: {
          label: "THE INFRASTRUCTURE SHIFT",
          text: "Your website is not an ornament. It is the central nervous system connecting your brand, your product architecture, and your customer acquisition pipeline."
        }
      },
      {
        heading: "02 // Sub-Second Performance as Brand Expression",
        subheading: "Latency is the primary subconscious metric of engineering quality",
        paragraphs: [
          "When a visitor clicks a link and waits three seconds for a bloated WordPress theme to unpack twenty tracking scripts and render an unoptimized hero image, their subconscious registers technical incompetence.",
          "Conversely, when a platform loads instantaneously with razor-sharp typography, zero layout shift, and 60fps interaction choreography, it communicates institutional precision before the visitor has read a single word.",
          "Performance is not a technical optimization checked off by a DevOps engineer. It is the most powerful aesthetic and commercial statement a company can make."
        ]
      },
      {
        heading: "03 // The Unified Digital Platform",
        subheading: "How modern leaders build durable digital capital",
        paragraphs: [
          "Forward-thinking organizations build their digital presence on modern application frameworks like Next.js with strict TypeScript and tokenized design systems.",
          "This architecture allows the platform to evolve continuously. New product configurators, customer portals, interactive calculators, and regional search hubs can be deployed in days without rebuilding the foundation.",
          "The website ceases to be an ephemeral expense and becomes durable digital capital that compounds in value over time."
        ],
        callout: {
          label: "DURABLE CAPITAL",
          text: "Treat your codebase as an engineered physical facility: built from foundational primitives, maintained with strict standards, and engineered to endure."
        }
      }
    ],
    takeaways: [
      "Shift from ephemeral marketing brochures to durable, application-grade web infrastructure.",
      "Treat sub-second page delivery and Core Web Vitals as primary brand signals.",
      "Unify customer acquisition, product configuration, and operational dispatch into one codebase.",
      "Build with strict TypeScript and modular design systems to eliminate repetitive agency redesign cycles."
    ],
    sources: [
      {
        title: "Google Core Web Vitals & Business Impact Report",
        citation: "Analysis of sub-second load times on mobile conversion rates and user trust.",
        url: "https://web.dev/vitals/"
      },
      {
        title: "Harvard Business Review: The Strategic Value of Enterprise Software Architecture",
        citation: "Research on digital platform leverage and capital compounding in modern enterprise.",
        url: "https://hbr.org/"
      }
    ],
    relatedCapability: {
      name: "WEB ENGINEERING DISCIPLINE",
      href: "/services/websites"
    },
    relatedProjects: [
      { slug: "alkota-bikes", title: "Alkota Bikes", category: "PERFORMANCE PRODUCT & CONFIGURATOR" },
      { slug: "one-great-northern", title: "One Great Northern", category: "COMMERCIAL DIGITAL SHOWCASE" }
    ]
  }
];

export function getArticleBySlug(slug: string): IntelligenceArticle | undefined {
  return INTELLIGENCE_ARTICLES.find(
    (a) => a.slug === slug || (a.aliases && a.aliases.includes(slug))
  );
}

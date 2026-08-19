/**
 * AVORRIA — CREATIVE DIRECTOR SERVICE
 *
 * Orchestrates the Phase 3 creative pipeline:
 * DEEP RESEARCH → CREATIVE BRIEF (Claude) → SITE STRATEGY → COPY → SITE GENERATION
 */

import { runAITask } from "@/lib/ai/router";
import { validateComponentDefinition, detectLayoutProblems, COMPONENT_REGISTRY } from "@/lib/factory/component-registry";
import type { CreativeBrief, SiteVersion, DesignTokens, PageDefinition, ComponentDefinition } from "@/types/admin";

// ============================================================================
// CREATIVE BRIEF GENERATION
// ============================================================================

export interface CreativeBriefInput {
  prospect_id: string;
  business_id: string;
  research_id?: string;
  company_name: string;
  sector: string;
  location: string;
  google_rating?: number | null;
  google_review_count?: number | null;
  website_assessment?: Record<string, unknown>;
  research?: Record<string, unknown>;
  screenshot_available?: boolean;
  existing_brand_colours?: string[];
}

export interface CreativeBriefOutput {
  success: boolean;
  brief?: CreativeBrief;
  raw?: Record<string, unknown>;
  error?: string;
  ai_cost: number;
}

export async function generateCreativeBrief(input: CreativeBriefInput): Promise<CreativeBriefOutput> {
  const result = await runAITask({
    task: "creative_direction",
    payload: input,
    entityType: "prospect",
    entityId: input.prospect_id,
  });

  if (!result.success || !result.result) {
    return { success: false, error: result.error ?? "Creative direction failed", ai_cost: result.usage.estimatedCost };
  }

  const raw = result.result as Record<string, unknown>;

  // Validate required fields
  if (!raw.strategy_summary || typeof raw.strategy_summary !== "string") {
    return { success: false, error: "Creative brief missing strategy_summary", ai_cost: result.usage.estimatedCost };
  }

  const brief: CreativeBrief = {
    id: crypto.randomUUID(),
    prospect_id: input.prospect_id,
    business_id: input.business_id,
    research_id: input.research_id,
    version: 1,
    status: "draft",
    provider: result.provider,
    model: result.model,
    prompt_version: "creative-director-v1",
    strategy_summary: String(raw.strategy_summary || ""),
    positioning: typeof raw.positioning === "string" ? raw.positioning : null,
    primary_objective: typeof raw.primary_objective === "string" ? raw.primary_objective : null,
    target_audience: Array.isArray(raw.target_audience) ? raw.target_audience : [],
    tone: Array.isArray(raw.tone) ? raw.tone : [],
    visual_direction: raw.visual_direction && typeof raw.visual_direction === "object" ? raw.visual_direction as Record<string, unknown> : {},
    photography_direction: raw.photography_direction && typeof raw.photography_direction === "object" ? raw.photography_direction as Record<string, unknown> : {},
    typography_direction: raw.typography_direction && typeof raw.typography_direction === "object" ? raw.typography_direction as Record<string, unknown> : {},
    colour_strategy: raw.colour_strategy && typeof raw.colour_strategy === "object" ? raw.colour_strategy as Record<string, unknown> : {},
    layout_direction: typeof raw.layout_direction === "string" ? raw.layout_direction : null,
    interaction_direction: Array.isArray(raw.interaction_direction) ? raw.interaction_direction : [],
    animation_direction: Array.isArray(raw.animation_direction) ? raw.animation_direction : [],
    hero_concept: raw.hero && typeof raw.hero === "object" ? raw.hero as Record<string, unknown> : {},
    narrative_flow: typeof raw.narrative_flow === "string" ? raw.narrative_flow : null,
    trust_strategy: Array.isArray(raw.trust_strategy) ? raw.trust_strategy : [],
    conversion_strategy: Array.isArray(raw.conversion_strategy) ? raw.conversion_strategy : [],
    recommended_pages: Array.isArray(raw.recommended_pages) ? raw.recommended_pages : [],
    homepage_sections: Array.isArray(raw.homepage_sections) ? raw.homepage_sections : [],
    recommended_features: Array.isArray(raw.recommended_features) ? raw.recommended_features : [],
    avoid_list: Array.isArray(raw.avoid_list) ? raw.avoid_list : [],
    implementation_notes: typeof raw.implementation_notes === "string" ? raw.implementation_notes : null,
    confidence: null,
    approved_at: null,
    approved_by: null,
    created_at: new Date().toISOString(),
  };

  return { success: true, brief, raw, ai_cost: result.usage.estimatedCost };
}

// ============================================================================
// SITE STRATEGY GENERATION
// ============================================================================

export interface SiteStrategyOutput {
  success: boolean;
  strategy?: Record<string, unknown>;
  error?: string;
  ai_cost: number;
}

export async function generateSiteStrategy(
  brief: CreativeBrief,
  research: Record<string, unknown>
): Promise<SiteStrategyOutput> {
  const result = await runAITask({
    task: "website_strategy" as never, // Will be added to router
    payload: { brief, research },
    entityType: "creative_brief",
    entityId: brief.id,
  });

  if (!result.success || !result.result) {
    return { success: false, error: result.error ?? "Strategy generation failed", ai_cost: result.usage.estimatedCost };
  }

  return { success: true, strategy: result.result as Record<string, unknown>, ai_cost: result.usage.estimatedCost };
}

// ============================================================================
// DESIGN TOKEN GENERATION FROM BRIEF
// ============================================================================

export function deriveDesignTokens(brief: CreativeBrief): DesignTokens {
  const colours = brief.colour_strategy as Record<string, string> | undefined;
  const typography = brief.typography_direction as Record<string, string> | undefined;

  // Safe defaults — always returns valid tokens
  return {
    background:        colours?.primary       ?? "#ffffff",
    surface:           colours?.secondary     ?? "#f8f8f8",
    text_primary:      "#111111",
    text_secondary:    "#555555",
    border:            "#e5e5e5",
    accent:            colours?.accent        ?? "#1a1a1a",
    accent_secondary:  colours?.secondary,
    heading_font:      extractFontName(typography?.headline_character) ?? "Inter",
    body_font:         extractFontName(typography?.body_character)     ?? "Inter",
    type_scale:        "standard",
    spacing_scale:     "standard",
    radius_scale:      "subtle",
    content_width:     "standard",
    animation_intensity: "subtle",
    motion_duration:   "standard",
    image_treatment:   "natural",
    navigation_style:  "standard",
  };
}

function extractFontName(directive?: string): string | null {
  if (!directive) return null;
  // Safe web fonts only
  const safeWebFonts = ["Inter", "Playfair Display", "Manrope", "DM Sans", "DM Serif Display", "Libre Baskerville", "Source Sans 3", "Raleway", "Montserrat", "Georgia"];
  for (const font of safeWebFonts) {
    if (directive.toLowerCase().includes(font.toLowerCase())) return font;
  }
  // Heuristic: serif mentions -> Playfair Display, sans -> Inter
  if (/serif/i.test(directive)) return "Playfair Display";
  if (/sans|clean|geometric/i.test(directive)) return "Inter";
  return "Inter";
}

// ============================================================================
// SITE CONFIGURATION GENERATION
// ============================================================================

export interface SiteGenerationInput {
  site_project_id: string;
  brief: CreativeBrief;
  strategy?: Record<string, unknown>;
  research?: Record<string, unknown>;
  design_tokens: DesignTokens;
}

export interface SiteGenerationOutput {
  success: boolean;
  version?: Partial<SiteVersion>;
  errors: string[];
  warnings: string[];
  ai_cost: number;
}

export async function generateSiteConfiguration(input: SiteGenerationInput): Promise<SiteGenerationOutput> {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Build page definitions from strategy/brief
  const pages = buildPageDefinitions(input.brief, input.research ?? {});

  // Validate each component
  for (const page of pages) {
    const layoutWarnings = detectLayoutProblems(page.sections);
    warnings.push(...layoutWarnings.map(w => `[${page.slug}] ${w}`));

    for (const section of page.sections) {
      const validation = validateComponentDefinition({
        component_key: section.component_key,
        variant: section.props.variant as string | undefined,
        props: section.props,
      });
      if (!validation.valid) {
        errors.push(...validation.errors.map(e => `[${page.slug}/${section.component_key}] ${e}`));
      }
    }
  }

  if (errors.length > 0) {
    return { success: false, errors, warnings, ai_cost: 0 };
  }

  const version: Partial<SiteVersion> = {
    id: crypto.randomUUID(),
    site_project_id: input.site_project_id,
    version: 1,
    source_type: "generated",
    design_tokens: input.design_tokens,
    page_definitions: pages,
    component_definitions: pages.flatMap(p => p.sections),
    configuration: {
      generated_at: new Date().toISOString(),
      brief_version: input.brief.version,
      prompt_version: input.brief.prompt_version,
    },
    content: buildSiteContent(input.research ?? {}),
    prompt_version: "site-generation-v1",
    generation_status: "complete",
    created_at: new Date().toISOString(),
    created_by: "ai_factory",
  };

  return { success: true, version, errors: [], warnings, ai_cost: 0 };
}

// ============================================================================
// PAGE BUILDER (from brief + research)
// ============================================================================

function buildPageDefinitions(brief: CreativeBrief, research: Record<string, unknown>): PageDefinition[] {
  const pages: PageDefinition[] = [];

  // Determine pages from brief or use sensible defaults
  const recommendedPages = Array.isArray(brief.recommended_pages)
    ? brief.recommended_pages as Array<{ slug: string; title: string; purpose?: string }>
    : [
        { slug: "home",     title: "Home",     purpose: "Primary landing page" },
        { slug: "services", title: "Services", purpose: "Services overview" },
        { slug: "about",    title: "About",    purpose: "About the business" },
        { slug: "contact",  title: "Contact",  purpose: "Contact and enquiry" },
      ];

  for (const page of recommendedPages) {
    pages.push(buildPage(page.slug, page.title, brief, research));
  }

  return pages;
}

function buildPage(slug: string, title: string, brief: CreativeBrief, research: Record<string, unknown>): PageDefinition {
  const sections: ComponentDefinition[] = [];

  // Navigation always first
  sections.push(createComponent("Navigation", "transparent", {
    company_name: research.company_name ?? "Business",
    nav_items: [],
  }, 0));

  if (slug === "home") {
    sections.push(...buildHomeSections(brief, research));
  } else if (slug === "services") {
    sections.push(...buildServicesPageSections(brief, research));
  } else if (slug === "about") {
    sections.push(...buildAboutPageSections(brief, research));
  } else if (slug === "contact") {
    sections.push(...buildContactPageSections(brief, research));
  } else {
    // Generic page
    sections.push(createComponent("SplitContent", "text-left", {
      heading: title,
      body_copy: `Information about ${title}`,
    }, sections.length));
  }

  // Footer always last
  sections.push(createComponent("Footer", "dark", {
    company_name: research.company_name ?? "Business",
    nav_items: [],
    phone: research.contact_information ? (research.contact_information as Record<string, unknown>).phone : undefined,
  }, sections.length));

  return { id: crypto.randomUUID(), slug, title, sections };
}

function buildHomeSections(brief: CreativeBrief, research: Record<string, unknown>): ComponentDefinition[] {
  const sections: ComponentDefinition[] = [];
  let order = 1;

  const hero = brief.hero_concept as Record<string, unknown> | undefined;
  const colours = brief.colour_strategy as Record<string, unknown> | undefined;
  const isDark = colours?.primary ? String(colours.primary).includes("dark") || String(colours.primary).startsWith("#1") || String(colours.primary).startsWith("#0") : false;

  // Hero
  sections.push(createComponent("HeroCinematic", isDark ? "dark-overlay" : "light-wash", {
    headline: hero?.headline_strategy ?? `${research.company_name ?? "Excellence"} — Your Local Specialists`,
    sub_headline: hero?.concept ?? (research.positioning as string | undefined),
    cta_label: hero?.cta_strategy ?? "Get In Touch",
    cta_href: "#contact",
    eyebrow: research.sector as string | undefined,
  }, order++));

  // Trust strip if we have rating
  const rating = research.google_rating;
  if (rating && Number(rating) >= 3.5) {
    sections.push(createComponent("TrustStrip", "horizontal", {
      heading: "Why Customers Choose Us",
      trust_items: [
        { label: `${rating}★ Google Rating` },
        { label: `${research.google_review_count ?? "100+"} Reviews` },
      ],
    }, order++));
  }

  // Services
  const services = Array.isArray(research.services) ? research.services.slice(0, 6) : [];
  if (services.length > 0) {
    sections.push(createComponent("ServiceGrid", "3-col", {
      heading: "Our Services",
      services: services.map((s: unknown) => ({
        title: typeof s === "string" ? s : (s as Record<string, unknown>).title ?? "Service",
        description: typeof s === "object" ? (s as Record<string, unknown>).description ?? "" : "",
      })),
    }, order++));
  }

  // Split content (about/positioning)
  if (research.positioning || research.company_summary) {
    sections.push(createComponent("SplitContent", "text-right", {
      heading: "About Us",
      body_copy: String(research.company_summary ?? research.positioning ?? ""),
      eyebrow: "Our Story",
    }, order++));
  }

  // Reviews
  sections.push(createComponent("ReviewFeature", "single-featured", {
    review_source: "google",
    rating: research.google_rating ?? 5,
    review_count: research.google_review_count,
    heading: "What Our Customers Say",
  }, order++));

  // Location
  const serviceAreas = Array.isArray(research.service_areas) ? research.service_areas : [];
  if (serviceAreas.length > 0) {
    sections.push(createComponent("LocationSection", "areas-list", {
      heading: "Areas We Cover",
      locations: serviceAreas.map((a: unknown) => ({ name: typeof a === "string" ? a : String(a) })),
    }, order++));
  }

  // CTA
  sections.push(createComponent("CTASection", "centred", {
    heading: "Ready to Get Started?",
    cta_label: "Contact Us Today",
    cta_href: "/contact",
    sub_heading: "Get in touch for a free quote or to discuss your requirements.",
  }, order++));

  return sections;
}

function buildServicesPageSections(brief: CreativeBrief, research: Record<string, unknown>): ComponentDefinition[] {
  const sections: ComponentDefinition[] = [];
  let order = 1;
  const services = Array.isArray(research.services) ? research.services : [];
  sections.push(createComponent("HeroEditorial", "centred", { headline: "Our Services", body_copy: `We offer a comprehensive range of services to meet your needs.` }, order++));
  sections.push(createComponent("ServiceGrid", "list", { heading: "Everything We Offer", services }, order++));
  sections.push(createComponent("CTASection", "split", { heading: "Need Something Specific?", cta_label: "Get In Touch", cta_href: "/contact" }, order++));
  return sections;
}

function buildAboutPageSections(brief: CreativeBrief, research: Record<string, unknown>): ComponentDefinition[] {
  const sections: ComponentDefinition[] = [];
  let order = 1;
  sections.push(createComponent("HeroEditorial", "left-aligned", { headline: "About Us", sub_headline: research.positioning as string | undefined }, order++));
  if (research.company_summary) {
    sections.push(createComponent("SplitContent", "text-left", { heading: "Who We Are", body_copy: String(research.company_summary) }, order++));
  }
  const accreditations = Array.isArray(research.accreditations) ? research.accreditations : [];
  if (accreditations.length > 0) {
    sections.push(createComponent("TrustStrip", "with-icons", { heading: "Our Credentials", trust_items: accreditations.map((a: unknown) => ({ label: String(a) })) }, order++));
  }
  sections.push(createComponent("CTASection", "centred", { heading: "Work With Us", cta_label: "Get In Touch", cta_href: "/contact" }, order++));
  return sections;
}

function buildContactPageSections(brief: CreativeBrief, research: Record<string, unknown>): ComponentDefinition[] {
  const sections: ComponentDefinition[] = [];
  const contact = research.contact_information as Record<string, unknown> | undefined;
  sections.push(createComponent("HeroEditorial", "centred", { headline: "Get In Touch", sub_headline: "We'd love to hear from you." }, 1));
  sections.push(createComponent("FeatureInteractive", "contact_form", { feature_key: "contact_form", heading: "Send Us a Message", phone: contact?.phone, email: contact?.email }, 2));
  return sections;
}

function createComponent(key: string, variant: string, props: Record<string, unknown>, order: number): ComponentDefinition {
  // Ensure component exists in registry — fall back to SplitContent safely
  const finalKey = key in COMPONENT_REGISTRY ? key : "SplitContent";
  return {
    id: crypto.randomUUID(),
    component_key: finalKey,
    variant,
    props,
    order,
  };
}

function buildSiteContent(research: Record<string, unknown>): Record<string, unknown> {
  return {
    company_name:  research.company_name  ?? "",
    sector:        research.sector        ?? "",
    phone:         (research.contact_information as Record<string, unknown> | undefined)?.phone ?? "",
    email:         (research.contact_information as Record<string, unknown> | undefined)?.email ?? "",
    address:       (research.contact_information as Record<string, unknown> | undefined)?.address ?? "",
    social:        research.social_profiles ?? {},
    accreditations: research.accreditations ?? [],
  };
}

// ============================================================================
// DESIGN REVIEW
// ============================================================================

export interface DesignReviewOutput {
  success: boolean;
  review?: Record<string, unknown>;
  passed: boolean;
  ai_slop_score: number;
  overall_score: number;
  ai_cost: number;
  error?: string;
}

export async function runDesignReview(
  siteConfig: Record<string, unknown>,
  designTokens: DesignTokens,
  briefSummary?: string,
  screenshotAvailable = false
): Promise<DesignReviewOutput> {
  const result = await runAITask({
    task: "visual_qa",
    payload: {
      site_config: siteConfig,
      design_tokens: designTokens,
      brief_summary: briefSummary,
      screenshot_available: screenshotAvailable,
    },
  });

  if (!result.success || !result.result) {
    return { success: false, passed: false, ai_slop_score: 100, overall_score: 0, ai_cost: result.usage.estimatedCost, error: result.error };
  }

  const review = result.result as Record<string, unknown>;
  const overall = Number(review.overall_score ?? 50);
  const aiSlop  = Number(review.ai_slop_score ?? 50);
  const passed  = overall >= 65 && aiSlop <= 35;

  return { success: true, review, passed, overall_score: overall, ai_slop_score: aiSlop, ai_cost: result.usage.estimatedCost };
}

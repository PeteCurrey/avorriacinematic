/**
 * AVORRIA WEBSITE FACTORY — COMPONENT REGISTRY
 *
 * Controlled registry of all components the AI may select when building sites.
 * AI must choose from this registry. It cannot invent new component types.
 * Each component defines its contract — required/optional props, variants, constraints.
 */

export type ComponentCategory =
  | "hero"
  | "content"
  | "media"
  | "trust"
  | "conversion"
  | "features"
  | "navigation"
  | "footer";

export type MotionPattern =
  | "none"
  | "fade_reveal"
  | "mask_reveal"
  | "image_scale"
  | "parallax_subtle"
  | "text_reveal"
  | "section_transition";

export interface ComponentSpec {
  key: string;
  label: string;
  category: ComponentCategory;
  description: string;
  variants: string[];
  required_props: string[];
  optional_props: string[];
  supported_motion: MotionPattern[];
  supported_backgrounds: ("light" | "dark" | "accent" | "image" | "video")[];
  mobile_behaviour: "stack" | "scroll" | "collapse" | "reorder";
  max_per_page: number;
  version: string;
}

export const COMPONENT_REGISTRY: Record<string, ComponentSpec> = {

  // ── HEROES ────────────────────────────────────────────────────────────────

  HeroCinematic: {
    key: "HeroCinematic",
    label: "Cinematic Hero",
    category: "hero",
    description: "Full-bleed image/video hero with large headline and single CTA. Strong visual impact.",
    variants: ["dark-overlay", "light-wash", "split-content"],
    required_props: ["headline", "cta_label", "cta_href"],
    optional_props: ["sub_headline", "media_id", "media_type", "overlay_opacity", "eyebrow"],
    supported_motion: ["mask_reveal", "image_scale", "text_reveal"],
    supported_backgrounds: ["image", "video", "dark"],
    mobile_behaviour: "stack",
    max_per_page: 1,
    version: "1.0",
  },

  HeroEditorial: {
    key: "HeroEditorial",
    label: "Editorial Hero",
    category: "hero",
    description: "Typography-led hero with contained width. Strong for professional/service businesses.",
    variants: ["left-aligned", "centred", "split-with-image"],
    required_props: ["headline", "cta_label", "cta_href"],
    optional_props: ["sub_headline", "body_copy", "media_id", "badge"],
    supported_motion: ["fade_reveal", "text_reveal"],
    supported_backgrounds: ["light", "dark", "accent"],
    mobile_behaviour: "stack",
    max_per_page: 1,
    version: "1.0",
  },

  HeroSplit: {
    key: "HeroSplit",
    label: "Split Hero",
    category: "hero",
    description: "50/50 content and image split. Works well for service businesses.",
    variants: ["content-left", "content-right", "asymmetric"],
    required_props: ["headline", "body_copy", "media_id"],
    optional_props: ["cta_label", "cta_href", "secondary_cta_label", "secondary_cta_href", "badge"],
    supported_motion: ["fade_reveal", "mask_reveal"],
    supported_backgrounds: ["light", "dark"],
    mobile_behaviour: "stack",
    max_per_page: 1,
    version: "1.0",
  },

  // ── CONTENT ───────────────────────────────────────────────────────────────

  ServiceGrid: {
    key: "ServiceGrid",
    label: "Service Grid",
    category: "content",
    description: "Grid of services with icon, title, description. Avoid card overuse.",
    variants: ["2-col", "3-col", "list", "editorial"],
    required_props: ["services"],
    optional_props: ["heading", "sub_heading", "cta_label", "cta_href"],
    supported_motion: ["fade_reveal"],
    supported_backgrounds: ["light", "dark", "accent"],
    mobile_behaviour: "stack",
    max_per_page: 2,
    version: "1.0",
  },

  SplitContent: {
    key: "SplitContent",
    label: "Split Content",
    category: "content",
    description: "50/50 text and media. Versatile narrative section.",
    variants: ["text-left", "text-right", "text-left-dark", "text-right-dark"],
    required_props: ["heading", "body_copy"],
    optional_props: ["media_id", "eyebrow", "cta_label", "cta_href", "stats", "list_items"],
    supported_motion: ["fade_reveal", "mask_reveal"],
    supported_backgrounds: ["light", "dark"],
    mobile_behaviour: "stack",
    max_per_page: 4,
    version: "1.0",
  },

  ProcessSequence: {
    key: "ProcessSequence",
    label: "Process Sequence",
    category: "content",
    description: "Numbered steps or process flow. Good for trades, professional services.",
    variants: ["horizontal", "vertical", "numbered"],
    required_props: ["steps"],
    optional_props: ["heading", "sub_heading"],
    supported_motion: ["fade_reveal", "text_reveal"],
    supported_backgrounds: ["light", "dark", "accent"],
    mobile_behaviour: "stack",
    max_per_page: 2,
    version: "1.0",
  },

  FullBleedMedia: {
    key: "FullBleedMedia",
    label: "Full Bleed Media",
    category: "media",
    description: "Edge-to-edge image or video section. Creates visual breathing room.",
    variants: ["image", "video", "parallax"],
    required_props: ["media_id"],
    optional_props: ["overlay_text", "ratio"],
    supported_motion: ["parallax_subtle", "image_scale"],
    supported_backgrounds: ["image", "video"],
    mobile_behaviour: "scroll",
    max_per_page: 3,
    version: "1.0",
  },

  MediaReveal: {
    key: "MediaReveal",
    label: "Media Reveal",
    category: "media",
    description: "Animated reveal of key brand or project imagery.",
    variants: ["single", "diptych", "triptych"],
    required_props: ["media_ids"],
    optional_props: ["caption"],
    supported_motion: ["mask_reveal", "fade_reveal"],
    supported_backgrounds: ["light", "dark"],
    mobile_behaviour: "stack",
    max_per_page: 2,
    version: "1.0",
  },

  Gallery: {
    key: "Gallery",
    label: "Gallery",
    category: "media",
    description: "Project/work gallery. Use only with genuine quality imagery.",
    variants: ["grid", "masonry", "horizontal-scroll"],
    required_props: ["media_ids"],
    optional_props: ["heading", "filter_categories"],
    supported_motion: ["fade_reveal"],
    supported_backgrounds: ["light", "dark"],
    mobile_behaviour: "scroll",
    max_per_page: 1,
    version: "1.0",
  },

  // ── TRUST ─────────────────────────────────────────────────────────────────

  TrustStrip: {
    key: "TrustStrip",
    label: "Trust Strip",
    category: "trust",
    description: "Key trust signals: accreditations, years, certifications. Only use with real data.",
    variants: ["horizontal", "compact", "with-icons"],
    required_props: ["trust_items"],
    optional_props: ["heading"],
    supported_motion: ["fade_reveal"],
    supported_backgrounds: ["light", "dark", "accent"],
    mobile_behaviour: "scroll",
    max_per_page: 2,
    version: "1.0",
  },

  ReviewFeature: {
    key: "ReviewFeature",
    label: "Review Feature",
    category: "trust",
    description: "Showcase Google reviews or testimonials. Only use real reviews.",
    variants: ["single-featured", "carousel", "grid"],
    required_props: ["review_source", "rating"],
    optional_props: ["review_count", "featured_reviews", "heading"],
    supported_motion: ["fade_reveal"],
    supported_backgrounds: ["light", "dark"],
    mobile_behaviour: "stack",
    max_per_page: 1,
    version: "1.0",
  },

  // ── CONVERSION ────────────────────────────────────────────────────────────

  CTASection: {
    key: "CTASection",
    label: "CTA Section",
    category: "conversion",
    description: "Strong call-to-action section. Should feel urgent but not desperate.",
    variants: ["centred", "split", "full-bleed"],
    required_props: ["heading", "cta_label", "cta_href"],
    optional_props: ["sub_heading", "secondary_cta_label", "secondary_cta_href", "media_id"],
    supported_motion: ["fade_reveal"],
    supported_backgrounds: ["light", "dark", "accent", "image"],
    mobile_behaviour: "stack",
    max_per_page: 2,
    version: "1.0",
  },

  LocationSection: {
    key: "LocationSection",
    label: "Location Section",
    category: "conversion",
    description: "Service area, map, or location relevance. Important for local businesses.",
    variants: ["areas-list", "map-embed", "county-coverage"],
    required_props: ["locations"],
    optional_props: ["heading", "map_embed_url", "cta_label", "cta_href"],
    supported_motion: ["fade_reveal"],
    supported_backgrounds: ["light", "dark"],
    mobile_behaviour: "stack",
    max_per_page: 1,
    version: "1.0",
  },

  FAQ: {
    key: "FAQ",
    label: "FAQ",
    category: "conversion",
    description: "Frequently asked questions. Use only real questions from research.",
    variants: ["accordion", "two-col"],
    required_props: ["questions"],
    optional_props: ["heading"],
    supported_motion: ["fade_reveal"],
    supported_backgrounds: ["light", "dark"],
    mobile_behaviour: "stack",
    max_per_page: 1,
    version: "1.0",
  },

  // ── FEATURES ──────────────────────────────────────────────────────────────

  FeatureInteractive: {
    key: "FeatureInteractive",
    label: "Interactive Feature",
    category: "features",
    description: "Sector-specific interactive element (booking CTA, quote request, etc.).",
    variants: ["contact_form", "quote_form", "booking_cta", "whatsapp_cta", "callback_request"],
    required_props: ["feature_key"],
    optional_props: ["heading", "body_copy", "media_id"],
    supported_motion: ["fade_reveal"],
    supported_backgrounds: ["light", "dark", "accent"],
    mobile_behaviour: "stack",
    max_per_page: 2,
    version: "1.0",
  },

  // ── NAVIGATION ────────────────────────────────────────────────────────────

  Navigation: {
    key: "Navigation",
    label: "Navigation",
    category: "navigation",
    description: "Site navigation header.",
    variants: ["transparent", "white", "dark", "sticky"],
    required_props: ["logo_id", "nav_items"],
    optional_props: ["cta_label", "cta_href", "phone"],
    supported_motion: ["none"],
    supported_backgrounds: ["light", "dark"],
    mobile_behaviour: "collapse",
    max_per_page: 1,
    version: "1.0",
  },

  // ── FOOTER ────────────────────────────────────────────────────────────────

  Footer: {
    key: "Footer",
    label: "Footer",
    category: "footer",
    description: "Site footer with contact, navigation, and social links.",
    variants: ["standard", "minimal", "dark", "brand"],
    required_props: ["company_name", "nav_items"],
    optional_props: ["phone", "email", "address", "social_links", "cta_label", "cta_href", "accreditation_ids"],
    supported_motion: ["none"],
    supported_backgrounds: ["dark", "light", "accent"],
    mobile_behaviour: "stack",
    max_per_page: 1,
    version: "1.0",
  },
};

export const FEATURE_REGISTRY: Record<string, {
  key: string;
  label: string;
  status: "active" | "demo" | "planned";
  component: string;
  sector_relevance: string[];
  demo_mode_label?: string;
}> = {
  contact_form:       { key: "contact_form",       label: "Contact Form",          status: "active", component: "FeatureInteractive", sector_relevance: ["all"] },
  quote_form:         { key: "quote_form",          label: "Quote Request",         status: "active", component: "FeatureInteractive", sector_relevance: ["trades", "construction", "automotive", "professional_services"] },
  booking_cta:        { key: "booking_cta",         label: "Book Appointment",      status: "active", component: "FeatureInteractive", sector_relevance: ["dental", "medical", "beauty", "automotive"] },
  whatsapp_cta:       { key: "whatsapp_cta",        label: "WhatsApp CTA",          status: "active", component: "FeatureInteractive", sector_relevance: ["all"] },
  callback_request:   { key: "callback_request",    label: "Request a Callback",    status: "active", component: "FeatureInteractive", sector_relevance: ["all"] },
  review_feed:        { key: "review_feed",         label: "Google Review Feed",    status: "demo",   component: "ReviewFeature",      sector_relevance: ["all"], demo_mode_label: "DEMO — Requires Google API integration" },
  map:                { key: "map",                  label: "Location Map",          status: "active", component: "LocationSection",    sector_relevance: ["all"] },
  faq:                { key: "faq",                  label: "FAQ",                   status: "active", component: "FAQ",                sector_relevance: ["all"] },
  mot_checker:        { key: "mot_checker",          label: "MOT Due Checker",       status: "demo",   component: "FeatureInteractive", sector_relevance: ["automotive"], demo_mode_label: "DEMO — Requires DVLA API integration" },
  valuation_form:     { key: "valuation_form",       label: "Property Valuation",    status: "demo",   component: "FeatureInteractive", sector_relevance: ["estate_agent"], demo_mode_label: "DEMO — Production integration required" },
  service_area_lookup:{ key: "service_area_lookup",  label: "Service Area Lookup",   status: "demo",   component: "FeatureInteractive", sector_relevance: ["trades", "construction"], demo_mode_label: "DEMO — Production integration required" },
};

/** Validates that a component key exists in the registry */
export function isValidComponent(key: string): boolean {
  return key in COMPONENT_REGISTRY;
}

/** Returns all components in a category */
export function getComponentsByCategory(category: ComponentCategory): ComponentSpec[] {
  return Object.values(COMPONENT_REGISTRY).filter(c => c.category === category);
}

/** Validate a component definition against the registry */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateComponentDefinition(def: {
  component_key: string;
  variant?: string;
  props: Record<string, unknown>;
}): ValidationResult {
  const errors: string[] = [];
  const spec = COMPONENT_REGISTRY[def.component_key];

  if (!spec) {
    return { valid: false, errors: [`Unknown component: ${def.component_key}`] };
  }

  if (def.variant && !spec.variants.includes(def.variant)) {
    errors.push(`Invalid variant "${def.variant}" for ${def.component_key}. Valid: ${spec.variants.join(", ")}`);
  }

  for (const required of spec.required_props) {
    if (!(required in def.props) || def.props[required] === null || def.props[required] === undefined) {
      errors.push(`Missing required prop "${required}" for ${def.component_key}`);
    }
  }

  // Security: prevent arbitrary script/HTML injection
  const propsStr = JSON.stringify(def.props);
  if (/<script/i.test(propsStr) || /javascript:/i.test(propsStr) || /on\w+\s*=/i.test(propsStr)) {
    errors.push("Security: props contain disallowed script content");
  }

  return { valid: errors.length === 0, errors };
}

/** Detect layout monotony — too many of the same component */
export function detectLayoutProblems(sections: Array<{ component_key: string }>): string[] {
  const warnings: string[] = [];
  const counts: Record<string, number> = {};

  for (const s of sections) {
    counts[s.component_key] = (counts[s.component_key] ?? 0) + 1;
    const spec = COMPONENT_REGISTRY[s.component_key];
    if (spec && counts[s.component_key] > spec.max_per_page) {
      warnings.push(`${s.component_key} used ${counts[s.component_key]} times (max: ${spec.max_per_page})`);
    }
  }

  // Check for repetitive card-heavy layouts
  const cardComponents = ["ServiceGrid", "ServiceGrid"];
  const consecutiveCards = sections.filter(s => cardComponents.includes(s.component_key));
  if (consecutiveCards.length >= 3) {
    warnings.push("Layout warning: excessive grid/card sections — ensure visual variety");
  }

  return warnings;
}

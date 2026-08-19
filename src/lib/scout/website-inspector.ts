/**
 * AVORRIA — WEBSITE INSPECTOR
 *
 * Fetches and parses a business website homepage to extract objective
 * technical signals. No headless browser. Pure fetch + string parsing.
 *
 * Returns partial data on failure — never throws.
 */

export interface WebsiteSignals {
  url: string;
  httpStatus: number;
  isHttps: boolean;
  hasViewportMeta: boolean;
  hasCanonical: boolean;
  hasRobots: boolean;
  hasSitemap: boolean;
  hasStructuredData: boolean;
  hasContactForm: boolean;
  hasOnlineBooking: boolean;
  hasLiveChat: boolean;
  hasWhatsApp: boolean;
  hasClearCta: boolean;
  hasSocialLinks: boolean;
  hasSSL: boolean;
  metaTitle?: string;
  metaDescription?: string;
  copyrightYear?: number | null;
  estimatedAgeIndicators: string[];
  pageLinks: string[];
  technologies: string[];
  bodyTextSample?: string;
  fetchError?: string;
}

export async function inspectWebsite(
  rawUrl: string,
  options: { timeoutMs?: number } = {}
): Promise<WebsiteSignals> {
  const timeoutMs = options.timeoutMs ?? 15_000;

  let url = rawUrl.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) url = "https://" + url;
  const isHttps = url.startsWith("https://");

  const base: WebsiteSignals = {
    url,
    httpStatus: 0,
    isHttps,
    hasViewportMeta:    false,
    hasCanonical:       false,
    hasRobots:          false,
    hasSitemap:         false,
    hasStructuredData:  false,
    hasContactForm:     false,
    hasOnlineBooking:   false,
    hasLiveChat:        false,
    hasWhatsApp:        false,
    hasClearCta:        false,
    hasSocialLinks:     false,
    hasSSL:             isHttps,
    estimatedAgeIndicators: [],
    pageLinks: [],
    technologies: [],
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Avorria-Scout/1.0; +https://avorria.com)",
        "Accept": "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timer);
    base.httpStatus = res.status;

    if (!res.ok && res.status !== 403 && res.status !== 429) {
      return { ...base, fetchError: `HTTP ${res.status}` };
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("html")) {
      return { ...base, fetchError: "Non-HTML content type" };
    }

    const html = await res.text();
    return parseHTML(html, base);

  } catch (err) {
    clearTimeout(timer);
    const msg = err instanceof Error ? err.message : "Network error";
    return { ...base, fetchError: msg.slice(0, 100) };
  }
}

function parseHTML(html: string, base: WebsiteSignals): WebsiteSignals {
  const h = html.toLowerCase();
  const result = { ...base };

  // Meta title
  const titleMatch = html.match(/<title[^>]*>([^<]{1,200})<\/title>/i);
  result.metaTitle = titleMatch ? titleMatch[1].trim() : undefined;

  // Meta description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{1,300})["']/i)
                 ?? html.match(/<meta[^>]+content=["']([^"']{1,300})["'][^>]+name=["']description["']/i);
  result.metaDescription = descMatch ? descMatch[1].trim() : undefined;

  // Viewport meta
  result.hasViewportMeta = h.includes("name=\"viewport\"") || h.includes("name='viewport'");

  // Canonical
  result.hasCanonical = h.includes("rel=\"canonical\"") || h.includes("rel='canonical'");

  // Structured data (JSON-LD or microdata)
  result.hasStructuredData = h.includes("application/ld+json") || h.includes("itemtype=");

  // Contact form signals
  result.hasContactForm = (h.includes("<form") && (h.includes("contact") || h.includes("enquir") || h.includes("message") || h.includes("email")));

  // Online booking signals
  result.hasOnlineBooking = h.includes("book") && (h.includes("appointment") || h.includes("online") || h.includes("calendar") || h.includes("schedule"));

  // Live chat
  result.hasLiveChat = h.includes("livechat") || h.includes("live chat") || h.includes("intercom") || h.includes("zendesk") || h.includes("tawk") || h.includes("freshchat") || h.includes("drift.js");

  // WhatsApp
  result.hasWhatsApp = h.includes("wa.me") || h.includes("whatsapp.com") || h.includes("whatsapp");

  // Clear CTA signals
  result.hasClearCta = h.includes("get a quote") || h.includes("free quote") || h.includes("call us") || h.includes("contact us") || h.includes("book now") || h.includes("get in touch") || h.includes("request a") || h.includes("enquire");

  // Social links
  result.hasSocialLinks = h.includes("facebook.com") || h.includes("instagram.com") || h.includes("twitter.com") || h.includes("x.com") || h.includes("linkedin.com");

  // Sitemap
  result.hasSitemap = h.includes("sitemap.xml") || h.includes("sitemap_index");

  // Robots
  result.hasRobots = h.includes("name=\"robots\"") || h.includes("name='robots'");

  // Copyright year
  const copyrightMatch = html.match(/(?:copyright|&copy;|©)\s*(\d{4})/i);
  if (copyrightMatch) {
    const yr = parseInt(copyrightMatch[1]);
    if (yr >= 1995 && yr <= new Date().getFullYear() + 1) {
      result.copyrightYear = yr;
    }
  }

  // Estimated age indicators
  const ageIndicators: string[] = [];
  if (result.copyrightYear) {
    const age = new Date().getFullYear() - result.copyrightYear;
    if (age > 0) ageIndicators.push(`Copyright year ${result.copyrightYear} (${age} years old)`);
  }
  if (!result.hasViewportMeta) ageIndicators.push("No mobile viewport meta (pre-mobile era pattern)");
  if (h.includes("table") && h.includes("cellpadding") || h.includes("cellspacing")) ageIndicators.push("Table-based layout detected");
  if (h.includes("font face") || h.includes("<font ")) ageIndicators.push("Deprecated <font> tag detected");
  if (h.includes("flash") || h.includes(".swf")) ageIndicators.push("Flash content reference");
  result.estimatedAgeIndicators = ageIndicators;

  // Technology detection
  const techs: string[] = [];
  if (h.includes("wp-content") || h.includes("wp-includes")) techs.push("WordPress");
  if (h.includes("squarespace")) techs.push("Squarespace");
  if (h.includes("wix.com") || h.includes("wixsite")) techs.push("Wix");
  if (h.includes("shopify")) techs.push("Shopify");
  if (h.includes("webflow")) techs.push("Webflow");
  if (h.includes("drupal")) techs.push("Drupal");
  if (h.includes("joomla")) techs.push("Joomla");
  if (h.includes("bootstrap")) techs.push("Bootstrap");
  if (h.includes("jquery")) techs.push("jQuery");
  if (h.includes("google-analytics") || h.includes("gtag(") || h.includes("UA-")) techs.push("Google Analytics");
  result.technologies = techs;

  // Extract internal links (for future multi-page inspection)
  const linkMatches = [...html.matchAll(/href=["']([^"'#?]+)["']/gi)];
  const links = linkMatches
    .map(m => m[1])
    .filter(l => !l.startsWith("http") || l.includes(new URL(base.url).hostname))
    .slice(0, 20);
  result.pageLinks = links;

  // Body text sample (strip HTML tags)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) {
    const bodyText = bodyMatch[1]
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    result.bodyTextSample = bodyText.slice(0, 600);
  }

  return result;
}

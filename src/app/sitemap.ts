import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { getPublishedCaseStudies } from "@/lib/case-studies/registry";
import { INTELLIGENCE_ARTICLES } from "@/lib/intelligence/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    // ── Core public routes ─────────────────────────────────────
    { url: `${SITE_URL}`,                        lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/work`,                   lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/start-project`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },

    // ── Services Hub & 5 Core Disciplines ─────────────────────
    { url: `${SITE_URL}/services`,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE_URL}/services/websites`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/services/digital-products`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/services/seo`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/services/performance-marketing`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE_URL}/services/ai-automation`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },

    // ── Editorial + Studio ─────────────────────────────────────
    { url: `${SITE_URL}/intelligence`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/studio`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/lab`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // ── Intelligence articles (published only) ──────────────────
  INTELLIGENCE_ARTICLES.forEach((article) => {
    routes.push({
      url: `${SITE_URL}/intelligence/${article.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  // ── Case study routes — sourced from canonical registry ──────
  // Uses getPublishedCaseStudies() which covers all 10 routes:
  // 6 flagships (001–006) + 4 compact case studies (aesuk, travis-gps, steward-farming, amplios)
  getPublishedCaseStudies().forEach((cs) => {
    routes.push({
      url: `${SITE_URL}/work/${cs.projectSlug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  });

  return routes;
}


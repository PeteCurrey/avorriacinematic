import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";
import { PROJECTS } from "@/content/projects";
import { CAPABILITIES } from "@/content/capabilities";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/work`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/capabilities`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/capabilities/build`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/capabilities/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/capabilities/systems`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/lab`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/intelligence`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/start-project`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  // Only include project case studies that are genuinely available
  // Excluding stubs prevents soft-404 indexation
  PROJECTS.filter((p) => p.caseStudyAvailable).forEach((p) => {
    routes.push({
      url: `${SITE_URL}/work/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    });
  });

  // Include capability pages from content if they resolve
  if (CAPABILITIES && Array.isArray(CAPABILITIES)) {
    // Capabilities already enumerated above by slug — no duplication needed
  }

  return routes;
}


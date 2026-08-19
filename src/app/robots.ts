import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/dev/",       // Internal tooling — never index
          "/api/",       // API routes — not crawlable content
          "/studio/",    // Placeholder stub route
        ]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}


import { Metadata } from "next";

export const SITE_NAME = "Avorria";
export const SITE_TAGLINE = "Precision as Power";
export const SITE_DESCRIPTION =
  "Avorria is an international digital design, engineering, search architecture and AI systems studio.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://avorria.com";

export function generatePageMetadata({
  title,
  description,
  path = "",
  noIndex = false
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const metaDescription = description || SITE_DESCRIPTION;
  const canonical = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description: metaDescription,
    alternates: {
      canonical
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription
    }
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/media/brand/avorria-marque.png`,
    description: SITE_DESCRIPTION,
    contactPoint: {
      "@type": "ContactPoint",
      email: "enquiries@avorria.com",
      contactType: "customer service"
    }
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL
  };
}

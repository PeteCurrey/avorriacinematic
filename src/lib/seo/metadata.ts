import { Metadata } from "next";

export const SITE_NAME = "Avorria";
export const SITE_TAGLINE = "Precision as Power";
export const SITE_DESCRIPTION =
  "Avorria builds digital products that create commercial advantage — web engineering, technical search architecture, AI systems, and operational automation for ambitious organisations.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://avorria.com";
export const OG_IMAGE_URL = `${SITE_URL}/og/avorria-og.jpg`;

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
  // Several pages already carry the brand in their own title (e.g.
  // "Studio — ... | Avorria"). Appending it unconditionally produced
  // "... | Avorria — Avorria" in tabs and search results.
  const alreadyBranded = title
    ? title.toLowerCase().includes(SITE_NAME.toLowerCase())
    : false;
  const fullTitle = title
    ? alreadyBranded
      ? title
      : `${title} — ${SITE_NAME}`
    : `${SITE_NAME} — ${SITE_TAGLINE}`;
  const metaDescription = description || SITE_DESCRIPTION;
  const canonical = `${SITE_URL}${path}`;

  return {
    metadataBase: new URL(SITE_URL),
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
      type: "website",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: "Avorria — Precision as Power. Digital Engineering, Search & AI Systems Studio."
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [OG_IMAGE_URL]
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

export function getServiceSchema(service: {
  title: string;
  description: string;
  slug: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.category,
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL
    },
    url: `${SITE_URL}/services/${service.slug}`
  };
}




import type { Metadata } from "next";
import { Syne, DM_Sans, DM_Mono } from "next/font/google";
import "@/styles/globals.css";
import { RootProviders } from "@/providers/RootProviders";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SkipToContent } from "@/components/site/SkipToContent";
import { ScrollProgressController } from "@/components/site/ScrollProgressController";
import { GlobalCursorLayer } from "@/components/site/GlobalCursorLayer";
import { GlobalTransitionLayer } from "@/components/site/GlobalTransitionLayer";
import { DebugGrid } from "@/components/cinematic/DebugGrid";
import { generatePageMetadata, getOrganizationSchema, getWebSiteSchema } from "@/lib/seo/metadata";

// Syne and DM Sans are variable fonts. Requesting discrete `weight` values
// pulls static instances and any weight outside that set silently falls back
// to a metrically different face — which is what made `font-black` (900)
// render ~47% wider than Syne at 700. Loading the variable axis instead means
// every weight in the family's range renders as the real typeface, and a
// request above the axis maximum clamps to it rather than falling back.
const fontDisplay = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const fontBody = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const fontMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap"
});

export const metadata: Metadata = generatePageMetadata({});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const siteSchema = getWebSiteSchema();

  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className="bg-avorria-black text-avorria-white min-h-screen flex flex-col antialiased selection:bg-avorria-signal selection:text-avorria-black">
        <RootProviders>
          <SkipToContent />
          <ScrollProgressController />
          <GlobalCursorLayer />
          <GlobalTransitionLayer />
          <DebugGrid />
          <SiteHeader />
          <main id="main-content" className="flex-1 w-full" role="main">
            {children}
          </main>
          <SiteFooter />
        </RootProviders>
      </body>
    </html>
  );
}

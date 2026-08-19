import React from "react";
import { generatePageMetadata, getOrganizationSchema } from "@/lib/seo/metadata";
import { ServicesHubHero } from "@/components/services/ServicesHubHero";
import { VisualServiceIndex } from "@/components/services/VisualServiceIndex";
import { ConnectingLifecycle } from "@/components/services/ConnectingLifecycle";
import { ServiceCTASection } from "@/components/services/ServiceCTASection";

export const metadata = generatePageMetadata({
  title: "Commercial Services — Web, Software, Search, Growth & AI Systems | Avorria",
  description: "Avorria designs websites, builds software, grows demand, and automates businesses with AI. Explore our 5 core commercial disciplines and verified client deliverables.",
  path: "/services"
});

export default function ServicesHubPage() {
  const orgSchema = getOrganizationSchema();

  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* 01 // Cinematic Commercial Hero */}
      <ServicesHubHero />

      {/* 02 // Interactive 5-Service Index & Live Working Artefacts */}
      <VisualServiceIndex />

      {/* 03 // Connecting Editorial Statement: THE WEBSITE ISN'T THE END PRODUCT */}
      <ConnectingLifecycle />

      {/* 04 // Commercial Action CTA */}
      <ServiceCTASection
        heading="READY TO TRANSFORM YOUR DIGITAL OPERATION?"
        description="We partner with ambitious founders, CEOs, and operational leaders across design, engineering, search, and AI. Let's discuss scope, timelines, and commercial goals."
        buttonText="START A PROJECT"
        projectServiceParam="all"
      />
    </main>
  );
}

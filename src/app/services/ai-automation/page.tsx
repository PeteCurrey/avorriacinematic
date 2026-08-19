import React from "react";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/content/services";
import { generatePageMetadata, getServiceSchema } from "@/lib/seo/metadata";
import { ServicePageHero } from "@/components/services/ServicePageHero";
import { ServiceDeliverablesMatrix } from "@/components/services/ServiceDeliverablesMatrix";
import { ServiceProblemsSolved } from "@/components/services/ServiceProblemsSolved";
import { ServiceMethodology } from "@/components/services/ServiceMethodology";
import { ServiceProofShowcase } from "@/components/services/ServiceProofShowcase";
import { ServiceRelatedGrid } from "@/components/services/ServiceRelatedGrid";
import { ServiceCTASection } from "@/components/services/ServiceCTASection";

export async function generateMetadata() {
  const service = getServiceBySlug("ai-automation");
  if (!service) return {};

  return generatePageMetadata({
    title: service.seo.metaTitle,
    description: service.seo.metaDescription,
    path: "/services/ai-automation"
  });
}

export default function AIAutomationServicePage() {
  const service = getServiceBySlug("ai-automation");
  if (!service) notFound();

  const serviceSchema = getServiceSchema({
    title: service.title,
    description: service.seo.metaDescription,
    slug: service.slug,
    category: service.category
  });

  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* 01 // Hero with Plain-English Proposition */}
      <ServicePageHero service={service} />

      {/* 02 // What We Actually Do (Exact Deliverables) */}
      <ServiceDeliverablesMatrix
        sectionEyebrow="01 // AUTOMATION & AI SCOPE"
        sectionTitle="WHAT WE ACTUALLY AUTOMATE"
        offerings={service.offerings}
      />

      {/* 03 // The Problems We Solve */}
      <ServiceProblemsSolved
        sectionEyebrow="02 // OPERATIONAL BOTTLENECKS"
        sectionTitle="THE PROBLEMS WE SOLVE"
        problems={service.problemsSolved}
      />

      {/* 04 // How Avorria Approaches It */}
      <ServiceMethodology
        sectionEyebrow="03 // DETERMINISTIC AI FRAMEWORK"
        sectionTitle="HOW AVORRIA APPROACHES AI & AUTOMATION"
        steps={service.methodology}
      />

      {/* 05 // Selected Proof in Production */}
      <ServiceProofShowcase
        sectionEyebrow="04 // AUTOMATION IN PRODUCTION"
        sectionTitle="SELECTED AI & WORKFLOW SYSTEMS"
        projects={service.proofProjects}
      />

      {/* 06 // Integrated Disciplines */}
      <ServiceRelatedGrid
        currentServiceCode={service.code}
        relatedServices={service.relatedServices}
      />

      {/* 07 // Final Action CTA */}
      <ServiceCTASection
        heading={service.finalCta.heading}
        description={service.finalCta.description}
        buttonText={service.finalCta.buttonText}
        projectServiceParam={service.finalCta.projectServiceParam}
      />
    </main>
  );
}

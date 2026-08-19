import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCaseStudyBySlug, getPublishedCaseStudies } from "@/lib/case-studies/registry";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { CaseStudyShell } from "@/components/case-study/CaseStudyShell";
import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { CaseStudyMeta } from "@/components/case-study/CaseStudyMeta";
import { CaseStudyChapterRenderer } from "@/components/case-study/CaseStudyChapterRenderer";
import { CaseStudyNextProject } from "@/components/case-study/CaseStudyNextProject";
import { CaseStudyFooter } from "@/components/case-study/CaseStudyFooter";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const published = getPublishedCaseStudies();
  return published.map((cs) => ({
    slug: cs.projectSlug
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = getCaseStudyBySlug(slug);

  if (!config) {
    return generatePageMetadata({
      title: "Case Study Not Found",
      description: "The requested project case study could not be located in the Avorria portfolio archive.",
      noIndex: true
    });
  }

  const isPublished = config.publicationStatus === "PUBLISHED";

  return generatePageMetadata({
    title: config.seo.metaTitle || `${config.canonicalTitle} — Case Study`,
    description: config.seo.metaDescription || config.scopeSummary,
    path: `/work/${slug}`,
    noIndex: !isPublished
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const config = getCaseStudyBySlug(slug);

  if (!config || config.publicationStatus !== "PUBLISHED") {
    notFound();
  }

  return (
    <CaseStudyShell config={config}>
      {/* 01 // Hero Architecture */}
      <CaseStudyHero config={config} />

      {/* 02 // Compact Scope & Metadata Matrix */}
      <CaseStudyMeta config={config} />

      {/* 03 // Narrative & Technical Chapters */}
      <CaseStudyChapterRenderer chapters={config.chapters} />

      {/* 04 // Next Project Transition */}
      <CaseStudyNextProject nextProject={config.nextProject} />

      {/* 05 // Project Conclusion & CTA */}
      <CaseStudyFooter projectTitle={config.canonicalTitle} />
    </CaseStudyShell>
  );
}

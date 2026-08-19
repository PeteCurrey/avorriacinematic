import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECTS, getProjectBySlug } from "@/content/projects";
import { generatePageMetadata } from "@/lib/seo/metadata";

interface CaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug
  }));
}

export async function generateMetadata({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return generatePageMetadata({
    title: project.seo.metaTitle || project.title,
    description: project.seo.metaDescription || project.shortDescription,
    path: "/work/" + slug
  });
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="flex items-center gap-3 mb-8 font-mono text-xs">
        <Link href="/work" className="text-avorria-muted hover:text-avorria-white transition-colors">
          Selected Work
        </Link>
        <span className="text-avorria-line-strong">/</span>
        <span className="text-avorria-signal uppercase">{project.title}</span>
      </div>

      <div className="border-b border-avorria-line pb-16 mb-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs text-avorria-signal">{project.sequenceNumber}</span>
          <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted px-2 py-0.5 border border-avorria-line">
            {project.sector}
          </span>
          <span className="font-mono text-xs text-avorria-muted">{project.year}</span>
        </div>
        <h1 className="display-xl uppercase text-avorria-white max-w-5xl">
          {project.title}
        </h1>
        <p className="font-body text-xl text-avorria-white/80 max-w-3xl mt-6 leading-relaxed">
          {project.longDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8 font-mono text-xs">
          <div className="p-6 border border-avorria-line bg-avorria-surface">
            <h3 className="uppercase tracking-widest text-avorria-muted mb-4 pb-2 border-b border-avorria-line">
              Technical Metadata
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-avorria-muted block">Status</span>
                <span className="text-avorria-white uppercase">{project.status}</span>
              </div>
              <div>
                <span className="text-avorria-muted block">Capabilities</span>
                <span className="text-avorria-signal uppercase">{project.capabilities.join(" / ")}</span>
              </div>
              <div>
                <span className="text-avorria-muted block">Delivery Year</span>
                <span className="text-avorria-white">{project.year}</span>
              </div>
            </div>
          </div>

          <Link
            href="/start-project"
            className="block w-full py-4 px-6 text-center border border-avorria-signal bg-avorria-signal text-avorria-black font-mono text-xs uppercase tracking-widest hover:bg-avorria-white transition-colors"
          >
            Commission Similar Project
          </Link>
        </div>

        <div className="lg:col-span-8 space-y-12">
          <div className="p-12 border border-avorria-line bg-avorria-surface/30 min-h-[400px] flex flex-col justify-center items-center text-center">
            <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted mb-4">
              Structural Hero Media Architecture
            </span>
            <p className="font-mono text-xs text-avorria-line-strong max-w-md">
              Cinematic media player and interactive canvas integration will be plugged in during Phase 01.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

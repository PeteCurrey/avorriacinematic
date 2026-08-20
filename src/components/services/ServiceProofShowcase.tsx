"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { ServiceProofItem } from "@/types/content";

interface ServiceProofShowcaseProps {
  sectionEyebrow?: string;
  sectionTitle?: string;
  projects: ServiceProofItem[];
}

export function ServiceProofShowcase({
  sectionEyebrow = "04 // VERIFIED EVIDENCE",
  sectionTitle = "SELECTED PROOF IN PRODUCTION",
  projects
}: ServiceProofShowcaseProps) {
  return (
    <section className="w-full border-b border-avorria-line bg-avorria-black py-16 sm:py-24">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-avorria-line pb-8 mb-12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal mb-3">
              <span>{sectionEyebrow}</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-avorria-white">
              {sectionTitle}
            </h2>
          </div>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider max-w-md">
            Factual project records. Clear distinction between external client engagements and internal Avorria ventures.
          </p>
        </div>

        {/* 2 or 3 Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.projectSlug}
              className="border border-avorria-line bg-avorria-surface/30 flex flex-col justify-between overflow-hidden group hover:border-avorria-signal transition-all duration-300"
            >
              {/* Media Preview Frame */}
              <div className="relative aspect-[16/10] bg-avorria-surface overflow-hidden border-b border-avorria-line">
                {project.mediaSrc.endsWith(".svg") ? (
                  <div className="w-full h-full flex items-center justify-center p-6 bg-[#0B0D12]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.mediaSrc}
                      alt={project.mediaAlt}
                      className="max-h-full max-w-full object-contain opacity-85 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                ) : (
                  <Image
                    src={project.mediaSrc}
                    alt={project.mediaAlt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                )}

                {/* Badge Overlay: Client Work vs Venture */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`px-2.5 py-1 font-mono text-[10px] uppercase font-bold tracking-widest border ${
                      project.entityType === "CLIENT WORK"
                        ? "bg-avorria-black/90 text-avorria-white border-avorria-line"
                        : "bg-avorria-black/90 text-avorria-signal border-avorria-signal/40"
                    }`}
                  >
                    {project.entityType}
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 z-10">
                  <span className="px-2 py-0.5 bg-avorria-black/80 font-mono text-[10px] text-avorria-quiet uppercase">
                    {project.sector}
                  </span>
                </div>
              </div>

              {/* Project Overview Content */}
              <div className="p-6 sm:p-8 space-y-5 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-avorria-white group-hover:text-avorria-signal transition-colors">
                    {project.title}
                  </h3>

                  {/* Problem & Role */}
                  <div className="space-y-2.5 font-body text-xs text-avorria-white/80">
                    <div>
                      <strong className="text-avorria-muted font-mono uppercase text-[10px] block">
                        THE CHALLENGE:
                      </strong>
                      <p className="mt-0.5 leading-relaxed">{project.problem}</p>
                    </div>

                    <div>
                      <strong className="text-avorria-muted font-mono uppercase text-[10px] block">
                        AVORRIA ROLE:
                      </strong>
                      <p className="mt-0.5 leading-relaxed text-avorria-white">{project.role}</p>
                    </div>

                    <div>
                      <strong className="text-avorria-signal font-mono uppercase text-[10px] block">
                        WHAT WAS BUILT:
                      </strong>
                      <p className="mt-0.5 leading-relaxed text-avorria-white">{project.whatWasBuilt}</p>
                    </div>
                  </div>
                </div>

                {/* Tags & Action Link */}
                <div className="pt-5 border-t border-avorria-line/40 space-y-4">
                  <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-avorria-muted">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 bg-avorria-black border border-avorria-line/60">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.caseStudyAvailable ? (
                    <Link
                      href={`/work/${project.projectSlug}`}
                      className="inline-flex items-center justify-between w-full font-mono text-xs text-avorria-signal font-bold uppercase tracking-widest hover:underline pt-1"
                    >
                      <span>VIEW CASE STUDY</span>
                      <span>→</span>
                    </Link>
                  ) : (
                    <div className="font-mono text-[11px] text-avorria-quiet uppercase tracking-wider">
                      Delivered Project
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { BreakableTitle } from "./BreakableTitle";
import Link from "next/link";
import Image from "next/image";
import type { WorkProject } from "@/types/work";

interface FeaturedProjectProps {
  project: WorkProject;
}

export function FeaturedProjectPortrait({ project }: FeaturedProjectProps) {
  return (
    <article className="group relative border-b border-avorria-line py-16 sm:py-28">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Top Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4 mb-10">
          <div className="flex items-center gap-3">
            <span className="text-avorria-signal font-bold">{project.projectIndex}</span>
            <span className="text-avorria-line-strong">/</span>
            <span className="text-avorria-white">{project.sector}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{project.capabilities.join(" // ")}</span>
            <span className="text-avorria-muted">{project.year}</span>
          </div>
        </div>

        {/* Asymmetric Portrait Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Portrait Hero Still */}
          <div className="lg:col-span-5">
            <Link
              href={`/work/${project.slug}`}
              className="block relative w-full aspect-[3/4] overflow-hidden bg-avorria-surface border border-avorria-line/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-avorria-signal"
              aria-label={`View $<BreakableTitle text={project.title} /> case study`}
            >
              <Image
                src={project.heroMedia}
                alt={`$<BreakableTitle text={project.title} /> - Human Intelligence Platform`}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-avorria-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-avorria-signal bg-avorria-black/80 px-3 py-1 border border-avorria-signal/40">
                HUMAN TWIN // VERIFIED
              </div>
            </Link>
          </div>

          {/* Right Column: Architectural Narrative & Interface Preview */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <Link
                href={`/work/${project.slug}`}
                className="block max-w-full group-hover:text-avorria-signal transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
              >
                <h2 className="display-column text-avorria-white group-hover:text-avorria-signal transition-colors">
                  <BreakableTitle text={project.title} />
                </h2>
              </Link>
              <p className="font-mono text-xs sm:text-sm text-avorria-muted uppercase tracking-wider mt-2">
                {project.descriptor}
              </p>
            </div>

            <div className="space-y-4 border-t border-avorria-line/40 pt-6">
              <p className="font-body text-base text-avorria-white/90 leading-relaxed max-w-xl">
                {project.shortSummary}
              </p>
              <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider leading-relaxed max-w-xl">
                {project.role}
              </p>
            </div>

            {/* Micro Spec Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-avorria-line/40 pt-6 font-mono text-[11px]">
              <div>
                <span className="text-avorria-quiet uppercase tracking-wider block">RELATIONSHIP</span>
                <span className="text-avorria-white font-bold">{project.relationship}</span>
              </div>
              <div>
                <span className="text-avorria-quiet uppercase tracking-wider block">DEPLOYMENT</span>
                <span className="text-avorria-signal font-bold">{project.status}</span>
              </div>
              <div>
                <span className="text-avorria-quiet uppercase tracking-wider block">ACTION</span>
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-2 text-avorria-white group-hover:text-avorria-signal font-bold transition-colors"
                >
                  <span>CASE STUDY</span>
                  <span className="text-avorria-signal">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

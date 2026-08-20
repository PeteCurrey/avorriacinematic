import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { WorkProject } from "@/types/work";

interface FeaturedProjectProps {
  project: WorkProject;
}

export function FeaturedProjectWide({ project }: FeaturedProjectProps) {
  return (
    <article className="group relative border-b border-avorria-line py-16 sm:py-28">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-8">
        {/* Top Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
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

        {/* Hero Visual Container */}
        <Link
          href={`/work/${project.slug}`}
          className="block relative w-full aspect-[16/9] sm:aspect-[16/10] overflow-hidden bg-avorria-surface border border-avorria-line/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-avorria-signal"
          aria-label={`View ${project.title} case study`}
        >
          <Image
            src={project.heroMedia}
            alt={`${project.title} - ${project.descriptor}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1760px"
            priority
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
          />
          {/* Subtle Ambient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-avorria-black/60 via-transparent to-transparent pointer-events-none" />
        </Link>

        {/* Bottom Headline & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4">
          <div className="lg:col-span-8">
            <Link
              href={`/work/${project.slug}`}
              className="block max-w-full group-hover:text-avorria-signal transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
            >
              <h2 className="display-column text-avorria-white group-hover:text-avorria-signal transition-colors">
                {project.title}
              </h2>
            </Link>
            <p className="font-mono text-xs sm:text-sm text-avorria-muted uppercase tracking-wider mt-2">
              {project.descriptor}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between gap-6 lg:items-end">
            <p className="font-body text-sm text-avorria-white/80 leading-relaxed max-w-sm lg:text-right">
              {project.shortSummary}
            </p>
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-white group-hover:text-avorria-signal transition-colors"
            >
              <span>CASE STUDY</span>
              <span className="text-avorria-signal transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

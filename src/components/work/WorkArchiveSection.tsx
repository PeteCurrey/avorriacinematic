"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ARCHIVE_WORK } from "@/lib/projects/work-registry";

export function WorkArchiveSection() {
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);

  const activeProject = activeHoverIndex !== null ? ARCHIVE_WORK[activeHoverIndex] : null;

  return (
    <section aria-label="Project Archive Index" className="border-b border-avorria-line py-20 sm:py-32">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-avorria-line/40 pb-6">
          <div>
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block mb-2">
              03 // ARCHIVE
            </span>
            <h2 className="display-lg font-display font-black uppercase tracking-tight text-avorria-white">
              DOCUMENTED WORK
            </h2>
          </div>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider max-w-sm">
            Historical deployments, bespoke reservation engines, and specialised commercial catalogs.
          </p>
        </div>

        {/* Two-Column Archive: Interactive Table Left, Sticky Preview Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Project Rows */}
          <div className="lg:col-span-8 divide-y divide-avorria-line/40 border-t border-b border-avorria-line/40">
            {ARCHIVE_WORK.map((project, index) => (
              <div
                key={project.slug}
                onMouseEnter={() => setActiveHoverIndex(index)}
                onMouseLeave={() => setActiveHoverIndex(null)}
                className="group py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-avorria-surface/40 px-3 -mx-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-avorria-signal">
                      {project.year}
                    </span>
                    <span className="text-avorria-line-strong">/</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-avorria-quiet">
                      {project.sector}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-avorria-white group-hover:text-avorria-signal transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-body text-xs text-avorria-muted max-w-lg leading-relaxed pt-1">
                    {project.shortSummary}
                  </p>
                </div>

                <div className="flex sm:flex-col sm:items-end justify-between font-mono text-[11px] uppercase tracking-wider text-avorria-quiet">
                  <span>{project.capabilities.join(" // ")}</span>
                  <span className="text-avorria-white font-bold">{project.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Desktop Sticky Media Preview */}
          <div className="hidden lg:block lg:col-span-4 sticky top-32">
            <div className="relative w-full aspect-[4/3] bg-avorria-surface border border-avorria-line overflow-hidden">
              {activeProject ? (
                <>
                  <Image
                    src={activeProject.heroMedia}
                    alt={`${activeProject.title} archive preview`}
                    fill
                    sizes="33vw"
                    className="object-cover object-center transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-avorria-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] uppercase tracking-wider text-avorria-white">
                    <span className="text-avorria-signal font-bold block">{activeProject.title}</span>
                    <span className="text-avorria-muted">{activeProject.descriptor}</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-avorria-quiet font-mono text-xs uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-avorria-signal/40 mb-3" aria-hidden="true" />
                  <span>HOVER PROJECT ROW TO PREVIEW ARCHIVE STILL</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

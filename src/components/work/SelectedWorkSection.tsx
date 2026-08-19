import React from "react";
import Image from "next/image";
import { SELECTED_WORK } from "@/lib/projects/work-registry";

export function SelectedWorkSection() {
  return (
    <section aria-label="Selected Projects" className="border-b border-avorria-line py-20 sm:py-32">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-avorria-line/40 pb-6">
          <div>
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block mb-2">
              02 // SELECTED
            </span>
            <h2 className="display-lg font-display font-black uppercase tracking-tight text-avorria-white">
              ENGINEERED SYSTEMS
            </h2>
          </div>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider max-w-sm">
            Curated commercial deployments, technical visibility architectures, and specialized data platforms.
          </p>
        </div>

        {/* Asymmetric Editorial Magazine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          {SELECTED_WORK.map((project) => {
            const colSpanClass =
              project.colSpan === 7
                ? "md:col-span-7"
                : project.colSpan === 6
                ? "md:col-span-6"
                : project.colSpan === 5
                ? "md:col-span-5"
                : "md:col-span-6";

            return (
              <article
                key={project.slug}
                className={`group flex flex-col justify-between space-y-6 ${colSpanClass}`}
              >
                {/* Visual Media */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-avorria-surface border border-avorria-line/60">
                  <Image
                    src={project.heroMedia}
                    alt={`${project.title} - ${project.descriptor}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-avorria-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {project.externalUrl && (
                    <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest text-avorria-signal bg-avorria-black/80 px-2.5 py-1 border border-avorria-signal/40">
                      LIVE DEPLOYMENT ↗
                    </div>
                  )}
                </div>

                {/* Metadata & Headline */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-avorria-quiet border-b border-avorria-line/40 pb-2">
                    <span className="text-avorria-white">{project.sector}</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-avorria-white group-hover:text-avorria-signal transition-colors">
                    <a href={`/work/${project.slug}`}>
                      {project.title}
                    </a>
                  </h3>

                  <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider">
                    {project.descriptor}
                  </p>

                  <p className="font-body text-sm text-avorria-white/80 leading-relaxed pt-2">
                    {project.shortSummary}
                  </p>
                </div>

                {/* Footer Cap */}
                <div className="pt-4 border-t border-avorria-line/40 flex items-center justify-between font-mono text-[11px] text-avorria-quiet uppercase tracking-wider">
                  <span>{project.capabilities.join(" // ")}</span>
                  <a
                    href={`/work/${project.slug}`}
                    className="text-avorria-white hover:text-avorria-signal font-bold flex items-center gap-1 transition-colors"
                  >
                    <span>CASE STUDY</span>
                    <span className="text-avorria-signal">→</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

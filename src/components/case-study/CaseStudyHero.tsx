import React from "react";
import Image from "next/image";
import type { CaseStudyConfig } from "@/types/case-study";

interface CaseStudyHeroProps {
  config: CaseStudyConfig;
}

export function CaseStudyHero({ config }: CaseStudyHeroProps) {
  const { heroMode, heroMedia, canonicalTitle, projectIndex, scopeSummary, year } = config;

  return (
    <section aria-label={`${canonicalTitle} Overview`} className="border-b border-avorria-line pb-16 sm:pb-28">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12 sm:space-y-16">
        {/* Top Header Information */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <div className="flex items-center gap-3">
              {projectIndex && <span className="text-avorria-signal font-bold">{projectIndex}</span>}
              <span className="text-avorria-line-strong">/</span>
              <span className="text-avorria-white">{config.relationship}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{config.capabilities.join(" // ")}</span>
              <span className="text-avorria-muted">{year}</span>
            </div>
          </div>

          <div className="max-w-5xl space-y-4">
            <h1 className="display-xxl font-display font-black uppercase tracking-tight text-avorria-white leading-none">
              {canonicalTitle}
            </h1>
            <p className="font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-wider">
              {scopeSummary}
            </p>
          </div>
        </div>

        {/* Hero Mode Specific Visual Presentation */}
        {heroMode === "PRODUCT" && (
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] overflow-hidden bg-avorria-surface border border-avorria-line">
            <Image
              src={heroMedia.src}
              alt={heroMedia.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1760px"
              priority={heroMedia.priority}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-avorria-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-avorria-signal bg-avorria-black/80 px-3 py-1.5 border border-avorria-signal/40">
              FLAGSHIP PRODUCT // ENGINEERING
            </div>
          </div>
        )}

        {heroMode === "HUMAN" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative w-full aspect-[3/4] overflow-hidden bg-avorria-surface border border-avorria-line">
              <Image
                src={heroMedia.src}
                alt={heroMedia.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority={heroMedia.priority}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-avorria-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-avorria-signal bg-avorria-black/80 px-3 py-1 border border-avorria-signal/40">
                HUMAN INTELLIGENCE // MODEL
              </div>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                TALENT ACCELERATION GRAPH
              </span>
              <p className="font-display font-bold text-2xl sm:text-4xl text-avorria-white uppercase tracking-tight leading-tight">
                Synthesizing executive capability graphs and intelligent Career Twin pathways.
              </p>
              <div className="border-t border-avorria-line/40 pt-6 font-mono text-xs text-avorria-muted uppercase tracking-wider space-y-2">
                {config.introNarrative.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        )}

        {heroMode === "SPATIAL" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                GEOSPATIAL AGGREGATION ENGINE
              </span>
              <p className="font-display font-bold text-2xl sm:text-4xl text-avorria-white uppercase tracking-tight leading-tight">
                Institutional property intelligence, planning polygons, and automated valuation models.
              </p>
              <div className="border-t border-avorria-line/40 pt-6 font-mono text-xs text-avorria-muted uppercase tracking-wider space-y-2">
                {config.introNarrative.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 relative w-full aspect-[4/3] overflow-hidden bg-avorria-surface border border-avorria-line">
              <Image
                src={heroMedia.src}
                alt={heroMedia.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={heroMedia.priority}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-avorria-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-widest text-avorria-white bg-avorria-black/80 px-3 py-1 border border-avorria-line">
                SPATIAL DATA ENGINE
              </div>
            </div>
          </div>
        )}

        {(heroMode === "INTERFACE" || heroMode === "DATA_DENSE") && (
          <div className="space-y-6">
            <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] overflow-hidden bg-avorria-surface border border-avorria-line">
              <Image
                src={heroMedia.src}
                alt={heroMedia.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1760px"
                priority={heroMedia.priority}
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-avorria-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-widest text-avorria-white bg-avorria-black/80 px-3 py-1.5 border border-avorria-line flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal animate-pulse" aria-hidden="true" />
                <span>REAL-TIME TELEMETRY // INTERFACE</span>
              </div>
            </div>
          </div>
        )}

        {heroMode === "TRANSFORMATION" && (
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-avorria-surface border border-avorria-line">
            <Image
              src={heroMedia.src}
              alt={heroMedia.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1760px"
              priority={heroMedia.priority}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-avorria-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest text-avorria-white bg-avorria-black/80 px-3 py-1.5 border border-avorria-line">
              ARCHITECTURAL LEASING // TRANSFORMATION
            </div>
          </div>
        )}

        {heroMode === "TYPOGRAPHIC" && (
          <div className="p-12 sm:p-20 bg-avorria-surface border border-avorria-line text-center space-y-6">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
              SYSTEMS ARCHITECTURE &amp; RESEARCH
            </span>
            <p className="display-xl font-display font-black uppercase tracking-tight text-avorria-white max-w-4xl mx-auto">
              {scopeSummary}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

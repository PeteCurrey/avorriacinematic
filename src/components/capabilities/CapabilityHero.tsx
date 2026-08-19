import React from "react";
import Link from "next/link";

interface CapabilityHeroProps {
  code: string;
  title: string;
  tagline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaHref: string;
}

export function CapabilityHero({
  code,
  title,
  tagline,
  description,
  primaryCtaText,
  primaryCtaHref,
}: CapabilityHeroProps) {
  return (
    <section aria-label={`${title} Capability Overview`} className="border-b border-avorria-line pb-16 sm:pb-28">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12 sm:space-y-16">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
          <Link
            href="/capabilities"
            className="text-avorria-muted hover:text-avorria-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
          >
            CAPABILITIES
          </Link>
          <span className="text-avorria-line-strong" aria-hidden="true">/</span>
          <span className="text-avorria-signal font-bold">{code}</span>
          <span className="text-avorria-line-strong" aria-hidden="true">/</span>
          <span className="text-avorria-white font-bold" aria-current="page">{title}</span>
        </div>

        {/* Hero Copy */}
        <div className="max-w-5xl space-y-6">
          <div className="inline-flex items-center gap-3 bg-avorria-surface border border-avorria-signal/30 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-avorria-signal">
            <span className="w-2 h-2 rounded-full bg-avorria-signal animate-pulse" aria-hidden="true" />
            <span>CORE COMMERCIAL CAPABILITY</span>
          </div>

          <h1 className="display-xxl font-display font-black uppercase tracking-tight text-avorria-white leading-none">
            {tagline}
          </h1>

          <p className="font-body text-lg sm:text-2xl text-avorria-white/85 max-w-3xl leading-relaxed">
            {description}
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
            <Link
              href={primaryCtaHref}
              className="inline-flex items-center gap-3 bg-avorria-signal text-avorria-black font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 hover:bg-avorria-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-avorria-signal"
            >
              <span>{primaryCtaText}</span>
              <span>→</span>
            </Link>

            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white border-b border-avorria-line pb-1 transition-colors"
            >
              VIEW PROVEN WORK ({">"}15 SYSTEMS)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

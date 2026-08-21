"use client";

import React from "react";
import Link from "next/link";
import type { ServiceDefinition } from "@/types/content";

interface ServicePageHeroProps {
  service: ServiceDefinition;
}

export function ServicePageHero({ service }: ServicePageHeroProps) {
  return (
    <section className="relative w-full border-b border-avorria-line bg-avorria-black pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Structural technical rules */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/3 w-px h-full bg-avorria-line" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-avorria-line" />
      </div>

      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/60 pb-4 mb-10">
          <Link href="/" className="hover:text-avorria-white transition-colors">
            Avorria
          </Link>
          <span className="text-avorria-line-strong">/</span>
          <Link href="/services" className="text-avorria-muted hover:text-avorria-white transition-colors">
            Services
          </Link>
          <span className="text-avorria-line-strong">/</span>
          <span className="text-avorria-signal font-bold">{service.code}</span>
        </div>

        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-avorria-surface border border-avorria-line font-mono text-xs text-avorria-signal uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal" aria-hidden="true" />
              <span>{service.category}</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-tight text-avorria-white leading-[1.05]">
              {service.title}
            </h1>

            {/* Plain-English Proposition */}
            <div className="p-6 sm:p-8 border border-avorria-signal/40 bg-avorria-surface/60 backdrop-blur-sm">
              <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-widest block mb-2 font-bold">
                COMMERCIAL PROPOSITION
              </span>
              <p className="font-display font-bold text-xl sm:text-2xl text-avorria-white uppercase leading-snug">
                &ldquo;{service.proposition}&rdquo;
              </p>
            </div>

            <p className="font-body text-base sm:text-lg text-avorria-white/80 max-w-3xl leading-relaxed">
              {service.heroSummary}
            </p>
          </div>

          <div className="lg:col-span-4 space-y-6 lg:border-l lg:border-avorria-line/60 lg:pl-10">
            {/* Quick Engagement Action */}
            <div className="p-6 border border-avorria-line bg-avorria-surface/80 space-y-4">
              <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest font-bold">
                COMMISSION THIS DISCIPLINE
              </div>
              <p className="font-body text-xs text-avorria-white/80 leading-relaxed">
                Direct qualification and scoping with our engineering and strategy team.
              </p>
              <Link
                href={`/start-project?service=${service.finalCta.projectServiceParam}`}
                className="w-full inline-flex items-center justify-between px-4 py-3 bg-avorria-signal text-avorria-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-avorria-white transition-colors"
              >
                <span>{service.finalCta.buttonText}</span>
                <span>→</span>
              </Link>
            </div>

            {/* Core Capability Checklist */}
            <div className="space-y-3 font-mono text-xs">
              <span className="text-avorria-muted uppercase tracking-wider block">
                DELIVERABLES AT A GLANCE
              </span>
              <ul className="space-y-2 text-avorria-white/90">
                {service.deliverablesSummary.slice(0, 5).map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-avorria-signal" aria-hidden="true">✓</span>
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";

export function ServicesHubHero() {
  return (
    <section className="relative w-full border-b border-avorria-line bg-avorria-black pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Background Subtle Spatial Rules */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-avorria-line" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-avorria-line" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-avorria-line" />
      </div>

      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Eyebrow & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-avorria-line/60 pb-6 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-avorria-signal font-bold">02</span>
            <span className="text-avorria-line-strong font-mono text-xs">/</span>
            <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted">
              Commercial Architecture &amp; Services
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-avorria-quiet">
            <span className="w-2 h-2 rounded-full bg-avorria-signal animate-pulse" aria-hidden="true" />
            <span>5 Core Disciplines // One Studio</span>
          </div>
        </div>

        {/* Hero Title & Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8 space-y-6">
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-avorria-white leading-[1.02]">
              WHAT WE BUILD. <br />
              <span className="text-avorria-signal">WHAT WE GROW.</span> <br />
              WHAT WE AUTOMATE.
            </h1>
            <p className="font-body text-lg sm:text-xl text-avorria-white/80 max-w-3xl leading-relaxed">
              Websites. Software. Search. Performance marketing. AI systems. One studio connecting the entire digital operation.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-end space-y-6 lg:border-l lg:border-avorria-line/60 lg:pl-10">
            <div className="space-y-3 font-mono text-xs text-avorria-muted">
              <span className="text-avorria-signal uppercase tracking-widest block font-bold">
                COMMERCIAL PROPOSITION
              </span>
              <p className="text-avorria-white/70 leading-relaxed">
                Avorria designs websites, builds software, grows demand, and automates businesses with AI. Clear deliverables without agency jargon.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 pt-4 border-t border-avorria-line/40">
              <Link
                href="/start-project"
                className="inline-flex items-center justify-between px-5 py-3.5 bg-avorria-signal text-avorria-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-avorria-white transition-colors"
              >
                <span>Start a Project</span>
                <span>→</span>
              </Link>
              <a
                href="#service-index"
                className="inline-flex items-center justify-between px-5 py-3.5 border border-avorria-line bg-avorria-surface/40 text-avorria-white font-mono text-xs uppercase tracking-widest hover:border-avorria-white transition-colors"
              >
                <span>Explore 5 Services</span>
                <span className="text-avorria-signal">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

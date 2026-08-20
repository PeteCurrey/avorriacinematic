"use client";

import React from "react";
import Link from "next/link";
import { PrecisionField } from "@/components/cinematic/PrecisionField";

/**
 * SERVICES HUB HERO
 *
 * The right column previously held only a proposition paragraph and two
 * buttons against a four-line headline, so the top-right quadrant sat empty
 * and the composition read as unfinished. It now carries the discipline index:
 * the five services are legible in the first viewport and each one is a link,
 * which is both the answer to "what do you do" and the page's primary
 * navigation.
 */

const DISCIPLINES = [
  { n: "01", label: "Websites", note: "Design & build", href: "/services/websites" },
  { n: "02", label: "Digital Products", note: "Software & platforms", href: "/services/digital-products" },
  { n: "03", label: "SEO & Search", note: "Technical visibility", href: "/services/seo" },
  { n: "04", label: "Performance Marketing", note: "Demand & acquisition", href: "/services/performance-marketing" },
  { n: "05", label: "AI & Automation", note: "Systems & internal tools", href: "/services/ai-automation" },
] as const;

export function ServicesHubHero() {
  return (
    <section className="relative w-full border-b border-avorria-line bg-avorria-black pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Ambient depth, matching the homepage hero. */}
      <PrecisionField intensity={0.7} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 66% 70% at 28% 48%, rgba(8,8,8,0.93) 0%, rgba(8,8,8,0.62) 50%, rgba(8,8,8,0) 100%)",
        }}
      />

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

        {/* Headline aligned to the top of the discipline index, so neither
            column leaves a hole at the top of the composition. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-avorria-white leading-[1.02]">
              WHAT WE BUILD. <br />
              <span className="text-avorria-signal">WHAT WE GROW.</span> <br />
              WHAT WE AUTOMATE.
            </h1>
            <p className="font-body text-lg sm:text-xl text-avorria-white/80 max-w-2xl leading-relaxed">
              Websites. Software. Search. Performance marketing. AI systems. One studio
              connecting the entire digital operation.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/start-project"
                className="inline-flex items-center justify-between gap-6 px-5 py-3.5 bg-avorria-signal text-avorria-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-avorria-white transition-colors"
              >
                <span>Start a Project</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href="#service-index"
                className="inline-flex items-center justify-between gap-6 px-5 py-3.5 border border-avorria-line bg-avorria-surface/40 text-avorria-white font-mono text-xs uppercase tracking-widest hover:border-avorria-white transition-colors"
              >
                <span>Explore all five</span>
                <span className="text-avorria-signal" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          {/* Discipline index — fills what was an empty quadrant with the
              page's actual navigation. */}
          <div className="lg:col-span-5 lg:border-l lg:border-avorria-line/60 lg:pl-10">
            <div className="flex items-baseline justify-between border-b border-avorria-line/60 pb-3 mb-1">
              <span className="font-mono text-[11px] uppercase tracking-widest text-avorria-signal font-bold">
                The Disciplines
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-avorria-quiet">
                05 / 05
              </span>
            </div>

            <ul className="divide-y divide-avorria-line/40">
              {DISCIPLINES.map((d) => (
                <li key={d.n}>
                  <Link
                    href={d.href}
                    className="group flex items-center gap-4 py-3.5 outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
                  >
                    <span className="font-mono text-[11px] text-avorria-quiet w-6 shrink-0 transition-colors group-hover:text-avorria-signal">
                      {d.n}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-display font-bold uppercase tracking-tight text-base sm:text-lg text-avorria-white transition-colors group-hover:text-avorria-signal">
                        {d.label}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-widest text-avorria-quiet">
                        {d.note}
                      </span>
                    </span>
                    <span
                      className="text-avorria-quiet shrink-0 transition-all duration-200 group-hover:translate-x-1 group-hover:text-avorria-signal"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

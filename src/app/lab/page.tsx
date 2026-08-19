import React from "react";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { LAB_EXPERIMENTS } from "@/lib/scenes/lab-config";
import { LabExperiment } from "@/types/lab";

export const metadata = generatePageMetadata({
  title: "Avorria Lab — Interactive R&D & Emerging Interface Experiments",
  description: "Avorria Lab explores adaptive interfaces, voice navigation, vision annotation, 3D product rendering, bounded AI agent systems, and data reasoning — built before anyone asks for them.",
  path: "/lab"
});

const IMPL_LABELS: Record<LabExperiment["implementationNote"], { label: string; description: string }> = {
  DETERMINISTIC: {
    label: "DETERMINISTIC",
    description: "Rule-based logic. No AI."
  },
  AI_ASSISTED: {
    label: "AI-ASSISTED",
    description: "Scoped AI request. Bounded output."
  },
  BROWSER_API: {
    label: "BROWSER API",
    description: "Native browser capability."
  },
  ILLUSTRATIVE_DATA: {
    label: "ILLUSTRATIVE DATA",
    description: "Dataset for demonstration only."
  }
};

const STATUS_STYLES: Record<LabExperiment["status"], string> = {
  LIVE: "text-avorria-signal",
  PROTOTYPE: "text-sky-400",
  EXPERIMENT: "text-amber-400",
  STUDY: "text-avorria-muted"
};

export default function LabPage() {
  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white pt-24 sm:pt-32">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section aria-label="Avorria Lab Introduction" className="border-b border-avorria-line pb-20 sm:pb-28">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <span className="text-avorria-signal font-bold">03</span>
            <span className="text-avorria-line-strong" aria-hidden="true">/</span>
            <span className="text-avorria-white font-bold" aria-current="page">LAB</span>
            <span className="text-avorria-line-strong" aria-hidden="true">/</span>
            <span className="text-avorria-muted">INTERACTIVE R&D</span>
          </div>

          <div className="max-w-5xl space-y-6">
            <div className="inline-flex items-center gap-3 bg-avorria-surface border border-avorria-signal/30 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-avorria-signal">
              <span className="w-2 h-2 rounded-full bg-avorria-signal" aria-hidden="true" />
              <span>EXPERIMENTS IN ACTIVE DEVELOPMENT</span>
            </div>

            <h1 className="display-xxl font-display font-black uppercase tracking-tight text-avorria-white leading-none">
              AVORRIA LAB
            </h1>

            <p className="display-sm font-display font-black uppercase tracking-tight text-avorria-signal leading-tight">
              WE BUILD THINGS BEFORE PEOPLE ASK FOR THEM.
            </p>

            <p className="font-body text-lg sm:text-xl text-avorria-white/80 max-w-3xl leading-relaxed">
              Lab is not a gallery of future intentions. Each experiment below is interactive, functional, and reflects a genuine technical or interaction design question we are actively investigating.
            </p>
          </div>

          {/* Lab Governance Callout */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px border border-avorria-line bg-avorria-line">
            {[
              { label: "AI TRUTH", note: "Every experiment labels AI, deterministic rules, and browser APIs separately. We do not falsely attribute automation to intelligence." },
              { label: "PRIVACY FIRST", note: "No camera access. No user file uploads. No transcript or prompt analytics. Microphone requires explicit per-session consent." },
              { label: "RESOURCE DISCIPLINE", note: "One heavy experiment active at a time. Lazy mounting, aggressive cleanup. No AI requests until user initiates action." }
            ].map((g) => (
              <div key={g.label} className="bg-avorria-surface p-6 space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-avorria-signal block">{g.label}</span>
                <p className="font-body text-xs text-avorria-white/75 leading-relaxed">{g.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experiment Index ──────────────────────────────── */}
      <section aria-label="Lab Experiment Registry" className="py-20 sm:py-28">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
              01 // EXPERIMENT REGISTRY
            </span>
            <span className="font-mono text-xs text-avorria-quiet">
              {LAB_EXPERIMENTS.length} EXPERIMENTS / {LAB_EXPERIMENTS.filter(e => e.mobileSupport).length} MOBILE-READY
            </span>
          </div>

          {/* Editorial list — not a card grid */}
          <ol className="space-y-0 divide-y divide-avorria-line" aria-label="Laboratory Experiments">
            {LAB_EXPERIMENTS.map((experiment) => {
              const impl = IMPL_LABELS[experiment.implementationNote];
              const statusStyle = STATUS_STYLES[experiment.status];

              return (
                <li key={experiment.id}>
                  <Link
                    href={`/lab/${experiment.slug}`}
                    className="group flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-0 py-8 sm:py-10 hover:bg-avorria-surface/30 transition-colors px-0 lg:px-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
                    aria-label={`${experiment.title}: ${experiment.hypothesis}`}
                  >
                    {/* Number */}
                    <span className="font-mono text-xs font-bold text-avorria-signal w-full lg:w-16 shrink-0">
                      {experiment.number}
                    </span>

                    {/* Title + Hypothesis */}
                    <div className="flex-1 space-y-2 lg:pr-12">
                      <h2 className="display-sm font-display font-black uppercase tracking-tight text-avorria-white group-hover:text-avorria-signal transition-colors">
                        {experiment.title}
                      </h2>
                      <p className="font-body text-sm text-avorria-white/70 leading-relaxed max-w-2xl">
                        {experiment.hypothesis}
                      </p>
                    </div>

                    {/* Meta columns */}
                    <div className="flex flex-wrap lg:flex-nowrap items-start lg:items-center gap-6 lg:gap-0 shrink-0">
                      {/* Interaction type */}
                      <div className="lg:w-52 space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-avorria-quiet block">INTERACTION</span>
                        <span className="font-mono text-xs text-avorria-muted uppercase">{experiment.interactionType}</span>
                      </div>

                      {/* Implementation note */}
                      <div className="lg:w-48 space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-avorria-quiet block">IMPLEMENTATION</span>
                        <div>
                          <span className="font-mono text-xs text-avorria-signal uppercase block">{impl.label}</span>
                          <span className="font-mono text-[9px] text-avorria-muted">{impl.description}</span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="lg:w-32 space-y-1">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-avorria-quiet block">STATUS</span>
                        <span className={`font-mono text-xs uppercase font-bold ${statusStyle}`}>
                          {experiment.status}
                        </span>
                      </div>

                      {/* Mobile badge */}
                      <div className="lg:w-20 text-right">
                        {experiment.mobileSupport && (
                          <span className="font-mono text-[9px] uppercase tracking-wider bg-avorria-surface border border-avorria-line px-2 py-1 text-avorria-muted">
                            MOBILE
                          </span>
                        )}
                      </div>

                      {/* Arrow */}
                      <span
                        className="font-mono text-sm text-avorria-muted group-hover:text-avorria-signal transition-colors lg:ml-6"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Philosophy Note ───────────────────────────────── */}
      <section aria-label="Lab Philosophy" className="border-t border-avorria-line py-16 sm:py-20 bg-avorria-surface/10">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4 space-y-3">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                02 // WHY LAB EXISTS
              </span>
              <h2 className="display-md font-display font-black uppercase tracking-tight text-avorria-white">
                CURIOSITY AS COMMERCIAL ADVANTAGE
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <p className="font-body text-base sm:text-lg text-avorria-white/80 leading-relaxed">
                Every experiment in this Lab started with a question we could not answer from documentation alone. Adaptive interfaces, voice navigation, spatial annotation, and bounded AI agent flows are not concepts we theorize about — they are systems we prototype, break, and rebuild until we understand them precisely.
              </p>
              <p className="font-body text-base text-avorria-white/70 leading-relaxed">
                Lab experiments often become production capability. The interaction patterns and implementation decisions made here feed directly into client work. This is not R&D theater.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6">
                <Link
                  href="/services/ai-automation"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white transition-colors"
                >
                  <span>AI &amp; AUTOMATION</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/services/websites"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white transition-colors"
                >
                  <span>WEB ENGINEERING</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/start-project"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white transition-colors"
                >
                  <span>START A PROJECT</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

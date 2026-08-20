import React from "react";
import { PrecisionField } from "@/components/cinematic/PrecisionField";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Studio — Digital Engineering, Ventures & Practice | Avorria",
  description: "Avorria is an independent digital engineering and product studio founded by Pete Currey. We design, build, and operate commercial software platforms and digital flagships.",
  path: "/studio"
});

const STUDIO_PRINCIPLES = [
  {
    code: "01",
    title: "DESIGN SHOULD HAVE A JOB",
    description: "Aesthetics divorced from commercial function are merely decoration. Every typographic scale, spatial layout, and interaction state must reduce cognitive friction, communicate authority, and drive qualified action."
  },
  {
    code: "02",
    title: "TECHNOLOGY SHOULD CREATE LEVERAGE",
    description: "We do not write code for novelty. Modern software infrastructure should eliminate repetitive operational overhead, accelerate customer acquisition, and compound in value over multi-year lifecycles."
  },
  {
    code: "03",
    title: "AI SHOULD DO MORE THAN WRITE COPY",
    description: "Superficial chatbots and marketing prompt wrappers create noise and liability. We engineer bounded AI systems with deterministic rules, transparent data models, and strict human oversight."
  }
];

const PRACTICE_STAGES = [
  {
    number: "01",
    name: "Commercial Diagnosis",
    description: "We identify the exact economic bottleneck: broken customer onboarding, lost search equity, sluggish rendering, or manual operational drag."
  },
  {
    number: "02",
    name: "System Architecture",
    description: "We map data schemas, URL taxonomies, state machines, and component primitives before visual styling begins."
  },
  {
    number: "03",
    name: "Rapid Prototyping",
    description: "We build interactive, high-fidelity proofs in code to test user journeys and physical-to-digital workflows directly."
  },
  {
    number: "04",
    name: "Full-Stack Build",
    description: "We engineer production Next.js App Router applications with strict TypeScript contracts and sub-second asset delivery."
  },
  {
    number: "05",
    name: "Telemetry & Iteration",
    description: "We measure Core Web Vitals, crawl indexation, and real customer conversion flows to harden the platform continuously."
  }
];

const VENTURE_PORTFOLIO = [
  {
    name: "CareerOS",
    role: "VENTURE // TALENT INTELLIGENCE",
    description: "Autonomous career orchestration platform integrating dynamic Career Twin graph models and human-centred AI mentor workflows.",
    slug: "careeros"
  },
  {
    name: "NestIQ",
    role: "VENTURE // SPATIAL PROPERTY DATA",
    description: "Institutional real estate search intelligence synthesizing cadastral boundaries, planning data, and travel-time isochrones.",
    slug: "nestiq"
  },
  {
    name: "Drawdown.Trading",
    role: "VENTURE // QUANTITATIVE RISK SOFTWARE",
    description: "High-density trading discipline interface and risk mitigation architecture for professional market participants.",
    slug: "drawdown-trading"
  }
];

export default function StudioPage() {
  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white pt-24 sm:pt-32 pb-24">
      {/* ── 01 // Hero Header ────────────────────────────── */}
      <section aria-label="Studio Overview" className="relative overflow-hidden border-b border-avorria-line pb-16 sm:pb-24">
        {/* Ambient depth, matching the homepage hero. Pointer-transparent and
            self-pausing when off-screen. */}
        <PrecisionField intensity={0.75} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 70% at 30% 45%, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0) 100%)",
          }}
        />
        <div className="relative z-10 max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <span className="text-avorria-signal font-bold">05</span>
            <span className="text-avorria-line-strong" aria-hidden="true">/</span>
            <span className="text-avorria-white font-bold" aria-current="page">STUDIO</span>
            <span className="text-avorria-line-strong" aria-hidden="true">/</span>
            <span className="text-avorria-muted">ABOUT & PRACTICE</span>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-avorria-surface border border-avorria-signal/30 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-avorria-signal">
              <span className="w-2 h-2 rounded-full bg-avorria-signal" aria-hidden="true" />
              <span>INDEPENDENT DIGITAL ENGINEERING STUDIO</span>
            </div>

            <h1 className="display-xxl font-display font-black uppercase tracking-tight text-avorria-white leading-none">
              AVORRIA STUDIO
            </h1>

            <p className="display-sm font-display font-black uppercase tracking-tight text-avorria-signal leading-tight">
              WE DESIGN. WE BUILD. WE OPERATE.
            </p>

            <p className="font-body text-lg sm:text-2xl text-avorria-white/85 max-w-3xl leading-relaxed">
              Avorria is an independent digital engineering and product studio. We partner with founders, executive teams, and landmark organizations to build software platforms, digital flagships, and operational systems that command market authority.
            </p>
          </div>
        </div>
      </section>

      {/* ── 02 // The Operator Differentiator ─────────────── */}
      <section aria-label="Why We Build: The Operator Advantage" className="border-b border-avorria-line py-20 sm:py-28 bg-avorria-surface/20">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 space-y-4">
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                01 // THE OPERATOR ADVANTAGE
              </span>
              <h2 className="display-lg font-display font-black uppercase tracking-tight text-avorria-white">
                WE DO NOT ONLY BUILD FOR CLIENTS. WE OPERATE OUR OWN VENTURES.
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 font-body text-base sm:text-lg text-avorria-white/80 leading-relaxed">
              <p>
                Most digital agencies exist in a vacuum of client briefs, slide decks, and billable hours. They deliver code, hand over an invoice, and walk away before the server experiences its first real traffic surge or user drop-off crisis.
              </p>
              <p>
                At Avorria, we build and operate our own proprietary technology products alongside our studio commissions. We fund them, architect them, deploy them, and manage their daily operational economics.
              </p>
              <p className="text-avorria-white font-medium">
                This means when we advise a client on database schemas, search migration risks, or user journey friction, we speak with the hard-won discipline of an operator who has capital on the line — not the theoretical platitudes of a design consultant.
              </p>
            </div>
          </div>

          {/* Venture Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-avorria-line/40">
            {VENTURE_PORTFOLIO.map((v) => (
              <div key={v.name} className="p-6 sm:p-8 bg-avorria-surface border border-avorria-line flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-widest block">
                    {v.role}
                  </span>
                  <h3 className="font-display font-black text-xl uppercase text-avorria-white">
                    {v.name}
                  </h3>
                  <p className="font-body text-xs text-avorria-white/75 leading-relaxed">
                    {v.description}
                  </p>
                </div>
                <Link
                  href={`/work/${v.slug}`}
                  className="font-mono text-xs text-avorria-muted hover:text-avorria-white uppercase tracking-wider flex items-center gap-2"
                >
                  <span>VIEW CASE STUDY</span>
                  <span className="text-avorria-signal">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 // What We Believe: Core Principles ─────────── */}
      <section aria-label="Core Philosophy & Principles" className="border-b border-avorria-line py-20 sm:py-28 bg-avorria-black">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
          <div className="max-w-4xl space-y-4">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              02 // PRACTICE PHILOSOPHY
            </span>
            <h2 className="display-xl font-display font-black uppercase tracking-tight text-avorria-white">
              WHAT WE BELIEVE
            </h2>
            <p className="font-body text-lg text-avorria-white/80 leading-relaxed max-w-3xl">
              Our engineering and design standard is defined by three fundamental convictions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STUDIO_PRINCIPLES.map((principle) => (
              <div
                key={principle.code}
                className="p-8 sm:p-10 bg-avorria-surface border border-avorria-line flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs border-b border-avorria-line/40 pb-3">
                    <span className="text-avorria-signal font-bold">{principle.code}</span>
                    <span className="text-[10px] text-avorria-quiet uppercase">PRINCIPLE</span>
                  </div>
                  <h3 className="font-display font-black text-xl uppercase tracking-tight text-avorria-white">
                    {principle.title}
                  </h3>
                  <p className="font-body text-sm text-avorria-white/80 leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 // How We Work: Real Process ───────────────── */}
      <section aria-label="Real Working Methodology" className="border-b border-avorria-line py-20 sm:py-28 bg-avorria-surface/20">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-16">
          <div className="max-w-4xl space-y-4">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              03 // WORKING METHODOLOGY
            </span>
            <h2 className="display-xl font-display font-black uppercase tracking-tight text-avorria-white">
              HOW WE WORK
            </h2>
            <p className="font-body text-lg text-avorria-white/80 leading-relaxed max-w-3xl">
              No fictional design-sprint theatre or bureaucratic handovers. We work directly with decision-makers in rapid, transparent engineering cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PRACTICE_STAGES.map((stage) => (
              <div
                key={stage.number}
                className="p-6 bg-avorria-surface border border-avorria-line space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-mono text-xs text-avorria-signal font-bold block border-b border-avorria-line/40 pb-2">
                    {stage.number} {"//"} STAGE
                  </span>
                  <h3 className="font-display font-black text-lg uppercase text-avorria-white">
                    {stage.name}
                  </h3>
                  <p className="font-body text-xs text-avorria-white/75 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 // Founder: Pete Currey ─────────────────────── */}
      <section aria-label="Founder & Leadership" className="border-b border-avorria-line py-20 sm:py-28 bg-avorria-black">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16">
          <div className="p-8 sm:p-12 lg:p-16 bg-avorria-surface border border-avorria-line space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
              <div className="max-w-2xl space-y-6">
                <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                  04 // FOUNDER & PRACTICE LEAD
                </span>

                <h2 className="display-lg font-display font-black uppercase tracking-tight text-avorria-white">
                  PETE CURREY
                </h2>

                <div className="space-y-4 font-body text-base sm:text-lg text-avorria-white/80 leading-relaxed">
                  <p>
                    Pete Currey is an entrepreneur, technology product builder, and market trader based in the United Kingdom. With a multidisciplinary background spanning precision physical engineering, quantitative trading interfaces, and digital venture creation, Pete founded Avorria to unite surgical design with application-grade engineering rigor.
                  </p>
                  <p>
                    Rather than operating as a conventional agency executive, Pete actively designs and codes platform architectures, directs product strategy, and oversees all client and venture systems across the studio.
                  </p>
                </div>
              </div>

              <div className="lg:w-80 p-6 bg-avorria-black/60 border border-avorria-line space-y-4 font-mono text-xs shrink-0">
                <span className="text-[10px] text-avorria-signal uppercase tracking-widest block border-b border-avorria-line/40 pb-2">
                  PRACTICE DETAILS
                </span>
                <div className="space-y-2 text-avorria-muted">
                  <div className="flex justify-between">
                    <span>LOCATION:</span>
                    <strong className="text-avorria-white">UNITED KINGDOM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>SCOPE:</span>
                    <strong className="text-avorria-white">GLOBAL CLIENTS</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>STRUCTURE:</span>
                    <strong className="text-avorria-signal">LEAN STUDIO</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>AVAILABILITY:</span>
                    <strong className="text-avorria-white">SELECT COMMISSIONS</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 // Commercial Commission CTA ────────────────── */}
      <section aria-label="Commercial Project Action" className="py-20 sm:py-28 bg-avorria-surface/10">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              WORK WITH AVORRIA
            </span>
            <h2 className="display-md font-display font-black uppercase tracking-tight text-avorria-white">
              HAVE A FLAGSHIP OR PLATFORM TO BUILD?
            </h2>
            <p className="font-body text-base text-avorria-white/80 leading-relaxed">
              We accept a limited number of high-impact commercial commissions each year. Let&apos;s evaluate your project scope, timeline, and technical objectives.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-3 bg-avorria-signal text-avorria-black font-display font-extrabold text-xs uppercase tracking-wider px-8 py-4 hover:bg-avorria-white transition-colors"
            >
              <span>START A PROJECT</span>
              <span>→</span>
            </Link>
            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white border-b border-avorria-line pb-1 transition-colors"
            >
              EXPLORE WORK
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

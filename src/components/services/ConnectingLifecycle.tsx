"use client";

import React, { useState } from "react";
import Link from "next/link";

const LIFECYCLE_STAGES = [
  {
    step: "01",
    phase: "DISCOVER",
    serviceCode: "03 / SEARCH",
    serviceTitle: "SEO & Organic Growth",
    serviceHref: "/services/seo",
    premise: "People need to find you first.",
    detail: "Before someone buys or commissions your business, they have to discover you. We engineer search architecture, entity graphs, and commercial taxonomies so high-intent buyers find your business ahead of competitors.",
    deliverablePills: ["Technical Crawl Tree", "Schema.org Entities", "AI Search (GEO)"]
  },
  {
    step: "02",
    phase: "EXPERIENCE",
    serviceCode: "01 / WEB",
    serviceTitle: "Websites & Digital Experiences",
    serviceHref: "/services/websites",
    premise: "It has to look right and work flawlessly.",
    detail: "When visitors arrive, they assess your credibility within three seconds. We design and engineer bespoke digital flagships with surgical typography, sub-second speed, and clear messaging that elevates your perceived commercial value.",
    deliverablePills: ["Next.js SSR", "Custom Brand UI", "Sub-Second LCP"]
  },
  {
    step: "03",
    phase: "CONVERT",
    serviceCode: "04 / GROWTH",
    serviceTitle: "Performance Marketing",
    serviceHref: "/services/performance-marketing",
    premise: "Traffic must turn into measurable revenue.",
    detail: "Great design without demand generation is vanity. We run disciplined paid acquisition across Google and social channels, building dedicated conversion landing pages, multi-step qualifiers, and closed-loop attribution.",
    deliverablePills: ["Google Ads", "Conversion Design", "Server-Side CAPI"]
  },
  {
    step: "04",
    phase: "OPERATE",
    serviceCode: "02 / PRODUCT",
    serviceTitle: "Digital Products & Software",
    serviceHref: "/services/digital-products",
    premise: "The software behind it must perform daily.",
    detail: "Delivering client value requires robust software. We engineer custom client portals, SaaS applications, and operational data platforms that eliminate clunky legacy tools and give users effortless control.",
    deliverablePills: ["Custom SaaS", "Client Portals", "Data Pipelines"]
  },
  {
    step: "05",
    phase: "IMPROVE",
    serviceCode: "05 / SYSTEMS",
    serviceTitle: "AI, Automation & Business Systems",
    serviceHref: "/services/ai-automation",
    premise: "Systems must operate faster and continuously improve.",
    detail: "Scaling a business requires removing repetitive manual tasks. We deploy custom AI agents, automated workflow orchestration, and strict human review gates that streamline operations and save hundreds of team hours.",
    deliverablePills: ["AI Agents", "Human Review Gates", "Immutable Audit Logs"]
  }
];

export function ConnectingLifecycle() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStage = LIFECYCLE_STAGES[activeStep];

  return (
    <section className="w-full border-b border-avorria-line bg-avorria-black py-20 sm:py-32">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-4xl space-y-6 mb-16">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal">
            <span>02</span>
            <span className="text-avorria-line-strong">/</span>
            <span className="text-avorria-muted">THE AVORRIA PHILOSOPHY</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-avorria-white leading-tight">
            THE WEBSITE ISN&apos;T <br />
            <span className="text-avorria-signal">THE END PRODUCT.</span>
          </h2>

          <div className="font-body text-base sm:text-lg text-avorria-white/85 space-y-4 max-w-3xl leading-relaxed">
            <p>
              A website has to look right. It has to work properly. People need to find it. Traffic needs to convert. And the systems behind it need to operate efficiently.
            </p>
            <p className="text-avorria-muted">
              That is why Avorria connects design, engineering, growth, and automation into a single cohesive studio — rather than forcing you to coordinate five disconnected agencies.
            </p>
          </div>
        </div>

        {/* Interactive 5-Stage Lifecycle Diagram */}
        <div className="border border-avorria-line bg-avorria-surface/40 p-6 sm:p-10 lg:p-12 space-y-10">
          {/* Stage Progression Navigation Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 border-b border-avorria-line pb-6">
            {LIFECYCLE_STAGES.map((stage, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 text-left border transition-all duration-200 flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? "bg-avorria-signal text-avorria-black font-bold border-avorria-signal shadow-lg"
                      : "bg-avorria-black/60 text-avorria-white border-avorria-line/60 hover:border-avorria-white"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className={isSelected ? "text-avorria-black" : "text-avorria-signal"}>
                      {stage.step}
                    </span>
                    <span className={`text-[10px] uppercase ${isSelected ? "text-avorria-black/80" : "text-avorria-quiet"}`}>
                      {stage.phase}
                    </span>
                  </div>
                  <div className="font-display font-black text-sm uppercase tracking-tight">
                    {stage.phase}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet">
                <span className="text-avorria-signal font-bold">LIFECYCLE STAGE 0{activeStep + 1}</span>
                <span className="text-avorria-line-strong">→</span>
                <span className="text-avorria-white">{currentStage.phase}</span>
              </div>

              <div className="space-y-3">
                <div className="font-mono text-sm text-avorria-signal font-bold uppercase">
                  &ldquo;{currentStage.premise}&rdquo;
                </div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase text-avorria-white">
                  {currentStage.serviceTitle}
                </h3>
                <p className="font-body text-base text-avorria-white/80 leading-relaxed max-w-2xl">
                  {currentStage.detail}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {currentStage.deliverablePills.map((pill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-avorria-black border border-avorria-line font-mono text-xs uppercase text-avorria-signal"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href={currentStage.serviceHref}
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white font-bold hover:underline"
                >
                  <span>Explore {currentStage.serviceTitle} Discipline</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Architecture Lifecycle Visual Connector */}
            <div className="lg:col-span-5 border border-avorria-line bg-avorria-black p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-avorria-line/60 pb-3 text-avorria-quiet uppercase text-[11px]">
                <span>INTEGRATED STUDIO ADVANTAGE</span>
                <span className="text-avorria-signal">CLOSED-LOOP</span>
              </div>

              <div className="space-y-2 text-avorria-muted">
                <div className={`p-2.5 border transition-all ${activeStep === 0 ? "border-avorria-signal bg-avorria-surface text-avorria-white font-bold" : "border-avorria-line/40"}`}>
                  01. DISCOVER // Technical SEO feeds commercial traffic
                </div>
                <div className={`p-2.5 border transition-all ${activeStep === 1 ? "border-avorria-signal bg-avorria-surface text-avorria-white font-bold" : "border-avorria-line/40"}`}>
                  02. EXPERIENCE // Flagship website builds authority &amp; trust
                </div>
                <div className={`p-2.5 border transition-all ${activeStep === 2 ? "border-avorria-signal bg-avorria-surface text-avorria-white font-bold" : "border-avorria-line/40"}`}>
                  03. CONVERT // Paid funnels capture and qualify demand
                </div>
                <div className={`p-2.5 border transition-all ${activeStep === 3 ? "border-avorria-signal bg-avorria-surface text-avorria-white font-bold" : "border-avorria-line/40"}`}>
                  04. OPERATE // Software &amp; portals deliver client value
                </div>
                <div className={`p-2.5 border transition-all ${activeStep === 4 ? "border-avorria-signal bg-avorria-surface text-avorria-white font-bold" : "border-avorria-line/40"}`}>
                  05. IMPROVE // AI &amp; automations optimize business speed
                </div>
              </div>

              <div className="p-3 bg-avorria-surface border border-avorria-line/80 text-[11px] text-avorria-white/80 leading-relaxed">
                <span className="text-avorria-signal font-bold">THE RESULT:</span> No agency finger-pointing, no data leaks between silos, and a continuous feedback loop from first search click to operational scale.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { Suspense } from "react";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { StartProjectJourney } from "@/components/project/StartProjectJourney";

export const metadata = generatePageMetadata({
  title: "Start a Project — Commercial Engagement & Intake | Avorria",
  description: "Direct project qualification and intake. Connect with Avorria to commission digital platforms, technical search architectures, and AI systems.",
  path: "/start-project"
});

export default function StartProjectPage() {
  return (
    <main className="w-full min-h-screen bg-avorria-black text-avorria-white pt-24 sm:pt-32 pb-24">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
          <span className="text-avorria-signal font-bold">06</span>
          <span className="text-avorria-line-strong" aria-hidden="true">/</span>
          <span className="text-avorria-white font-bold" aria-current="page">START A PROJECT</span>
          <span className="text-avorria-line-strong" aria-hidden="true">/</span>
          <span className="text-avorria-muted">COMMERCIAL INTAKE</span>
        </div>

        {/* Header */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-3 bg-avorria-surface border border-avorria-signal/30 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-avorria-signal">
            <span className="w-2 h-2 rounded-full bg-avorria-signal" aria-hidden="true" />
            <span>COMMISSION INTAKE & QUALIFICATION</span>
          </div>

          <h1 className="display-xl sm:display-xxl font-display font-black uppercase tracking-tight text-avorria-white leading-none">
            START A PROJECT
          </h1>

          <p className="font-body text-lg sm:text-xl text-avorria-white/80 max-w-2xl leading-relaxed">
            We evaluate every project with technical and strategic rigor. Complete this brief to establish scope, timelines, and architectural requirements.
          </p>
        </div>

        {/* Multi-Step Journey wrapped in Suspense for useSearchParams */}
        <div className="pt-6 border-t border-avorria-line">
          <Suspense fallback={<div className="font-mono text-xs text-avorria-muted p-12">INITIALIZING INTAKE SYSTEM...</div>}>
            <StartProjectJourney />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

import React from "react";
import Link from "next/link";
import { FINALE_CONFIG } from "@/lib/scenes/finale-config";

export function FinaleFallback() {
  return (
    <div className="w-full bg-avorria-black px-6 sm:px-12 py-32 max-w-[1760px] mx-auto select-none space-y-16">
      <div className="space-y-4 border-b border-avorria-line pb-8">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          18 / FINALE <span>{"//"}</span> ACTION
        </span>
        <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-avorria-white leading-tight whitespace-pre-line">
          {FINALE_CONFIG.questionText}
        </h3>
      </div>

      <div>
        <h2 className="font-display font-black text-5xl sm:text-8xl lg:text-[10vw] uppercase tracking-tight leading-[0.9] text-avorria-white whitespace-pre-line">
          BUILD<br />
          SOMETHING<br />
          <span className="text-avorria-signal">{FINALE_CONFIG.emphasisText}</span>
        </h2>
      </div>

      <div className="pt-12 border-t border-avorria-line flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link
          href={FINALE_CONFIG.primaryCtaHref}
          className="text-2xl sm:text-4xl font-display font-black uppercase text-avorria-signal hover:text-avorria-white transition-colors inline-flex items-center gap-3"
        >
          <span>{FINALE_CONFIG.primaryCtaText}</span>
          <span>→</span>
        </Link>
        <div className="font-mono text-xs uppercase text-avorria-muted">
          DIRECT: <a href={`mailto:${FINALE_CONFIG.contactEmail}`} className="text-avorria-white hover:text-avorria-signal">{FINALE_CONFIG.contactEmail}</a>
        </div>
      </div>
    </div>
  );
}

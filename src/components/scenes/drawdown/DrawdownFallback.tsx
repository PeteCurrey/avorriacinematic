import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DRAWDOWN_PRINCIPLE, DRAWDOWN_DELIVERABLES } from "@/lib/scenes/drawdown-scene-config";

export function DrawdownFallback() {
  return (
    <div className="w-full min-h-screen bg-avorria-black px-6 sm:px-12 py-24 flex flex-col gap-20 max-w-[1760px] mx-auto select-none">
      <div className="border-b border-avorria-line pb-8 flex flex-col gap-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          09 / 18 // FINANCIAL INTELLIGENCE PLATFORM
        </span>
        <h2 className="display-lg uppercase text-avorria-white">
          Drawdown.Trading
        </h2>
      </div>

      <div className="aspect-video w-full relative overflow-hidden bg-avorria-surface border border-avorria-line">
        <Image
          src="/media/projects/drawdown/drawdown-full-ui.svg"
          alt="Drawdown.Trading Interface"
          fill
          className="object-contain"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-avorria-line">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="font-display font-bold text-3xl uppercase text-avorria-white leading-tight whitespace-pre-line">
            {DRAWDOWN_PRINCIPLE.title}
          </h3>
          <p className="font-body text-base text-avorria-muted leading-relaxed">
            {DRAWDOWN_PRINCIPLE.description}
          </p>
          <Link
            href={DRAWDOWN_PRINCIPLE.ctaHref}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 w-fit"
          >
            <span>{DRAWDOWN_PRINCIPLE.ctaText}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
          <span className="text-avorria-quiet mb-2">DELIVERED SCOPE</span>
          {DRAWDOWN_DELIVERABLES.map((item) => (
            <div key={item.code} className="flex items-center justify-between py-2.5 border-b border-avorria-line/40 text-avorria-white">
              <span>{item.title}</span>
              <span className="text-avorria-signal">{item.code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

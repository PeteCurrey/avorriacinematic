import React from "react";
import Link from "next/link";
import { INTELLIGENCE_ARTICLES } from "@/lib/scenes/intelligence-config";

export function IntelligenceFallback() {
  return (
    <div className="w-full bg-avorria-black px-6 sm:px-12 py-24 max-w-[1760px] mx-auto select-none space-y-16">
      <div className="border-b border-avorria-line pb-8 space-y-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          17 / INTELLIGENCE <span>{"//"}</span> EDITORIAL
        </span>
        <h2 className="display-xl uppercase text-avorria-white">
          Insights that earn their keep.
        </h2>
      </div>

      <div className="space-y-12">
        {INTELLIGENCE_ARTICLES.map((art) => (
          <div key={art.id} className="p-8 bg-avorria-surface border border-avorria-line space-y-4">
            <div className="flex justify-between font-mono text-xs text-avorria-signal">
              <span>{art.territory}</span>
              <span className="text-avorria-muted">{art.publishedAt}</span>
            </div>
            <h3 className="font-sans text-2xl font-bold text-avorria-white">{art.title}</h3>
            <p className="font-body text-sm text-avorria-muted max-w-xl">{art.thesis}</p>
            <Link href={art.href} className="inline-block font-mono text-xs uppercase text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-0.5">
              READ ARTICLE →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

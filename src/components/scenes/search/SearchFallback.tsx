import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SEARCH_PROPOSITION, SEARCH_NODES } from "@/lib/scenes/search-scene-config";

export function SearchFallback() {
  return (
    <div className="w-full min-h-screen bg-avorria-black px-6 sm:px-12 py-24 flex flex-col gap-16 max-w-[1760px] mx-auto select-none">
      <div className="border-b border-avorria-line pb-8 flex flex-col gap-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          {SEARCH_PROPOSITION.label}
        </span>
        <h2 className="display-lg uppercase text-avorria-white">
          {SEARCH_PROPOSITION.title} {SEARCH_PROPOSITION.proposition}
        </h2>
        <p className="font-mono text-xs text-avorria-muted uppercase tracking-widest pt-2">
          {SEARCH_PROPOSITION.capabilities}
        </p>
      </div>

      <div className="aspect-video w-full relative overflow-hidden bg-avorria-surface border border-avorria-line">
        <Image
          src="/media/projects/search/search-page-hero.svg"
          alt="Search Information Architecture"
          fill
          className="object-contain"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        {SEARCH_NODES.map((node) => (
          <div key={node.id} className="p-3 border border-avorria-line bg-avorria-surface text-avorria-white">
            <div className="text-avorria-signal">{node.type.toUpperCase()}</div>
            <div className="font-bold mt-1">{node.label}</div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-avorria-line">
        <Link
          href={SEARCH_PROPOSITION.ctaHref}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1"
        >
          <span>{SEARCH_PROPOSITION.ctaText}</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

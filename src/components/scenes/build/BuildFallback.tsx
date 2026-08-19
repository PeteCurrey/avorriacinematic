import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BUILD_PROPOSITION, BUILD_FRAGMENTS } from "@/lib/scenes/build-scene-config";

export function BuildFallback() {
  return (
    <div className="w-full min-h-screen bg-avorria-black px-6 sm:px-12 py-24 flex flex-col gap-16 max-w-[1760px] mx-auto select-none">
      <div className="border-b border-avorria-line pb-8 flex flex-col gap-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          {BUILD_PROPOSITION.label}
        </span>
        <h2 className="display-lg uppercase text-avorria-white">
          {BUILD_PROPOSITION.title} {BUILD_PROPOSITION.proposition}
        </h2>
        <p className="font-mono text-xs text-avorria-muted uppercase tracking-widest pt-2">
          {BUILD_PROPOSITION.capabilities}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BUILD_FRAGMENTS.map((frag) => (
          <div key={frag.id} className="relative aspect-video border border-avorria-line bg-avorria-surface overflow-hidden">
            <Image src={frag.svgPath} alt={frag.title} fill className="object-cover" />
            <div className="absolute bottom-0 inset-x-0 bg-avorria-black/80 p-3 flex justify-between font-mono text-xs text-avorria-white">
              <span>{frag.title}</span>
              <span className="text-avorria-signal">{frag.category}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-avorria-line">
        <Link
          href={BUILD_PROPOSITION.ctaHref}
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1"
        >
          <span>{BUILD_PROPOSITION.ctaText}</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

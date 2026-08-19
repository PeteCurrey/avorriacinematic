import React from "react";
import Image from "next/image";
import Link from "next/link";
import { OGN_PRINCIPLE } from "@/lib/scenes/ogn-scene-config";

export function OGNFallback() {
  return (
    <div className="w-full bg-avorria-black px-6 sm:px-12 py-24 max-w-[1760px] mx-auto select-none space-y-16">
      <div className="border-b border-avorria-line pb-8 space-y-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          013 / ONE GREAT NORTHERN <span>{"//"}</span> DIGITAL TRANSFORMATION
        </span>
        <h2 className="display-xl uppercase text-avorria-white">
          One Great Northern
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="font-mono text-xs text-avorria-quiet uppercase">PREVIOUS DIGITAL EXPERIENCE</div>
          <div className="aspect-[16/10] relative bg-avorria-surface border border-avorria-line overflow-hidden">
            <Image
              src="/media/projects/ogn/ogn-previous-desktop.svg"
              alt="Previous digital experience"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="font-mono text-xs text-avorria-signal uppercase">MODERN DIGITAL EXPERIENCE</div>
          <div className="aspect-[16/10] relative bg-avorria-surface border border-avorria-line overflow-hidden">
            <Image
              src="/media/projects/ogn/ogn-new-desktop.svg"
              alt="Modern digital experience"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-avorria-line pt-12 space-y-6 max-w-2xl">
        <h3 className="font-display text-4xl font-bold uppercase text-avorria-white leading-tight">
          GOOD DESIGN ISN&#39;T A SECTOR<span className="text-avorria-signal">.</span>
        </h3>
        <p className="font-body text-base text-avorria-muted leading-relaxed">
          {OGN_PRINCIPLE.supporting}
        </p>
        <div>
          <Link href={OGN_PRINCIPLE.ctaHref} className="font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1">
            {OGN_PRINCIPLE.ctaText} →
          </Link>
        </div>
      </div>
    </div>
  );
}

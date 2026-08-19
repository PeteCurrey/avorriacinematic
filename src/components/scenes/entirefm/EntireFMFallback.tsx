import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ENTIREFM_PRINCIPLE, ENTIREFM_DELIVERABLES } from "@/lib/scenes/entirefm-scene-config";

export function EntireFMFallback() {
  return (
    <div className="w-full min-h-screen bg-avorria-black px-6 sm:px-12 py-24 flex flex-col gap-16 max-w-[1760px] mx-auto select-none">
      <div className="border-b border-avorria-line pb-8 flex flex-col gap-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          11 / 18 // FACILITIES OPERATIONS PLATFORM
        </span>
        <h2 className="display-lg uppercase text-avorria-white">
          EntireFM
        </h2>
      </div>

      <div className="aspect-video w-full relative overflow-hidden bg-avorria-surface border border-avorria-line">
        <Image
          src="/media/projects/entirefm/entirefm-operational.svg"
          alt="EntireFM Facilities Platform"
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-avorria-line">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="font-display font-bold text-3xl uppercase text-avorria-white leading-tight whitespace-pre-line">
            {ENTIREFM_PRINCIPLE.statement}
          </h3>
          <p className="font-body text-base text-avorria-muted leading-relaxed">
            {ENTIREFM_PRINCIPLE.description}
          </p>
          <Link
            href={ENTIREFM_PRINCIPLE.ctaHref}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 w-fit"
          >
            <span>{ENTIREFM_PRINCIPLE.ctaText}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
          <span className="text-avorria-quiet mb-2">DELIVERED SCOPE</span>
          {ENTIREFM_DELIVERABLES.map((item) => (
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

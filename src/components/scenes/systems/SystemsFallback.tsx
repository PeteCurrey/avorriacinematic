import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SYSTEMS_PROPOSITION, SYSTEMS_DELIVERABLES } from "@/lib/scenes/systems-scene-config";

export function SystemsFallback() {
  return (
    <div className="w-full min-h-screen bg-avorria-black px-6 sm:px-12 py-24 flex flex-col gap-16 max-w-[1760px] mx-auto select-none">
      <div className="border-b border-avorria-line pb-8 flex flex-col gap-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          {SYSTEMS_PROPOSITION.label}
        </span>
        <h2 className="display-lg uppercase text-avorria-white">
          {SYSTEMS_PROPOSITION.title} {SYSTEMS_PROPOSITION.proposition}
        </h2>
        <p className="font-mono text-xs text-avorria-muted uppercase tracking-widest pt-2">
          {SYSTEMS_PROPOSITION.capabilities}
        </p>
      </div>

      <div className="aspect-video w-full relative overflow-hidden bg-avorria-surface border border-avorria-line">
        <Image
          src="/media/projects/systems/systems-architecture-hero.svg"
          alt="Systems Architecture Overview"
          fill
          className="object-contain"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-avorria-line">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="font-display font-bold text-3xl uppercase text-avorria-white">
            Digital Leverage Through Systems Architecture
          </h3>
          <p className="font-body text-base text-avorria-muted leading-relaxed">
            Avorria designs AI, automation and data systems that connect business information to useful actions while retaining human control where judgment matters.
          </p>
          <Link
            href={SYSTEMS_PROPOSITION.ctaHref}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 w-fit"
          >
            <span>{SYSTEMS_PROPOSITION.ctaText}</span>
            <span>→</span>
          </Link>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
          <span className="text-avorria-quiet mb-2">CAPABILITY SCOPE</span>
          {SYSTEMS_DELIVERABLES.map((item) => (
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

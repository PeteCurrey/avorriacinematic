import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ALKOTA_WORK_COMPONENTS } from "@/lib/scenes/alkota-scene-config";

export function AlkotaFallback() {
  return (
    <div className="w-full min-h-screen bg-avorria-black px-6 sm:px-12 py-24 flex flex-col gap-20 max-w-[1760px] mx-auto">
      <div className="border-b border-avorria-line pb-8 flex flex-col gap-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          03 / 18 // CASE STUDY FEATURE
        </span>
        <h2 className="display-lg uppercase text-avorria-white">
          Alkota Bikes: Product / Brand / Digital
        </h2>
      </div>

      <div className="aspect-video w-full relative overflow-hidden bg-avorria-surface border border-avorria-line">
        <Image
          src="/media/projects/alkota/product/naked-carbon-hero.jpg"
          alt="Alkota Bikes Project 01 Naked Carbon Flagship"
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-avorria-line">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="font-display font-bold text-3xl uppercase text-avorria-white">
            A product deserves a digital world built with the same intent.
          </h3>
          <p className="font-body text-base text-avorria-muted leading-relaxed">
            A high-performance product demanded more than a portfolio website. We engineered the complete brand identity, digital flagship architecture, and interactive product storytelling around the pre-production carbon chassis itself.
          </p>
          <Link
            href="/work/alkota-bikes"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 w-fit"
          >
            <span>Explore Alkota Case Study</span>
            <span>→</span>
          </Link>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
          <span className="text-avorria-quiet mb-2">DELIVERED SCOPE</span>
          {ALKOTA_WORK_COMPONENTS.map((item) => (
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

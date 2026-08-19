"use client";

import React from "react";
import { ServiceOfferingItem } from "@/types/content";

interface ServiceDeliverablesMatrixProps {
  sectionEyebrow?: string;
  sectionTitle?: string;
  offerings: ServiceOfferingItem[];
}

export function ServiceDeliverablesMatrix({
  sectionEyebrow = "01 // SCOPE & CAPABILITIES",
  sectionTitle = "WHAT WE ACTUALLY DO",
  offerings
}: ServiceDeliverablesMatrixProps) {
  return (
    <section className="w-full border-b border-avorria-line bg-avorria-black py-16 sm:py-24">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="border-b border-avorria-line pb-8 mb-12">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal mb-3">
            <span>{sectionEyebrow}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-avorria-white">
            {sectionTitle}
          </h2>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-3 max-w-2xl">
            Exact commercial deliverables engineered for performance, precision, and longevity. No vague promises.
          </p>
        </div>

        {/* 2x2 or Grid of Offerings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offerings.map((offering) => (
            <div
              key={offering.id}
              className="p-8 border border-avorria-line bg-avorria-surface/40 hover:border-avorria-signal transition-colors flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-avorria-signal uppercase tracking-widest border-b border-avorria-line/40 pb-3">
                  <span>{offering.code}</span>
                  <span className="text-avorria-quiet text-[10px]">Verified Output</span>
                </div>

                <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-avorria-white">
                  {offering.title}
                </h3>

                <p className="font-body text-sm sm:text-base text-avorria-white/80 leading-relaxed">
                  {offering.description}
                </p>
              </div>

              {/* Concrete Deliverable List */}
              <div className="pt-4 border-t border-avorria-line/40 space-y-3 font-mono text-xs">
                <span className="text-avorria-muted uppercase tracking-wider text-[11px] block font-bold">
                  CONCRETE DELIVERABLES
                </span>
                <ul className="space-y-2">
                  {offering.deliverables.map((deliv, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-avorria-white/90">
                      <span className="text-avorria-signal font-bold" aria-hidden="true">→</span>
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

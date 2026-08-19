"use client";

import React from "react";
import Link from "next/link";

interface ServiceCTASectionProps {
  heading: string;
  description: string;
  buttonText: string;
  projectServiceParam: string;
}

export function ServiceCTASection({
  heading,
  description,
  buttonText,
  projectServiceParam
}: ServiceCTASectionProps) {
  return (
    <section className="w-full bg-avorria-black py-20 sm:py-32">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="p-8 sm:p-14 lg:p-16 border border-avorria-line bg-avorria-surface/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs text-avorria-signal uppercase tracking-widest font-bold">
              <span className="w-2 h-2 rounded-full bg-avorria-signal animate-pulse" aria-hidden="true" />
              <span>DIRECT COMMERCIAL INTAKE</span>
            </div>

            <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-avorria-white leading-tight">
              {heading}
            </h2>

            <p className="font-body text-sm sm:text-base text-avorria-white/80 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <Link
              href={`/start-project?service=${projectServiceParam}`}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-avorria-signal text-avorria-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-avorria-white transition-colors text-center"
            >
              <span>{buttonText}</span>
              <span>→</span>
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center justify-center px-6 py-4 border border-avorria-line bg-avorria-surface/60 text-avorria-white font-mono text-xs uppercase tracking-widest hover:border-avorria-white transition-colors text-center"
            >
              <span>All Services Index</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";

interface CapabilityCTAProps {
  capabilityName: string;
  ctaHeading: string;
  ctaDescription: string;
  buttonText: string;
  buttonHref: string;
}

export function CapabilityCTA({
  capabilityName,
  ctaHeading,
  ctaDescription,
  buttonText,
  buttonHref,
}: CapabilityCTAProps) {
  return (
    <section aria-label="Commission Project Action" className="py-24 sm:py-36 bg-avorria-black border-t border-avorria-line">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="border border-avorria-line bg-avorria-surface/30 p-8 sm:p-16 lg:p-20 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-3 bg-avorria-surface border border-avorria-signal/30 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-avorria-signal">
              <span>COMMERCIAL COMMISSION // {capabilityName}</span>
            </div>

            <h2 className="display-xl font-display font-black uppercase tracking-tight text-avorria-white leading-none">
              {ctaHeading}
            </h2>

            <p className="font-body text-base sm:text-xl text-avorria-white/80 leading-relaxed">
              {ctaDescription}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-3 bg-avorria-signal text-avorria-black font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-10 py-5 hover:bg-avorria-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-avorria-signal"
            >
              <span>{buttonText}</span>
              <span>→</span>
            </Link>

            <Link
              href="/capabilities"
              className="font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white border-b border-avorria-line pb-1 transition-colors"
            >
              ALL CAPABILITIES
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { FINALE_CONFIG } from "@/lib/scenes/finale-config";
import { Z } from "@/lib/scene-z";

interface FinaleActionsProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function FinaleActions({ containerRef }: FinaleActionsProps) {
  return (
    <div
      ref={containerRef}
      className="absolute bottom-16 sm:bottom-20 left-6 sm:left-16 right-6 sm:right-16 opacity-0"
      style={{ zIndex: Z.interactive }}
    >
      <div className="max-w-[1760px] mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-avorria-line pt-8">
        {/* Primary CTA */}
        <Link
          href={FINALE_CONFIG.primaryCtaHref}
          className="group inline-flex items-center gap-4 text-2xl sm:text-4xl font-display font-black uppercase tracking-tight text-avorria-white hover:text-avorria-signal transition-colors"
        >
          <span>{FINALE_CONFIG.primaryCtaText}</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-3 text-avorria-signal">
            →
          </span>
        </Link>

        {/* Secondary Direct Contact */}
        <div className="font-mono text-xs uppercase tracking-widest text-avorria-muted flex items-center gap-3">
          <span>OR EMAIL DIRECTLY //</span>
          <a
            href={`mailto:${FINALE_CONFIG.contactEmail}`}
            className="text-avorria-white hover:text-avorria-signal border-b border-avorria-line hover:border-avorria-signal pb-0.5 transition-colors"
          >
            {FINALE_CONFIG.contactEmail}
          </a>
        </div>
      </div>
    </div>
  );
}

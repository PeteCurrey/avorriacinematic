import React from "react";
import Link from "next/link";
import { FINALE_CONFIG } from "@/lib/scenes/finale-config";

interface FinaleActionsProps {
  progress: number;
}

export function FinaleActions({ progress }: FinaleActionsProps) {
  // Reveals at 0.69 -> 1.00
  if (progress < 0.67) return null;

  const opacity = Math.min((progress - 0.67) / 0.05, 1);
  const translateY = Math.max(30 * (1 - (progress - 0.67) / 0.06), 0);

  return (
    <div
      className="absolute bottom-16 sm:bottom-20 left-6 sm:left-16 right-6 sm:right-16 z-20 transition-all duration-300"
      style={{ opacity, transform: `translateY(${translateY}px)` }}
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

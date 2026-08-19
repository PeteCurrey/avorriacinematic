import React from "react";
import Link from "next/link";

interface CaseStudyFooterProps {
  projectTitle: string;
}

export function CaseStudyFooter({ projectTitle }: CaseStudyFooterProps) {
  return (
    <section aria-label="Start a Project" className="py-20 sm:py-28 bg-avorria-black text-avorria-white border-t border-avorria-line">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10 border border-avorria-line bg-avorria-surface/30 p-8 sm:p-14">
          <div className="space-y-4">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              ENGAGEMENT // BESPOKE SYSTEMS
            </span>
            <h2 className="display-lg font-display font-black uppercase tracking-tight text-avorria-white">
              COMMISSION SIMILAR WORK
            </h2>
            <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider max-w-xl">
              We design and engineer bespoke software architectures, AI systems, and high-performance digital flagships.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-3 bg-avorria-signal text-avorria-black font-display font-extrabold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 hover:bg-avorria-white transition-colors"
            >
              <span>START A PROJECT</span>
              <span>→</span>
            </Link>

            <Link
              href="/work"
              className="font-mono text-xs uppercase tracking-widest text-avorria-white hover:text-avorria-signal border-b border-avorria-line pb-1 transition-colors"
            >
              ALL WORK INDEX
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

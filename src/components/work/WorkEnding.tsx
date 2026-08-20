import React from "react";
import Link from "next/link";

export function WorkEnding() {
  return (
    <section className="py-24 sm:py-36 bg-avorria-black text-avorria-white">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="border border-avorria-line bg-avorria-surface/30 p-8 sm:p-16 lg:p-20 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="space-y-6 min-w-0">
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              ENGAGEMENT // 2025
            </span>
            <h2 className="display-column text-avorria-white">
              HAVE SOMETHING<br />
              <span className="text-avorria-signal">IN MIND?</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-avorria-muted uppercase tracking-wider max-w-lg">
              We design and engineer bespoke platforms, search architectures, and AI systems for ambitious organisations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8">
            <Link
              href="/start-project"
              className="inline-flex items-center gap-4 bg-avorria-signal text-avorria-black font-display font-extrabold text-sm sm:text-base uppercase tracking-wider px-8 py-4 hover:bg-avorria-white transition-colors duration-200"
            >
              <span>START A PROJECT</span>
              <span>→</span>
            </Link>

            <a
              href="mailto:enquiries@avorria.com"
              className="font-mono text-xs uppercase tracking-widest text-avorria-white hover:text-avorria-signal border-b border-avorria-line pb-1 transition-colors"
            >
              enquiries@avorria.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

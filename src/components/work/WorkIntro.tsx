import React from "react";

export function WorkIntro() {
  return (
    <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 border-b border-avorria-line">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Instrumentation Metadata */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet mb-6 sm:mb-8 border-b border-avorria-line/40 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-avorria-signal font-bold">PORTFOLIO</span>
            <span className="text-avorria-line-strong">/</span>
            <span className="text-avorria-white">INDEX 2024–2025</span>
          </div>
          <div className="text-avorria-muted">
            01 // 03 // ARCHIVE
          </div>
        </div>

        {/* Primary Page Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
          <div>
            <h1 className="display-xxl text-avorria-white font-display font-black uppercase tracking-tight leading-none">
              WORK<span className="text-avorria-signal">.</span>
            </h1>
            <p className="font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest mt-4">
              BUILT ACROSS PRODUCTS, SYSTEMS AND BUSINESSES.
            </p>
          </div>

          <div className="max-w-md lg:text-right">
            <p className="font-body text-sm sm:text-base text-avorria-muted leading-relaxed">
              A comprehensive index of commissioned client platforms, proprietary ventures, and commercial digital systems engineered by Avorria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

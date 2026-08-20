import React from "react";
import type { CaseStudyChapter } from "@/types/case-study";

export function ProcessChapter({ chapter }: { chapter: CaseStudyChapter }) {
  return (
    <div className="py-20 sm:py-32 border-b border-avorria-line">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <div className="space-y-3">
          {chapter.eyebrow && (
            <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
              {chapter.eyebrow}
            </span>
          )}
          {chapter.title && (
            <h2 className="display-column font-display font-black uppercase tracking-tight text-avorria-white">
              {chapter.title}
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {chapter.body && (
            <div className="lg:col-span-7">
              <p className="font-body text-lg text-avorria-white/90 leading-relaxed">
                {chapter.body}
              </p>
            </div>
          )}
          {chapter.secondaryBody && (
            <div className="lg:col-span-5 p-6 bg-avorria-surface border border-avorria-line">
              <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-widest block mb-2">
                ENGINEERING DECISION
              </span>
              <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider leading-relaxed">
                {chapter.secondaryBody}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

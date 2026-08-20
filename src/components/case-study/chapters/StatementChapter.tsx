import React from "react";
import type { CaseStudyChapter } from "@/types/case-study";

export function StatementChapter({ chapter }: { chapter: CaseStudyChapter }) {
  return (
    <div className="py-20 sm:py-32 border-b border-avorria-line">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-8">
        {chapter.eyebrow && (
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            {chapter.eyebrow}
          </span>
        )}
        {chapter.title && (
          <h2 className="display-lg font-display font-black uppercase tracking-tight text-avorria-white max-w-4xl leading-tight">
            {chapter.title}
          </h2>
        )}
        {chapter.body && (
          <p className="font-body text-base sm:text-xl text-avorria-white/80 leading-relaxed max-w-3xl">
            {chapter.body}
          </p>
        )}
      </div>
    </div>
  );
}

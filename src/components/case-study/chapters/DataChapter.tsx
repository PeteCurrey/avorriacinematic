import React from "react";
import type { CaseStudyChapter } from "@/types/case-study";

export function DataChapter({ chapter }: { chapter: CaseStudyChapter }) {
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
            <h2 className="display-lg font-display font-black uppercase tracking-tight text-avorria-white">
              {chapter.title}
            </h2>
          )}
        </div>

        {chapter.body && (
          <p className="font-body text-xl text-avorria-white/90 leading-relaxed max-w-3xl">
            {chapter.body}
          </p>
        )}

        {chapter.evidence && chapter.evidence.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {chapter.evidence.map((item) => (
              <div key={item.id} className="p-6 bg-avorria-surface border border-avorria-line space-y-2">
                <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-widest block">
                  {item.type} {"//"} VERIFIED
                </span>
                <div className="display-md font-display font-black text-avorria-white">
                  {item.value} <span className="text-avorria-signal text-sm">{item.unit}</span>
                </div>
                <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

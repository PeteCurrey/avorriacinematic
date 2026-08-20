import React from "react";
import type { CaseStudyChapter } from "@/types/case-study";

export function ProofChapter({ chapter }: { chapter: CaseStudyChapter }) {
  const verifiedEvidence = chapter.evidence?.filter((e) => e.verified) || [];

  if (verifiedEvidence.length === 0 && !chapter.body) return null;

  return (
    <div className="py-20 sm:py-32 border-b border-avorria-line">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-12">
        <div className="space-y-3">
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
            {chapter.eyebrow || "PROOF // EVIDENCE"}
          </span>
          <h2 className="display-column font-display font-black uppercase tracking-tight text-avorria-white">
            {chapter.title || "VERIFIED OUTCOMES"}
          </h2>
        </div>

        {chapter.body && (
          <p className="font-body text-xl text-avorria-white/90 leading-relaxed max-w-3xl">
            {chapter.body}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {verifiedEvidence.map((item) => (
            <div key={item.id} className="p-8 bg-avorria-surface border border-avorria-line space-y-3">
              <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-widest block">
                {item.type} {"//"} VERIFIED
              </span>
              <div className="display-column font-display font-black text-avorria-white">
                {item.value} <span className="text-avorria-signal text-base">{item.unit}</span>
              </div>
              <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider">
                {item.description}
              </p>
              <div className="pt-4 border-t border-avorria-line/40 font-mono text-[10px] text-avorria-quiet uppercase">
                SOURCE: {item.source}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

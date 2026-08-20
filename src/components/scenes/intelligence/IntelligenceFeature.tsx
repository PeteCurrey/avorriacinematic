import React from "react";
import Link from "next/link";
import type { IntelligenceArticle } from "@/types/intelligence";
import { CursorTrigger } from "@/providers/CursorContext";

interface IntelligenceFeatureProps {
  article: IntelligenceArticle;
  isDominant?: boolean;
}

export function IntelligenceFeature({ article, isDominant = false }: IntelligenceFeatureProps) {
  return (
    <article
      className={`border border-avorria-line bg-avorria-surface p-8 sm:p-12 flex flex-col justify-between transition-all duration-300 hover:border-avorria-signal/60 ${isDominant ? "lg:col-span-8 min-h-[420px]" : "lg:col-span-4 min-h-[380px]"}`}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center font-mono text-xs">
          <span className="text-avorria-signal uppercase tracking-wider font-bold">
            {article.territory}
          </span>
          <span className="text-avorria-quiet text-[11px]">{article.publishedAt}</span>
        </div>

        <div className="space-y-4">
          <h3 className={`font-sans font-bold text-avorria-white tracking-tight leading-tight ${isDominant ? "text-2xl sm:text-4xl max-w-2xl" : "text-xl sm:text-2xl"}`}>

            {article.title}
          </h3>
          <p className="font-body text-sm text-avorria-muted leading-relaxed max-w-xl">
            {article.thesis}
          </p>
        </div>
      </div>

      <div className="pt-8 border-t border-avorria-line/40 flex items-center justify-between">
        <CursorTrigger state="view" label="READ">
          <Link
            href={article.href}
            className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
          >
            <span>READ ARTICLE</span>
            <span>→</span>
          </Link>
        </CursorTrigger>
        <span className="font-mono text-[10px] text-avorria-quiet uppercase">OPINION &amp; ANALYSIS</span>
      </div>
    </article>
  );
}

import React from "react";
import { CaseStudyChapter } from "@/types/case-study";

export function QuoteChapter({ chapter }: { chapter: CaseStudyChapter }) {
  const quote = chapter.quote;
  if (!quote) return null;

  return (
    <div className="py-20 sm:py-32 border-b border-avorria-line">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-8">
        <blockquote className="space-y-6">
          <p className="display-md font-display font-bold uppercase tracking-tight text-avorria-white leading-tight max-w-4xl">
            &ldquo;{quote.text}&rdquo;
          </p>
          <footer className="font-mono text-xs uppercase tracking-widest text-avorria-muted flex items-center gap-3">
            <span className="text-avorria-signal font-bold">{quote.author}</span>
            <span className="text-avorria-line-strong">/</span>
            <span>{quote.role}</span>
            {quote.company && (
              <>
                <span className="text-avorria-line-strong">/</span>
                <span className="text-avorria-white">{quote.company}</span>
              </>
            )}
          </footer>
        </blockquote>
      </div>
    </div>
  );
}

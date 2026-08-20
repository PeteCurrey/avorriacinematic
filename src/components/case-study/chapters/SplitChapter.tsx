import React from "react";
import Image from "next/image";
import type { CaseStudyChapter } from "@/types/case-study";

export function SplitChapter({ chapter }: { chapter: CaseStudyChapter }) {
  const media = chapter.media?.[0];

  return (
    <div className="py-20 sm:py-32 border-b border-avorria-line">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            {chapter.eyebrow && (
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block">
                {chapter.eyebrow}
              </span>
            )}
            {chapter.title && (
              <h2 className="display-md font-display font-black uppercase tracking-tight text-avorria-white">
                {chapter.title}
              </h2>
            )}
            {chapter.body && (
              <p className="font-body text-base text-avorria-white/80 leading-relaxed">
                {chapter.body}
              </p>
            )}
            {chapter.secondaryBody && (
              <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider leading-relaxed pt-2">
                {chapter.secondaryBody}
              </p>
            )}
          </div>

          {media && (
            <div className="lg:col-span-6 relative w-full aspect-[4/3] overflow-hidden bg-avorria-surface border border-avorria-line">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

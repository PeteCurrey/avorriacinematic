import React from "react";
import Image from "next/image";
import type { CaseStudyChapter } from "@/types/case-study";

export function TransformationChapter({ chapter }: { chapter: CaseStudyChapter }) {
  const beforeAfter = chapter.beforeAfter;

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

        {beforeAfter ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
            <div className="space-y-3">
              <span className="font-mono text-[10px] text-avorria-quiet uppercase tracking-widest block">
                {beforeAfter.beforeLabel}
              </span>
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-avorria-surface border border-avorria-line opacity-75">
                <Image
                  src={beforeAfter.beforeMedia.src}
                  alt={beforeAfter.beforeMedia.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center grayscale"
                />
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-widest block">
                {beforeAfter.afterLabel}
              </span>
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-avorria-surface border border-avorria-signal/40">
                <Image
                  src={beforeAfter.afterMedia.src}
                  alt={beforeAfter.afterMedia.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

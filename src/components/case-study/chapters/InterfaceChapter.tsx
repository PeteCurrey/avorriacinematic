import React from "react";
import Image from "next/image";
import type { CaseStudyChapter } from "@/types/case-study";

export function InterfaceChapter({ chapter }: { chapter: CaseStudyChapter }) {
  const media = chapter.media?.[0];

  return (
    <div className="py-20 sm:py-32 border-b border-avorria-line">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            {chapter.eyebrow && (
              <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block mb-2">
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
            <p className="font-body text-base text-avorria-white/80 max-w-md">
              {chapter.body}
            </p>
          )}
        </div>

        {media && (
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-avorria-surface border border-avorria-line">
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1760px"
              className="object-cover object-center"
            />
          </div>
        )}
      </div>
    </div>
  );
}

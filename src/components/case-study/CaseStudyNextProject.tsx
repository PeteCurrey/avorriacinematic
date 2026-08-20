import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { NextProjectConfig } from "@/types/case-study";

interface CaseStudyNextProjectProps {
  nextProject?: NextProjectConfig;
}

export function CaseStudyNextProject({ nextProject }: CaseStudyNextProjectProps) {
  if (!nextProject) {
    return (
      <section className="py-24 border-b border-avorria-line bg-avorria-surface/30">
        <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-3 font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-avorria-white hover:text-avorria-signal transition-colors"
          >
            <span>RETURN TO WORK INDEX</span>
            <span className="text-avorria-signal">→</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Next Case Study" className="border-b border-avorria-line py-24 sm:py-36 bg-avorria-black">
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="space-y-8">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-4">
            <span className="text-avorria-signal font-bold">
              {nextProject.isEndOfSeries ? "SERIES CONCLUSION" : "NEXT PROJECT"}
            </span>
            <span>{nextProject.projectIndex || "FEATURED FLAGSHIP"}</span>
          </div>

          <Link
            href={`/work/${nextProject.slug}`}
            className="group block relative w-full aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-avorria-surface border border-avorria-line focus:outline-none focus-visible:ring-2 focus-visible:ring-avorria-signal"
            aria-label={`Continue to next case study: ${nextProject.title}`}
          >
            <Image
              src={nextProject.heroMedia}
              alt={`${nextProject.title} next project preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 1760px"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.015]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-avorria-black/80 via-avorria-black/20 to-transparent" />

            <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest block mb-2">
                  {nextProject.descriptor}
                </span>
                <h2 className="display-xl font-display font-black uppercase tracking-tight text-avorria-white group-hover:text-avorria-signal transition-colors">
                  {nextProject.title}
                </h2>
              </div>

              <div className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm uppercase tracking-widest text-avorria-white group-hover:text-avorria-signal transition-colors">
                <span>VIEW CASE STUDY</span>
                <span className="text-avorria-signal transition-transform duration-200 group-hover:translate-x-2">→</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

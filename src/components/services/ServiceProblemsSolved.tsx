"use client";

import React from "react";
import type { ProblemSolutionItem } from "@/types/content";

interface ServiceProblemsSolvedProps {
  sectionEyebrow?: string;
  sectionTitle?: string;
  problems: ProblemSolutionItem[];
}

export function ServiceProblemsSolved({
  sectionEyebrow = "02 // COMMERCIAL CLARITY",
  sectionTitle = "THE PROBLEMS WE SOLVE",
  problems
}: ServiceProblemsSolvedProps) {
  return (
    <section className="w-full border-b border-avorria-line bg-avorria-black py-16 sm:py-24">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="border-b border-avorria-line pb-8 mb-12">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal mb-3">
            <span>{sectionEyebrow}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-avorria-white">
            {sectionTitle}
          </h2>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-3 max-w-2xl">
            We focus on recognizable business friction rather than theoretical technology debates.
          </p>
        </div>

        {/* Problem to Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems.map((item, index) => (
            <div
              key={index}
              className="p-8 border border-avorria-line bg-avorria-surface/30 hover:border-avorria-line-strong transition-colors flex flex-col justify-between space-y-6"
            >
              {/* The Recognisable Problem */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-rose-400 uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-rose-500" aria-hidden="true" />
                  <span>THE BUSINESS PROBLEM</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl uppercase tracking-tight text-avorria-white">
                  &ldquo;{item.problem}&rdquo;
                </h3>
                <p className="font-body text-xs sm:text-sm text-avorria-muted leading-relaxed">
                  <strong className="text-avorria-white font-mono uppercase text-[11px] block mb-1">How it manifests:</strong>
                  {item.symptom}
                </p>
              </div>

              {/* The Avorria Solution */}
              <div className="pt-6 border-t border-avorria-line/60 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs text-avorria-signal uppercase tracking-wider font-bold">
                  <span className="w-2 h-2 rounded-full bg-avorria-signal" aria-hidden="true" />
                  <span>AVORRIA RESOLUTION</span>
                </div>

                <p className="font-body text-sm sm:text-base text-avorria-white/90 leading-relaxed">
                  {item.solution}
                </p>

                <div className="p-3 bg-avorria-black border border-avorria-signal/30 font-mono text-xs text-avorria-white">
                  <span className="text-avorria-signal font-bold uppercase mr-2">Commercial Outcome:</span>
                  {item.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

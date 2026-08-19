"use client";

import React from "react";
import Link from "next/link";
import { LAB_EXPERIMENTS } from "@/lib/scenes/lab-config";

/**
 * HOME LAB TEASER
 *
 * Curated 3-experiment natural preview of Avorria Lab exploration.
 * Replaces the full 6-experiment heavy playground on the homepage.
 */
export function HomeLabTeaser() {
  const topThree = LAB_EXPERIMENTS.slice(0, 3);

  return (
    <section className="relative w-full bg-avorria-black border-t border-avorria-line py-24 sm:py-32 px-6 sm:px-12 select-none">
      <div className="max-w-[1760px] mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-avorria-line/40 pb-6">
          <div>
            <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest mb-2">
              05 / AVORRIA LAB
            </div>
            <h2 className="display-lg text-avorria-white font-normal">
              Applied research in generative UI, voice models &amp; spatial platforms.
            </h2>
          </div>
          <Link
            href="/lab"
            className="font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest hover:underline shrink-0"
          >
            EXPLORE ALL EXPERIMENTS →
          </Link>
        </div>

        {/* 3 Experiment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topThree.map((exp, idx) => (
            <Link
              key={exp.id}
              href={`/lab/${exp.slug}`}
              className="group flex flex-col justify-between border border-avorria-line bg-avorria-surface/60 p-8 hover:border-avorria-signal/60 transition-colors min-h-[340px]"
            >
              <div className="flex items-center justify-between font-mono text-xs text-avorria-quiet">
                <span className="text-avorria-signal">EXP 0{idx + 1}</span>
                <span>{exp.status}</span>
              </div>

              <div className="my-auto py-6">
                <h3 className="text-xl sm:text-2xl text-avorria-white font-sans font-medium mb-3 group-hover:text-avorria-signal transition-colors">
                  {exp.title}
                </h3>
                <p className="text-sm text-avorria-muted font-body leading-relaxed">
                  {exp.hypothesis}
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-avorria-quiet border-t border-avorria-line/40 pt-4">
                <span>{exp.descriptor}</span>
                <span className="text-avorria-signal group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

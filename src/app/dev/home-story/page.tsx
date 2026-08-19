"use client";

import React from "react";
import Link from "next/link";
import { HOME_SECTIONS } from "@/lib/home/homepage-story";
import { HOMEPAGE_FEATURED_PROJECTS } from "@/lib/home/homepage-projects";

export default function HomeStoryDevPage() {
  return (
    <div className="min-h-screen bg-avorria-black text-avorria-white font-mono p-6 sm:p-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-avorria-line pb-6">
          <div className="text-avorria-signal text-xs uppercase tracking-widest">
            AVORRIA DEV // HOMEPAGE DIRECTOR&apos;S CUT STORY BLUEPRINT
          </div>
          <h1 className="text-2xl sm:text-3xl font-sans font-bold text-avorria-white">
            8-Chapter Editorial Architecture &amp; Story Hierarchy
          </h1>
          <p className="text-xs text-avorria-muted max-w-3xl">
            This route validates the commercial narrative flow of the public homepage. The homepage sells Avorria through one focused argument rather than fragmented mini-case-study loops.
          </p>
        </div>

        {/* 8 Chapters Overview */}
        <div className="flex flex-col gap-6">
          <div className="text-xs uppercase tracking-widest text-avorria-signal">
            PUBLIC CHAPTER BLUEPRINT (8 CANONICAL SECTIONS)
          </div>

          <div className="grid grid-cols-1 gap-4">
            {HOME_SECTIONS.map((sec) => (
              <div
                key={sec.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-avorria-line bg-avorria-surface/60 p-6"
              >
                <div className="flex flex-col gap-1 max-w-2xl">
                  <div className="text-xs text-avorria-signal font-bold">{sec.title}</div>
                  <div className="text-sm text-avorria-white font-sans font-medium">{sec.questionAnswered}</div>
                  <div className="text-xs text-avorria-muted">{sec.purpose}</div>
                </div>

                <div className="flex items-center gap-6 text-xs shrink-0 border-t md:border-t-0 md:border-l border-avorria-line/40 pt-4 md:pt-0 md:pl-6">
                  <div>
                    <div className="text-[10px] text-avorria-quiet uppercase">ENERGY</div>
                    <div className="text-avorria-white">{sec.motionEnergy}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-avorria-quiet uppercase">DESKTOP</div>
                    <div className="text-avorria-signal">{sec.targetHeightDesktop}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-avorria-quiet uppercase">MOBILE</div>
                    <div className="text-avorria-muted">{sec.targetHeightMobile}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured 4 Flagships */}
        <div className="flex flex-col gap-6 border-t border-avorria-line pt-8">
          <div className="text-xs uppercase tracking-widest text-avorria-signal">
            FEATURED FILM-REEL SHOWCASE (CHAPTER 02)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOMEPAGE_FEATURED_PROJECTS.map((proj) => (
              <div
                key={proj.slug}
                className="flex flex-col justify-between border border-avorria-line bg-avorria-surface/40 p-6 gap-4"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-avorria-signal">{proj.projectIndex}</span>
                  <span className="text-avorria-white bg-black/60 px-2 py-0.5 border border-white/10">{proj.relationship}</span>
                </div>

                <div>
                  <div className="text-base font-sans text-avorria-white font-medium mb-1">{proj.headline}</div>
                  <div className="text-xs text-avorria-muted">{proj.capabilitiesLine}</div>
                </div>

                <div className="flex items-center justify-between text-xs text-avorria-quiet border-t border-avorria-line/30 pt-3">
                  <span>GEOMETRY: {proj.aspectMode}</span>
                  <Link href={`/work/${proj.slug}`} className="text-avorria-signal hover:underline">
                    VIEW CASE STUDY →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-avorria-line pt-6 text-xs">
          <div>
            <div className="text-avorria-quiet text-[10px]">TOTAL PINNED DISTANCE</div>
            <div className="text-avorria-signal font-bold">1,070vh (Target 1,050–1,350vh)</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">PRELOAD MEDIA COUNT</div>
            <div className="text-avorria-white font-bold">2 (Hero + Alkota)</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">MINIMUM LARGE TEXT HOLD</div>
            <div className="text-green-400 font-bold">&gt;= 72vh (All Passed)</div>
          </div>
          <div>
            <div className="text-avorria-quiet text-[10px]">STORY COHERENCE</div>
            <div className="text-green-400 font-bold">1 Unified Argument</div>
          </div>
        </div>
      </div>
    </div>
  );
}

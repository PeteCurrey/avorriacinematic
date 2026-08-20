"use client";

import React from "react";
import Link from "next/link";
import { HomepageProjectFeatureDef } from "@/lib/home/homepage-projects";
import { ShowcaseMediaAperture } from "./ShowcaseMediaAperture";

interface HomepageProjectFeatureProps {
  project: HomepageProjectFeatureDef;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  mediaInnerRef?: React.RefObject<HTMLDivElement | null>;
  isPrimaryPriority?: boolean;
  /**
   * Render this feature already visible rather than starting at opacity 0.
   * The reel pins with `start: "top top"`, so the first project occupies a
   * full-viewport frame at scene progress 0 — starting it transparent shows a
   * black screen until the visitor scrolls, and leaves the frame blank
   * entirely if JS has not run yet.
   */
  isInitiallyVisible?: boolean;
}

/**
 * HOMEPAGE PROJECT FEATURE
 *
 * One Project. One Homepage. One Screen.
 * 3-Region Layout:
 * A. Top Meta (Plain Monospace: Index left, Relationship right)
 * B. Center Aperture (Canonical Screen Frame)
 * C. Bottom Footer (Headline & Capabilities left, optional Case Study link right)
 */
export function HomepageProjectFeature({
  project,
  containerRef,
  mediaInnerRef,
  isPrimaryPriority = false,
  isInitiallyVisible = false,
}: HomepageProjectFeatureProps) {
  return (
    <article
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none flex flex-col justify-between p-4 sm:p-8 lg:p-12 ${
        isInitiallyVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-label={`${project.projectIndex} — ${project.relationship}`}
    >
      {/* 1. Region A: Project Meta (Top) */}
      <div className="relative z-20 flex items-center justify-between font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-avorria-white select-none max-w-[min(90vw,1540px,calc((100dvh-180px)*16/9))] mx-auto w-full pt-2">
        <span className="text-avorria-signal font-medium">
          {project.projectIndex}
        </span>
        <span className="text-white/60 font-normal">
          {project.relationship}
        </span>
      </div>

      {/* 2. Region B: Canonical Media Aperture (Centre) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        <ShowcaseMediaAperture
          desktopSrc={project.desktopMedia}
          mobileSrc={project.mobileMedia}
          alt={project.headline}
          fitConfig={project.fitConfig}
          innerRef={mediaInnerRef}
          isPriority={isPrimaryPriority}
        />
      </div>

      {/* Subtle Readability Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />

      {/* 3. Region C: Project Footer (Bottom) */}
      <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-white/10 pt-4 select-none max-w-[min(90vw,1540px,calc((100dvh-180px)*16/9))] mx-auto w-full pb-2">
        <div className="max-w-2xl flex flex-col gap-1.5">
          <h3 className="text-base sm:text-lg lg:text-xl text-avorria-white font-normal leading-snug">
            {project.headline}
          </h3>
          <p className="font-mono text-[10px] sm:text-xs text-avorria-muted uppercase tracking-widest">
            {project.capabilitiesLine}
          </p>
        </div>

        {project.caseStudyAvailable && (
          <div className="pointer-events-auto shrink-0">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-avorria-signal uppercase tracking-widest border border-avorria-signal/30 bg-avorria-black/60 px-3.5 py-2 hover:bg-avorria-signal hover:text-black transition-colors"
            >
              <span>VIEW CASE STUDY</span>
              <span>→</span>
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

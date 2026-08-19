"use client";

import React from "react";
import Link from "next/link";
import { HomepageProjectFeatureDef } from "@/lib/home/homepage-projects";
import { ShowcaseMediaAperture } from "./ShowcaseMediaAperture";

interface HomepageProjectFeatureProps {
  project: HomepageProjectFeatureDef;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  mediaInnerRef?: React.RefObject<HTMLDivElement | null>;
  secondaryMediaRef?: React.RefObject<HTMLDivElement | null>;
  copyRef?: React.RefObject<HTMLDivElement | null>;
  isPrimaryPriority?: boolean;
}

export function HomepageProjectFeature({
  project,
  containerRef,
  mediaInnerRef,
  secondaryMediaRef,
  copyRef,
  isPrimaryPriority = false,
}: HomepageProjectFeatureProps) {
  return (
    <article
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none flex flex-col justify-between p-6 sm:p-10 lg:p-14 opacity-0"
      aria-label={`${project.projectIndex} — ${project.relationship}`}
    >
      {/* 1. Canonical Media Aperture (Centre) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
        <ShowcaseMediaAperture
          primarySrc={project.desktopMedia}
          primaryAlt={project.headline}
          primaryFitConfig={project.fitConfig}
          primaryInnerRef={mediaInnerRef}
          isPrimaryPriority={isPrimaryPriority}
          secondarySrc={project.secondaryMedia}
          secondaryAlt={`${project.projectIndex} secondary media`}
          secondaryFitConfig={project.secondaryFitConfig}
          secondaryRef={secondaryMediaRef}
          isComposition={project.isComposition}
          slug={project.slug}
        />
      </div>

      {/* Subtle Readability Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85 pointer-events-none z-10" />

      {/* Persistent Project Metadata Geometry (Top) */}
      <div
        ref={copyRef}
        className="relative z-20 flex items-center justify-between font-mono text-xs sm:text-sm uppercase tracking-widest text-avorria-white select-none max-w-[min(90vw,1540px)] mx-auto w-full"
      >
        <span className="text-avorria-signal font-medium bg-avorria-black/80 px-3 py-1 border border-white/10 backdrop-blur-md">
          {project.projectIndex}
        </span>
        <span className="text-avorria-white font-medium bg-avorria-black/80 px-3 py-1 border border-white/10 backdrop-blur-md">
          {project.relationship}
        </span>
      </div>

      {/* Headline & Persistent Metadata Geometry (Bottom) */}
      <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/15 pt-6 backdrop-blur-xs select-none max-w-[min(90vw,1540px)] mx-auto w-full">
        <div className="max-w-2xl flex flex-col gap-2">
          <h3 className="display-md text-avorria-white font-normal leading-tight">
            {project.headline}
          </h3>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-widest">
            {project.capabilitiesLine}
          </p>
        </div>

        {project.caseStudyAvailable && (
          <div className="pointer-events-auto shrink-0">
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-3 font-mono text-xs sm:text-sm text-avorria-signal uppercase tracking-widest border border-avorria-signal/40 bg-avorria-black/80 px-4 py-2.5 hover:bg-avorria-signal hover:text-black transition-colors"
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

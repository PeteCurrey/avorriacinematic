"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HomepageProjectFeatureDef } from "@/lib/home/homepage-projects";
import { CinematicMediaFrame } from "@/components/cinematic/CinematicMediaFrame";

interface HomepageProjectFeatureProps {
  project: HomepageProjectFeatureDef;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  mediaInnerRef?: React.RefObject<HTMLDivElement | null>;
  secondaryMediaRef?: React.RefObject<HTMLDivElement | null>;
  copyRef?: React.RefObject<HTMLDivElement | null>;
  isActive?: boolean;
}

export function HomepageProjectFeature({
  project,
  containerRef,
  mediaInnerRef,
  secondaryMediaRef,
  copyRef,
}: HomepageProjectFeatureProps) {
  return (
    <article
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none flex flex-col justify-between p-6 sm:p-12 lg:p-16 opacity-0"
      aria-label={`${project.projectIndex} — ${project.relationship}`}
    >
      {/* 1. Primary Project Media */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {project.aspectMode === "FULL_BLEED" ? (
          <div ref={mediaInnerRef} className="relative w-full h-full">
            {/* Desktop Screen */}
            <Image
              src={project.desktopMedia}
              alt={project.headline}
              fill
              priority
              className="hidden sm:block object-cover object-top"
            />
            {/* Mobile Screen */}
            <Image
              src={project.mobileMedia}
              alt={project.headline}
              fill
              priority
              className="sm:hidden object-cover object-top"
            />
          </div>
        ) : (
          <CinematicMediaFrame
            src={project.desktopMedia}
            alt={project.headline}
            mode={project.aspectMode}
            fit={project.aspectMode === "UI_LANDSCAPE" ? "contain" : "cover"}
            desktopFocal={{ x: 50, y: 40 }}
            mobileFocal={{ x: 50, y: 35 }}
            innerRef={mediaInnerRef}
            className={project.aspectMode === "PORTRAIT_SPLIT" ? "!justify-end !items-center" : ""}
          />
        )}

        {/* Optional Secondary Media Frame (e.g. Alkota bike or CareerOS world) */}
        {project.secondaryMedia && (
          <div
            ref={secondaryMediaRef}
            className="absolute inset-0 w-full h-full opacity-0"
          >
            <CinematicMediaFrame
              src={project.secondaryMedia}
              alt={`${project.projectIndex} product view`}
              mode="LANDSCAPE"
              fit="cover"
              desktopFocal={{ x: 50, y: 48 }}
            />
          </div>
        )}
      </div>

      {/* Subtle Readability Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none z-10" />

      {/* Persistent Project Metadata Geometry (Top) */}
      <div
        ref={copyRef}
        className="relative z-20 flex items-center justify-between font-mono text-xs sm:text-sm uppercase tracking-widest text-avorria-white select-none"
      >
        <span className="text-avorria-signal font-medium">{project.projectIndex}</span>
        <span className="text-avorria-white font-medium bg-avorria-black/70 px-3 py-1 border border-white/10 backdrop-blur-md">
          {project.relationship}
        </span>
      </div>

      {/* Headline & Persistent Metadata Geometry (Bottom) */}
      <div className="relative z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/15 pt-6 backdrop-blur-xs select-none">
        <div className="max-w-2xl flex flex-col gap-2">
          <h3 className="display-md text-avorria-white font-normal">
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

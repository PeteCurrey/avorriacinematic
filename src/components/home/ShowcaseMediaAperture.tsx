"use client";

import React from "react";
import Image from "next/image";
import { ShowcaseMediaFitConfig } from "@/lib/home/homepage-projects";

interface ShowcaseMediaApertureProps {
  primarySrc: string;
  primaryAlt: string;
  primaryFitConfig: ShowcaseMediaFitConfig;
  primaryInnerRef?: React.RefObject<HTMLDivElement | null>;
  isPrimaryPriority?: boolean;
  secondarySrc?: string;
  secondaryAlt?: string;
  secondaryFitConfig?: ShowcaseMediaFitConfig;
  secondaryRef?: React.RefObject<HTMLDivElement | null>;
  isComposition?: boolean;
  slug?: string;
}

/**
 * SHOWCASE MEDIA APERTURE
 *
 * The canonical, unvarying cinematic screen rectangle for all homepage featured projects.
 *
 * Dimensions:
 * - Width: min(90vw, 1540px)
 * - Height: min(76dvh, 840px)
 * - Aspect Ratio: ~16:9 to 16:10
 *
 * ALL FOUR PROJECTS LAND INSIDE THIS SAME OUTER RECTANGLE (<1% variance).
 */
export function ShowcaseMediaAperture({
  primarySrc,
  primaryAlt,
  primaryFitConfig,
  primaryInnerRef,
  isPrimaryPriority = false,
  secondarySrc,
  secondaryAlt,
  secondaryFitConfig,
  secondaryRef,
  isComposition = false,
  slug
}: ShowcaseMediaApertureProps) {
  return (
    <div
      className="relative w-[min(90vw,1540px)] h-[min(76dvh,840px)] rounded-none overflow-hidden border border-avorria-line/40 shadow-2xl flex items-center justify-center"
      style={{ backgroundColor: primaryFitConfig.background }}
    >
      {/* 1. CareerOS Custom Single-State Split Composition */}
      {isComposition && slug === "careeros" ? (
        <div ref={primaryInnerRef} className="relative w-full h-full flex flex-col md:flex-row items-stretch">
          {/* Left: Human Portrait (42% width) */}
          <div className="relative w-full md:w-[42%] h-1/2 md:h-full border-b md:border-b-0 md:border-r border-avorria-line/40 overflow-hidden">
            <Image
              src={primarySrc}
              alt={primaryAlt}
              fill
              priority={isPrimaryPriority}
              sizes="(max-width: 768px) 90vw, 42vw"
              className="object-cover"
              style={{ objectPosition: primaryFitConfig.desktopObjectPosition }}
            />
            <div className="absolute top-4 left-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-signal bg-avorria-black/60 px-2 py-0.5 border border-white/10 z-10">
              HUMAN USER PORTRAIT
            </div>
          </div>

          {/* Right: Career Intelligence Canvas (58% width) */}
          <div className="relative w-full md:w-[58%] h-1/2 md:h-full overflow-hidden bg-avorria-surface">
            <Image
              src="/media/projects/careeros/hero/hero_career_world_desktop.jpg"
              alt="CareerOS Product World Platform"
              fill
              sizes="(max-width: 768px) 90vw, 58vw"
              className="object-cover object-left-top"
            />
            <div className="absolute top-4 right-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-white bg-avorria-black/60 px-2 py-0.5 border border-white/10 z-10">
              CAREER VECTOR PLATFORM
            </div>
          </div>
        </div>
      ) : (
        /* Standard Canonical Media Layer */
        <div ref={primaryInnerRef} className="relative w-full h-full">
          <Image
            src={primarySrc}
            alt={primaryAlt}
            fill
            priority={isPrimaryPriority}
            sizes="(max-width: 768px) 90vw, (max-width: 1540px) 90vw, 1540px"
            className={primaryFitConfig.fit === "cover" ? "object-cover" : "object-contain p-4 sm:p-8"}
            style={{ objectPosition: primaryFitConfig.desktopObjectPosition }}
          />
        </div>
      )}

      {/* Optional Secondary Frame (Alkota Bike Crossfade) */}
      {secondarySrc && secondaryFitConfig && (
        <div
          ref={secondaryRef}
          className="absolute inset-0 w-full h-full opacity-0"
          style={{ backgroundColor: secondaryFitConfig.background }}
        >
          <Image
            src={secondarySrc}
            alt={secondaryAlt || primaryAlt}
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1540px) 90vw, 1540px"
            className={secondaryFitConfig.fit === "cover" ? "object-cover" : "object-contain p-4 sm:p-8"}
            style={{ objectPosition: secondaryFitConfig.desktopObjectPosition }}
          />
          <div className="absolute top-4 left-4 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-signal bg-avorria-black/70 px-3 py-1 border border-white/10 z-10">
            NAKED CARBON // CHASSIS
          </div>
        </div>
      )}
    </div>
  );
}

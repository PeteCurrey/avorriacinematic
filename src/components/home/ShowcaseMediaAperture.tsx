"use client";

import React from "react";
import Image from "next/image";
import { ShowcaseMediaFitConfig } from "@/lib/home/homepage-projects";

interface ShowcaseMediaApertureProps {
  desktopSrc: string;
  mobileSrc: string;
  alt: string;
  fitConfig: ShowcaseMediaFitConfig;
  innerRef?: React.RefObject<HTMLDivElement | null>;
  isPriority?: boolean;
}

/**
 * SHOWCASE MEDIA APERTURE
 *
 * The canonical, unvarying cinematic screen rectangle for all homepage featured projects.
 *
 * Exact Geometry:
 * - Desktop (md+): width: min(90vw, 1540px, calc((100dvh - 180px) * 16/9)), aspect-ratio: 16/9
 * - Mobile: width: calc(100vw - 40px), max-width: 390px, aspect-ratio: 390/844
 *
 * ALL SIX PROJECTS LAND INSIDE THIS EXACT GEOMETRY (<0.1% variance).
 * ALL SCREENSHOTS TOUCH THE APERTURE EDGES (object-cover).
 */
export function ShowcaseMediaAperture({
  desktopSrc,
  mobileSrc,
  alt,
  fitConfig,
  innerRef,
  isPriority = false,
}: ShowcaseMediaApertureProps) {
  return (
    <div
      ref={innerRef}
      className="relative w-[calc(100vw-40px)] max-w-[390px] aspect-[390/844] md:w-[min(90vw,1540px,calc((100dvh-180px)*16/9))] md:max-w-none md:aspect-[16/9] overflow-hidden border border-avorria-line/40 shadow-2xl bg-[#080808]"
    >
      {/* Desktop Image (md+) */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <Image
          src={desktopSrc}
          alt={alt}
          fill
          priority={isPriority}
          sizes="(max-width: 1540px) 90vw, 1540px"
          className="object-cover"
          style={{ objectPosition: fitConfig.desktopObjectPosition || "center top" }}
        />
      </div>

      {/* Mobile Image (<md) */}
      <div className="block md:hidden absolute inset-0 w-full h-full">
        <Image
          src={mobileSrc}
          alt={alt}
          fill
          priority={isPriority}
          sizes="90vw"
          className="object-cover"
          style={{ objectPosition: fitConfig.mobileObjectPosition || "center top" }}
        />
      </div>
    </div>
  );
}

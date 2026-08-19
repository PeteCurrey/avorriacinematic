import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

export type CinematicMediaMode =
  | "FULL_BLEED"
  | "LANDSCAPE"
  | "PORTRAIT_SPLIT"
  | "UI_LANDSCAPE";

interface CinematicMediaFrameProps {
  src: string;
  alt: string;
  mode?: CinematicMediaMode;
  fit?: "cover" | "contain";
  desktopFocal?: { x: number; y: number };
  mobileFocal?: { x: number; y: number };
  priority?: boolean;
  className?: string;
  innerRef?: React.RefObject<HTMLDivElement | null>;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  children?: React.ReactNode;
}

/**
 * CINEMATIC MEDIA FRAME
 *
 * Canonical media geometry system for all homepage cinematic project scenes.
 * Guarantees standard dimensions, prevents stretching, protects focal points,
 * and maintains consistent safe margins across all viewport sizes.
 *
 * MODES:
 * - FULL_BLEED: Reserved for intentional immersive takeovers (Alkota entry/material)
 * - LANDSCAPE: Standard project photography (min(88vw, 1440px) × min(72dvh, 820px))
 * - UI_LANDSCAPE: Genuine software captures with contain (min(86vw, 1380px) × min(70dvh, 800px))
 * - PORTRAIT_SPLIT: Human / vertical figures (min(44vw, 720px) × min(72dvh, 820px))
 */
export function CinematicMediaFrame({
  src,
  alt,
  mode = "LANDSCAPE",
  fit,
  desktopFocal = { x: 50, y: 50 },
  mobileFocal = { x: 50, y: 50 },
  priority = false,
  className = "",
  innerRef,
  containerRef,
  children,
}: CinematicMediaFrameProps) {
  const actualFit = fit || (mode === "UI_LANDSCAPE" ? "contain" : "cover");

  if (mode === "FULL_BLEED") {
    return (
      <div
        ref={containerRef}
        className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
        style={{ zIndex: Z.media }}
        aria-hidden="true"
      >
        <div ref={innerRef} className="absolute inset-0 w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={`object-${actualFit}`}
            style={{
              objectPosition: `${desktopFocal.x}% ${desktopFocal.y}%`,
            }}
          />
          {children}
        </div>
      </div>
    );
  }

  // Dimension mapping by mode
  const dimensionStyles = {
    LANDSCAPE: "w-full max-w-[min(88vw,1440px)] h-[min(72dvh,820px)]",
    UI_LANDSCAPE: "w-full max-w-[min(86vw,1380px)] h-[min(70dvh,800px)]",
    PORTRAIT_SPLIT: "w-full max-w-[min(44vw,720px)] h-[min(72dvh,820px)]",
  }[mode];

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-12 lg:p-16 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className={`relative ${dimensionStyles} flex items-center justify-center overflow-hidden`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`object-${actualFit}`}
          style={{
            objectPosition: `${desktopFocal.x}% ${desktopFocal.y}%`,
          }}
        />
        {children}
      </div>
    </div>
  );
}

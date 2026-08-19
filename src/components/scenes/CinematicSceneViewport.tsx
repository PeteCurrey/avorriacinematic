"use client";

import React, { useRef } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-config";
import { SceneConfig } from "@/types/scene";

interface CinematicSceneViewportProps {
  config: SceneConfig;
  sceneIndex: number;
  children: (progress: number) => React.ReactNode;
  fallback?: React.ReactNode;
  /** Called on every scroll update with normalised 0–1 progress */
  onProgress?: (p: number) => void;
  className?: string;
}

/**
 * CINEMATIC SCENE VIEWPORT
 *
 * The canonical architecture for all sticky cinematic scenes.
 *
 * OUTER SECTION  — owns scroll distance via `style={{ height: config.minHeight }}`
 * INNER DIV      — sticky to viewport, `h-[100dvh] overflow-hidden`
 * ScrollTrigger  — observes outer section geometry (start/end = section bounds)
 *
 * This eliminates:
 *   - pinSpacing: true (no GSAP spacer divs)
 *   - end: "+=N%" (no hardcoded scroll distances)
 *   - pin: element (no GSAP-manufactured page length)
 *
 * The registry is the single source of scroll distance.
 */
export function CinematicSceneViewport({
  config,
  sceneIndex,
  children,
  fallback,
  onProgress,
  className = "",
}: CinematicSceneViewportProps) {
  const outerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = React.useState(0);
  const { effectiveReducedMotion } = useReducedMotion();

  useGsapContext(
    (ctx) => {
      if (effectiveReducedMotion || !outerRef.current) return;

      ctx.add(() => {
        if (typeof window !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
        }

        ScrollTrigger.create({
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          onUpdate: (self) => {
            const p = self.progress;
            setProgress(p);
            onProgress?.(p);
          },
        });
      });
    },
    outerRef,
    [effectiveReducedMotion]
  );

  if (effectiveReducedMotion && fallback) {
    return (
      <section
        id={config.id}
        data-scene-id={config.id}
        data-scene-index={sceneIndex}
        data-layout-role="scene"
      >
        {fallback}
      </section>
    );
  }

  return (
    <section
      ref={outerRef}
      id={config.id}
      data-scene-id={config.id}
      data-scene-index={sceneIndex}
      data-layout-role="scene"
      data-registry-height={config.minHeight}
      className={`relative w-full bg-avorria-black select-none ${className}`}
      style={{ height: config.minHeight }}
    >
      {/* Sticky viewport — 100dvh, clips all sub-stage content */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        {children(progress)}
      </div>
    </section>
  );
}

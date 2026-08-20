"use client";

import React, { useRef, useEffect } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-config";
import type { SceneConfig } from "@/types/scene";

interface CinematicSceneViewportProps {
  config: SceneConfig;
  sceneIndex: number;
  /** Pure ReactNode children only. No function children / progress props. */
  children: React.ReactNode;
  fallback?: React.ReactNode;
  /** Declarative GSAP timeline builder */
  buildTimeline?: (timeline: gsap.core.Timeline, refs: { outer: HTMLElement; sticky: HTMLDivElement }) => void;
  className?: string;
}

/**
 * CINEMATIC SCENE VIEWPORT
 *
 * The canonical architecture for all sticky cinematic scenes.
 *
 * OUTER SECTION  — owns scroll distance via CSS custom properties (SSR safe)
 * INNER DIV      — sticky to viewport, h-[100dvh] overflow-hidden
 * ScrollTrigger  — observes outer section with scrub: true attached to a GSAP Timeline
 *
 * GSAP owns the animation directly via declarative timelines.
 * React does NOT store scroll progress or act as a frame-by-frame scroll render engine.
 *
 * Mobile height is controlled purely via CSS media query using custom properties,
 * never via window.innerWidth during render. Server and client produce identical markup.
 */
export function CinematicSceneViewport({
  config,
  sceneIndex,
  children,
  fallback,
  buildTimeline,
  className = "",
}: CinematicSceneViewportProps) {
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const { effectiveReducedMotion } = useReducedMotion();

  // Stabilise buildTimeline in a ref so external re-renders do NOT recreate the ScrollTrigger
  const builderRef = useRef(buildTimeline);
  useEffect(() => {
    builderRef.current = buildTimeline;
  });

  useGsapContext(
    (ctx) => {
      if (effectiveReducedMotion || !outerRef.current || !stickyRef.current) return;

      ctx.add(() => {
        if (typeof window !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);
        }

        const timeline = gsap.timeline({
          defaults: {
            ease: "none",
          },
        });

        if (builderRef.current && outerRef.current && stickyRef.current) {
          builderRef.current(timeline, { outer: outerRef.current, sticky: stickyRef.current });
        }

        // Non-visual sentinel at 1.000 guarantees exact normalised timeline total duration
        const clock = { value: 0 };
        timeline.to(
          clock,
          {
            value: 1,
            duration: 0.001,
            ease: "none",
          },
          0.999
        );

        ScrollTrigger.create({
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          animation: timeline,
          scrub: true,
          invalidateOnRefresh: true,
        });
      });
    },
    outerRef,
    [config.id, effectiveReducedMotion]
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
      style={{
        // CSS-only height switching — no window.innerWidth during render
        // --scene-h-desktop / --scene-h-mobile are injected as inline vars
        // and the media query in globals.css switches between them.
        ["--scene-h-desktop" as string]: config.minHeight,
        ["--scene-h-mobile" as string]: config.mobileHeight || config.minHeight,
        height: "var(--scene-h-desktop)",
      } as React.CSSProperties}
    >
      {/* Sticky viewport — 100dvh, clips all sub-stage content */}
      <div ref={stickyRef} className="sticky top-0 h-[100dvh] overflow-hidden">
        {children}
      </div>
    </section>
  );
}

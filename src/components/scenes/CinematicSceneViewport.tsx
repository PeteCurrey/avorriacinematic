"use client";

import React, { useRef, useEffect } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-config";
import { SceneConfig } from "@/types/scene";

interface CinematicSceneViewportProps {
  config: SceneConfig;
  sceneIndex: number;
  children: React.ReactNode | ((progress: number) => React.ReactNode);
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
 * OUTER SECTION  — owns scroll distance via `style={{ height: heightValue }}` (desktop/mobile aware)
 * INNER DIV      — sticky to viewport, `h-[100dvh] overflow-hidden`
 * ScrollTrigger  — observes outer section geometry with `scrub: true` attached to a single GSAP Timeline
 *
 * GSAP owns the animation directly via declarative timelines.
 * React does NOT store scroll progress or act as a frame-by-frame scroll render engine.
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

  // Stabilise buildTimeline in a ref so external re-renders do NOT trigger timeline recreation
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

        // Add non-visual sentinel at 1.000 to guarantee exact normalised duration
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
        height: typeof window !== "undefined" && window.innerWidth < 768 && config.mobileHeight
          ? config.mobileHeight
          : config.minHeight,
      }}
    >
      {/* Sticky viewport — 100dvh, clips all sub-stage content */}
      <div ref={stickyRef} className="sticky top-0 h-[100dvh] overflow-hidden">
        {typeof children === "function" ? (children as (progress: number) => React.ReactNode)(0) : children}
      </div>
    </section>
  );
}

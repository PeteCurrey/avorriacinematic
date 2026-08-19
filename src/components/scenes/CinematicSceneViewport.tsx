"use client";

import React, { useRef } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap-config";
import { SceneConfig } from "@/types/scene";

interface CinematicSceneViewportProps {
  config: SceneConfig;
  sceneIndex: number;
  children: React.ReactNode | ((progress: number) => React.ReactNode);
  fallback?: React.ReactNode;
  /** Timeline builder called when GSAP context is ready */
  buildTimeline?: (timeline: gsap.core.Timeline, refs: { outer: HTMLElement; sticky: HTMLDivElement }) => void;
  className?: string;
}

/**
 * CINEMATIC SCENE VIEWPORT
 *
 * The canonical architecture for all sticky cinematic scenes.
 *
 * OUTER SECTION  — owns scroll distance via `style={{ height: config.minHeight }}`
 * INNER DIV      — sticky to viewport, `h-[100dvh] overflow-hidden`
 * ScrollTrigger  — observes outer section geometry with `scrub: true` attached to a single GSAP Timeline
 *
 * Supports both declarative GSAP timeline orchestration and functional components.
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
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const { effectiveReducedMotion } = useReducedMotion();

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

        if (buildTimeline && outerRef.current && stickyRef.current) {
          buildTimeline(timeline, { outer: outerRef.current, sticky: stickyRef.current });
        }

        ScrollTrigger.create({
          trigger: outerRef.current,
          start: "top top",
          end: "bottom bottom",
          animation: buildTimeline ? timeline : undefined,
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: typeof children === "function" ? (self) => {
            setScrollProgress(self.progress);
          } : undefined,
        });
      });
    },
    outerRef,
    [effectiveReducedMotion, buildTimeline]
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
      <div ref={stickyRef} className="sticky top-0 h-[100dvh] overflow-hidden">
        {typeof children === "function" ? children(scrollProgress) : children}
      </div>
    </section>
  );
}

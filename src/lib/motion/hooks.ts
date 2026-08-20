"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import { initGsap, gsap, ScrollTrigger } from "./gsap-config";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * useGsapContext
 * Encapsulates GSAP animations within a gsap.context for bulletproof cleanup on unmount.
 */
export function useGsapContext(
  callback: (context: gsap.Context) => void,
  scope?: React.RefObject<HTMLElement | null> | React.MutableRefObject<HTMLElement | null>,
  deps: unknown[] = []
) {
  useIsomorphicLayoutEffect(() => {
    initGsap();
    const ctx = gsap.context(() => {}, scope?.current || undefined);

    ctx.add(() => {
      callback(ctx);
    });

    return () => {
      ctx.revert();
    };
  }, deps);
}

/**
 * useScrollTriggerRefresh
 * Triggers ScrollTrigger.refresh() when assets or layout shifts occur.
 */
export function useScrollTriggerRefresh() {
  return () => {
    if (typeof window !== "undefined") {
      ScrollTrigger.refresh();
    }
  };
}

/**
 * useSceneEntrance
 *
 * Plays a timeline ONCE when a scene scrolls into view, independent of scroll
 * position.
 *
 * Why this exists: every cinematic scene pins with `start: "top top"`, so
 * scene progress 0 is already a full-viewport frame. Building the entrance
 * into the scrubbed timeline therefore renders a blank screen at the exact
 * moment the scene takes over the viewport, and the composition only resolves
 * once the visitor scrolls further. Entrances belong here; the scrubbed
 * timeline should own transformation and exit only.
 *
 * Under reduced motion the timeline is skipped and `onReducedMotion` runs
 * instead, so content resolves instantly to its settled state.
 */
export function useSceneEntrance(
  build: (timeline: gsap.core.Timeline) => void,
  scope: React.RefObject<HTMLElement | null>,
  options: {
    reducedMotion: boolean;
    onReducedMotion?: () => void;
    /** Viewport position at which the entrance fires. */
    start?: string;
    deps?: unknown[];
  }
) {
  const { reducedMotion, onReducedMotion, start = "top 85%", deps = [] } = options;

  useIsomorphicLayoutEffect(() => {
    initGsap();
    if (!scope.current) return;

    if (reducedMotion) {
      onReducedMotion?.();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      build(tl);

      ScrollTrigger.create({
        trigger: scope.current!,
        start,
        once: true,
        onEnter: () => tl.play(),
      });
    }, scope.current);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, start, ...deps]);
}

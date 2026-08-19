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

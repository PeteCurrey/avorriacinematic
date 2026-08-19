"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import { initGsap, ScrollTrigger } from "@/lib/motion/gsap-config";
import { useReducedMotion } from "./ReducedMotionProvider";

interface MotionContextValue {
  lenis: Lenis | null;
}

const MotionContext = createContext<MotionContextValue>({ lenis: null });

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const { effectiveReducedMotion } = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    initGsap();

    // If user prefers reduced motion, do not initialize smooth scrolling
    if (effectiveReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    const gsapInstance = initGsap();
    if (gsapInstance) {
      gsapInstance.ticker.add(onRaf);
      gsapInstance.ticker.lagSmoothing(0);
    }

    return () => {
      if (gsapInstance) {
        gsapInstance.ticker.remove(onRaf);
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [effectiveReducedMotion]);

  return (
    <MotionContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}

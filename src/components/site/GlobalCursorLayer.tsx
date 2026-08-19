"use client";

import React, { useEffect, useRef, useState } from "react";
import { useCursor } from "@/providers/CursorContext";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { initGsap, gsap } from "@/lib/motion/gsap-config";

export function GlobalCursorLayer() {
  const { cursorState, cursorLabel } = useCursor();
  const { effectiveReducedMotion } = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Only fine pointers with hover capability
    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    if (!finePointer || effectiveReducedMotion) return;

    setIsSupported(true);
    initGsap();

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickSetter for 60fps GPU transform tracking with zero React re-renders
    const setX = gsap.quickSetter(cursor, "x", "px");
    const setY = gsap.quickSetter(cursor, "y", "px");

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.set(cursor, { opacity: 1 });
        isVisible = true;
      }
      setX(e.clientX);
      setY(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.set(cursor, { opacity: 0 });
      isVisible = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [effectiveReducedMotion]);

  if (!isSupported || effectiveReducedMotion || cursorState === "hidden") return null;

  const isExpanded = ["view", "drag", "try", "play"].includes(cursorState);
  const labelText = cursorLabel || (isExpanded ? cursorState.toUpperCase() : "");

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[90] opacity-0 -translate-x-1/2 -translate-y-1/2"
      aria-hidden="true"
    >
      {isExpanded ? (
        <div className="w-16 h-16 rounded-full bg-avorria-black/90 border border-avorria-signal flex items-center justify-center shadow-lg transition-transform duration-200">
          <span className="font-mono text-[10px] font-bold tracking-widest text-avorria-signal uppercase">
            {labelText}
          </span>
        </div>
      ) : (
        <div className="relative flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-avorria-signal" />
          <div className="absolute w-5 h-5 rounded-full bg-avorria-signal/15 animate-ping" />
        </div>
      )}
    </div>
  );
}

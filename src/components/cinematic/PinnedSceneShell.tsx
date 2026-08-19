"use client";

import React, { useRef } from "react";
import { useGsapContext } from "@/lib/motion/hooks";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";

interface PinnedSceneShellProps {
  id: string;
  children: React.ReactNode;
  duration?: string; // e.g. "+=200%"
  className?: string;
}

export function PinnedSceneShell({
  id,
  children,
  duration = "+=150%",
  className = ""
}: PinnedSceneShellProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinTargetRef = useRef<HTMLDivElement | null>(null);
  const { effectiveReducedMotion } = useReducedMotion();

  useGsapContext((ctx) => {
    if (effectiveReducedMotion || !containerRef.current || !pinTargetRef.current) return;

    // Pinning configuration foundation
    ctx.add(() => {
      // Prepared for ScrollTrigger pinning in Phase 01
    });
  }, containerRef, [effectiveReducedMotion, duration]);

  return (
    <div ref={containerRef} id={id} className={`relative w-full ${className}`}>
      <div ref={pinTargetRef} className="w-full min-h-screen sticky top-0 flex items-center">
        {children}
      </div>
    </div>
  );
}

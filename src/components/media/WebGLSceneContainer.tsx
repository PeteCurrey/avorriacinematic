"use client";

import React, { useRef, useState, useEffect } from "react";
import { useWebGLCapabilities } from "@/providers/WebGLCapabilityProvider";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

interface WebGLSceneContainerProps {
  sceneId: string;
  fallbackContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function WebGLSceneContainer({
  sceneId,
  fallbackContent,
  children,
  className = ""
}: WebGLSceneContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInViewportRange, setIsInViewportRange] = useState(false);
  const { effectiveSupported } = useWebGLCapabilities();
  const { effectiveReducedMotion } = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Observer with generous margin (lazy mount before entering viewport, unmount when far)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewportRange(entry.isIntersecting);
      },
      { rootMargin: "300px 0px 300px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldRender3D = effectiveSupported && !effectiveReducedMotion && isInViewportRange;

  return (
    <SceneErrorBoundary fallbackLabel={`3D Scene Container (${sceneId})`}>
      <div
        ref={containerRef}
        data-webgl-container={sceneId}
        className={`relative w-full h-full overflow-hidden ${className}`}
      >
        {shouldRender3D ? (
          children || (
            <div className="w-full h-full flex items-center justify-center bg-avorria-surface/30 border border-avorria-line">
              <span className="font-mono text-xs uppercase tracking-widest text-avorria-signal">
                WebGL Scene Active ({sceneId})
              </span>
            </div>
          )
        ) : (
          fallbackContent || (
            <div className="w-full h-full flex items-center justify-center bg-avorria-surface/10 border border-avorria-line">
              <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted">
                Static Visual Fallback ({sceneId})
              </span>
            </div>
          )
        )}
      </div>
    </SceneErrorBoundary>
  );
}

"use client";

import React, { useRef } from "react";
import type { SceneConfig } from "@/types/scene";
import { SceneErrorBoundary } from "../media/SceneErrorBoundary";
import { ScenePlaceholder } from "./ScenePlaceholder";

interface CinematicSceneProps {
  config: SceneConfig;
  children?: React.ReactNode;
  className?: string;
}

export function CinematicScene({ config, children, className = "" }: CinematicSceneProps) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const bgClass =
    config.bgMode === "surface"
      ? "bg-avorria-surface"
      : config.bgMode === "transparent"
      ? "bg-transparent"
      : "bg-avorria-black";

  return (
    <SceneErrorBoundary fallbackLabel={`Scene ${config.label} fallback mode`}>
      <section
        ref={sectionRef}
        id={config.id}
        data-scene-id={config.id}
        data-scene-index={config.index}
        data-analytics-name={config.analyticsName}
        data-pinning={config.pinningEligibility}
        data-webgl={config.webglRequirement}
        style={{ minHeight: config.minHeight || "100vh" }}
        className={`relative w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-b border-avorria-line ${bgClass} ${className}`}
      >
        <div className="max-w-[1720px] w-full mx-auto h-full flex flex-col">
          {children || <ScenePlaceholder config={config} />}
        </div>
      </section>
    </SceneErrorBoundary>
  );
}

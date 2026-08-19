"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { CLIENT_WORK_PROJECTS, VENTURE_PROJECTS } from "@/lib/scenes/work-wall-config";
import { WorkWallHeader } from "./work/WorkWallHeader";
import { WorkWallItem } from "./work/WorkWallItem";
import { WorkWallFooter } from "./work/WorkWallFooter";
import { WorkWallFallback } from "./work/WorkWallFallback";
import { getSceneConfig } from "./registry";

export function Scene12Work() {
  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-12-work")!;
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setIsDebug(params.get("workGridDebug") === "1");
    }
  }, []);

  if (effectiveReducedMotion) {
    return (
      <section id={config.id} data-scene-id={config.id} data-scene-index="4">
        <WorkWallFallback />
      </section>
    );
  }

  return (
    <section
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="4"
      className={`relative w-full bg-avorria-black select-none border-t border-avorria-line ${
        isDebug ? "ring-1 ring-emerald-500/50" : ""
      }`}
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Selected Work — Client Engagements and Avorria Ventures
      </h2>

      {/* Editorial Header */}
      <WorkWallHeader />

      {/* Primary Section: SELECTED CLIENT WORK */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-20 sm:pb-28">
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-4 mb-12 sm:mb-16 font-mono text-xs uppercase tracking-widest text-avorria-quiet">
          <span className="text-avorria-signal font-medium">SELECTED CLIENT WORK</span>
          <span className="text-avorria-white/80 font-normal">ENGINEERING &amp; DIGITAL PRODUCTS</span>
        </div>

        {/* 2-Column Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(28px,3vw,56px)] gap-y-[clamp(72px,8vw,128px)] items-start">
          {CLIENT_WORK_PROJECTS.map((project) => (
            <WorkWallItem key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Secondary Section: AVORRIA VENTURES */}
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-20 sm:pb-28 border-t border-avorria-line/30">
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-4 mb-12 sm:mb-16 font-mono text-xs uppercase tracking-widest text-avorria-quiet">
          <span className="text-avorria-signal font-medium">AVORRIA VENTURES</span>
          <span className="text-avorria-muted font-normal">BUILT &amp; OPERATED BY AVORRIA</span>
        </div>

        {/* 2-Column Editorial Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(28px,3vw,56px)] gap-y-[clamp(72px,8vw,128px)] items-start">
          {VENTURE_PROJECTS.map((project) => (
            <WorkWallItem key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Editorial Footer & View All Work CTA */}
      <WorkWallFooter />
    </section>
  );
}

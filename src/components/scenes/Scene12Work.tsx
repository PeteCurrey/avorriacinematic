"use client";
import React from "react";
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

  if (effectiveReducedMotion) {
    return (
      <section id={config.id} data-scene-id={config.id} data-scene-index="12">
        <WorkWallFallback />
      </section>
    );
  }

  return (
    <section
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="12"
      className="relative w-full bg-avorria-black select-none border-t border-avorria-line"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Selected Work — Client Engagements and Avorria Ventures
      </h2>

      {/* Editorial Header */}
      <WorkWallHeader />

      {/* Primary Section: SELECTED CLIENT WORK */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 pt-16 pb-24">
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-4 mb-16 font-mono text-xs uppercase tracking-widest text-avorria-quiet">
          <span className="text-avorria-signal">SELECTED CLIENT WORK</span>
          <span className="text-avorria-white">ENGINEERING &amp; DIGITAL PRODUCTS</span>
        </div>

        <div className="grid grid-cols-12 gap-y-24 sm:gap-y-36 gap-x-8 items-start">
          {CLIENT_WORK_PROJECTS.map((project) => (
            <WorkWallItem key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Secondary Section: AVORRIA VENTURES */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 pt-16 pb-24 border-t border-avorria-line/30">
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-4 mb-16 font-mono text-xs uppercase tracking-widest text-avorria-quiet">
          <span className="text-avorria-signal">AVORRIA VENTURES</span>
          <span className="text-avorria-muted">BUILT &amp; OPERATED BY AVORRIA</span>
        </div>

        <div className="grid grid-cols-12 gap-y-24 sm:gap-y-36 gap-x-8 items-start">
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

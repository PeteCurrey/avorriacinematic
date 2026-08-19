"use client";
import React from "react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { WORK_WALL_PROJECTS } from "@/lib/scenes/work-wall-config";
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
        Selected Work — Editorial Portfolio &amp; Project Discovery by Avorria
      </h2>

      {/* Editorial Header */}
      <WorkWallHeader />

      {/* 12-Column Editorial Grid in Natural Page Scroll */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 py-20">
        <div className="grid grid-cols-12 gap-y-24 sm:gap-y-36 gap-x-8 items-start">
          {WORK_WALL_PROJECTS.map((project) => (
            <WorkWallItem key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Editorial Footer & View All Work CTA */}
      <WorkWallFooter />
    </section>
  );
}

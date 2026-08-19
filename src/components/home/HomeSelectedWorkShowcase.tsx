"use client";

import React, { useRef } from "react";
import { HOMEPAGE_FEATURED_PROJECTS } from "@/lib/home/homepage-projects";
import { HomepageProjectFeature } from "./HomepageProjectFeature";
import { CinematicSceneViewport } from "@/components/scenes/CinematicSceneViewport";
import { SceneConfig } from "@/types/scene";

const SHOWCASE_CONFIG: SceneConfig = {
  id: "scene-selected-work-showcase" as any,
  index: 2,
  label: "SELECTED WORK SHOWCASE",
  chapter: "SHOWCASE",
  minHeight: "700vh",
  mobileHeight: "640svh",
  mobileSceneClass: "C",
  bgMode: "black",
  pinningEligibility: true,
  webglRequirement: false,
  mediaPriority: "high",
  reducedMotionStrategy: "simplified-motion",
  mobileStrategy: "mobileCinematic",
  analyticsName: "home_selected_work_showcase"
};

/**
 * HOME SELECTED WORK SHOWCASE
 *
 * 700vh Film-Reel Showcase (640svh mobile) with 6 equal windows:
 * - 01 / Alkota Bikes (0.00 – 0.17)
 * - 02 / ForecourIQ   (0.17 – 0.33)
 * - 03 / Amplios      (0.33 – 0.50)
 * - 04 / CareerOS     (0.50 – 0.67)
 * - 05 / NestIQ       (0.67 – 0.83)
 * - 06 / EntireFM     (0.83 – 1.00)
 *
 * Each project enjoys ~95vh of physical stable hold time inside the canonical aperture.
 */
export function HomeSelectedWorkShowcase() {
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const p3Ref = useRef<HTMLDivElement>(null);
  const p4Ref = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<HTMLDivElement>(null);
  const p6Ref = useRef<HTMLDivElement>(null);

  const refs = [p1Ref, p2Ref, p3Ref, p4Ref, p5Ref, p6Ref];

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    const count = HOMEPAGE_FEATURED_PROJECTS.length;
    const windowSize = 1 / count; // 0.1667

    HOMEPAGE_FEATURED_PROJECTS.forEach((_, i) => {
      const container = refs[i]?.current;
      if (!container) return;

      const enterStart = i === 0 ? 0 : i * windowSize - 0.015;
      const enterEnd = i === 0 ? 0.02 : i * windowSize + 0.015;
      const exitStart = i === count - 1 ? 0.98 : (i + 1) * windowSize - 0.015;
      const exitEnd = i === count - 1 ? 1.0 : (i + 1) * windowSize + 0.015;

      // Entrance
      timeline.fromTo(
        container,
        { opacity: 0 },
        {
          opacity: 1,
          duration: enterEnd - enterStart,
          ease: "power2.out"
        },
        enterStart
      );

      // Exit
      timeline.to(
        container,
        {
          opacity: 0,
          duration: exitEnd - exitStart,
          ease: "power2.in"
        },
        exitStart
      );
    });
  };

  return (
    <CinematicSceneViewport
      config={SHOWCASE_CONFIG}
      sceneIndex={2}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
        {/* Semantic Section Heading */}
        <h2 className="sr-only">
          Selected Work Showcase — Alkota Bikes, ForecourIQ, Amplios, CareerOS, NestIQ, EntireFM
        </h2>

        {HOMEPAGE_FEATURED_PROJECTS.map((project, idx) => (
          <HomepageProjectFeature
            key={project.slug}
            project={project}
            containerRef={refs[idx]}
            isPrimaryPriority={idx === 0}
          />
        ))}
      </div>
    </CinematicSceneViewport>
  );
}

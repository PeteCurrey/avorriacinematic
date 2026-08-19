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
  minHeight: "540vh",
  mobileHeight: "460svh",
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
 * 540vh Film-Reel Showcase with generous reading windows and seamless cross-fades:
 * - Alkota (~150vh / 0.00 – 0.27): Website hold (0.025 – 0.14) -> Bike hold (0.17 – 0.245)
 * - CareerOS (~125vh / 0.27 – 0.51): Single split composition hold (0.29 – 0.49)
 * - NestIQ (~125vh / 0.51 – 0.75): Single agent dashboard hold (0.53 – 0.73)
 * - EntireFM (~125vh / 0.75 – 0.99): Single operations platform hold (0.77 – 0.97)
 */
export function HomeSelectedWorkShowcase() {
  const p1ContainerRef = useRef<HTMLDivElement>(null);
  const p1MediaRef = useRef<HTMLDivElement>(null);
  const p1SecondaryRef = useRef<HTMLDivElement>(null);

  const p2ContainerRef = useRef<HTMLDivElement>(null);
  const p2MediaRef = useRef<HTMLDivElement>(null);

  const p3ContainerRef = useRef<HTMLDivElement>(null);
  const p3MediaRef = useRef<HTMLDivElement>(null);

  const p4ContainerRef = useRef<HTMLDivElement>(null);
  const p4MediaRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    // Stage Timeline Labels
    timeline.addLabel("entry", 0);
    timeline.addLabel("alkota_site", 0.025);
    timeline.addLabel("alkota_bike", 0.17);
    timeline.addLabel("careeros", 0.29);
    timeline.addLabel("nestiq", 0.53);
    timeline.addLabel("entirefm", 0.77);
    timeline.addLabel("handoff", 0.98);

    // ==========================================
    // 01 / ALKOTA (0.00 – 0.27 / ~145vh total)
    // ==========================================
    if (p1ContainerRef.current) {
      timeline.fromTo(
        p1ContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.025, ease: "power2.out" },
        0.00
      );
      // Exit seamlessly as CareerOS enters (overlapping by ~0.025)
      timeline.to(
        p1ContainerRef.current,
        { opacity: 0, duration: 0.025, ease: "power2.in" },
        0.25
      );
    }
    if (p1SecondaryRef.current) {
      // Bike image transitions in cleanly at 0.14 - 0.17 and holds through 0.245
      timeline.fromTo(
        p1SecondaryRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.03, ease: "power1.inOut" },
        0.14
      );
    }

    // ==========================================
    // 02 / CAREEROS (0.27 – 0.51 / ~130vh total)
    // ==========================================
    if (p2ContainerRef.current) {
      timeline.fromTo(
        p2ContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.025, ease: "power2.out" },
        0.265
      );
      // Stable hold 0.29 – 0.485 (~105vh physical distance)
      timeline.to(
        p2ContainerRef.current,
        { opacity: 0, duration: 0.025, ease: "power2.in" },
        0.49
      );
    }

    // ==========================================
    // 03 / NESTIQ (0.51 – 0.75 / ~130vh total)
    // ==========================================
    if (p3ContainerRef.current) {
      timeline.fromTo(
        p3ContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.025, ease: "power2.out" },
        0.505
      );
      // Stable hold 0.53 – 0.725 (~105vh physical distance)
      timeline.to(
        p3ContainerRef.current,
        { opacity: 0, duration: 0.025, ease: "power2.in" },
        0.73
      );
    }

    // ==========================================
    // 05 / ENTIREFM (0.75 – 0.99 / ~130vh total)
    // ==========================================
    if (p4ContainerRef.current) {
      timeline.fromTo(
        p4ContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.025, ease: "power2.out" },
        0.745
      );
      // Stable hold 0.77 – 0.965 (~105vh physical distance)
      timeline.to(
        p4ContainerRef.current,
        { opacity: 0, duration: 0.025, ease: "power2.in" },
        0.97
      );
    }
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
          Selected Work Showcase — Alkota Bikes, CareerOS, NestIQ, EntireFM
        </h2>

        {/* 001 / ALKOTA */}
        <HomepageProjectFeature
          project={HOMEPAGE_FEATURED_PROJECTS[0]}
          containerRef={p1ContainerRef}
          mediaInnerRef={p1MediaRef}
          secondaryMediaRef={p1SecondaryRef}
          isPrimaryPriority={true}
        />

        {/* 002 / CAREEROS */}
        <HomepageProjectFeature
          project={HOMEPAGE_FEATURED_PROJECTS[1]}
          containerRef={p2ContainerRef}
          mediaInnerRef={p2MediaRef}
        />

        {/* 003 / NESTIQ */}
        <HomepageProjectFeature
          project={HOMEPAGE_FEATURED_PROJECTS[2]}
          containerRef={p3ContainerRef}
          mediaInnerRef={p3MediaRef}
        />

        {/* 005 / ENTIREFM */}
        <HomepageProjectFeature
          project={HOMEPAGE_FEATURED_PROJECTS[3]}
          containerRef={p4ContainerRef}
          mediaInnerRef={p4MediaRef}
        />
      </div>
    </CinematicSceneViewport>
  );
}

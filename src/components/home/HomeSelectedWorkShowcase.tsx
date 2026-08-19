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
  minHeight: "460vh",
  mobileHeight: "410svh",
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
 * Replaces the fragmented sequence of separate project mini-scenes with
 * one cohesive 4-project film-reel showcase.
 *
 * Order:
 * 1. Alkota (Client Work) — Website Takeover -> Naked Carbon Bike
 * 2. CareerOS (Avorria Venture) — Human Intelligence -> Product World
 * 3. NestIQ (Avorria Venture) — Real Estate Intelligence Interface
 * 4. EntireFM (Client Work) — Operations Backbone Infrastructure
 */
export function HomeSelectedWorkShowcase() {
  const p1ContainerRef = useRef<HTMLDivElement>(null);
  const p1MediaRef = useRef<HTMLDivElement>(null);
  const p1SecondaryRef = useRef<HTMLDivElement>(null);

  const p2ContainerRef = useRef<HTMLDivElement>(null);
  const p2MediaRef = useRef<HTMLDivElement>(null);
  const p2SecondaryRef = useRef<HTMLDivElement>(null);

  const p3ContainerRef = useRef<HTMLDivElement>(null);
  const p3MediaRef = useRef<HTMLDivElement>(null);

  const p4ContainerRef = useRef<HTMLDivElement>(null);
  const p4MediaRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    // Stage Timeline Labels
    timeline.addLabel("entry", 0);
    timeline.addLabel("alkota_site", 0.02);
    timeline.addLabel("alkota_bike", 0.16);
    timeline.addLabel("careeros", 0.28);
    timeline.addLabel("nestiq", 0.52);
    timeline.addLabel("entirefm", 0.76);
    timeline.addLabel("handoff", 0.96);

    // ==========================================
    // 01 / ALKOTA (0.00 – 0.26)
    // ==========================================
    if (p1ContainerRef.current) {
      timeline.fromTo(
        p1ContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.02
      );
      timeline.to(
        p1ContainerRef.current,
        { opacity: 0, duration: 0.04 },
        0.24
      );
    }
    if (p1SecondaryRef.current) {
      // Bike image transitions in cleanly at 0.14
      timeline.fromTo(
        p1SecondaryRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.14
      );
    }

    // ==========================================
    // 02 / CAREEROS (0.26 – 0.50)
    // ==========================================
    if (p2ContainerRef.current) {
      timeline.fromTo(
        p2ContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.26
      );
      timeline.to(
        p2ContainerRef.current,
        { opacity: 0, duration: 0.04 },
        0.48
      );
    }
    if (p2SecondaryRef.current) {
      // Product world transitions in at 0.38
      timeline.fromTo(
        p2SecondaryRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.38
      );
    }

    // ==========================================
    // 03 / NESTIQ (0.50 – 0.74)
    // ==========================================
    if (p3ContainerRef.current) {
      timeline.fromTo(
        p3ContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.50
      );
      timeline.to(
        p3ContainerRef.current,
        { opacity: 0, duration: 0.04 },
        0.72
      );
    }

    // ==========================================
    // 05 / ENTIREFM (0.74 – 0.98)
    // ==========================================
    if (p4ContainerRef.current) {
      timeline.fromTo(
        p4ContainerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.04 },
        0.74
      );
      timeline.to(
        p4ContainerRef.current,
        { opacity: 0, duration: 0.04 },
        0.96
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
        />

        {/* 002 / CAREEROS */}
        <HomepageProjectFeature
          project={HOMEPAGE_FEATURED_PROJECTS[1]}
          containerRef={p2ContainerRef}
          mediaInnerRef={p2MediaRef}
          secondaryMediaRef={p2SecondaryRef}
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

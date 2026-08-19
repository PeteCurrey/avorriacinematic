"use client";
import React from "react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { getSceneConfig } from "./registry";
import { LabHeader } from "./lab/LabHeader";
import { GenerativeExperiment } from "./lab/GenerativeExperiment";
import { VoiceExperiment } from "./lab/VoiceExperiment";
import { VisionExperiment } from "./lab/VisionExperiment";
import { Product3DExperiment } from "./lab/Product3DExperiment";
import { AgentExperiment } from "./lab/AgentExperiment";
import { DataExperiment } from "./lab/DataExperiment";
import { LabFooter } from "./lab/LabFooter";
import { LabFallback } from "./lab/LabFallback";

export function Scene14Lab() {
  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-14-lab")!;

  if (effectiveReducedMotion) {
    return (
      <section id={config.id} data-scene-id={config.id} data-scene-index="14">
        <LabFallback />
      </section>
    );
  }

  return (
    <section
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="14"
      className="relative w-full bg-avorria-black select-none border-t border-avorria-line"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Avorria Lab — Playable Experiments, R&amp;D and Future Interfaces
      </h2>

      {/* Lab Header */}
      <LabHeader />

      {/* 6 Playable Experiments in Natural Flow */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 py-16 space-y-16">
        <GenerativeExperiment />
        <VoiceExperiment />
        <VisionExperiment />
        <Product3DExperiment />
        <AgentExperiment />
        <DataExperiment />
      </div>

      {/* Lab Footer & Explore Action */}
      <LabFooter />
    </section>
  );
}

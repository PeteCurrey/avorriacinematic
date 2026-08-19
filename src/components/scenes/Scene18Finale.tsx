"use client";
import React, { useRef } from "react";
import { FinaleSignal } from "./finale/FinaleSignal";
import { FinaleQuestion } from "./finale/FinaleQuestion";
import { FinaleProposition } from "./finale/FinaleProposition";
import { FinaleActions } from "./finale/FinaleActions";
import { FinaleFallback } from "./finale/FinaleFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { SceneSafeFrame } from "./SceneSafeFrame";
import { getSceneConfig } from "./registry";

/**
 * SCENE 18 — FINALE
 *
 * READABILITY & INTERACTION TIMING:
 * - 0.00 – 0.15: Signal & Question reveal
 * - 0.15 – 0.35: Proposition resolves
 * - 0.35 – 0.95: SUBSTANTIAL STABLE INTERACTION HOLD (60% stable hold for CTAs and email)
 */
export function Scene18Finale() {
  const config = getSceneConfig("scene-18-finale")!;

  const signalLineRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const propositionRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("signal", 0.04);
    timeline.addLabel("question", 0.12);
    timeline.addLabel("proposition", 0.22);
    timeline.addLabel("actions", 0.32);
    timeline.addLabel("hold", 0.35);

    if (signalLineRef.current) {
      timeline.fromTo(
        signalLineRef.current,
        { width: "0%", opacity: 0 },
        { width: "100%", opacity: 1, duration: 0.08 },
        0.04
      );
    }

    if (questionRef.current) {
      timeline.fromTo(
        questionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.12
      );
    }

    if (propositionRef.current) {
      timeline.fromTo(
        propositionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.22
      );
    }

    // Actions CTA arrives early at 0.32 and holds stable through 1.00
    if (actionsRef.current) {
      timeline.fromTo(
        actionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.32
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={18}
      fallback={<FinaleFallback />}
      buildTimeline={buildTimeline}
    >
      <SceneSafeFrame>
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">
          Start a Project — Connect with Avorria Engineering Studio
        </h2>

        {/* Top Minimal Scene Marker */}
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet z-30">
          <span className="text-avorria-signal">18 / FINALE</span>
          <span className="text-avorria-white">ENGAGEMENT</span>
        </div>

        {/* Phase A: Signal Point */}
        <FinaleSignal lineRef={signalLineRef} />

        {/* Phase B: Question & Proposition */}
        <div className="flex flex-col gap-6 my-auto max-w-4xl">
          <FinaleQuestion containerRef={questionRef} />
          <FinaleProposition containerRef={propositionRef} />
        </div>

        {/* Phase C: Interaction CTA & Direct Contact */}
        <FinaleActions containerRef={actionsRef} />
      </SceneSafeFrame>
    </CinematicSceneViewport>
  );
}

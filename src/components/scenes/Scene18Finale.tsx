"use client";
import React, { useRef } from "react";
import { getSceneConfig } from "./registry";
import { FinaleSignal } from "./finale/FinaleSignal";
import { FinaleQuestion } from "./finale/FinaleQuestion";
import { FinaleProposition } from "./finale/FinaleProposition";
import { FinaleActions } from "./finale/FinaleActions";
import { FinaleFallback } from "./finale/FinaleFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";

export function Scene18Finale() {
  const config = getSceneConfig("scene-18-finale")!;

  const signalLineRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const propositionRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("signal", 0.08);
    timeline.addLabel("question", 0.28);
    timeline.addLabel("proposition", 0.50);
    timeline.addLabel("actions", 0.74);
    timeline.addLabel("hold", 0.88);

    // 0.08 - 0.28: Signal Line draws right to left
    if (signalLineRef.current) {
      timeline.fromTo(
        signalLineRef.current,
        { width: "0%" },
        { width: "100%", duration: 0.20 },
        0.08
      );
    }

    // 0.28 - 0.50: Conversational Question (Triggered feel, Lands & Holds)
    if (questionRef.current) {
      timeline.fromTo(
        questionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.10 },
        0.28
      );
    }

    // 0.50 - 0.74: Monumental Proposition (BUILD SOMETHING REMARKABLE)
    if (propositionRef.current) {
      timeline.fromTo(
        propositionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.12 },
        0.50
      );
    }

    // 0.74 - 1.00: Primary Action & Contact (Remains stationary and fully clickable)
    if (actionsRef.current) {
      timeline.fromTo(
        actionsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.10 },
        0.74
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
      <div className="w-full h-full relative bg-avorria-black select-none overflow-hidden border-t border-avorria-line">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">
          Finale — Start a Project with Avorria
        </h2>

        {/* 01. Signal Callback Line */}
        <FinaleSignal lineRef={signalLineRef} />

        {/* 02. Conversational Question */}
        <FinaleQuestion containerRef={questionRef} />

        {/* 03. Monumental Proposition */}
        <FinaleProposition containerRef={propositionRef} />

        {/* 04. Primary Action & Contact */}
        <FinaleActions containerRef={actionsRef} />
      </div>
    </CinematicSceneViewport>
  );
}

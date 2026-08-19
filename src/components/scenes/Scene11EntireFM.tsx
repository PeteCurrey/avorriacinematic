"use client";
import React, { useRef } from "react";
import { EntireFMContextStage } from "./entirefm/EntireFMContextStage";
import { EntireFMWorkOrderStage } from "./entirefm/EntireFMWorkOrderStage";
import { EntireFMFieldStage } from "./entirefm/EntireFMFieldStage";
import { EntireFMStatementStage } from "./entirefm/EntireFMStatementStage";
import { EntireFMFallback } from "./entirefm/EntireFMFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";

export function Scene11EntireFM() {
  const config = getSceneConfig("scene-11-entirefm")!;

  const contextRef = useRef<HTMLDivElement>(null);
  const workOrderRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const footerMarkerRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("context", 0.08);
    timeline.addLabel("work_order", 0.32);
    timeline.addLabel("field", 0.54);
    timeline.addLabel("statement", 0.78);
    timeline.addLabel("handoff", 0.94);

    // 0.00 - 0.30: Context Stage (Move -> Land -> Hold -> Exit)
    if (contextRef.current) {
      timeline.fromTo(
        contextRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.08 },
        0
      );
      // Hold 0.08 - 0.22
      timeline.to(
        contextRef.current,
        { opacity: 0, duration: 0.06 },
        0.28
      );
    }

    // 0.30 - 0.52: Work Order & Dispatch
    if (workOrderRef.current) {
      timeline.fromTo(
        workOrderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.30
      );
      // Hold 0.36 - 0.44
      timeline.to(
        workOrderRef.current,
        { opacity: 0, duration: 0.06 },
        0.50
      );
    }

    // 0.52 - 0.76: Mobile Field Execution
    if (fieldRef.current) {
      timeline.fromTo(
        fieldRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.06 },
        0.52
      );
      // Hold 0.58 - 0.68
      timeline.to(
        fieldRef.current,
        { opacity: 0, duration: 0.06 },
        0.74
      );
    }

    // 0.76 - 0.98: EntireFM Statement & Scope
    if (statementRef.current) {
      timeline.fromTo(
        statementRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.06 },
        0.76
      );
      timeline.to(
        statementRef.current,
        { opacity: 0, y: -15, duration: 0.04 },
        0.96
      );
    }

    // 0.94 - 1.00: Footer Handoff
    if (footerMarkerRef.current) {
      timeline.fromTo(
        footerMarkerRef.current,
        { opacity: 0.4 },
        { opacity: 1, duration: 0.06 },
        0.94
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={11}
      fallback={<EntireFMFallback />}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full relative overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">
          EntireFM — Facilities Operations Platform engineered by Avorria
        </h2>

        {/* Top Minimal Scene Marker */}
        <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet p-6 sm:p-12 lg:p-16">
          <span className="text-avorria-signal">005 / ENTIREFM</span>
          <span className="text-avorria-white">OPERATIONAL WORKFLOW // 11</span>
        </div>

        {/* Chapters 1 & 2: Systems Handoff & Hierarchy */}
        <EntireFMContextStage containerRef={contextRef} />

        {/* Chapters 3 & 4: Fault Arrival & Work Order Interface */}
        <EntireFMWorkOrderStage containerRef={workOrderRef} />

        {/* Chapters 5 & 6: Field Execution */}
        <EntireFMFieldStage containerRef={fieldRef} />

        {/* Chapters 8 & 9: EntireFM Statement & Selected Work Handoff */}
        <EntireFMStatementStage containerRef={statementRef} />

        {/* Bottom Handoff Anchor for Scene 12 (Selected Work) */}
        <div
          ref={footerMarkerRef}
          className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest p-6 sm:p-12 lg:p-16"
        >
          <div className="text-avorria-white">
            PORTFOLIO // SELECTED WORK
          </div>
          <div className="text-avorria-signal">
            11 / 18
          </div>
        </div>
      </div>
    </CinematicSceneViewport>
  );
}

"use client";
import React from "react";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { EntireFMContextStage } from "./entirefm/EntireFMContextStage";
import { EntireFMWorkOrderStage } from "./entirefm/EntireFMWorkOrderStage";
import { EntireFMFieldStage } from "./entirefm/EntireFMFieldStage";
import { EntireFMHistoryStage } from "./entirefm/EntireFMHistoryStage";
import { EntireFMStatementStage } from "./entirefm/EntireFMStatementStage";
import { EntireFMFallback } from "./entirefm/EntireFMFallback";
import { getSceneConfig } from "./registry";

export function Scene11EntireFM() {
  const config = getSceneConfig("scene-11-entirefm")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={11}
      fallback={<EntireFMFallback />}
    >
      {(progress) => (
        <>
          {/* Semantic Accessibility Heading */}
          <h2 className="sr-only">
            EntireFM — Facilities Operations Platform engineered by Avorria
          </h2>

          {/* Top Minimal Scene Marker */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet p-6 sm:p-12 lg:p-16">
            <span className="text-avorria-signal">011 / ENTIREFM</span>
            <span className="text-avorria-white">OPERATIONAL WORKFLOW // 11</span>
          </div>

          {/* Chapters 1 & 2: Systems Handoff & Location/Asset Hierarchy */}
          <EntireFMContextStage progress={progress} />

          {/* Chapters 3 & 4: Fault Arrival & Work Order Interface */}
          <EntireFMWorkOrderStage progress={progress} />

          {/* Chapters 5 & 6: Field Execution & Completion Simulation */}
          <EntireFMFieldStage progress={progress} />

          {/* Chapter 7: Closed Operational Record & Asset History */}
          <EntireFMHistoryStage progress={progress} />

          {/* Chapters 8 & 9: EntireFM Statement & Selected Work Handoff */}
          <EntireFMStatementStage progress={progress} />

          {/* Bottom Handoff Anchor for Scene 12 (Selected Work) */}
          <div className="absolute bottom-0 inset-x-0 z-30 flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-[10px] sm:text-xs text-avorria-quiet uppercase tracking-widest p-6 sm:p-12 lg:p-16">
            <div className="text-avorria-white">
              {progress >= 0.94 ? "PORTFOLIO // SELECTED WORK" : "OPERATIONS SHOULD FLOW"}
            </div>
            <div className="text-avorria-signal">
              11 / 18
            </div>
          </div>
        </>
      )}
    </CinematicSceneViewport>
  );
}

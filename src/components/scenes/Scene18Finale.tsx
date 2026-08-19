"use client";
import React from "react";
import { getSceneConfig } from "./registry";
import { FinaleSignal } from "./finale/FinaleSignal";
import { FinaleQuestion } from "./finale/FinaleQuestion";
import { FinaleProposition } from "./finale/FinaleProposition";
import { FinaleActions } from "./finale/FinaleActions";
import { FinaleFallback } from "./finale/FinaleFallback";
import { CinematicSceneViewport } from "./CinematicSceneViewport";

export function Scene18Finale() {
  const config = getSceneConfig("scene-18-finale")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={18}
      fallback={<FinaleFallback />}
    >
      {(progress) => (
        <div className="w-full h-full relative bg-avorria-black select-none overflow-hidden border-t border-avorria-line">
          {/* Semantic Accessibility Heading */}
          <h2 className="sr-only">
            Finale — Start a Project with Avorria
          </h2>

          {/* 01. Signal Callback Line */}
          <FinaleSignal progress={progress} />

          {/* 02. Conversational Question */}
          <FinaleQuestion progress={progress} />

          {/* 03. Monumental Proposition */}
          <FinaleProposition progress={progress} />

          {/* 04. Primary Action & Contact */}
          <FinaleActions progress={progress} />
        </div>
      )}
    </CinematicSceneViewport>
  );
}

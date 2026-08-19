"use client";
import React from "react";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";
import { OGNFallback } from "./ogn/OGNFallback";

export function Scene13OGN() {
  const config = getSceneConfig("scene-13-ogn")!;

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={13}
      fallback={<OGNFallback />}
    >
      {(progress) => {
        const titleOpacity = progress < 0.15 ? progress / 0.15 : progress < 0.85 ? 1 : Math.max(0, 1 - (progress - 0.85) / 0.1);
        const titleY = progress < 0.15 ? (1 - progress / 0.15) * 20 : 0;

        return (
          <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-6 sm:p-12 lg:p-16">
            {/* Semantic Accessibility Heading */}
            <h2 className="sr-only">
              One Great Northern — Industrial Crane Hire, Lifting and Infrastructure
            </h2>

            <div
              className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
              style={{
                opacity: titleOpacity,
                transform: `translateY(${titleY}px)`,
                transition: "transform 0.1s ease-out, opacity 0.1s ease-out"
              }}
            >
              <div className="lg:col-span-8 flex flex-col gap-6">
                <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
                  006 // ONE GREAT NORTHERN // INDUSTRIAL INFRASTRUCTURE
                </div>
                <h3 className="font-display font-black text-4xl sm:text-7xl uppercase tracking-tight text-avorria-white leading-none whitespace-pre-line">
                  ONE GREAT NORTHERN<br />INDUSTRIAL OPERATIONS<span className="text-avorria-signal">.</span>
                </h3>
                <p className="font-body text-base sm:text-lg text-avorria-muted leading-relaxed max-w-xl">
                  Mobile crane hire, contract lifting, plant equipment, and industrial infrastructure services.
                </p>
                <div className="pt-4 flex items-center gap-4">
                  <span className="font-mono text-xs uppercase text-avorria-quiet border border-avorria-line px-3 py-1.5">
                    SOURCE MEDIA: PENDING VERIFICATION
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col gap-4 font-mono text-xs text-avorria-quiet border-l border-avorria-line/40 pl-8">
                <span className="text-avorria-signal uppercase">SECTOR TRUTH</span>
                <span className="text-avorria-white">CRANE HIRE &amp; CONTRACT LIFTING</span>
                <span className="text-avorria-muted">PLANT &amp; ACCESS EQUIPMENT</span>
                <span className="text-avorria-muted">CIVILS &amp; INDUSTRIAL WORK</span>
              </div>
            </div>
          </div>
        );
      }}
    </CinematicSceneViewport>
  );
}

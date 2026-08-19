"use client";
import React, { useRef } from "react";
import { CinematicSceneViewport } from "./CinematicSceneViewport";
import { getSceneConfig } from "./registry";
import { OGNFallback } from "./ogn/OGNFallback";

export function Scene13OGN() {
  const config = getSceneConfig("scene-13-ogn")!;

  const contentRef = useRef<HTMLDivElement>(null);

  const buildTimeline = (timeline: gsap.core.Timeline) => {
    timeline.addLabel("entry", 0);
    timeline.addLabel("settle", 0.15);
    timeline.addLabel("hold", 0.50);
    timeline.addLabel("exit", 0.85);

    if (contentRef.current) {
      timeline.fromTo(
        contentRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.15 },
        0
      );
      // Hold 0.15 - 0.82
      timeline.to(
        contentRef.current,
        { opacity: 0, y: -20, duration: 0.12 },
        0.85
      );
    }
  };

  return (
    <CinematicSceneViewport
      config={config}
      sceneIndex={13}
      fallback={<OGNFallback />}
      buildTimeline={buildTimeline}
    >
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center p-6 sm:p-12 lg:p-16">
        {/* Semantic Accessibility Heading */}
        <h2 className="sr-only">
          One Great Northern — Industrial Crane Hire, Lifting and Infrastructure
        </h2>

        <div
          ref={contentRef}
          className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center opacity-0"
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
    </CinematicSceneViewport>
  );
}

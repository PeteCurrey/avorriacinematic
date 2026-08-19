import React from "react";
import { OGN_ANALYSIS_TAGS } from "@/lib/scenes/ogn-scene-config";

interface OGNStructureStageProps {
  opacity: number;
}

export function OGNStructureStage({ opacity }: OGNStructureStageProps) {
  if (opacity <= 0.01) return null;
  return (
    <div
      className="absolute inset-0 pointer-events-none z-25 flex items-center justify-center p-4 sm:p-12 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="relative w-full max-w-[1320px] aspect-[16/10]">
        {OGN_ANALYSIS_TAGS.map((tag) => (
          <div
            key={tag.id}
            style={{ left: tag.x, top: tag.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-3 bg-avorria-black/95 border border-avorria-signal font-mono text-xs space-y-1 shadow-lg max-w-[240px] animate-fadeIn"
          >
            <div className="text-avorria-signal font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal animate-pulse" />
              <span>{tag.label}</span>
            </div>
            <div className="text-avorria-muted text-[10px] leading-relaxed">
              {tag.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

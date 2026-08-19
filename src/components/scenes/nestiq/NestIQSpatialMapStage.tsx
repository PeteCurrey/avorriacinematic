import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface NestIQSpatialMapStageProps {
  progress: number; // 0.0 to 1.0
}

export function NestIQSpatialMapStage({ progress }: NestIQSpatialMapStageProps) {
  // Active between 0.40 and 0.82
  if (progress < 0.39 || progress > 0.83) return null;

  // Map zoom and pitch tilt (0.42 -> 0.76)
  const opacity = progress < 0.48 ? (progress - 0.39) / 0.09 : progress < 0.74 ? 1.0 : Math.max(0, 1.0 - (progress - 0.74) / 0.08);
  const pitchT = Math.min(1, Math.max(0, (progress - 0.50) / 0.22));
  const pitchDeg = pitchT * 28;
  const scale = 1.0 + (pitchT * 0.12);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ opacity, perspective: "1400px", zIndex: Z.media }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-75"
        style={{
          transform: `rotateX(${pitchDeg}deg) scale(${scale})`,
          transformOrigin: "50% 60%"
        }}
      >
        <Image
          src="/media/projects/nestiq/interface/agent-dashboard-preview.png"
          alt="NestIQ Spatial Property Intelligence"
          fill
          className="object-cover object-center"
        />

        {/* 3D Vertical Layer Annotation Callout at Peak */}
        {pitchT > 0.5 && (
          <div
            className="absolute top-8 left-8 sm:left-16 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet"
            style={{ zIndex: Z.instrumentation }}
          >
            <span className="w-2 h-2 rounded-full bg-avorria-signal animate-pulse" />
            <span className="text-avorria-signal">DATA BECOMES SPACE</span>
            <span>{"//"}</span>
            <span className="text-avorria-white">3D MARKET INTELLIGENCE LANDSCAPE</span>
          </div>
        )}
      </div>
    </div>
  );
}

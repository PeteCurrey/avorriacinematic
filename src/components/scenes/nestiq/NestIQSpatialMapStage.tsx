import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface NestIQSpatialMapStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  innerRef?: React.RefObject<HTMLDivElement | null>;
  annotationRef?: React.RefObject<HTMLDivElement | null>;
}

export function NestIQSpatialMapStage({
  containerRef,
  innerRef,
  annotationRef,
}: NestIQSpatialMapStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-0"
      style={{ perspective: "1400px", zIndex: Z.media }}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="absolute inset-0 w-full h-full"
        style={{
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
        <div
          ref={annotationRef}
          className="absolute top-8 left-8 sm:left-16 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet opacity-0"
          style={{ zIndex: Z.instrumentation }}
        >
          <span className="w-2 h-2 rounded-full bg-avorria-signal animate-pulse" />
          <span className="text-avorria-signal">DATA BECOMES SPACE</span>
          <span>{"//"}</span>
          <span className="text-avorria-white">3D MARKET INTELLIGENCE LANDSCAPE</span>
        </div>
      </div>
    </div>
  );
}

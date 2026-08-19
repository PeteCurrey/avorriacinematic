import React from "react";
import { Z } from "@/lib/scene-z";

interface NestIQContextStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  lineRef?: React.RefObject<HTMLDivElement | null>;
}

export function NestIQContextStage({
  containerRef,
  lineRef,
}: NestIQContextStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex flex-col justify-center max-w-[1760px] mx-auto px-6 sm:px-12 pointer-events-none opacity-0"
      style={{ zIndex: Z.copy }}
      aria-hidden="true"
    >
      <div className="max-w-md flex flex-col gap-4 bg-avorria-black/85 border border-avorria-line p-6 backdrop-blur-md">
        <div className="flex items-center justify-between font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet border-b border-avorria-line/40 pb-2">
          <span className="text-avorria-signal">003 / NESTIQ</span>
          <span>SPATIAL CONTEXT ENGINE</span>
        </div>

        <div className="space-y-3 font-mono text-xs text-avorria-white">
          <div className="flex justify-between py-1.5 border-b border-avorria-line/30">
            <span className="text-avorria-quiet">DATA MODEL</span>
            <span>GEOSPATIAL VECTOR MAP</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-avorria-line/30">
            <span className="text-avorria-quiet">INTELLIGENCE</span>
            <span>MULTI-LAYER MARKET AGENT</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-avorria-line/30">
            <span className="text-avorria-quiet">INDEX STRUCTURE</span>
            <span className="text-avorria-signal">TOPOLOGICAL CADASTRAL LAYER</span>
          </div>
        </div>

        {/* Fine Connecting Signal Rule extending to map */}
        <div className="w-full h-0.5 bg-avorria-line relative overflow-hidden mt-2">
          <div
            ref={lineRef}
            className="absolute inset-y-0 left-0 bg-avorria-signal"
            style={{ width: "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

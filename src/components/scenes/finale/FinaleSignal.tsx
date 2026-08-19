import React from "react";
import { Z } from "@/lib/scene-z";

interface FinaleSignalProps {
  lineRef?: React.RefObject<HTMLDivElement | null>;
}

export function FinaleSignal({ lineRef }: FinaleSignalProps) {
  return (
    <div
      className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-6 sm:px-16 pointer-events-none select-none"
      style={{ zIndex: Z.background }}
    >
      <div className="max-w-[1760px] mx-auto relative h-[1px] bg-avorria-line/40 overflow-hidden">
        <div
          ref={lineRef}
          className="absolute top-0 right-0 h-full bg-avorria-signal shadow-[0_0_8px_rgba(200,241,53,0.6)]"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}

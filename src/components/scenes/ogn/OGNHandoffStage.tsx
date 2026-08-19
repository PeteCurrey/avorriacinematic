import React from "react";

interface OGNHandoffStageProps {
  opacity: number;
}

export function OGNHandoffStage({ opacity }: OGNHandoffStageProps) {
  if (opacity <= 0.01) return null;
  return (
    <div
      className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 sm:p-16 z-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
        013 / ONE GREAT NORTHERN <span>{"//"}</span> TRANSFORMATION
      </div>
      <div className="max-w-xl">
        <span className="font-mono text-xs text-avorria-quiet uppercase tracking-wider block mb-2">
          CASE STUDY // DIGITAL TRANSFORMATION
        </span>
        <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase text-avorria-white tracking-tight">
          One Great Northern
        </h3>
      </div>
    </div>
  );
}

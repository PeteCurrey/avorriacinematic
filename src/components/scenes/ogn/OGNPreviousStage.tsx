import React from "react";
import Image from "next/image";

interface OGNPreviousStageProps {
  opacity: number;
}

export function OGNPreviousStage({ opacity }: OGNPreviousStageProps) {
  if (opacity <= 0.01) return null;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-12 z-10 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="relative w-full max-w-[1320px] aspect-[16/10] bg-avorria-surface border border-avorria-line overflow-hidden shadow-2xl">
        <Image
          src="/media/projects/ogn/ogn-industrial.svg"
          alt="One Great Northern previous digital experience"
          fill
          className="object-contain"
        />
        <div className="absolute bottom-4 left-4 bg-avorria-black/90 border border-avorria-line px-3 py-1 font-mono text-[10px] uppercase text-avorria-muted tracking-wider">
          PREVIOUS DIGITAL EXPERIENCE // PRIOR STATE
        </div>
      </div>
    </div>
  );
}

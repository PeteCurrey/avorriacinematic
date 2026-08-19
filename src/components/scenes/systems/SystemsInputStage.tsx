import React from "react";
import Image from "next/image";

interface SystemsInputStageProps {
  progress: number; // 0.0 to 1.0
}

export function SystemsInputStage({ progress }: SystemsInputStageProps) {
  // Active between 0.00 and 0.40
  if (progress > 0.42) return null;

  const opacity = progress < 0.08 ? progress / 0.08 : progress < 0.32 ? 1.0 : Math.max(0, 1.0 - (progress - 0.32) / 0.08);
  const scale = 1.0 + (progress * 0.05);

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-12 z-10 pointer-events-none transition-opacity duration-150"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="relative w-full max-w-[1300px] h-[75vh] border border-avorria-line bg-avorria-surface overflow-hidden shadow-2xl transition-transform duration-75"
        style={{ transform: `scale(${scale})` }}
      >
        <Image
          src="/media/projects/systems/systems-architecture-hero.svg"
          alt="Systems Operational Architecture Diagram"
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}

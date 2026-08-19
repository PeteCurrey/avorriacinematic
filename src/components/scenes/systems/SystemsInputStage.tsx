import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

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
      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-150 overflow-hidden"
      style={{ opacity, zIndex: Z.media }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-75"
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

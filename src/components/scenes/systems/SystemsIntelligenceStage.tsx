import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface SystemsIntelligenceStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function SystemsIntelligenceStage({
  containerRef,
}: SystemsIntelligenceStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-0"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      <Image
        src="/media/projects/systems/systems-architecture-hero.svg"
        alt="Systems Rules and Context Diagram"
        fill
        className="object-contain object-center scale-105"
      />
    </div>
  );
}

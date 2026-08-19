import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface CareerOpportunityStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function CareerOpportunityStage({
  containerRef,
}: CareerOpportunityStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      <Image
        src="/media/projects/careeros/hero/hero_career_world_mobile.jpg"
        alt="CareerOS Opportunity Architecture"
        fill
        className="object-cover"
      />
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface CareerOSWorldStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function CareerOSWorldStage({
  containerRef,
}: CareerOSWorldStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-0"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      <Image
        src="/media/projects/careeros/hero/hero_career_world_desktop.jpg"
        alt="CareerOS platform — career world desktop"
        fill
        className="object-cover"
      />
      {/* Gradient fade at bottom for text safety */}
      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-avorria-black to-transparent" />
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { stageOpacity, stageMounted } from "@/lib/scene-stages";
import { Z } from "@/lib/scene-z";

interface CareerOSWorldStageProps {
  progress: number;
}

export function CareerOSWorldStage({ progress }: CareerOSWorldStageProps) {
  // Active 0.38–0.62
  if (!stageMounted(progress, 0.38, 0.62)) return null;
  const opacity = stageOpacity(progress, 0.38, 0.46, 0.54, 0.62);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity, zIndex: Z.media }}
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

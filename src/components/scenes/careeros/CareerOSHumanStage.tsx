import React from "react";
import { CinematicMediaFrame } from "@/components/cinematic/CinematicMediaFrame";

interface CareerOSHumanStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  imageRef?: React.RefObject<HTMLDivElement | null>;
}

export function CareerOSHumanStage({
  containerRef,
  imageRef,
}: CareerOSHumanStageProps) {
  return (
    <CinematicMediaFrame
      src="/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg"
      alt="CareerOS Human Intelligence Portrait"
      mode="PORTRAIT_SPLIT"
      fit="cover"
      desktopFocal={{ x: 50, y: 35 }}
      mobileFocal={{ x: 50, y: 30 }}
      priority
      containerRef={containerRef}
      innerRef={imageRef}
      className="!justify-end !items-center"
    />
  );
}

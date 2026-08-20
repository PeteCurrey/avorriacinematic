import React from "react";
import { CinematicMediaFrame } from "@/components/cinematic/CinematicMediaFrame";

interface EntireFMContextStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function EntireFMContextStage({
  containerRef,
}: EntireFMContextStageProps) {
  return (
    <CinematicMediaFrame
      src="/media/projects/entirefm/entirefm-asset-hierarchy.svg"
      alt="EntireFM Operations Backbone Infrastructure"
      mode="LANDSCAPE"
      fit="contain"
      desktopFocal={{ x: 50, y: 50 }}
      containerRef={containerRef}
    />
  );
}

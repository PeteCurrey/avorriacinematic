import React from "react";
import Image from "next/image";

interface CareerOpportunityStageProps {
  progress: number; // 0.0 to 1.0
}

export function CareerOpportunityStage({ progress }: CareerOpportunityStageProps) {
  // Active between 0.48 and 0.70
  if (progress < 0.47 || progress > 0.72) return null;

  const opacity = progress < 0.54 ? (progress - 0.47) / 0.07 : progress < 0.65 ? 1.0 : Math.max(0, 1.0 - (progress - 0.65) / 0.06);

  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-4 sm:p-12 z-20 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="w-full max-w-[1560px] h-[80vh] relative border border-avorria-line bg-avorria-black/90 overflow-hidden">
        <Image
          src="/media/projects/careeros/careeros-ui-preview.svg"
          alt="CareerOS Opportunity Landscape"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

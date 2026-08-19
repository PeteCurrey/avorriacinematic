import React from "react";
import Image from "next/image";

interface EntireFMWorkOrderStageProps {
  progress: number; // 0.0 to 1.0
}

export function EntireFMWorkOrderStage({ progress }: EntireFMWorkOrderStageProps) {
  // Active between 0.26 and 0.62
  if (progress < 0.24 || progress > 0.64) return null;

  const opacity = progress < 0.32 ? (progress - 0.24) / 0.08 : progress < 0.54 ? 1.0 : Math.max(0, 1.0 - (progress - 0.54) / 0.08);

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-10 z-20 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="w-full max-w-[1300px] h-[75vh] relative border border-avorria-line bg-avorria-surface shadow-2xl overflow-hidden">
        <Image
          src="/media/projects/entirefm/entirefm-operational.svg"
          alt="EntireFM Facilities Operations System"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}

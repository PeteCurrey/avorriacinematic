import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface CareerOSHumanStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  imageRef?: React.RefObject<HTMLDivElement | null>;
}

export function CareerOSHumanStage({
  containerRef,
  imageRef,
}: CareerOSHumanStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full flex justify-end items-center pointer-events-none opacity-0"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      {/* Human Portrait Layer (Right-Aligned 45-50% width on Desktop) */}
      <div
        ref={imageRef}
        className="w-full sm:w-[50vw] max-w-[850px] h-full relative flex items-center justify-center"
      >
        <Image
          src="/media/projects/careeros/hero/woman_looking_into_camera_lens.jpeg"
          alt="CareerOS Human Portrait"
          fill
          priority
          className="object-contain object-right sm:object-center"
        />
      </div>
    </div>
  );
}

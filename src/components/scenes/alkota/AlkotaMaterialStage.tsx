import React from "react";
import Image from "next/image";
import { Z } from "@/lib/scene-z";

interface AlkotaMaterialStageProps {
  macroRef?: React.RefObject<HTMLDivElement | null>;
  kinematicsRef?: React.RefObject<HTMLDivElement | null>;
  annotationRef?: React.RefObject<HTMLDivElement | null>;
}

export function AlkotaMaterialStage({
  macroRef,
  kinematicsRef,
  annotationRef,
}: AlkotaMaterialStageProps) {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      {/* Material Macro Layer - Carbon Fiber Layup */}
      <div
        ref={macroRef}
        className="absolute inset-0 w-full h-full opacity-0"
      >
        <Image
          src="/media/projects/alkota/engineering/carbon-layup.jpg"
          alt="Alkota Carbon Fiber Layup Development"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Engineering Kinematics Layer */}
      <div
        ref={kinematicsRef}
        className="absolute inset-0 w-full h-full opacity-0"
      >
        <Image
          src="/media/projects/alkota/engineering/kinematics.jpg"
          alt="Alkota Kinematic Dynamics Analysis"
          fill
          className="object-cover"
        />
      </div>

      {/* Precision Annotation Callouts */}
      <div
        ref={annotationRef}
        className="absolute top-24 left-6 sm:left-16 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet opacity-0"
        style={{ zIndex: Z.instrumentation }}
      >
        <span className="text-avorria-signal">001 / ALKOTA BIKES</span>
        <span className="mx-2 text-avorria-line-strong">{"//"}</span>
        <span className="text-avorria-white">CARBON CHASSIS &amp; KINEMATICS</span>
      </div>
    </div>
  );
}

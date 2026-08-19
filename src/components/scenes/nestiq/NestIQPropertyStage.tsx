import React from "react";
import Image from "next/image";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface NestIQPropertyStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  imageRef?: React.RefObject<HTMLDivElement | null>;
}

export function NestIQPropertyStage({
  containerRef,
  imageRef,
}: NestIQPropertyStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden opacity-0"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      <CursorTrigger state="try" label="CONTEXT">
        <div
          ref={imageRef}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/media/projects/nestiq/interface/agent-dashboard-preview.png"
            alt="NestIQ Agent Intelligence Interface"
            fill
            priority
            className="object-cover object-top"
          />
        </div>
      </CursorTrigger>
    </div>
  );
}

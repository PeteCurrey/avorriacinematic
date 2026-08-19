"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { DRAWDOWN_MODULES } from "@/lib/scenes/drawdown-scene-config";
import { Z } from "@/lib/scene-z";

interface DrawdownInterfaceStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  unifiedRef?: React.RefObject<HTMLDivElement | null>;
  modulesContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export function DrawdownInterfaceStage({
  containerRef,
  unifiedRef,
  modulesContainerRef,
}: DrawdownInterfaceStageProps) {
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-0"
      style={{ perspective: "1400px", zIndex: Z.media }}
      aria-hidden="true"
    >
      {/* 1. Full Unified Interface View */}
      <div
        ref={unifiedRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center p-6 sm:p-12"
      >
        <div className="relative w-full max-w-[min(86vw,1380px)] h-[min(70dvh,800px)] overflow-hidden">
          <Image
            src="/media/projects/drawdown/interface/dashboard.png"
            alt="Drawdown Platform Interface"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* 2. Decomposed 3D Functional Modules */}
      <div
        ref={modulesContainerRef}
        className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0"
      >
        {DRAWDOWN_MODULES.map((mod) => (
          <div
            key={mod.id}
            className="absolute w-[min(86vw,1380px)] h-[min(70dvh,800px)] overflow-hidden"
            style={{
              transform: `translateZ(${mod.zDepth}px) rotateY(${mod.yawDeg}deg)`,
              opacity: mod.id === "market" ? 1.0 : 0.9,
            }}
          >
            <Image
              src={mod.svgPath}
              alt={mod.title}
              fill
              className="object-contain"
            />
            <div
              className="absolute top-4 left-4 font-mono text-[10px] uppercase text-avorria-quiet flex items-center gap-2"
              style={{ zIndex: Z.instrumentation }}
            >
              <span className="text-avorria-signal">{mod.code}</span>
              <span className="text-avorria-white">{mod.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

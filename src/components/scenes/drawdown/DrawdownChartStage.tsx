import React, { useState } from "react";
import Image from "next/image";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface DrawdownChartStageProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  imageRef?: React.RefObject<HTMLDivElement | null>;
}

export function DrawdownChartStage({
  containerRef,
  imageRef,
}: DrawdownChartStageProps) {
  const [crosshairPos, setCrosshairPos] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCrosshairPos({ x, y, active: true });
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden opacity-0"
      style={{ zIndex: Z.media }}
      aria-hidden="true"
    >
      <CursorTrigger state="try" label="INSPECT">
        <div
          ref={imageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setCrosshairPos((p) => ({ ...p, active: false }))}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/media/projects/drawdown/interface/dashboard.png"
            alt="Drawdown Market Chart Stage"
            fill
            priority
            className="object-cover"
          />

          {/* Crosshair Inspection Overlay */}
          {crosshairPos.active && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: Z.overlay }}
            >
              <div
                className="absolute top-0 bottom-0 w-px bg-avorria-signal/60"
                style={{ left: `${crosshairPos.x}%` }}
              />
              <div
                className="absolute left-0 right-0 h-px bg-avorria-signal/60"
                style={{ top: `${crosshairPos.y}%` }}
              />
              <div
                className="absolute font-mono text-[9px] text-avorria-signal bg-avorria-black/90 px-2 py-0.5 border border-avorria-signal/40 -translate-x-1/2 -translate-y-6"
                style={{ left: `${crosshairPos.x}%`, top: `${crosshairPos.y}%` }}
              >
                RISK_VAL: 0.50R
              </div>
            </div>
          )}
        </div>
      </CursorTrigger>
    </div>
  );
}

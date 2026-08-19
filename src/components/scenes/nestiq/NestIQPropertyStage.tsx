"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface NestIQPropertyStageProps {
  progress: number; // 0.0 to 1.0
}

export function NestIQPropertyStage({ progress }: NestIQPropertyStageProps) {
  const [lensPos, setLensPos] = useState({ x: 50, y: 50, active: false });

  // Active between 0.00 and 0.42
  if (progress > 0.44) return null;

  const opacity = progress < 0.08 ? progress / 0.08 : progress < 0.32 ? 1.0 : Math.max(0, 1.0 - (progress - 0.32) / 0.10);
  const scale = 1.0 + (progress * 0.08);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPos({ x, y, active: true });
  };

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-auto transition-opacity duration-150 overflow-hidden"
      style={{ opacity, zIndex: Z.media }}
      aria-hidden="true"
    >
      <CursorTrigger state="try" label="CONTEXT">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setLensPos((p) => ({ ...p, active: false }))}
          className="absolute inset-0 w-full h-full transition-transform duration-75"
          style={{ transform: `scale(${scale})` }}
        >
          <Image
            src="/media/projects/nestiq/interface/agent-dashboard-preview.png"
            alt="NestIQ Agent Intelligence Interface"
            fill
            priority
            className="object-cover object-top"
          />

          {/* Intelligence Lens Probe Circle */}
          {lensPos.active && (
            <div
              className="absolute w-32 h-32 rounded-full border border-avorria-signal/80 bg-avorria-signal/10 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-[0_0_20px_#C8F135]"
              style={{ left: `${lensPos.x}%`, top: `${lensPos.y}%`, zIndex: Z.overlay }}
            >
              <span className="font-mono text-[9px] text-avorria-signal tracking-widest uppercase bg-avorria-black/80 px-2 py-0.5 border border-avorria-signal/40">
                CONTEXT
              </span>
            </div>
          )}
        </div>
      </CursorTrigger>
    </div>
  );
}

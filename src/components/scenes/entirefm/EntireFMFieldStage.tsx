"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CursorTrigger } from "@/providers/CursorContext";

interface EntireFMFieldStageProps {
  progress: number; // 0.0 to 1.0
}

export function EntireFMFieldStage({ progress }: EntireFMFieldStageProps) {
  const [jobState, setJobState] = useState<"active" | "completed">("active");

  // Active between 0.52 and 0.82
  if (progress < 0.50 || progress > 0.84) return null;

  const opacity = progress < 0.58 ? (progress - 0.50) / 0.08 : progress < 0.76 ? 1.0 : Math.max(0, 1.0 - (progress - 0.76) / 0.06);

  return (
    <div
      className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-8 z-30 pointer-events-auto transition-opacity duration-150"
      style={{ opacity }}
      aria-hidden={progress > 0.80 ? "true" : "false"}
    >
      <div className="relative w-full max-w-[480px] h-[75vh] border border-avorria-line bg-avorria-surface shadow-2xl overflow-hidden flex flex-col justify-between p-4">
        <div className="relative w-full h-[85%] overflow-hidden">
          <Image
            src="/media/projects/entirefm/entirefm-field-mobile.svg"
            alt="EntireFM Field Technician View"
            fill
            className="object-contain"
          />
        </div>

        {/* Simulated Field Completion Trigger */}
        <div className="pt-2 border-t border-avorria-line/40 flex items-center justify-between font-mono text-xs">
          <span className="text-avorria-quiet text-[10px]">
            {jobState === "completed" ? "JOB CLOSED // AUDIT LOGGED" : "FIELD TECH: ENGINEER 04"}
          </span>
          <CursorTrigger state="try" label="COMPLETE">
            <button
              onClick={() => setJobState("completed")}
              className={`px-3 py-1.5 uppercase tracking-widest border transition-colors ${
                jobState === "completed"
                  ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal"
                  : "border-avorria-signal text-avorria-white bg-avorria-signal/10 hover:bg-avorria-signal/30"
              }`}
            >
              {jobState === "completed" ? "✓ COMPLETED" : "[COMPLETE JOB]"}
            </button>
          </CursorTrigger>
        </div>
      </div>
    </div>
  );
}

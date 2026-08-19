"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CursorTrigger } from "@/providers/CursorContext";
import { Z } from "@/lib/scene-z";

interface SystemsActionStageProps {
  progress: number; // 0.0 to 1.0
}

export function SystemsActionStage({ progress }: SystemsActionStageProps) {
  const [approvalStatus, setApprovalStatus] = useState<"pending" | "approved" | "edited">("pending");

  // Active between 0.58 and 0.88
  if (progress < 0.56 || progress > 0.89) return null;

  const opacity = progress < 0.64 ? (progress - 0.56) / 0.08 : progress < 0.82 ? 1.0 : Math.max(0, 1.0 - (progress - 0.82) / 0.06);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-auto transition-opacity duration-150 p-6 sm:p-12 lg:p-16 flex flex-col justify-between"
      style={{ opacity, zIndex: Z.media }}
      aria-hidden={progress > 0.86 ? "true" : "false"}
    >
      <div
        className="flex items-center justify-between border-b border-avorria-line/40 pb-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet"
        style={{ zIndex: Z.instrumentation }}
      >
        <span className="text-avorria-signal">HUMAN APPROVAL GATE // ACTION 01</span>
        <span className={approvalStatus === "approved" ? "text-avorria-signal font-bold" : "text-avorria-white"}>
          {approvalStatus === "approved" ? "STATUS: APPROVED & QUEUED" : "STATUS: PENDING REVIEW"}
        </span>
      </div>

      <div className="relative w-full flex-1 my-4 overflow-hidden">
        <Image
          src="/media/projects/systems/systems-email-draft.svg"
          alt="Systems Email Draft Action"
          fill
          className="object-contain object-center"
        />
      </div>

      {/* Simulated Human-in-the-Loop Approval Action Controls */}
      <div
        className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-xs"
        style={{ zIndex: Z.copy }}
      >
        <div className="text-avorria-quiet text-[11px]">
          {approvalStatus === "approved"
            ? "Simulated state: Action approved. Lead status updated to RE-ENGAGED."
            : "Simulated human review: Review generated context before execution."}
        </div>
        <div className="flex items-center gap-3">
          <CursorTrigger state="try" label="APPROVE">
            <button
              onClick={() => setApprovalStatus("approved")}
              className={`px-4 py-2 uppercase tracking-widest border transition-colors ${
                approvalStatus === "approved"
                  ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal"
                  : "border-avorria-signal text-avorria-white bg-avorria-signal/10 hover:bg-avorria-signal/30"
              }`}
            >
              {approvalStatus === "approved" ? "✓ APPROVED" : "[APPROVE ACTION]"}
            </button>
          </CursorTrigger>
        </div>
      </div>
    </div>
  );
}

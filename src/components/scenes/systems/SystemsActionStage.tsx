"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CursorTrigger } from "@/providers/CursorContext";

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
      className="absolute inset-0 w-full h-full flex items-center justify-center p-4 sm:p-12 z-20 pointer-events-auto transition-opacity duration-150"
      style={{ opacity }}
      aria-hidden={progress > 0.86 ? "true" : "false"}
    >
      <div className="relative w-full max-w-[1000px] h-[72vh] border border-avorria-line bg-avorria-surface shadow-2xl overflow-hidden flex flex-col justify-between p-6">
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-3 font-mono text-xs uppercase tracking-widest text-avorria-quiet">
          <span className="text-avorria-signal">HUMAN APPROVAL GATE // ACTION 01</span>
          <span className={approvalStatus === "approved" ? "text-avorria-signal font-bold" : "text-avorria-white"}>
            {approvalStatus === "approved" ? "STATUS: APPROVED &amp; QUEUED" : "STATUS: PENDING REVIEW"}
          </span>
        </div>

        <div className="relative w-full h-[60%] border border-avorria-line/40 overflow-hidden my-auto">
          <Image
            src="/media/projects/systems/systems-email-draft.svg"
            alt="Systems Email Draft Action"
            fill
            className="object-cover"
          />
        </div>

        {/* Simulated Human-in-the-Loop Approval Action Controls */}
        <div className="flex items-center justify-between border-t border-avorria-line/40 pt-4 font-mono text-xs">
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
    </div>
  );
}

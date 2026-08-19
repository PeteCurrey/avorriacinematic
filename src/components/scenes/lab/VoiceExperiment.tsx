"use client";
import React, { useState } from "react";
import { CursorTrigger } from "@/providers/CursorContext";

export function VoiceExperiment() {
  const [status, setStatus] = useState<string>("IDLE");
  const [lastCommand, setLastCommand] = useState<string>("NO COMMAND APPLIED");

  const simulateVoice = (cmd: string) => {
    setStatus("LISTENING...");
    setTimeout(() => {
      setStatus("RECOGNISED");
      setLastCommand(cmd);
      setTimeout(() => setStatus("APPLIED ✓"), 600);
    }, 800);
  };

  return (
    <article className="p-8 sm:p-12 border border-avorria-line bg-avorria-surface space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-avorria-line/40 pb-6">
        <div>
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-wider">02 // EXPERIMENT</span>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-avorria-white mt-1">Voice Control</h3>
          <p className="font-mono text-xs text-avorria-muted uppercase mt-0.5">Speech as Interface Action (No Mic on Load)</p>
        </div>
        <div className="font-mono text-xs text-avorria-signal">STATUS: {status}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-6 space-y-4">
          <CursorTrigger state="try" label="SPEAK">
            <button
              onClick={() => simulateVoice("SHOW HIGHEST PRIORITY ITEMS")}
              className="w-full py-4 px-6 bg-avorria-signal text-avorria-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3"
            >
              <span>TRY VOICE COMMAND</span>
              <span>→</span>
            </button>
          </CursorTrigger>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px] text-avorria-quiet">OR SIMULATE:</span>
            <button
              onClick={() => simulateVoice("FILTER BY CRITICAL SLA")}
              className="px-2.5 py-1 border border-avorria-line hover:border-avorria-signal font-mono text-[11px] text-avorria-white"
            >
              &quot;Filter by Critical SLA&quot;
            </button>
            <button
              onClick={() => simulateVoice("COLLAPSE AUXILIARY PANELS")}
              className="px-2.5 py-1 border border-avorria-line hover:border-avorria-signal font-mono text-[11px] text-avorria-white"
            >
              &quot;Collapse Auxiliary Panels&quot;
            </button>
          </div>
        </div>

        <div className="md:col-span-6 p-6 bg-avorria-black border border-avorria-line space-y-2 font-mono text-xs">
          <div className="text-avorria-quiet">APPLIED COMMAND:</div>
          <div className="text-base font-bold text-avorria-white">{lastCommand}</div>
          <div className="text-[10px] text-avorria-signal pt-2 border-t border-avorria-line/20">
            PRIVACY: NO TRANSCRIPTS STORED OR DISPATCHED TO ANALYTICS.
          </div>
        </div>
      </div>
    </article>
  );
}

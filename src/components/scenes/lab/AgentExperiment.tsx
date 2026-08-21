"use client";
import React, { useState } from "react";
import { CursorTrigger } from "@/providers/CursorContext";

export function AgentExperiment() {
  const [step, setStep] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);

  const runAgent = () => {
    setRunning(true);
    setStep(1);
    setTimeout(() => setStep(2), 700);
    setTimeout(() => setStep(3), 1400);
    setTimeout(() => {
      setStep(4);
      setRunning(false);
    }, 2100);
  };

  const stages = [
    { name: "UNDERSTAND", desc: "Parse input parameters & extraction goals." },
    { name: "DECOMPOSE", desc: "Split deliverable into 4 discrete micro-tasks." },
    { name: "DEPENDENCIES", desc: "Map architectural dependencies & SLA windows." },
    { name: "PLAN", desc: "Synthesize final executable release schedule." }
  ];

  return (
    <article className="p-8 sm:p-12 border border-avorria-line bg-avorria-surface space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-avorria-line/40 pb-6">
        <div>
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-wider">05 // STUDY</span>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-avorria-white mt-1">Autonomous Agent Flow</h3>
          <p className="font-mono text-xs text-avorria-muted uppercase mt-0.5">Goal-to-Structured Plan Execution Pipeline</p>
        </div>
        <CursorTrigger state="try" label="RUN">
          <button
            onClick={runAgent}
            disabled={running}
            className="px-4 py-2 bg-avorria-signal text-avorria-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors disabled:opacity-50"
          >
            {running ? "RUNNING AGENT..." : "RUN AGENT EXPERIMENT →"}
          </button>
        </CursorTrigger>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((st, i) => (
          <div
            key={st.name}
            className={`p-5 bg-avorria-black border transition-all duration-300 ${step > i ? "border-avorria-signal shadow-[0_0_15px_rgba(77, 159, 255,0.15)]" : "border-avorria-line opacity-60"}`}
          >
            <div className="flex items-center justify-between font-mono text-xs mb-3">
              <span className={step > i ? "text-avorria-signal font-bold" : "text-avorria-quiet"}>{`0${i + 1}`}</span>
              <span className={step > i ? "text-avorria-signal" : "text-avorria-muted"}>{step > i ? "✓ DONE" : "WAITING"}</span>
            </div>
            <div className="font-sans font-bold text-base text-avorria-white">{st.name}</div>
            <div className="font-mono text-[11px] text-avorria-muted mt-2 leading-relaxed">{st.desc}</div>
          </div>
        ))}
      </div>
    </article>
  );
}

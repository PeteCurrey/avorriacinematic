"use client";
import React, { useState } from "react";
import { CareerDemoResponse } from "@/app/api/demos/career-path/route";
import { CursorTrigger } from "@/providers/CursorContext";

interface CareerOSLiveDemoStageProps {
  progress: number; // 0.0 to 1.0
}

export function CareerOSLiveDemoStage({ progress }: CareerOSLiveDemoStageProps) {
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<CareerDemoResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Active between 0.65 and 0.87
  if (progress < 0.64 || progress > 0.88) return null;

  const opacity = progress < 0.70 ? (progress - 0.64) / 0.06 : progress < 0.82 ? 1.0 : Math.max(0, 1.0 - (progress - 0.82) / 0.05);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/demos/career-path", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: inputVal.trim() })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Unable to synthesize career path.");
      } else {
        setResponse(data);
      }
    } catch {
      setErrorMsg("The demo couldn\x27t respond just now. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div
      className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-4 sm:px-12 z-30 pointer-events-auto"
      style={{ opacity }}
    >
      <div className="w-full max-w-3xl bg-avorria-surface/95 border border-avorria-line p-6 sm:p-10 shadow-2xl flex flex-col gap-6 backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-avorria-line/40 pb-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-avorria-quiet">
          <span className="text-avorria-signal">005 / LIVE AI INTERACTION</span>
          <span>CAREEROS DEMO</span>
        </div>

        {/* Prompt Question */}
        <h3 className="font-display font-bold text-xl sm:text-3xl text-avorria-white uppercase tracking-tight">
          What would you like to become?
        </h3>

        {/* Interactive Form */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="e.g. Commercial Pilot, Design Engineer, Founder..."
            maxLength={140}
            className="flex-1 bg-avorria-black border border-avorria-line focus:border-avorria-signal px-4 py-3 font-mono text-xs sm:text-sm text-avorria-white placeholder-avorria-muted outline-none transition-colors"
          />
          <CursorTrigger state="try" label="TRY">
            <button
              type="submit"
              disabled={loading || !inputVal.trim()}
              className="px-6 py-3 bg-avorria-signal text-avorria-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "BUILDING PATH..." : "EXPLORE"}
            </button>
          </CursorTrigger>
        </form>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 font-mono text-xs" role="alert">
            {errorMsg}
          </div>
        )}

        {/* Live Synthesized Path Output */}
        {response && response.paths && (
          <div className="flex flex-col gap-4 border-t border-avorria-line/40 pt-4 mt-2 max-h-[36vh] overflow-y-auto pr-1" aria-live="polite">
            <div className="flex items-center justify-between font-mono text-[10px] text-avorria-quiet uppercase tracking-wider">
              <span>SYNTHESIZED TRAJECTORY: {response.target.toUpperCase()}</span>
              <button onClick={() => setResponse(null)} className="text-avorria-signal hover:underline">RESET</button>
            </div>
            {response.paths.map((p, idx) => (
              <div key={idx} className="p-3 bg-avorria-black/60 border border-avorria-line flex flex-col gap-1">
                <span className="font-mono font-bold text-xs text-avorria-white">{p.title}</span>
                <p className="font-body text-xs text-avorria-muted leading-relaxed">{p.rationale}</p>
                <span className="font-mono text-[10px] text-avorria-signal uppercase tracking-wider pt-1">First Step: {p.firstStep}</span>
              </div>
            ))}
          </div>
        )}

        <div className="font-mono text-[9px] text-avorria-quiet uppercase tracking-widest pt-1 border-t border-avorria-line/20">
          Demo queries are transient and never persisted to CareerOS user profiles.
        </div>
      </div>
    </div>
  );
}

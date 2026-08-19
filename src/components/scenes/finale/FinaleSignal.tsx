import React from "react";

interface FinaleSignalProps {
  progress: number;
}

export function FinaleSignal({ progress }: FinaleSignalProps) {
  // 0.00 - 0.12: neutral rule -> 0.12 - 0.28: chartreuse signal travels right -> left
  const isSignalActive = progress >= 0.12;
  const signalWidth = Math.min(Math.max((progress - 0.12) / 0.16, 0), 1) * 100;

  return (
    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 px-6 sm:px-16 pointer-events-none z-0 select-none">
      <div className="max-w-[1760px] mx-auto relative h-[1px] bg-avorria-line/40 overflow-hidden">
        {isSignalActive && (
          <div
            className="absolute top-0 right-0 h-full bg-avorria-signal transition-all duration-150 ease-out shadow-[0_0_8px_rgba(200,241,53,0.6)]"
            style={{ width: `${signalWidth}%` }}
          />
        )}
      </div>
    </div>
  );
}

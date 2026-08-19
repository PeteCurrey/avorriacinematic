"use client";
import React from "react";

interface SignalApertureProps {
  progress: number;
  children: React.ReactNode;
}

export function SignalAperture({ progress, children }: SignalApertureProps) {
  const apertureWidthPercent = Math.min(100, Math.max(0.05, Math.pow(progress, 1.8) * 100));
  const insetHorizontal = (100 - apertureWidthPercent) / 2;

  return (
    <div className="relative w-full h-full overflow-hidden bg-avorria-black">
      <div
        className="w-full h-full relative"
        style={{
          clipPath: "inset(0% " + insetHorizontal + "% 0% " + insetHorizontal + "%)",
          WebkitClipPath: "inset(0% " + insetHorizontal + "% 0% " + insetHorizontal + "%)"
        }}
      >
        {children}
      </div>

      {progress < 0.95 && (
        <>
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-avorria-signal pointer-events-none transition-opacity duration-150"
            style={{
              left: insetHorizontal + "%",
              opacity: Math.max(0, 1 - progress * 1.5)
            }}
            aria-hidden="true"
          />
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-avorria-signal pointer-events-none transition-opacity duration-150"
            style={{
              right: insetHorizontal + "%",
              opacity: Math.max(0, 1 - progress * 1.5)
            }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}

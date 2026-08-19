"use client";
import React from "react";
import { Z } from "@/lib/scene-z";

interface SignalApertureProps {
  containerRef?: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

export function SignalAperture({ containerRef, children }: SignalApertureProps) {
  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-avorria-black"
      style={{ zIndex: Z.background }}
    >
      <div className="w-full h-full relative">
        {children}
      </div>
    </div>
  );
}

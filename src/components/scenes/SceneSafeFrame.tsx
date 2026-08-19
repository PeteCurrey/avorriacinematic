import React from "react";

interface SceneSafeFrameProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * SCENE SAFE FRAME
 *
 * Guarantees primary cinematic content renders strictly within the safe content zone
 * without colliding with the top global header (clamp(72px, 9vh, 104px)) or
 * bottom scene instrumentation (clamp(48px, 7vh, 72px)).
 */
export function SceneSafeFrame({ children, className = "" }: SceneSafeFrameProps) {
  return (
    <div
      className={`w-full h-full flex flex-col justify-between pt-[clamp(72px,9vh,104px)] pb-[clamp(48px,7vh,72px)] px-[clamp(24px,4vw,72px)] max-w-[1760px] mx-auto overflow-hidden relative ${className}`}
    >
      {children}
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";

export function DebugGrid() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle debug grid on Ctrl+G or Cmd+G
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "g") {
        e.preventDefault();
        setIsVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] max-w-[1720px] mx-auto px-6 sm:px-10"
      aria-hidden="true"
    >
      <div className="w-full h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 lg:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full bg-avorria-signal/[0.04] border-x border-avorria-signal/15 relative"
          >
            <span className="absolute top-2 left-1 font-mono text-[9px] text-avorria-signal/40">
              {i + 1}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

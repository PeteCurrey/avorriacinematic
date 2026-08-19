import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-avorria-signal focus:text-avorria-black focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider focus:outline-none"
    >
      Skip to main content
    </a>
  );
}

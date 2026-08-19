import React from "react";

export function WorkWallHeader() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-20 sm:pt-28 pb-12 sm:pb-16 border-b border-avorria-line flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-[0.25em]">
          SELECTED WORK
        </span>
        <h2 className="display-xl uppercase text-avorria-white tracking-tight leading-none">
          Selected Work
        </h2>
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-avorria-muted max-w-sm">
        DIFFERENT INDUSTRIES. SAME STANDARD.
      </p>
    </div>
  );
}

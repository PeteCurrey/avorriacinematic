import React from "react";

export function IntelligenceIntro() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-6 sm:px-12 pt-28 pb-16 border-b border-avorria-line flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          17 / INTELLIGENCE <span>{"//"}</span> EDITORIAL THESIS
        </span>
        <h2 className="display-xl uppercase text-avorria-white tracking-tight">
          Insights that<br />earn their keep.
        </h2>
      </div>
      <div className="space-y-2 max-w-sm font-mono text-xs text-avorria-muted uppercase tracking-widest">
        <p>THINKING ON SEARCH, AI SYSTEMS AND DIGITAL STRATEGY FROM THE PEOPLE BUILDING THEM.</p>
        <div className="flex items-center gap-2 text-[10px] text-avorria-signal pt-2 border-t border-avorria-line/40">
          <span>TERRITORIES:</span>
          <span>SEARCH</span>
          <span>•</span>
          <span>AI SYSTEMS</span>
          <span>•</span>
          <span>DIGITAL STRATEGY</span>
        </div>
      </div>
    </div>
  );
}

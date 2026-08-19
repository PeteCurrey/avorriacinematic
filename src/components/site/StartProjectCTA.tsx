import React from "react";
import Link from "next/link";

export function StartProjectCTA() {
  return (
    <Link
      href="/start-project"
      className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 border border-avorria-line hover:border-avorria-signal bg-avorria-surface/50 hover:bg-avorria-surface text-xs font-mono uppercase tracking-widest text-avorria-white hover:text-avorria-signal transition-all duration-200"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal animate-pulse" />
      <span>Start Project</span>
    </Link>
  );
}

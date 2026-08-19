import React from "react";

export function LabHeader() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-6 sm:px-12 pt-28 pb-16 border-b border-avorria-line flex flex-col md:flex-row md:items-end justify-between gap-8">
      <div className="space-y-4">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          14 / AVORRIA LAB <span>{"//"}</span> R&amp;D
        </span>
        <h2 className="display-xl uppercase text-avorria-white tracking-tight max-w-3xl">
          We build things before people ask for them.
        </h2>
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-avorria-muted max-w-sm">
        A WORKING SPACE FOR INTERFACES, AGENTS, VOICE, VISION, 3D AND DATA EXPERIMENTS.
      </p>
    </div>
  );
}

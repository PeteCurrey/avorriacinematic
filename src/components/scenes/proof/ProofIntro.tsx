import React from "react";

export function ProofIntro() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-6 sm:px-12 pt-28 pb-16 border-b border-avorria-line flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          16 / PROOF <span>{"//"}</span> EVIDENCE
        </span>
        <h2 className="display-xl uppercase text-avorria-white tracking-tight">
          The Work is the Proof.
        </h2>
      </div>
      <p className="font-mono text-xs uppercase tracking-widest text-avorria-muted max-w-sm">
        REAL PRODUCTS. REAL SYSTEMS. REAL BUSINESSES.
      </p>
    </div>
  );
}

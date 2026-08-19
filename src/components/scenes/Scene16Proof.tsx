"use client";
import React from "react";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";
import { getSceneConfig } from "./registry";
import { PROOF_ITEMS } from "@/lib/scenes/proof-config";
import { ProofIntro } from "./proof/ProofIntro";
import { ProofEvidenceItem } from "./proof/ProofEvidenceItem";
import { ProofFallback } from "./proof/ProofFallback";

export function Scene16Proof() {
  const { effectiveReducedMotion } = useReducedMotion();
  const config = getSceneConfig("scene-16-proof")!;

  if (effectiveReducedMotion) {
    return (
      <section id={config.id} data-scene-id={config.id} data-scene-index="16">
        <ProofFallback />
      </section>
    );
  }

  return (
    <section
      id={config.id}
      data-scene-id={config.id}
      data-scene-index="16"
      className="relative w-full bg-avorria-black select-none border-t border-avorria-line"
    >
      {/* Semantic Accessibility Heading */}
      <h2 className="sr-only">
        Proof — Shipped Work &amp; Verifiable Evidence by Avorria
      </h2>

      {/* Section Intro */}
      <ProofIntro />

      {/* Evidence Ledger */}
      <div className="max-w-[1760px] mx-auto px-6 sm:px-12 py-12 space-y-4">
        {PROOF_ITEMS.map((item) => (
          <ProofEvidenceItem key={item.id} item={item} />
        ))}
      </div>

      {/* Intelligence Handoff Anchor */}
      <div className="w-full max-w-[1760px] mx-auto px-6 sm:px-12 py-20 flex justify-between items-center border-t border-avorria-line font-mono text-xs text-avorria-quiet uppercase tracking-widest">
        <span>EVIDENCE COMPLETE // 5 VERIFIED DELIVERIES</span>
        <span className="text-avorria-signal">EDITORIAL // INTELLIGENCE</span>
      </div>
    </section>
  );
}

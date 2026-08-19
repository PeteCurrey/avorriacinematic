import React from "react";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Intelligence & Research",
  description: "Technical essays, engineering dispatches, and strategic perspectives on AI architectures.",
  path: "/intelligence"
});

export default function IntelligencePage() {
  return (
    <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="border-b border-avorria-line pb-12 mb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-avorria-signal">05</span>
          <span className="text-avorria-line-strong">/</span>
          <span className="font-mono text-xs uppercase tracking-widest text-avorria-muted">Editorial</span>
        </div>
        <h1 className="display-lg uppercase text-avorria-white">Intelligence</h1>
        <p className="font-mono text-sm text-avorria-muted uppercase tracking-wider mt-4 max-w-xl">
          Technical essays, architectural dispatches, and perspectives on autonomous systems.
        </p>
      </div>

      <div className="p-16 border border-avorria-line bg-avorria-surface/30 flex flex-col items-center justify-center text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-avorria-signal mb-2">
          Editorial Index Initialized
        </span>
        <p className="font-mono text-xs text-avorria-muted max-w-md">
          Curated intelligence articles will be published as they are authored.
        </p>
      </div>
    </div>
  );
}

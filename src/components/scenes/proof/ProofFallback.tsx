import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PROOF_ITEMS } from "@/lib/scenes/proof-config";

export function ProofFallback() {
  return (
    <div className="w-full bg-avorria-black px-6 sm:px-12 py-24 max-w-[1760px] mx-auto select-none space-y-16">
      <div className="border-b border-avorria-line pb-8 space-y-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          16 / PROOF <span>{"//"}</span> EVIDENCE
        </span>
        <h2 className="display-xl uppercase text-avorria-white">
          The Work is the Proof.
        </h2>
      </div>

      <div className="space-y-16">
        {PROOF_ITEMS.map((item) => (
          <div key={item.id} className="space-y-4 border-b border-avorria-line pb-12">
            <div className="aspect-video w-full relative bg-avorria-surface border border-avorria-line overflow-hidden">
              <Image
                src={item.imagePath}
                alt={item.projectName}
                fill
                className="object-cover"
              />
            </div>
            <div className="font-mono text-xs flex justify-between items-center">
              <span className="text-avorria-signal">{item.type}</span>
              <span className="text-avorria-muted">{item.status}</span>
            </div>
            <h3 className="font-sans text-2xl font-bold text-avorria-white">{item.projectName}</h3>
            <p className="font-body text-sm text-avorria-muted max-w-xl">{item.evidenceSummary}</p>
            <Link href={item.href} className="inline-block font-mono text-xs uppercase text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-0.5">
              VIEW CASE STUDY →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

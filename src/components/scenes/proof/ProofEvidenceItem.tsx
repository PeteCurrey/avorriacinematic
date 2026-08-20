import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProofItem } from "@/types/proof";
import { CursorTrigger } from "@/providers/CursorContext";

interface ProofEvidenceItemProps {
  item: ProofItem;
}

export function ProofEvidenceItem({ item }: ProofEvidenceItemProps) {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-avorria-line/40 py-16">
      {/* Left: Metadata Ledger */}
      <div className="lg:col-span-5 space-y-6 font-mono text-xs">
        <div className="space-y-1">
          <span className="text-avorria-signal uppercase tracking-wider block">{item.type}</span>
          <h3 className="font-sans text-2xl sm:text-3xl font-bold text-avorria-white tracking-tight">{item.projectName}</h3>
        </div>

        <div className="p-4 bg-avorria-surface border border-avorria-line space-y-2">
          <div className="flex justify-between text-avorria-quiet text-[11px]">
            <span>STATUS</span>
            <span className="text-avorria-signal font-bold">{item.status}</span>
          </div>
          <div className="flex justify-between text-avorria-quiet text-[11px]">
            <span>RELATIONSHIP</span>
            <span className="text-avorria-white">{item.relationship}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-avorria-quiet text-[11px] uppercase">DELIVERED SCOPE</div>
          <div className="text-avorria-muted text-xs leading-relaxed">{item.scope}</div>
        </div>

        <p className="font-body text-sm text-avorria-muted leading-relaxed pt-2 border-t border-avorria-line/20">
          {item.evidenceSummary}
        </p>

        <div className="pt-2">
          <CursorTrigger state="view" label="VIEW">
            <Link
              href={item.href}
              className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
            >
              <span>VIEW CASE STUDY</span>
              <span>→</span>
            </Link>
          </CursorTrigger>
        </div>
      </div>

      {/* Right: Visual Evidence */}
      <div className="lg:col-span-7 aspect-[16/10] relative bg-avorria-surface border border-avorria-line overflow-hidden shadow-2xl group">
        <Image
          src={item.imagePath}
          alt={`${item.projectName} evidence capture`}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-3 right-3 bg-avorria-black/90 px-2 py-1 font-mono text-[9px] text-avorria-signal uppercase tracking-wider border border-avorria-line">
          EVIDENCE // {item.status}
        </div>
      </div>
    </article>
  );
}

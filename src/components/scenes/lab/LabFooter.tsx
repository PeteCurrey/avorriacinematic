import React from "react";
import Link from "next/link";
import { CursorTrigger } from "@/providers/CursorContext";

export function LabFooter() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-6 sm:px-12 pt-20 pb-32 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-avorria-line">
      <div className="font-mono text-xs text-avorria-quiet uppercase tracking-widest">
        06 EXPERIMENTS // AVORRIA LAB FOLIO
      </div>

      <CursorTrigger state="view" label="LAB">
        <Link
          href="/lab"
          className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
        >
          <span>EXPLORE AVORRIA LAB</span>
          <span>→</span>
        </Link>
      </CursorTrigger>
    </div>
  );
}

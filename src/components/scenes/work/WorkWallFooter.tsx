import React from "react";
import Link from "next/link";
import { CursorTrigger } from "@/providers/CursorContext";

export function WorkWallFooter() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-6 sm:px-12 pt-20 pb-32 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-avorria-line">
      <div className="font-mono text-xs text-avorria-quiet uppercase tracking-widest">
        10 SELECTED PROJECTS <span>{"//"}</span> ARCHIVE &amp; COMPLETE FOLIO
      </div>

      <CursorTrigger state="view" label="ALL WORK">
        <Link
          href="/work"
          className="inline-flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1 transition-colors"
        >
          <span>VIEW ALL WORK</span>
          <span>→</span>
        </Link>
      </CursorTrigger>
    </div>
  );
}

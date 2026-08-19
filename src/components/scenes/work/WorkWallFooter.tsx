import React from "react";
import Link from "next/link";
import { CursorTrigger } from "@/providers/CursorContext";
import { CLIENT_WORK_PROJECTS, VENTURE_PROJECTS } from "@/lib/scenes/work-wall-config";

export function WorkWallFooter() {
  const totalCount = CLIENT_WORK_PROJECTS.length + VENTURE_PROJECTS.length;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-24 sm:pb-32 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-avorria-line">
      <div className="font-mono text-xs text-avorria-quiet uppercase tracking-widest">
        {totalCount} SELECTED PROJECTS <span>{"//"}</span> ARCHIVE &amp; COMPLETE FOLIO
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

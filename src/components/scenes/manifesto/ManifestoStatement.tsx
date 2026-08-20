import React from "react";
import type { ManifestoStatementData } from "@/types/manifesto";
import { Z } from "@/lib/scene-z";

interface ManifestoStatementProps {
  statement: ManifestoStatementData;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function ManifestoStatement({ statement, containerRef }: ManifestoStatementProps) {
  const isClimax = !!statement.emphasisText;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center p-6 sm:p-16 select-none pointer-events-none opacity-0"
      style={{ zIndex: Z.copy }}
    >
      <div className="max-w-[1760px] w-full grid grid-cols-12">
        <div
          className="col-span-12"
          style={{
            gridColumn: `${statement.colStart} / span ${statement.colSpan}`,
          }}
        >
          <h3 className={`font-display font-black uppercase tracking-tight leading-[0.92] text-avorria-white whitespace-pre-line ${isClimax ? "text-5xl sm:text-7xl lg:text-[9vw]" : "text-4xl sm:text-6xl lg:text-[7vw]"}`}>
            {isClimax ? (
              <>
                WE BUILD<br />
                <span className="text-avorria-signal">DIGITAL ADVANTAGE.</span>
              </>
            ) : (
              statement.text
            )}
          </h3>
        </div>
      </div>
    </div>
  );
}

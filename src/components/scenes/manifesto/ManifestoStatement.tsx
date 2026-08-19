import React from "react";
import { ManifestoStatementData } from "@/types/manifesto";

interface ManifestoStatementProps {
  statement: ManifestoStatementData;
  opacity: number;
  yTranslate: number;
}

export function ManifestoStatement({ statement, opacity, yTranslate }: ManifestoStatementProps) {
  if (opacity <= 0.01) return null;

  const isClimax = !!statement.emphasisText;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center p-6 sm:p-16 select-none pointer-events-none transition-opacity duration-300"
      style={{ opacity, transform: `translateY(${yTranslate}px)` }}
    >
      <div className="max-w-[1760px] w-full grid grid-cols-12">
        <div className={`col-span-12 lg:col-start-${statement.colStart} lg:col-span-${statement.colSpan}`}>
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

import React from "react";
import { MANIFESTO_STATEMENTS } from "@/lib/scenes/manifesto-config";

export function ManifestoFallback() {
  return (
    <div className="w-full bg-avorria-black px-6 sm:px-12 py-32 max-w-[1760px] mx-auto select-none space-y-24">
      <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest border-b border-avorria-line pb-6">
        15 / MANIFESTO <span>{"//"}</span> PRINCIPLES
      </div>

      <div className="space-y-20">
        {MANIFESTO_STATEMENTS.map((st) => (
          <div key={st.id}>
            <h3 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-avorria-white leading-tight whitespace-pre-line">
              {st.emphasisText ? (
                <>
                  WE BUILD<br />
                  <span className="text-avorria-signal">DIGITAL ADVANTAGE.</span>
                </>
              ) : (
                st.text
              )}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

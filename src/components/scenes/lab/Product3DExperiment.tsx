"use client";
import React, { useState } from "react";
import { CursorTrigger } from "@/providers/CursorContext";

export function Product3DExperiment() {
  const [rotation, setRotation] = useState(0);
  const [finish, setFinish] = useState<"MATTE RAW" | "CARBON GLOSS">("MATTE RAW");

  return (
    <article className="p-8 sm:p-12 border border-avorria-line bg-avorria-surface space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-avorria-line/40 pb-6">
        <div>
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-wider">04 // PROTOTYPE</span>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-avorria-white mt-1">3D Interactive Object</h3>
          <p className="font-mono text-xs text-avorria-muted uppercase mt-0.5">Physical Product Digital Geometry &amp; Finish Control</p>
        </div>
        <div className="flex items-center gap-2">
          {( ["MATTE RAW", "CARBON GLOSS"] as const ).map((f) => (
            <button
              key={f}
              onClick={() => setFinish(f)}
              className={`px-3 py-1.5 font-mono text-xs uppercase border transition-colors ${finish === f ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal" : "border-avorria-line text-avorria-muted hover:text-avorria-white"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <CursorTrigger state="drag" label="DRAG">
        <div
          onMouseMove={(e) => {
            if (e.buttons === 1) {
              setRotation((prev) => prev + e.movementX * 0.5);
            }
          }}
          className="relative w-full aspect-[21/9] min-h-[300px] bg-avorria-black border border-avorria-line flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden"
        >
          {/* Simulated 3D Geometry Cube */}
          <div
            style={{
              transform: `perspective(800px) rotateY(${rotation}deg) rotateX(15deg)`,
              transition: "transform 0.1s ease-out"
            }}
            className="w-36 h-36 border-2 border-avorria-signal bg-avorria-surface/80 shadow-[0_0_40px_rgba(200,241,53,0.2)] flex flex-col items-center justify-center p-4 text-center"
          >
            <span className="font-mono text-[10px] text-avorria-signal uppercase">FINISH</span>
            <span className="font-sans text-xs font-bold text-avorria-white mt-1">{finish}</span>
            <span className="font-mono text-[9px] text-avorria-muted mt-2">ROTATION: {Math.round(rotation)}°</span>
          </div>

          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-avorria-quiet uppercase tracking-wider">
            CLICK &amp; DRAG TO ROTATE OBJECT // CAPPED DPR 2X
          </div>
        </div>
      </CursorTrigger>
    </article>
  );
}

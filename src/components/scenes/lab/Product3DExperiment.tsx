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
          {/* Architectural Product Component Visualizer */}
          <div
            style={{
              transform: `perspective(800px) rotateY(${rotation}deg) rotateX(12deg)`,
              transition: "transform 0.1s ease-out"
            }}
            className="w-56 h-36 border border-avorria-signal/40 bg-avorria-surface flex flex-col justify-between p-4 text-left relative shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-avorria-line/40 pb-2">
              <span className="font-mono text-[9px] text-avorria-signal uppercase">CHASSIS CORE // 01</span>
              <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal" />
            </div>
            <div className="space-y-1">
              <div className="font-sans text-xs font-bold text-avorria-white">{finish}</div>
              <div className="font-mono text-[9px] text-avorria-muted">TITANIUM / GRAPHITE BLEND</div>
            </div>
            <div className="flex items-center justify-between border-t border-avorria-line/40 pt-2 font-mono text-[9px] text-avorria-quiet">
              <span>ROTATION: {Math.round(rotation)}°</span>
              <span>GEOMETRY: FIXED</span>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 font-mono text-[10px] text-avorria-quiet uppercase tracking-wider">
            DRAG TO INSPECT COMPONENT GEOMETRY
          </div>
        </div>
      </CursorTrigger>
    </article>
  );
}

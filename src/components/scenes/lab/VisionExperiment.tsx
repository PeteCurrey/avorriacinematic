"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CursorTrigger } from "@/providers/CursorContext";

type SampleType = "PRODUCT" | "INTERFACE" | "SPACE";

export function VisionExperiment() {
  const [sample, setSample] = useState<SampleType>("PRODUCT");

  const sampleData: Record<SampleType, { img: string; tags: string[] }> = {
    PRODUCT: {
      img: "/media/lab/sample-product.svg",
      tags: ["FORM: CYLINDRICAL", "MATERIAL: COMPOSITE", "COMPONENT: CENTRAL CORE", "SURFACE: MATTE ANODIZED"]
    },
    INTERFACE: {
      img: "/media/lab/sample-interface.svg",
      tags: ["REGION: NAVIGATION", "PRIMARY ACTION: TOP-RIGHT", "DATA GRID: 3-COL", "HIERARCHY: BALANCED"]
    },
    SPACE: {
      img: "/media/lab/sample-space.svg",
      tags: ["PERSPECTIVE: ONE-POINT", "DEPTH: 24.5M", "LIGHTING: DIRECTED", "ZONES: 4 DISCRETE"]
    }
  };

  return (
    <article className="p-8 sm:p-12 border border-avorria-line bg-avorria-surface space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-avorria-line/40 pb-6">
        <div>
          <span className="font-mono text-xs text-avorria-signal uppercase tracking-wider">03 // STUDY</span>
          <h3 className="font-sans text-xl sm:text-2xl font-bold text-avorria-white mt-1">Vision Structure</h3>
          <p className="font-mono text-xs text-avorria-muted uppercase mt-0.5">Visual Interpretation &amp; Structural Tagging</p>
        </div>
        <div className="flex items-center gap-2">
          {( ["PRODUCT", "INTERFACE", "SPACE"] as SampleType[] ).map((mode) => (
            <CursorTrigger key={mode} state="try" label="TRY">
              <button
                onClick={() => setSample(mode)}
                className={`px-3 py-1.5 font-mono text-xs uppercase border transition-colors ${sample === mode ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal" : "border-avorria-line text-avorria-muted hover:text-avorria-white"}`}
              >
                {mode}
              </button>
            </CursorTrigger>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 aspect-[16/10] relative bg-avorria-black border border-avorria-line overflow-hidden">
          <Image
            src={sampleData[sample].img}
            alt={`${sample} vision study sample`}
            fill
            className="object-contain"
          />
        </div>
        <div className="lg:col-span-4 space-y-3 font-mono text-xs">
          <span className="text-avorria-quiet uppercase tracking-wider block mb-2">EXTRACTED REGIONS</span>
          {sampleData[sample].tags.map((tag, i) => (
            <div key={i} className="p-3 bg-avorria-black border border-avorria-line flex items-center justify-between text-avorria-white">
              <span>{tag}</span>
              <span className="w-2 h-2 rounded-full bg-avorria-signal" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

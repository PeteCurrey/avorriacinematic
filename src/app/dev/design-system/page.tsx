"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { TechnicalRule } from "@/components/cinematic/TechnicalRule";
import { SceneMarker } from "@/components/cinematic/SceneMarker";
import { CursorTrigger } from "@/providers/CursorContext";
import { useTheme } from "@/providers/ThemeContext";
import { useReducedMotion } from "@/providers/ReducedMotionProvider";

export default function DevDesignSystemPage() {
  const { theme, setTheme } = useTheme();
  const { overrideReducedMotion, setOverrideReducedMotion } = useReducedMotion();
  const [formValues, setFormValues] = useState({ email: "", brief: "" });

  return (
    <div className="min-h-screen bg-avorria-black text-avorria-white pt-28 pb-24 px-6 sm:px-12 max-w-[1760px] mx-auto">
      {/* Design System Header */}
      <div className="border-b border-avorria-line pb-8 mb-16 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2 font-mono text-xs text-avorria-signal uppercase tracking-widest">
            <span>Dev Tooling</span>
            <span>/</span>
            <span>Design QA</span>
          </div>
          <h1 className="display-lg uppercase text-avorria-white">Design System QA</h1>
        </div>

        {/* Global Test Toggles */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="px-3 py-1.5 border border-avorria-signal text-avorria-signal uppercase hover:bg-avorria-signal/20"
          >
            Theme: {theme.toUpperCase()}
          </button>
          <button
            onClick={() => setOverrideReducedMotion(overrideReducedMotion ? null : true)}
            className={`px-3 py-1.5 border ${overrideReducedMotion ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal" : "border-avorria-line text-avorria-muted"}`}
          >
            Reduced Motion: {overrideReducedMotion ? "ACTIVE" : "DEFAULT"}
          </button>
        </div>
      </div>

      <div className="space-y-20">
        {/* 1. Color Palette Tokens */}
        <section className="space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-avorria-quiet pb-2 border-b border-avorria-line">
            01 / Primary Color Palette
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 font-mono text-xs">
            <div className="p-4 border border-avorria-line bg-avorria-black">
              <span className="block text-avorria-white">Avorria Black</span>
              <span className="text-avorria-quiet">#080808</span>
            </div>
            <div className="p-4 border border-avorria-line bg-avorria-obsidian">
              <span className="block text-avorria-white">Obsidian</span>
              <span className="text-avorria-quiet">#0D0D0D</span>
            </div>
            <div className="p-4 border border-avorria-line bg-avorria-graphite">
              <span className="block text-avorria-white">Graphite</span>
              <span className="text-avorria-quiet">#121212</span>
            </div>
            <div className="p-4 border border-avorria-line bg-avorria-line-deep">
              <span className="block text-avorria-white">Deep Line</span>
              <span className="text-avorria-quiet">#1A1A1A</span>
            </div>
            <div className="p-4 border border-avorria-line bg-avorria-surface text-avorria-white">
              <span className="block">Surgical White</span>
              <span className="text-avorria-quiet">#F3F3F0</span>
            </div>
            <div className="p-4 border border-avorria-signal bg-avorria-signal text-avorria-black font-bold">
              <span className="block">Signal Accent</span>
              <span>#4D9FFF</span>
            </div>
          </div>
        </section>

        {/* 2. Typographic Hierarchy */}
        <section className="space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-avorria-quiet pb-2 border-b border-avorria-line">
            02 / Typographic Scale
          </h2>
          <div className="space-y-8">
            <div>
              <span className="font-mono text-[10px] text-avorria-quiet block mb-1">DISPLAY XXL (140-190px fluid clamp)</span>
              <div className="display-xxl text-avorria-white">PRECISION AS POWER.</div>
            </div>
            <div>
              <span className="font-mono text-[10px] text-avorria-quiet block mb-1">DISPLAY XL (100-140px fluid clamp)</span>
              <div className="display-xl text-avorria-white">DIGITAL FLAGSHIPS</div>
            </div>
            <div>
              <span className="font-mono text-[10px] text-avorria-quiet block mb-1">DISPLAY LG (72-100px fluid clamp)</span>
              <div className="display-lg text-avorria-white">ENGINEERING INTEGRITY</div>
            </div>
            <div>
              <span className="font-mono text-[10px] text-avorria-quiet block mb-1">HEADING LG (38-52px)</span>
              <div className="heading-lg text-avorria-white">Strategic clarity through architectural systems.</div>
            </div>
            <div>
              <span className="font-mono text-[10px] text-avorria-quiet block mb-1">BODY LG (20-24px, 68ch measure)</span>
              <div className="body-lg">
                We design and engineer bespoke digital products and organic search architectures. Every interface is constructed with surgical typography, precise interaction, and uncompromising performance.
              </div>
            </div>
          </div>
        </section>

        {/* 3. Interactive Cursor Triggers */}
        <section className="space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-avorria-quiet pb-2 border-b border-avorria-line">
            03 / Custom Cursor States
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <CursorTrigger state="view" label="VIEW">
              <div className="p-8 border border-avorria-line hover:border-avorria-signal bg-avorria-surface flex items-center justify-center font-mono text-xs uppercase">
                Hover for [VIEW]
              </div>
            </CursorTrigger>
            <CursorTrigger state="drag" label="DRAG">
              <div className="p-8 border border-avorria-line hover:border-avorria-signal bg-avorria-surface flex items-center justify-center font-mono text-xs uppercase">
                Hover for [DRAG]
              </div>
            </CursorTrigger>
            <CursorTrigger state="try" label="TRY">
              <div className="p-8 border border-avorria-line hover:border-avorria-signal bg-avorria-surface flex items-center justify-center font-mono text-xs uppercase">
                Hover for [TRY]
              </div>
            </CursorTrigger>
            <CursorTrigger state="play" label="PLAY">
              <div className="p-8 border border-avorria-line hover:border-avorria-signal bg-avorria-surface flex items-center justify-center font-mono text-xs uppercase">
                Hover for [PLAY]
              </div>
            </CursorTrigger>
          </div>
        </section>

        {/* 4. Action Primitives & Buttons */}
        <section className="space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-avorria-quiet pb-2 border-b border-avorria-line">
            04 / Action Primitives
          </h2>
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="text">Text Action →</Button>
            <Button variant="outline">Outline Action</Button>
            <Button variant="signal">Solid Signal Action</Button>
          </div>
        </section>

        {/* 5. Architectural Form Language */}
        <section className="space-y-6 max-w-2xl">
          <h2 className="font-mono text-xs uppercase tracking-widest text-avorria-quiet pb-2 border-b border-avorria-line">
            05 / Architectural Form Inputs
          </h2>
          <div className="space-y-4">
            <Input
              label="Work Email"
              placeholder="alexander@enterprise.com"
              value={formValues.email}
              onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            />
            <Textarea
              label="Project Scope"
              placeholder="Outline technical requirements..."
              value={formValues.brief}
              onChange={(e) => setFormValues({ ...formValues, brief: e.target.value })}
            />
          </div>
        </section>

        {/* 6. Technical Annotation Primitives */}
        <section className="space-y-6">
          <h2 className="font-mono text-xs uppercase tracking-widest text-avorria-quiet pb-2 border-b border-avorria-line">
            06 / Technical Rules & Markers
          </h2>
          <div className="space-y-6">
            <SceneMarker index="003" label="ALKOTA BIKES" category="CASE STUDY" />
            <TechnicalRule variant="default" />
            <TechnicalRule variant="signal" />
          </div>
        </section>
      </div>
    </div>
  );
}

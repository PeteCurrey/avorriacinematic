"use client";

import React, { useState } from "react";
import { ServiceMethodologyStep } from "@/types/content";

interface ServiceMethodologyProps {
  sectionEyebrow?: string;
  sectionTitle?: string;
  steps: ServiceMethodologyStep[];
}

export function ServiceMethodology({
  sectionEyebrow = "03 // METHODOLOGY & DELIVERY",
  sectionTitle = "HOW AVORRIA APPROACHES IT",
  steps
}: ServiceMethodologyProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleTechnical = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section className="w-full border-b border-avorria-line bg-avorria-black py-16 sm:py-24">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="border-b border-avorria-line pb-8 mb-12">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-avorria-signal mb-3">
            <span>{sectionEyebrow}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-avorria-white">
            {sectionTitle}
          </h2>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-3 max-w-2xl">
            A disciplined, four-stage engagement framework designed to guarantee clarity, speed, and technical integrity.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={step.number}
                className="p-6 sm:p-8 border border-avorria-line bg-avorria-surface/40 flex flex-col justify-between space-y-6 hover:border-avorria-line-strong transition-colors"
              >
                <div className="space-y-4">
                  {/* Top Bar: Number & Phase */}
                  <div className="flex items-center justify-between font-mono text-xs border-b border-avorria-line/40 pb-3">
                    <span className="text-avorria-signal font-bold">{step.number}</span>
                    <span className="text-avorria-quiet text-[10px] uppercase">{step.duration || step.phase}</span>
                  </div>

                  <h3 className="font-display font-bold text-xl uppercase tracking-tight text-avorria-white">
                    {step.title}
                  </h3>

                  <p className="font-body text-xs sm:text-sm text-avorria-white/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-avorria-line/40">
                  {/* Deliverables List */}
                  <div className="space-y-2 font-mono text-xs">
                    <span className="text-avorria-muted uppercase text-[10px] block font-bold">
                      KEY DELIVERABLES:
                    </span>
                    <ul className="space-y-1.5 text-avorria-white/90 text-[11px]">
                      {step.deliverables.map((deliv, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5">
                          <span className="text-avorria-signal" aria-hidden="true">✓</span>
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Optional Expandable Technical Detail */}
                  {step.technicalDetails && step.technicalDetails.length > 0 && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => toggleTechnical(idx)}
                        className="font-mono text-[10px] text-avorria-signal uppercase tracking-wider hover:underline flex items-center gap-1.5"
                        aria-expanded={isExpanded}
                      >
                        <span>{isExpanded ? "Hide Architecture Specs" : "Technical Specs (CTO/Lead)"}</span>
                        <span>{isExpanded ? "▲" : "▼"}</span>
                      </button>

                      {isExpanded && (
                        <div className="mt-3 p-3 bg-avorria-black border border-avorria-line/80 font-mono text-[10px] text-avorria-muted space-y-1.5 animate-fadeIn">
                          <div className="text-avorria-white font-bold uppercase text-[9px]">ENGINEERING CONSTRAINTS:</div>
                          {step.technicalDetails.map((tech, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-1.5">
                              <span className="text-avorria-signal">#</span>
                              <span>{tech}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

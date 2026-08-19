import React from "react";
import Link from "next/link";
import { LAB_EXPERIMENTS } from "@/lib/scenes/lab-config";

export function LabFallback() {
  return (
    <div className="w-full bg-avorria-black px-6 sm:px-12 py-24 max-w-[1760px] mx-auto select-none space-y-16">
      <div className="border-b border-avorria-line pb-8 space-y-3">
        <span className="font-mono text-xs text-avorria-signal uppercase tracking-widest">
          14 / AVORRIA LAB <span>{"//"}</span> EXPERIMENTAL R&amp;D
        </span>
        <h2 className="display-xl uppercase text-avorria-white">
          We build things before people ask for them.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {LAB_EXPERIMENTS.map((exp) => (
          <div key={exp.id} className="p-6 bg-avorria-surface border border-avorria-line space-y-2">
            <div className="flex justify-between font-mono text-xs text-avorria-signal">
              <span>{exp.number} <span>{"//"}</span> {exp.status}</span>
              <span>{exp.interactionType}</span>
            </div>
            <h3 className="font-sans text-xl font-bold text-avorria-white">{exp.title}</h3>
            <p className="font-mono text-xs text-avorria-muted uppercase">{exp.descriptor}</p>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-avorria-line">
        <Link href="/lab" className="font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border-b border-avorria-signal pb-1">
          EXPLORE AVORRIA LAB →
        </Link>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function OperatingPlanPage() {
  const priorities = [
    { p: "P1", title: "Scale Automotive Scout Acquisition", desc: "Increase daily Scout run allocation from 20% to 35% in Northern UK automotive clusters." },
    { p: "P2", title: "Expand Hosting & Support Retainer Attach Rate", desc: "Target 50% attach rate on new website handovers (£65/mo minimum)." },
    { p: "P3", title: "Automate Routine Business Verification on GPT-4o-mini", desc: "Reduce non-essential token spend by ~£45/month across candidate intake." },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href="/admin/finance" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Finance Command
        </Link>
        <h1 className="text-2xl font-bold">Monthly Operating Plan & Strategic Priorities</h1>
      </div>

      <div className="space-y-4">
        {priorities.map((item) => (
          <div key={item.p} className="p-5 bg-[#111] border border-white/10 rounded-xl flex gap-4 items-start">
            <span className="font-bold text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded">
              {item.p}
            </span>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-white">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

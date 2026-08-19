"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WeeklyReviewPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href="/admin" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Command
        </Link>
        <h1 className="text-2xl font-bold">Executive Weekly Business Review</h1>
      </div>
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white">Week 34 Summary</h2>
        <p className="text-white/70 leading-relaxed">
          Contracted revenue reached £5,550 (+18% vs prior week). 1 new client won in automotive sector. All circuit breakers healthy.
        </p>
      </div>
    </div>
  );
}

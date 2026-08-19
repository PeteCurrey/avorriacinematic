"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MonthlyReviewPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href="/admin" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Command
        </Link>
        <h1 className="text-2xl font-bold">Executive Monthly Review</h1>
      </div>
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white">August 2026 Performance vs Plan</h2>
        <p className="text-white/70 leading-relaxed">
          Paced at £5,550 against £20,000 target. Weighted pipeline of £9,250 provides strong coverage into month-end.
        </p>
      </div>
    </div>
  );
}

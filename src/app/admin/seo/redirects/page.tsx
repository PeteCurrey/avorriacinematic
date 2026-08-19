"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function SEORedirectsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/seo" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to SEO Command
        </Link>
        <h1 className="text-2xl font-bold">301 Redirect Rules</h1>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-6 text-xs space-y-4">
        <div className="flex justify-between items-center p-3 bg-white/5 rounded border border-white/10">
          <div>
            <span className="font-mono text-white font-semibold">/about-us</span>
            <span className="text-white/40 mx-2">&rarr;</span>
            <span className="font-mono text-emerald-400 font-semibold">/capabilities</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            301 ACTIVE
          </span>
        </div>
      </div>
    </div>
  );
}

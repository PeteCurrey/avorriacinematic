"use client";
import React from "react";
import Link from "next/link";
import { Search, RefreshCw, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

export default function SEOCommandCentrePage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <Search className="w-3.5 h-3.5" /> Technical SEO Command
          </div>
          <h1 className="text-3xl font-extrabold">Avorria Search Visibility & Health</h1>
          <p className="text-sm text-white/50 mt-1">Audit status codes, canonicals, schema markup, and 301 redirects.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/seo/redirects" className="bg-white/10 hover:bg-white/20 text-xs font-semibold px-4 py-2 rounded">
            Redirect Manager (301)
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 text-xs">
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="text-white/40 uppercase font-semibold text-[10px]">Pages Crawled</span>
          <div className="text-2xl font-black text-white">18 Pages</div>
          <p className="text-emerald-400 font-medium">All indexable pages return 200 OK</p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="text-white/40 uppercase font-semibold text-[10px]">Google Search Console</span>
          <div className="text-sm font-bold text-amber-400">CREDENTIALS REQUIRED</div>
          <p className="text-white/50">Configure SEARCH_CONSOLE_KEY to stream queries</p>
        </div>
        <div className="bg-[#111] border border-white/10 rounded-xl p-5 space-y-2">
          <span className="text-white/40 uppercase font-semibold text-[10px]">Open Issues</span>
          <div className="text-2xl font-black text-white">1 Warning</div>
          <p className="text-white/50">0 critical blockers</p>
        </div>
      </div>
    </div>
  );
}

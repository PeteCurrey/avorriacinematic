"use client";
import React from "react";
import { Image as ImageIcon, Upload, CheckCircle2 } from "lucide-react";

export default function MediaLibraryPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold">Media Asset Library</h1>
          <p className="text-sm text-white/50 mt-1">High-resolution assets, focal-point cropping, and usage registry.</p>
        </div>
        <button className="bg-white text-black font-semibold text-xs px-4 py-2 rounded flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5" /> Upload Media
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 text-xs">
        <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden group">
          <div className="aspect-video bg-zinc-900 flex items-center justify-center text-white/20">
            <ImageIcon className="w-8 h-8" />
          </div>
          <div className="p-3 space-y-1">
            <div className="font-bold text-white truncate">avorria_hero_render_v2.webp</div>
            <div className="text-[10px] text-white/40 flex justify-between">
              <span>2560x1440 • 420 KB</span>
              <span className="text-emerald-400">Focal: (50%, 45%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

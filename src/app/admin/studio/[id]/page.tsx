"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Monitor, Tablet, Smartphone, Sparkles, CheckCircle, RefreshCw, Layers } from "lucide-react";

export default function StudioEditorPage() {
  const params = useParams<{ id: string }>();
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"sections" | "critique" | "tokens" | "history">("sections");
  const [revisionPrompt, setRevisionPrompt] = useState("");
  const [isRevising, setIsRevising] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const viewportWidths = {
    desktop: "100%",
    tablet: "768px",
    mobile: "390px",
  };

  const handleApplyRevision = () => {
    if (!revisionPrompt.trim()) return;
    setIsRevising(true);
    setTimeout(() => {
      setIsRevising(false);
      setStatusMessage("Applied revision: " + revisionPrompt);
      setRevisionPrompt("");
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#0a0a0a] text-white">
      {/* Top Studio Bar */}
      <div className="h-14 border-b border-white/10 px-6 flex items-center justify-between bg-[#111]">
        <div className="flex items-center gap-4">
          <Link href="/admin/studio" className="text-white/60 hover:text-white flex items-center gap-1 text-sm">
            <ArrowLeft className="w-4 h-4" /> Studio
          </Link>
          <span className="text-white/30">/</span>
          <span className="font-semibold text-sm">Project {params?.id ? String(params.id).slice(0, 8) : "—"}</span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs px-2 py-0.5 rounded">
            Version 1.0 (Generated)
          </span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-lg">
          <button
            onClick={() => setViewport("desktop")}
            className={`p-1.5 rounded text-xs flex items-center gap-1 ${viewport === "desktop" ? "bg-white/20 text-white" : "text-white/40 hover:text-white"}`}
            title="Desktop (1440px)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport("tablet")}
            className={`p-1.5 rounded text-xs flex items-center gap-1 ${viewport === "tablet" ? "bg-white/20 text-white" : "text-white/40 hover:text-white"}`}
            title="Tablet (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport("mobile")}
            className={`p-1.5 rounded text-xs flex items-center gap-1 ${viewport === "mobile" ? "bg-white/20 text-white" : "text-white/40 hover:text-white"}`}
            title="Mobile (390px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="bg-white/10 hover:bg-white/20 text-xs font-medium px-3 py-1.5 rounded border border-white/10 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Re-critique
          </button>
          <button className="bg-white text-black hover:bg-white/90 text-xs font-semibold px-4 py-1.5 rounded flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" /> Approve for QA
          </button>
        </div>
      </div>

      {/* 3-Column Studio Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Page & Section Tree */}
        <div className="w-72 border-r border-white/10 bg-[#0d0d0d] flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">Page Navigation</h3>
          </div>
          <div className="p-3 space-y-1 overflow-y-auto flex-1">
            {["Home", "Services", "About", "Contact"].map((page, idx) => (
              <div key={page} className={`p-2 rounded text-xs font-medium flex items-center justify-between cursor-pointer ${idx === 0 ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5"}`}>
                <span>{page}</span>
                <span className="text-[10px] text-white/40">/{page.toLowerCase() === "home" ? "" : page.toLowerCase()}</span>
              </div>
            ))}
            
            <div className="pt-4 pb-2">
              <h4 className="text-[10px] font-semibold uppercase tracking-wider text-white/40 px-2">Home Sections</h4>
            </div>
            {["Hero (Cinematic)", "Trust Strip", "Services Grid (3-Col)", "About Story", "Reviews Showcase", "CTA Section", "Footer"].map((section, idx) => (
              <div key={section} className="px-2 py-1.5 rounded text-xs text-white/70 hover:bg-white/5 flex items-center gap-2">
                <Layers className="w-3 h-3 text-white/40" />
                <span>{section}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Live Responsive Preview Frame */}
        <div className="flex-1 bg-[#141414] p-6 flex flex-col items-center justify-center overflow-auto">
          <div
            style={{ width: viewportWidths[viewport], height: "100%", maxHeight: "800px" }}
            className="bg-white text-black rounded-lg shadow-2xl overflow-y-auto transition-all duration-300 border border-white/10"
          >
            {/* Embedded Live Preview Mock Content */}
            <div className="p-12 text-center bg-[#0d0d0d] text-white">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">Specialist Automotive Engineers</span>
              <h1 className="text-4xl font-extrabold mt-3 mb-4">Precision Engineering & Prestige Vehicle Care</h1>
              <p className="text-white/60 max-w-lg mx-auto text-sm">Decades of combined technical mastery delivering dealer-level diagnostics, servicing, and performance tuning.</p>
              <div className="mt-6 flex justify-center gap-4">
                <span className="bg-white text-black font-semibold text-xs px-6 py-2.5 rounded">Book Service Online</span>
                <span className="border border-white/20 text-xs px-6 py-2.5 rounded font-medium">View Capabilities</span>
              </div>
            </div>

            <div className="p-8 bg-zinc-50 border-b border-zinc-200">
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-2xl font-bold text-zinc-900">4.9★</div>
                  <div className="text-xs text-zinc-500">Google Rating (120+ reviews)</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">25+ Yrs</div>
                  <div className="text-xs text-zinc-500">Master Tech Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">OEM Spec</div>
                  <div className="text-xs text-zinc-500">Warranty Preserved</div>
                </div>
              </div>
            </div>

            <div className="p-10 text-center">
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">Our Specialist Services</h2>
              <p className="text-xs text-zinc-500 mb-8">Manufacturer compliant servicing using authentic components.</p>
              <div className="grid grid-cols-3 gap-4 text-left">
                {["Scheduled Maintenance", "Advanced Diagnostics", "Performance Tuning"].map((svc) => (
                  <div key={svc} className="p-4 border border-zinc-200 rounded">
                    <h3 className="font-semibold text-sm text-zinc-900">{svc}</h3>
                    <p className="text-xs text-zinc-500 mt-1">Full digital service record updating and manufacturer warranty protection.</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Revision & Critique Sidebar */}
        <div className="w-80 border-l border-white/10 bg-[#0d0d0d] flex flex-col">
          <div className="flex border-b border-white/10 text-xs font-medium">
            <button
              onClick={() => setActiveTab("sections")}
              className={`flex-1 py-3 text-center border-b-2 ${activeTab === "sections" ? "border-white text-white" : "border-transparent text-white/50"}`}
            >
              AI Revision
            </button>
            <button
              onClick={() => setActiveTab("critique")}
              className={`flex-1 py-3 text-center border-b-2 ${activeTab === "critique" ? "border-white text-white" : "border-transparent text-white/50"}`}
            >
              Critique
            </button>
            <button
              onClick={() => setActiveTab("tokens")}
              className={`flex-1 py-3 text-center border-b-2 ${activeTab === "tokens" ? "border-white text-white" : "border-transparent text-white/50"}`}
            >
              Tokens
            </button>
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            {activeTab === "sections" && (
              <div>
                <label className="text-xs font-medium text-white/80 block mb-2">Natural Language Revision</label>
                <textarea
                  value={revisionPrompt}
                  onChange={(e) => setRevisionPrompt(e.target.value)}
                  placeholder="e.g. 'Make hero headline shorter and increase typography contrast'"
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded p-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-white/30 resize-none"
                />
                <button
                  onClick={handleApplyRevision}
                  disabled={isRevising || !revisionPrompt.trim()}
                  className="mt-3 w-full bg-white text-black font-semibold text-xs py-2 rounded flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {isRevising ? "Applying Revision..." : "Apply AI Revision"}
                </button>
                {statusMessage && (
                  <div className="mt-3 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded">
                    {statusMessage}
                  </div>
                )}
              </div>
            )}

            {activeTab === "critique" && (
              <div className="space-y-3">
                <div className="p-3 bg-white/5 border border-white/10 rounded">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-white/70">Overall Design Score</span>
                    <span className="text-xs font-bold text-emerald-400">88/100</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/70">AI Slop Score</span>
                    <span className="text-xs font-bold text-emerald-400">12/100 (Low)</span>
                  </div>
                </div>
                <div className="text-xs text-white/80 font-medium">Design Recommendations:</div>
                <ul className="text-xs text-white/60 space-y-2 list-disc list-inside">
                  <li>Hero typography is crisp and editorial.</li>
                  <li>Good rhythm between dark header and clean content sections.</li>
                  <li>Ensure trust badges have high contrast on mobile viewports.</li>
                </ul>
              </div>
            )}

            {activeTab === "tokens" && (
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-white/50 block">Heading Font</span>
                  <span className="font-mono text-white/90">Inter (Bold 800)</span>
                </div>
                <div>
                  <span className="text-white/50 block">Body Font</span>
                  <span className="font-mono text-white/90">Inter (Regular 400)</span>
                </div>
                <div>
                  <span className="text-white/50 block">Accent Colour</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-4 h-4 rounded bg-[#10b981]" />
                    <span className="font-mono text-white/90">#10B981 (Emerald)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

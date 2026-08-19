"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECT_MEDIA_REGISTRY, ProjectMediaAsset } from "@/lib/media/project-media-registry";

export default function MediaAuditPage() {
  const [filter, setFilter] = useState<string>("ALL");

  const filteredAssets = PROJECT_MEDIA_REGISTRY.filter((asset) => {
    if (filter === "ALL") return true;
    if (filter === "APPROVED") return asset.productionApproved;
    if (filter === "CANDIDATE") return asset.sourceStatus === "CANDIDATE";
    if (filter === "MISSING") return asset.sourceStatus === "MISSING_SOURCE";
    if (filter === "PRODUCT_MASTER") return asset.mediaType === "PRODUCT_MASTER";
    if (filter === "UI_CAPTURE") return asset.mediaType === "UI_CAPTURE";
    if (filter === "PORTRAIT") return asset.mediaType === "PORTRAIT";
    return true;
  });

  return (
    <main className="min-h-screen bg-avorria-black text-avorria-white px-6 sm:px-12 py-16">
      <div className="max-w-[1760px] mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-avorria-line pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div>
            <div className="font-mono text-xs text-avorria-signal uppercase tracking-widest mb-2">
              DEVELOPMENT ENGINEERING TOOL // DEV ONLY
            </div>
            <h1 className="font-display font-extrabold text-4xl uppercase tracking-tight">
              Real Media Provenance Audit
            </h1>
            <p className="font-body text-avorria-muted text-sm mt-2 max-w-xl">
              Source-truth validation for every project asset. Verified repository paths, commits, status, and production permissions.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-widest text-avorria-signal hover:text-avorria-white border border-avorria-signal px-4 py-2"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {["ALL", "APPROVED", "CANDIDATE", "MISSING", "PRODUCT_MASTER", "UI_CAPTURE", "PORTRAIT"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 border uppercase transition-colors ${
                filter === f
                  ? "border-avorria-signal bg-avorria-signal/20 text-avorria-signal"
                  : "border-avorria-line text-avorria-muted hover:text-avorria-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="border border-avorria-line bg-avorria-surface flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Media Preview Box */}
              <div className="relative w-full aspect-[16/10] bg-avorria-black border-b border-avorria-line overflow-hidden flex items-center justify-center">
                {asset.sourceStatus === "MISSING_SOURCE" ? (
                  <div className="font-mono text-xs text-rose-500 uppercase tracking-widest text-center p-4">
                    [MISSING SOURCE MEDIA]
                  </div>
                ) : (
                  <Image
                    src={asset.localPath}
                    alt={asset.id}
                    fill
                    className="object-contain p-2"
                  />
                )}

                <div className="absolute top-2 left-2 bg-avorria-black/90 px-2 py-0.5 border border-avorria-line font-mono text-[9px] text-avorria-signal uppercase">
                  {asset.mediaType}
                </div>

                <div className={`absolute top-2 right-2 px-2 py-0.5 font-mono text-[9px] uppercase font-bold ${
                  asset.productionApproved ? "bg-lime-950 text-lime-400 border border-lime-500" : "bg-rose-950 text-rose-400 border border-rose-500"
                }`}>
                  {asset.productionApproved ? "APPROVED" : "QUARANTINED"}
                </div>
              </div>

              {/* Asset Metadata */}
              <div className="p-5 space-y-4 text-xs font-mono">
                <div className="flex items-center justify-between border-b border-avorria-line/40 pb-2">
                  <span className="text-avorria-white font-bold">{asset.id}</span>
                  <span className="text-avorria-signal uppercase">{asset.projectSlug}</span>
                </div>

                <div className="space-y-1 text-avorria-muted text-[11px]">
                  <div><span className="text-avorria-quiet">REPO:</span> {asset.sourceRepo}</div>
                  <div className="truncate"><span className="text-avorria-quiet">SRC:</span> {asset.sourcePath}</div>
                  <div className="truncate"><span className="text-avorria-quiet">LOCAL:</span> {asset.localPath}</div>
                  <div><span className="text-avorria-quiet">STATUS:</span> {asset.sourceStatus}</div>
                </div>

                {asset.notes && (
                  <div className="p-2.5 bg-avorria-black border border-avorria-line/40 text-[10px] text-avorria-quiet leading-relaxed">
                    {asset.notes}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { 
  Prospect, 
  OpportunityBand, 
  ProspectStatus, 
  ReviewStatus 
} from "@/types/admin";
import { 
  Search, 
  Filter, 
  ExternalLink, 
  ChevronRight, 
  Star, 
  ArrowUpDown, 
  Sparkles,
  SlidersHorizontal,
  Users
} from "lucide-react";

interface ProspectsDataGridProps {
  prospects: Prospect[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function ProspectsDataGrid({ 
  prospects, 
  total, 
  currentPage, 
  totalPages 
}: ProspectsDataGridProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedBand, setSelectedBand] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"score_desc" | "score_asc" | "created_desc" | "rating_desc">("score_desc");

  // Client-side instant filter on current page results (with support for deep query parameters)
  const filtered = prospects.filter((p) => {
    if (selectedStatus !== "all" && p.status !== selectedStatus) return false;
    if (selectedBand !== "all" && p.assessment?.opportunity_band !== selectedBand) return false;
    if (selectedSector !== "all" && p.business?.sector !== selectedSector) return false;
    
    if (search.trim()) {
      const q = search.toLowerCase();
      const b = p.business;
      const match = 
        b?.company_name.toLowerCase().includes(q) ||
        b?.domain?.toLowerCase().includes(q) ||
        b?.city?.toLowerCase().includes(q) ||
        b?.sector.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === "score_desc") return b.opportunity_score - a.opportunity_score;
    if (sortBy === "score_asc") return a.opportunity_score - b.opportunity_score;
    if (sortBy === "created_desc") return b.created_at.localeCompare(a.created_at);
    if (sortBy === "rating_desc") {
      return (b.business?.google_rating || 0) - (a.business?.google_rating || 0);
    }
    return 0;
  });

  // Extract unique sectors from records for filter dropdown
  const sectors = Array.from(new Set(prospects.map(p => p.business?.sector).filter(Boolean))) as string[];

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="p-4 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-avorria-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company, domain, city or sector..."
              className="w-full bg-[#141414] border border-white/10 pl-9 pr-3 py-2 font-mono text-xs text-avorria-white placeholder:text-avorria-quiet rounded-[2px] focus:outline-none focus:border-avorria-signal"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-[#141414] border border-white/10 px-2.5 py-2 text-avorria-white rounded-[2px] focus:outline-none focus:border-avorria-signal"
            >
              <option value="all">Status: All</option>
              <option value="awaiting_review">Awaiting Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="watch">Watch</option>
              <option value="research_requested">Research Requested</option>
              <option value="qualified">Qualified</option>
              <option value="opportunity">Opportunity</option>
            </select>

            {/* Band Filter */}
            <select
              value={selectedBand}
              onChange={(e) => setSelectedBand(e.target.value)}
              className="bg-[#141414] border border-white/10 px-2.5 py-2 text-avorria-white rounded-[2px] focus:outline-none focus:border-avorria-signal"
            >
              <option value="all">Band: All</option>
              <option value="PRIORITY">PRIORITY (85-100)</option>
              <option value="GOOD">GOOD (70-84)</option>
              <option value="SECONDARY">SECONDARY (50-69)</option>
              <option value="LOW">LOW (0-49)</option>
            </select>

            {/* Sector Filter */}
            {sectors.length > 0 && (
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-[#141414] border border-white/10 px-2.5 py-2 text-avorria-white rounded-[2px] focus:outline-none focus:border-avorria-signal max-w-[160px] truncate"
              >
                <option value="all">Sector: All</option>
                {sectors.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            )}

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#141414] border border-white/10 px-2.5 py-2 text-avorria-white rounded-[2px] focus:outline-none focus:border-avorria-signal"
            >
              <option value="score_desc">Sort: Highest Score</option>
              <option value="score_asc">Sort: Lowest Score</option>
              <option value="rating_desc">Sort: Google Rating</option>
              <option value="created_desc">Sort: Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Database Table */}
      {filtered.length === 0 ? (
        <div className="p-12 bg-[#0D0D0D] border border-white/10 rounded-[2px] text-center space-y-3">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-[2px] flex items-center justify-center mx-auto text-avorria-muted">
            <Users className="w-5 h-5" />
          </div>
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
            NO PROSPECTS MATCH CURRENT FILTER CRITERIA
          </div>
          <p className="font-mono text-xs text-avorria-muted max-w-md mx-auto leading-relaxed">
            {prospects.length === 0 
              ? "The prospect database is currently empty. Connect AI Scout or seed a test prospect."
              : "Try clearing active search terms or resetting the status and band filters."}
          </p>
        </div>
      ) : (
        <div className="bg-[#0D0D0D] border border-white/10 rounded-[2px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#141414] border-b border-white/10 text-[10px] uppercase tracking-widest text-avorria-muted select-none">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Company</th>
                  <th className="py-3.5 px-4 font-bold">Sector</th>
                  <th className="py-3.5 px-4 font-bold">Location</th>
                  <th className="py-3.5 px-4 font-bold">Website</th>
                  <th className="py-3.5 px-4 font-bold text-center">Score</th>
                  <th className="py-3.5 px-4 font-bold text-center">Band</th>
                  <th className="py-3.5 px-4 font-bold text-center">Rating</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((prospect) => {
                  const b = prospect.business;
                  const a = prospect.assessment;
                  const band = a?.opportunity_band || "PRIORITY";

                  return (
                    <tr
                      key={prospect.id}
                      onClick={() => router.push(`/admin/prospects/${prospect.id}`)}
                      className="hover:bg-white/[0.04] transition-colors cursor-pointer group"
                    >
                      {/* Company Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-avorria-white group-hover:text-avorria-signal transition-colors">
                          {b?.company_name}
                        </div>
                        <div className="text-[10px] text-avorria-muted mt-0.5">
                          {b?.legal_name || b?.company_number || "Verified UK Entity"}
                        </div>
                      </td>

                      {/* Sector */}
                      <td className="py-3.5 px-4 text-avorria-white/80 max-w-[160px] truncate">
                        {b?.sector}
                      </td>

                      {/* Location */}
                      <td className="py-3.5 px-4 text-avorria-muted">
                        {b?.city || "London"}, {b?.country}
                      </td>

                      {/* Website */}
                      <td className="py-3.5 px-4">
                        {b?.website_url ? (
                          <a
                            href={b.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-avorria-muted hover:text-avorria-signal inline-flex items-center gap-1 text-[11px]"
                          >
                            <span className="truncate max-w-[140px]">{b.domain || b.website_url}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        ) : (
                          <span className="text-avorria-quiet">—</span>
                        )}
                      </td>

                      {/* Opportunity Score */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-black text-sm text-avorria-signal">
                          {prospect.opportunity_score}
                        </span>
                      </td>

                      {/* Band */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider rounded-[2px] ${
                          band === "PRIORITY"
                            ? "bg-avorria-signal/15 text-avorria-signal border border-avorria-signal/30"
                            : band === "GOOD"
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : band === "SECONDARY"
                                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                : "bg-white/5 text-avorria-muted border border-white/10"
                        }`}>
                          {band}
                        </span>
                      </td>

                      {/* Rating */}
                      <td className="py-3.5 px-4 text-center">
                        {b?.google_rating ? (
                          <div className="inline-flex items-center gap-1 text-amber-400 font-bold text-[11px]">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span>{b.google_rating.toFixed(1)}</span>
                            <span className="text-avorria-quiet text-[10px] font-normal">
                              ({b.google_review_count || 0})
                            </span>
                          </div>
                        ) : (
                          <span className="text-avorria-quiet">—</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider rounded-[2px] ${
                          prospect.status === "approved"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : prospect.status === "awaiting_review"
                              ? "bg-avorria-signal/15 text-avorria-signal border border-avorria-signal/30"
                              : prospect.status === "rejected"
                                ? "bg-red-500/15 text-red-400 border border-red-500/30"
                                : prospect.status === "watch"
                                  ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                                  : "bg-white/5 text-avorria-muted border border-white/10"
                        }`}>
                          {prospect.status.replace(/_/g, " ")}
                        </span>
                      </td>

                      {/* Open Details Action */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/prospects/${prospect.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 text-avorria-muted hover:text-avorria-white hover:bg-white/10 rounded-[2px] inline-flex items-center transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { 
  Prospect, 
  RejectionReason 
} from "@/types/admin";
import { 
  approveProspectAction, 
  rejectProspectAction, 
  watchProspectAction, 
  requestResearchAction 
} from "@/app/admin/actions";
import { 
  Check, 
  X, 
  Eye, 
  Search, 
  SkipForward, 
  ExternalLink, 
  Star, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  ArrowRight,
  ListFilter,
  LayoutGrid
} from "lucide-react";

interface ReviewQueueViewProps {
  prospects: Prospect[];
}

const REJECTION_REASONS: RejectionReason[] = [
  "business too small",
  "website already good",
  "poor fit",
  "duplicate",
  "outside target area",
  "insufficient commercial value",
  "invalid business",
  "other"
];

export function ReviewQueueView({ prospects: initialProspects }: ReviewQueueViewProps) {
  const router = useRouter();
  const [prospects, setProspects] = useState<Prospect[]>(initialProspects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"focused" | "table">("focused");
  
  // Rejection modal state
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRejectReason, setSelectedRejectReason] = useState<RejectionReason>("poor fit");
  const [rejectNotes, setRejectNotes] = useState("");

  // Action status state
  const [isPending, startTransition] = useTransition();
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const currentProspect = prospects[currentIndex] || null;

  const removeCurrentAndAdvance = React.useCallback(() => {
    setProspects((prev) => {
      const updated = prev.filter((_, idx) => idx !== currentIndex);
      if (currentIndex >= updated.length && updated.length > 0) {
        setCurrentIndex(updated.length - 1);
      }
      return updated;
    });
  }, [currentIndex]);

  const handleApprove = React.useCallback(() => {
    if (!currentProspect || isPending) return;
    const target = currentProspect;
    startTransition(async () => {
      setActionFeedback(`Approved ${target.business?.company_name || target.id}`);
      removeCurrentAndAdvance();
      const res = await approveProspectAction(target.id);
      if (!res.success) {
        setActionFeedback(`Error approving: ${res.error}`);
      } else {
        setTimeout(() => setActionFeedback(null), 3000);
      }
    });
  }, [currentProspect, isPending, removeCurrentAndAdvance]);

  const handleRejectSubmit = React.useCallback(() => {
    if (!currentProspect || isPending) return;
    const target = currentProspect;
    setShowRejectModal(false);
    startTransition(async () => {
      setActionFeedback(`Rejected: ${selectedRejectReason}`);
      removeCurrentAndAdvance();
      const res = await rejectProspectAction(target.id, selectedRejectReason, rejectNotes);
      setRejectNotes("");
      if (!res.success) {
        setActionFeedback(`Error rejecting: ${res.error}`);
      } else {
        setTimeout(() => setActionFeedback(null), 3000);
      }
    });
  }, [currentProspect, isPending, rejectNotes, removeCurrentAndAdvance, selectedRejectReason]);

  const handleWatch = React.useCallback(() => {
    if (!currentProspect || isPending) return;
    const target = currentProspect;
    startTransition(async () => {
      setActionFeedback(`Added to Watch list`);
      removeCurrentAndAdvance();
      const res = await watchProspectAction(target.id);
      if (!res.success) {
        setActionFeedback(`Error watching: ${res.error}`);
      } else {
        setTimeout(() => setActionFeedback(null), 3000);
      }
    });
  }, [currentProspect, isPending, removeCurrentAndAdvance]);

  const handleResearchMore = React.useCallback(() => {
    if (!currentProspect || isPending) return;
    const target = currentProspect;
    startTransition(async () => {
      setActionFeedback(`Queued for additional research`);
      removeCurrentAndAdvance();
      const res = await requestResearchAction(target.id);
      if (!res.success) {
        setActionFeedback(`Error requesting research: ${res.error}`);
      } else {
        setTimeout(() => setActionFeedback(null), 3000);
      }
    });
  }, [currentProspect, isPending, removeCurrentAndAdvance]);

  const handleSkip = React.useCallback(() => {
    if (prospects.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % prospects.length);
  }, [prospects.length]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing into an input, textarea, or select
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea" || activeTag === "select") {
        return;
      }
      if (showRejectModal || isPending || !currentProspect) return;

      if (e.key === "a" || e.key === "A") {
        e.preventDefault();
        handleApprove();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        setShowRejectModal(true);
      } else if (e.key === "w" || e.key === "W") {
        e.preventDefault();
        handleWatch();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        handleResearchMore();
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        handleSkip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentProspect, handleApprove, handleResearchMore, handleSkip, handleWatch, isPending, showRejectModal]);

  if (prospects.length === 0) {
    return (
      <div className="p-12 bg-[#0D0D0D] border border-white/10 rounded-[2px] text-center space-y-4">
        <div className="w-12 h-12 bg-avorria-signal/10 border border-avorria-signal/30 rounded-[2px] flex items-center justify-center mx-auto text-avorria-signal">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="font-mono text-sm font-bold uppercase tracking-widest text-avorria-white">
          REVIEW QUEUE COMPLETE
        </div>
        <p className="font-mono text-xs text-avorria-muted max-w-md mx-auto leading-relaxed">
          All qualified prospects have been reviewed by the operator. Deep research jobs have been queued for approved candidates.
        </p>
        <div className="pt-4 flex items-center justify-center gap-4">
          <Link
            href="/admin/prospects"
            className="px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/20 font-mono text-xs text-avorria-white uppercase tracking-wider rounded-[2px]"
          >
            View Prospect Database
          </Link>
          <Link
            href="/admin/automations"
            className="px-4 py-2 bg-avorria-signal hover:bg-[#b5dc2d] font-mono text-xs text-black font-bold uppercase tracking-wider rounded-[2px]"
          >
            Monitor Job Queue
          </Link>
        </div>
      </div>
    );
  }

  const business = currentProspect.business;
  const assessment = currentProspect.assessment;

  return (
    <div className="space-y-6">
      {/* Header bar with counter & mode toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs uppercase tracking-widest text-avorria-white">
            PROSPECT <span className="text-avorria-signal font-bold">{currentIndex + 1}</span> OF{" "}
            <span className="font-bold">{prospects.length}</span>
          </div>
          {actionFeedback && (
            <div className="px-2.5 py-0.5 bg-avorria-signal/15 border border-avorria-signal/30 text-avorria-signal font-mono text-[10px] uppercase tracking-wider rounded-[2px] animate-fade-in">
              {actionFeedback}
            </div>
          )}
        </div>

        {/* View Mode Toggle & Hotkey reminder */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="hidden lg:flex items-center gap-2 text-[10px] text-avorria-quiet border-r border-white/10 pr-3">
            <span>SHORTCUTS:</span>
            <kbd className="px-1 py-0.5 bg-white/10 text-avorria-white rounded">A</kbd> Approve
            <kbd className="px-1 py-0.5 bg-white/10 text-avorria-white rounded">R</kbd> Reject
            <kbd className="px-1 py-0.5 bg-white/10 text-avorria-white rounded">W</kbd> Watch
            <kbd className="px-1 py-0.5 bg-white/10 text-avorria-white rounded">M</kbd> Research
            <kbd className="px-1 py-0.5 bg-white/10 text-avorria-white rounded">S</kbd> Skip
          </div>

          <div className="flex bg-white/5 border border-white/10 p-0.5 rounded-[2px]">
            <button
              onClick={() => setViewMode("focused")}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-[2px] transition-colors ${
                viewMode === "focused" ? "bg-white/15 text-avorria-white font-bold" : "text-avorria-muted hover:text-white"
              }`}
            >
              Focused
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-[2px] transition-colors ${
                viewMode === "table" ? "bg-white/15 text-avorria-white font-bold" : "text-avorria-muted hover:text-white"
              }`}
            >
              Table List
            </button>
          </div>
        </div>
      </div>

      {viewMode === "focused" ? (
        /* FOCUSED SINGLE-CARD OPERATOR MODE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Inspection Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Prospect Identity Header */}
            <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-avorria-signal">
                    {business?.sector || "Commercial Sector"}
                  </div>
                  <h2 className="font-display font-black text-2xl uppercase tracking-tight text-avorria-white mt-1">
                    {business?.company_name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-avorria-muted mt-2">
                    <span>{business?.city || "United Kingdom"}, {business?.country}</span>
                    <span className="text-white/20">•</span>
                    {business?.website_url && (
                      <a
                        href={business.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-avorria-signal hover:underline inline-flex items-center gap-1"
                      >
                        {business.domain || business.website_url}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Opportunity Score Indicator */}
                <div className="p-3 bg-[#141414] border border-white/15 rounded-[2px] text-right shrink-0">
                  <div className="font-mono text-[9px] uppercase tracking-wider text-avorria-muted">
                    OPPORTUNITY
                  </div>
                  <div className="font-mono text-3xl font-black text-avorria-signal">
                    {currentProspect.opportunity_score}
                  </div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-wider text-avorria-white">
                    {assessment?.opportunity_band || "PRIORITY"}
                  </div>
                </div>
              </div>

              {/* Reputation & Google Review signals */}
              {business?.google_rating && (
                <div className="pt-3 border-t border-white/10 flex items-center gap-4 font-mono text-xs">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{business.google_rating.toFixed(1)}</span>
                  </div>
                  <span className="text-avorria-muted">
                    ({business.google_review_count || 0} Google Reviews)
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-emerald-400 font-mono text-[11px] uppercase">
                    Commercial Solvency Verified
                  </span>
                </div>
              )}
            </div>

            {/* AI Assessment & Commercial Reasoning */}
            <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
                <Sparkles className="w-4 h-4 text-avorria-signal" />
                <span>AI STRATEGIC ASSESSMENT</span>
              </div>
              <p className="font-mono text-xs text-avorria-white/90 leading-relaxed bg-[#121212] p-4 border border-white/5 rounded-[2px]">
                {assessment?.ai_summary}
              </p>
              <div className="font-mono text-[11px] text-avorria-muted leading-relaxed">
                <span className="text-avorria-signal uppercase font-bold">REASONING: </span>
                {assessment?.ai_reasoning_summary}
              </div>
            </div>

            {/* Identified Problems on Current Website */}
            <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  CURRENT WEBSITE DEFICIENCIES
                </span>
                <span className="text-[10px] text-avorria-muted font-normal font-mono">
                  Platform: {assessment?.website_platform || "Custom/Legacy"}
                </span>
              </div>

              <div className="space-y-2.5">
                {assessment?.identified_problems.map((prob) => (
                  <div 
                    key={prob.id}
                    className="p-3 bg-[#121212] border border-white/5 rounded-[2px] space-y-1 font-mono"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-avorria-white">{prob.title}</span>
                      <span className={`text-[9px] uppercase px-1.5 py-0.5 font-bold rounded-[2px] ${
                        prob.severity === "critical"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30"
                          : prob.severity === "high"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-white/5 text-avorria-muted"
                      }`}>
                        {prob.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-avorria-muted leading-relaxed">
                      {prob.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Score Breakdown & Decision Control Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Score Breakdown Radar/Metrics */}
            <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white">
                HEURISTIC SCORE BREAKDOWN
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-avorria-muted">Website Quality Deficit</span>
                    <span className="text-avorria-white font-bold">{100 - (assessment?.website_quality_score || 50)}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-avorria-signal" 
                      style={{ width: `${100 - (assessment?.website_quality_score || 50)}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-avorria-muted">Mobile Viewport Gap</span>
                    <span className="text-avorria-white font-bold">{100 - (assessment?.mobile_score || 50)}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-400" 
                      style={{ width: `${100 - (assessment?.mobile_score || 50)}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-avorria-muted">Conversion Architecture Gap</span>
                    <span className="text-avorria-white font-bold">{100 - (assessment?.conversion_score || 50)}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-400" 
                      style={{ width: `${100 - (assessment?.conversion_score || 50)}%` }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="text-avorria-muted">Commercial Solvency & Trust</span>
                    <span className="text-avorria-white font-bold">{assessment?.trust_score || 75}/100</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400" 
                      style={{ width: `${assessment?.trust_score || 75}%` }} 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Proposed Features for Avorria Redesign Pitch */}
            <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-[2px] space-y-4">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-avorria-signal" />
                <span>RECOMMENDED AVORRIA MODULES</span>
              </div>

              <div className="space-y-2">
                {assessment?.recommended_features.map((feat) => (
                  <div 
                    key={feat.id}
                    className="p-2.5 bg-[#121212] border border-white/5 rounded-[2px] font-mono text-xs"
                  >
                    <div className="flex items-center justify-between font-bold text-avorria-white">
                      <span>{feat.name}</span>
                      <span className="text-[9px] uppercase px-1 py-0.5 bg-avorria-signal/15 text-avorria-signal rounded-[2px]">
                        {feat.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-avorria-muted mt-1">
                      {feat.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* OPERATOR DECISION CONSOLE */}
            <div className="p-6 bg-[#111111] border border-avorria-signal/40 rounded-[2px] space-y-4 shadow-xl">
              <div className="font-mono text-xs font-bold uppercase tracking-widest text-avorria-signal flex items-center justify-between">
                <span>OPERATOR DECISION</span>
                <span className="text-[10px] text-avorria-muted">HOTKEYS ACTIVE</span>
              </div>

              <div className="space-y-2.5">
                {/* Approve Button */}
                <button
                  onClick={handleApprove}
                  disabled={isPending}
                  className="w-full py-3 bg-avorria-signal hover:bg-[#b5dc2d] text-black font-mono text-xs font-bold uppercase tracking-widest transition-all rounded-[2px] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>APPROVE → QUEUE DEEP RESEARCH (A)</span>
                </button>

                {/* Reject Button */}
                <button
                  onClick={() => setShowRejectModal(true)}
                  disabled={isPending}
                  className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-xs font-bold uppercase tracking-wider transition-all rounded-[2px] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  <span>REJECT PROSPECT (R)</span>
                </button>

                {/* Watch & Research More Row */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleWatch}
                    disabled={isPending}
                    className="py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-avorria-white font-mono text-[11px] uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>WATCH (W)</span>
                  </button>

                  <button
                    onClick={handleResearchMore}
                    disabled={isPending}
                    className="py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-avorria-white font-mono text-[11px] uppercase tracking-wider rounded-[2px] transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <Search className="w-3.5 h-3.5 text-cyan-400" />
                    <span>RESEARCH (M)</span>
                  </button>
                </div>

                {/* Skip */}
                <button
                  onClick={handleSkip}
                  disabled={isPending || prospects.length <= 1}
                  className="w-full py-1.5 text-avorria-muted hover:text-avorria-white font-mono text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1 disabled:opacity-30"
                >
                  <SkipForward className="w-3 h-3" />
                  <span>SKIP FOR NOW (S)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* TABLE LIST MODE */
        <div className="bg-[#0D0D0D] border border-white/10 rounded-[2px] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-[#141414] border-b border-white/10 text-[10px] uppercase tracking-widest text-avorria-muted">
                <tr>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4 text-center">Score</th>
                  <th className="py-3 px-4 text-center">Rating</th>
                  <th className="py-3 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {prospects.map((p, idx) => (
                  <tr 
                    key={p.id}
                    className={`hover:bg-white/[0.02] transition-colors ${
                      idx === currentIndex ? "bg-white/[0.04]" : ""
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-avorria-white">{p.business?.company_name}</div>
                      <div className="text-[10px] text-avorria-muted">{p.business?.domain}</div>
                    </td>
                    <td className="py-3 px-4 text-avorria-white/80">{p.business?.sector}</td>
                    <td className="py-3 px-4 text-avorria-muted">{p.business?.city || "UK"}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-black text-avorria-signal text-sm">{p.opportunity_score}</span>
                    </td>
                    <td className="py-3 px-4 text-center text-amber-400">
                      {p.business?.google_rating ? `${p.business.google_rating}★` : "—"}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setCurrentIndex(idx);
                          setViewMode("focused");
                        }}
                        className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-avorria-white uppercase text-[10px] rounded-[2px]"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0D0D0D] border border-white/15 p-6 rounded-[2px] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
                <X className="w-4 h-4" />
                <span>REJECT PROSPECT REASON</span>
              </h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-avorria-muted hover:text-avorria-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="font-mono text-xs text-avorria-muted">
              Select the primary disqualification reason for{" "}
              <strong className="text-avorria-white">{business?.company_name}</strong>:
            </p>

            <div className="space-y-2">
              {REJECTION_REASONS.map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-3 p-2.5 bg-[#141414] border rounded-[2px] cursor-pointer font-mono text-xs transition-colors ${
                    selectedRejectReason === r 
                      ? "border-red-500/50 text-avorria-white bg-red-500/10" 
                      : "border-white/5 text-avorria-muted hover:border-white/20"
                  }`}
                >
                  <input
                    type="radio"
                    name="rejectReason"
                    value={r}
                    checked={selectedRejectReason === r}
                    onChange={() => setSelectedRejectReason(r)}
                    className="accent-red-500"
                  />
                  <span className="capitalize">{r}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase text-avorria-muted mb-1">
                Optional Notes
              </label>
              <textarea
                value={rejectNotes}
                onChange={(e) => setRejectNotes(e.target.value)}
                placeholder="Additional context for audit log..."
                className="w-full h-16 bg-[#141414] border border-white/10 p-2 font-mono text-xs text-avorria-white placeholder:text-avorria-quiet rounded-[2px] focus:outline-none focus:border-red-400"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs uppercase rounded-[2px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectSubmit}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 font-mono text-xs text-white font-bold uppercase rounded-[2px]"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Prospect, RejectionReason } from "@/types/admin";
import { 
  approveProspectAction, 
  rejectProspectAction, 
  watchProspectAction, 
  requestResearchAction 
} from "@/app/admin/actions";
import { Check, X, Eye, Search, CheckCircle2 } from "lucide-react";

interface ProspectDetailActionsProps {
  prospect: Prospect;
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

export function ProspectDetailActions({ prospect }: ProspectDetailActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedRejectReason, setSelectedRejectReason] = useState<RejectionReason>("poor fit");
  const [rejectNotes, setRejectNotes] = useState("");

  const handleApprove = () => {
    startTransition(async () => {
      const res = await approveProspectAction(prospect.id);
      if (res.success) {
        setFeedback("Approved & Deep Research Job Queued");
        router.refresh();
      }
    });
  };

  const handleRejectSubmit = () => {
    setShowRejectModal(false);
    startTransition(async () => {
      const res = await rejectProspectAction(prospect.id, selectedRejectReason, rejectNotes);
      if (res.success) {
        setFeedback("Prospect Disqualified / Rejected");
        router.refresh();
      }
    });
  };

  const handleWatch = () => {
    startTransition(async () => {
      const res = await watchProspectAction(prospect.id);
      if (res.success) {
        setFeedback("Moved to Watch list");
        router.refresh();
      }
    });
  };

  const handleResearchMore = () => {
    startTransition(async () => {
      const res = await requestResearchAction(prospect.id);
      if (res.success) {
        setFeedback("Additional Research Queued");
        router.refresh();
      }
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
      {feedback && (
        <div className="px-2.5 py-1 bg-avorria-signal/15 border border-avorria-signal/30 text-avorria-signal text-[11px] rounded-[2px] mr-2">
          {feedback}
        </div>
      )}

      {prospect.status !== "approved" && (
        <button
          onClick={handleApprove}
          disabled={isPending}
          className="px-3 py-1.5 bg-avorria-signal hover:bg-[#b5dc2d] text-black font-bold uppercase tracking-wider rounded-[2px] transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Approve</span>
        </button>
      )}

      {prospect.status !== "rejected" && (
        <button
          onClick={() => setShowRejectModal(true)}
          disabled={isPending}
          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold uppercase tracking-wider rounded-[2px] transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <X className="w-3.5 h-3.5" />
          <span>Reject</span>
        </button>
      )}

      {prospect.status !== "watch" && (
        <button
          onClick={handleWatch}
          disabled={isPending}
          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-avorria-white uppercase tracking-wider rounded-[2px] transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>Watch</span>
        </button>
      )}

      {prospect.status !== "research_requested" && (
        <button
          onClick={handleResearchMore}
          disabled={isPending}
          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-avorria-white uppercase tracking-wider rounded-[2px] transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Research More</span>
        </button>
      )}

      {/* Rejection Reason Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0D0D0D] border border-white/15 p-6 rounded-[2px] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
                <X className="w-4 h-4" />
                <span>DISQUALIFICATION REASON</span>
              </h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-avorria-muted hover:text-avorria-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

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
                    name="rejectReasonDetail"
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
                placeholder="Additional audit context..."
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

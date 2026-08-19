import React from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";
import { getReviewQueue } from "@/lib/db/repository";
import { ReviewQueueView } from "@/components/admin/ReviewQueueView";
import { CheckSquare, ArrowLeft, Sliders, Shield } from "lucide-react";

export default async function DailyReviewQueuePage() {
  await requireAdmin();
  const queue = await getReviewQueue();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-avorria-signal mb-1">
            <Link href="/admin/ai-auto" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> AI AUTO
            </Link>
            <span className="text-white/20">/</span>
            <span>DECISION GATEWAY</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-avorria-white leading-none">
            DAILY PROSPECT REVIEW QUEUE
          </h1>
          <p className="font-mono text-xs text-avorria-muted uppercase tracking-wider mt-1">
            High-speed operator decision console. Approve candidates to trigger automated deep research.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/ai-auto/settings"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-avorria-white font-mono text-xs uppercase tracking-wider rounded-[2px] transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-avorria-signal" />
            <span>Targeting Rules</span>
          </Link>
        </div>
      </div>

      {/* Interactive Review View */}
      <ReviewQueueView prospects={queue} />
    </div>
  );
}

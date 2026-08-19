"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, FileText, CheckCircle2, DollarSign } from "lucide-react";

export default function PipelineOpportunityPage() {
  const params = useParams<{ id: string }>();

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <Link href="/admin/pipeline" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Pipeline Overview
          </Link>
          <h1 className="text-2xl font-bold">Opportunity: Apex Autocare Ltd</h1>
          <p className="text-sm text-white/50">Deal ID: {params?.id ? String(params.id).slice(0, 8) : "—"}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/pipeline/${params?.id}/proposal`}
            className="bg-white text-black font-semibold text-xs px-4 py-2 rounded flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" /> Prepare Proposal
          </Link>
        </div>
      </div>

      {/* 2-Column Workspace */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left 2 Cols: Details & Timeline */}
        <div className="col-span-2 space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-lg p-6 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Deal Summary</h2>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-white/40 block">Estimated Value</span>
                <span className="text-lg font-bold text-white mt-1 block">£1,850</span>
              </div>
              <div>
                <span className="text-white/40 block">Proposed Package</span>
                <span className="text-sm font-semibold text-emerald-400 mt-1 block">Growth Studio Tier</span>
              </div>
              <div>
                <span className="text-white/40 block">Opportunity Score</span>
                <span className="text-lg font-bold text-white mt-1 block">85/100</span>
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/10 rounded-lg p-6 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">Sales Conversation & Outreach Log</h2>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white/5 rounded border border-white/10">
                <div className="flex justify-between text-white/40 mb-1">
                  <span>Outbound Outreach Sent</span>
                  <span>Yesterday at 10:14</span>
                </div>
                <p className="text-white/80">Concept link delivered to director@apexautocare.co.uk. Concept viewed 3 times.</p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded border border-emerald-500/20">
                <div className="flex justify-between text-emerald-400 mb-1 font-semibold">
                  <span>Positive Reply Received</span>
                  <span>Today at 09:30</span>
                </div>
                <p className="text-white/90">&ldquo;Hi Pete, we looked at the preview website and we really like the design. What are the next steps to get this live?&rdquo;</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Quick Actions */}
        <div className="space-y-6">
          <div className="bg-[#111] border border-white/10 rounded-lg p-6 space-y-4 text-xs">
            <h3 className="font-semibold uppercase tracking-wider text-white/50">Next Commercial Action</h3>
            <p className="text-white/70">Prospect replied positively and requested pricing and next steps.</p>
            <div className="space-y-2 pt-2">
              <Link
                href={`/admin/pipeline/${params?.id}/proposal`}
                className="w-full bg-white text-black font-semibold py-2 px-3 rounded flex items-center justify-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" /> Send Proposal (£1,850)
              </Link>
              <button className="w-full bg-white/10 hover:bg-white/20 font-medium py-2 px-3 rounded flex items-center justify-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> Draft Direct Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

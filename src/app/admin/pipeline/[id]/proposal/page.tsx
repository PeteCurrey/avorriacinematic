"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle, Eye } from "lucide-react";

export default function ProposalBuilderPage() {
  const params = useParams<{ id: string }>();
  const [price, setPrice] = useState("1850");
  const [packageName, setPackageName] = useState("Avorria Growth Studio");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 text-white">
      <div>
        <Link href={`/admin/pipeline/${params?.id}`} className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Opportunity
        </Link>
        <h1 className="text-2xl font-bold">Proposal Builder: Apex Autocare Ltd</h1>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-lg p-6 space-y-6 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 block mb-1">Package Tier</label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full bg-black border border-white/10 p-2.5 rounded text-white font-medium"
            />
          </div>
          <div>
            <label className="text-white/50 block mb-1">Proposed Total (£)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-black border border-white/10 p-2.5 rounded text-white font-medium"
            />
          </div>
        </div>

        <div>
          <label className="text-white/50 block mb-1">Deliverables & Scope</label>
          <div className="p-4 bg-black/40 border border-white/10 rounded space-y-2 text-white/80">
            <div>✓ Bespoke responsive website concept converted to production</div>
            <div>✓ 4 Core Pages (Home, Services, About, Contact & Booking)</div>
            <div>✓ Digital reputation integration & Google Reviews showcase</div>
            <div>✓ On-page SEO optimisation & metadata configuration</div>
            <div>✓ 1 Year High-Performance Cloud Hosting included</div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-white/10">
          <Link
            href="/proposal/demo-token"
            target="_blank"
            className="text-white/60 hover:text-white flex items-center gap-1 text-xs"
          >
            <Eye className="w-3.5 h-3.5" /> Preview Client View
          </Link>
          <button
            onClick={handleSend}
            disabled={sent}
            className="bg-white text-black font-semibold px-6 py-2.5 rounded flex items-center gap-2 disabled:opacity-50"
          >
            {sent ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <Send className="w-4 h-4" />}
            {sent ? "Proposal Sent Successfully" : "Send Formal Proposal"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, TrendingUp, CheckCircle2 } from "lucide-react";

export default function InboundLeadDetailPage() {
  const params = useParams<{ id: string }>();
  const [converted, setConverted] = useState(false);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 text-white text-xs">
      <div>
        <Link href="/admin/leads" className="text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Inbound Leads
        </Link>
        <h1 className="text-2xl font-bold">Enquiry: Apex Precision Engineering</h1>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-white/40 block">Contact Name</span>
            <span className="font-bold text-white text-sm">Marcus Vance</span>
          </div>
          <div>
            <span className="text-white/40 block">Email Address</span>
            <span className="font-mono text-white text-sm">m.vance@apexprecision.co.uk</span>
          </div>
        </div>

        <div className="pt-2">
          <span className="text-white/40 block mb-1">Enquiry Message</span>
          <p className="p-3 bg-white/5 rounded text-white/80 leading-relaxed">
            &quot;We need a complete redesign of our engineering consultancy site and a private portal for client CAD drawings.&quot;
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex justify-between items-center">
          <span className="text-emerald-400 font-bold">Attribution: LinkedIn Campaign &rarr; /start-project</span>
          <button
            onClick={() => setConverted(true)}
            disabled={converted}
            className="bg-white text-black font-semibold px-4 py-2 rounded flex items-center gap-1.5 disabled:opacity-50"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            {converted ? "Converted to Opportunity" : "Convert to Sales Opportunity"}
          </button>
        </div>
      </div>
    </div>
  );
}

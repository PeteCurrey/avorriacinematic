"use client";
import React from "react";
import Link from "next/link";
import { FolderKanban, CheckCircle2, Eye, Plus, ArrowRight } from "lucide-react";

export default function CaseStudiesAdminPage() {
  const caseStudies = [
    { slug: "alkota-bikes", client: "Alkota Bikes", title: "Custom Frame Builder Digital Commerce", sector: "Specialist Manufacturing", status: "published", featured: true, uplift: "+180% Enquiries" },
    { slug: "careeros", client: "CareerOS", title: "AI-Powered Career Intelligence Platform", sector: "SaaS & AI Systems", status: "published", featured: true, uplift: "45k Active Users" },
    { slug: "nestiq", client: "Nestiq Luxury Estates", title: "Architectural Property Portfolio", sector: "High-End Real Estate", status: "published", featured: true, uplift: "£14m Transacted" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <FolderKanban className="w-3.5 h-3.5" /> Commercial Proof
          </div>
          <h1 className="text-3xl font-extrabold">Case Studies Management</h1>
          <p className="text-sm text-white/50 mt-1">Structured project narratives, verifiable commercial metrics, and client quotes.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 text-xs">
        {caseStudies.map((cs) => (
          <div key={cs.slug} className="bg-[#111] border border-white/10 rounded-xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{cs.sector}</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-bold">
                  {cs.status.toUpperCase()}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{cs.client}</h3>
              <p className="text-white/60 leading-relaxed">{cs.title}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-between items-center">
              <span className="font-bold text-white text-xs">{cs.uplift}</span>
              <Link href={`/work/${cs.slug}`} target="_blank" className="text-white/60 hover:text-white flex items-center gap-1">
                <Eye className="w-3 h-3" /> Live Page
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

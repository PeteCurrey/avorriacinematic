"use client";
import React from "react";
import Link from "next/link";
import { Inbox, CheckCircle2, TrendingUp } from "lucide-react";

export default function InboundLeadsPage() {
  const leads = [
    { id: "lead-1", business: "Apex Precision Engineering", contact: "Marcus Vance", email: "m.vance@apexprecision.co.uk", service: "Website & Client Portal", budget: "£3,000–£5,000", score: 85, status: "new" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold">Inbound Project Enquiries</h1>
        <p className="text-sm text-white/50 mt-1">Direct inquiries submitted via the Avorria public website.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">Business</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Service Required</th>
              <th className="p-4">Budget</th>
              <th className="p-4">Lead Score</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {leads.map((l) => (
              <tr key={l.id} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{l.business}</td>
                <td className="p-4">{l.contact}</td>
                <td className="p-4 text-white/80">{l.service}</td>
                <td className="p-4 font-semibold text-emerald-400">{l.budget}</td>
                <td className="p-4 font-bold text-white">{l.score}/100</td>
                <td className="p-4">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                    {l.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Link href={`/admin/leads/${l.id}`} className="text-white/60 hover:text-white font-semibold">
                    Review &rarr;
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function ReceivablesPage() {
  const buckets = [
    { label: "Current (Upcoming)", amount: "£1,850", count: 1, color: "text-white" },
    { label: "1–7 Days Overdue", amount: "£0", count: 0, color: "text-white/40" },
    { label: "8–30 Days Overdue", amount: "£0", count: 0, color: "text-white/40" },
    { label: "31–60 Days Overdue", amount: "£0", count: 0, color: "text-white/40" },
    { label: "60+ Days Overdue", amount: "£0", count: 0, color: "text-white/40" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/finance" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Finance Command
        </Link>
        <h1 className="text-2xl font-bold">Outstanding Receivables & Payment Ageing</h1>
        <p className="text-sm text-white/50">Track pending milestone invoices, due dates, and payment ageing buckets.</p>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {buckets.map((b) => (
          <div key={b.label} className="bg-[#111] border border-white/10 rounded-xl p-4 space-y-1">
            <span className="text-[10px] text-white/40 uppercase font-semibold block">{b.label}</span>
            <div className={`text-xl font-bold ${b.color}`}>{b.amount}</div>
            <span className="text-[10px] text-white/40">{b.count} invoices</span>
          </div>
        ))}
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs">
        <div className="p-5 border-b border-white/10 flex justify-between items-center">
          <span className="font-semibold text-sm">Active Invoices</span>
          <span className="text-white/40">Total Outstanding: £1,850</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">Client</th>
              <th className="p-4">Milestone</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Due Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.02]">
              <td className="p-4 font-bold text-white">Apex Autocare Ltd</td>
              <td className="p-4 text-white/70">Final Launch Balance (50%)</td>
              <td className="p-4 font-bold text-white">£925.00</td>
              <td className="p-4 text-white/60">2026-08-28 (In 8 days)</td>
              <td className="p-4">
                <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded text-[10px] font-bold">
                  UPCOMING
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

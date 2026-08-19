"use client";
import React from "react";
import { Bell, CheckCircle2, ShieldAlert } from "lucide-react";

export default function NotificationsPage() {
  const notifs = [
    { title: "Proposal Accepted: Apex Autocare Ltd", summary: "Commercial proposal (£1,850) was accepted online.", severity: "CRITICAL", time: "1 hour ago" },
    { title: "New High-Value Inbound Lead", summary: "Marcus Vance from Apex Precision Engineering submitted a £3,000–£5,000 enquiry.", severity: "HIGH", time: "3 hours ago" },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 text-white text-xs">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold">Operational Notifications</h1>
        <p className="text-sm text-white/50 mt-1">High-priority operational alerts and commercial milestones.</p>
      </div>

      <div className="space-y-3">
        {notifs.map((n, i) => (
          <div key={i} className={`p-4 rounded-xl border flex justify-between items-center ${n.severity === "CRITICAL" ? "bg-red-500/10 border-red-500/20" : "bg-white/5 border-white/10"}`}>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${n.severity === "CRITICAL" ? "bg-red-500/20 text-red-400" : "bg-amber-500/20 text-amber-400"}`}>
                  {n.severity}
                </span>
                <span className="font-bold text-sm text-white">{n.title}</span>
              </div>
              <p className="text-white/70 mt-1">{n.summary}</p>
            </div>
            <span className="text-white/40 text-[10px] shrink-0 ml-4">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import React from "react";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";

export default function ServicesFinancePage() {
  const services = [
    { name: "Bespoke Commercial Websites", units: 4, revenue: "£7,400", aov: "£1,850", deliveryDays: "5.2 days", unitCost: "£110", contribution: "£6,960", margin: "94.1%" },
    { name: "Digital Products & Custom Portals", units: 1, revenue: "£4,500", aov: "£4,500", deliveryDays: "14.0 days", unitCost: "£420", contribution: "£4,080", margin: "90.7%" },
    { name: "Hosting, SEO & Maintenance Retainers", units: 5, revenue: "£340/mo", aov: "£68/mo", deliveryDays: "0.5 days", unitCost: "£8/mo", contribution: "£300/mo", margin: "88.2%" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div>
        <Link href="/admin/finance" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" /> Return to Finance Command
        </Link>
        <h1 className="text-2xl font-bold">Service Economics & Delivery Margins</h1>
        <p className="text-sm text-white/50">Performance across Avorria&apos;s commercial offerings.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">Service Offering</th>
              <th className="p-4">Units Sold</th>
              <th className="p-4">Total Revenue</th>
              <th className="p-4">Average Value</th>
              <th className="p-4">Delivery Turnaround</th>
              <th className="p-4">Contribution</th>
              <th className="p-4">Margin %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {services.map((s) => (
              <tr key={s.name} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{s.name}</td>
                <td className="p-4">{s.units}</td>
                <td className="p-4 font-bold text-white">{s.revenue}</td>
                <td className="p-4 text-white/70">{s.aov}</td>
                <td className="p-4 text-white/60">{s.deliveryDays}</td>
                <td className="p-4 font-bold text-emerald-400">{s.contribution}</td>
                <td className="p-4 text-emerald-400 font-bold">{s.margin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

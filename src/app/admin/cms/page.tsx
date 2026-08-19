"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FileText, Globe, Eye, Plus, CheckCircle, Clock } from "lucide-react";

export default function CMSOverviewPage() {
  const pages = [
    { title: "Homepage", slug: "/", type: "homepage", status: "published", updated: "Today at 14:20", template: "cinematic_home" },
    { title: "Capabilities & Systems", slug: "/capabilities", type: "standard", status: "published", updated: "Yesterday", template: "editorial" },
    { title: "Selected Work & Case Studies", slug: "/work", type: "portfolio", status: "published", updated: "3 days ago", template: "gallery" },
    { title: "Intelligence & Articles", slug: "/intelligence", type: "editorial", status: "published", updated: "5 days ago", template: "insights_grid" },
    { title: "Start a Project Enquiry", slug: "/start-project", type: "form", status: "published", updated: "1 week ago", template: "interactive_form" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div className="flex justify-between items-start border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <Globe className="w-3.5 h-3.5" /> Avorria Website CMS
          </div>
          <h1 className="text-3xl font-extrabold">Public Content Management</h1>
          <p className="text-sm text-white/50 mt-1">Structured, version-controlled editing for the public Avorria web platform.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/cms/global" className="bg-white/10 hover:bg-white/20 text-xs font-semibold px-4 py-2 rounded">
            Global Content
          </Link>
          <Link href="/admin/cms/navigation" className="bg-white/10 hover:bg-white/20 text-xs font-semibold px-4 py-2 rounded">
            Navigation Menu
          </Link>
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs">
        <div className="p-5 border-b border-white/10 flex justify-between items-center">
          <span className="font-semibold text-sm">Published Pages (5)</span>
          <span className="text-white/40">Design framework: Next.js + Tailwind</span>
        </div>
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">Page Title</th>
              <th className="p-4">Route Path</th>
              <th className="p-4">Template</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Modified</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {pages.map((p) => (
              <tr key={p.slug} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5 text-white/50" />
                  {p.title}
                </td>
                <td className="p-4 font-mono text-white/70">{p.slug}</td>
                <td className="p-4 font-mono text-white/50">{p.template}</td>
                <td className="p-4">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                    {p.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-white/40">{p.updated}</td>
                <td className="p-4 text-right">
                  <Link href={p.slug} target="_blank" className="text-white/60 hover:text-white inline-flex items-center gap-1 font-semibold">
                    <Eye className="w-3 h-3" /> Live View
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

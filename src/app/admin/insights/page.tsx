"use client";
import React from "react";
import Link from "next/link";
import { FileText, Eye, CheckCircle2 } from "lucide-react";

export default function InsightsAdminPage() {
  const articles = [
    { slug: "why-most-website-redesigns-destroy-search-value", title: "Why Most Website Redesigns Destroy Search Value", type: "article", status: "published", author: "Pete Currey", views: "1.4k" },
    { slug: "the-problem-with-putting-ai-in-everything", title: "The Problem with Putting AI in Everything", type: "opinion", status: "published", author: "Pete Currey", views: "2.8k" },
    { slug: "your-website-is-infrastructure", title: "Your Website Is Infrastructure, Not Marketing Decoration", type: "article", status: "published", author: "Pete Currey", views: "950" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 text-white">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl font-extrabold">Insights & Thought Leadership</h1>
        <p className="text-sm text-white/50 mt-1">Editorial publications, SEO articles, and engineering guides.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 uppercase font-semibold text-[10px]">
            <tr>
              <th className="p-4">Article Title</th>
              <th className="p-4">Type</th>
              <th className="p-4">Author</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {articles.map((a) => (
              <tr key={a.slug} className="hover:bg-white/[0.02]">
                <td className="p-4 font-bold text-white">{a.title}</td>
                <td className="p-4 font-mono text-white/50 uppercase text-[10px]">{a.type}</td>
                <td className="p-4 text-white/70">{a.author}</td>
                <td className="p-4">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                    {a.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Link href={`/intelligence/${a.slug}`} target="_blank" className="text-white/60 hover:text-white inline-flex items-center gap-1 font-semibold">
                    <Eye className="w-3 h-3" /> Live
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

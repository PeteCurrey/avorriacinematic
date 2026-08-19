"use client";
import React, { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export default function ClientProposalView() {
  const [accepted, setAccepted] = useState(false);
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");

  const handleAccept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName || !signerEmail) return;
    setAccepted(true);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white py-16 px-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Brand Header */}
        <div className="border-b border-white/10 pb-8 flex justify-between items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1">Commercial Proposal</div>
            <h1 className="text-3xl font-extrabold">Website Development & Launch</h1>
            <p className="text-sm text-white/50 mt-1">Prepared for Apex Autocare Ltd by Avorria</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/40">Total Investment</div>
            <div className="text-2xl font-bold text-white">£1,850</div>
          </div>
        </div>

        {/* Scope Cards */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-base font-bold">Scope of Work</h2>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Conversion of approved cinematic design concept into production-ready web application</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Full responsive optimization across desktop, tablet, and mobile</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Google Reviews integration and custom MOT & service enquiry flows</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>SSL configuration, DNS migration assistance, and 12 months premium managed hosting</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Acceptance Section */}
        {!accepted ? (
          <form onSubmit={handleAccept} className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-semibold">Accept Proposal & Authorise Project</h3>
            <p className="text-xs text-white/50">
              By confirming below, you accept the commercial proposal terms and initiate client onboarding with Avorria.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                required
                className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30"
              />
              <input
                type="email"
                placeholder="Business Email"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                required
                className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded text-sm transition-colors"
            >
              Accept Proposal & Proceed to Onboarding (£1,850)
            </button>
          </form>
        ) : (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4">
            <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Proposal Accepted</h3>
            <p className="text-sm text-white/70 max-w-md mx-auto">
              Thank you {signerName}. Your project has been authorised. Our onboarding team has sent direct access to your client portal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

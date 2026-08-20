"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, AlertTriangle, Loader2 } from "lucide-react";
import type { Proposal } from "@/types/proposals";

interface ProposalClientProps {
  proposal: Pick<
    Proposal,
    | "token"
    | "business_name"
    | "title"
    | "summary"
    | "scope"
    | "total_minor"
    | "deposit_minor"
    | "currency"
    | "status"
    | "payment_status"
    | "signed_by_name"
  >;
  depositOutcome?: "success" | "cancelled";
}

function formatMoney(minor: number, currency: string): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency,
    minimumFractionDigits: minor % 100 === 0 ? 0 : 2,
  }).format(minor / 100);
}

export function ProposalClient({ proposal, depositOutcome }: ProposalClientProps) {
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isPaid = proposal.payment_status === "paid";
  const total = formatMoney(proposal.total_minor, proposal.currency);
  const deposit = formatMoney(proposal.deposit_minor, proposal.currency);

  const handleAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName || !signerEmail || submitting) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/proposals/${proposal.token}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signerName, signerEmail }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "We could not process that. Please try again.");
        setSubmitting(false);
        return;
      }

      if (data.paymentUrl) {
        // Hand off to the payment provider's hosted checkout.
        window.location.href = data.paymentUrl;
        return;
      }

      // Already paid, or accepted with nothing further to collect.
      window.location.reload();
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white py-16 px-6 font-sans">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Brand Header */}
        <div className="border-b border-white/10 pb-8 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1">
              Commercial Proposal
            </div>
            <h1 className="text-3xl font-extrabold">{proposal.title}</h1>
            <p className="text-sm text-white/50 mt-1">
              Prepared for {proposal.business_name} by Avorria
            </p>
          </div>
          <div className="sm:text-right shrink-0">
            <div className="text-xs text-white/40">Total Investment</div>
            <div className="text-2xl font-bold text-white">{total}</div>
            <div className="text-xs text-white/40 mt-1">{deposit} deposit to begin</div>
          </div>
        </div>

        {proposal.summary && (
          <p className="text-sm text-white/70 leading-relaxed">{proposal.summary}</p>
        )}

        {/* Scope */}
        {proposal.scope.length > 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
            <h2 className="text-base font-bold">Scope of Work</h2>
            <ul className="space-y-2.5 text-sm text-white/80">
              {proposal.scope.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>
                    {item.label}
                    {item.detail && <span className="text-white/50"> — {item.detail}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {depositOutcome === "cancelled" && !isPaid && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-sm text-white/80">
              Checkout was cancelled and no payment was taken. Your acceptance is still on
              record — you can complete the deposit whenever you are ready.
            </p>
          </div>
        )}

        {/* Acceptance / confirmation */}
        {isPaid ? (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4">
            <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Deposit Received</h3>
            <p className="text-sm text-white/70 max-w-md mx-auto">
              Thank you{proposal.signed_by_name ? ` ${proposal.signed_by_name}` : ""}. Your
              deposit has been received and your project is authorised. A member of the Avorria
              team will be in touch directly to begin onboarding.
            </p>
          </div>
        ) : depositOutcome === "success" ? (
          // Stripe redirects back before the webhook necessarily lands. Never
          // claim payment on the strength of a redirect the client controls.
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center space-y-4">
            <Loader2 className="w-10 h-10 text-emerald-400 mx-auto animate-spin" />
            <h3 className="text-lg font-bold text-white">Confirming your payment</h3>
            <p className="text-sm text-white/60 max-w-md mx-auto">
              Your payment is being confirmed by our provider. This page will show the receipt
              once it clears — you can safely close this window, and we will email you either way.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleAccept}
            className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4"
          >
            <h3 className="text-base font-semibold">Accept Proposal &amp; Authorise Project</h3>
            <p className="text-xs text-white/50">
              By confirming below you accept the commercial proposal terms. You will then be taken
              to our payment provider to pay the {deposit} deposit — no card details are handled
              by Avorria.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                required
                maxLength={120}
                autoComplete="name"
                className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30"
              />
              <input
                type="email"
                placeholder="Business Email"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                required
                maxLength={200}
                autoComplete="email"
                className="bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-white/30"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-sm text-amber-300">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold py-3 rounded text-sm transition-colors inline-flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>
                {submitting
                  ? "Opening secure checkout…"
                  : `Accept Proposal & Pay ${deposit} Deposit`}
              </span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

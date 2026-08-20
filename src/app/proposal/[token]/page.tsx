import React from "react";
import type { Metadata } from "next";
import { markProposalViewed, isExpired } from "@/lib/db/proposals-repository";
import { ProposalClient } from "./ProposalClient";

/**
 * CLIENT PROPOSAL VIEW — /proposal/[token]
 *
 * Server-rendered from the proposal's opaque token. Only the fields the client
 * needs are passed to the browser; internal ids, prospect linkage and pipeline
 * metadata stay on the server.
 */

// Proposal state changes on acceptance and on webhook confirmation.
export const dynamic = "force-dynamic";

// A proposal link is private and must never be indexed or previewed.
export const metadata: Metadata = {
  title: "Commercial Proposal — Avorria",
  robots: { index: false, follow: false, nocache: true },
};

export default async function ProposalPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ deposit?: string }>;
}) {
  const { token } = await params;
  const { deposit } = await searchParams;

  const proposal = await markProposalViewed(token);

  if (!proposal || proposal.status === "draft") {
    return <ProposalUnavailable reason="This proposal link is not valid." />;
  }
  if (proposal.status === "declined") {
    return <ProposalUnavailable reason="This proposal has been declined." />;
  }
  if (isExpired(proposal)) {
    return (
      <ProposalUnavailable reason="This proposal has expired. Please contact us for an updated version." />
    );
  }

  const depositOutcome =
    deposit === "success" ? "success" : deposit === "cancelled" ? "cancelled" : undefined;

  return (
    <ProposalClient
      proposal={{
        token: proposal.token,
        business_name: proposal.business_name,
        title: proposal.title,
        summary: proposal.summary,
        scope: proposal.scope,
        total_minor: proposal.total_minor,
        deposit_minor: proposal.deposit_minor,
        currency: proposal.currency,
        status: proposal.status,
        payment_status: proposal.payment_status,
        signed_by_name: proposal.signed_by_name,
      }}
      depositOutcome={depositOutcome}
    />
  );
}

function ProposalUnavailable({ reason }: { reason: string }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-6 font-sans">
      <div className="max-w-md text-center space-y-4">
        <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
          Avorria
        </div>
        <h1 className="text-2xl font-bold">Proposal unavailable</h1>
        <p className="text-sm text-white/60">{reason}</p>
        <a
          href="mailto:enquiries@avorria.com"
          className="inline-block text-sm text-emerald-400 hover:text-emerald-300 border-b border-emerald-400/40 pb-0.5"
        >
          enquiries@avorria.com
        </a>
      </div>
    </div>
  );
}

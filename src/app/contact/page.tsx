import React from "react";
import Link from "next/link";
import { STUDIO_INFO } from "@/content/studio";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Contact — Commission Enquiries & Studio Communications | Avorria",
  description: "Direct contact for new project commissions, strategic enquiries, and studio communications. Avorria responds to all qualified project briefs.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 pt-32 pb-24">
      <div className="border-b border-avorria-line pb-12 mb-16">
        <h1 className="display-lg uppercase text-avorria-white">Contact</h1>
        <p className="font-mono text-sm text-avorria-muted uppercase tracking-wider mt-4 max-w-xl">
          Direct studio communications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
        <div className="p-8 border border-avorria-line bg-avorria-surface">
          <span className="font-mono text-xs text-avorria-muted uppercase tracking-widest">
            New Commissions
          </span>
          <p className="font-display font-bold text-xl text-avorria-white mt-4 mb-2">
            Project Enquiry Form
          </p>
          <p className="font-body text-sm text-avorria-muted mb-6">
            For structured brief evaluation, timeline planning, and project quotes.
          </p>
          <Link
            href="/start-project"
            className="font-mono text-xs uppercase tracking-widest text-avorria-signal hover:underline"
          >
            Start a Project →
          </Link>
        </div>

        <div className="p-8 border border-avorria-line bg-avorria-surface">
          <span className="font-mono text-xs text-avorria-muted uppercase tracking-widest">
            Direct Studio Email
          </span>
          <p className="font-display font-bold text-xl text-avorria-white mt-4 mb-2">
            General Inquiries
          </p>
          <p className="font-body text-sm text-avorria-muted mb-6">
            Press, academic collaborations, and studio communications.
          </p>
          <a
            href="mailto:enquiries@avorria.com"
            className="font-mono text-xs uppercase tracking-widest text-avorria-signal hover:underline"
          >
            enquiries@avorria.com →
          </a>
        </div>
      </div>
    </div>
  );
}

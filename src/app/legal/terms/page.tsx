import React from "react";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Terms of Service — Avorria",
  description: "Terms governing the use of Avorria's website, intellectual property, and all associated digital assets.",
  path: "/legal/terms"
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-32 pb-24">
      <h1 className="display-md uppercase text-avorria-white mb-8">Terms of Service</h1>
      <div className="font-mono text-xs text-avorria-muted space-y-6 leading-relaxed uppercase tracking-wider">
        <p>All intellectual property, proprietary code, typography, and case studies displayed on this website are protected under international copyright law.</p>
        <p>© {new Date().getFullYear()} Avorria. All rights reserved.</p>
      </div>
    </div>
  );
}

import React from "react";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata = generatePageMetadata({
  title: "Privacy Policy — Avorria",
  description: "Avorria's privacy policy covering how visitor and client data is handled, stored, and protected.",
  path: "/legal/privacy"
});

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-32 pb-24">
      <h1 className="display-md uppercase text-avorria-white mb-8">Privacy Policy</h1>
      <div className="font-mono text-xs text-avorria-muted space-y-6 leading-relaxed uppercase tracking-wider">
        <p>Avorria is committed to protecting the privacy and integrity of client and visitor information.</p>
        <p>We do not sell, rent, or trade personal data to third parties.</p>
        <p>For any questions regarding our data policies, contact privacy@avorria.com.</p>
      </div>
    </div>
  );
}

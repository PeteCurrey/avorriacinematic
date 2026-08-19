"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { STUDIO_INFO } from "@/content/studio";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-avorria-line bg-avorria-black text-avorria-white" role="contentinfo">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Studio Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <Link href="/" className="font-display font-bold text-2xl uppercase tracking-tight">
                Avorria
              </Link>
              <p className="mt-4 font-mono text-xs text-avorria-muted max-w-sm leading-relaxed uppercase tracking-wider">
                {STUDIO_INFO.descriptor}
              </p>
              <p className="mt-2 font-mono text-xs text-avorria-signal">
                {STUDIO_INFO.contact.availability}
              </p>
            </div>
            <div className="mt-8 md:mt-0 font-mono text-[11px] text-avorria-muted">
              © {currentYear} Avorria. All rights reserved.
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-avorria-muted mb-4">
              Index
            </h3>
            <ul className="space-y-2.5 font-mono text-xs">
              <li><Link href="/work" className="text-avorria-white hover:text-avorria-signal transition-colors">Work</Link></li>
              <li><Link href="/services" className="text-avorria-white hover:text-avorria-signal transition-colors">Services</Link></li>
              <li><Link href="/studio" className="text-avorria-white hover:text-avorria-signal transition-colors">Studio</Link></li>
              <li><Link href="/lab" className="text-avorria-white hover:text-avorria-signal transition-colors">Lab</Link></li>
              <li><Link href="/intelligence" className="text-avorria-white hover:text-avorria-signal transition-colors">Intelligence</Link></li>
              <li><Link href="/start-project" className="text-avorria-white hover:text-avorria-signal transition-colors">Start a Project</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-avorria-muted mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 font-mono text-xs">
              <li><Link href="/services/websites" className="text-avorria-white hover:text-avorria-signal transition-colors">01 Websites</Link></li>
              <li><Link href="/services/digital-products" className="text-avorria-white hover:text-avorria-signal transition-colors">02 Digital Products</Link></li>
              <li><Link href="/services/seo" className="text-avorria-white hover:text-avorria-signal transition-colors">03 SEO &amp; Search</Link></li>
              <li><Link href="/services/performance-marketing" className="text-avorria-white hover:text-avorria-signal transition-colors">04 Performance Marketing</Link></li>
              <li><Link href="/services/ai-automation" className="text-avorria-white hover:text-avorria-signal transition-colors">05 AI &amp; Automation</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-avorria-muted mb-4">
              Direct Contact
            </h3>
            <p className="font-mono text-xs text-avorria-white mb-2">
              <a href="mailto:enquiries@avorria.com" className="hover:text-avorria-signal transition-colors">
                enquiries@avorria.com
              </a>
            </p>
            <div className="mt-6 pt-6 border-t border-avorria-line flex gap-4 font-mono text-[11px] text-avorria-muted">
              <Link href="/legal/privacy" className="hover:text-avorria-white transition-colors">Privacy</Link>
              <Link href="/legal/terms" className="hover:text-avorria-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

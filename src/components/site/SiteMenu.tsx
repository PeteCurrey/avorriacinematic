"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Work", href: "/work", code: "01" },
  { label: "Services", href: "/services", code: "02" },
  { label: "Studio", href: "/studio", code: "03" },
  { label: "Lab", href: "/lab", code: "04" },
  { label: "Intelligence", href: "/intelligence", code: "05" },
  { label: "Start a Project", href: "/start-project", code: "06" }
];

const SUB_SERVICES = [
  { label: "01 Websites & Digital Experiences", href: "/services/websites" },
  { label: "02 Digital Products & Software", href: "/services/digital-products" },
  { label: "03 SEO & Organic Growth", href: "/services/seo" },
  { label: "04 Performance Marketing", href: "/services/performance-marketing" },
  { label: "05 AI, Automation & Systems", href: "/services/ai-automation" }
];

const MENU_ID = "mobile-navigation-menu";

export function SiteMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Body scroll lock, Escape key, and focus management
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("scroll-locked");
      const focusTimer = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false);
          triggerRef.current?.focus();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        clearTimeout(focusTimer);
        document.body.classList.remove("scroll-locked");
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.classList.remove("scroll-locked");
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  };

  return (
    <div>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-1.5 px-2.5 font-mono text-[11px] uppercase tracking-widest text-avorria-white border border-avorria-line focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls={MENU_ID}
      >
        <span className="text-avorria-signal" aria-hidden="true">{isOpen ? "×" : "::"}</span>
        <span>{isOpen ? "CLOSE" : "MENU"}</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          id={MENU_ID}
          className="fixed inset-0 top-0 left-0 w-full h-[100dvh] bg-avorria-black z-[95] flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-avorria-line pb-5">
            <Link
              href="/"
              onClick={handleClose}
              className="font-display font-bold text-xl uppercase tracking-tight text-avorria-white focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
            >
              AVORRIA<span className="text-avorria-signal" aria-hidden="true">.</span>
            </Link>
            <button
              onClick={handleClose}
              className="font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white py-1 px-3 border border-avorria-line focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
              aria-label="Close navigation menu"
            >
              CLOSE [ESC]
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="my-auto py-6 flex flex-col gap-4" aria-label="Primary navigation">
            {NAV_ITEMS.map((item, index) => {
              const isServices = item.href === "/services";

              if (isServices) {
                return (
                  <div key={item.href} className="border-b border-avorria-line/40 pb-3">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        href={item.href}
                        onClick={handleClose}
                        className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-avorria-white hover:text-avorria-signal transition-colors"
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setServicesExpanded(!servicesExpanded)}
                        className="p-1 font-mono text-xs text-avorria-signal border border-avorria-line/60"
                        aria-label="Toggle sub-services"
                      >
                        {servicesExpanded ? "−" : "+"}
                      </button>
                    </div>

                    {servicesExpanded && (
                      <div className="pl-3 mt-2 space-y-2 border-l-2 border-avorria-signal/40">
                        {SUB_SERVICES.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={handleClose}
                            className="block font-mono text-xs text-avorria-muted hover:text-avorria-white py-1 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={handleClose}
                  className="group flex items-center justify-between py-2 border-b border-avorria-line/40 text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-avorria-white hover:text-avorria-signal transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-avorria-quiet group-hover:text-avorria-signal" aria-hidden="true">
                    {item.code}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Technical Metadata */}
          <div className="pt-5 border-t border-avorria-line flex flex-col sm:flex-row justify-between gap-3 font-mono text-[11px] text-avorria-quiet uppercase tracking-wider">
            <span>Direct Inquiries: enquiries@avorria.com</span>
            <span aria-hidden="true">Avorria V2.0 / Studio</span>
          </div>
        </div>
      )}
    </div>
  );
}

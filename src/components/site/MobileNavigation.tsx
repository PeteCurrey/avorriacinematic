"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Work", href: "/work", code: "01" },
  { label: "Capabilities", href: "/capabilities", code: "02" },
  { label: "Lab", href: "/lab", code: "03" },
  { label: "Studio", href: "/studio", code: "04" },
  { label: "Intelligence", href: "/intelligence", code: "05" },
  { label: "Start a Project", href: "/start-project", code: "06" }
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("scroll-locked");
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.classList.remove("scroll-locked");
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.classList.remove("scroll-locked");
    }
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 py-1.5 px-2.5 font-mono text-[11px] uppercase tracking-widest text-avorria-white border border-avorria-line focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal"
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        aria-expanded={isOpen}
      >
        <span className="text-avorria-signal">{isOpen ? "×" : "::"}</span>
        <span>{isOpen ? "CLOSE" : "MENU"}</span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 top-0 left-0 w-full h-[100dvh] bg-avorria-black z-[95] flex flex-col justify-between p-8 sm:p-12 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-avorria-line pb-6">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="font-display font-bold text-xl uppercase tracking-tight text-avorria-white"
            >
              AVORRIA<span className="text-avorria-signal">.</span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="font-mono text-xs uppercase tracking-widest text-avorria-muted hover:text-avorria-white py-1 px-3 border border-avorria-line"
            >
              CLOSE [ESC]
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="my-auto py-10 flex flex-col gap-6" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="group flex items-center justify-between py-2 border-b border-avorria-line/40 text-3xl font-display font-bold uppercase tracking-tight text-avorria-white hover:text-avorria-signal transition-colors duration-200"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs text-avorria-quiet group-hover:text-avorria-signal">
                  {item.code}
                </span>
              </Link>
            ))}
          </nav>

          {/* Bottom Technical Metadata */}
          <div className="pt-6 border-t border-avorria-line flex flex-col sm:flex-row justify-between gap-4 font-mono text-[11px] text-avorria-quiet uppercase tracking-wider">
            <span>Direct Inquiries: enquiries@avorria.com</span>
            <span>Avorria V2.0 / Studio</span>
          </div>
        </div>
      )}
    </div>
  );
}

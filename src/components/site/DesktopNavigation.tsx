"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Work", href: "/work", code: "01" },
  { label: "Services", href: "/services", code: "02" },
  { label: "Studio", href: "/studio", code: "03" },
  { label: "Lab", href: "/lab", code: "04" },
  { label: "Intelligence", href: "/intelligence", code: "05" }
];

const SERVICE_PANEL_ITEMS = [
  {
    code: "01",
    title: "Websites & Digital Experiences",
    shortTitle: "Websites",
    href: "/services/websites",
    desc: "Digital flagships, custom Next.js engineering & conversion-focused UX."
  },
  {
    code: "02",
    title: "Digital Products & Software",
    shortTitle: "Software",
    href: "/services/digital-products",
    desc: "SaaS platforms, client portals & operational data workspaces."
  },
  {
    code: "03",
    title: "SEO & Organic Growth",
    shortTitle: "SEO",
    href: "/services/seo",
    desc: "Technical SEO, information architecture & entity schema modeling."
  },
  {
    code: "04",
    title: "Performance Marketing",
    shortTitle: "Growth",
    href: "/services/performance-marketing",
    desc: "Paid search, paid social, conversion funnels & CRM attribution."
  },
  {
    code: "05",
    title: "AI, Automation & Business Systems",
    shortTitle: "AI Systems",
    href: "/services/ai-automation",
    desc: "AI agents, deterministic workflows & human-in-the-loop automation."
  }
];

export function DesktopNavigation() {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 180);
  };

  return (
    <nav className="hidden md:flex items-center gap-7 lg:gap-9 relative" aria-label="Primary Navigation">
      {NAV_ITEMS.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(item.href));
        const isServices = item.href === "/services";

        if (isServices) {
          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href="/services"
                className="group relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-avorria-muted hover:text-avorria-white transition-all duration-200 hover:translate-y-[-1px] py-2"
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-avorria-signal" aria-hidden="true" />
                )}
                <span className="text-[9px] text-avorria-quiet group-hover:text-avorria-signal transition-colors duration-200">
                  {item.code}
                </span>
                <span>{item.label}</span>
                <span className="text-[9px] text-avorria-quiet group-hover:text-avorria-signal transition-transform duration-200">
                  {isServicesOpen ? "▴" : "▾"}
                </span>
              </Link>

              {/* Restrained Mega-Panel */}
              {isServicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] pt-2 z-50 animate-fadeIn"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="bg-avorria-black/95 border border-avorria-line p-6 shadow-2xl backdrop-blur-md space-y-4">
                    <div className="flex items-center justify-between border-b border-avorria-line pb-3 font-mono text-[10px] uppercase tracking-widest text-avorria-quiet">
                      <span className="text-avorria-signal font-bold">5 Principal Disciplines</span>
                      <span>One Integrated Studio</span>
                    </div>

                    <div className="space-y-2">
                      {SERVICE_PANEL_ITEMS.map((srv) => {
                        const isSrvActive = pathname === srv.href;
                        return (
                          <Link
                            key={srv.href}
                            href={srv.href}
                            onClick={() => setIsServicesOpen(false)}
                            className={`group flex items-start justify-between p-3 border transition-all duration-200 ${
                              isSrvActive
                                ? "bg-avorria-surface border-avorria-signal"
                                : "bg-avorria-surface/30 border-transparent hover:border-avorria-line hover:bg-avorria-surface/80"
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] text-avorria-signal font-bold">
                                  {srv.code}
                                </span>
                                <span className="font-display font-bold text-sm uppercase text-avorria-white group-hover:text-avorria-signal transition-colors">
                                  {srv.title}
                                </span>
                              </div>
                              <p className="font-body text-xs text-avorria-muted leading-relaxed pl-5">
                                {srv.desc}
                              </p>
                            </div>
                            <span className="font-mono text-xs text-avorria-quiet group-hover:text-avorria-signal group-hover:translate-x-1 transition-all pt-1">
                              →
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-avorria-line flex items-center justify-between font-mono text-[11px] uppercase tracking-wider">
                      <span className="text-avorria-muted">Direct Overview</span>
                      <Link
                        href="/services"
                        onClick={() => setIsServicesOpen(false)}
                        className="text-avorria-signal font-bold hover:underline flex items-center gap-1.5"
                      >
                        <span>VIEW ALL SERVICES</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className="group relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-avorria-muted hover:text-avorria-white transition-all duration-200 hover:translate-y-[-1px]"
          >
            {isActive && (
              <span className="w-1 h-1 rounded-full bg-avorria-signal" aria-hidden="true" />
            )}
            <span className="text-[9px] text-avorria-quiet group-hover:text-avorria-signal transition-colors duration-200">
              {item.code}
            </span>
            <span>{item.label}</span>
          </Link>
        );
      })}

      {/* Start a Project Action Link */}
      <Link
        href="/start-project"
        className="group flex items-center gap-2 pl-3 border-l border-avorria-line font-mono text-[11px] uppercase tracking-widest text-avorria-white hover:text-avorria-signal transition-colors duration-200"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-avorria-signal" aria-hidden="true" />
        <span>Start a Project</span>
        <span className="text-avorria-signal transition-transform duration-200 group-hover:translate-x-1">→</span>
      </Link>
    </nav>
  );
}

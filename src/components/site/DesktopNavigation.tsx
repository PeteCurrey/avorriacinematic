"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Work", href: "/work", code: "01" },
  { label: "Capabilities", href: "/capabilities", code: "02" },
  { label: "Lab", href: "/lab", code: "03" },
  { label: "Studio", href: "/studio", code: "04" },
  { label: "Intelligence", href: "/intelligence", code: "05" }
];

export function DesktopNavigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Primary Navigation">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
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

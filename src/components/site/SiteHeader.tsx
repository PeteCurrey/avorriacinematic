"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DesktopNavigation } from "./DesktopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { useHeader } from "@/providers/HeaderContext";

export function SiteHeader() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isHomepage = pathname === "/";
  const { headerState, wordmarkOpacity, navVisible } = useHeader();
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (isAdmin) return;
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isAdmin]);

  if (isAdmin) return null;

  // Determine navigation visibility
  // On non-homepage routes: always visible. On homepage: controlled by navVisible context or header hover.
  const showNav = !isHomepage || navVisible || headerState === "standard";
  const isImmersive = headerState === "immersive" && !isHeaderHovered;
  const wordmarkAlpha = !isHomepage ? 1 : wordmarkOpacity;

  return (
    <header
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled && !isHomepage
          ? "bg-avorria-black/90 backdrop-blur-md border-b border-avorria-line py-4"
          : "bg-transparent py-6"
      } ${isImmersive ? "opacity-40 hover:opacity-100" : "opacity-100"}`}
      role="banner"
    >
      <div className="max-w-[1760px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-avorria-signal transition-opacity duration-300"
          style={{ opacity: wordmarkAlpha }}
          aria-label="Avorria Home"
        >
          <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight uppercase text-avorria-white group-hover:text-avorria-white transition-colors">
            AVORRIA
          </span>
          <span className="font-display font-extrabold text-lg sm:text-xl text-avorria-signal transition-all duration-200 group-hover:scale-125">
            .
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`transition-all duration-500 ${
            showNav ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-[-4px] pointer-events-none"
          }`}
        >
          <DesktopNavigation />
        </div>

        {/* Mobile Navigation Trigger */}
        <div
          className={`md:hidden transition-all duration-500 ${
            showNav ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}

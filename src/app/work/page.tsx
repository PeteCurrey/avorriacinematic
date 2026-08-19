import React from "react";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { WorkIntro } from "@/components/work/WorkIntro";
import { FeaturedWorkSection } from "@/components/work/FeaturedWorkSection";
import { SelectedWorkSection } from "@/components/work/SelectedWorkSection";
import { WorkArchiveSection } from "@/components/work/WorkArchiveSection";
import { WorkEnding } from "@/components/work/WorkEnding";

export const metadata = generatePageMetadata({
  title: "Work — Digital Products, Web & AI Systems",
  description:
    "Explore Avorria's body of work across digital engineering, bespoke platforms, quantitative trading software, spatial property intelligence, and operational workflow systems.",
  path: "/work"
});

export default function WorkPage() {
  return (
    <div className="w-full flex flex-col bg-avorria-black text-avorria-white min-h-screen">
      {/* 01 // Editorial Intro */}
      <WorkIntro />

      {/* 02 // Featured Flagship Chapters (001 – 006) */}
      <FeaturedWorkSection />

      {/* 03 // Selected Engineered Systems (Secondary Set) */}
      <SelectedWorkSection />

      {/* 04 // Documented Archive Index */}
      <WorkArchiveSection />

      {/* 05 // Quiet Project Action */}
      <WorkEnding />
    </div>
  );
}

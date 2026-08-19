import React from "react";
import { FEATURED_WORK } from "@/lib/projects/work-registry";
import { FeaturedProjectWide } from "./FeaturedProjectWide";
import { FeaturedProjectPortrait } from "./FeaturedProjectPortrait";
import { FeaturedProjectSplit } from "./FeaturedProjectSplit";
import { FeaturedProjectDataDense } from "./FeaturedProjectDataDense";
import { FeaturedProjectTransformation } from "./FeaturedProjectTransformation";

export function FeaturedWorkSection() {
  return (
    <section aria-label="Featured Projects" className="w-full">
      {FEATURED_WORK.map((project) => {
        switch (project.layoutVariant) {
          case "WIDE_EDITORIAL":
          case "FULL_BLEED":
            return <FeaturedProjectWide key={project.slug} project={project} />;
          case "PORTRAIT":
            return <FeaturedProjectPortrait key={project.slug} project={project} />;
          case "SPLIT":
            return <FeaturedProjectSplit key={project.slug} project={project} />;
          case "DATA_DENSE":
            return <FeaturedProjectDataDense key={project.slug} project={project} />;
          case "TRANSFORMATION":
            return <FeaturedProjectTransformation key={project.slug} project={project} />;
          default:
            return <FeaturedProjectWide key={project.slug} project={project} />;
        }
      })}
    </section>
  );
}

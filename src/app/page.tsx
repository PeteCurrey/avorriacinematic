import { SceneErrorBoundary } from "@/components/cinematic/SceneErrorBoundary";
import { Scene01Precision } from "@/components/scenes/Scene01Precision";
import { HomeStudioIntro } from "@/components/home/HomeStudioIntro";
import { HomeSelectedWorkShowcase } from "@/components/home/HomeSelectedWorkShowcase";
import { HomeCapabilitiesShowcase } from "@/components/home/HomeCapabilitiesShowcase";
import { Scene12Work } from "@/components/scenes/Scene12Work";
import { HomeLabTeaser } from "@/components/home/HomeLabTeaser";
import { Scene15Manifesto } from "@/components/scenes/Scene15Manifesto";
import { Scene17Intelligence } from "@/components/scenes/Scene17Intelligence";
import { Scene18Finale } from "@/components/scenes/Scene18Finale";

/**
 * AVORRIA V2 — HOMEPAGE DIRECTOR'S CUT
 *
 * 9 Canonical Narrative Chapters:
 * 01 / HERO          — Who Avorria is & what we sell
 * 02 / THE STUDIO    — How the studio works, before any evidence is shown
 * 03 / SELECTED WORK — Flagship film-reel
 * 04 / CAPABILITIES  — Grouped Services (BUILD, SEARCH, SYSTEMS)
 * 05 / WORK INDEX    — Broader Body of Client Work & Ventures
 * 06 / AVORRIA LAB   — 3-Experiment Interactive Research Preview
 * 07 / MANIFESTO     — First Principles & Beliefs
 * 08 / INTELLIGENCE  — Editorial Perspectives & Essays
 * 09 / FINALE        — Start a Project & Direct Commercial Engagement
 *
 * Chapter 02 exists because the page previously cut from the hero straight
 * into a full-screen screenshot of a client site — the visitor met the
 * evidence before they knew who was presenting it.
 */
export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 01 / HERO */}
      <SceneErrorBoundary sceneId="scene-01-precision" sceneLabel="Precision As Power">
        <Scene01Precision />
      </SceneErrorBoundary>

      {/* 02 / THE STUDIO — the bridge from assertion to evidence */}
      <SceneErrorBoundary sceneId="scene-studio-intro" sceneLabel="The Studio">
        <HomeStudioIntro />
      </SceneErrorBoundary>

      {/* 03 / SELECTED WORK SHOWCASE */}
      <SceneErrorBoundary sceneId="scene-selected-work-showcase" sceneLabel="Selected Work Showcase">
        <HomeSelectedWorkShowcase />
      </SceneErrorBoundary>

      {/* 03 / CAPABILITIES SHOWCASE */}
      <SceneErrorBoundary sceneId="scene-capabilities-showcase" sceneLabel="Capabilities Showcase">
        <HomeCapabilitiesShowcase />
      </SceneErrorBoundary>

      {/* 04 / WORK INDEX & ARCHIVE */}
      <SceneErrorBoundary sceneId="scene-12-work" sceneLabel="Selected Work">
        <Scene12Work />
      </SceneErrorBoundary>

      {/* 05 / AVORRIA LAB */}
      <SceneErrorBoundary sceneId="scene-lab-teaser" sceneLabel="Avorria Lab">
        <HomeLabTeaser />
      </SceneErrorBoundary>

      {/* 06 / MANIFESTO */}
      <SceneErrorBoundary sceneId="scene-15-manifesto" sceneLabel="Manifesto">
        <Scene15Manifesto />
      </SceneErrorBoundary>

      {/* 07 / INTELLIGENCE */}
      <SceneErrorBoundary sceneId="scene-17-intelligence" sceneLabel="Intelligence">
        <Scene17Intelligence />
      </SceneErrorBoundary>

      {/* 08 / FINALE */}
      <SceneErrorBoundary sceneId="scene-18-finale" sceneLabel="Finale">
        <Scene18Finale />
      </SceneErrorBoundary>
    </div>
  );
}

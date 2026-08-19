import { SceneErrorBoundary } from "@/components/cinematic/SceneErrorBoundary";
import { Scene01Precision } from "@/components/scenes/Scene01Precision";
import { Scene03Alkota } from "@/components/scenes/Scene03Alkota";
import { Scene04Breath } from "@/components/scenes/Scene04Breath";
import { Scene05CareerOS } from "@/components/scenes/Scene05CareerOS";
import { Scene06Build } from "@/components/scenes/Scene06Build";
import { Scene07NestIQ } from "@/components/scenes/Scene07NestIQ";
import { Scene08Search } from "@/components/scenes/Scene08Search";
import { Scene09Drawdown } from "@/components/scenes/Scene09Drawdown";
import { Scene10Systems } from "@/components/scenes/Scene10Systems";
import { Scene11EntireFM } from "@/components/scenes/Scene11EntireFM";
import { Scene12Work } from "@/components/scenes/Scene12Work";
import { Scene14Lab } from "@/components/scenes/Scene14Lab";
import { Scene15Manifesto } from "@/components/scenes/Scene15Manifesto";
import { Scene16Proof } from "@/components/scenes/Scene16Proof";
import { Scene17Intelligence } from "@/components/scenes/Scene17Intelligence";
import { Scene18Finale } from "@/components/scenes/Scene18Finale";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      {/* 16 Focused Homepage Scenes */}
      <SceneErrorBoundary sceneId="scene-01-precision" sceneLabel="Precision As Power">
        <Scene01Precision />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-03-alkota" sceneLabel="Alkota Bikes">
        <Scene03Alkota />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-04-breath" sceneLabel="The First Breath">
        <Scene04Breath />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-05-careeros" sceneLabel="CareerOS">
        <Scene05CareerOS />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-06-build" sceneLabel="BUILD Capability">
        <Scene06Build />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-07-nestiq" sceneLabel="NestIQ">
        <Scene07NestIQ />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-08-search" sceneLabel="SEARCH Capability">
        <Scene08Search />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-09-drawdown" sceneLabel="Drawdown.Trading">
        <Scene09Drawdown />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-10-systems" sceneLabel="SYSTEMS Capability">
        <Scene10Systems />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-11-entirefm" sceneLabel="EntireFM">
        <Scene11EntireFM />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-12-work" sceneLabel="Selected Work">
        <Scene12Work />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-14-lab" sceneLabel="Avorria Lab">
        <Scene14Lab />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-15-manifesto" sceneLabel="Manifesto">
        <Scene15Manifesto />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-16-proof" sceneLabel="Proof">
        <Scene16Proof />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-17-intelligence" sceneLabel="Intelligence">
        <Scene17Intelligence />
      </SceneErrorBoundary>

      <SceneErrorBoundary sceneId="scene-18-finale" sceneLabel="Finale">
        <Scene18Finale />
      </SceneErrorBoundary>
    </div>
  );
}

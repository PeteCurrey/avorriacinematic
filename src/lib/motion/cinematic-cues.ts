export interface CinematicCue {
  id: string;
  at: number;
  resetAt?: number;
  animation: gsap.core.Timeline | gsap.core.Tween;
  hasPlayed?: boolean;
}

export class CinematicCueController {
  private cues: CinematicCue[] = [];
  private lastProgress = 0;

  public registerCue(cue: CinematicCue) {
    this.cues.push(cue);
  }

  public evaluate(currentProgress: number) {
    const isForward = currentProgress >= this.lastProgress;

    for (const cue of this.cues) {
      if (isForward) {
        if (this.lastProgress < cue.at && currentProgress >= cue.at) {
          cue.animation.play();
          cue.hasPlayed = true;
        }
      } else {
        const resetThreshold = cue.resetAt !== undefined ? cue.resetAt : cue.at - 0.05;
        if (this.lastProgress > resetThreshold && currentProgress <= resetThreshold) {
          cue.animation.reverse();
          cue.hasPlayed = false;
        }
      }
    }

    this.lastProgress = currentProgress;
  }

  public fastForwardTo(targetProgress: number) {
    for (const cue of this.cues) {
      if (targetProgress >= cue.at) {
        cue.animation.progress(1).pause();
        cue.hasPlayed = true;
      } else {
        cue.animation.progress(0).pause();
        cue.hasPlayed = false;
      }
    }
    this.lastProgress = targetProgress;
  }

  public clear() {
    this.cues = [];
    this.lastProgress = 0;
  }
}

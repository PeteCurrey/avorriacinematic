"use client";

import React, { Component, ReactNode, ErrorInfo } from "react";

interface SceneErrorBoundaryProps {
  sceneId: string;
  sceneLabel: string;
  children: ReactNode;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

export class SceneErrorBoundary extends Component<SceneErrorBoundaryProps, SceneErrorBoundaryState> {
  constructor(props: SceneErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error(`[SceneErrorBoundary] Scene "${this.props.sceneLabel}" failed to render.`, error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          id={this.props.sceneId}
          data-scene-id={this.props.sceneId}
          aria-label={this.props.sceneLabel}
          className="relative w-full min-h-[50svh] flex items-center justify-center bg-avorria-black border-t border-avorria-line"
        >
          <div className="max-w-[1760px] mx-auto px-6 sm:px-16 py-24 text-center">
            <div className="w-px h-12 bg-avorria-signal mx-auto mb-8" aria-hidden="true" />
            <p className="font-mono text-xs uppercase tracking-widest text-avorria-quiet">
              {this.props.sceneLabel}
            </p>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallbackLabel?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SceneErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("[SceneErrorBoundary caught an error]:", error, errorInfo);
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full py-16 px-8 border border-red-500/20 bg-avorria-surface flex flex-col items-center justify-center text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-red-400 mb-2">
            Scene Component Recovered
          </span>
          <p className="font-mono text-xs text-avorria-muted">
            {this.props.fallbackLabel || "Visual experience temporarily degraded to fallback mode."}
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

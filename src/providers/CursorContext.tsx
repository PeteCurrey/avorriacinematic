"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { CursorState } from "@/types/theme";

interface CursorContextValue {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
  cursorLabel: string | null;
  setCursorLabel: (label: string | null) => void;
}

const CursorContext = createContext<CursorContextValue>({
  cursorState: "default",
  setCursorState: () => {},
  cursorLabel: null,
  setCursorLabel: () => {}
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [cursorLabel, setCursorLabel] = useState<string | null>(null);

  return (
    <CursorContext.Provider
      value={{
        cursorState,
        setCursorState,
        cursorLabel,
        setCursorLabel
      }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}

export function useCursorState(state: CursorState, label?: string) {
  const { setCursorState, setCursorLabel } = useCursor();

  const onMouseEnter = useCallback(() => {
    setCursorState(state);
    if (label) setCursorLabel(label);
  }, [state, label, setCursorState, setCursorLabel]);

  const onMouseLeave = useCallback(() => {
    setCursorState("default");
    setCursorLabel(null);
  }, [setCursorState, setCursorLabel]);

  return { onMouseEnter, onMouseLeave };
}

export function CursorTrigger({
  state,
  label,
  children,
  className = ""
}: {
  state: CursorState;
  label?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { onMouseEnter, onMouseLeave } = useCursorState(state, label);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </div>
  );
}

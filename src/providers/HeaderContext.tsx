"use client";

import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import type { HeaderState } from "@/types/theme";

interface HeaderStateContextValue {
  headerState: HeaderState;
  wordmarkOpacity: number;
  navVisible: boolean;
}

interface HeaderActionsContextValue {
  setHeaderState: (state: HeaderState) => void;
  setWordmarkOpacity: (opacity: number) => void;
  setNavVisible: (visible: boolean) => void;
}

const HeaderStateContext = createContext<HeaderStateContextValue>({
  headerState: "void",
  wordmarkOpacity: 0.75,
  navVisible: false,
});

const HeaderActionsContext = createContext<HeaderActionsContextValue>({
  setHeaderState: () => {},
  setWordmarkOpacity: () => {},
  setNavVisible: () => {},
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [headerState, setHeaderState] = useState<HeaderState>("void");
  const [wordmarkOpacity, setWordmarkOpacity] = useState<number>(0.75);
  const [navVisible, setNavVisible] = useState<boolean>(false);

  const stateValue = useMemo<HeaderStateContextValue>(() => ({
    headerState,
    wordmarkOpacity,
    navVisible,
  }), [headerState, wordmarkOpacity, navVisible]);

  const actionsValue = useMemo<HeaderActionsContextValue>(() => ({
    setHeaderState,
    setWordmarkOpacity,
    setNavVisible,
  }), []);

  return (
    <HeaderStateContext.Provider value={stateValue}>
      <HeaderActionsContext.Provider value={actionsValue}>
        {children}
      </HeaderActionsContext.Provider>
    </HeaderStateContext.Provider>
  );
}

export function useHeaderState() {
  return useContext(HeaderStateContext);
}

export function useHeaderActions() {
  return useContext(HeaderActionsContext);
}

/** Legacy unified hook maintaining backward compatibility */
export function useHeader() {
  const state = useContext(HeaderStateContext);
  const actions = useContext(HeaderActionsContext);
  return { ...state, ...actions };
}

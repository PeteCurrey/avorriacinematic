"use client";

import React, { createContext, useContext, useState } from "react";
import { HeaderState, HeaderContextValue } from "@/types/theme";

const HeaderContext = createContext<HeaderContextValue>({
  headerState: "void",
  setHeaderState: () => {},
  wordmarkOpacity: 0.75,
  setWordmarkOpacity: () => {},
  navVisible: false,
  setNavVisible: () => {}
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [headerState, setHeaderState] = useState<HeaderState>("void");
  const [wordmarkOpacity, setWordmarkOpacity] = useState<number>(0.75);
  const [navVisible, setNavVisible] = useState<boolean>(false);

  return (
    <HeaderContext.Provider
      value={{
        headerState,
        setHeaderState,
        wordmarkOpacity,
        setWordmarkOpacity,
        navVisible,
        setNavVisible
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}

export function useHeader() {
  return useContext(HeaderContext);
}

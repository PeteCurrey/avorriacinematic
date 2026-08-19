export type ThemeMode = "dark" | "light" | "project";
export type HeaderState = "void" | "reveal" | "standard" | "immersive" | "light-project";
export type CursorState = "default" | "view" | "drag" | "try" | "play" | "active" | "hidden";

export interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export interface HeaderContextValue {
  headerState: HeaderState;
  setHeaderState: (state: HeaderState) => void;
  wordmarkOpacity: number;
  setWordmarkOpacity: (opacity: number) => void;
  navVisible: boolean;
  setNavVisible: (visible: boolean) => void;
}

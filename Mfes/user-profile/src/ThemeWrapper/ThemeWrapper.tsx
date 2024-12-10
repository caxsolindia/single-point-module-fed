import { ThemeProvider } from "@emotion/react";
import { createTheme, Theme } from "@mui/material";
import { useState, useEffect, ReactNode, useMemo, JSX } from "react";
import useThemePalette from "styleguide/Theme";

import mergeWith from "./MergeWith.tsx";
import cloneDeep from "./CloneDeep.ts";
import ThemeContext from "../ThemeContext/ThemeContext.tsx";

// Type guard for functions
const isFunction = (value: unknown): value is (...args: unknown[]) => unknown =>
  typeof value === "function";

// Custom hook to initialize the theme
const useInitialTheme = (): Theme => {
  const { theme } = useThemePalette();
  const themeConfig = localStorage.getItem("ThemeConfig");

  let parsedTheme = theme;

  if (themeConfig) {
    const parsedConfig = JSON.parse(themeConfig);

    parsedTheme = mergeWith(
      cloneDeep(theme),
      parsedConfig,
      (srcValue: unknown) => {
        if (isFunction(srcValue)) {
          return srcValue; // Preserve functions
        }
        return undefined;
      },
    );
  }
  return parsedTheme;
};

// Define the type for the event detail
interface ThemeChangeEvent extends Event {
  detail: {
    data: Record<string, unknown>;
  };
}

// Define the type for the props
interface ThemeUpdaterProps {
  children: ReactNode;
}

// Component that listens for the custom event and updates the theme
function ThemeUpdater({ children }: Readonly<ThemeUpdaterProps>): JSX.Element {
  const [themeReplace, setThemeReplace] = useState<Theme>(useInitialTheme());

  useEffect(() => {
    const handleThemeChange = (event: Event) => {
      const customEvent = event as ThemeChangeEvent;
      const newTheme = customEvent.detail.data;
      setThemeReplace(createTheme(newTheme));
    };

    window.addEventListener("info", handleThemeChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("info", handleThemeChange);
    };
  }, []);

  const contextValue = useMemo(() => ({ theme: themeReplace }), [themeReplace]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={themeReplace}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default ThemeUpdater;

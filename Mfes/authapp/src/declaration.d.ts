declare module "*.png";
declare module "styleguide/Theme" {
  import { PaletteOptions, Theme } from "@mui/material";
  import React from "react";

  const useThemePalette: () => {
    theme: Theme;
    updatePaletteColors: (newColors: Partial<PaletteOptions>) => void;
    resetPaletteColors: () => void;
    setThemeOptions: React.Dispatch<React.SetStateAction<Theme>>;
  };
  export default useThemePalette;
}

declare module "styleguide/ThemeConstants" {
  import { Theme, PaletteColor } from "@mui/material";

  const useThemeConstants: ({ theme }: { theme: Theme }) => {
    PRIMARY: PaletteColor;
    PRIMARY_MAIN: string;
    PRIMARY_DARK: string;
    PRIMARY_LIGHT: string;
    PRIMARY_LIGHTEST?: string;
    SECONDARY: PaletteColor;
    SECONDARY_MAIN: string;
    SECONDARY_LIGHT: string;
    SECONDARY_LIGHTEST?: string;
    BACKGROUND: {
      default: string;
      paper: string;
    };
    BACKGROUND_DEFAULT: string;
    BACKGROUND_PAPER: string;
    TEXT: {
      primary: string;
      secondary: string;
      disabled: string;
      white: string;
      green: string;
    };
    TEXT_PRIMARY: string;
    TEXT_SECONDARY: string;
    TEXT_DISABLED: string;
    TEXT_WHITE: string;
    TEXT_GREEN: string;
    SUCCESS: PaletteColor;
    SUCCESS_MAIN: string;
    SUCCESS_LIGHT: string;
    INFO: PaletteColor;
    INFO_MAIN: string;
    INFO_LIGHT: string;
    ERROR: PaletteColor;
    ERROR_MAIN: string;
    GRAY?: PaletteColor;
    GRAY_MAIN?: string;
    GRAY_LIGHT?: string;
    DIVIDER: string;
  };

  export default useThemeConstants;
}

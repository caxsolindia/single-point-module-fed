declare module "*.png";

declare module "styleguide/Theme" {
  import React from "react";
  import { PaletteOptions, Theme } from "@mui/material";

  export const useThemePalette: () => {
    theme: Theme;

    themeResponsive: Theme;

    updatePaletteColors: (newColors: Partial<PaletteOptions>) => void;

    resetPaletteColors: () => void;

    setThemeOptions: React.Dispatch<React.SetStateAction<Theme>>;
  };
  export default useThemePalette;
}
declare module "styleguide/ThemeConstants" {
  import { PaletteColor, Theme } from "@mui/material";

  export const useThemeConstants: ({ theme }: { theme: Theme }) => {
    PRIMARY: PaletteColor;
    PRIMARY_MAIN: string;
    PRIMARY_DARK: string;
    PRIMARY_LIGHT: string;
    PRIMARY_LIGHTEST: string | undefined;
    SECONDARY: PaletteColor;
    SECONDARY_MAIN: string;
    SECONDARY_LIGHT: string;
    SECONDARY_LIGHTEST: string | undefined;
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
    GRAY: PaletteColor | undefined;
    GRAY_MAIN: string | undefined;
    GRAY_LIGHT: string | undefined;
    DIVIDER: string;
  };
  export default useThemeConstants;
}
declare module "services/apolloClient" {
  import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
  const client: ApolloClient<NormalizedCacheObject>;
  export default client;
}

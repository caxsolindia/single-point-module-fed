import { PaletteColor } from "@mui/material";

const mockPaletteColor: PaletteColor = {
  main: "",
  light: "",
  dark: "",
  contrastText: "",
};

const useThemeConstants = () => {
  // Use the theme parameter in some way to avoid the TypeScript error

  return {
    PRIMARY: mockPaletteColor,
    PRIMARY_MAIN: "",
    PRIMARY_DARK: "",
    PRIMARY_LIGHT: "",
    PRIMARY_LIGHTEST: "",
    SECONDARY: mockPaletteColor,
    SECONDARY_MAIN: "",
    SECONDARY_LIGHT: "",
    SECONDARY_LIGHTEST: "",
    BACKGROUND: {
      default: "",
      paper: "",
    },
    BACKGROUND_DEFAULT: "",
    BACKGROUND_PAPER: "",
    TEXT: {
      primary: "",
      secondary: "",
      disabled: "",
      white: "",
      green: "",
    },
    TEXT_PRIMARY: "",
    TEXT_SECONDARY: "",
    TEXT_DISABLED: "",
    TEXT_WHITE: "",
    TEXT_GREEN: "",
    SUCCESS: mockPaletteColor,
    SUCCESS_MAIN: "",
    SUCCESS_LIGHT: "",
    INFO: mockPaletteColor,
    INFO_MAIN: "",
    INFO_LIGHT: "",
    ERROR: mockPaletteColor,
    ERROR_MAIN: "",
    GRAY: mockPaletteColor,
    GRAY_MAIN: "",
    GRAY_LIGHT: "",
    DIVIDER: "",
  };
};

export default useThemeConstants;

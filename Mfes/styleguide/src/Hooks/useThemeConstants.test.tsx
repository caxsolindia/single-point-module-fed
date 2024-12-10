import { renderHook } from "@testing-library/react";
import { createTheme, Theme } from "@mui/material/styles";
import useThemeConstants from "./useThemeConstants.js";

const baseTheme = createTheme();

const mockTheme: Theme = {
  ...baseTheme,
  palette: {
    ...baseTheme.palette,
    primary: {
      main: "rgba(115, 11, 166, 1)",
      dark: "rgba(84, 8, 122, 1)",
      light: "rgba(241, 230, 246, 1)",
      contrastText: baseTheme.palette.primary.contrastText,
    },
    secondary: {
      main: "rgba(250, 121, 74, 1)",
      light: "rgba(250, 121, 74, 0.4)",
      dark: "rgba(175, 85, 52, 1)",
      contrastText: baseTheme.palette.secondary.contrastText,
    },
    background: {
      default: "rgba(255, 255, 255, 1)",
      paper: "rgba(255, 255, 255, 1)",
    },
    text: {
      primary: "rgba(13, 11, 14, 1)",
      secondary: "rgba(131, 134, 150, 1)",
      disabled: "rgba(51, 51, 51, 1)",
      white: "rgba(255, 255, 255, 1)",
      green: "rgba(0, 210, 144, 1)",
    },
    success: {
      main: "rgba(0, 210, 144, 1)",
      light: "rgba(214, 248, 237, 1)",
      dark: "rgba(0, 148, 101, 1)",
      contrastText: baseTheme.palette.success.contrastText,
    },
    info: {
      main: "rgba(87, 185, 224, 1)",
      light: "rgba(87, 185, 224, 0.098)",
      dark: "rgba(61, 130, 158, 1)",
      contrastText: baseTheme.palette.info.contrastText,
    },
    error: {
      main: "rgba(214, 40, 40, 1)",
      light: baseTheme.palette.error.light,
      dark: baseTheme.palette.error.dark,
      contrastText: baseTheme.palette.error.contrastText,
    },
    gray: {
      main: "rgba(196, 199, 207, 1)",
      light: "rgba(196, 199, 207, 0.2)",
      dark: baseTheme.palette.grey[600],
      contrastText: baseTheme.palette.grey[50],
    },
    divider: "rgba(196, 199, 207, 1)",
    mode: "light",
    contrastThreshold: baseTheme.palette.contrastThreshold,
    tonalOffset: baseTheme.palette.tonalOffset,
  },
};

describe("useThemeConstants", () => {
  it("should return correct constants", () => {
    const { result } = renderHook(() =>
      useThemeConstants({ theme: mockTheme }),
    );

    expect(result.current.PRIMARY).toEqual({
      main: "rgba(115, 11, 166, 1)",
      dark: "rgba(84, 8, 122, 1)",
      light: "rgba(241, 230, 246, 1)",
      contrastText: baseTheme.palette.primary.contrastText,
    });
    expect(result.current.SECONDARY).toEqual({
      main: "rgba(250, 121, 74, 1)",
      light: "rgba(250, 121, 74, 0.4)",
      dark: "rgba(175, 85, 52, 1)",
      contrastText: baseTheme.palette.secondary.contrastText,
    });
    expect(result.current.BACKGROUND).toEqual({
      default: "rgba(255, 255, 255, 1)",
      paper: "rgba(255, 255, 255, 1)",
    });
    expect(result.current.TEXT).toEqual({
      primary: "rgba(13, 11, 14, 1)",
      secondary: "rgba(131, 134, 150, 1)",
      disabled: "rgba(51, 51, 51, 1)",
      white: "rgba(255, 255, 255, 1)",
      green: "rgba(0, 210, 144, 1)",
    });
    expect(result.current.SUCCESS).toEqual({
      main: "rgba(0, 210, 144, 1)",
      light: "rgba(214, 248, 237, 1)",
      dark: "rgba(0, 148, 101, 1)",
      contrastText: baseTheme.palette.success.contrastText,
    });
    expect(result.current.INFO).toEqual({
      main: "rgba(87, 185, 224, 1)",
      light: "rgba(87, 185, 224, 0.098)",
      dark: "rgba(61, 130, 158, 1)",
      contrastText: baseTheme.palette.info.contrastText,
    });
    expect(result.current.ERROR).toEqual({
      main: "rgba(214, 40, 40, 1)",
      light: baseTheme.palette.error.light,
      dark: baseTheme.palette.error.dark,
      contrastText: baseTheme.palette.error.contrastText,
    });
    expect(result.current.GRAY).toEqual({
      main: "rgba(196, 199, 207, 1)",
      light: "rgba(196, 199, 207, 0.2)",
      dark: baseTheme.palette.grey[600],
      contrastText: baseTheme.palette.grey[50],
    });
    expect(result.current.DIVIDER).toBe("rgba(196, 199, 207, 1)");
  });
});

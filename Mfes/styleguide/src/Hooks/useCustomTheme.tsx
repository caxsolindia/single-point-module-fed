/* eslint-disable no-nested-ternary */
/* eslint-disable no-bitwise */
import { useState } from "react";
import {
  createTheme,
  Theme,
  PaletteOptions,
  PaletteColorOptions,
} from "@mui/material/styles";
import deepMerge from "../Utility/deepMerge.ts";

const themeResponsive = createTheme();
const colorExpression = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/;

const lightenColor = (color: string, percent: number) => {
  if (color.startsWith("rgba")) {
    const match = colorExpression.exec(color);
    if (!match) return color;
    const [, r, g, b, a] = match;
    const newAlpha = parseFloat(a) * (1 - percent / 100);
    return `rgba(${r}, ${g}, ${b}, ${newAlpha.toFixed(2)})`;
  }
  return color;
};

function hasMainColor(color: unknown): color is { main: string } {
  return (
    typeof color === "object" &&
    color !== null &&
    "main" in color &&
    typeof (color as { main?: unknown }).main === "string"
  );
}
const updateColors = (
  colors: Partial<PaletteOptions>,
): Partial<PaletteOptions> => {
  return Object.fromEntries(
    Object.entries(colors).map(([key, value]) => {
      if (hasMainColor(value)) {
        return [
          key as keyof PaletteOptions,
          {
            ...value,
            light: lightenColor(value.main, 55),
            lightest: lightenColor(value.main, 80),
          } as PaletteColorOptions,
        ];
      }
      return [key as keyof PaletteOptions, value];
    }),
  );
};

const useThemePalette = () => {
  // Initial theme state
  const initialTheme = createTheme({
    // Color Palette
    palette: {
      mode: "light",
      background: {
        default: "rgba(255, 255, 255, 1)",
        paper: "rgba(255, 255, 255, 1)",
      },
      primary: {
        main: "rgba(115, 11, 166, 1)",
        light: "rgba(241, 230, 246, 1)",
        lightest: "rgba(115, 11, 166, 0.2)",
      },
      secondary: {
        main: "rgba(250, 121, 74, 1)",
        light: "rgba(250, 121, 74, 0.4)",
        lightest: "rgba(250, 121, 74, 0.1)",
      },
      success: {
        main: "rgba(0, 210, 144, 1)",
        light: "rgba(214, 248, 237, 1)",
      },
      info: {
        main: "rgba(87, 185, 224, 1)",
        light: "rgba(87, 185, 224, 0.098)",
      },
      error: {
        main: "rgba(214, 40, 40, 1)",
      },
      gray: {
        main: "rgba(241, 242, 244, 1)",
        light: "rgba(241, 242, 244, 0.2)",
      },
      text: {
        primary: "rgba(13, 11, 14, 1)",
        secondary: "rgba(131, 134, 150, 1)",
        disabled: "rgba(51, 51, 51, 1)",
        white: "rgba(255, 255, 255, 1)",
        green: "rgba(0, 210, 144, 1)",
      },
      divider: "rgba(196, 199, 207, 1)",
    },
    // Fonts
    typography: {
      fontFamily: '"Inter", sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h4: {
        fontSize: "2rem",
        fontWeight: 500,
        lineHeight: "39px",
        [themeResponsive.breakpoints.down("lg")]: {
          fontSize: "1.6rem",
        },
        [themeResponsive.breakpoints.down("md")]: {
          fontSize: "1.2rem",
        },
        [themeResponsive.breakpoints.down("sm")]: {
          fontSize: "1rem",
        },
      },
      h5: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: "29px",
        [themeResponsive.breakpoints.down("lg")]: {
          fontSize: "1.2rem",
        },
        [themeResponsive.breakpoints.down("md")]: {
          fontSize: "1rem",
        },
        [themeResponsive.breakpoints.down("sm")]: {
          fontSize: "0.938rem",
        },
      },
      h6: {
        fontSize: "1.25rem",
        lineHeight: "24px",
        [themeResponsive.breakpoints.down("lg")]: {
          fontSize: "1.15rem",
        },
        [themeResponsive.breakpoints.down("md")]: {
          fontSize: "0.938rem",
        },
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: "18px",
        [themeResponsive.breakpoints.down("lg")]: {
          fontSize: "0.938rem",
        },
        [themeResponsive.breakpoints.down("md")]: {
          fontSize: "0.875rem",
        },
        [themeResponsive.breakpoints.down("sm")]: {
          fontSize: "0.813rem",
        },
      },
    },
    // Components
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 8,
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            borderColor: "#cdcdcd",
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 8,
          },
        },
      },
    },
  });

  const localThemeValue = localStorage.getItem("ThemeConfig");
  const parsedLocalThemeValue = localThemeValue
    ? JSON.parse(localThemeValue)
    : null;

  // Merge parsedLocalThemeValue with initialTheme
  const mergedTheme = deepMerge({ ...initialTheme }, parsedLocalThemeValue);

  // Create theme instance using mergedTheme
  const themeWithInstance = createTheme(mergedTheme);

  const [themeOptions, setThemeOptions] = useState<Theme>(
    themeWithInstance || initialTheme,
  );

  // Reset colors
  const resetPaletteColors = () => {
    setThemeOptions(initialTheme);
  };
  // Save new colors
  const updatePaletteColors = (newColors: Partial<PaletteOptions>) => {
    setThemeOptions((prevTheme) => {
      const updatedPalette = {
        ...prevTheme.palette,
        ...updateColors(newColors),
        text: {
          ...prevTheme.palette?.text,
          ...newColors.text,
        },
        background: {
          ...prevTheme.palette?.background,
          ...newColors.background,
        },
        divider: newColors.divider ?? prevTheme.palette?.divider,
      };

      return createTheme({
        ...prevTheme,
        palette: updatedPalette,
      });
    });
  };

  const theme = createTheme(themeOptions);

  return {
    theme,
    updatePaletteColors,
    resetPaletteColors,
    setThemeOptions,
  };
};

export default useThemePalette;

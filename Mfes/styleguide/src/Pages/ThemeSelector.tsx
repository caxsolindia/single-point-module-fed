import React from "react";
import { Box, Button, Grid, InputLabel, ThemeProvider } from "@mui/material";
import useCustomTheme from "../Hooks/useCustomTheme.tsx";
import MuiComponentsDemo from "../Components/MuiComponentsDemo.tsx";
import ErrorBoundary from "../ErrorBoundry.tsx";
import { RESET_BTN, SAVE_BTN } from "../Constants/ButtonConstant.ts";
import convertToRGBA from "../Utility/convertToRGBA.tsx";
import rgbaToHex from "../Utility/convertToHex.tsx";

type PaletteColors =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "error"
  | "gray";
type TextColorKeys = "primary" | "secondary" | "disabled" | "white" | "green";
type BackgroundColorKeys = "default" | "paper";

function ThemeSelector() {
  const { theme, updatePaletteColors, resetPaletteColors } = useCustomTheme();

  const colors: { label: string; name: PaletteColors }[] = [
    { label: "Primary Color", name: "primary" },
    { label: "Secondary Color", name: "secondary" },
    { label: "Success Color", name: "success" },
    { label: "Info Color", name: "info" },
    { label: "Error Color", name: "error" },
    { label: "Gray Color", name: "gray" },
  ];
  const textColors: { label: string; name: TextColorKeys }[] = [
    { label: "Primary Color", name: "primary" },
    { label: "Secondary Color", name: "secondary" },
    { label: "disabled Color", name: "disabled" },
    { label: "white Color", name: "white" },
    { label: "green Color", name: "green" },
  ];
  const backgroundColors: { label: string; name: BackgroundColorKeys }[] = [
    { label: "Body Color", name: "default" },
    { label: "Components Color", name: "paper" },
  ];
  const dividerColor = [{ label: "Divider Color", name: "divider" }];

  const handleColorChange =
    (colorKey: string, nestedKey?: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = event.target.value;
      const rgbaColor = convertToRGBA(newColor); // Convert color to RGBA
      let update;
      if (nestedKey) {
        update = { [colorKey]: { [nestedKey]: rgbaColor } };
      } else if (colorKey === "divider") {
        update = { [colorKey]: rgbaColor };
      } else {
        update = { [colorKey]: { main: rgbaColor } };
      }
      updatePaletteColors(update);
    };
  const EmitEvent = () => {
    window.dispatchEvent(
      new CustomEvent("info", {
        detail: { data: theme },
      }),
    );
  };
  const handleThemeSave = () => {
    EmitEvent();
    localStorage.setItem("ThemeConfig", JSON.stringify(theme));
  };
  const handleThemeReset = () => {
    resetPaletteColors();
  };

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid
            item
            lg={8}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              bgcolor={theme.palette.background.default}
              sx={{
                width: "100%",
                maxWidth: "80%",
              }}
            >
              <MuiComponentsDemo theme={theme} />
            </Box>
          </Grid>
          <Grid item lg={3}>
            <Grid>
              <Grid
                sx={{
                  mb: 5,
                  position: "fixed",
                  height: "90vh",
                  overflowY: "auto",
                  maxWidth: "25%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 3,
                  "&::-webkit-scrollbar": {
                    width: "1rem", // adjust as needed
                    backgroundColor: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "transparent",
                    borderRadius: "4px",
                  },
                  scrollbarWidth: "thin", // for Firefox
                  scrollbarColor: "transparent transparent", // for Firefox
                }}
              >
                <Grid>
                  <Box marginBottom={3}>
                    <InputLabel>Palette Colors</InputLabel>
                    {colors.map((color) => (
                      <Grid key={color.label}>
                        <InputLabel>{color.label}</InputLabel>
                        <input
                          type="color"
                          value={rgbaToHex(
                            theme.palette[color.name]?.main ?? "",
                          )}
                          onChange={handleColorChange(color.name)}
                        />
                      </Grid>
                    ))}
                  </Box>
                  <Box marginBottom={3}>
                    <InputLabel>Text Colors</InputLabel>
                    {textColors.map((color) => (
                      <Grid key={color.label}>
                        <InputLabel>{color.label}</InputLabel>
                        <input
                          type="color"
                          value={rgbaToHex(
                            theme.palette.text[color.name] || "",
                          )}
                          onChange={handleColorChange("text", color.name)}
                        />
                      </Grid>
                    ))}
                  </Box>
                  <Box marginBottom={3}>
                    <InputLabel>Background Colors</InputLabel>
                    {backgroundColors.map((color) => (
                      <Grid key={color.label}>
                        <InputLabel>{color.label}</InputLabel>
                        <input
                          type="color"
                          value={rgbaToHex(
                            theme.palette.background[color.name] || "",
                          )}
                          onChange={handleColorChange("background", color.name)}
                        />
                      </Grid>
                    ))}
                  </Box>
                  <Box marginBottom={3}>
                    <InputLabel>Divider</InputLabel>
                    {dividerColor.map((color) => (
                      <Grid key={color.label}>
                        <InputLabel>{color.label}</InputLabel>
                        <input
                          type="color"
                          value={rgbaToHex(theme.palette.divider || "")}
                          onChange={handleColorChange("divider")}
                        />
                      </Grid>
                    ))}
                  </Box>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  maxHeight="24px"
                  columnGap={2}
                >
                  <Button
                    variant="contained"
                    type="button"
                    onClick={handleThemeReset}
                    data-testid="reset-button"
                  >
                    {RESET_BTN}
                  </Button>
                  <Button
                    variant="contained"
                    type="button"
                    onClick={handleThemeSave}
                    data-testid="save-button"
                  >
                    {SAVE_BTN}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default ThemeSelector;

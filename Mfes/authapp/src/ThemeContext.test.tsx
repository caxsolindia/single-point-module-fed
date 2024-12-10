import { ReactNode, useMemo } from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
  Theme,
} from "@mui/material";
import ThemeContext, { useThemeContext } from "./ThemeContext.tsx";

// Mock theme object
const mockTheme: Theme = createTheme();

// Custom ThemeProvider for testing
interface ThemeProviderProps {
  theme: Theme;
  children: ReactNode;
}

function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const contextValue = useMemo(() => ({ theme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

// Test component that uses useThemeContext
function TestComponent() {
  const { theme } = useThemeContext();
  return <div>{theme ? "Theme is provided" : "No theme provided"}</div>;
}

describe("ThemeContext", () => {
  test("useThemeContext returns theme when used within ThemeProvider", () => {
    render(
      <ThemeProvider theme={mockTheme}>
        <TestComponent />
      </ThemeProvider>,
    );

    expect(screen.getByText("Theme is provided")).toBeInTheDocument();
  });

  test("useThemeContext throws error when not used within ThemeProvider", () => {
    // Suppress the expected error message in the console
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useThemeContext must be used within a ThemeProvider",
    );

    // Restore console error
    consoleError.mockRestore();
  });
});

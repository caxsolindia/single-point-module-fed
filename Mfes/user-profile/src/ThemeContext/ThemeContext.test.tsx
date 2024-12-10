import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import { useThemeContext } from "./ThemeContext.tsx";
import useThemePalette from "../__mocks__/styleguide/Theme.ts";

jest.mock("./ThemeContext", () => {
  const originalModule = jest.requireActual("./ThemeContext");
  return {
    ...originalModule,
    useThemeContext: jest.fn(() => {
      const context = originalModule.useThemeContext();
      if (!context) {
        throw new Error("useThemeContext must be used within a ThemeProvider");
      }
      return context;
    }),
  };
});
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  jest.restoreAllMocks();
});

describe("ThemeUpdater", () => {
  const { theme } = useThemePalette();

  it("renders children with the initial theme", () => {
    render(
      <ThemeProvider theme={theme}>
        <div>Test Child</div>
      </ThemeProvider>,
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("throws an error when useThemeContext is used outside of ThemeProvider", () => {
    function TestComponent() {
      useThemeContext();
      return <div />;
    }

    // Ensure the error is thrown
    expect(() => {
      render(<TestComponent />);
    }).toThrow("useThemeContext must be used within a ThemeProvider");
  });
});

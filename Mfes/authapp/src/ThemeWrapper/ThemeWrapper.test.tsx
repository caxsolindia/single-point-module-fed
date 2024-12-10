import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createTheme } from "@mui/material";
import ThemeUpdater from "./ThemeWrapper.tsx";
import ThemeContext from "../ThemeContext.tsx";

// Mock dependencies
jest.mock("styleguide/Theme", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    theme: createTheme({ palette: { primary: { main: "#000000" } } }),
  })),
}));

jest.mock("./MergeWith.tsx", () => ({
  __esModule: true,
  default: jest.fn((...args: unknown[]) => Object.assign({}, ...args)),
}));

jest.mock("./CloneDeep.ts", () => ({
  __esModule: true,
  default: jest.fn((obj: unknown) => JSON.parse(JSON.stringify(obj))),
}));

describe("ThemeUpdater", () => {
  it("renders children with the initial theme", () => {
    render(
      <ThemeUpdater>
        <div>Test Child</div>
      </ThemeUpdater>,
    );
    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("updates the theme when the custom event is dispatched", () => {
    render(
      <ThemeUpdater>
        <ThemeContext.Consumer>
          {(context) => {
            if (!context) {
              throw new Error("ThemeContext should not be undefined");
            }
            const { theme } = context;
            return <div>Primary Color: {theme.palette.primary.main}</div>;
          }}
        </ThemeContext.Consumer>
      </ThemeUpdater>,
    );

    // Check initial theme
    expect(screen.getByText("Primary Color: #000000")).toBeInTheDocument();

    // Create and dispatch custom event
    act(() => {
      const newTheme = { palette: { primary: { main: "#ff0000" } } };
      const event = new CustomEvent("info", {
        detail: { data: newTheme },
      });
      window.dispatchEvent(event);
    });

    // Check updated theme
    expect(screen.getByText("Primary Color: #ff0000")).toBeInTheDocument();
  });
});

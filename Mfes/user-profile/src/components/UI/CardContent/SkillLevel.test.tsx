import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "@mui/material/styles";
import SkillLevel from "./SkillLevel.tsx";
import useThemePalette from "../../../__mocks__/styleguide/Theme.ts";

jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(() => ({
    theme: {},
  })),
}));
describe("SkillLevel Component", () => {
  const { theme } = useThemePalette();

  it("should render the correct number of filled and unfilled bars based on the level", () => {
    const levels = [1, 2, 3, 4, 5];

    levels.forEach((level) => {
      const { unmount } = render(
        <ThemeProvider theme={theme}>
          <SkillLevel level={level} />
        </ThemeProvider>,
      );

      // Check if the correct number of filled bars are rendered
      const filledBars = screen.getAllByTestId("filled-bar");
      expect(filledBars.length).toBe(level);

      if (level < 5) {
        // Check if the correct number of unfilled bars are rendered
        const unfilledBars = screen.getAllByTestId("unfilled-bar");
        expect(unfilledBars.length).toBe(5 - level);
      }

      // Clean up the rendered component for the next iteration
      unmount();
    });
  });

  it("should render 5 bars in total", () => {
    render(
      <ThemeProvider theme={theme}>
        <SkillLevel level={3} />
      </ThemeProvider>,
    );

    const filledBars = screen.getAllByTestId("filled-bar");
    const unfilledBars = screen.getAllByTestId("unfilled-bar");
    expect(filledBars.length + unfilledBars.length).toBe(5);
  });
});

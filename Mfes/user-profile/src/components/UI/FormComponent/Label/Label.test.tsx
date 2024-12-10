import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LabelTypography from "./Label.tsx";

const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("LabelTypography component", () => {
  it("should render the text prop correctly", () => {
    const testText = "Sample Text";
    renderWithTheme(<LabelTypography text={testText} />);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("should apply default styling", () => {
    const testText = "Styled Text";
    renderWithTheme(<LabelTypography text={testText} />);
    const typographyElement = screen.getByText(testText);
    expect(typographyElement).toHaveStyle("font-weight: 600");
  });

  it("should apply custom styles via sx prop", () => {
    const testText = "Custom Style Text";
    const customSx = { color: "red", fontSize: "20px" };
    renderWithTheme(<LabelTypography text={testText} sx={customSx} />);
    const typographyElement = screen.getByText(testText);
    expect(typographyElement).toHaveStyle("color: red");
    expect(typographyElement).toHaveStyle("font-size: 20px");
  });

  it("should render with default fontWeight if no sx prop is provided", () => {
    const testText = "Default Font Weight";
    renderWithTheme(<LabelTypography text={testText} />);
    const typographyElement = screen.getByText(testText);
    expect(typographyElement).toHaveStyle("font-weight: 600");
  });
});

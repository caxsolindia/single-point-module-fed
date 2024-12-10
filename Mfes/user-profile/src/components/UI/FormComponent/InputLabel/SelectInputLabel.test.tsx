import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SelectInputLabel from "./SelectInputLabel.tsx";

const renderWithTheme = (ui: React.ReactElement) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("SelectInputLabel component pages", () => {
  it("should render the label text correctly", () => {
    const labelText = "Test Label";
    renderWithTheme(<SelectInputLabel label={labelText} value={undefined} />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it("should hide the label when a value is provided to selecinputlabel", () => {
    const labelText = "Test Label";
    renderWithTheme(<SelectInputLabel label={labelText} value="testValue" />);
    const labelElement = screen.getByText(labelText);
    expect(labelElement).toHaveStyle("display: none");
  });

  it("should apply custom styles via sx prop", () => {
    const labelText = "Custom Style Label";
    const customSx = { color: "blue" };
    renderWithTheme(
      <SelectInputLabel label={labelText} value={undefined} sx={customSx} />,
    );
    const labelElement = screen.getByText(labelText);
    expect(labelElement).toHaveStyle("color: blue");
  });

  it("should hide the label when data-shrink attribute is true", () => {
    const labelText = "Shrink Label";
    renderWithTheme(
      <SelectInputLabel
        label={labelText}
        value={undefined}
        sx={{ '&[data-shrink="true"]': { display: "none" } }}
        data-shrink="true"
      />,
    );
    const labelElement = screen.getByText(labelText);
    expect(labelElement).toHaveStyle("display: none");
  });

  it("should not hide the label when no value is provided", () => {
    const labelText = "Visible Label";
    renderWithTheme(<SelectInputLabel label={labelText} value={undefined} />);
    const labelElement = screen.getByText(labelText);
    expect(labelElement).toHaveStyle("display: block");
  });
});

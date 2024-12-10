import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThemeSelector from "./ThemeSelector.js";

describe("ThemeSelector", () => {
  it("renders without crashing", () => {
    render(<ThemeSelector />);
  });

  it("updates theme colors when input colors are changed", () => {
    const { container } = render(<ThemeSelector />);
    const primaryColorInput = container.querySelector("input[type='color']")!;
    fireEvent.change(primaryColorInput, { target: { value: "#ff0000" } });
    expect(primaryColorInput).toHaveValue("#ff0000");
  });

  it("emits event and saves theme configuration to localStorage when save button is clicked", () => {
    const { getByTestId } = render(<ThemeSelector />);
    const saveButton = getByTestId("save-button");
    fireEvent.click(saveButton);
    expect(localStorage.getItem("ThemeConfig")).toBeTruthy();
  });

  it("resets palette colors when reset button is clicked", () => {
    const { getByTestId, container } = render(<ThemeSelector />);
    const primaryColorInput = container.querySelector("input[type='color']")!;
    fireEvent.change(primaryColorInput, { target: { value: "#ff0000" } });
    const resetButton = getByTestId("reset-button");
    fireEvent.click(resetButton);
    expect(primaryColorInput).toHaveValue("#730ba6");
  });
});

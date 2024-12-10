import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProgressBar from "./ProgressBar.js";

describe("ProgressBar component", () => {
  test("renders without crashing", () => {
    render(<ProgressBar value={50} showvalue="show" shade="primary" />);
  });

  test('shows value when showvalue prop is "show"', () => {
    render(<ProgressBar value={50} showvalue="show" shade="primary" />);
    const valueElement = screen.getByText("50%");
    expect(valueElement).toBeInTheDocument();
  });

  test('doesn\'t show value when showvalue prop is "hide"', () => {
    render(<ProgressBar value={50} showvalue="hide" shade="primary" />);
    const valueElement = screen.queryByText("50%");
    expect(valueElement).toBeNull();
  });
});

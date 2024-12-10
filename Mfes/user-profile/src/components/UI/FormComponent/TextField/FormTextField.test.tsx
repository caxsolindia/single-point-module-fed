import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormTextField from "./FormTextField.tsx";

describe("FormTextField component", () => {
  it("should render without crashing", () => {
    render(<FormTextField />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("should accept and display input text", () => {
    const testValue = "Test input";
    render(<FormTextField value={testValue} onChange={() => {}} />);
    const inputElement = screen.getByDisplayValue(testValue);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(testValue);
  });

  it("should apply passed props to the TextField", () => {
    render(<FormTextField label="Test Label" helperText="Test Helper Text" />);
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("Test Helper Text")).toBeInTheDocument();
  });

  it("should apply custom styles to FormHelperText", () => {
    render(<FormTextField helperText="Test Helper Text" />);
    const helperTextElement = screen.getByText("Test Helper Text");
    expect(helperTextElement).toHaveStyle("margin-left: 0");
  });

  it("should forward the ref to the underlying input element", () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<FormTextField ref={ref} />);
    expect(ref.current).toBeTruthy();
  });
});

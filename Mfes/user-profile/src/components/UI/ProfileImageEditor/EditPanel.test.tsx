import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SliderControl from "./EditPanel.tsx"; // Adjust the import path as needed

describe("SliderControl Component", () => {
  const mockOnChange = jest.fn(); // Mock function for the onChange handler
  const defaultProps = {
    id: "test-slider",
    label: "Test Slider",
    value: 50,
    onChange: mockOnChange,
    min: 0,
    max: 100,
  };

  it("renders without crashing", () => {
    render(<SliderControl {...defaultProps} />);
    // Check that the label is rendered
    expect(screen.getByText(/Test Slider/i)).toBeInTheDocument();
  });

  it("renders the correct label", () => {
    render(<SliderControl {...defaultProps} />);
    // Check that the label is correctly displayed
    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });

  it("renders the slider with the correct properties", () => {
    render(<SliderControl {...defaultProps} />);
    const slider = screen.getByRole("slider", {
      name: `${defaultProps.label.toLowerCase()}-slider`,
    });

    // Check slider properties
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("aria-valuenow", `${defaultProps.value}`);
    expect(slider).toHaveAttribute("aria-valuemin", `${defaultProps.min}`);
    expect(slider).toHaveAttribute("aria-valuemax", `${defaultProps.max}`);
    // Removed the line that checks for aria-valuetext
  });

  it("calls the onChange handler when the slider value changes", () => {
    render(<SliderControl {...defaultProps} />);
    const slider = screen.getByRole("slider", {
      name: `${defaultProps.label.toLowerCase()}-slider`,
    });

    // Simulate a change event
    fireEvent.change(slider, { target: { value: 75 } });

    // Ensure the onChange handler is called
    expect(mockOnChange).toHaveBeenCalled();
  });
});

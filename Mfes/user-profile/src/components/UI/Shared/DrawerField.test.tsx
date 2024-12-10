import React from "react";
import { render, screen } from "@testing-library/react";
import { Control, FieldValues, FieldError, FieldErrors } from "react-hook-form";
import DateSelector from "./DrawerField.tsx"; // Adjust the import according to your file structure
import "@testing-library/jest-dom";

// Define the types for the DateSelector component props
interface DateSelectorProps {
  yearName: string;
  monthName: string;
  years: number[];
  months: string[];
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>; // Use FieldErrors and make it optional
}

// Mock the Controller component from react-hook-form
jest.mock("react-hook-form", () => {
  const actualModule = jest.requireActual("react-hook-form");
  return {
    ...actualModule,
    Controller: ({
      render: mockRender,
      name,
    }: {
      render: (props: {
        field: {
          name: string;
          value: string;
          onChange: jest.Mock;
          onBlur: jest.Mock;
        };
      }) => React.JSX.Element;
      name: string;
    }) => {
      const mockField = {
        name,
        value: "",
        onChange: jest.fn(),
        onBlur: jest.fn(),
      };
      return mockRender({ field: mockField });
    },
    useForm: jest.fn(() => ({
      control: {} as Control<FieldValues>, // Provide a mock control object
      formState: { errors: {} as FieldErrors<FieldValues> }, // Mock empty errors
    })),
  };
});

// Define a helper function to render the component with necessary props
const renderDateSelector = (props: DateSelectorProps) => {
  return render(<DateSelector {...props} />);
};

describe("DateSelector Component", () => {
  const years = [2020, 2021, 2022];
  const months = ["January", "February", "March"];

  // Mock control object
  const mockControl = {} as Control<FieldValues>;

  test("should display error messages if there are errors", () => {
    const errors = {
      year: { message: "Year is required" } as FieldError, // Type as FieldError
      month: { message: "Month is required" } as FieldError,
    } as FieldErrors<FieldValues>; // Type as FieldErrors

    renderDateSelector({
      yearName: "year",
      monthName: "month",
      years,
      months,
      errors, // Pass the errors
      control: mockControl, // Pass the mock control
    });

    // Check that the error messages are displayed
    expect(screen.getByText("Year is required")).toBeInTheDocument();
    expect(screen.getByText("Month is required")).toBeInTheDocument();
  });

  test("should not display error message when there are no errors", () => {
    renderDateSelector({
      yearName: "year",
      monthName: "month",
      years,
      months,
      errors: {} as FieldErrors<FieldValues>, // Empty errors object
      control: mockControl, // Pass the mock control
    });

    // Check that no error messages are displayed
    expect(screen.queryByText("Year is required")).toBeNull();
    expect(screen.queryByText("Month is required")).toBeNull();
  });
});

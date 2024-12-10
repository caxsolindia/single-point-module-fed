import { render, screen } from "@testing-library/react";
import ProjectListSkeleton from "./CustomSkeleton.tsx";

// Mock the MUI components
jest.mock("@mui/material", () => ({
  Box: jest.fn(({ children }) => <div>{children}</div>),
  Stack: jest.fn(({ children }) => <div>{children}</div>),
  Skeleton: jest.fn(({ variant, width, height }) => (
    <div>
      Skeleton: {variant}, {width}, {height}
    </div>
  )),
}));

describe("ProjectListSkeleton", () => {
  it("renders the correct number of skeletons", () => {
    // Arrange
    const count = 3; // Number of skeleton items to render

    // Act
    render(<ProjectListSkeleton count={count} />);

    // Assert
    const skeletonItems = screen.getAllByText(/Skeleton:/);
    expect(skeletonItems.length).toBeGreaterThanOrEqual(count);
  });

  it("renders without errors", () => {
    // Arrange
    const count = 2;

    // Act and Assert
    expect(() => render(<ProjectListSkeleton count={count} />)).not.toThrow();
  });
});

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Loader from "./Loader.js";

describe("Loader Component", () => {
  test("renders without crashing", () => {
    render(<Loader />);
    const container = screen.getByTestId("loader-container");
    expect(container).toBeInTheDocument();
  });

  test("renders CircularProgress", () => {
    render(<Loader />);
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });
});

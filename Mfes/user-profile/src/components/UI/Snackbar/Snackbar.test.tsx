import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useSnackbarStore } from "../../../Store/ToasterStore.ts";
import PositionedSnackbar from "./Snackbar.tsx";

jest.mock("../../../Store/ToasterStore.ts");

const mockedUseSnackbarStore = useSnackbarStore as jest.MockedFunction<
  typeof useSnackbarStore
>;

describe("PositionedSnackbar", () => {
  const mockClearMessage = jest.fn();

  beforeEach(() => {
    mockedUseSnackbarStore.mockReturnValue({
      message: "Test message",
      open: true,
      clearMessage: mockClearMessage,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Snackbar with the correct message", () => {
    render(<PositionedSnackbar />);

    const snackbarMessage = screen.getByText(/Test message/i);
    expect(snackbarMessage).toBeInTheDocument();
  });

  it("should not render the Snackbar when 'open' is false", () => {
    mockedUseSnackbarStore.mockReturnValue({
      message: "Test message",
      open: false,
      clearMessage: mockClearMessage,
    });

    render(<PositionedSnackbar />);

    // Snackbar should not be in the DOM
    const snackbar = screen.queryByRole("alert");
    expect(snackbar).not.toBeInTheDocument();
  });

  it("should position the Snackbar at the top-center", () => {
    render(<PositionedSnackbar />);

    const snackbar = screen.getByRole("alert");
    expect(snackbar).toBeInTheDocument();

    // Check the Snackbar position
    const snackbarContainer = screen.getByRole("alert");
    expect(snackbarContainer).toHaveStyle({ top: "65px" });
  });
});

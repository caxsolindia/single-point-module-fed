import { render, screen, fireEvent } from "@testing-library/react";
import DeleteConfirmationModal, {
  DeleteConfirmationModalProps,
} from "./DeleteConfirmationDialog.tsx";
import "@testing-library/jest-dom";

// Mock dependencies (e.g., ThemeContext, Icons)
jest.mock("styleguide/ThemeConstants", () => ({
  __esModule: true,
  default: jest.fn(() => ({ ERROR_MAIN: "#f44336" })),
}));

jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  __esModule: true,
  useThemeContext: jest.fn(() => ({ theme: "light" })),
}));

jest.mock("../../../assets/Icon/Icon.tsx", () => ({
  __esModule: true,
  CancelIcon: jest.fn(() => <div>CancelIcon</div>),
}));

describe("DeleteConfirmationModal", () => {
  const onCloseMock = jest.fn();
  const onConfirmMock = jest.fn();

  const renderComponent = (
    props: Partial<DeleteConfirmationModalProps> = {},
  ) => {
    return render(
      <DeleteConfirmationModal
        open={true}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
        {...props}
      />,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the modal with default messages", () => {
    renderComponent();

    expect(
      screen.getByText(/are you sure you want to delete this item/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/will confirming to delete this item/i),
    ).toBeInTheDocument();
  });

  it("should render the modal with custom messages", () => {
    renderComponent({
      message: "Custom delete message",
      confirmMessage: "Custom confirm message",
    });

    expect(screen.getByText("Custom delete message")).toBeInTheDocument();
    expect(screen.getByText("Custom confirm message")).toBeInTheDocument();
  });

  it("should call onClose when the cancel button is clicked", () => {
    renderComponent();
    const cancelButtons = screen.getAllByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButtons[1]);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should call onConfirm when the delete button is clicked", () => {
    renderComponent();
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when the close icon is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("CancelIcon"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("should not render the modal when 'open' prop is false", () => {
    render(
      <DeleteConfirmationModal
        open={false}
        onClose={onCloseMock}
        onConfirm={onConfirmMock}
      />,
    );

    expect(
      screen.queryByText(/are you sure you want to delete this item/i),
    ).not.toBeInTheDocument();
  });
});

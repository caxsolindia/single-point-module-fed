import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileCard from "./ProfileCard.tsx"; // Adjust the import path as necessary
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx"; // Mocked later

// Mock the useThemeContext to return a fake context
jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(),
}));

// Mock the useThemeConstant hook to return a fake theme constant
jest.mock("styleguide/ThemeConstants", () => ({
  __esModule: true,
  default: jest.fn(() => ({ GRAY_MAIN: "#ccc" })),
}));

describe("ProfileCard Component", () => {
  const themeContextMock = {
    theme: "light", // Adjust this based on your actual theme context
  };

  beforeEach(() => {
    (useThemeContext as jest.Mock).mockReturnValue(themeContextMock);
  });

  it("renders ProfileCard with children", () => {
    render(
      <ProfileCard expanded={false} onViewMore={() => {}}>
        <div data-testid="child">Test Child</div>
      </ProfileCard>,
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("renders ProfileCardHeader with title and icons", () => {
    const mockIcons = [
      {
        id: "1",
        icon: <span data-testid="icon1">Icon1</span>,
        onClick: jest.fn(),
      },
    ];

    render(<ProfileCard.Header title="Header Title" icons={mockIcons} />);

    expect(screen.getByText("Header Title")).toBeInTheDocument();
    expect(screen.getByTestId("icon1")).toBeInTheDocument();
  });

  it("renders ProfileCardBody with children", () => {
    render(
      <ProfileCard.Body>
        <div data-testid="body-child">Body Child</div>
      </ProfileCard.Body>,
    );

    expect(screen.getByTestId("body-child")).toBeInTheDocument();
  });

  it("renders ProfileCardFooter with button and children", () => {
    const mockOnViewMore = jest.fn();

    render(
      <ProfileCard.Footer
        expanded={false}
        onViewMore={mockOnViewMore}
        disabled={false}
      >
        <div data-testid="footer-child">Footer Child</div>
      </ProfileCard.Footer>,
    );

    expect(screen.getByTestId("footer-child")).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /view more/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();

    // Simulate button click
    fireEvent.click(button);
    expect(mockOnViewMore).toHaveBeenCalled();
  });

  it("disables the button when 'disabled' prop is true", () => {
    const mockOnViewMore = jest.fn();

    render(
      <ProfileCard.Footer
        expanded={false}
        onViewMore={mockOnViewMore}
        disabled={true}
      >
        <div data-testid="footer-child">Footer Child</div>
      </ProfileCard.Footer>,
    );

    const button = screen.getByRole("button", { name: /view more/i });
    expect(button).toBeDisabled();
  });

  it("changes button text based on 'expanded' prop", () => {
    const mockOnViewMore = jest.fn();

    const { rerender } = render(
      <ProfileCard.Footer
        expanded={false}
        onViewMore={mockOnViewMore}
        disabled={false}
      >
        <div data-testid="footer-child">Footer Child</div>
      </ProfileCard.Footer>,
    );

    let button = screen.getByRole("button", { name: /view more/i });
    expect(button).toBeInTheDocument();

    // Rerender with expanded true
    rerender(
      <ProfileCard.Footer
        expanded={true}
        onViewMore={mockOnViewMore}
        disabled={false}
      >
        <div data-testid="footer-child">Footer Child</div>
      </ProfileCard.Footer>,
    );

    button = screen.getByRole("button", { name: /view less/i });
    expect(button).toBeInTheDocument();
  });
});

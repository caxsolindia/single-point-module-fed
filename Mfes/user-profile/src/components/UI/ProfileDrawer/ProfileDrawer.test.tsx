import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileDrawer from "./ProfileDrawer.tsx";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";

// Mock the useProfileCardStore and useThemeContext hooks
jest.mock("../../../Store/ProfileCardStore.ts", () => ({
  useProfileCardStore: jest.fn(),
}));

jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(),
}));

describe("ProfileDrawer Component", () => {
  const mockCloseDrawer = jest.fn();
  const mockTheme = {
    breakpoints: {
      up: jest.fn(() => "@media (min-width: 960px)"),
    },
  };

  beforeEach(() => {
    (useProfileCardStore as unknown as jest.Mock).mockReturnValue({
      isDrawerOpen: true,
      closeDrawer: mockCloseDrawer,
    });

    (useThemeContext as jest.Mock).mockReturnValue({
      theme: mockTheme,
    });
  });

  test("renders ProfileDrawer when open", () => {
    render(
      <ProfileDrawer>
        <div>Test Content</div>
      </ProfileDrawer>,
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("closes drawer when onClose is triggered", () => {
    render(
      <ProfileDrawer>
        <div>Test Content</div>
      </ProfileDrawer>,
    );
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
  });

  test("renders ProfileDrawerHeader with title and icons", () => {
    const mockIcons = [
      {
        id: "icon1",
        icon: <span>Icon1</span>,
        onClick: jest.fn(),
      },
    ];

    render(<ProfileDrawer.Header title="Test Title" icons={mockIcons} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Icon1")).toBeInTheDocument();
  });

  test("calls icon onClick when icon is clicked", () => {
    const mockIcons = [
      {
        id: "icon1",
        icon: <span>Icon1</span>,
        onClick: jest.fn(),
      },
    ];

    render(<ProfileDrawer.Header title="Test Title" icons={mockIcons} />);
    const icon = screen.getByText("Icon1");

    fireEvent.click(icon);
    expect(mockIcons[0].onClick).toHaveBeenCalledTimes(1);
  });

  test("renders ProfileDrawerBody content", () => {
    render(
      <ProfileDrawer.Body>
        <div>Body Content</div>
      </ProfileDrawer.Body>,
    );
    expect(screen.getByText("Body Content")).toBeInTheDocument();
  });

  test("renders ProfileDrawerFooter content", () => {
    render(
      <ProfileDrawer.Footer>
        <div>Footer Content</div>
      </ProfileDrawer.Footer>,
    );
    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });
});

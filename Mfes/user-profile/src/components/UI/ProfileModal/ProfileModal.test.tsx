import { render, fireEvent } from "@testing-library/react";
import ProfileModal from "./ProfileModal.tsx";
import "@testing-library/jest-dom";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";

// Mocking the useProfileCardStore hook
jest.mock("../../../Store/ProfileCardStore.ts", () => ({
  useProfileCardStore: jest.fn(),
}));

// Mocking the useThemeContext hook
jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(),
}));

describe("ProfileModal component", () => {
  let mockCloseModal: jest.Mock;
  let mockIconClick: jest.Mock;

  beforeEach(() => {
    mockCloseModal = jest.fn();
    mockIconClick = jest.fn();

    // Properly cast the mocked useProfileCardStore to jest.Mock
    (useProfileCardStore as unknown as jest.Mock).mockReturnValue({
      isModalOpen: true,
      closeModal: mockCloseModal,
    });

    (useThemeContext as unknown as jest.Mock).mockReturnValue({
      theme: "light", // Provide a mock theme value
    });
  });

  it("renders ProfileModal component correctly", () => {
    const { getByText } = render(
      <ProfileModal>
        <ProfileModal.Body height="400px">Test Modal Body</ProfileModal.Body>
      </ProfileModal>,
    );

    expect(getByText("Test Modal Body")).toBeInTheDocument();
  });

  it("closes the modal when onClose is triggered", () => {
    const { getByRole } = render(
      <ProfileModal>
        <ProfileModal.Body height="400px">Test Modal Body</ProfileModal.Body>
      </ProfileModal>,
    );

    fireEvent.click(getByRole("presentation").firstChild!);

    // Ensure closeModal function is called
    expect(mockCloseModal).toHaveBeenCalled();
  });

  it("renders ProfileModal.Header component correctly and triggers icon click", () => {
    const icons = [
      { id: "icon1", icon: <span>Icon</span>, onClick: mockIconClick },
    ];

    const { getByText } = render(
      <ProfileModal>
        <ProfileModal.Header
          title="Test Modal Header"
          icons={icons}
          subtitle="Subtitle"
        />
        <ProfileModal.Body height="400px">Test Modal Body</ProfileModal.Body>
      </ProfileModal>,
    );

    expect(getByText("Test Modal Header")).toBeInTheDocument();
    expect(getByText("Icon")).toBeInTheDocument();

    fireEvent.click(getByText("Icon"));
    expect(mockIconClick).toHaveBeenCalled();
  });

  it("renders ProfileModal.Footer component correctly", () => {
    const { getByText } = render(
      <ProfileModal>
        <ProfileModal.Body height="400px">Test Modal Body</ProfileModal.Body>
        <ProfileModal.Footer>Test Modal Footer</ProfileModal.Footer>
      </ProfileModal>,
    );

    expect(getByText("Test Modal Footer")).toBeInTheDocument();
  });
});

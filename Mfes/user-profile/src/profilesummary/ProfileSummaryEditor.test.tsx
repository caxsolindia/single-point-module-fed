import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileSummaryEditor from "./ProfileSummaryEditor.tsx";
import { useProfileStore } from "../Store/ProfileStore.ts";
import { useProfileSummaryStore } from "../Store/ProfileSummaryStore.ts";
import { useUserDataStore } from "../Store/UserDateStore.ts";
import { validateProfile } from "../components/UI/Validation/ProfileSummaryValidation.ts";
import {
  useGetSummary,
  useUpdateSummary,
} from "../components/UI/Shared/GraphqlQueries/UserProfile.ts";

// Mocking stores and GraphQL hooks
jest.mock("../Store/ProfileStore.ts", () => ({
  useProfileStore: jest.fn(),
}));

jest.mock("../Store/ProfileSummaryStore.ts", () => ({
  useProfileSummaryStore: jest.fn(),
}));

jest.mock("../Store/UserDateStore.ts", () => ({
  useUserDataStore: jest.fn(),
}));

jest.mock("../components/UI/Validation/ProfileSummaryValidation.ts", () => ({
  validateProfile: jest.fn(),
}));

jest.mock("../components/UI/Shared/GraphqlQueries/UserProfile.ts", () => ({
  useGetSummary: jest.fn(),
  useUpdateSummary: jest.fn(),
}));

describe("ProfileSummaryEditor", () => {
  const mockSetEditMode = jest.fn();
  const mockStoreProfileSummary = jest.fn();
  const mockLoadSumm = jest.fn();
  const mockUpdateSummaryInDB = jest.fn();

  beforeEach(() => {
    (useProfileStore as unknown as jest.Mock).mockReturnValue({
      setEditMode: mockSetEditMode,
    });
    (useProfileSummaryStore as unknown as jest.Mock).mockReturnValue({
      profileSum: "Test profile summary",
      setProfileSum: mockStoreProfileSummary,
    });
    (useUserDataStore as unknown as jest.Mock).mockReturnValue({
      userId: "123",
      username: "testuser",
    });
    (useGetSummary as jest.Mock).mockReturnValue({ loadSumm: mockLoadSumm });
    (useUpdateSummary as jest.Mock).mockReturnValue({
      updateSummaryInDB: mockUpdateSummaryInDB,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with initial props", () => {
    render(<ProfileSummaryEditor profileSummary="Initial profile summary" />);

    const input = screen
      .getByTestId("profile-summary-input")
      .querySelector("textarea");

    expect(input).toHaveValue("Test profile summary");
  });

  test("updates character count when typing", () => {
    render(<ProfileSummaryEditor profileSummary="" />);

    const input = screen
      .getByTestId("profile-summary-input")
      .querySelector("textarea"); // Use "textarea" for multiline fields

    fireEvent.change(input!, { target: { value: "New text" } });

    expect(input).toHaveValue("New text");
    expect(
      screen.getByText("Maximum limit 8/2500 characters"),
    ).toBeInTheDocument();
  });

  test("displays validation error when validation fails", async () => {
    (validateProfile as jest.Mock).mockResolvedValue({
      summary: "Error in summary",
    });

    render(<ProfileSummaryEditor profileSummary="Test profile summary" />);

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    expect(validateProfile).toHaveBeenCalledWith("Test profile summary");
    expect(await screen.findByText("Error in summary")).toBeInTheDocument();
  });

  test("calls update summary when save button is clicked", async () => {
    // Mock validation to pass with no errors
    (validateProfile as jest.Mock).mockResolvedValue({});

    // Mock the response from updateSummaryInDB
    mockUpdateSummaryInDB.mockResolvedValue({
      data: { updateSummary: true },
    });

    render(<ProfileSummaryEditor profileSummary="Test profile summary" />);

    const input = screen
      .getByTestId("profile-summary-input")
      .querySelector("textarea");

    fireEvent.change(input!, { target: { value: "Updated summary" } });

    const saveButton = screen.getByTestId("save-button");
    expect(saveButton).not.toBeDisabled();

    fireEvent.click(saveButton);

    await screen.findByTestId("save-button");

    expect(mockUpdateSummaryInDB).toHaveBeenCalledWith({
      variables: { username: "testuser", description: "Updated summary" },
    });

    expect(mockSetEditMode).toHaveBeenCalledWith("02", false);
  });

  test("calls setEditMode when cancel button is clicked", () => {
    render(<ProfileSummaryEditor profileSummary="Test profile summary" />);

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockSetEditMode).toHaveBeenCalledWith("02", false);
  });
});

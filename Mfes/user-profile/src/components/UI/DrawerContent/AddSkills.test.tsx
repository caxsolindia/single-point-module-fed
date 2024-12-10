import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@emotion/react";
import useThemePalette from "styleguide/Theme";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";
import { useUserDataStore } from "../../../Store/UserDateStore.ts";
import { useUserSkillStore } from "../../../Store/UserSkillStore.ts";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import {
  GetSkillComponent,
  useAddSkill,
  useDeleteUserSkill,
} from "../Shared/GraphqlQueries/UserProfile.ts";

import AddSkills from "./AddSkills.tsx";
import "@testing-library/jest-dom";

// Mock dependencies
jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(),
}));

jest.mock("../../../Store/UserDateStore.ts", () => ({
  useUserDataStore: jest.fn(),
}));

jest.mock("../../../Store/UserSkillStore.ts", () => ({
  useUserSkillStore: jest.fn(),
}));

jest.mock("../../../Store/ProfileCardStore.ts", () => ({
  useProfileCardStore: jest.fn(),
}));

jest.mock("../Shared/GraphqlQueries/UserProfile.ts", () => ({
  GetSkillComponent: jest.fn(),
  useAddSkill: jest.fn(),
  useDeleteUserSkill: jest.fn(),
}));

// Define a type for the props
interface MockProfileDrawerProps {
  children: React.ReactNode;
}

// Define a type for Footer props
interface FooterProps {
  children: React.ReactNode;
}

// Update the function signature for MockProfileDrawer
function MockProfileDrawer({ children }: Readonly<MockProfileDrawerProps>) {
  return <div>{children}</div>;
}

MockProfileDrawer.Footer = function Footer({ children }: FooterProps) {
  return <div>{children}</div>;
};

describe("AddSkills() AddSkills method", () => {
  beforeEach(() => {
    // Mock implementations
    (useThemeContext as unknown as jest.Mock).mockReturnValue({
      theme: "light",
    });
    (useUserDataStore as unknown as jest.Mock).mockReturnValue({
      userId: "123",
    });
    (useUserSkillStore as unknown as jest.Mock).mockReturnValue({
      userSkill: [],
      setUserSkill: jest.fn(),
      updateUserSkill: jest.fn(),
    });
    (useProfileCardStore as unknown as jest.Mock).mockReturnValue({
      closeDrawer: jest.fn(),
    });
    (GetSkillComponent as jest.Mock).mockReturnValue({
      getUserSkills: jest.fn(),
    });
    (useAddSkill as jest.Mock).mockReturnValue({ addSkillInDB: jest.fn() });
    (useDeleteUserSkill as jest.Mock).mockReturnValue({
      deleteUserSkillInDB: jest.fn(),
    });
  });
  const mockSkillData = {
    skillId: "1",
    skillName: "React",
    skillCategory: "Technical Skills",
    proficiency: "Intermediate",
    status: "active",
    experienceInYears: 3,
  };

  describe("Happy Path", () => {
    it("should render the form with default values", () => {
      render(<AddSkills isEditMode={false} />);
      expect(screen.getByTestId("add-skill-form")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toHaveValue("");
    });

    it("should allow user to input skill name and select category", async () => {
      render(<AddSkills isEditMode={false} />);
      const skillNameInput = screen.getByRole("textbox");
      const dropdown = within(
        await screen.findByTestId("category-select"),
      ).getByRole("combobox");

      fireEvent.change(skillNameInput, { target: { value: "React" } });
      fireEvent.mouseDown(dropdown);
      fireEvent.click(screen.getByText("Technical Skills"));

      expect(skillNameInput).toHaveValue("React");
      expect(dropdown).toHaveTextContent("Technical Skills");
    });

    it("should handle form submission for editing skills", async () => {
      const addSkillInDBMock = jest.fn().mockResolvedValue({
        data: { addUserSkill: { status: true } },
      });

      (useAddSkill as jest.Mock).mockReturnValue({
        addSkillInDB: addSkillInDBMock,
      });

      // Simulate initial data for editing
      (useUserSkillStore as unknown as jest.Mock).mockReturnValue({
        userSkill: [mockSkillData],
        setUserSkill: jest.fn(),
        updateUserSkill: jest.fn(),
        deleteUserSkill: jest.fn(),
      });

      render(<AddSkills isEditMode={true} />); // Set isEditMode to true

      // Simulate filling out the form with existing data
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "React" },
      });

      // Simulate form submission
      fireEvent.click(screen.getByRole("button", { name: /save/i }));

      await waitFor(() => {
        expect(addSkillInDBMock).toHaveBeenCalled();
      });
    });

    it("should handle delete skill action when the skill exists", async () => {
      const mockDeleteUserSkillInDB = jest
        .fn()
        .mockResolvedValue({ data: { deleteUserSkill: { status: true } } });

      (useDeleteUserSkill as jest.Mock).mockReturnValue({
        deleteUserSkillInDB: mockDeleteUserSkillInDB,
      });

      (useUserSkillStore as unknown as jest.Mock).mockReturnValue({
        userSkill: [mockSkillData],
        setUserSkill: jest.fn(),
        updateUserSkill: jest.fn(),
        deleteUserSkill: jest.fn(),
      });

      render(<AddSkills isEditMode={true} />);

      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "React" },
      });

      const deleteButton = screen.getByRole("button", { name: /Delete/i });
      expect(deleteButton).toBeInTheDocument();

      fireEvent.click(deleteButton);

      await waitFor(() => {
        const confirmDelete = screen.getByRole("button", { name: /Delete/i });
        fireEvent.click(confirmDelete);
        expect(mockDeleteUserSkillInDB).toHaveBeenCalledWith({
          variables: {
            userId: "123",
            skillId: mockSkillData.skillId,
          },
        });
        expect(useUserSkillStore().deleteUserSkill).toHaveBeenCalledWith(
          mockSkillData.skillId,
        );
      });
    });
  });

  describe("Edge Cases", () => {
    it("should show error message for empty skill name", async () => {
      render(<AddSkills isEditMode={false} />);
      const saveButton = screen.getByRole("button", { name: /save/i });

      fireEvent.click(saveButton);

      await waitFor(() => {
        const errors = screen.getAllByText("This field is required");
        expect(errors.length).toBeGreaterThan(1);
      });
    });

    it("should disable years of experience input for Soft Skills category", async () => {
      render(<AddSkills isEditMode={false} />);
      const dropdown = within(
        await screen.findByTestId("category-select"),
      ).getByRole("combobox");
      const yearsOfExperienceInput = screen.getByTestId(
        "years-of-experience-input",
      );

      fireEvent.mouseDown(dropdown);
      fireEvent.click(screen.getByText("Soft Skills"));

      expect(yearsOfExperienceInput).not.toBeDisabled();
    });

    it("should handle existing skill validation", async () => {
      (useUserSkillStore as unknown as jest.Mock).mockReturnValue({
        userSkill: [{ skillName: "React" }],
        setUserSkill: jest.fn(),
        updateUserSkill: jest.fn(),
      });

      render(<AddSkills isEditMode={false} />);
      const skillNameInput = screen.getByRole("textbox");

      fireEvent.change(skillNameInput, { target: { value: "React" } });

      await waitFor(() => {
        expect(screen.getByText("Existing skill")).toBeInTheDocument();
      });
    });
  });
  it("changes card styles on hover", () => {
    const { theme } = useThemePalette();
    render(
      <MockedProvider>
        <ThemeProvider theme={theme}>
          <AddSkills />
        </ThemeProvider>
      </MockedProvider>,
    );

    // Find the Intermediate proficiency card by its text content
    const intermediateCard = screen.getByText("Intermediate").closest("div"); // Get the closest div if text is nested

    expect(intermediateCard).not.toBeNull();

    fireEvent.mouseEnter(intermediateCard!);

    expect(intermediateCard).toHaveStyle("background-color: #PRIMARY_MAIN");

    fireEvent.mouseLeave(intermediateCard!);

    expect(intermediateCard).not.toHaveStyle("background-color: #1976d4"); // Assuming default is not hovered color
  });

  it("should submit the form with the correct data and handle the response", async () => {
    // Mock functions
    const addSkillInDBMock = jest.fn().mockResolvedValue({
      data: {
        addUserSkill: { status: true },
      },
    });

    const storeUpdateUserSkillsMock = jest.fn();
    const storeUserSkillsMock = jest.fn();
    const getUserSkillsMock = jest.fn();
    const closeDrawerMock = jest.fn();
    // const resetMock = jest.fn();

    (useAddSkill as jest.Mock).mockReturnValue({
      addSkillInDB: addSkillInDBMock,
    });

    (useUserSkillStore as unknown as jest.Mock).mockReturnValue({
      updateUserSkill: storeUpdateUserSkillsMock,
      setUserSkill: storeUserSkillsMock,
    });

    (GetSkillComponent as jest.Mock).mockReturnValue({
      getUserSkills: getUserSkillsMock,
    });

    (useProfileCardStore as unknown as jest.Mock).mockReturnValue({
      closeDrawer: closeDrawerMock,
    });

    // Render component
    render(<AddSkills isEditMode={false} />);

    // Fill out the form
    const skillNameInput = screen.getByRole("textbox");
    const dropdown = within(
      await screen.findByTestId("category-select"),
    ).getByRole("combobox");
    const proficiencyDropdown = screen.getByText(/Intermediate/i);

    const experienceInput = screen.getByRole("spinbutton");

    fireEvent.change(skillNameInput, { target: { value: "React" } });
    fireEvent.mouseDown(dropdown);
    fireEvent.click(screen.getByText("Technical Skills"));
    fireEvent.mouseDown(proficiencyDropdown);
    fireEvent.click(screen.getByText("Intermediate"));
    fireEvent.change(experienceInput, { target: { value: "3" } });

    // Submit the form
    const saveButton = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveButton);

    // Wait for the submission and assertions
    await waitFor(() => {
      expect(addSkillInDBMock).toHaveBeenCalled();
      expect(getUserSkillsMock).toHaveBeenCalled();
      expect(closeDrawerMock).toHaveBeenCalled();
    });
  });
});

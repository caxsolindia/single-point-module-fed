import { render, screen, waitFor } from "@testing-library/react";
import { useProfileStore } from "../../../Store/ProfileStore.ts";
import { useUserSkillStore, UserSkill } from "../../../Store/UserSkillStore.ts";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { GetSkillComponent } from "../Shared/GraphqlQueries/UserProfile.ts";
import SkillComponent from "./SkillComponent.tsx";
import "@testing-library/jest-dom";
import {
  mapProficiencyToLevel,
  mapUserSkills,
} from "../Shared/CommonFunctions.ts"; // Ensure correct import
import { GetUserSkillsQuery } from "../../../gql/operations.ts";

// Define the props interface for MockSkillLevel
interface MockSkillLevelProps {
  level: number; // or appropriate type based on your application
}

// Mock SkillLevel component
function MockSkillLevel({ level }: Readonly<MockSkillLevelProps>) {
  return <div data-testid="skill-level">{level}</div>;
}

// Mock necessary hooks and functions
jest.mock("./SkillLevel.tsx", () => MockSkillLevel);
jest.mock("../../../Store/ProfileStore.ts", () => ({
  useProfileStore: jest.fn(),
}));
jest.mock("../../../Store/UserSkillStore.ts", () => ({
  useUserSkillStore: jest.fn(),
}));
jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(),
}));

jest.mock("../Shared/GraphqlQueries/UserProfile.ts", () => ({
  GetSkillComponent: jest.fn(),
}));
jest.mock("../Shared/CommonFunctions.ts", () => ({
  mapProficiencyToLevel: jest.fn(),
  mapUserSkills: jest.fn(),
}));

describe("SkillComponent", () => {
  let mockProfileStore: { expandedCardIds: string[] };
  let mockUserSkillStore: {
    userSkill: UserSkill[] | null;
    setUserSkill: jest.Mock;
  };
  let mockThemeContext: { theme: string };
  let mockGetSkillComponent: {
    getUserSkills: jest.Mock;
    data: { getUserSkills: { data: UserSkill[] | null } } | null;
  };

  beforeEach(() => {
    mockProfileStore = { expandedCardIds: ["04"] };
    mockUserSkillStore = { userSkill: null, setUserSkill: jest.fn() };
    mockThemeContext = { theme: "light" };
    mockGetSkillComponent = { getUserSkills: jest.fn(), data: null };

    (useProfileStore as unknown as jest.Mock).mockReturnValue(mockProfileStore);
    (useUserSkillStore as unknown as jest.Mock).mockReturnValue(
      mockUserSkillStore,
    );
    (useThemeContext as jest.Mock).mockReturnValue(mockThemeContext);
    (GetSkillComponent as jest.Mock).mockReturnValue(mockGetSkillComponent);
    (mapProficiencyToLevel as jest.Mock).mockImplementation(
      (proficiency: number) => proficiency,
    );
    (mapUserSkills as jest.Mock).mockImplementation(
      (data: GetUserSkillsQuery | undefined) => data,
    );
  });

  describe("Happy Path", () => {
    it("should render loading state initially", () => {
      render(<SkillComponent />);
      expect(screen.getByText("Data is Loading")).toBeInTheDocument();
    });

    it("should render skills when data is available", async () => {
      const mockSkills: UserSkill[] = [
        {
          userId: "1",
          skillId: "skill1",
          skillName: "JavaScript",
          experienceInYears: "3",
          skillCategory: "Programming",
          proficiency: "Intermediate",
          status: true,
        },
      ];
      mockGetSkillComponent.data = { getUserSkills: { data: mockSkills } };
      mockUserSkillStore.userSkill = mockSkills;

      render(<SkillComponent />);
      await waitFor(() =>
        expect(screen.getByTestId("skill-chip")).toBeInTheDocument(),
      );
      expect(screen.getByText("JavaScript")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle no skills gracefully", async () => {
      mockGetSkillComponent.data = { getUserSkills: { data: [] } };
      mockUserSkillStore.userSkill = [];

      render(<SkillComponent />);
      await waitFor(() =>
        expect(screen.queryByTestId("skill-chip")).not.toBeInTheDocument(),
      );
    });

    it("should handle null skill data gracefully", async () => {
      mockGetSkillComponent.data = { getUserSkills: { data: null } };
      mockUserSkillStore.userSkill = null;

      render(<SkillComponent />);
      await waitFor(() =>
        expect(screen.queryByTestId("skill-chip")).not.toBeInTheDocument(),
      );
    });
  });
});

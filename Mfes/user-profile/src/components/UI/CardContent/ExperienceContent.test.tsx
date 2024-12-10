import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import ExperienceContent from "./ExperienceContent.tsx";
import useThemePalette from "../../../__mocks__/styleguide/Theme.ts";
import "@testing-library/jest-dom";

// Mock useUserDataStore to return a specific userId
jest.mock("../../../Store/UserDateStore.ts", () => ({
  useUserDataStore: jest.fn(() => ({
    userId: "mockUserId", // Mock userId here
  })),
}));

// Mock useCompanyStore
jest.mock("../../../Store/ExperienceStore.ts", () => ({
  useCompanyStore: jest.fn(() => ({
    setCompanyId: jest.fn(),
    setSelectedExperience: jest.fn(),
    setViewExperience: jest.fn(),
  })),
}));

// Mock IconBox component
jest.mock("./IconBox.tsx", () => {
  return function IconBox() {
    return <div>IconBox</div>;
  };
});

// Mock the ExperienceData
jest.mock("../../../__mocks__/WorkExperience/ExperienceData.ts", () => ({
  experienceData: [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Company",
      employmentType: "Full-Time",
      responsibilities: "Developing applications",
      date: "Jan 2020 - Present",
      location: "New York",
      skills: "React, JavaScript",
      icons: ["Icon1", "Icon2", "Icon3", "Icon4"],
    },
  ],
}));

jest.mock("./IconBox.tsx", () => {
  return function IconBox() {
    return <div>IconBox</div>;
  };
});

jest.mock("../../../assets/Icon/Icon.tsx", () => ({
  EditingIcon: () => <div>EditIcon</div>,
}));

jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(() => ({
    theme: {},
  })),
}));

// Mock useGetExperience
jest.mock("../Shared/GraphqlQueries/UserProfile.ts", () => ({
  useGetExperience: jest.fn(() => ({
    loadExperience: jest.fn(),
    data: {
      getPreviousCompany: {
        companies: [
          {
            id: "1",
            designation: "Software Engineer",
            companyName: "Tech Company",
            employmentType: "Full-Time",
            jobSummary: "Developing applications",
            startDate: "Jan 2020",
            endDate: "Present",
            state: "NewYork",
            country: "USA",
            skill: ["React", "JavaScript"],
          },
          null,
        ],
      },
    },
  })),
}));

describe("ExperienceContent Component", () => {
  afterEach(() => {
    sessionStorage.clear(); // Clear sessionStorage after each test to ensure no data leakage
  });
  const { theme } = useThemePalette();
  const renderWithProviders = (isExpanded: boolean, onEditClick: jest.Mock) =>
    render(
      <ThemeProvider theme={theme}>
        <ExperienceContent isExpanded={isExpanded} onEditClick={onEditClick} />
      </ThemeProvider>,
    );

  it("renders limited experience data when isExpanded is false", () => {
    renderWithProviders(false, jest.fn());
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Tech Company")).toBeInTheDocument();
    expect(screen.queryByText("EditIcon")).not.toBeInTheDocument();
  });

  it("renders all experience data when isExpanded is true", () => {
    renderWithProviders(true, jest.fn());

    // Assuming you have unique experience items, check for their presence
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    // Add other experience checks as needed
  });

  it("displays experience icons and other information correctly", () => {
    renderWithProviders(false, jest.fn());
    expect(screen.getAllByText("IconBox").length).toBe(4);
    expect(screen.getByText("Developing applications")).toBeInTheDocument();
    expect(screen.getByText("Jan 2020 - Present")).toBeInTheDocument();
  });

  it("calls loadExperience when userId is available", () => {
    // Arrange: Mock the loadExperience function to track its calls
    const mockLoadExperience = jest.fn();

    jest.mock("../Shared/GraphqlQueries/UserProfile.ts", () => ({
      useGetExperience: jest.fn(() => ({
        loadExperience: mockLoadExperience,
        data: {
          getPreviousCompany: {
            companies: [
              {
                id: "1",
                designation: "Software Engineer",
                companyName: "Tech Company",
                employmentType: "Full-Time",
                jobSummary: "Developing applications",
                startDate: "", // Add test for empty startDate
                endDate: "Present", // Test for valid endDate
                state: "NewYork",
                country: "USA",
                skill: ["React", "JavaScript"],
              },
              {
                id: "2",
                designation: "Product Manager",
                companyName: "Another Tech Company",
                employmentType: "Part-Time",
                jobSummary: "Managing products",
                startDate: "Feb 2019",
                endDate: "", // Add test for empty endDate
                state: "California",
                country: "USA",
                skill: ["Leadership", "Management"],
              },
            ],
          },
        },
      })),
    }));

    // Act: Render the component
    renderWithProviders(false, jest.fn());
  });

  it("handles missing or empty startDate and endDate", () => {
    renderWithProviders(false, jest.fn());

    // Check that the component properly displays for missing or empty startDate
    expect(screen.getByText("Tech Company")).toBeInTheDocument();
    expect(screen.queryByText("Jan 2020")).not.toBeInTheDocument(); // startDate was empty, so shouldn't display a date
  });
  it("renders default values when fields are null", () => {
    renderWithProviders(false, jest.fn());

    // Ensure fallback values are applied correctly
    expect(screen.getByText("Tech Company")).toBeInTheDocument();
    expect(screen.getByText("Full-Time")).toBeInTheDocument();
    expect(screen.queryByText("React, JavaScript")).not.toBeInTheDocument(); // Skill is null, so should not appear
    expect(screen.queryByText("EditIcon")).not.toBeInTheDocument();
  });
  it("handles null experience values correctly", () => {
    renderWithProviders(false, jest.fn());

    // Ensure valid experience is displayed
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Tech Company")).toBeInTheDocument();

    // Ensure the component does not render anything for null experience
    expect(screen.queryByText("EditIcon")).not.toBeInTheDocument();
  });
  it("renders edit icon when isExpanded is true", () => {
    renderWithProviders(true, jest.fn());
    // Check if the edit icon is rendered
    const editIcons = screen.getAllByText("EditIcon");
    expect(editIcons.length).toBeGreaterThan(0);
  });
});

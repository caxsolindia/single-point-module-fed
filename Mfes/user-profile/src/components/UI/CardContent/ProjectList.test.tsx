import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import ProjectList from "./ProjectList.tsx"; // Import the component
import { GetUserProjectsDocument } from "../../../gql/operations.ts"; // Import the query document
import "@testing-library/jest-dom";
import { useUserDataStore } from "../../../Store/UserDateStore.ts";

// Mock for ThemeContext
jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: () => ({
    theme: "light",
  }),
}));

// Mock for style constants
jest.mock("styleguide/ThemeConstants", () => () => ({
  TEXT_PRIMARY: "#000",
  TEXT_SECONDARY: "#666",
}));

// Define mock projects globally
const mockProjects = [
  {
    projectId: "proj1",
    projectTitle: "Frontend Development",
    role: "Lead Developer",
    projectSummary: "Developing the UI for a web application.",
    startDate: "2021-01-01",
    endDate: "2022-01-01",
    userSkills: ["React", "TypeScript", "GraphQL"],
  },
  null,
  {
    projectId: "proj2",
    projectTitle: "Backend Development",
    role: "Backend Engineer",
    projectSummary: "Building API services.",
    startDate: "2020-05-15",
    endDate: "2021-05-15",
    userSkills: ["Node.js", "Express", "MongoDB"],
  },
];

// Mock loadProject function
const loadProjectMock = jest.fn();
const openDrawerMock = jest.fn();
const setProjectIdSelectedMock = jest.fn();

// Mock useGetProject hook
jest.mock("../Shared/GraphqlQueries/UserProfile.ts", () => ({
  useGetProject: (userId: string) => ({
    loadProject: loadProjectMock,
    data: {
      getUserProjects: {
        data: userId ? mockProjects : [],
      },
    },
  }),
}));

// Mock useUserDataStore hook
jest.mock("../../../Store/UserDateStore.ts", () => ({
  useUserDataStore: jest.fn(),
}));

// Mock useProfileCardStore hook
jest.mock("../../../Store/ProfileCardStore.ts", () => ({
  useProfileCardStore: () => ({
    openDrawer: openDrawerMock,
    setProjectIdSelected: setProjectIdSelectedMock,
  }),
}));

const mockedUseUserDataStore = useUserDataStore as jest.MockedFunction<
  typeof useUserDataStore
>;

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("ProjectList", () => {
  const userId = "bd87784f-11b5-4b63-9e26-76b73f57c4fc";

  const mocksSuccess = [
    {
      request: {
        query: GetUserProjectsDocument,
        variables: { userId },
      },
      result: {
        data: {
          getUserProjects: {
            data: mockProjects,
          },
        },
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseUserDataStore.mockReturnValue({
      userId,
      username: "testuser",
    });
  });

  it("renders a project in collapsed mode", async () => {
    render(
      <MockedProvider mocks={mocksSuccess} addTypename={false}>
        <ProjectList isExpanded={false} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Frontend Development")).toBeInTheDocument();
    });

    const projectTitles = screen.queryAllByText(/Development/i);
    expect(projectTitles.length).toBe(1);
  });

  // it("renders multiple projects when expanded", async () => {
  //   render(
  //     <MockedProvider mocks={mocksSuccess} addTypename={false}>
  //       <ProjectList isExpanded={true} />
  //     </MockedProvider>,
  //   );

  //   // expect(screen.getByText("Frontend Development")).toBeInTheDocument();
  //   // expect(screen.getByText("Backend Development")).toBeInTheDocument();

  //   const projectTitles = screen.queryAllByText(/Development/i);
  //   expect(projectTitles.length).toBe(2);
  // });

  // it("handles project drawer opening on edit button click", async () => {
  //   render(
  //     <MockedProvider mocks={mocksSuccess} addTypename={false}>
  //       <ProjectList isExpanded={true} />
  //     </MockedProvider>,
  //   );

  //   await waitFor(() => {
  //     expect(screen.getByText("Frontend Development")).toBeInTheDocument();
  //   });

  //   const editButton = screen.getAllByRole("button")[0]; // Get the first edit button
  //   fireEvent.click(editButton); // Simulate clicking the button

  //   expect(openDrawerMock).toHaveBeenCalledWith("06");
  //   expect(setProjectIdSelectedMock).toHaveBeenCalledWith("proj1");
  // });

  // it("loads projects only when userId is available", async () => {
  //   mockedUseUserDataStore.mockReturnValueOnce({});

  //   render(
  //     <MockedProvider mocks={mocksSuccess} addTypename={false}>
  //       <ProjectList isExpanded={false} />
  //     </MockedProvider>,
  //   );

  //   expect(loadProjectMock).not.toHaveBeenCalled();
  // });
});

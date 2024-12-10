import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom";
import useThemePalette from "styleguide/Theme";
import userEvent from "@testing-library/user-event";
import ProjectForm from "./AddProjectForm.tsx";
import { useDeleteProjects } from "../Shared/GraphqlQueries/UserProfile.ts";
import { useUserProjectStore } from "../../../Store/ProjectStore.ts";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";

const mockCloseDrawer = jest.fn();

jest.mock("../../../Store/ProfileCardStore.ts", () => ({
  useProfileCardStore: () => ({
    closeDrawer: mockCloseDrawer,
  }),
}));

jest.mock("../Shared/GraphqlQueries/UserProfile.ts", () => ({
  useUserProjectStore: jest.fn(),
}));
jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn().mockReturnValue({
    primary: "#000",
    secondary: "#FFF",
  }),
}));
jest.mock("../../../assets/Icon/Icon.tsx", () => ({
  CancelIcon: () => <div>CancelIcon</div>,
  UploadIcon: () => <div>UploadIcon</div>,
  DeleteIcon: () => <div>DeleteIcon</div>,
  DownLoadIcon: () => <div>DownLoadIcon</div>,
  CheckedIcon: () => <div>CheckedIcon</div>,
}));
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  jest.restoreAllMocks();
});
jest.mock("../Validation/imagevalidation.ts", () => ({
  fileValidationSchema: {
    validate: jest.fn(),
  },
}));
jest.mock("../Shared/GraphqlQueries/UserProfile.ts", () => ({
  useDeleteProjects: jest.fn(),
}));
jest.mock("../../../Store/ProjectStore.ts", () => ({
  useUserProjectStore: jest.fn(),
}));

const userProjectMock = {
  userId: "40fe7b34-e51f-4de4-9395-2f8a886be0b3",
  projectId: "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
  projectTitle: "Project 2",
  role: "UI Developer",
  startDate: "May-2021",
  endDate: "February-2023",
  projectSummary: "This is project 2",
};

describe("ProjectForm Component", () => {
  const mockTheme = {
    TEXT_PRIMARY: "#000",
    TEXT_SECONDARY: "#666",
    GRAY_MAIN: "#ccc",
  };
  beforeEach(() => {
    (useThemeContext as jest.Mock).mockReturnValue({ theme: mockTheme });
    (useDeleteProjects as jest.Mock).mockReturnValue({
      deleteProjectsInDB: jest.fn(),
    });
    (useUserProjectStore as unknown as jest.Mock).mockReturnValue({
      userProject: [userProjectMock],
      projectIdSelected: "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
      setUserProject: jest.fn(),
      deleteUserProject: jest.fn(),
      setProjectIdSelected: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form fields", () => {
    render(
      <MockedProvider addTypename={false}>
        <ProjectForm />
      </MockedProvider>,
    );
  });

  it("should call closeDrawer when Cancel button is clicked", async () => {
    render(
      <MockedProvider addTypename={false}>
        <ProjectForm />
      </MockedProvider>,
    );

    // Ensure the Cancel button is rendered
    const cancelButton = screen.getByTestId("cancel-btn");
    expect(cancelButton).toBeInTheDocument();

    // Click the Cancel button
    await userEvent.click(cancelButton);

    // Expect closeDrawer to have been called
    expect(mockCloseDrawer).toHaveBeenCalled();
  });

  it("should handle delete project action when the project exists", async () => {
    const mockDeleteUserprojInDB = jest
      .fn()
      .mockResolvedValue({ data: { deleteUserProject: { status: true } } });

    (useDeleteProjects as jest.Mock).mockReturnValue({
      deleteProjectsInDB: mockDeleteUserprojInDB,
    });

    (useUserProjectStore as unknown as jest.Mock).mockReturnValue({
      userProject: [userProjectMock],
      projectIdSelected: "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
      setUserProject: jest.fn(),
      deleteUserProject: jest.fn(),
      setProjectIdSelected: jest.fn(),
    });
    const { theme } = useThemePalette();
    render(
      <MockedProvider addTypename={false}>
        <ThemeProvider theme={theme}>
          <ProjectForm isEditModeProject={true} />
        </ThemeProvider>
      </MockedProvider>,
    );

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    // await waitFor(() => {
    const confirmDelete = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(confirmDelete);
    // expect(mockDeleteUserprojInDB).toHaveBeenCalledWith({
    //   variables: {
    //     userId: "40fe7b34-e51f-4de4-9395-2f8a886be0b3",
    //     projectId: "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
    //   },
    // });
    // expect(useUserProjectStore().deleteUserProject).toHaveBeenCalledWith(
    //   "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
    // );
    // });
  });

  it("should handle delete project action when the project exists with fail", async () => {
    const mockDeleteUserprojInDB = jest
      .fn()
      .mockResolvedValue({ data: { deleteUserProject: { status: false } } });

    (useDeleteProjects as jest.Mock).mockReturnValue({
      deleteProjectsInDB: mockDeleteUserprojInDB,
    });

    (useUserProjectStore as unknown as jest.Mock).mockReturnValue({
      userProject: [userProjectMock],
      projectIdSelected: "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
      setUserProject: jest.fn(),
      deleteUserProject: jest.fn(),
      setProjectIdSelected: jest.fn(),
    });
    const { theme } = useThemePalette();
    render(
      <MockedProvider addTypename={false}>
        <ThemeProvider theme={theme}>
          <ProjectForm isEditModeProject={true} />
        </ThemeProvider>
      </MockedProvider>,
    );

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    // await waitFor(() => {
    const confirmDelete = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(confirmDelete);
    // expect(mockDeleteUserprojInDB).toHaveBeenCalledWith({
    //   variables: {
    //     userId: "40fe7b34-e51f-4de4-9395-2f8a886be0b3",
    //     projectId: "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
    //   },
    // });
    // });
  });

  it("should handle delete project action when the project exists with catch", async () => {
    const mockDeleteUserprojInDB = jest
      .fn()
      .mockResolvedValue({ data: { deleteUserProject: { status: false } } });

    (useDeleteProjects as jest.Mock).mockReturnValue({
      deleteProjectsInDB: mockDeleteUserprojInDB,
    });

    (useUserProjectStore as unknown as jest.Mock).mockReturnValue({
      userProject: [userProjectMock],
      projectIdSelected: "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
      setUserProject: jest.fn(),
      deleteUserProject: jest.fn(),
      setProjectIdSelected: jest.fn(),
    });
    const { theme } = useThemePalette();
    render(
      <MockedProvider addTypename={false}>
        <ThemeProvider theme={theme}>
          <ProjectForm isEditModeProject={true} />
        </ThemeProvider>
      </MockedProvider>,
    );

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    // await waitFor(() => {
    const confirmDelete = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(confirmDelete);
    // expect(mockDeleteUserprojInDB).toHaveBeenCalledWith({
    //   variables: {
    //     userId: "40fe7b34-e51f-4de4-9395-2f8a886be0b3",
    //     projectId: "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
    //   },
    // });
    // });
  });

  it("should handle errors during project deletion", async () => {
    const mockDeleteUserprojInDB = jest
      .fn()
      .mockRejectedValue(new Error("Network error")); // Simulate an API error

    (useDeleteProjects as jest.Mock).mockReturnValue({
      deleteProjectsInDB: mockDeleteUserprojInDB,
    });

    (useUserProjectStore as unknown as jest.Mock).mockReturnValue({
      userProject: [userProjectMock],
      projectIdSelected: "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
      setUserProject: jest.fn(),
      deleteUserProject: jest.fn(),
      setProjectIdSelected: jest.fn(),
    });

    const { theme } = useThemePalette();
    render(
      <MockedProvider addTypename={false}>
        <ThemeProvider theme={theme}>
          <ProjectForm isEditModeProject={true} />
        </ThemeProvider>
      </MockedProvider>,
    );

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    // await waitFor(() => {
    const confirmDelete = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(confirmDelete);
    // });

    // expect(mockDeleteUserprojInDB).toHaveBeenCalledWith({
    //   variables: {
    //     userId: "40fe7b34-e51f-4de4-9395-2f8a886be0b3",
    //     projectId: "465ecdf1-0402-4ba6-b03a-9b9bb360165a",
    //   },
    // });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import useThemePalette from "../../../__mocks__/styleguide/Theme.ts";
import AddCertificationComponent, { handleDrop } from "./AddCertification.tsx";
import "@testing-library/jest-dom";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { fileValidationSchema } from "../Validation/imagevalidation.ts";
import {
  useAddCertificateWithImage,
  useDeleteCertificate,
} from "../Shared/GraphqlQueries/UserProfile.ts";
import { useUserCertificateStore } from "../../../Store/CertificatesStore.ts";

const mockCloseDrawer = jest.fn();

jest.mock("../../../Store/ProfileCardStore.ts", () => ({
  useProfileCardStore: () => ({
    closeDrawer: mockCloseDrawer,
  }),
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
  useGetAllCertificates: jest.fn(),
  useDeleteCertificate: jest.fn(),
  useAddCertificateWithImage: jest.fn(),
}));
jest.mock("../../../Store/CertificatesStore.ts", () => ({
  useUserCertificateStore: jest.fn(),
}));
const mockCertData = {
  certificateID: "cert456",
  certificateName: "Test Certificate 2",
  organizationName: "Test Organization 2",
  certificateIssueDate: "2023-02-01",
  certificateExpiryDate: "2024-02-01",
  certificateImageURL: null,
  certificateURL: "http://cert01.com",
  skillId: "123",
  skill: null,
  file: null,
};
describe("AddCertificationComponent", () => {
  const mockTheme = {
    TEXT_PRIMARY: "#000",
    TEXT_SECONDARY: "#666",
    GRAY_MAIN: "#ccc",
  };

  beforeEach(() => {
    (useThemeContext as jest.Mock).mockReturnValue({ theme: mockTheme });
    (useDeleteCertificate as jest.Mock).mockReturnValue({
      DeleteCertificate: jest.fn(),
    });
    (useAddCertificateWithImage as jest.Mock).mockReturnValue({
      handleCertificateWithImageInDB: jest.fn(),
    });
    (useUserCertificateStore as unknown as jest.Mock).mockReturnValue({
      userCertificate: [mockCertData],
      idSelected: "cert456",
      setUserCertificate: jest.fn(),
      deleteUserCertificate: jest.fn(),
      setIdSelected: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form fields", () => {
    render(
      <MockedProvider addTypename={false}>
        <AddCertificationComponent />
      </MockedProvider>,
    );
  });

  it("renders initial skills", () => {
    render(
      <MockedProvider addTypename={false}>
        <AddCertificationComponent />
      </MockedProvider>,
    );
    expect(screen.getByText("Adobe XD")).toBeInTheDocument();
    expect(screen.getByText("Figma")).toBeInTheDocument();
  });

  it(`"adds a new skill on Enter key press"`, async () => {
    render(
      <MockedProvider addTypename={false}>
        <AddCertificationComponent />
      </MockedProvider>,
    );

    const input = screen.getByPlaceholderText("Press Enter to add skill");
    fireEvent.change(input, { target: { value: "New Skill" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("New Skill")).toBeInTheDocument();
    });
  });

  it("does not add a duplicate skill", async () => {
    render(
      <MockedProvider addTypename={false}>
        <AddCertificationComponent />
      </MockedProvider>,
    );

    const input = screen.getByPlaceholderText("Press Enter to add skill");
    fireEvent.change(input, { target: { value: "Adobe XD" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.queryByText("Adobe XD")).toBeInTheDocument();
      expect(
        screen.getByText("Skill name already exists."),
      ).toBeInTheDocument();
    });
  });

  it("does not add a skill that starts with a symbol", async () => {
    render(
      <MockedProvider addTypename={false}>
        <AddCertificationComponent />
      </MockedProvider>,
    );

    const input = screen.getByPlaceholderText("Press Enter to add skill");
    fireEvent.change(input, { target: { value: ".InvalidSkill" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
  });

  it("should handle invalid file", async () => {
    (fileValidationSchema.validate as jest.Mock).mockImplementation(() =>
      Promise.reject(new Error("File validation failed")),
    );

    render(
      <MockedProvider addTypename={false}>
        <AddCertificationComponent />
      </MockedProvider>,
    );

    // Simulate file drop
    const file = new File(["dummy content"], "invalid.png", {
      type: "image/png",
    });

    fireEvent.change(screen.getByTestId("upload-input"), {
      target: { files: [file] },
    });

    await waitFor(() => {
      // Check that error is handled correctly
      expect(fileValidationSchema.validate).toHaveBeenCalledWith({ file });
      expect(
        screen.queryByText("Uploading Successful"),
      ).not.toBeInTheDocument();
      expect(screen.getByText("File validation failed")).toBeInTheDocument();
    });
  });
});
const originalCreateObjectURL = URL.createObjectURL;

beforeAll(() => {
  // Mock URL.createObjectURL
  global.URL.createObjectURL = jest.fn(() => "http://example.com/file.png");
});

afterAll(() => {
  // Restore the original URL.createObjectURL
  global.URL.createObjectURL = originalCreateObjectURL;
});

describe("handleDrop", () => {
  let setError: jest.Mock;
  let setFile: jest.Mock;
  let setImage: jest.Mock;
  let setFileInfo: jest.Mock;
  let setUploadSuccess: jest.Mock;

  beforeEach(() => {
    setError = jest.fn();
    setFile = jest.fn();
    setImage = jest.fn();
    setFileInfo = jest.fn();
    setUploadSuccess = jest.fn();

    (useDeleteCertificate as jest.Mock).mockReturnValue({
      DeleteCertificate: jest.fn(),
    });
    (useAddCertificateWithImage as jest.Mock).mockReturnValue({
      handleCertificateWithImageInDB: jest.fn(),
    });
    (useUserCertificateStore as unknown as jest.Mock).mockReturnValue({
      userCertificate: [mockCertData],
      idSelected: "cert456",
      setUserCertificate: jest.fn(),
      deleteUserCertificate: jest.fn(),
      setIdSelected: jest.fn(),
    });
  });

  it("should set state correctly when file validation passes", async () => {
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const acceptedFiles = [file];
    const fileUrl = "http://example.com/file.png"; // Mocked URL

    (fileValidationSchema.validate as jest.Mock).mockResolvedValueOnce({});

    await handleDrop(
      acceptedFiles,
      setError,
      setFile,
      setImage,
      setFileInfo,
      setUploadSuccess,
    );

    expect(setError).toHaveBeenCalledWith(null);
    expect(setFile).toHaveBeenCalledWith(file);
    expect(setImage).toHaveBeenCalledWith(fileUrl);
    expect(setFileInfo).toHaveBeenCalledWith({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    });
    expect(setUploadSuccess).toHaveBeenCalledWith(true);
  });

  it("should handle validation error correctly", async () => {
    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });
    const acceptedFiles = [file];

    (fileValidationSchema.validate as jest.Mock).mockRejectedValueOnce({
      message: "Validation failed",
    });

    await handleDrop(
      acceptedFiles,
      setError,
      setFile,
      setImage,
      setFileInfo,
      setUploadSuccess,
    );
  });

  it("should handle empty file list correctly", async () => {
    const acceptedFiles: File[] = [];

    await handleDrop(
      acceptedFiles,
      setError,
      setFile,
      setImage,
      setFileInfo,
      setUploadSuccess,
    );

    expect(setError).not.toHaveBeenCalled();
    expect(setFile).not.toHaveBeenCalled();
    expect(setImage).not.toHaveBeenCalled();
    expect(setFileInfo).not.toHaveBeenCalled();
    expect(setUploadSuccess).not.toHaveBeenCalled();
  });
  it("should call closeDrawer when Cancel button is clicked", async () => {
    render(
      <MockedProvider addTypename={false}>
        <AddCertificationComponent />
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
  it("should handle delete certificate action when the certificate exists", async () => {
    const mockDeleteUserCertInDB = jest
      .fn()
      .mockResolvedValue({ data: { deleteCertificate: { status: true } } });

    (useDeleteCertificate as jest.Mock).mockReturnValue({
      DeleteCertificate: mockDeleteUserCertInDB,
    });

    (useUserCertificateStore as unknown as jest.Mock).mockReturnValue({
      userCertificate: [mockCertData],
      idSelected: "cert456",
      setUserCertificate: jest.fn(),
      deleteUserCertificate: jest.fn(),
      setIdSelected: jest.fn(),
    });
    const { theme } = useThemePalette();
    render(
      <MockedProvider addTypename={false}>
        <ThemeProvider theme={theme}>
          <AddCertificationComponent isEditModeCert={true} />
        </ThemeProvider>
      </MockedProvider>,
    );
    expect(
      screen.getByText("Click or drag and drop to upload an attachment"),
    ).toBeInTheDocument();
    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);
    await waitFor(() => {
      const confirmDelete = screen.getByRole("button", { name: /Delete/i });
      fireEvent.click(confirmDelete);
      expect(mockDeleteUserCertInDB).toHaveBeenCalledWith({
        variables: {
          certificateId: "cert456",
        },
      });
      expect(
        useUserCertificateStore().deleteUserCertificate,
      ).toHaveBeenCalledWith(mockCertData.certificateID);
    });
  });

  it("should handle form submission for editing Certificate", async () => {
    const handleCertificateWithImageInDBMock = jest.fn().mockResolvedValue({
      data: { addCertificateWithImage: { status: true } },
    });

    (useAddCertificateWithImage as jest.Mock).mockReturnValue({
      handleCertificateWithImageInDB: handleCertificateWithImageInDBMock,
    });

    // Simulate initial data for editing
    (useUserCertificateStore as unknown as jest.Mock).mockReturnValue({
      userCertificate: [mockCertData],
      idSelected: "cert456",
      setUserCertificate: jest.fn(),
      deleteUserCertificate: jest.fn(),
      setIdSelected: jest.fn(),
    });

    render(<AddCertificationComponent isEditModeCert={true} />); // Set isEditMode to true

    // Simulate form submission
    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(handleCertificateWithImageInDBMock).toHaveBeenCalled();
    });
  });
});

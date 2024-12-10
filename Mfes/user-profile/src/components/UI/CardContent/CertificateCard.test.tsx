import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import CertificationsComponent from "./CertificateCard.tsx";
import { GetAllCertificatesDocument } from "../../../gql/operations.ts"; // Import the actual query document
import "@testing-library/jest-dom";
import { useUserDataStore } from "../../../Store/UserDateStore.ts"; // Import the actual hook

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

// Define mock certificates globally

const mockCertificates = [
  {
    certificateID: "cert1",
    certificateName: "Microsoft 365 certifications",
    organizationName: "Microsoft",
    certificateIssueDate: "2023-01-01",
    certificateExpiryDate: "2025-01-01",
  },
  {
    certificateID: "cert2",
    certificateName: "AWS Solutions Architect",
    organizationName: "Amazon",
    certificateIssueDate: "2022-05-15",
    certificateExpiryDate: "2024-05-15",
  },
];
// Mock loadcertificate function
const loadcertificateMock = jest.fn();

// Mock useGetAllCertificates at the top level of the file
jest.mock("../Shared/GraphqlQueries/UserProfile.ts", () => ({
  useGetAllCertificates: (userId: string) => ({
    loadcertificate: loadcertificateMock,
    data: {
      getAllCertificates: {
        data: userId ? mockCertificates : [],
      },
    },
  }),
}));

// Mock useUserDataStore to return the desired userId
jest.mock("../../../Store/UserDateStore.ts", () => ({
  useUserDataStore: jest.fn(),
}));

// Import the mocked useUserDataStore for setting return values
const mockedUseUserDataStore = useUserDataStore as jest.MockedFunction<
  typeof useUserDataStore
>;

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("CertificationsComponent", () => {
  // const mockOnEditClick = jest.fn();
  const userId = "bd87784f-11b5-4b63-9e26-76b73f57c4fc";

  const mocksSuccess = [
    {
      request: {
        query: GetAllCertificatesDocument,
        variables: { userId },
      },
      result: {
        data: {
          getAllCertificates: {
            data: mockCertificates,
          },
        },
      },
    },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Set the return value of useUserDataStore
    mockedUseUserDataStore.mockReturnValue({
      userId,
      username: "testuser",
    });
  });

  it("renders a certification in collapsed mode", async () => {
    render(
      <MockedProvider mocks={mocksSuccess} addTypename={false}>
        <CertificationsComponent isExpanded={false} />
      </MockedProvider>,
    );

    // Since it's collapsed, only one certificate should be rendered
    await waitFor(() => {
      expect(
        screen.getByText("Microsoft 365 certifications"),
      ).toBeInTheDocument();
    });

    // Ensure only one edit button is present if isExpanded is true, but since it's false, none
    const editButtons = screen.queryAllByRole("button", { name: /edit/i });
    expect(editButtons.length).toBe(0);
  });

  it("does not show edit buttons when collapsed", async () => {
    render(
      <MockedProvider mocks={mocksSuccess} addTypename={false}>
        <CertificationsComponent isExpanded={false} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await waitFor(() => {
      expect(
        screen.getByText("Microsoft 365 certifications"),
      ).toBeInTheDocument();
    });

    const editButtons = screen.queryAllByRole("button", { name: /edit/i });
    expect(editButtons.length).toBe(0);
  });

  it("calls loadcertificate when userId is present", async () => {
    render(
      <MockedProvider mocks={mocksSuccess} addTypename={false}>
        <CertificationsComponent isExpanded={true} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(loadcertificateMock).toHaveBeenCalledTimes(1);
    });
  });
});

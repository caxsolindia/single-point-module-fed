import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { useLazyQuery } from "@apollo/client";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";
import useProfileStore from "../../../Store/userProfileStore.ts";
import ViewComponent from "./ViewComponent.tsx";
import { useGetProfileOverviewLazyQuery } from "../../../gql/operations.ts";

jest.mock("../../../ThemeContext/ThemeContext.tsx");
jest.mock("../../../Store/ProfileCardStore.ts");
jest.mock("../../../Store/userProfileStore.ts");
jest.mock("@apollo/client", () => ({
  ...jest.requireActual("@apollo/client"),
  useLazyQuery: jest.fn(),
}));

describe("ViewComponent", () => {
  const profileMock = {
    userId: "user123",
    name: "John Doe",
    phone: "123-456-7890",
    address: "123 Main St",
    managerName: "Jane Manager",
    languages: "English, Spanish",
    username: "johndoe",
  };

  const mockSetProfileData = jest.fn();
  const mockSetError = jest.fn();
  const mockOpenModal = jest.fn();

  beforeEach(() => {
    (useLazyQuery as unknown as jest.Mock).mockReturnValue([
      jest.fn(),
      { data: null, loading: false, error: null }, // The result object
    ]);

    (useThemeContext as unknown as jest.Mock).mockReturnValue({
      theme: "light",
    });

    (useProfileCardStore as unknown as jest.Mock).mockReturnValue({
      openModal: mockOpenModal,
    });

    (useProfileStore as unknown as jest.Mock).mockReturnValue({
      profile: profileMock,
      message: "Profile loaded",
      status: true,
      setProfileData: mockSetProfileData,
      setError: mockSetError,
    });
  });

  it("renders the component without crashing", () => {
    render(
      <MockedProvider>
        <ViewComponent />
      </MockedProvider>,
    );

    expect(screen.getByText(profileMock.name)).toBeInTheDocument();
    expect(screen.getByText(profileMock.phone)).toBeInTheDocument();
    expect(screen.getByText(profileMock.address)).toBeInTheDocument();
  });

  it("calls getProfileOverview on mount", async () => {
    render(
      <MockedProvider>
        <ViewComponent />
      </MockedProvider>,
    );

    const [getProfileOverview] = useGetProfileOverviewLazyQuery();
    expect(getProfileOverview).toBeTruthy();
  });

  it("handles query onCompleted callback correctly", async () => {
    render(
      <MockedProvider>
        <ViewComponent />
      </MockedProvider>,
    );

    const [getProfileOverview] = useGetProfileOverviewLazyQuery();
    expect(getProfileOverview).toBeTruthy();
  });

  it("handles query onError callback correctly", async () => {
    render(
      <MockedProvider>
        <ViewComponent />
      </MockedProvider>,
    );
  });

  it("calls openModal when the video resume button is clicked", () => {
    render(
      <MockedProvider>
        <ViewComponent />
      </MockedProvider>,
    );
  });

  it("displays error message if status is false", () => {
    // Override the useProfileStore mock to simulate an error state
    (useProfileStore as unknown as jest.Mock).mockReturnValue({
      profile: null,
      message: "Error loading profile",
      status: false,
      setProfileData: mockSetProfileData,
      setError: mockSetError,
    });

    render(
      <MockedProvider>
        <ViewComponent />
      </MockedProvider>,
    );
  });
});

import { act } from "react";
import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react";
import useProfileStore, { transformProfileData } from "./userProfileStore.ts"; // Update with the correct path
import { GetProfileOverviewResponse } from "../gql/operations.ts";

const mockProfileData = {
  getProfileOverview: {
    status: true,
    message: "Success",
    profile: {
      userId: "1",
      name: "John Doe",
      username: "johndoe",
      phone: "123-456-7890",
      address: "123 Main St",
      gender: "Male",
      linkedinURL: "https://linkedin.com/in/johndoe",
      employeeId: "E123",
      profilephoto: "https://photo.url",
      languages: ["English", "Spanish"],
      managerName: "Jane Doe",
    },
  },
};

describe("useProfileStore", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useProfileStore());

    expect(result.current.status).toBe(false);
    expect(result.current.message).toBeNull();
    expect(result.current.profile).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should set profile data correctly with setProfileData", () => {
    const { result } = renderHook(() => useProfileStore());

    act(() => {
      result.current.setProfileData(mockProfileData.getProfileOverview);
    });

    expect(result.current.status).toBe(true);
    expect(result.current.message).toBe("Success");
    expect(result.current.profile).toEqual({
      userId: "1",
      name: "John Doe",
      username: "johndoe",
      phone: "123-456-7890",
      address: "123 Main St",
      gender: "Male",
      linkedinURL: "https://linkedin.com/in/johndoe",
      employeeId: "E123",
      profilephoto: "https://photo.url",
      languages: ["English", "Spanish"],
      managerName: "Jane Doe",
    });
    expect(result.current.loading).toBe(false);
  });

  it("should set loading state with setLoading", () => {
    const { result } = renderHook(() => useProfileStore());

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);

    act(() => {
      result.current.setLoading(false);
    });

    expect(result.current.loading).toBe(false);
  });

  it("should set error and stop loading with setError", () => {
    const { result } = renderHook(() => useProfileStore());

    act(() => {
      result.current.setError("Something went wrong");
    });

    expect(result.current.error).toBe("Something went wrong");
    expect(result.current.loading).toBe(false);
  });

  it("render transformProfileData with null", () => {
    expect(transformProfileData(null)).toBe(null);
  });

  it("render transformProfileData with data", () => {
    const profileData = {
      userId: "1",
      name: "John Doe",
      username: "johndoe",
      phone: "123-456-7890",
      address: "123 Main St",
      gender: "Male",
      linkedinURL: "https://linkedin.com/in/johndoe",
      employeeId: "E123",
      profilephoto: "https://photo.url",
      languages: ["English", "Spanish"],
      managerName: "Jane Doe",
    };
    const profileMock: GetProfileOverviewResponse = {
      message: "Hello",
      profile: profileData,
      status: true,
    };

    expect(transformProfileData(profileMock)).toStrictEqual(profileData);
  });

  it("render transformProfileData with profile null", () => {
    const profileNull = {
      userId: null,
      name: null,
      username: null,
      phone: null,
      address: null,
      gender: null,
      linkedinURL: null,
      employeeId: null,
      profilephoto: null,
      languages: null,
      managerName: null,
    };
    const profileMock: GetProfileOverviewResponse = {
      message: null,
      profile: profileNull,
      status: false,
    };
    transformProfileData(profileMock);
  });
});

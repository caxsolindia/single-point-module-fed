import { render } from "@testing-library/react";
import { useParams } from "react-router-dom";
import "@testing-library/jest-dom";
import SsoLogin from "./SsoLogin.tsx";
import { showToast } from "../../common/toastUtils.ts";

// Define a type for the params object returned by useParams
interface Params {
  id?: string;
  accessToken?: string;
  username?: string;
  role?: string;
  profilephoto?: string;
}

// Mocking useParams from react-router-dom
jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

// Mocking showToast function
jest.mock("../../common/toastUtils", () => ({
  showToast: jest.fn(),
}));

describe("SsoLogin", () => {
  let originalLocation: Location;

  beforeAll(() => {
    // Save the original window.location and mock it
    originalLocation = window.location;
    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true,
    });

    // Mock sessionStorage methods
    const sessionStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    Object.defineProperty(window, "sessionStorage", {
      value: sessionStorageMock,
    });
  });

  afterAll(() => {
    // Restore the original window.location
    Object.defineProperty(window, "location", {
      value: originalLocation,
      writable: true,
    });
  });

  it("should set sessionStorage and redirect if accessToken is present", () => {
    // Mock useParams to return valid user data
    (useParams as jest.Mock).mockReturnValue({
      id: JSON.stringify({
        accessToken: "token123",
        id: "1",
        username: "user",
        role: "admin",
        profilephoto: "photo.jpg",
      }),
    } as Params);

    render(<SsoLogin />);

    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      "accessToken",
      "token123",
    );
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith(
      "userData",
      JSON.stringify({
        id: "1",
        username: "user",
        role: "admin",
        profilephoto: "photo.jpg",
      }),
    );
    expect(window.location.href).toBe("https://localhost:8000/profile");
  });

  it("should show error toast if accessToken is not present", () => {
    // Mock useParams to return invalid user data
    (useParams as jest.Mock).mockReturnValue({
      id: JSON.stringify({
        id: "1",
        username: "user",
        role: "admin",
        profilephoto: "photo.jpg",
      }),
    } as Params);

    render(<SsoLogin />);

    expect(showToast).toHaveBeenCalledWith({
      type: "error",
      message: "Incorrect password please try again!",
      id: "error-toast",
    });
  });

  it("should show error toast if JSON parsing fails", () => {
    // Mock useParams to return invalid JSON
    (useParams as jest.Mock).mockReturnValue({ id: "invalid JSON" } as Params);

    render(<SsoLogin />);

    expect(showToast).toHaveBeenCalledWith({
      type: "error",
      message: "Incorrect password please try again!",
      id: "error-toast",
    });
  });
});

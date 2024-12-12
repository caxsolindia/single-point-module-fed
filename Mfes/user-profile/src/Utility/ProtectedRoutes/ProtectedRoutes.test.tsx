import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./ProtectedRoutes.tsx";
import { getAuthToken } from "../GetToken/GetToken.tsx";

jest.mock("../GetToken/GetToken.tsx");

describe("PrivateRoutes component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders the Outlet component when token is present", () => {
    (getAuthToken as jest.Mock).mockReturnValue("mockToken");

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route element={<PrivateRoutes />}>
            <Route path="/protected" element={<div>Protected Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Protected Page")).toBeInTheDocument();
  });

  it("navigates to the login page when token is not present", () => {
    (getAuthToken as jest.Mock).mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route element={<PrivateRoutes />}>
            <Route path="/protected" element={<div>Protected Page</div>} />
          </Route>
          <Route
            path="http://4.188.95.143:8000/auth"
            element={<div>Login Page</div>}
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});

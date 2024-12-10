import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "./Login.tsx";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

describe("LoginPage Component", () => {
  it("should render the LoginPage component", () => {
    render(<LoginPage />);
    expect(screen.getByText(/Welcome to Thryvo/i)).toBeInTheDocument();
  });
});

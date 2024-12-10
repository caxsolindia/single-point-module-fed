import { render } from "@testing-library/react";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import IconBox from "./IconBox.tsx";
import { BriefCaseIcon } from "../../../assets/Icon/Icon.tsx";
import "@testing-library/jest-dom";

jest.mock("styleguide/ThemeConstants");
jest.mock("../../../ThemeContext/ThemeContext.tsx");

describe("IconBox", () => {
  const mockUseThemeContext = useThemeContext as jest.Mock;

  beforeEach(() => {
    mockUseThemeContext.mockReturnValue({ theme: "light" });
  });

  it("should render correctly with default size", () => {
    const { getByTestId } = render(<IconBox Icon={BriefCaseIcon} />);
    const boxElement = getByTestId("icon-box");
    expect(boxElement).toHaveStyle({
      height: "3.25rem",
      width: "3.25rem",
    });
  });

  it("should render correctly with custom size", () => {
    const { container } = render(<IconBox Icon={BriefCaseIcon} size="4rem" />);

    expect(container.querySelector("div")).toHaveStyle({
      height: "4rem",
      width: "4rem",
    });
  });
});

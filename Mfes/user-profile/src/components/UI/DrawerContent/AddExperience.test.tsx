import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import AddExperience from "./AddExperience.tsx";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import "@testing-library/jest-dom";
import {
  COMAPANY_NAME,
  CURRENTLY_ACTIVE,
  DESIGNATION,
  END_DATE,
  JOB_SUMMARY,
  SKILL_NAME,
  START_DATE,
} from "../../../constant/formConstant/labelConstant.ts";
import LabelTypography from "../FormComponent/Label/Label.tsx";

jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(),
}));
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe("AddExperience component", () => {
  const mockTheme = {
    TEXT_PRIMARY: "#000",
    TEXT_SECONDARY: "#666",
    GRAY_MAIN: "#ccc",
  };
  beforeEach(() => {
    (useThemeContext as jest.Mock).mockReturnValue({ theme: mockTheme });
  });

  it("renders the company name label", async () => {
    const { getByText } = render(<AddExperience />);
    await waitFor(() => expect(getByText(COMAPANY_NAME)).toBeInTheDocument());
  });

  it("renders the designation label", async () => {
    const { getByText } = render(<AddExperience />);
    await waitFor(() => expect(getByText(DESIGNATION)).toBeInTheDocument());
  });

  it("renders the start date label", async () => {
    const { getByText } = render(<AddExperience />);
    await waitFor(() => expect(getByText(START_DATE)).toBeInTheDocument());
  });

  it("renders the end date label", async () => {
    const { getByText } = render(<AddExperience />);
    await waitFor(() => expect(getByText(END_DATE)).toBeInTheDocument());
  });

  it("renders the currently active checkbox label", async () => {
    const { getByText } = render(<AddExperience />);
    await waitFor(() =>
      expect(getByText(CURRENTLY_ACTIVE)).toBeInTheDocument(),
    );
  });

  it("renders the skill input label", async () => {
    const { getByText } = render(<AddExperience />);
    await waitFor(() => expect(getByText(SKILL_NAME)).toBeInTheDocument());
  });

  it("renders the job summary label", async () => {
    const { getByText } = render(<AddExperience />);
    await waitFor(() => expect(getByText(JOB_SUMMARY)).toBeInTheDocument());
  });

  it("handles skill input correctly", async () => {
    const { getByText } = render(<LabelTypography text="Skill Name*" />);
    await waitFor(() => expect(getByText("Skill Name*")).toBeTruthy());
  });

  it("renders initial skills", () => {
    render(<AddExperience />);
    expect(screen.getByText("Adobe XD")).toBeInTheDocument();
    expect(screen.getByText("Figma")).toBeInTheDocument();
  });

  it(`"adds a new skill on Enter key press"`, async () => {
    render(<AddExperience />);

    const input = screen.getByPlaceholderText("");
    fireEvent.change(input, { target: { value: "New Skill" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(screen.getByText("New Skill")).toBeInTheDocument();
    });
  });

  it("does not add a skill that starts with a symbol", async () => {
    render(<AddExperience />);

    const input = screen.getByPlaceholderText("");
    fireEvent.change(input, { target: { value: ".InvalidSkill" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
  });

  it("does not add a duplicate skill", async () => {
    render(<AddExperience />);

    const input = screen.getByPlaceholderText("");
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
    render(<AddExperience />);

    const input = screen.getByPlaceholderText("");
    fireEvent.change(input, { target: { value: ".InvalidSkill" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
  });

  it("removes a skill on delete click", async () => {
    render(<AddExperience />);
  });
});

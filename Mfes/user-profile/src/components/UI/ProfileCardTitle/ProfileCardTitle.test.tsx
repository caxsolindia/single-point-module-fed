import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardHeader from "./ProfileCardTitle.tsx";

describe("CardHeader", () => {
  it("renders the title correctly", () => {
    render(<CardHeader title="Test Title" icon={<span>Test Icon</span>} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders the icon correctly", () => {
    render(<CardHeader title="Test Title" icon={<span>Test Icon</span>} />);

    expect(screen.getByText("Test Icon")).toBeInTheDocument();
  });
});

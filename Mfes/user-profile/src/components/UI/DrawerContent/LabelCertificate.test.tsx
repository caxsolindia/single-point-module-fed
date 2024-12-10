import { render, screen } from "@testing-library/react";
import LabelTypography, { LABELS } from "./LabelCertificate.tsx";
import "@testing-library/jest-dom";

describe("LabelTypography Component", () => {
  it("renders the correct label text from LABELS", () => {
    render(<LabelTypography text="CertificateTitle" />);

    expect(screen.getByText(LABELS.CertificateTitle)).toBeInTheDocument();
  });

  it("applies the correct typography variant 'soft'", () => {
    render(<LabelTypography text="CertificateTitle" variant="soft" />);

    const typographyElement = screen.getByText(LABELS.CertificateTitle);
    expect(typographyElement).toHaveClass("MuiTypography-soft");
  });

  it("applies bold font weight", () => {
    render(<LabelTypography text="CertificateTitle" />);

    const typographyElement = screen.getByText(LABELS.CertificateTitle);
    expect(typographyElement).toHaveStyle({ fontWeight: "bold" });
  });

  it("renders correctly with different labels", () => {
    render(<LabelTypography text="Organization" />);
    expect(screen.getByText(LABELS.Organization)).toBeInTheDocument();
  });
});

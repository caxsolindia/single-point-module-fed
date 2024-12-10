import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  EditingIcon,
  CancelIcon,
  LocationIcon,
  UserIcon,
  LanguageIcon,
  IdIcon,
  MailIcon,
  PhoneIcon,
  VideoIcon,
  LinkedInIcon,
  LinkIcon,
  BriefCaseIcon,
  CalendarIcon,
  GpsIcon,
  BulbIcon,
  UploadIcon,
  DeleteIcon,
  AddIcon,
  DownLoadIcon,
  PictureIcon,
  CropIcon,
  FlipHIcon,
  AdjustIcon,
  UndoIcon,
} from "./Icon.tsx";

describe("SVG Icons", () => {
  it("renders EditingIcon correctly", () => {
    const { container } = render(<EditingIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders CancelIcon correctly with default color", () => {
    const { container } = render(<CancelIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#0d0b0e");
  });

  it("renders CancelIcon correctly with custom color", () => {
    const { container } = render(<CancelIcon color="#ff0000" />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#ff0000");
  });

  it("renders LocationIcon correctly with default color", () => {
    const { container } = render(<LocationIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });

  it("renders UserIcon correctly with default color", () => {
    const { container } = render(<UserIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });

  it("renders LanguageIcon correctly with default color", () => {
    const { container } = render(<LanguageIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });

  it("renders IdIcon correctly with default color", () => {
    const { container } = render(<IdIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });

  it("renders MailIcon correctly with default color", () => {
    const { container } = render(<MailIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });

  it("renders PhoneIcon correctly with default color", () => {
    const { container } = render(<PhoneIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });

  it("renders LinkedInIcon correctly with default color", () => {
    const { container } = render(<LinkedInIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });

  it("renders VideoIcon correctly with default color", () => {
    const { container } = render(<VideoIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });

  it("renders LinkIcon correctly with default color", () => {
    const { container } = render(<LinkIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });
  it("renders BriefCaseIcon correctly with default color", () => {
    const { container } = render(<BriefCaseIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });
  it("renders  CalendarIcon correctly with default color", () => {
    const { container } = render(<CalendarIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });
  it("renders GpsIcon correctly with default color", () => {
    const { container } = render(<GpsIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });
  it("renders BulbIcon correctly with default color", () => {
    const { container } = render(<BulbIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#730ba6");
  });
  it("renders UploadIcon correctly with default color", () => {
    const { container } = render(<UploadIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#0d0b0e");
  });
  it("renders DeleteIcon correctly with default color", () => {
    const { container } = render(<DeleteIcon />);
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("fill", "#0d0b0e");
  });
  it("renders AddIcon correctly", () => {
    const { container } = render(<AddIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();
    const path = container.querySelector("path");
    expect(path).toHaveAttribute("id", "Add");
  });
  it("renders DownLoadIcon correctly", () => {
    const { container } = render(<DownLoadIcon />);
    expect(container.querySelector("svg")).toBeInTheDocument();

    const paths = container.querySelectorAll("path");

    // Test the presence of the first path and its attributes
    expect(paths[0]).toHaveAttribute("id", "Path_50214");
    expect(paths[0]).toHaveAttribute(
      "d",
      "M42.147,0H30V20.647H46.893V4.746Zm3.495,19.4H31.251V1.251H41.629l4.013,4.013Z",
    );

    // Test the presence of the second path and its attributes
    expect(paths[1]).toHaveAttribute("id", "Path_50215");
    expect(paths[1]).toHaveAttribute(
      "d",
      "M111.023,112.147v-5.468H109.84v5.468l-2-2-.836.836,3.428,3.428,3.428-3.428-.836-.836Z",
    );
  });
  it("renders PictureIcon correctly with default color", () => {
    const { container } = render(<PictureIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const paths = container.querySelectorAll("path");

    // Validate the first path
    expect(paths[0]).toHaveAttribute("id", "Subtraction_69");
    expect(paths[0]).toHaveAttribute("fill", "#0d0b0e");

    // Validate the second path
    expect(paths[1]).toHaveAttribute("id", "Subtraction_67");
    expect(paths[1]).toHaveAttribute("fill", "#0d0b0e");

    // Validate the third path
    expect(paths[2]).toHaveAttribute("id", "Subtraction_68");
    expect(paths[2]).toHaveAttribute("fill", "#0d0b0e");
  });

  it("renders CropIcon correctly with default color", () => {
    const { container } = render(<CropIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const path = container.querySelector("path");

    // Validate the path
    expect(path).toHaveAttribute("id", "Path_50177");
    expect(path).toHaveAttribute("fill", "#0d0b0e"); // Default color
  });

  it("renders FlipHIcon correctly", () => {
    const { container } = render(<FlipHIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const paths = container.querySelectorAll("path");

    // Validate the first path
    expect(paths[0]).toHaveAttribute("id", "Path_50229");
    expect(paths[0]).toHaveAttribute("fill", "#838696");

    // Validate the second path
    expect(paths[1]).toHaveAttribute("id", "Path_50230");
    expect(paths[1]).toHaveAttribute("fill", "#838696");

    // Validate the third path
    expect(paths[2]).toHaveAttribute("id", "Path_50231");
    expect(paths[2]).toHaveAttribute("fill", "#838696");

    // Validate the fourth path
    expect(paths[3]).toHaveAttribute("id", "Path_50232");
    expect(paths[3]).toHaveAttribute("fill", "#838696");
  });

  it("renders AdjustIcon correctly", () => {
    const { container } = render(<AdjustIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const paths = container.querySelectorAll("path");

    // Validate the first path
    expect(paths[0]).toHaveAttribute("id", "Path_50174");
    expect(paths[0]).toHaveAttribute("fill", "#0d0b0e");

    // Validate the second path
    expect(paths[1]).toHaveAttribute("id", "Path_50175");
    expect(paths[1]).toHaveAttribute("fill", "#0d0b0e");

    // Validate the third path
    expect(paths[2]).toHaveAttribute("id", "Path_50176");
    expect(paths[2]).toHaveAttribute("fill", "#0d0b0e");
  });

  it("renders UndoIcon correctly", () => {
    const { container } = render(<UndoIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const paths = container.querySelectorAll("path");

    // Validate the first path
    expect(paths[0]).toHaveAttribute("id", "Subtraction_61");
    expect(paths[0]).toHaveAttribute("fill", "#c4c7cf");

    // Validate the second path
    expect(paths[1]).toHaveAttribute("id", "Subtraction_62");
    expect(paths[1]).toHaveAttribute("fill", "#c4c7cf");
  });
});

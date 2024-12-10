import React from "react";
import { renderHook, act } from "@testing-library/react";
import * as Yup from "yup";
import { getButtonStyles, useCertificationForm } from "./DrawerMethods.tsx";
// Mock required dependencies
jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(() => ({
    theme: "light",
  })),
}));

jest.mock("styleguide/ThemeConstants", () => () => ({
  DIVIDER: "#ccc",
  PRIMARY_MAIN: "#3f51b5",
}));

jest.mock("../../../Store/ProfileCardStore.ts", () => ({
  useProfileCardStore: jest.fn(() => ({
    closeDrawer: jest.fn(),
  })),
}));

jest.mock("../Validation/CertificateValidation.ts", () => {
  return {
    addCertificationValidationSchema: Yup.object().shape({
      CertificateTitle: Yup.string().required("Certificate title is required"),
      Organization: Yup.string().required("Organization is required"),
    }),
  };
});

jest.mock("../Validation/ProjectFormValidation.ts", () => {
  return {
    skillValidationSchema: Yup.array()
      .of(Yup.string().required("Skill is required"))
      .max(10, "Max 10 skills allowed"),
  };
});

jest.mock("../Validation/imagevalidation.ts", () => {
  return {
    fileValidationSchema: Yup.object().shape({
      file: Yup.mixed()
        .nullable() // Allow null values
        .required("File is required")
        .test("fileSize", "File too large", (value) => {
          if (!value) return false; // Check for null
          return (value as File).size <= 5000000; // Cast value as File and check size (5MB limit)
        })
        .test("fileType", "Unsupported File Format", (value) => {
          if (!value) return false; // Check for null
          return ["image/jpeg", "image/png"].includes((value as File).type); // Cast value as File and check type
        }),
    }),
  };
});

describe("useCertificationForm Hook", () => {
  it("should initialize form fields with default values", () => {
    const { result } = renderHook(() => useCertificationForm());

    expect(result.current.skills).toEqual(["Adobe XD", "Figma"]);
    expect(result.current.skillInput).toBe("");
    expect(result.current.file).toBeNull();
    expect(result.current.image).toBeNull();
    expect(result.current.uploadSuccess).toBe(false);
  });

  it("should handle adding a valid skill", async () => {
    const { result } = renderHook(() => useCertificationForm());

    act(() => {
      result.current.setSkillInput("React");
    });
  });

  it("should not add an invalid skill and show an error", async () => {
    const { result } = renderHook(() => useCertificationForm());

    await act(async () => {
      result.current.setSkillInput(""); // Invalid input
      await result.current.handleSkillAdd({
        key: "Enter",
        preventDefault: jest.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>);
    });

    expect(result.current.skills).toEqual(["Adobe XD", "Figma"]); // Skills shouldn't change
    expect(result.current.errorSkill).toBe("Skill is required");
  });

  it("should handle deleting a skill", () => {
    const { result } = renderHook(() => useCertificationForm());

    act(() => {
      result.current.handleSkillDelete("Adobe XD")();
    });

    expect(result.current.skills).toEqual(["Figma"]);
  });

  it("should reset the form on valid submission", async () => {
    const { result } = renderHook(() => useCertificationForm());

    await act(async () => {
      result.current.setSkillInput("React");
      await result.current.handleSkillAdd({
        key: "Enter",
        preventDefault: jest.fn(),
      } as unknown as React.KeyboardEvent<HTMLInputElement>);
      result.current.setFile(
        new File(["dummy content"], "example.png", { type: "image/png" }),
      );
      await result.current.onSubmit();
    });

    expect(result.current.skills).toEqual(["Adobe XD", "Figma"]); // reset to default
    expect(result.current.file).toBeNull(); // file reset
    expect(result.current.image).toBeNull();
    expect(result.current.uploadSuccess).toBe(false);
  });

  it("should reset all fields on valid form submission", async () => {
    const { result } = renderHook(() => useCertificationForm());

    act(() => {
      result.current.setSkillInput("React");
      result.current.setFile(
        new File(["dummy content"], "example.png", { type: "image/png" }),
      );
    });

    await act(async () => {
      await result.current.onSubmit();
    });

    expect(result.current.skillInput).toBe(""); // skill input reset
    expect(result.current.file).toBeNull(); // file reset
    expect(result.current.errorSkill).toBe(""); // No skill error
    expect(result.current.uploadSuccess).toBe(false);
  });

  it("should handle file download when handleDownloadIconClick is triggered", () => {
    const { result } = renderHook(() => useCertificationForm());

    // Mock URL.createObjectURL and URL.revokeObjectURL
    const mockCreateObjectURL = jest.fn(() => "mock-url");
    const mockRevokeObjectURL = jest.fn();

    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = mockRevokeObjectURL;

    // Spy on document.createElement to mock anchor behavior
    const mockClick = jest.fn();
    const anchor = document.createElement("a");
    anchor.click = mockClick;

    const createElementSpy = jest
      .spyOn(document, "createElement")
      .mockImplementation((tagName: string) => {
        if (tagName === "a") {
          return anchor; // Mock anchor element behavior
        }
        return HTMLElement.prototype; // Use default behavior for non-'a' elements
      });
    // Set the file in the hook
    act(() => {
      const testFile = new File(["dummy content"], "example.png", {
        type: "image/png",
      });
      result.current.setFile(testFile);
    });

    // Simulate a click event
    const syntheticEvent = {
      stopPropagation: jest.fn(),
    } as Partial<React.MouseEvent>;

    act(() => {
      result.current.handleDownloadIconClick(
        syntheticEvent as React.MouseEvent,
      );
    });

    // Assertions
    expect(mockCreateObjectURL).toHaveBeenCalledWith(result.current.file);
    expect(mockRevokeObjectURL).toHaveBeenCalledWith("mock-url");
    expect(mockClick).toHaveBeenCalled(); // Ensure the link click was triggered
    expect(anchor.href).toBe("http://localhost/mock-url"); // Ensure href attribute is set

    // Restore the mock
    createElementSpy.mockRestore();
  });
  it("should open the delete modal when handleDelete is triggered and reset fields when confirmDelete is called", () => {
    const { result } = renderHook(() => useCertificationForm());

    // Initial state: delete modal should be closed
    expect(result.current.openDeleteModal).toBe(false);

    // Trigger the delete event
    act(() => {
      const syntheticEvent = {
        stopPropagation: jest.fn(),
      } as Partial<React.MouseEvent>;
      result.current.handleDelete(syntheticEvent as React.MouseEvent);
    });

    // Check if the delete modal is opened
    expect(result.current.openDeleteModal).toBe(true);

    // Set some values
    act(() => {
      result.current.setFile(
        new File(["dummy content"], "example.png", { type: "image/png" }),
      );
      result.current.setImage("mock-image-url");
      result.current.setFileInfo({
        name: "example.png",
        size: "1024 KB",
      });
      result.current.setError("Some error");
      result.current.setUploadSuccess(true);
    });

    // Confirm deletion
    act(() => {
      result.current.confirmDelete();
    });

    // Check the expected outcomes after confirming delete
    expect(result.current.file).toBeNull();
    expect(result.current.image).toBeNull();
    expect(result.current.fileInfo).toBeNull();
    expect(result.current.errorImage).toBeNull();
    expect(result.current.openDeleteModal).toBe(false);
    expect(result.current.uploadSuccess).toBe(false);
  });
  it("should call submitForm when handleDrawerSave is triggered", () => {
    const { result } = renderHook(() => useCertificationForm());

    // Create a mock for submitForm
    const submitFormMock = jest.fn();

    // Assign the mock to the ref's current value
    result.current.childskillRef.current = { submitForm: submitFormMock };

    // Trigger handleDrawerSave
    act(() => {
      result.current.handleDrawerSave();
    });

    // Assert that submitForm was called
    expect(submitFormMock).toHaveBeenCalled();
  });
  it("should handle file drop with valid file", async () => {
    const { result } = renderHook(() => useCertificationForm());

    const mockValidFile = new File(["dummy content"], "test.png", {
      type: "image/png",
    });

    await act(async () => {
      result.current.onDrop([mockValidFile]); // Simulate valid file drop
    });

    expect(result.current.file).toEqual(mockValidFile); // File should be set
    expect(result.current.image).toEqual(URL.createObjectURL(mockValidFile)); // Image URL should be set
    expect(result.current.fileInfo).toEqual({
      name: mockValidFile.name,
      size: `${(mockValidFile.size / 1024).toFixed(2)} KB`,
    });
    expect(result.current.uploadSuccess).toBe(true); // Upload success should be true
    expect(result.current.errorImage).toBeNull(); // No error for valid file
  });
  it("should handle file drop with invalid file (size or type)", async () => {
    const { result } = renderHook(() => useCertificationForm());

    const mockInvalidFile = new File(["dummy content"], "test.exe", {
      type: "application/x-msdownload",
    });

    await act(async () => {
      result.current.onDrop([mockInvalidFile]); // Simulate invalid file drop
    });

    expect(result.current.file).toBeNull();
    expect(result.current.image).toBeNull();
    expect(result.current.fileInfo).toBeNull();
    expect(result.current.uploadSuccess).toBe(false);
    expect(result.current.errorImage).toBe("Unsupported File Format");
  });
});

describe("truncateFileName function", () => {
  it("should return the full file name if it is shorter than maxLength", () => {
    const { result } = renderHook(() => useCertificationForm());

    const shortFileName = "shortfile.png";
    const maxLength = 20;

    expect(result.current.truncateFileName(shortFileName, maxLength)).toBe(
      shortFileName,
    );
  });
});
describe("getButtonStyles", () => {
  const PRIMARY_MAIN = "#0000ff"; // Example value
  const DIVIDER = "#cccccc"; // Example value

  it("should return correct styles for contained variant", () => {
    const result = getButtonStyles("contained", PRIMARY_MAIN, DIVIDER);

    expect(result).toEqual({
      height: "52px",
      width: "105px",
      mr: 2,
      backgroundColor: PRIMARY_MAIN,
      border: undefined,
    });
  });

  it("should return correct styles for outlined variant", () => {
    const result = getButtonStyles("outlined", PRIMARY_MAIN, DIVIDER);

    expect(result).toEqual({
      height: "52px",
      width: "20%",
      mr: 0,
      backgroundColor: undefined,
      border: `1px solid ${DIVIDER}`,
    });
  });

  it("should apply additional styles if provided", () => {
    const additionalStyles = { color: "red", padding: "10px" };
    const result = getButtonStyles(
      "outlined",
      PRIMARY_MAIN,
      DIVIDER,
      additionalStyles,
    );

    expect(result).toEqual({
      height: "52px",
      width: "20%",
      mr: 0,
      backgroundColor: undefined,
      border: `1px solid ${DIVIDER}`,
      color: "red",
      padding: "10px",
    });
  });
});

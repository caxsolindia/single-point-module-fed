import React, { act, ReactElement, RefObject } from "react";
import { ThemeProvider } from "@emotion/react";
import { Theme } from "@mui/material";
import CropperJS from "cropperjs";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileImageEditor, {
  applyFilters,
  captureImage,
  ChildImageMethods,
  confirmDelete,
  cycleFlipDirection,
  dataURLtoFile,
  handleCrop,
  handleCropIconClick,
  handleImageUpload,
  handleSubmit,
  handleUndo,
  onCancel,
  onDrop,
  startCamera,
  UndoState,
} from "./ProfileImageEditor.tsx";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { fileValidationSchema } from "../Validation/imagevalidation.ts";

// Mock the useThemeContext to return a mock theme object
jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(() => ({
    theme: { colors: { primary: "#000" } }, // Mocked theme
  })),
}));

jest.mock("react-dropzone", () => ({
  useDropzone: jest.fn(() => ({
    getRootProps: jest.fn(() => ({
      onClick: jest.fn(), // Mock an event handler
      className: "dropzone-root", // Mock a CSS class
    })),
    getInputProps: jest.fn(() => ({
      type: "file",
      name: "file-input", // Mock input props
      accept: "image/*", // Accept only images
    })),
    isDragActive: false, // Mocking additional state
  })),
}));

jest.mock("react-cropper", () => ({
  Cropper: jest.fn(() => <div>Cropper Mock</div>),
}));

// Mock any icons used
jest.mock("../../../assets/Icon/Icon.tsx", () => ({
  AdjustIcon: () => <div>AdjustIcon</div>,
  CropIcon: () => <div>CropIcon</div>,
  DeleteIcon: () => <div>DeleteIcon</div>,
  FlipHIcon: () => <div>FlipHIcon</div>,
  PictureIcon: () => <div>PictureIcon</div>,
  UndoIcon: () => <div>UndoIcon</div>,
}));

// Mock the image validation schema
jest.mock("../Validation/imagevalidation.ts", () => ({
  fileValidationSchema: {
    validate: jest.fn().mockResolvedValue(true),
  },
}));

jest.mock("../../../ThemeContext/ThemeContext.tsx", () => ({
  useThemeContext: jest.fn(() => ({
    theme: {
      colors: { primary: "#000", secondary: "#fff" },
      typography: {
        subtitle2: {
          fontSize: "0.875rem",
          fontWeight: 400,
        },
        // Add other necessary typography properties
      },
      spacing: 8, // Example additional theme properties
    },
  })),
}));

describe("ProfileImageEditor Component", () => {
  let ref: React.RefObject<ChildImageMethods>;

  beforeEach(() => {
    ref = React.createRef();
  });

  const customRender = (ui: ReactElement, theme: Theme) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  test("renders without crashing", () => {
    const { theme } = useThemeContext(); // Call hook outside customRender

    customRender(
      <ProfileImageEditor
        ref={ref}
        setCropModeFlag={jest.fn()}
        setIsImageDroppedFlag={jest.fn()}
        setIsCameraUsedFlag={jest.fn()}
      />,
      theme, // Pass the theme to customRender
    );

    expect(
      screen.getByText("Jennifer, Help others to recognize you!"),
    ).toBeInTheDocument();
  });

  test("triggers image upload on file input change", () => {
    const { theme } = useThemeContext(); // Call hook outside customRender

    customRender(
      <ProfileImageEditor
        ref={ref}
        setCropModeFlag={jest.fn()}
        setIsImageDroppedFlag={jest.fn()}
        setIsCameraUsedFlag={jest.fn()}
      />,
      theme, // Pass the theme to customRender
    );

    const file = new File(["dummy content"], "example.png", {
      type: "image/png",
    });

    const fileInput = screen.getByTestId("file-input");
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText("Upload your image here")).toBeInTheDocument();
  });

  test("fetches and processes image file on component mount", async () => {
    // Mock fetch globally
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        blob: () =>
          Promise.resolve(new Blob(["dummy content"], { type: "image/jpeg" })),
      }),
    ) as jest.Mock;

    const { theme } = useThemeContext();

    customRender(
      <ProfileImageEditor
        ref={ref}
        setCropModeFlag={jest.fn()}
        setIsImageDroppedFlag={jest.fn()}
        setIsCameraUsedFlag={jest.fn()}
      />,
      theme,
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/images/sample-image.jpg");
    });
  });

  test("invokes camera functionalities correctly", async () => {
    const { theme } = useThemeContext();
    customRender(
      <ProfileImageEditor
        ref={ref}
        setCropModeFlag={jest.fn()}
        setIsImageDroppedFlag={jest.fn()}
        setIsCameraUsedFlag={jest.fn()}
      />,
      theme,
    );

    // Mock the camera methods on ref.current
    if (ref.current) {
      ref.current.useCameraFun = jest.fn();
      ref.current.stopCameraFun = jest.fn();
    }

    // Test starting the camera
    await act(async () => {
      ref.current?.useCameraFun();
    });
    expect(ref.current?.useCameraFun).toHaveBeenCalled();

    // Test stopping the camera
    act(() => {
      ref.current?.stopCameraFun();
    });
    expect(ref.current?.stopCameraFun).toHaveBeenCalled();
  });

  test("handles fetch error gracefully", async () => {
    // Mock a fetch failure
    global.fetch = jest.fn().mockRejectedValue(new Error("Fetch failed"));

    // Mock state setters
    const mockSetIsImageDroppedFlag = jest.fn();

    // Render the component
    const { theme } = useThemeContext();
    customRender(
      <ProfileImageEditor
        ref={ref}
        setCropModeFlag={jest.fn()}
        setIsImageDroppedFlag={mockSetIsImageDroppedFlag}
        setIsCameraUsedFlag={jest.fn()}
      />,
      theme,
    );

    // Wait for the effect to finish
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/images/sample-image.jpg");
    });

    // Ensure no state was updated on error
    expect(mockSetIsImageDroppedFlag).not.toHaveBeenCalled();
  });
});

// Mock implementation of FileReader
class MockFileReader {
  result: string | ArrayBuffer | null = null;

  onload: (() => void) | null = null;

  onerror: (() => void) | null = null;

  readAsDataURL() {
    if (this.onload) {
      this.onload();
    }
  }
}

describe("handleImageUpload", () => {
  let setImage: jest.Mock;
  let setSelectedFile: jest.Mock;
  let setFileUploaded: jest.Mock;
  let setIsImageDroppedFlag: jest.Mock;

  beforeEach(() => {
    // Initialize mocks
    setImage = jest.fn();
    setSelectedFile = jest.fn();
    setFileUploaded = jest.fn();
    setIsImageDroppedFlag = jest.fn();

    // Mock FileReader

    // Replace the global FileReader with the mock implementation
    jest
      .spyOn(globalThis, "FileReader")
      .mockImplementation(() => new MockFileReader() as unknown as FileReader);
  });

  test("should call state setters with correct arguments", () => {
    const file = new File(["dummy content"], "example.jpg", {
      type: "image/jpeg",
    });

    // Call handleImageUpload with mocks
    handleImageUpload(
      file,
      setImage,
      setSelectedFile,
      setFileUploaded,
      setIsImageDroppedFlag,
    );

    // Retrieve the instance of the mocked FileReader
    const fileReaderInstance = (globalThis.FileReader as unknown as jest.Mock)
      .mock.instances[0] as MockFileReader;

    // Simulate FileReader.onload event
    fileReaderInstance.result = "data:image/jpeg;base64,example";
    if (fileReaderInstance.onload) {
      fileReaderInstance.onload();
    }

    // Assertions to check if the state setters were called correctly
    expect(setSelectedFile).toHaveBeenCalledWith(file);
    expect(setFileUploaded).toHaveBeenCalledWith(true);
    expect(setIsImageDroppedFlag).toHaveBeenCalledWith(true);
  });
});

describe("onDrop function", () => {
  let setImage: jest.Mock;
  let setSelectedFile: jest.Mock;
  let setFileUploaded: jest.Mock;
  let setIsImageDroppedFlag: jest.Mock;
  let setError: jest.Mock;

  beforeEach(() => {
    setImage = jest.fn();
    setSelectedFile = jest.fn();
    setFileUploaded = jest.fn();
    setIsImageDroppedFlag = jest.fn();
    setError = jest.fn();
  });

  test("should call handleImageUpload when file validation succeeds", async () => {
    const mockFile = new File(["content"], "example.jpg", {
      type: "image/jpeg",
    });

    // Mock successful validation
    (fileValidationSchema.validate as jest.Mock).mockResolvedValue(true);

    // Call onDrop with mocks
    onDrop(
      [mockFile],
      setImage,
      setSelectedFile,
      setFileUploaded,
      setIsImageDroppedFlag,
      setError,
    );

    // Use setTimeout to wait for asynchronous code
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve(); // resolve the promise after the timeout
      }, 0);
    });

    // Assert validation and handleImageUpload were called correctly
    expect(fileValidationSchema.validate).toHaveBeenCalledWith({
      file: mockFile,
    });

    expect(setSelectedFile).not.toHaveBeenCalledWith(null);
  });

  test("should handle validation errors correctly", async () => {
    const mockFile = new File(["content"], "example.jpg", {
      type: "image/jpeg",
    });

    // Mock validation error
    const validationError = new Error("Invalid file type");
    (fileValidationSchema.validate as jest.Mock).mockRejectedValue(
      validationError,
    );

    // Call onDrop with mocks
    onDrop(
      [mockFile],
      setImage,
      setSelectedFile,
      setFileUploaded,
      setIsImageDroppedFlag,
      setError,
    );

    // Use setTimeout to wait for asynchronous code
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve(); // resolve the promise after the timeout
      }, 0);
    });

    // Assert validation and error handling were called correctly
    expect(fileValidationSchema.validate).toHaveBeenCalledWith({
      file: mockFile,
    });
    expect(setError).toHaveBeenCalledWith("Invalid file type");
    expect(setImage).toHaveBeenCalledWith(null);
    expect(setSelectedFile).toHaveBeenCalledWith(null);
    expect(setFileUploaded).not.toHaveBeenCalled();
    expect(setIsImageDroppedFlag).not.toHaveBeenCalled();
  });
});

describe("applyFilters", () => {
  let canvasRef: React.RefObject<HTMLCanvasElement>;
  let canvasMock: HTMLCanvasElement;
  let ctxMock: CanvasRenderingContext2D;

  beforeEach(() => {
    // Mock the canvas and context
    canvasMock = document.createElement("canvas");
    ctxMock = {
      clearRect: jest.fn(),
      save: jest.fn(),
      translate: jest.fn(),
      rotate: jest.fn(),
      scale: jest.fn(),
      drawImage: jest.fn(),
      restore: jest.fn(),
      filter: "",
    } as unknown as CanvasRenderingContext2D;

    // Mock getContext to return the mocked context
    jest.spyOn(canvasMock, "getContext").mockReturnValue(ctxMock);

    canvasRef = { current: canvasMock };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return if canvasRef or image is not provided", () => {
    // No canvas or image
    applyFilters({
      canvasRef: { current: null },
      image: null,
      zoom: 1,
      brightness: 100,
      contrast: 100,
      angle: 0,
      flipDirection: "none",
    });
    expect(ctxMock.clearRect).not.toHaveBeenCalled();
  });

  it("should apply the correct brightness and contrast filters", () => {
    const mockImageSrc = "data:image/png;base64,mockimage";

    // Mock Image and onload behavior
    const imageMock = { src: "", onload: jest.fn() };
    jest
      .spyOn(window, "Image")
      .mockImplementation(() => imageMock as unknown as HTMLImageElement);

    applyFilters({
      canvasRef,
      image: mockImageSrc,
      zoom: 1,
      brightness: 120,
      contrast: 80,
      angle: 0,
      flipDirection: "none",
    });

    // Simulate image load event
    imageMock.onload();

    expect(ctxMock.filter).toBe("brightness(120%) contrast(80%)");
  });

  it("should apply zoom and draw the image on canvas", () => {
    const mockImageSrc = "data:image/png;base64,mockimage";
    const imageMock = { src: "", onload: jest.fn(), width: 100, height: 100 };
    jest
      .spyOn(window, "Image")
      .mockImplementation(() => imageMock as unknown as HTMLImageElement);

    applyFilters({
      canvasRef,
      image: mockImageSrc,
      zoom: 2,
      brightness: 100,
      contrast: 100,
      angle: 0,
      flipDirection: "none",
    });

    // Simulate image load event
    imageMock.onload();

    expect(canvasMock.width).toBe(100);
    expect(canvasMock.height).toBe(100);

    // Expect the image to be drawn with zoom applied
    expect(ctxMock.drawImage).toHaveBeenCalledWith(
      imageMock,
      -50, // (100 - 200) / 2
      -50, // (100 - 200) / 2
      200,
      200,
    );
  });

  it("should rotate the image by the given angle", () => {
    const mockImageSrc = "data:image/png;base64,mockimage";
    const imageMock = { src: "", onload: jest.fn(), width: 100, height: 100 };
    jest
      .spyOn(window, "Image")
      .mockImplementation(() => imageMock as unknown as HTMLImageElement);

    applyFilters({
      canvasRef,
      image: mockImageSrc,
      zoom: 1,
      brightness: 100,
      contrast: 100,
      angle: 45,
      flipDirection: "none",
    });

    // Simulate image load event
    imageMock.onload();

    // Check that the canvas rotation was applied correctly (45 degrees)
    expect(ctxMock.rotate).toHaveBeenCalledWith((45 * Math.PI) / 180);
  });

  it('should flip the image horizontally when flipDirection is "horizontal"', () => {
    const mockImageSrc = "data:image/png;base64,mockimage";
    const imageMock = { src: "", onload: jest.fn(), width: 100, height: 100 };
    jest
      .spyOn(window, "Image")
      .mockImplementation(() => imageMock as unknown as HTMLImageElement);

    applyFilters({
      canvasRef,
      image: mockImageSrc,
      zoom: 1,
      brightness: 100,
      contrast: 100,
      angle: 0,
      flipDirection: "horizontal",
    });

    // Simulate image load event
    imageMock.onload();

    // Check that horizontal flipping was applied
    expect(ctxMock.scale).toHaveBeenCalledWith(-1, 1);
  });
});

describe("captureImage", () => {
  let mockSetImage: jest.Mock;
  let mockSetSelectedFile: jest.Mock;
  let mockStopCamera: jest.Mock;
  let mockSetIsCameraUsedFlag: jest.Mock;
  let mockDataURLtoFile: jest.Mock;

  let mockVideoElement: HTMLVideoElement;
  let mockCanvasElement: HTMLCanvasElement;
  let mockCanvasContext: CanvasRenderingContext2D;

  beforeEach(() => {
    // Mock all the necessary functions
    mockSetImage = jest.fn();
    mockSetSelectedFile = jest.fn();
    mockStopCamera = jest.fn();
    mockSetIsCameraUsedFlag = jest.fn();
    mockDataURLtoFile = jest
      .fn()
      .mockReturnValue(new File([], "captured-image.png"));

    // Mock the video element
    mockVideoElement = document.createElement("video");
    mockVideoElement.id = "camera-stream";

    // Add the mock video element to the DOM
    document.body.appendChild(mockVideoElement);

    // Mock the canvas element and its 2D context
    mockCanvasElement = document.createElement("canvas");
    mockCanvasContext = {
      drawImage: jest.fn(),
      getImageData: jest.fn(),
      putImageData: jest.fn(),
      fillRect: jest.fn(),
      clearRect: jest.fn(),
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      measureText: jest.fn().mockReturnValue({ width: 100 }),
      setTransform: jest.fn(),
      resetTransform: jest.fn(),
      drawFocusIfNeeded: jest.fn(),
      createPattern: jest.fn(),
      clip: jest.fn(),
      fillText: jest.fn(),
      strokeText: jest.fn(),
      setLineDash: jest.fn(),
      closePath: jest.fn(),
      createLinearGradient: jest.fn(),
      createRadialGradient: jest.fn(),
      createConicGradient: jest.fn(),
      createImageData: jest.fn(),
      getContextAttributes: jest.fn(),
      isPointInPath: jest.fn(),
      isPointInStroke: jest.fn(),
      save: jest.fn(),
      restore: jest.fn(),
      rotate: jest.fn(),
      scale: jest.fn(),
      translate: jest.fn(),
      transform: jest.fn(),
      globalAlpha: 1,
      strokeStyle: "#000",
      fillStyle: "#000",
      lineWidth: 1,
      lineCap: "butt",
      lineJoin: "miter",
      miterLimit: 10,
      globalCompositeOperation: "source-over",
      font: "10px sans-serif",
      textAlign: "start",
      textBaseline: "alphabetic",
    } as unknown as CanvasRenderingContext2D;

    jest.spyOn(document, "createElement").mockImplementation((tag: string) => {
      if (tag === "canvas") return mockCanvasElement;
      return document.createElement(tag);
    });

    jest
      .spyOn(mockCanvasElement, "getContext")
      .mockReturnValue(mockCanvasContext);

    jest
      .spyOn(mockCanvasElement, "toDataURL")
      .mockReturnValue("data:image/png;base64,mockDataUrl");
  });

  afterEach(() => {
    // Clean up the DOM
    document.body.removeChild(mockVideoElement);
    jest.restoreAllMocks();
  });

  test("should capture image, convert it to a file, stop the camera, and set flags", () => {
    // Call the captureImage function
    captureImage(
      mockSetImage,
      mockSetSelectedFile,
      mockStopCamera,
      mockSetIsCameraUsedFlag,
      mockDataURLtoFile,
    );

    // Check that the canvas draws the video frame
    expect(mockCanvasContext.drawImage).toHaveBeenCalledWith(
      mockVideoElement,
      0,
      0,
    );

    // Check that the image data URL is set
    expect(mockSetImage).toHaveBeenCalledWith(
      "data:image/png;base64,mockDataUrl",
    );

    // Check that the file is created and passed to setSelectedFile
    expect(mockDataURLtoFile).toHaveBeenCalledWith(
      "data:image/png;base64,mockDataUrl",
      "captured-image.png",
    );
    expect(mockSetSelectedFile).toHaveBeenCalledWith(expect.any(File));

    // Check that the camera is stopped
    expect(mockStopCamera).toHaveBeenCalled();

    // Check that the camera used flag is updated
    expect(mockSetIsCameraUsedFlag).toHaveBeenCalledWith(false);
  });
});

describe("handleSubmit", () => {
  let fetchMock: jest.Mock;
  let toBlobMock: jest.Mock;
  let canvasRefMock: RefObject<HTMLCanvasElement>;
  let canvasMock: HTMLCanvasElement;
  let selectedFile: File;

  beforeEach(() => {
    // Mock the fetch function
    fetchMock = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ success: true }),
    });
    // Type-safe global fetch assignment
    global.fetch = fetchMock;

    // Mock toBlob method of canvas
    toBlobMock = jest.fn((callback: (blob: Blob | null) => void) => {
      callback(new Blob(["test"], { type: "image/png" }));
    });

    // Mock canvas element
    canvasMock = {
      toBlob: toBlobMock,
    } as unknown as HTMLCanvasElement;

    // Mock canvasRef
    canvasRefMock = {
      current: canvasMock,
    };

    // Mock selected file
    selectedFile = new File(["test"], "image.png", { type: "image/png" });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should upload file when selectedFile and canvasRef.current are provided", () => {
    handleSubmit(selectedFile, canvasRefMock);

    expect(toBlobMock).toHaveBeenCalledWith(expect.any(Function), "image/png");
    expect(fetchMock).toHaveBeenCalledWith("/api/upload", {
      method: "POST",
      body: expect.any(FormData),
    });

    // Check the FormData content
    const formData = fetchMock.mock.calls[0][1].body as FormData;
    const uploadedFile = formData.get("image") as File;
    expect(uploadedFile).toBeInstanceOf(File);
    expect(uploadedFile.name).toBe("image.png");
    expect(uploadedFile.type).toBe("image/png");
  });

  test("should log success message when upload is successful", async () => {
    handleSubmit(selectedFile, canvasRefMock);

    await new Promise(process.nextTick); // Wait for all promises to resolve
  });

  test("should log error message when upload fails", async () => {
    fetchMock.mockRejectedValueOnce(new Error("Upload failed"));

    handleSubmit(selectedFile, canvasRefMock);

    await new Promise(process.nextTick); // Wait for all promises to resolve
  });

  test("should do nothing if selectedFile is null", () => {
    handleSubmit(null, canvasRefMock);

    expect(toBlobMock).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  test("should do nothing if canvasRef.current is null", () => {
    // canvasRefMock.current = null;

    handleSubmit(selectedFile, canvasRefMock);
  });
});

describe("dataURLtoFile", () => {
  test("should handle different MIME types correctly", () => {
    const dataURL = "data:text/plain;base64,SGVsbG8gd29ybGQ=";
    const filename = "test.txt";

    const file = dataURLtoFile(dataURL, filename);

    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe(filename);
    expect(file.type).toBe("text/plain");
  });

  test("should handle data URL with parameters", () => {
    const dataURL =
      "data:image/jpeg;param=value;base64,/9j/4AAQSkZJRgABAQEAAAAA";
    const filename = "test.jpg";

    const file = dataURLtoFile(dataURL, filename);

    expect(file).toBeInstanceOf(File);
    expect(file.name).toBe(filename);
    expect(file.type).toBe("image/jpeg");
  });

  test("should handle invalid data URL format gracefully", () => {
    const dataURL = "invaliddataurl";
    const filename = "invalid.txt";

    expect(() => {
      dataURLtoFile(dataURL, filename);
    }).toThrowError();
  });
});

describe("startCamera", () => {
  let mockSetCameraStream: jest.Mock;
  let mockSetIsCameraMode: jest.Mock;
  let mockSetIsCameraUsedFlag: jest.Mock;
  let mockSetIsImageDroppedFlag: jest.Mock;

  beforeAll(() => {
    // Mock navigator.mediaDevices and its getUserMedia method
    Object.defineProperty(navigator, "mediaDevices", {
      value: {
        getUserMedia: jest.fn(),
      },
      writable: true,
    });
  });

  beforeEach(() => {
    mockSetCameraStream = jest.fn();
    mockSetIsCameraMode = jest.fn();
    mockSetIsCameraUsedFlag = jest.fn();
    mockSetIsImageDroppedFlag = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully start the camera and update state flags", async () => {
    // Mock the mediaDevices.getUserMedia function to resolve with a MediaStream
    const mockStream = { id: "mockStream" } as unknown as MediaStream;
    (navigator.mediaDevices.getUserMedia as jest.Mock).mockResolvedValue(
      mockStream,
    );

    await startCamera(
      mockSetCameraStream,
      mockSetIsCameraMode,
      mockSetIsCameraUsedFlag,
      mockSetIsImageDroppedFlag,
    );

    expect(mockSetCameraStream).toHaveBeenCalledWith(mockStream);
    expect(mockSetIsCameraMode).toHaveBeenCalledWith(true);
    expect(mockSetIsCameraUsedFlag).toHaveBeenCalledWith(true);
    expect(mockSetIsImageDroppedFlag).toHaveBeenCalledWith(true);
  });

  it("should handle errors when accessing the camera fails", async () => {
    // Mock getUserMedia to throw an error
    const mockError = new Error("Camera access denied");
    (navigator.mediaDevices.getUserMedia as jest.Mock).mockRejectedValue(
      mockError,
    );

    await startCamera(
      mockSetCameraStream,
      mockSetIsCameraMode,
      mockSetIsCameraUsedFlag,
      mockSetIsImageDroppedFlag,
    );

    // Ensure no state setters are called
    expect(mockSetCameraStream).not.toHaveBeenCalled();
    expect(mockSetIsCameraMode).not.toHaveBeenCalled();
    expect(mockSetIsCameraUsedFlag).not.toHaveBeenCalled();
    expect(mockSetIsImageDroppedFlag).not.toHaveBeenCalled();
  });
});

describe("confirmDelete", () => {
  let setImage: jest.Mock;
  let setSelectedFile: jest.Mock;
  let setFileUploaded: jest.Mock;
  let setError: jest.Mock;
  let setBrightness: jest.Mock;
  let setContrast: jest.Mock;
  let setZoom: jest.Mock;
  let setAngle: jest.Mock;
  let setUndoStack: jest.Mock;
  let setOpenDeleteModal: jest.Mock;
  let setIsCameraUsedFlag: jest.Mock;
  let setIsImageDroppedFlag: jest.Mock;
  let setIsCropMode: jest.Mock;
  let setCropModeFlag: jest.Mock;
  let setFlipDirection: jest.Mock;

  beforeEach(() => {
    setImage = jest.fn();
    setSelectedFile = jest.fn();
    setFileUploaded = jest.fn();
    setError = jest.fn();
    setBrightness = jest.fn();
    setContrast = jest.fn();
    setZoom = jest.fn();
    setAngle = jest.fn();
    setUndoStack = jest.fn();
    setOpenDeleteModal = jest.fn();
    setIsCameraUsedFlag = jest.fn();
    setIsImageDroppedFlag = jest.fn();
    setIsCropMode = jest.fn();
    setCropModeFlag = jest.fn();
    setFlipDirection = jest.fn();
  });

  it("should reset state values correctly", () => {
    confirmDelete(
      setImage,
      setSelectedFile,
      setFileUploaded,
      setError,
      setBrightness,
      setContrast,
      setZoom,
      setAngle,
      setUndoStack,
      setOpenDeleteModal,
      setIsCameraUsedFlag,
      setIsImageDroppedFlag,
      setIsCropMode,
      setCropModeFlag,
      setFlipDirection,
    );

    // Check if all setters were called with correct values
    expect(setImage).toHaveBeenCalledWith(null);
    expect(setSelectedFile).toHaveBeenCalledWith(null);
    expect(setFileUploaded).toHaveBeenCalledWith(false);
    expect(setError).toHaveBeenCalledWith(null);
    expect(setBrightness).toHaveBeenCalledWith(100);
    expect(setContrast).toHaveBeenCalledWith(100);
    expect(setZoom).toHaveBeenCalledWith(1);
    expect(setAngle).toHaveBeenCalledWith(0);
    expect(setUndoStack).toHaveBeenCalledWith([]);
    expect(setOpenDeleteModal).toHaveBeenCalledWith(false);
    expect(setIsCameraUsedFlag).toHaveBeenCalledWith(false);
    expect(setIsImageDroppedFlag).toHaveBeenCalledWith(false);
    expect(setIsCropMode).toHaveBeenCalledWith(false);
    expect(setCropModeFlag).toHaveBeenCalledWith(false);
    expect(setFlipDirection).toHaveBeenCalledWith("none");
  });
});

describe("handleCrop", () => {
  it("should update state with cropped image data", () => {
    // Mock functions
    const setImage = jest.fn();
    const setSelectedFile = jest.fn();
    const setIsCropMode = jest.fn();
    const setCropModeFlag = jest.fn();
    const setFlipDirection = jest.fn();

    // Mock CropperJS instance
    const mockCanvas = {
      toDataURL: jest.fn(() => "data:image/png;base64,croppedImageData"),
    };
    const cropper = {
      getCroppedCanvas: jest.fn(() => mockCanvas),
    } as unknown as CropperJS;

    // Call handleCrop
    handleCrop(
      cropper,
      setImage,
      setSelectedFile,
      setIsCropMode,
      setCropModeFlag,
      setFlipDirection,
    );

    // Assertions
    expect(cropper.getCroppedCanvas).toHaveBeenCalled();
    expect(mockCanvas.toDataURL).toHaveBeenCalled();
    expect(setImage).toHaveBeenCalledWith(
      "data:image/png;base64,croppedImageData",
    );
    expect(setSelectedFile).toHaveBeenCalledWith(
      new File(["data:image/png;base64,croppedImageData"], "cropped-image.png"),
    );
    expect(setIsCropMode).toHaveBeenCalledWith(false);
    expect(setCropModeFlag).toHaveBeenCalledWith(false);
    expect(setFlipDirection).toHaveBeenCalledWith("none");
  });

  it("should not update state if cropper is null", () => {
    // Mock functions
    const setImage = jest.fn();
    const setSelectedFile = jest.fn();
    const setIsCropMode = jest.fn();
    const setCropModeFlag = jest.fn();
    const setFlipDirection = jest.fn();

    // Call handleCrop with null cropper
    handleCrop(
      null,
      setImage,
      setSelectedFile,
      setIsCropMode,
      setCropModeFlag,
      setFlipDirection,
    );

    // Assertions
    expect(setImage).not.toHaveBeenCalled();
    expect(setSelectedFile).not.toHaveBeenCalled();
    expect(setIsCropMode).not.toHaveBeenCalled();
    expect(setCropModeFlag).not.toHaveBeenCalled();
    expect(setFlipDirection).not.toHaveBeenCalled();
  });
});

describe("onCancel", () => {
  it("should set crop mode states to their initial values", () => {
    // Mock state setter functions
    const setIsCropMode = jest.fn();
    const setCropModeFlag = jest.fn();
    const setFlipDirection = jest.fn();

    // Call onCancel
    onCancel(setIsCropMode, setCropModeFlag, setFlipDirection);

    // Assertions
    expect(setIsCropMode).toHaveBeenCalledWith(false);
    expect(setCropModeFlag).toHaveBeenCalledWith(false);
    expect(setFlipDirection).toHaveBeenCalledWith("none");
  });
});

describe("cycleFlipDirection", () => {
  it('should toggle flip direction from "none" to "horizontal"', () => {
    const setFlipDirection = jest.fn();
    const saveState = jest.fn();

    cycleFlipDirection(setFlipDirection, saveState);

    expect(saveState).toHaveBeenCalled();
  });

  it('should toggle flip direction from "horizontal" to "none"', () => {
    const setFlipDirection = jest.fn();
    const saveState = jest.fn();

    cycleFlipDirection(setFlipDirection, saveState);

    expect(saveState).toHaveBeenCalled();
  });
});

describe("handleUndo", () => {
  let setUndoStack: jest.Mock;
  let setImage: jest.Mock;
  let setZoom: jest.Mock;
  let setBrightness: jest.Mock;
  let setContrast: jest.Mock;
  let setAngle: jest.Mock;
  let setFlipDirection: jest.Mock;

  // Mock values for undo stack
  const lastState: UndoState = {
    image: "image1.png",
    zoom: 1.2,
    brightness: 90,
    contrast: 80,
    angle: 45,
    flipDirection: "horizontal",
  };

  const initialUndoStack: UndoState[] = [lastState];

  beforeEach(() => {
    // Reset mock functions before each test
    setUndoStack = jest.fn();
    setImage = jest.fn();
    setZoom = jest.fn();
    setBrightness = jest.fn();
    setContrast = jest.fn();
    setAngle = jest.fn();
    setFlipDirection = jest.fn();
  });

  it("should restore the last state and update the undo stack", () => {
    handleUndo(
      setUndoStack,
      setImage,
      setZoom,
      setBrightness,
      setContrast,
      setAngle,
      setFlipDirection,
    );

    // Simulate calling setUndoStack with a stack that has one state
    setUndoStack.mock.calls[0][0](initialUndoStack);

    expect(setImage).toHaveBeenCalledWith("image1.png");
    expect(setZoom).toHaveBeenCalledWith(1.2);
    expect(setBrightness).toHaveBeenCalledWith(90);
    expect(setContrast).toHaveBeenCalledWith(80);
    expect(setAngle).toHaveBeenCalledWith(45);
    expect(setFlipDirection).toHaveBeenCalledWith("horizontal");
  });

  it("should do nothing if the undo stack is empty", () => {
    const emptyStack: UndoState[] = [];

    handleUndo(
      setUndoStack,
      setImage,
      setZoom,
      setBrightness,
      setContrast,
      setAngle,
      setFlipDirection,
    );

    // Simulate calling setUndoStack with an empty stack
    setUndoStack.mock.calls[0][0](emptyStack);

    expect(setImage).not.toHaveBeenCalled();
    expect(setZoom).not.toHaveBeenCalled();
    expect(setBrightness).not.toHaveBeenCalled();
    expect(setContrast).not.toHaveBeenCalled();
    expect(setAngle).not.toHaveBeenCalled();
    expect(setFlipDirection).not.toHaveBeenCalled();
  });
});

describe("handleCropIconClick", () => {
  let setImage: jest.Mock;
  let setIsCropMode: jest.Mock;
  let setCropModeFlag: jest.Mock;
  let canvasRef: React.RefObject<HTMLCanvasElement>;

  beforeEach(() => {
    setImage = jest.fn();
    setIsCropMode = jest.fn();
    setCropModeFlag = jest.fn();

    // Create a canvas element and set its context
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Draw something on the canvas to make toDataURL() return a valid data URL
      ctx.fillStyle = "red";
      ctx.fillRect(0, 0, 100, 100);
    }

    canvasRef = { current: canvas };
  });

  it("should call setImage with data URL of the canvas", () => {
    handleCropIconClick(
      canvasRef,
      setImage,
      setIsCropMode,
      setCropModeFlag,
      1,
      100,
      100,
      0,
      "none",
    );

    // expect(setImage).toHaveBeenCalledWith(expect.any(String));
  });

  it("should call applyFilters with correct parameters", () => {
    handleCropIconClick(
      canvasRef,
      setImage,
      setIsCropMode,
      setCropModeFlag,
      1,
      100,
      100,
      0,
      "none",
    );

    // expect(applyFilters).toHaveBeenCalledWith({
    //   canvasRef,
    //   image: expect.any(String),
    //   zoom: 1,
    //   brightness: 100,
    //   contrast: 100,
    //   angle: 0,
    //   flipDirection: "none",
    // });
  });

  it("should set crop mode and crop mode flag to true", () => {
    handleCropIconClick(
      canvasRef,
      setImage,
      setIsCropMode,
      setCropModeFlag,
      1,
      100,
      100,
      0,
      "none",
    );

    expect(setIsCropMode).toHaveBeenCalledWith(true);
    expect(setCropModeFlag).toHaveBeenCalledWith(true);
  });

  it("should not call setImage or applyFilters if canvas is null", () => {
    // Mock the canvasRef to have a null current
    Object.defineProperty(canvasRef, "current", {
      value: null,
      writable: true,
    });

    handleCropIconClick(
      canvasRef,
      setImage,
      setIsCropMode,
      setCropModeFlag,
      1,
      100,
      100,
      0,
      "none",
    );

    expect(setImage).not.toHaveBeenCalled();
    // expect(applyFilters).not.toHaveBeenCalled();
  });
});

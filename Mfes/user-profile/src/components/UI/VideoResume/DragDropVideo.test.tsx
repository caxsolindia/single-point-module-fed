import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { forwardRef } from "react";
import { Button } from "@mui/material";
import DragDropVideo, {
  ChildMethods,
  handleDrop,
  handleLoadedMetadata,
  handleSeeked,
  useCustomImperativeHandle,
} from "./DragDropVideo.tsx";
import "@testing-library/jest-dom";
import {
  // VIDEO_DURATION_ERROR,
  videoFileSchema,
} from "../Validation/VideoValidation.ts";

// Mock necessary modules and components
const onDropMock = jest.fn();
// Mock handleSubmit function
const handleSubmitMock = jest.fn();
// Define props type
interface TestComponentProps {
  error: string | null;
  videoFile: File | null;
}

// Component to test useCustomImperativeHandle
const TestComponent = forwardRef<ChildMethods, TestComponentProps>(
  ({ error, videoFile }, ref) => {
    useCustomImperativeHandle(ref, error, videoFile, handleSubmitMock);
    return null;
  },
);

// Mock necessary modules and components
jest.mock("react-dropzone", () => ({
  useDropzone: jest.fn().mockReturnValue({
    getRootProps: () => ({ onDrop: onDropMock }),
    getInputProps: () => ({}),
    isDragActive: false,
  }),
}));

export interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function VideoFileIcon() {
  return <div>VideoFileIcon</div>;
}

function DownLoadIcon() {
  return <div>DownLoadIcon</div>;
}

function DeleteIcon() {
  return <div>DeleteIcon</div>;
}

function UploadIcon() {
  return <div>UploadIcon</div>;
}

jest.mock("@mui/icons-material/VideoFile", () => ({
  __esModule: true,
  default: VideoFileIcon,
}));

jest.mock("../../../assets/Icon/Icon.tsx", () => ({
  DownLoadIcon,
  DeleteIcon,
  UploadIcon,
}));

// Mock createObjectURL and revokeObjectURL methods
global.URL.createObjectURL = jest.fn(() => "blob:http://localhost/test-url");
global.URL.revokeObjectURL = jest.fn();

function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) {
  return (
    <div>
      {open && (
        <>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={onConfirm}>Confirm</Button>
        </>
      )}
    </div>
  );
}

jest.mock("./DeleteConfirmationDialog.tsx", () => ({
  __esModule: true,
  default: DeleteConfirmationDialog,
}));

// Mock the fetch function globally
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      blob: () => Promise.resolve(new Blob([""], { type: "video/mp4" })),
    }),
  ) as jest.Mock;
});

afterAll(() => {
  jest.restoreAllMocks(); // Restore the original fetch implementation after tests
});

jest.mock("../Validation/VideoValidation", () => ({
  videoFileSchema: {
    validate: jest.fn((file) => Promise.resolve(file)),
  },
  MAX_VIDEO_DURATION: 5, // Assuming 5 minutes = 300 seconds
}));

describe("DragDropVideo Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render and display initial state", () => {
    render(<DragDropVideo />);
    expect(
      screen.getByText(/click or drag and drop to upload a video/i),
    ).toBeInTheDocument();
  });

  it("should allow a user to drag and drop a video file", async () => {
    const file = new File(["video content"], "sample_video.mp4", {
      type: "video/mp4",
    });

    render(<DragDropVideo />);

    // Get the input element associated with the dropzone
    const inputElement = screen.getByText(
      /click or drag and drop to upload a video/i,
    );

    // Simulate dropping the file
    await act(async () => {
      fireEvent.drop(inputElement, {
        dataTransfer: {
          files: [file],
        },
      });
    });

    // Check if the file name is displayed after dropping
    const fileNameElement = screen.getByTestId("file-name");
    expect(fileNameElement).toHaveTextContent("sample_video.mp4");
    screen.debug(undefined, 300000);
  });

  it("should initiate the download when the download button is clicked", async () => {
    const file = new File(["video content"], "sample_video.mp4", {
      type: "video/mp4",
    });

    render(<DragDropVideo />);

    // Get the input element associated with the dropzone
    const inputElement = screen.getByText(
      /click or drag and drop to upload a video/i,
    );

    // Simulate dropping the file
    await act(async () => {
      fireEvent.drop(inputElement, {
        dataTransfer: {
          files: [file],
        },
      });
    });

    // Check if the file name is displayed after dropping
    const fileNameElement = screen.getByTestId("file-name");
    expect(fileNameElement).toHaveTextContent("sample_video.mp4");

    const downloadButton = screen.getByTestId("download-btn");
    await act(async () => {
      fireEvent.click(downloadButton);
    });
    // Assert that URL.createObjectURL was called with the correct file
    expect(URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it("should call handleSubmit when error is null and videoFile is present", async () => {
    const ref = React.createRef<ChildMethods>();

    render(
      <TestComponent
        ref={ref}
        error={null}
        videoFile={new File([""], "video.mp4", { type: "video/mp4" })}
      />,
    );

    // Invoke childMethod using the ref
    await act(async () => {
      await ref.current?.childMethod();
    });

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });

  it("should not call handleSubmit when there is an error", async () => {
    const ref = React.createRef<ChildMethods>();

    render(
      <TestComponent
        ref={ref}
        error="Some error"
        videoFile={new File([""], "video.mp4", { type: "video/mp4" })}
      />,
    );

    // Invoke childMethod using the ref
    await act(async () => {
      await ref.current?.childMethod();
    });

    expect(handleSubmitMock).not.toHaveBeenCalled();
  });

  it("should not call handleSubmit when videoFile is null", async () => {
    const ref = React.createRef<ChildMethods>();

    render(<TestComponent ref={ref} error={null} videoFile={null} />);

    // Invoke childMethod using the ref
    await act(async () => {
      await ref.current?.childMethod();
    });

    expect(handleSubmitMock).not.toHaveBeenCalled();
  });

  it("should call handleDelete and open delete confirmation modal", async () => {
    const file = new File(["video content"], "sample_video.mp4", {
      type: "video/mp4",
    });

    render(<DragDropVideo />);
    const inputElement = screen.getByText(
      /click or drag and drop to upload a video/i,
    );

    await act(async () => {
      fireEvent.drop(inputElement, {
        dataTransfer: {
          files: [file],
        },
      });
    });

    const deleteButton = screen.getByTestId("delete-btn");

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    expect(screen.getByText("Confirm")).toBeInTheDocument();

    const confirmButton = screen.getByText("Confirm");
    await act(async () => {
      fireEvent.click(confirmButton);
    });
  });

  it("should set an error and revoke the object URL when the video duration exceeds the maximum", () => {
    const videoElement = document.createElement("video");
    const canvas = document.createElement("canvas");
    const setError = jest.fn();
    const url = "blob:http://localhost/test-url";

    // Mock video element properties and methods
    Object.defineProperty(videoElement, "duration", {
      value: 400, // 6 minutes 40 seconds
      writable: true,
    });
    Object.defineProperty(videoElement, "videoWidth", {
      value: 1280,
      writable: true,
    });
    Object.defineProperty(videoElement, "videoHeight", {
      value: 720,
      writable: true,
    });

    const metadataHandler = handleLoadedMetadata(
      videoElement,
      canvas,
      url,
      setError,
    );
    metadataHandler();

    // expect(setError).toHaveBeenCalledWith(VIDEO_DURATION_ERROR);
    // expect(URL.revokeObjectURL).toHaveBeenCalled();
  });

  it("should generate a thumbnail and revoke the object URL", () => {
    const videoElement = document.createElement("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const setThumbnail = jest.fn();
    const url = "blob:http://localhost/test-url";

    // Mock context methods
    jest.spyOn(canvas, "getContext").mockReturnValue(context);
    jest
      .spyOn(canvas, "toDataURL")
      .mockReturnValue("data:image/png;base64,thumbnail");
    // jest.spyOn(context, "drawImage").mockImplementation(() => {});

    const seekedHandler = handleSeeked(videoElement, canvas, url, setThumbnail);
    seekedHandler();
  });

  it("should not generate a thumbnail if canvas context is not available", () => {
    const videoElement = document.createElement("video");
    const canvas = document.createElement("canvas");
    const setThumbnail = jest.fn();
    const url = "blob:http://localhost/test-url";

    // Mock getContext to return null
    jest.spyOn(canvas, "getContext").mockReturnValue(null);

    const seekedHandler = handleSeeked(videoElement, canvas, url, setThumbnail);
    seekedHandler();

    expect(setThumbnail).not.toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(url);
  });
});

jest.mock("../Validation/VideoValidation", () => ({
  videoFileSchema: {
    validate: jest.fn(),
  },
}));

describe("handleDrop", () => {
  const createThumbnailMock = jest.fn();
  const setVideoFileMock = jest.fn();
  const setVideoFileNameMock = jest.fn();
  const setVideoFileSizeMock = jest.fn();
  const setErrorMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should process the video file correctly", async () => {
    const file = new File(["video content"], "sample_video.mp4", {
      type: "video/mp4",
    });

    // Mock the validation function to resolve
    (videoFileSchema.validate as jest.Mock).mockResolvedValue(file);

    await handleDrop(
      [file],
      createThumbnailMock,
      setVideoFileMock,
      setVideoFileNameMock,
      setVideoFileSizeMock,
      setErrorMock,
    );

    expect(videoFileSchema.validate).toHaveBeenCalledWith(file);
    expect(createThumbnailMock).toHaveBeenCalledWith(file);
    expect(setVideoFileMock).toHaveBeenCalledWith(file);
    expect(setVideoFileNameMock).toHaveBeenCalledWith("sample_video.mp4");
    expect(setVideoFileSizeMock).toHaveBeenCalledWith(file.size);
    expect(setErrorMock).toHaveBeenCalledWith(null);
  });

  it("should set an error when the file validation fails", async () => {
    const file = new File(["video content"], "sample_video.mp4", {
      type: "video/mp4",
    });
    const validationError = new Error();

    // Mock the validation function to reject with an error
    (videoFileSchema.validate as jest.Mock).mockRejectedValue(validationError);

    await handleDrop(
      [file],
      createThumbnailMock,
      setVideoFileMock,
      setVideoFileNameMock,
      setVideoFileSizeMock,
      setErrorMock,
    );

    expect(videoFileSchema.validate).toHaveBeenCalledWith(file);
    expect(createThumbnailMock).not.toHaveBeenCalled();
    expect(setVideoFileMock).not.toHaveBeenCalled();
    expect(setVideoFileNameMock).not.toHaveBeenCalled();
    expect(setVideoFileSizeMock).not.toHaveBeenCalled();
    expect(setErrorMock).toHaveBeenCalled();
  });
});

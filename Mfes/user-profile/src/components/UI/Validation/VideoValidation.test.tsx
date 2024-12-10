import {
  videoFileSchema,
  FILE_SIZE_ERROR,
  VIDEO_DURATION_ERROR,
} from "./VideoValidation.ts"; // Update 'yourFileName' to the actual file name

// Mock the `URL.createObjectURL` method
global.URL.createObjectURL = jest.fn(() => "mocked-url");

// Utility function to create a mock video element with a specific duration
const createMockVideoElement = (mockDuration: number): HTMLVideoElement => {
  const videoElement = {
    duration: mockDuration,
    src: "",
    onloadedmetadata: null,
  } as unknown as HTMLVideoElement;

  // Create a mock event
  const mockEvent = new Event("loadedmetadata");

  // Simulate asynchronous behavior by using setTimeout
  setTimeout(() => {
    if (videoElement.onloadedmetadata) {
      videoElement.onloadedmetadata(mockEvent); // Pass the mock event here
    }
  }, 0);

  return videoElement;
};

// Mock the document.createElement method to return our mock video element
jest.spyOn(document, "createElement").mockImplementation((tagName: string) => {
  if (tagName === "video") {
    return createMockVideoElement(4); // Default to a duration of 4 minutes for this test
  }
  return document.createElement(tagName);
});

describe("videoFileSchema", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should pass validation for a valid video file", async () => {
    const validFile = {
      type: "video/mp4",
      size: 10 * 1024 * 1024, // 10 MB
    };

    await expect(videoFileSchema.isValid(validFile)).resolves.toBe(true);
  });

  test("should fail validation for file size greater than 20 MB", async () => {
    const largeFile = {
      type: "video/mp4",
      size: 21 * 1024 * 1024, // 21 MB
    };

    await expect(videoFileSchema.validate(largeFile)).rejects.toThrow(
      FILE_SIZE_ERROR,
    );
  });

  test("should fail validation for unsupported file type", async () => {
    const unsupportedFileType = {
      type: "video/avi",
      size: 10 * 1024 * 1024, // 10 MB
    };

    await expect(videoFileSchema.isValid(unsupportedFileType)).resolves.toBe(
      false,
    );
  });

  test("should fail validation if video duration is greater than 5 minutes", async () => {
    const longDurationFile = {
      type: "video/mp4",
      size: 10 * 1024 * 1024, // 10 MB
    };

    // Mock the video duration to be greater than 5 minutes
    jest
      .spyOn(document, "createElement")
      .mockImplementation((tagName: string) => {
        if (tagName === "video") {
          return createMockVideoElement(6); // Duration of 6 minutes
        }
        return document.createElement(tagName);
      });

    await expect(videoFileSchema.validate(longDurationFile)).rejects.toThrow(
      VIDEO_DURATION_ERROR,
    );
  });

  test("should pass validation if video duration is exactly 4 minutes", async () => {
    const fourMinuteFile = {
      type: "video/mp4",
      size: 10 * 1024 * 1024, // 10 MB
    };

    // Make sure the mock duration is set to 4 minutes
    jest
      .spyOn(document, "createElement")
      .mockImplementation((tagName: string) => {
        if (tagName === "video") {
          return createMockVideoElement(4); // Duration of 4 minutes
        }
        return document.createElement(tagName);
      });

    await expect(videoFileSchema.isValid(fourMinuteFile)).resolves.toBe(true);
  });

  test("should pass validation if video duration is less than 5 minutes", async () => {
    const shortDurationFile = {
      type: "video/mp4",
      size: 10 * 1024 * 1024, // 10 MB
    };

    // Ensure the mock duration is less than 5 minutes
    jest
      .spyOn(document, "createElement")
      .mockImplementation((tagName: string) => {
        if (tagName === "video") {
          return createMockVideoElement(4); // Duration of 4 minutes
        }
        return document.createElement(tagName);
      });

    await expect(videoFileSchema.isValid(shortDurationFile)).resolves.toBe(
      true,
    );
  });
});

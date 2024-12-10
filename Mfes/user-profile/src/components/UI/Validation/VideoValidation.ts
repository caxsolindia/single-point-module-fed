import * as yup from "yup";

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB in bytes
const SUPPORTED_FORMATS = ["video/mp4", "video/quicktime", "video/x-matroska"];
export const MAX_VIDEO_DURATION = 5; // 5 minutes
export const VIDEO_DURATION_ERROR =
  "Video duration must be less than 5 minutes";
export const FILE_SIZE_ERROR = "File size should be below 20 MB";
// Define the type for a video file
interface FileWithMetadata extends File {
  type: string;
  size: number;
}

// Schema for file validation
export const videoFileSchema = yup
  .mixed<FileWithMetadata>()
  .test("fileSize", FILE_SIZE_ERROR, (value) => {
    return value && value.size <= MAX_FILE_SIZE;
  })
  .test("fileType", "Unsupported file format", (value) => {
    return value && SUPPORTED_FORMATS.includes(value.type);
  })
  .test("videoDuration", VIDEO_DURATION_ERROR, (value) => {
    if (!value) return false;

    return new Promise((resolve) => {
      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(value);
      videoElement.onloadedmetadata = () => {
        resolve(videoElement.duration < MAX_VIDEO_DURATION);
      };
    });
  });

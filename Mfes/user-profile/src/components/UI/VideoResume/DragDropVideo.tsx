import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import IconButton from "@mui/material/IconButton";
import { Box, Typography } from "@mui/material";
import {
  DownLoadIcon,
  DeleteIcon,
  UploadIcon,
} from "../../../assets/Icon/Icon.tsx";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog.tsx";
import {
  videoFileSchema,
  MAX_VIDEO_DURATION,
  VIDEO_DURATION_ERROR,
} from "../Validation/VideoValidation.ts";
import {
  DELETE_VIDEOFILE_CONFIRMATION,
  DELETE_VIDEOFILE_MESSAGE,
} from "./messages.ts";

export interface ChildMethods {
  childMethod: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  dropzone: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    padding: "10px",
    cursor: "pointer",
    textAlign: "center",
    boxSizing: "border-box",
  },
  dashedBorder: {
    border: "2px dashed #C4C7CF",
    height: "160px",
    marginTop: "5px",
  },
  solidBorder: {
    border: "1px solid #C4C7CF",
    height: "80px",
    marginTop: "25px",
  },
  text: {
    margin: "10px 0",
    fontSize: "14px",
    color: "#333333",
  },
  boldText: {
    fontWeight: "bold",
  },
  rquiredMsg: {
    color: "#838696",
    fontWeight: "normal",
    opacity: 0.5,
    fontSize: "12px",
  },
  fileInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  fileDetails: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
  },
  thumbnail: {
    width: "50px",
    height: "50px",
    marginRight: "10px",
    objectFit: "cover",
    borderRadius: "4px",
  },
  fileName: {
    fontSize: "14px",
    textAlign: "left",
    flex: 1,
    fontWeight: 600,
  },
  fileSize: {
    fontSize: "12px",
    color: "#888888",
    marginTop: "0",
    textAlign: "left",
    position: "relative",
  },
  buttons: {
    display: "flex",
    gap: "10px",
  },
  errorText: {
    color: "red",
    marginTop: "3px",
    fontSize: "14px",
  },
  center: {
    textAlign: "center",
  },
};

// Function to handle video metadata loading
export const handleLoadedMetadata =
  (
    videoElement: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    url: string,
    setError: (error: string) => void,
  ) =>
  () => {
    // Create a local reference to the canvas element
    const localCanvas = canvas;
    const localVideoElement = videoElement;

    // Check for video duration constraints
    if (videoElement.duration >= MAX_VIDEO_DURATION) {
      setError(VIDEO_DURATION_ERROR);
      URL.revokeObjectURL(url); // Revoke the URL if the duration exceeds
      return;
    }

    // Adjust canvas size based on the video dimensions without mutating the input parameter
    const { videoWidth, videoHeight, duration } = videoElement; // Extract properties once
    localCanvas.width = videoWidth;
    localCanvas.height = videoHeight;

    // Set the video time to the midpoint to capture a thumbnail
    localVideoElement.currentTime = duration / 2;
  };

// Function to handle when the video is seeked
export const handleSeeked =
  (
    videoElement: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    url: string,
    setThumbnail: (thumbnail: string) => void,
  ) =>
  () => {
    // Get canvas drawing context
    const context = canvas.getContext("2d");
    if (context) {
      // Draw the current frame of the video on the canvas
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Generate a thumbnail from the canvas content
      const thumbnailUrl = canvas.toDataURL("image/png");
      setThumbnail(thumbnailUrl);
    }

    // Revoke the object URL to release memory
    URL.revokeObjectURL(url);
  };
// Custom hook to manage imperative handle
export const useCustomImperativeHandle = (
  ref: ForwardedRef<ChildMethods>,
  error: string | null,
  videoFile: File | null,
  handleSubmit: () => Promise<void>,
) => {
  useImperativeHandle(ref, () => ({
    async childMethod() {
      if (!error && videoFile) {
        await handleSubmit();
      }
    },
  }));
};
export const handleDrop = async (
  acceptedFiles: File[],
  createThumbnail: (file: File) => void,
  setVideoFile: (file: File) => void,
  setVideoFileName: (fileName: string) => void,
  setVideoFileSize: (fileSize: number) => void,
  setError: (error: string | null) => void,
) => {
  const file = acceptedFiles[0];

  try {
    await videoFileSchema.validate(file);
    createThumbnail(file);
    setVideoFile(file);
    setVideoFileName(file.name);
    setVideoFileSize(file.size);
    setError(null);
  } catch (validationError) {
    setError((validationError as Error).message);
  }
};
// Main Drag and Drop Video Component
const DragDropVideo = forwardRef<ChildMethods>((_, ref) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoFileName, setVideoFileName] = useState<string | null>(null);
  const [videoFileSize, setVideoFileSize] = useState<number | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const videoElement = document.createElement("video");

  const createThumbnail = useCallback(
    (file: File) => {
      const canvas = document.createElement("canvas");
      const url = URL.createObjectURL(file);
      videoElement.src = url;

      videoElement.onloadedmetadata = handleLoadedMetadata(
        videoElement,
        canvas,
        url,
        setError,
      );

      videoElement.onseeked = handleSeeked(
        videoElement,
        canvas,
        url,
        setThumbnail,
      );

      videoElement.onerror = () => {
        URL.revokeObjectURL(url);
      };
    },
    [videoElement], // Dependencies
  );

  useEffect(() => {
    const fetchVideoFile = async () => {
      try {
        const response = await fetch("/videos/sample.mp4");
        if (response.ok) {
          const fileBlob = await response.blob();
          const file = new File([fileBlob], "sample_video.mp4", {
            type: "video/mp4",
          });
          setVideoFile(file);
          setVideoFileName(file.name);
          setVideoFileSize(file.size);
          createThumbnail(file);
        } else {
          // console.error("Failed to fetch video file");
        }
      } catch (fetchError) {
        // console.error("Error fetching video file:", fetchError);
      }
    };

    fetchVideoFile();
  }, []);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      (async () => {
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a delay
        await handleDrop(
          acceptedFiles,
          createThumbnail,
          setVideoFile,
          setVideoFileName,
          setVideoFileSize,
          setError,
        );
      })();
    },
    [
      createThumbnail,
      setVideoFile,
      setVideoFileName,
      setVideoFileSize,
      setError,
    ],
  );

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoFile) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(videoFile);
      a.download = videoFileName || "downloaded_video";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    setVideoFile(null);
    setVideoFileName(null);
    setVideoFileSize(null);
    setThumbnail(null);
    setError(null);
    setOpenDeleteModal(false);
  };

  const handleSubmit = async () => {
    if (videoFile) {
      const formData = new FormData();
      formData.append("file", videoFile);
      // console.log("formData", videoFile);
      // API call to submit the form data can be done here
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [],
      "video/quicktime": [],
      "video/x-matroska": [],
    },
    multiple: false,
  });

  useCustomImperativeHandle(ref, error, videoFile, handleSubmit);

  const truncateFileName = (name: string, maxLength: number) =>
    name.length <= maxLength
      ? name
      : `${name.slice(0, maxLength - name.lastIndexOf(".") - 4)}...${name.slice(name.lastIndexOf(".") + 1)}`;

  return (
    <div style={{ position: "relative" }}>
      <Box>
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: "1rem",
            lineHeight: "1.25rem",
          }}
        >
          Jennifer, Help others recognize and <br />
          appreciate your unique skills and experiences!
        </Typography>
        {!videoFile && (
          <Typography
            variant="caption"
            display="block"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              marginTop: "5px",
            }}
          >
            Upload your video resume here
          </Typography>
        )}
      </Box>
      <div
        {...getRootProps()}
        style={{
          ...styles.dropzone,
          ...(videoFile ? styles.solidBorder : styles.dashedBorder),
        }}
      >
        <input {...getInputProps()} />
        {videoFile ? (
          <div style={styles.fileInfo}>
            <div style={styles.fileDetails}>
              {thumbnail ? (
                <img src={thumbnail} alt="Thumbnail" style={styles.thumbnail} />
              ) : (
                <VideoFileIcon style={styles.icon} />
              )}
              <div data-testid="file-name">
                {videoFileName && (
                  <>
                    <Typography variant="subtitle2" style={styles.fileName}>
                      {truncateFileName(videoFileName, 20)}
                    </Typography>
                    {videoFileSize && (
                      <Typography variant="h6" style={styles.fileSize}>
                        {`${(videoFileSize / (1024 * 1024)).toFixed(2)} MB`}
                      </Typography>
                    )}
                  </>
                )}
              </div>
            </div>
            <div style={styles.buttons}>
              <IconButton
                color="primary"
                onClick={handleDownload}
                aria-label="download"
                data-testid="download-btn"
              >
                <DownLoadIcon />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={handleDelete}
                aria-label="delete"
                sx={{ marginTop: "3px" }}
                data-testid="delete-btn"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <p style={styles.text}>
            {isDragActive ? (
              "Drop the video here ..."
            ) : (
              <Box sx={{ lineHeight: "1.25rem" }}>
                <span>
                  <UploadIcon />
                </span>
                <br />
                <span style={styles.boldText}>
                  click or drag and drop to upload a video
                </span>
                <br />
                <span style={styles.rquiredMsg}>MP4 (Maximum size 20 MB)</span>
              </Box>
            )}
          </p>
        )}
      </div>
      {error && <div style={styles.errorText}>{error}</div>}

      <DeleteConfirmationDialog
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={confirmDelete}
        message={DELETE_VIDEOFILE_MESSAGE}
        confirmMessage={DELETE_VIDEOFILE_CONFIRMATION}
      />
    </div>
  );
});

export default DragDropVideo;

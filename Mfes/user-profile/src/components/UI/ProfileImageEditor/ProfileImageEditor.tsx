import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
} from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Cropper from "react-cropper";
import CropperJS from "cropperjs";
import "cropperjs/dist/cropper.css";

import {
  AdjustIcon,
  CropIcon,
  DeleteIcon,
  FlipHIcon,
  PictureIcon,
  UndoIcon,
} from "../../../assets/Icon/Icon.tsx";
import { fileValidationSchema } from "../Validation/imagevalidation.ts";
import DeleteConfirmationModal from "../VideoResume/DeleteConfirmationDialog.tsx";
import SliderControl from "./EditPanel.tsx";

export interface ChildImageMethods {
  childMethod: () => void;
  useCameraFun: () => void;
  captureImageFun: () => void;
  stopCameraFun: () => void;
  cancelCropFun: () => void;
  handleCropFun: () => void;
}

export const handleImageUpload = (
  uploadedFile: File,
  setImage: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  setFileUploaded: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageDroppedFlag: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result as string);
    setSelectedFile(uploadedFile);
    setFileUploaded(true);
    setIsImageDroppedFlag(true);
  };
  reader.readAsDataURL(uploadedFile);
};

export const onDrop = (
  acceptedFiles: File[],
  setImage: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  setFileUploaded: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageDroppedFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const droppedFile = acceptedFiles[0];
  fileValidationSchema
    .validate({ file: droppedFile })
    .then(() => {
      setError(null);
      handleImageUpload(
        droppedFile,
        setImage,
        setSelectedFile,
        setFileUploaded,
        setIsImageDroppedFlag,
      );
    })
    .catch((validationError) => {
      setError(validationError.message);
      setImage(null);
      setSelectedFile(null);
    });
};

export function applyFilters({
  canvasRef,
  image,
  zoom,
  brightness,
  contrast,
  angle,
  flipDirection,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  image: string | null;
  zoom: number;
  brightness: number;
  contrast: number;
  angle: number;
  flipDirection: "none" | "horizontal";
}) {
  const canvas = canvasRef.current;
  if (!canvas || !image) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.src = image;
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    const { width, height } = canvas;
    const scaledWidth = width * zoom;
    const scaledHeight = height * zoom;

    ctx.clearRect(0, 0, width, height);
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    if (flipDirection === "horizontal") ctx.scale(-1, 1);
    ctx.translate(-width / 2, -height / 2);
    ctx.drawImage(
      img,
      (width - scaledWidth) / 2,
      (height - scaledHeight) / 2,
      scaledWidth,
      scaledHeight,
    );
    ctx.restore();
  };
}

export const captureImage = (
  setImage: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedFile: (file: File | null) => void,
  stopCamera: () => void,
  setIsCameraUsedFlag: (flag: boolean) => void,
  dataURLtoFile: (dataUrl: string, filename: string) => File,
): void => {
  const video = document.getElementById("camera-stream") as HTMLVideoElement;

  if (video) {
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Draw the video frame to the canvas
      ctx.drawImage(video, 0, 0);

      // Convert the canvas content to a data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Set the image data URL and file
      setImage(dataUrl);
      setSelectedFile(dataURLtoFile(dataUrl, "captured-image.png"));

      // Stop the camera and update the state flag
      stopCamera();
      setIsCameraUsedFlag(false);
    }
  }
};

export const handleSubmit = (
  selectedFile: File | null,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  if (selectedFile && canvasRef.current) {
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const updatedFile = new File([blob], selectedFile.name, {
          type: selectedFile.type,
        });
        const formData = new FormData();
        formData.append("image", updatedFile);

        fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Upload successful:", data);
          })
          .catch((error) => {
            console.error("Upload failed:", error);
          });
      }
    }, selectedFile.type);
  }
};

export const dataURLtoFile = (dataurl: string, filename: string): File => {
  const [mime, b64] = dataurl.split(",");
  return new File(
    [Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))],
    filename,
    {
      type: mime.split(":")[1].split(";")[0],
    },
  );
};

export const startCamera = async (
  setCameraStream: React.Dispatch<React.SetStateAction<MediaStream | null>>,
  setIsCameraMode: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCameraUsedFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageDroppedFlag: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
    });
    setCameraStream(stream);
    setIsCameraMode(true);
    setIsCameraUsedFlag(true);
    setIsImageDroppedFlag(true);
  } catch (err) {
    console.error("Error accessing the camera:", err);
  }
};

export const confirmDelete = (
  setImage: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  setFileUploaded: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setBrightness: React.Dispatch<React.SetStateAction<number>>,
  setContrast: React.Dispatch<React.SetStateAction<number>>,
  setZoom: React.Dispatch<React.SetStateAction<number>>,
  setAngle: React.Dispatch<React.SetStateAction<number>>,
  setUndoStack: React.Dispatch<
    React.SetStateAction<
      Array<{
        image: string | null;
        zoom: number;
        brightness: number;
        contrast: number;
        angle: number;
        flipDirection: "none" | "horizontal";
      }>
    >
  >,
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCameraUsedFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setIsImageDroppedFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setIsCropMode: React.Dispatch<React.SetStateAction<boolean>>,
  setCropModeFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setFlipDirection: React.Dispatch<React.SetStateAction<"none" | "horizontal">>,
) => {
  setImage(null);
  setSelectedFile(null);
  setFileUploaded(false);
  setError(null);
  setBrightness(100);
  setContrast(100);
  setZoom(1);
  setAngle(0);
  setUndoStack([]);
  setOpenDeleteModal(false);
  setIsCameraUsedFlag(false);
  setIsImageDroppedFlag(false);
  setIsCropMode(false);
  setCropModeFlag(false);
  setFlipDirection("none");
};

export const handleCrop = (
  cropper: CropperJS | null,
  setImage: React.Dispatch<React.SetStateAction<string | null>>,
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
  setIsCropMode: React.Dispatch<React.SetStateAction<boolean>>,
  setCropModeFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setFlipDirection: React.Dispatch<React.SetStateAction<"none" | "horizontal">>,
) => {
  if (cropper) {
    const croppedImageUrl = cropper.getCroppedCanvas().toDataURL();
    setImage(croppedImageUrl);
    setSelectedFile(dataURLtoFile(croppedImageUrl, "cropped-image.png"));
    setIsCropMode(false);
    setCropModeFlag(false);
    setFlipDirection("none");
  }
};

export const onCancel = (
  setIsCropMode: React.Dispatch<React.SetStateAction<boolean>>,
  setCropModeFlag: React.Dispatch<React.SetStateAction<boolean>>,
  setFlipDirection: React.Dispatch<React.SetStateAction<"none" | "horizontal">>,
) => {
  setIsCropMode(false);
  setCropModeFlag(false);
  setFlipDirection("none");
};

type FlipDirection = "none" | "horizontal";

export const cycleFlipDirection = (
  setFlipDirection: React.Dispatch<React.SetStateAction<FlipDirection>>,
  saveState: () => void,
) => {
  saveState();
  setFlipDirection((prev) => (prev === "none" ? "horizontal" : "none"));
};

// Define the types used in the function
export interface UndoState {
  image: string | null;
  zoom: number;
  brightness: number;
  contrast: number;
  angle: number;
  flipDirection: "none" | "horizontal";
}

export const handleUndo = (
  setUndoStack: React.Dispatch<React.SetStateAction<UndoState[]>>,
  setImage: React.Dispatch<React.SetStateAction<string | null>>,
  setZoom: React.Dispatch<React.SetStateAction<number>>,
  setBrightness: React.Dispatch<React.SetStateAction<number>>,
  setContrast: React.Dispatch<React.SetStateAction<number>>,
  setAngle: React.Dispatch<React.SetStateAction<number>>,
  setFlipDirection: React.Dispatch<React.SetStateAction<"none" | "horizontal">>,
) => {
  // Perform the undo operation by restoring the last state from the undo stack
  setUndoStack((prevStack) => {
    const [lastState, ...rest] = prevStack;

    if (lastState) {
      // Restore the state based on the last saved undo state
      setImage(lastState.image);
      setZoom(lastState.zoom);
      setBrightness(lastState.brightness);
      setContrast(lastState.contrast);
      setAngle(lastState.angle);
      setFlipDirection(lastState.flipDirection);
    }

    // Return the remaining stack after the undo
    return rest;
  });
};

// Define the function outside the component
export function handleCropIconClick(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  setImage: React.Dispatch<React.SetStateAction<string | null>>,
  setIsCropMode: React.Dispatch<React.SetStateAction<boolean>>,
  setCropModeFlag: React.Dispatch<React.SetStateAction<boolean>>,
  zoom: number,
  brightness: number,
  contrast: number,
  angle: number,
  flipDirection: "none" | "horizontal",
) {
  const canvas = canvasRef.current;
  if (canvas) {
    const updatedImageDataURL = canvas.toDataURL("image/png");
    setImage(updatedImageDataURL);
    applyFilters({
      canvasRef,
      image: updatedImageDataURL,
      zoom,
      brightness,
      contrast,
      angle,
      flipDirection,
    });
  }
  setIsCropMode(true);
  setCropModeFlag(true);
}

const ProfileImageEditor = forwardRef<
  ChildImageMethods,
  {
    setCropModeFlag: React.Dispatch<React.SetStateAction<boolean>>;
    setIsImageDroppedFlag: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCameraUsedFlag: React.Dispatch<React.SetStateAction<boolean>>;
  }
>(({ setIsImageDroppedFlag, setIsCameraUsedFlag, setCropModeFlag }, ref) => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cropper, setCropper] = useState<CropperJS | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [zoom, setZoom] = useState(1);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [angle, setAngle] = useState(0);
  const [isCropMode, setIsCropMode] = useState(false);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [undoStack, setUndoStack] = useState<
    Array<{
      image: string | null;
      zoom: number;
      brightness: number;
      contrast: number;
      angle: number;
      flipDirection: "none" | "horizontal";
    }>
  >([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"none" | "horizontal">(
    "none",
  );

  const styles: { [key: string]: React.CSSProperties } = {
    uploadedImage: {
      marginTop: "0.5rem",
      maxWidth: "90%",
      maxHeight: "100%",
      borderRadius: "8px",
      width: "512px",
      height: "325px",
      objectFit: "cover",
    },
    cropperDragBox: {
      borderRadius: "8px",
      height: "60%",
      width: "100%",
    },
    text: {
      margin: "10px",
      fontSize: "13px",
      color: "#333333",
    },
    boldText: {
      fontWeight: "700",
    },
  };

  useEffect(() => {
    const fetchImageFile = async () => {
      try {
        const response = await fetch("/images/sample-image.jpg");
        if (response.ok) {
          const fileBlob = await response.blob();
          const file = new File([fileBlob], "sample_image.jpg", {
            type: "image/jpeg",
          });
          setImage(URL.createObjectURL(file));
          setSelectedFile(file);
          setFileUploaded(true);
          setIsImageDroppedFlag(true);
        }
      } catch (fetchError) {
        console.error("Error fetching image file:", error);
      }
    };

    fetchImageFile();
  }, [setIsImageDroppedFlag]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onDrop(
        acceptedFiles,
        setImage,
        setSelectedFile,
        setFileUploaded,
        setIsImageDroppedFlag,
        setError,
      );
    },
    accept: { "image/*": [] },
    multiple: false,
    disabled: fileUploaded,
  });

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file)
      handleImageUpload(
        file,
        setImage,
        setSelectedFile,
        setFileUploaded,
        setIsImageDroppedFlag,
      );
  };

  const onSubmit = () => {
    handleSubmit(selectedFile, canvasRef);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDeleteModal(true);
  };

  const saveState = () => {
    setUndoStack((prevStack) => [
      { image, zoom, brightness, contrast, angle, flipDirection },
      ...prevStack,
    ]);
  };

  const stopCamera = () => {
    cameraStream?.getTracks().forEach((track) => track.stop());
    setCameraStream(null);
    setIsCameraMode(false);
  };

  const handleCapture = () => {
    captureImage(
      setImage,
      setSelectedFile,
      stopCamera,
      setIsCameraUsedFlag,
      dataURLtoFile,
    );
  };

  useImperativeHandle(ref, () => ({
    useCameraFun: () =>
      startCamera(
        setCameraStream,
        setIsCameraMode,
        setIsCameraUsedFlag,
        setIsImageDroppedFlag,
      ),
    captureImageFun: handleCapture,
    stopCameraFun: stopCamera,
    cancelCropFun: () =>
      onCancel(setIsCropMode, setCropModeFlag, setFlipDirection),
    handleCropFun: () =>
      handleCrop(
        cropper,
        setImage,
        setSelectedFile,
        setIsCropMode,
        setCropModeFlag,
        setFlipDirection,
      ),
    childMethod: () => !error && onSubmit(),
  }));

  useEffect(() => {
    applyFilters({
      canvasRef,
      image,
      zoom,
      brightness,
      contrast,
      angle,
      flipDirection,
    });
  }, [
    canvasRef,
    image,
    zoom,
    brightness,
    contrast,
    angle,
    flipDirection,
    isCropMode,
  ]);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (_event: Event, value: number | number[]) => {
      if (typeof value === "number") {
        saveState();
        setter(value);
      }
    };

  return (
    <Box>
      {!image && !isCameraMode ? (
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: "1rem",
              lineHeight: "1.25rem",
            }}
          >
            Jennifer, Help others to recognize you!
          </Typography>
          <Typography
            variant="caption"
            display="block"
            sx={{
              textAlign: "center",
              fontWeight: 600,
              marginTop: "5px",
            }}
          >
            Upload your image here
          </Typography>
        </Box>
      ) : null}
      <Box
        data-testid="file-input"
        {...(!image && !isCameraMode ? getRootProps() : {})}
        sx={{
          border: image || isCameraMode ? "none" : "2px dashed #cccccc",
          padding: image || isCameraMode ? "none" : "20px 0px",
          textAlign: "center",
          cursor: fileUploaded || isCameraMode ? "default" : "pointer",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        {!image && !isCameraMode && <input {...getInputProps()} />}
        {isCameraMode && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <video
              id="camera-stream"
              autoPlay
              playsInline
              style={{
                width: "720px",
                maxWidth: "100%",
                height: "290px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              ref={(videoRef) => {
                if (videoRef) {
                  const element = videoRef;
                  if (cameraStream) {
                    element.srcObject = cameraStream;
                  }
                }
              }}
            >
              <track
                kind="captions"
                src="captions.vtt"
                srcLang="en"
                label="English"
              />
            </video>
          </Box>
        )}
        {image && (
          <Grid
            container
            sx={{
              height: "280px",
              justifyContent: isCropMode ? "center" : "normal",
            }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              sx={{ textAlign: "center", height: "450px" }}
            >
              {isCropMode ? (
                <Cropper
                  style={styles.cropperDragBox}
                  initialAspectRatio={1}
                  aspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  autoCropArea={1}
                  responsive={true}
                  background={true}
                  onInitialized={(instance) => setCropper(instance)}
                  guides={false}
                />
              ) : (
                <canvas ref={canvasRef} style={styles.uploadedImage} />
              )}
              <Box>
                <Typography variant="caption" color="#838696">
                  Select a new photo if you want to update the current one.
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={6}>
                  {image && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 2,
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() =>
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
                          )
                        }
                      >
                        <PictureIcon height="18" width="18" />
                      </IconButton>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          mt: "2px",
                        }}
                        onClick={() =>
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
                          )
                        }
                      >
                        Upload Photo
                      </Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={6} sm={6}>
                  {image && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 2,
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={handleDelete}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Typography
                        variant="caption"
                        display="block"
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          mt: "2px",
                        }}
                        onClick={handleDelete}
                      >
                        Delete Photo
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>

            {!isCropMode && (
              <Grid
                item
                xs={12}
                sm={6}
                md={5.5}
                sx={{
                  ml: { xs: 0, md: 2 },
                  position: "relative",
                  pl: { xs: 0, md: "20px" },
                  mt: { xs: 2, md: 0 },
                  "&::before": {
                    content: '""',
                    display: { xs: "none", md: "block" },
                    position: "absolute",
                    top: -40,
                    bottom: 8,
                    left: 0,
                    width: "1px",
                    backgroundColor: "#C4C7CF",
                    marginLeft: "5px",
                    opacity: 1,
                  },
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Edit Photo
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                      <IconButton
                        sx={{ left: "5px", top: "-5px" }}
                        onClick={() =>
                          handleUndo(
                            setUndoStack,
                            setImage,
                            setZoom,
                            setBrightness,
                            setContrast,
                            setAngle,
                            setFlipDirection,
                          )
                        }
                        disabled={undoStack.length === 0 || isCropMode}
                      >
                        <UndoIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
                <hr />
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "start",
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          handleCropIconClick(
                            canvasRef,
                            setImage,
                            setIsCropMode,
                            setCropModeFlag,
                            zoom,
                            brightness,
                            contrast,
                            angle,
                            flipDirection,
                          )
                        }
                      >
                        <CropIcon />
                      </IconButton>
                      <Typography
                        variant="subtitle2"
                        textAlign="start"
                        sx={{
                          pl: 1,
                          fontSize: "0.8rem!important",
                          fontWeight: 700,
                        }}
                      >
                        Crop
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <Box sx={{ display: "flex", justifyContent: "end" }}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          cycleFlipDirection(setFlipDirection, saveState)
                        }
                        sx={{
                          minWidth: "0px",
                          padding: "5px",
                          border: "1px solid #C4C7CF",
                        }}
                      >
                        <FlipHIcon />
                      </Button>
                    </Box>
                  </Grid>
                </Grid>

                <>
                  <SliderControl
                    id="zoom-slider"
                    label="Zoom"
                    value={zoom}
                    onChange={handleChange(setZoom)}
                    min={0}
                    max={3}
                  />
                  <SliderControl
                    id="angle-slider"
                    label="Straighten"
                    value={angle}
                    onChange={handleChange(setAngle)}
                    min={-180}
                    max={180}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "start",
                      mt: 5,
                    }}
                  >
                    <AdjustIcon />
                    <Typography
                      variant="subtitle2"
                      textAlign="start"
                      sx={{
                        pl: 1,
                        fontSize: "0.8rem!important",
                        fontWeight: 700,
                      }}
                    >
                      Adjust
                    </Typography>
                  </Box>
                  <SliderControl
                    id="brightness-slider"
                    label="Brightness"
                    value={brightness}
                    onChange={handleChange(setBrightness)}
                    min={0}
                    max={200}
                  />
                  <SliderControl
                    id="contrast-slider"
                    label="Contrast"
                    value={contrast}
                    onChange={handleChange(setContrast)}
                    min={0}
                    max={200}
                  />
                </>
              </Grid>
            )}
          </Grid>
        )}

        {!isCameraMode && !image && (
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <p style={styles.text}>
              <span>
                <PictureIcon />
              </span>
              <br />
              <span style={styles.boldText}>
                Click or drag and drop to upload an image
              </span>
              <br />
              <Typography
                variant="caption"
                fontWeight="400"
                color="textSecondary"
              >
                JPEG, PNG (Up to 2 MB)
              </Typography>
            </p>
          </Box>
        )}
      </Box>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: "none" }}
      />
      <Box sx={{ display: "flex", textAlign: "left", marginTop: "5px" }}>
        {error && (
          <Typography variant="caption" color="error">
            {error}
          </Typography>
        )}
      </Box>
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={() =>
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
          )
        }
        message="Are you sure you want to delete the photo?"
        confirmMessage="Confirming will permanently delete the photo from your profile."
      />
    </Box>
  );
});

export default ProfileImageEditor;

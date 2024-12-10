import React, { MutableRefObject } from "react";
import { ChildImageMethods } from "../../components/UI/ProfileImageEditor/ProfileImageEditor.tsx";
import {
  Errors,
  validateProfile,
} from "../../components/UI/Validation/ProfileSummaryValidation.ts";
import { ChildMethods } from "../../components/UI/VideoResume/DragDropVideo.tsx";

export const handleUploadVideoResume = (
  childvideoRef: MutableRefObject<ChildMethods | null>,
) => {
  if (childvideoRef.current) {
    childvideoRef.current.childMethod();
  }
};

export const uploadImage = (
  childImageRef: MutableRefObject<ChildImageMethods | null>,
) => {
  if (childImageRef.current) {
    childImageRef.current.childMethod();
  }
};

export const usecamera = (
  childImageRef: MutableRefObject<ChildImageMethods | null>,
) => {
  if (childImageRef.current) {
    childImageRef.current.useCameraFun();
  }
};

export const capturePhoto = (
  childImageRef: MutableRefObject<ChildImageMethods | null>,
) => {
  if (childImageRef.current) {
    childImageRef.current.captureImageFun();
  }
};

export const stopCamera = (
  childImageRef: MutableRefObject<ChildImageMethods | null>,
  setIsImageDroppedFlag: (flag: boolean) => void,
  setIsCameraUsedFlag: (flag: boolean) => void,
  setCropModeFlag: (flag: boolean) => void,
  closeModal: () => void,
) => {
  if (childImageRef.current) {
    childImageRef.current.stopCameraFun();
  }
  setIsImageDroppedFlag(false);
  setIsCameraUsedFlag(false);
  setCropModeFlag(false);
  closeModal();
};

export const cancelCrop = (
  childImageRef: MutableRefObject<ChildImageMethods | null>,
) => {
  if (childImageRef.current) {
    childImageRef.current.cancelCropFun();
  }
};

export const handleCrop = (
  childImageRef: MutableRefObject<ChildImageMethods | null>,
) => {
  if (childImageRef.current) {
    childImageRef.current.handleCropFun();
  }
};

export const handleEditClick = (
  editCardId: string,
  setTempSummary: (summary: string | undefined) => void,
  profileSummary: string | undefined,
  setEditMode: (cardId: string, mode: boolean) => void,
) => {
  setTempSummary(profileSummary);
  setEditMode(editCardId, true); // Use the renamed parameter here
};

export const handleCancelClick = (
  editCardId: string,
  setEditMode: (cardId: string, mode: boolean) => void,
) => {
  setEditMode(editCardId, false);
};

export const handleSaveClick = async (
  editCardId: string,
  tempSummary: string | undefined,
  setProfileSummary: (summary: string | undefined) => void,
  setEditMode: (cardId: string, mode: boolean) => void,
  setErrors: (errors: Errors) => void,
) => {
  const validationErrors = await validateProfile(tempSummary);
  if (Object.keys(validationErrors).length === 0) {
    setProfileSummary(tempSummary);
    setEditMode(editCardId, false);
    setErrors({});
  } else {
    setErrors(validationErrors);
  }
};

export const handleProjectEditClick = (openDrawer: (id: string) => void) => {
  openDrawer("06");
};

// Define handleCertificationEditClick outside of the Profile component
export const handleCertificationEditClick = (
  openDrawer: (id: string) => void,
) => {
  openDrawer("08");
};

// Define handleExperienceEditClick outside of the Profile component
export const handleExperienceEditClick = (openDrawer: (id: string) => void) => {
  openDrawer("04");
};

interface SummaryResponse {
  __typename?: string;
  description?: string | null;
}

export const getDescription = (
  summary: Array<SummaryResponse | null> | null | undefined,
): string | undefined => {
  if (summary && summary.length > 0) {
    const descriptions = summary
      .map((item) => item?.description)
      .filter((desc): desc is string => !!desc);
    return descriptions.length > 0 ? descriptions[0] : undefined;
  }
  return undefined;
};

export const getButtonText = (
  cropModeFlag: boolean,
  imageDroppedFlag: boolean,
) => {
  if (cropModeFlag || imageDroppedFlag) return "Cancel";
  return "Use Camera";
};

export const getButtonAction = (
  cropModeFlag: boolean,
  imageDroppedFlag: boolean,
  handleCancelCrop: () => void,
  handleStopCamera: () => void,
  handleUseCamera: () => void,
) => {
  if (cropModeFlag) return handleCancelCrop;
  if (imageDroppedFlag) return handleStopCamera;
  return handleUseCamera;
};

export const getSecondButtonText = (
  cropModeFlag: boolean,
  cameraUsedFlag: boolean,
) => {
  if (cropModeFlag) return "Apply Crop";
  if (!cameraUsedFlag) return "Submit Photo";
  return "Take Photo";
};

export const getSecondButtonAction = (
  cropModeFlag: boolean,
  cameraUsedFlag: boolean,
  handleApplyCrop: () => void,
  handleUploadImage: () => void,
  handleCapturePhoto: () => void,
) => {
  if (cropModeFlag) return handleApplyCrop;
  if (!cameraUsedFlag) return handleUploadImage;
  return handleCapturePhoto;
};

export const getProfilePictureSubtitle = (
  isCameraUsedFlag: boolean,
  isImageDroppedFlag: boolean,
  isCropModeFlag: boolean,
) => {
  if (isCameraUsedFlag) {
    return "Click an image that will appear everywhere in our app";
  }
  if (!isImageDroppedFlag) {
    return "Choose an image that will appear everywhere in our app";
  }
  if (isCropModeFlag || isImageDroppedFlag) {
    return "Edit the image as per your need.";
  }
  return "";
};

export const getProfilePictureHeight = (
  isCameraUsedFlag: boolean,
  isImageDroppedFlag: boolean,
) => {
  if (isCameraUsedFlag) {
    return "360px";
  }
  if (isImageDroppedFlag) {
    return "416px";
  }
  return ""; // Default case if neither condition is met
};

export const returnSolution = (
  editModes: boolean,
  firstComponent: React.JSX.Element,
  secondComponent: React.JSX.Element,
) => {
  return editModes ? firstComponent : secondComponent;
};

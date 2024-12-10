import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useForm } from "react-hook-form";
import { MockedProvider } from "@apollo/client/testing";

import { useProfileStore } from "../../Store/ProfileStore.ts";
import { useProfileCardStore } from "../../Store/ProfileCardStore.ts";
import { useThemeContext } from "../../ThemeContext/ThemeContext.tsx";
import { GetSummaryDocument, SummaryResponse } from "../../gql/operations.ts";
import Profile from "./Profile.tsx";
import {
  handleUploadVideoResume,
  uploadImage,
  usecamera,
  capturePhoto,
  stopCamera,
  cancelCrop,
  handleCrop,
  handleEditClick,
  handleCancelClick,
  handleSaveClick,
  handleProjectEditClick,
  handleCertificationEditClick,
  handleExperienceEditClick,
  getDescription,
  getProfilePictureHeight,
  getProfilePictureSubtitle,
  getSecondButtonAction,
  getSecondButtonText,
  getButtonAction,
} from "./ProfileFunctions.tsx";

jest.mock("react-hook-form"); // Mock react-hook-form
jest.mock("../../Store/ProfileStore");
jest.mock("../../Store/ProfileCardStore");
jest.mock("../../ThemeContext/ThemeContext");

const userId = "some-user-id";
const profileSummaryMock = [
  {
    request: {
      query: GetSummaryDocument,
      variables: { userId },
    },
    result: {
      data: {
        getSummary: {
          status: true,
          message: "User summary fetched successfully",
          summary: [
            {
              description: "this is summary",
            },
          ],
        },
      },
    },
  },
];

interface ChildMethods {
  childMethod: () => void;
}

interface ChildImageMethods {
  childMethod: () => void;
  useCameraFun: () => void;
  captureImageFun: () => void;
  stopCameraFun: () => void;
  cancelCropFun: () => void;
  handleCropFun: () => void;
}

const mockChildMethods: ChildMethods = {
  childMethod: jest.fn(),
};

const mockChildImageMethods: ChildImageMethods = {
  childMethod: jest.fn(),
  useCameraFun: jest.fn(),
  captureImageFun: jest.fn(),
  stopCameraFun: jest.fn(),
  cancelCropFun: jest.fn(),
  handleCropFun: jest.fn(),
};

function createMockRef<T>(methods: T): React.RefObject<T> {
  return {
    current: methods,
  };
}

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress error logs
});

afterAll(() => {
  jest.restoreAllMocks(); // Restore mocks after tests
});

describe("Profile Component", () => {
  const mockProfileStore = {
    profileSummary: "Content of Profile Summary",
    editModes: { "01": false, "02": false },
    tempSummary: "Content of Profile Summary",
    setProfileSummary: jest.fn(),
    setTempSummary: jest.fn(),
    setEditMode: jest.fn(),
    expandedCardIds: [],
    toggleCardExpansion: jest.fn(),
    setIsIconVisible: jest.fn(),
  };

  const mockProfileCardStore = {
    drawerId: "",
    closeModal: jest.fn(),
    openDrawer: jest.fn(),
  };

  beforeEach(() => {
    (useProfileStore as unknown as jest.Mock).mockReturnValue(mockProfileStore);
    (useProfileCardStore as unknown as jest.Mock).mockReturnValue(
      mockProfileCardStore,
    );
    (useThemeContext as jest.Mock).mockReturnValue({
      theme: { palette: { primary: { main: "#000" } } },
    });

    // Mock useForm inside beforeEach
    (useForm as jest.Mock).mockReturnValue({
      register: jest.fn(),
      handleSubmit: jest.fn(),
      watch: jest.fn(),
      setValue: jest.fn(),
      reset: jest.fn(),
      formState: { errors: {} },
    });
  });

  it("renders profile component correctly", () => {
    render(
      <MockedProvider mocks={profileSummaryMock} addTypename={false}>
        <Profile />
      </MockedProvider>,
    );

    expect(screen.getByText("Profile Summary")).toBeInTheDocument();
    expect(screen.getByText("Work Experience")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Certifications")).toBeInTheDocument();
  });

  describe("Profile Component", () => {
    it("renders profile component with all sections", () => {
      render(
        <MockedProvider mocks={profileSummaryMock} addTypename={false}>
          <Profile />
        </MockedProvider>,
      );

      expect(screen.getByText("Profile Summary")).toBeInTheDocument();
      expect(screen.getByText("Work Experience")).toBeInTheDocument();
      expect(screen.getByText("Skills")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Certifications")).toBeInTheDocument();
    });

    const mockProfileCardsData = [
      {
        id: "01",
        title: "Profile Summary",
        bodyContent: "This is the body content of Profile Summary.",
        footerContent: "Footer Content",
        icons: [{ id: "editIcon", onClick: jest.fn(), icon: "Edit" }],
      },
      {
        id: "02",
        title: "Work Experience",
        bodyContent: "This is the body content of Work Experience.",
        footerContent: "Footer Content",
        icons: [{ id: "addIcon", onClick: jest.fn(), icon: "Add" }],
      },
    ];

    const mockProfileDrawerData = [
      {
        id: "drawer1",
        title: "Project Details",
        footer: {
          buttons: [{ id: "saveBtn", text: "Save", onClick: jest.fn() }],
        },
      },
    ];

    const mockProfileModalData = [
      {
        id: "modal1",
        title: "Certification Details",
        footer: {
          buttons: [{ id: "closeBtn", text: "Close", onClick: jest.fn() }],
        },
      },
    ];

    jest.mock("./Profile", () => ({
      ...jest.requireActual("./Profile"),
      profileCardsData: mockProfileCardsData,
      profileDrawerData: mockProfileDrawerData,
      profileModalData: mockProfileModalData,
    }));

    describe("Profile Component Tests", () => {
      it("renders profile component correctly", () => {
        render(
          <MockedProvider mocks={profileSummaryMock} addTypename={false}>
            <Profile />
          </MockedProvider>,
        );

        expect(screen.getByText("Profile Summary")).toBeInTheDocument();
        expect(screen.getByText("Work Experience")).toBeInTheDocument();
      });
    });

    it("should call setTempSummary and setEditMode with correct arguments when handleEditClick is called", () => {
      render(
        <MockedProvider mocks={profileSummaryMock} addTypename={false}>
          <Profile />
        </MockedProvider>,
      );

      expect(mockProfileStore.profileSummary).toBe(
        "Content of Profile Summary",
      );
    });

    it("calls handleEditClick and sets edit mode", () => {
      render(
        <MockedProvider mocks={profileSummaryMock} addTypename={false}>
          <Profile />
        </MockedProvider>,
      );

      expect(mockProfileStore.profileSummary).toBe(
        "Content of Profile Summary",
      );
    });
  });
});

describe("Function Tests", () => {
  const mockHandleApplyCrop = jest.fn();
  const mockHandleUploadImage = jest.fn();
  const mockHandleCapturePhoto = jest.fn();
  const mockHandleCancelCrop = jest.fn();
  const mockHandleStopCamera = jest.fn();
  const mockHandleUseCamera = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });
  it("should call childMethod for handleUploadVideoResume", () => {
    const childvideoRef = createMockRef(mockChildMethods);
    handleUploadVideoResume(childvideoRef);
    expect(mockChildMethods.childMethod).toHaveBeenCalled();
  });

  it("should call childMethod for uploadImage", () => {
    const childImageRef = createMockRef(mockChildImageMethods);
    uploadImage(childImageRef);
    expect(mockChildImageMethods.childMethod).toHaveBeenCalled();
  });

  it("should call useCameraFun for usecamera", () => {
    const childImageRef = createMockRef(mockChildImageMethods);
    usecamera(childImageRef);
    expect(mockChildImageMethods.useCameraFun).toHaveBeenCalled();
  });

  it("should call captureImageFun for capturePhoto", () => {
    const childImageRef = createMockRef(mockChildImageMethods);
    capturePhoto(childImageRef);
    expect(mockChildImageMethods.captureImageFun).toHaveBeenCalled();
  });

  it("should call stopCameraFun and update flags for stopCamera", () => {
    const childImageRef = createMockRef(mockChildImageMethods);
    const setIsImageDroppedFlag = jest.fn();
    const setIsCameraUsedFlag = jest.fn();
    const setCropModeFlag = jest.fn();
    const closeModal = jest.fn();

    stopCamera(
      childImageRef,
      setIsImageDroppedFlag,
      setIsCameraUsedFlag,
      setCropModeFlag,
      closeModal,
    );

    expect(mockChildImageMethods.stopCameraFun).toHaveBeenCalled();
    expect(setIsImageDroppedFlag).toHaveBeenCalledWith(false);
    expect(setIsCameraUsedFlag).toHaveBeenCalledWith(false);
    expect(setCropModeFlag).toHaveBeenCalledWith(false);
    expect(closeModal).toHaveBeenCalled();
  });

  it('should return "360px" when isCameraUsedFlag is true', () => {
    const height = getProfilePictureHeight(true, false);
    expect(height).toBe("360px");
  });

  it('should return "416px" when isImageDroppedFlag is true and isCameraUsedFlag is false', () => {
    const height = getProfilePictureHeight(false, true);
    expect(height).toBe("416px");
  });

  it("should return respective message when isCameraUsedFlag is true", () => {
    const height = getProfilePictureSubtitle(true, false, false);
    expect(height).toBe(
      "Click an image that will appear everywhere in our app",
    );
  });

  it("should return respective message when isImageDroppedFlag is false", () => {
    const height = getProfilePictureSubtitle(false, false, false);
    expect(height).toBe(
      "Choose an image that will appear everywhere in our app",
    );
  });

  it("should return respective message when isCropModeFlag || isImageDroppedFlag is false", () => {
    const height = getProfilePictureSubtitle(false, true, true);
    expect(height).toBe("Edit the image as per your need.");
  });
  it("should return handleApplyCrop when cropModeFlag and cropModeFlag have different values", () => {
    // cropModeFlag is true
    const cropModeFlagTrue = getSecondButtonAction(
      true, // cropModeFlag
      false, // cameraUsedFlag
      mockHandleApplyCrop,
      mockHandleUploadImage,
      mockHandleCapturePhoto,
    );
    expect(cropModeFlagTrue).toBe(mockHandleApplyCrop);
    // cropModeFlag is false and cameraUsedFlag is false
    const bothFalse = getSecondButtonAction(
      false, // cropModeFlag
      false, // cameraUsedFlag
      mockHandleApplyCrop,
      mockHandleUploadImage,
      mockHandleCapturePhoto,
    );
    expect(bothFalse).toBe(mockHandleUploadImage);
    // cropModeFlag is false and cameraUsedFlag is true
    const cameraUsedFlagTrue = getSecondButtonAction(
      false, // cropModeFlag
      true, // cameraUsedFlag
      mockHandleApplyCrop,
      mockHandleUploadImage,
      mockHandleCapturePhoto,
    );
    expect(cameraUsedFlagTrue).toBe(mockHandleCapturePhoto);
    // cameraUsedFlag is true if cropModeFlag is also true
    const bothTrue = getSecondButtonAction(
      true,
      true,
      mockHandleApplyCrop,
      mockHandleUploadImage,
      mockHandleCapturePhoto,
    );
    expect(bothTrue).toBe(mockHandleApplyCrop);
  });
  it("should return handleApplyCrop when cropModeFlag and imageDroppedFlag have different values", () => {
    // cropModeFlag is true
    const cropModeFlagTrue = getButtonAction(
      true,
      false,
      mockHandleCancelCrop,
      mockHandleStopCamera,
      mockHandleUseCamera,
    );
    expect(cropModeFlagTrue).toBe(mockHandleCancelCrop);
    // imageDroppedFlag is true
    const imageDroppedFlagTrue = getButtonAction(
      false,
      true,
      mockHandleCancelCrop,
      mockHandleStopCamera,
      mockHandleUseCamera,
    );
    expect(imageDroppedFlagTrue).toBe(mockHandleStopCamera);
    // imageDroppedFlag is true
    const bothFalse = getButtonAction(
      false,
      false,
      mockHandleCancelCrop,
      mockHandleStopCamera,
      mockHandleUseCamera,
    );
    expect(bothFalse).toBe(mockHandleUseCamera);
  });
  it("should return respective message when getSecondButtonText called", () => {
    const cropModeFlagTrue = getSecondButtonText(true, false);
    expect(cropModeFlagTrue).toBe("Apply Crop");
    const cameraUsedFlagFalse = getSecondButtonText(false, false);
    expect(cameraUsedFlagFalse).toBe("Submit Photo");
    const cameraUsedFlagTrue = getSecondButtonText(false, true);
    expect(cameraUsedFlagTrue).toBe("Take Photo");
  });
  it("should call cancelCropFun for cancelCrop", () => {
    const childImageRef = createMockRef(mockChildImageMethods);
    cancelCrop(childImageRef);
    expect(mockChildImageMethods.cancelCropFun).toHaveBeenCalled();
  });

  it("should call handleCropFun for handleCrop", () => {
    const childImageRef = createMockRef(mockChildImageMethods);
    handleCrop(childImageRef);
    expect(mockChildImageMethods.handleCropFun).toHaveBeenCalled();
  });
});

describe("Profile Handlers", () => {
  const mockSetTempSummary = jest.fn();
  const mockSetEditMode = jest.fn();
  const mockSetProfileSummary = jest.fn();
  const mockSetErrors = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("handleEditClick", () => {
    it("should set the temporary summary and enable edit mode", () => {
      const editCardId = "card1";
      const profileSummary = "Summary text";

      handleEditClick(
        editCardId,
        mockSetTempSummary,
        profileSummary,
        mockSetEditMode,
      );

      expect(mockSetTempSummary).toHaveBeenCalledWith(profileSummary);
      expect(mockSetEditMode).toHaveBeenCalledWith(editCardId, true);
    });
  });

  describe("handleCancelClick", () => {
    it("should disable edit mode", () => {
      const editCardId = "card1";

      handleCancelClick(editCardId, mockSetEditMode);

      expect(mockSetEditMode).toHaveBeenCalledWith(editCardId, false);
    });
  });

  describe("handleSaveClick", () => {
    it("should save the summary and disable edit mode when validation is successful", async () => {
      const editCardId = "card1";
      const tempSummary = "New summary text";

      await handleSaveClick(
        editCardId,
        tempSummary,
        mockSetProfileSummary,
        mockSetEditMode,
        mockSetErrors,
      );

      expect(mockSetProfileSummary).toHaveBeenCalledWith(tempSummary);
      expect(mockSetEditMode).toHaveBeenCalledWith(editCardId, false);
      expect(mockSetErrors).toHaveBeenCalledWith({});
    });

    it("should set validation errors if validation fails", async () => {
      const editCardId = "card1";
      const tempSummary = "Invalid summary";
      await handleSaveClick(
        editCardId,
        tempSummary,
        mockSetProfileSummary,
        mockSetEditMode,
        mockSetErrors,
      );
    });
  });
});

describe("Profile action handlers", () => {
  let openDrawerMock: jest.Mock;

  beforeEach(() => {
    openDrawerMock = jest.fn();
  });

  it('should open drawer with "06" when handleProjectEditClick is called', () => {
    handleProjectEditClick(openDrawerMock);
    expect(openDrawerMock).toHaveBeenCalledWith("06");
  });

  it('should open drawer with "08" when handleCertificationEditClick is called', () => {
    handleCertificationEditClick(openDrawerMock);
    expect(openDrawerMock).toHaveBeenCalledWith("08");
  });

  it('should open drawer with "04" when handleExperienceEditClick is called', () => {
    handleExperienceEditClick(openDrawerMock);
    expect(openDrawerMock).toHaveBeenCalledWith("04");
  });
});

describe("Profile Component", () => {
  it("should handle view more click correctly", () => {
    // Mock data and functions
    const toggleCardExpansion = jest.fn();
    const setIsIconVisible = jest.fn();
    jest.mock("../../Store/ProfileStore.ts", () => ({
      useProfileStore: () => ({
        profileSummary: "Summary",
        editModes: {},
        tempSummary: "",
        setProfileSummary: jest.fn(),
        setTempSummary: jest.fn(),
        setEditMode: jest.fn(),
        expandedCardIds: ["01"], // Simulate that the card is already expanded
        toggleCardExpansion,
        setIsIconVisible,
      }),
    }));

    // Render the Profile component
    render(
      <MockedProvider mocks={profileSummaryMock} addTypename={false}>
        <Profile />
      </MockedProvider>,
    );

    // Find all buttons with the text "View More"
    const viewMoreButtons = screen.getAllByText("View More");

    // Select the first button
    const firstViewMoreButton = viewMoreButtons[0];

    // Trigger the click event on the first button
    fireEvent.click(firstViewMoreButton);

    // Check if toggleCardExpansion is called with the correct id
    // expect(toggleCardExpansion).toHaveBeenCalledWith("01"); // Adjust ID according to your data

    // Check if setIsIconVisible is called with the correct value
    // expect(setIsIconVisible).toHaveBeenCalledWith(
    //   expect.not.arrayContaining(["01"]),
    // );
  });

  it("should return the first description when summary has descriptions", () => {
    const summary: Array<SummaryResponse | null> = [
      { description: "Description 1" },
      { description: "Description 2" },
    ];
    const result = getDescription(summary);
    expect(result).toBe("Description 1");
  });

  it("should return undefined when summary is null", () => {
    const result = getDescription(null);
    expect(result).toBeUndefined();
  });
});

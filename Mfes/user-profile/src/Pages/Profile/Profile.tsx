import { useEffect, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import ProfileCard from "../../components/UI/ProfileCard/ProfileCard.tsx";
import {
  AddIcon,
  CancelIcon,
  EditingIcon,
  EditIcon,
} from "../../assets/Icon/Icon.tsx";
import { useProfileStore } from "../../Store/ProfileStore.ts";
import { useProfileCardStore } from "../../Store/ProfileCardStore.ts";
import ProfileModal from "../../components/UI/ProfileModal/ProfileModal.tsx";
import ProfileDrawer from "../../components/UI/ProfileDrawer/ProfileDrawer.tsx";
import { useThemeContext } from "../../ThemeContext/ThemeContext.tsx";
import EditComponent from "../../components/UI/CardContent/EditComponent.tsx";
import ViewComponent from "../../components/UI/CardContent/ViewComponent.tsx";
import SkillComponent, {
  skills,
} from "../../components/UI/CardContent/SkillComponent.tsx";
import DragDropVideo, {
  ChildMethods,
} from "../../components/UI/VideoResume/DragDropVideo.tsx";
import ProfileSummaryEditor from "../../profilesummary/ProfileSummaryEditor.tsx";
import ProjectList from "../../components/UI/CardContent/ProjectList.tsx";
import CertificationsComponent from "../../components/UI/CardContent/CertificateCard.tsx";
import ExperienceContent from "../../components/UI/CardContent/ExperienceContent.tsx";
import ProfileImageEditor, {
  ChildImageMethods,
} from "../../components/UI/ProfileImageEditor/ProfileImageEditor.tsx";
import { useProfileSummaryStore } from "../../Store/ProfileSummaryStore.ts";
import { Errors } from "../../components/UI/Validation/ProfileSummaryValidation.ts";
import { useGetSummary } from "../../components/UI/Shared/GraphqlQueries/UserProfile.ts";
import { useUserDataStore } from "../../Store/UserDateStore.ts";
import {
  handleUploadVideoResume,
  uploadImage,
  usecamera,
  capturePhoto,
  stopCamera,
  cancelCrop,
  handleCancelClick,
  handleEditClick,
  handleSaveClick,
  handleExperienceEditClick,
  // handleProjectEditClick,
  // handleCertificationEditClick,
  handleCrop,
  getDescription,
  getButtonText,
  getButtonAction,
  getSecondButtonText,
  getSecondButtonAction,
  getProfilePictureSubtitle,
  getProfilePictureHeight,
  returnSolution,
} from "./ProfileFunctions.tsx";
import { useCertificationForm } from "../../components/UI/Shared/DrawerMethods.tsx";
import AddCertificationComponent from "../../components/UI/DrawerContent/AddCertification.tsx";
import AddExperience from "../../components/UI/DrawerContent/AddExperience.tsx";
import ProjectForm from "../../components/UI/DrawerContent/AddProjectForm.tsx";
import AddSkills from "../../components/UI/DrawerContent/AddSkills.tsx";

function Profile() {
  const { createDrawerData, childskillRef } = useCertificationForm();
  const [editModeFlag, setEditModeFlag] = useState(false);
  const [, setEditProject] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);
  const { theme } = useThemeContext();
  const { DIVIDER, PRIMARY_MAIN } = useThemeConstant({ theme });
  const { editModes, setEditMode, expandedCardIds, toggleCardExpansion } =
    useProfileStore();
  const { drawerId, closeModal, openDrawer, modalId } = useProfileCardStore();
  const { userId } = useUserDataStore();

  const { loadSumm, data } = useGetSummary(userId);

  useEffect(() => {
    if (userId) loadSumm();
  }, []);
  const summary = data?.getSummary?.summary;
  const setInitSummary = () => {
    useProfileSummaryStore.setState({ profileSum: getDescription(summary) });
  };
  useEffect(() => {
    if (data) {
      setInitSummary();
    }
  }, [data]);

  // get zustand data for profile summary
  const { profileSum, setProfileSum } = useProfileSummaryStore();
  const childImageRef = useRef<ChildImageMethods>(null);

  const [isImageDroppedFlag, setIsImageDroppedFlag] = useState(false);
  const [isCameraUsedFlag, setIsCameraUsedFlag] = useState(false);
  const [isCropModeFlag, setCropModeFlag] = useState(false);

  const handleViewMoreClick = (id: string) => {
    setIsIconVisible(expandedCardIds.includes(id));
    toggleCardExpansion(id);
  };
  const handleEditSkill = () => {
    setEditModeFlag(true);
  };

  const handleOpenDrawer = (id: string) => {
    openDrawer(id);
  };
  const handleOpenSkillDrawer = (id: string) => {
    openDrawer(id);
    handleEditSkill();
  };

  const handleEditProject = () => {
    setEditProject(true);
  };

  const handleOpenProjectDrawer = (id: string) => {
    openDrawer(id);
    handleEditProject();
  };

  const childvideoRef = useRef<ChildMethods>(null);

  const handleUploadVideo = () => handleUploadVideoResume(childvideoRef);
  const handleUploadImage = () => uploadImage(childImageRef);
  const handleUseCamera = () => usecamera(childImageRef);
  const handleCapturePhoto = () => capturePhoto(childImageRef);
  const handleStopCamera = () =>
    stopCamera(
      childImageRef,
      setIsImageDroppedFlag,
      setIsCameraUsedFlag,
      setCropModeFlag,
      closeModal,
    );
  const handleCancelCrop = () => cancelCrop(childImageRef);
  const handleApplyCrop = () => handleCrop(childImageRef);
  const [, setErrors] = useState<Errors>({});
  const profileCardsData = [
    {
      id: "01",
      title: "Profile Summary",
      icons: [
        {
          id: "icon6",

          icon: (
            <Box sx={{ pr: 3, pt: 2 }}>
              {returnSolution(editModes["01"], <CancelIcon />, <EditingIcon />)}
            </Box>
          ),
          onClick: editModes["01"]
            ? () => handleCancelClick("01", setEditMode)
            : () =>
                handleEditClick("01", setProfileSum, profileSum, setEditMode),
        },
      ],
      bodyContent: editModes["01"] ? (
        <EditComponent
          onCancel={() => handleCancelClick("01", setEditMode)}
          onSave={() =>
            handleSaveClick(
              "01",
              profileSum,
              setProfileSum,
              setEditMode,
              setErrors,
            )
          }
        />
      ) : (
        <ViewComponent />
      ),
    },
    {
      id: "02",
      title: "Profile Summary",
      icons: [
        {
          id: "icon1",
          icon: <EditingIcon />,
          onClick: () =>
            handleEditClick("02", setProfileSum, profileSum, setEditMode),
        },
      ],
      bodyContent: editModes["02"] ? (
        <ProfileSummaryEditor profileSummary={profileSum} />
      ) : (
        profileSum
      ),
      footerContent: null,
    },

    {
      id: "03",
      title: "Work Experience",
      icons: [
        {
          id: "icon2",
          icon: <AddIcon />,
          onClick: () => handleOpenDrawer("03"),
        },
        {
          id: "icon3",
          icon: <EditIcon />,
          onClick: () => handleExperienceEditClick(openDrawer),
          visible: isIconVisible,
        },
      ].filter((icon) => icon.visible !== false),
      bodyContent: (
        <ExperienceContent
          isExpanded={expandedCardIds.includes("03")}
          onEditClick={() => handleExperienceEditClick(openDrawer)}
        />
      ),
      footerContent: <Button />,
    },
    {
      id: "04",
      title: "Skills",
      icons: [
        {
          id: "icon4",
          icon: <AddIcon />,
          onClick: () => handleOpenSkillDrawer("01"),
        },
        {
          id: "icon5",
          icon: <EditIcon />,
          onClick: () => handleOpenSkillDrawer("02"),
        },
      ],
      bodyContent: <SkillComponent />,
      footerContent: <Box />,
    },
    {
      id: "05",
      title: "Projects",
      icons: [
        {
          id: "icon6",
          icon: <AddIcon />,
          onClick: () => handleOpenProjectDrawer("05"),
        },
        // {
        //   id: "icon7",
        //   icon: <EditIcon />,
        //   onClick: () => handleOpenProjectDrawer("06"),
        // },
      ],
      bodyContent: <ProjectList isExpanded={expandedCardIds.includes("05")} />,
      footerContent: <Button />,
    },
    {
      id: "06",
      title: "Certifications",
      icons: [
        {
          id: "icon6",
          icon: <AddIcon />,
          onClick: () => handleOpenDrawer("07"),
        },
      ],
      bodyContent: (
        <CertificationsComponent isExpanded={expandedCardIds.includes("06")} />
      ),
      footerContent: <Button />,
    },
  ];
  const profileModalData = [
    {
      id: "01",
      title: "Add Project Here",
      subtitle: "",
      icons: [{ id: "icon1", icon: <CancelIcon />, onClick: closeModal }],
      bodyContent: "Modal Content",
      height: "auto",
      footer: {
        buttons: [
          {
            id: "button1",
            variant: "outlined" as const,
            onClick: closeModal,
            sx: { border: `1px solid ${DIVIDER}` },
            text: "Cancel",
          },
          {
            id: "button2",
            variant: "contained" as const,
            sx: { backgroundColor: PRIMARY_MAIN },
            text: "Save",
          },
        ],
      },
    },
    {
      id: "02",
      title: "Upload your video resume",
      subtitle:
        "Upload a video of your resume that will appear everywhere in our app",
      icons: [{ id: "icon1", icon: <CancelIcon />, onClick: closeModal }],
      bodyContent: <DragDropVideo ref={childvideoRef} />,
      maxWidth: "600px",
      height: "auto",
      footer: {
        buttons: [
          {
            id: "button1",
            variant: "outlined" as const,
            onClick: closeModal,
            sx: {
              border: `1px solid ${DIVIDER}`,
            },
            text: "Cancel",
          },
          {
            id: "button2",
            variant: "contained" as const,
            sx: {
              backgroundColor: PRIMARY_MAIN,
              width: "88.7px",
            },
            text: "Save",
            onClick: handleUploadVideo,
          },
        ],
      },
    },
    {
      id: "03",
      title: "Profile Picture",
      subtitle: getProfilePictureSubtitle(
        isCameraUsedFlag,
        isImageDroppedFlag,
        isCropModeFlag,
      ),
      icons: [{ id: "icon1", icon: <CancelIcon />, onClick: handleStopCamera }],
      bodyContent: (
        <Box
          sx={{
            overflowY: {
              xs: "scroll",
              sm: "scroll",
              md: "visible",
            },
          }}
        >
          <ProfileImageEditor
            ref={childImageRef}
            setIsImageDroppedFlag={setIsImageDroppedFlag}
            setIsCameraUsedFlag={setIsCameraUsedFlag}
            setCropModeFlag={setCropModeFlag}
          />
        </Box>
      ),
      height: getProfilePictureHeight(isCameraUsedFlag, isImageDroppedFlag),
      maxWidth: !isImageDroppedFlag || isCameraUsedFlag ? "600px" : "750px",
      footer: {
        buttons: [
          {
            id: "button1",
            variant: "outlined" as const,
            sx: {
              border: `1px solid ${DIVIDER}`,
              visibility:
                isImageDroppedFlag && !isCameraUsedFlag && !isCropModeFlag
                  ? "hidden"
                  : "visible",
            },
            text: getButtonText(isCropModeFlag, isImageDroppedFlag),
            onClick: () =>
              getButtonAction(
                isCropModeFlag,
                isImageDroppedFlag,
                handleCancelCrop,
                handleStopCamera,
                handleUseCamera,
              )(),
          },
          {
            id: "button2",
            variant: "contained" as const,
            sx: {
              backgroundColor: PRIMARY_MAIN,
            },
            text: getSecondButtonText(isCropModeFlag, isCameraUsedFlag),
            onClick: () =>
              getSecondButtonAction(
                isCropModeFlag,
                isCameraUsedFlag,
                handleApplyCrop,
                handleUploadImage,
                handleCapturePhoto,
              )(),
          },
        ],
      },
    },
  ];
  const profileDrawerData = [
    createDrawerData("01", "Add Skills Here", <AddSkills />),
    createDrawerData(
      "02",
      "Edit Skills Here",
      <AddSkills isEditMode={editModeFlag} />,
    ),
    createDrawerData(
      "03",
      "Add Work Experience Here",
      <AddExperience ref={childskillRef} />,
    ),
    createDrawerData(
      "04",
      "Edit Work Experience Here",
      <AddExperience ref={childskillRef} />,
    ),
    createDrawerData("05", "Add Project Here", <ProjectForm />),
    createDrawerData(
      "06",
      "Edit Project Here",
      <ProjectForm isEditModeProject={true} />,
    ),
    createDrawerData(
      "07",
      "Add Certificate Here",
      <AddCertificationComponent />,
    ),
    createDrawerData(
      "08",
      "Edit Certificate Here",
      <AddCertificationComponent isEditModeCert={true} />,
    ),
  ];

  return (
    <div>
      {profileCardsData.map((cardData) => (
        <ProfileCard
          key={cardData.id}
          expanded={expandedCardIds.includes(cardData.id)}
          onViewMore={() => handleViewMoreClick(cardData.id)}
        >
          {cardData.id !== "01" ? (
            <ProfileCard.Header
              title={cardData.title}
              icons={cardData.icons.map((icon) => ({
                ...icon,
                onClick: icon.onClick,
              }))}
            />
          ) : (
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", padding: 1 }}
            >
              {cardData.icons.map((icon) => (
                <Box key={icon.id} onClick={icon.onClick}>
                  {icon.icon}
                </Box>
              ))}
            </Box>
          )}

          <ProfileCard.Body>{cardData.bodyContent}</ProfileCard.Body>
          {cardData.footerContent && (
            <ProfileCard.Footer
              expanded={expandedCardIds.includes(cardData.id)}
              onViewMore={() => handleViewMoreClick(cardData.id)}
              disabled={cardData.id === "04" && skills.length <= 20}
            >
              {expandedCardIds.includes(cardData.id) && (
                <div>{cardData.footerContent}</div>
              )}
            </ProfileCard.Footer>
          )}
        </ProfileCard>
      ))}
      {profileModalData.map(
        (modalData) =>
          modalData.id === modalId && (
            <ProfileModal key={modalData.id} maxWidth={modalData?.maxWidth}>
              <ProfileModal.Header
                title={modalData.title}
                icons={modalData.icons}
                subtitle={modalData.subtitle}
              />
              <ProfileModal.Body height={modalData.height}>
                {modalData.bodyContent}
              </ProfileModal.Body>
              <ProfileModal.Footer>
                {modalData.footer.buttons.map((button) => (
                  <Button
                    key={button.id}
                    variant={button.variant}
                    onClick={button.onClick}
                    sx={button.sx}
                  >
                    {button.text}
                  </Button>
                ))}
              </ProfileModal.Footer>
            </ProfileModal>
          ),
      )}

      {profileDrawerData.map(
        (drawerData) =>
          drawerData.id === drawerId && (
            <ProfileDrawer key={drawerData.id}>
              <ProfileDrawer.Header
                title={drawerData.title}
                icons={drawerData.icons}
              />
              <ProfileDrawer.Body>{drawerData.bodyContent}</ProfileDrawer.Body>
            </ProfileDrawer>
          ),
      )}
    </div>
  );
}

export default Profile;

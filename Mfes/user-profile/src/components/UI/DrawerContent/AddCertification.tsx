import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import {
  CancelIcon,
  UploadIcon,
  DeleteIcon,
  DownLoadIcon,
} from "../../../assets/Icon/Icon.tsx";

import { fileValidationSchema } from "../Validation/imagevalidation.ts";

import LabelTypography from "./LabelCertificate.tsx";
import DeleteConfirmationModal from "../VideoResume/DeleteConfirmationDialog.tsx";
import {
  DELETE_CERTIFICATE_CONFIRMATION,
  DELETE_CERTIFICATE_MESSAGE,
} from "../VideoResume/messages.ts";
import { useCertificationForm } from "../Shared/DrawerMethods.tsx";
import DateSelector from "../Shared/DrawerField.tsx";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer.tsx";
import PositionedSnackbar from "../Snackbar/Snackbar.tsx";
import { useSnackbarStore } from "../../../Store/ToasterStore.ts";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";
import {
  useAddCertificateWithImage,
  useDeleteCertificate,
} from "../Shared/GraphqlQueries/UserProfile.ts";
import { useUserDataStore } from "../../../Store/UserDateStore.ts";
import {
  UserCertificate,
  useUserCertificateStore,
} from "../../../Store/CertificatesStore.ts";

export const handleDrop = (
  acceptedFiles: File[],
  setError: (error: string | null) => void,
  setFile: (file: File | null) => void,
  setImage: (image: string | null) => void,
  setFileInfo: (info: { name: string; size: string } | null) => void,
  setUploadSuccess: (success: boolean) => void,
) => {
  const droppedFile = acceptedFiles[0];

  fileValidationSchema
    .validate({ file: droppedFile })
    .then(() => {
      setError(null);
      setFile(droppedFile);
      setImage(URL.createObjectURL(droppedFile));
      setFileInfo({
        name: droppedFile.name,
        size: `${(droppedFile.size / 1024).toFixed(2)} KB`,
      });
      setUploadSuccess(true);
    })
    .catch((validationError) => {
      setError(validationError.message);
      setImage(null);
      setFileInfo(null);
      setFile(null);
      setUploadSuccess(false);
    });
};
interface AddCertificatesProps {
  isEditModeCert?: boolean;
}
interface CertificateData {
  certificateName: string;
  Organization: string;
  startMonth: string;
  startYear: number;
  endMonth: string;
  endYear: number;
  CredentialUrl: string;
  Skill: string;
}
function AddCertificationComponent({
  isEditModeCert,
}: Readonly<AddCertificatesProps>) {
  const { userId } = useUserDataStore();
  const { handleCertificateWithImageInDB } = useAddCertificateWithImage();
  const { closeDrawer } = useProfileCardStore();
  const setMessage = useSnackbarStore((state) => state.setMessage);
  const clearMessage = useSnackbarStore((state) => state.clearMessage);
  const {
    deleteUserCertificate,
    idSelected,
    setUserCertificate,
    userCertificate,
  } = useUserCertificateStore();
  const { DeleteCertificate } = useDeleteCertificate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedCertNew, setSelectedCertificateNew] = useState<any>(null);
  const [, setInitialData] = useState({
    certificateName: "",
    Organization: "",
    CredentialUrl: "",
    startMonth: "January",
    startYear: 2021,
    endMonth: "January",
    endYear: 2024,
    Skill: "Java",
  });
  const {
    skills,
    handleSkillAdd,
    handleSkillDelete,
    skillInput,
    setSkillInput,
    errorSkill,
    truncateFileName,
    openDeleteModal,
    uploadSuccess,
    image,
    fileInfo,
    errorImage,
    handleDownloadIconClick,
    handleDelete,
    setOpenDeleteModal,
    setUploadSuccess,
    setImage,
    setFileInfo,
    setError,
    setFile,
    months,
    years,
  } = useCertificationForm();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CertificateData>({
    // mode: "onChange",
    reValidateMode: "onChange",
    // resolver: yupResolver(addCertificationValidationSchema),
    defaultValues: {
      certificateName: "",
      Organization: "",
      CredentialUrl: "",
      startMonth: "January",
      startYear: 2021,
      endMonth: "January",
      endYear: 2024,
      Skill: "Java",
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleDrop(
        acceptedFiles,
        setError,
        setFile,
        setImage,
        setFileInfo,
        setUploadSuccess,
      );
    },
    [setError, setFile, setFileInfo, setImage, setUploadSuccess],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });
  const handleDeleteCertificate = async () => {
    try {
      if (idSelected) {
        const response = await DeleteCertificate({
          variables: { certificateId: idSelected },
        });
        const deleteSuccess = response.data?.deleteCertificate?.status ?? false;

        if (deleteSuccess) {
          deleteUserCertificate(idSelected);
          closeDrawer();
          setMessage("Certificate deleted successfully!");
        } else {
          setMessage("Failed to delete Certificate.");
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while deleting the Certificate.");
    } finally {
      setOpenDeleteModal(false);
    }
  };
  const handleCancelClick = () => {
    closeDrawer();
  };
  const handleDeleteModalClick = () => {
    setOpenDeleteModal(true);
  };
  const prepareCertificateData = (
    formData: CertificateData,
    startMonth: string,
    endMonth: string,
  ) => ({
    file: null, // dev hold
    userId,
    skillId: null, // dev hold
    certificateName: formData.certificateName,
    organizationName: formData.Organization,
    certificateImageURL: null, // dev hold
    skill: formData.Skill, // to be develop
    certificateExpiryDate: `${endMonth}-${formData.endYear}`,
    certificateIssueDate: `${startMonth}-${formData.startYear}`,
    certificateURL: formData.CredentialUrl,
  });
  const handleCertificate = async (certificateData: UserCertificate) => {
    const response = await handleCertificateWithImageInDB({
      variables: {
        file: null,
        userId,
        certificateName: certificateData.certificateName,
        organizationName: certificateData.organizationName,
        CredentialUrl: certificateData.certificateURL,
        skill: certificateData.skill ? certificateData.skill : "KKKK",
        certificateExpiryDate: certificateData.certificateExpiryDate,
        certificateIssueDate: certificateData.certificateIssueDate,
        certificateImageURL: null,
      },
    });
    const addSuccess = response?.data?.addCertificateWithImage?.status ?? false;

    if (addSuccess) {
      setUserCertificate([certificateData]);
      closeDrawer();
      setMessage("Certificate added successfully!");
    } else {
      setMessage("Failed to add Certificate.");
    }
  };

  // Function to handle submission
  const onSubmit = (formData: CertificateData) => {
    const endDate = new Date(`${formData.endMonth} 1, ${formData.endYear}`);
    const endmonthMM = String(endDate.getMonth() + 1).padStart(2, "0");

    const startDate = new Date(`${formData.startMonth} 1, ${formData.endYear}`);
    const startmonthMM = String(startDate.getMonth() + 1).padStart(2, "0");

    const certificateData = prepareCertificateData(
      formData,
      startmonthMM,
      endmonthMM,
    );

    handleCertificate(certificateData);
    closeDrawer();
  };

  const validateCertificate = () => {
    const selectCertificate = userCertificate?.find(
      (certificate) => certificate?.certificateID === idSelected,
    );

    if (selectCertificate) {
      setSelectedCertificateNew(selectCertificate);
    }
  };

  useEffect(() => {
    if (isEditModeCert) {
      validateCertificate();
    }
  }, [idSelected]);

  useEffect(() => {
    const isCertAvail = !!selectedCertNew?.certificateID;
    if (isCertAvail && isEditModeCert) {
      setInitialData({
        certificateName: selectedCertNew.certificateName,
        Organization: selectedCertNew.organizationName,
        CredentialUrl: selectedCertNew.certificateURL,
        startMonth: "January",
        startYear: 2021,
        endMonth: "January",
        endYear: 2024,
        Skill: selectedCertNew.skill,
      });
      // setvalues
      setValue("certificateName", selectedCertNew.certificateName);
      setValue("Organization", selectedCertNew.organizationName);
      setValue("Skill", selectedCertNew.skill);
      setValue("startMonth", "January"); // reverse the process of certificateIssueDate and use value of month
      setValue("startYear", 2020); // reverse the process of certificateIssueDate and use value of year
      setValue("endMonth", "January"); // reverse the process of certificateExpiryDate and use value of month
      setValue("endYear", 2022); // reverse the process of certificateExpiryDate and use value of year
      setValue("CredentialUrl", selectedCertNew.certificateURL);
    }
  }, [selectedCertNew]);

  useEffect(() => {
    clearMessage();
  }, [clearMessage]);

  return (
    <Box>
      <PositionedSnackbar />
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          borderRadius: 2,
        }}
      >
        {/* <Box sx={{ p: 3 }}> */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // Stack vertically on mobile, horizontally on larger screens
              gap: 7, // Adjust gap between the fields
              width: "100%", // Ensure the parent Box takes full width
            }}
          >
            <Box
              sx={{
                width: "100%", // Full width for each field
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <LabelTypography text="CertificateTitle" />
              <Controller
                name="certificateName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter Certificate Title"
                    fullWidth
                    margin="normal"
                    error={!!errors.certificateName}
                    helperText={errors.certificateName?.message}
                    FormHelperTextProps={{
                      sx: {
                        marginLeft: "0 !important", // Forcefully remove left margin
                      },
                    }}
                  />
                )}
              />
            </Box>
            <Box
              sx={{
                width: "100%", // Full width for each field
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <LabelTypography text="Organization" />
              <Controller
                name="Organization"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter Issuing Organization"
                    fullWidth
                    margin="normal"
                    error={!!errors.Organization}
                    helperText={errors.Organization?.message}
                    FormHelperTextProps={{
                      sx: {
                        marginLeft: "0", // Forcefully remove left margin
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <DateSelector
            control={control}
            errors={errors}
            yearName="startYear"
            monthName="startMonth"
            years={years}
            months={months}
          />

          <DateSelector
            control={control}
            errors={errors}
            yearName="endYear"
            monthName="endMonth"
            years={years}
            months={months}
          />
          <Box sx={{ display: "flex", gap: 7, mt: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <LabelTypography text="Skill" />
              <Controller
                name="Skill"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    margin="normal"
                    // placeholder=""
                    placeholder="Press Enter to add skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleSkillAdd}
                    error={Boolean(errorSkill)}
                    helperText={errorSkill || errors.Skill?.message}
                    FormHelperTextProps={{
                      sx: {
                        marginLeft: "0",
                      },
                    }}
                  />
                )}
              />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                {skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={handleSkillDelete(skill)}
                  />
                ))}
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 7, mt: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <LabelTypography text="CredentialURL" />
              <Controller
                name="CredentialUrl"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Enter credential URL"
                    fullWidth
                    margin="normal"
                    error={!!errors.CredentialUrl}
                    helperText={errors.CredentialUrl?.message}
                    FormHelperTextProps={{
                      sx: {
                        marginLeft: "0 !important",
                      },
                    }}
                  />
                )}
              />
            </Box>
          </Box>
          <Box sx={{ gap: 7, mt: 2 }}>
            <Box>
              <LabelTypography text="uploadImage" />
              <Box
                {...getRootProps()}
                sx={{
                  border: "2px dashed #cccccc",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mt: 1,
                  alignItems: "center",
                }}
              >
                <input {...getInputProps()} data-testid="upload-input" />
                {image ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <img
                      src={image}
                      alt="Preview"
                      style={{
                        maxWidth: "80px",
                        maxHeight: "80px",
                        marginRight: "20px",
                      }}
                    />
                    <Box sx={{ textAlign: "left", flex: 1 }}>
                      {/* <Typography variant="body1">{fileInfo?.name}</Typography> */}
                      {fileInfo?.name && (
                        <span>{truncateFileName(fileInfo.name, 20)}</span>
                      )}
                      <Typography variant="body2" color="textSecondary">
                        {fileInfo?.size}
                      </Typography>
                    </Box>

                    <Box>
                      <p>
                        <IconButton
                          style={{
                            margin: "0px",
                          }}
                        >
                          <CancelIcon />
                        </IconButton>
                        <IconButton
                          style={{
                            margin: "0px",
                          }}
                          onClick={handleDownloadIconClick}
                        >
                          <DownLoadIcon />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={handleDelete}
                          aria-label="delete"
                          sx={{ marginTop: "3px" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </p>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: "center", width: "100%" }}>
                    <p>
                      <span>
                        <UploadIcon />
                      </span>
                      <br />
                      <span style={{ fontWeight: "700" }}>
                        Click or drag and drop to upload an attachment
                      </span>
                      <br />
                      <Typography variant="body2" color="textSecondary">
                        JPEG, PNG, PDF(Up to 2 MB)
                      </Typography>
                    </p>
                  </Box>
                )}
              </Box>
              {uploadSuccess && (
                <Typography
                  sx={{
                    mt: 2,
                    textAlign: "left",
                    color: "green",
                    display: "flex",
                    alignItems: "center",
                  }}
                  data-testid="upload-success-message"
                >
                  {/* <CheckedIcon /> */}
                  Uploading Successful
                </Typography>
              )}
              <Box
                sx={{ display: "flex", textAlign: "left", marginTop: "5px" }}
              >
                {errorImage && (
                  <Typography color="error">{errorImage}</Typography>
                )}
              </Box>
            </Box>
          </Box>

          <ProfileDrawer.Footer>
            {isEditModeCert ? (
              <Button variant="outlined" onClick={handleDeleteModalClick}>
                Delete
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={handleCancelClick}
                data-testid="cancel-btn"
              >
                Cancel
              </Button>
            )}

            <Button type="submit" variant="contained">
              Save
            </Button>
          </ProfileDrawer.Footer>
        </form>

        <DeleteConfirmationModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={handleDeleteCertificate}
          message={DELETE_CERTIFICATE_MESSAGE}
          confirmMessage={DELETE_CERTIFICATE_CONFIRMATION}
        />
      </Box>
    </Box>
  );
}

export default AddCertificationComponent;

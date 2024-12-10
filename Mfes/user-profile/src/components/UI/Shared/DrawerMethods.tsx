import React, { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import useThemeConstant from "styleguide/ThemeConstants";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { addCertificationValidationSchema } from "../Validation/CertificateValidation.ts";
import { skillValidationSchema } from "../Validation/ProjectFormValidation.ts";
import { fileValidationSchema } from "../Validation/imagevalidation.ts";
import { CancelIcon } from "../../../assets/Icon/Icon.tsx";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";

export const getButtonStyles = (
  variant: "outlined" | "contained",
  PRIMARY_MAIN: string,
  DIVIDER: string,
  additionalStyles?: object,
) => ({
  height: "52px",
  width: variant === "outlined" ? "20%" : "105px",
  mr: variant === "contained" ? 2 : 0,
  backgroundColor: variant === "contained" ? PRIMARY_MAIN : undefined,
  border: variant === "outlined" ? `1px solid ${DIVIDER}` : undefined,
  ...additionalStyles,
});
export const useCertificationForm = () => {
  const childskillRef = useRef<{ submitForm: () => void } | null>(null);
  const handleDrawerSave = () => {
    if (childskillRef.current) {
      childskillRef.current.submitForm();
    }
  };
  const { theme } = useThemeContext();
  const { DIVIDER, PRIMARY_MAIN } = useThemeConstant({ theme });
  const { closeDrawer } = useProfileCardStore();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(addCertificationValidationSchema),
    defaultValues: {
      CertificateTitle: "",
      Organization: "",
      startMonth: "January",
      startYear: 2021,
      endMonth: "January",
      endYear: 2024,
      CredentialUrl: "",
      Skills: [],
    },
  });

  const [skills, setSkills] = useState<string[]>(["Adobe XD", "Figma"]);
  const [skillInput, setSkillInput] = useState<string>("");
  const [errorSkill, setErrorSkill] = useState<string>("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const [errorImage, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const handleSkillAdd = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const skillName = skillInput.trim();

      try {
        await skillValidationSchema.validate([skillName], {
          context: { skills },
          abortEarly: false,
        });

        const updatedSkills = [...skills, skillName];
        setSkills(updatedSkills);
        setValue("Skills", updatedSkills);
        setErrorSkill("");
        setSkillInput("");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setErrorSkill(error.errors.join(", "));
        }
      }
    }
  };

  const handleSkillDelete = (skillToDelete: string) => () => {
    const updatedSkills = skills.filter((skill) => skill !== skillToDelete);
    setSkills(updatedSkills);
    setValue("Skills", updatedSkills);
  };

  const truncateFileName = (name: string, maxLength: number) =>
    name.length <= maxLength
      ? name
      : `${name.slice(0, maxLength - name.lastIndexOf(".") - 4)}...${name.slice(name.lastIndexOf(".") + 1)}`;

  const onSubmit = () => {
    reset();
    setFile(null);
    setImage(null);
    setFileInfo(null);
    setUploadSuccess(false);
    setError(null);
    setSkillInput("");
  };

  const handleDownloadIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileInfo?.name || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    setFile(null);
    setImage(null);
    setFileInfo(null);
    setError(null);
    setOpenDeleteModal(false);
    setUploadSuccess(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = Array.from(new Array(50), (_unused, index) => 2024 - index);

  const createDrawerData = (
    id: string,
    title: string,
    bodyContent: React.ReactNode,
  ) => ({
    id,
    title,
    icons: [{ id: `icon_${id}`, icon: <CancelIcon />, onClick: closeDrawer }],
    bodyContent,
  });
  const commonButtons = (
    onDelete?: () => void,
    onSave: () => void = handleDrawerSave,
  ) => [
    {
      id: "button1",
      variant: "outlined" as const,
      onClick: onDelete || closeDrawer,
      text: onDelete ? "Delete" : "Cancel",
      sx: {
        border: `1px solid ${DIVIDER}`,
        height: "52px",
        width: onDelete ? "20%" : "123px",
      },
    },
    {
      id: "button2",
      variant: "contained" as const,
      onClick: onSave,
      text: "Save",
      sx: {
        backgroundColor: PRIMARY_MAIN,
        height: "52px",
        width: onDelete ? "20%" : "105px",
        mr: 2,
      },
    },
  ];

  return {
    control,
    handleSubmit,
    setValue,
    reset,
    errors,
    skills,
    skillInput,
    setSkillInput,
    errorSkill,
    handleSkillAdd,
    handleSkillDelete,
    truncateFileName,
    onSubmit,
    openDeleteModal,
    uploadSuccess,
    image,
    fileInfo,
    errorImage,
    file,
    handleDownloadIconClick,
    handleDelete,
    confirmDelete,
    getRootProps,
    getInputProps,
    setOpenDeleteModal,
    setUploadSuccess,
    setImage,
    setFileInfo,
    setError,
    setFile,
    months,
    years,
    createDrawerData,
    commonButtons,
    childskillRef,
    handleDrawerSave,
    onDrop,
  };
};

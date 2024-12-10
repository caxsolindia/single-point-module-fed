import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Card,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useThemeConstant from "styleguide/ThemeConstants";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import {
  addSkillsValidationSchema,
  DECIMAL_VALUE_ERROR,
  REQUIRED_FIELD_ERROR,
} from "../Validation/ValidationMessage.ts";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer.tsx";
import {
  GetSkillComponent,
  useAddSkill,
  useDeleteUserSkill,
} from "../Shared/GraphqlQueries/UserProfile.ts";
import { useUserDataStore } from "../../../Store/UserDateStore.ts";
import { useUserSkillStore } from "../../../Store/UserSkillStore.ts";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";
import DeleteConfirmationModal from "../VideoResume/DeleteConfirmationDialog.tsx";
import { useCertificationForm } from "../Shared/DrawerMethods.tsx";
import {
  DELETE_SKILL_CONFIRMATION,
  DELETE_SKILL_MESSAGE,
} from "../VideoResume/messages.ts";

// Define interfaces for form data and proficiency levels
export interface SkillData {
  skillId?: string;
  skillName: string;
  category: string;
  yearsOfExperience: number;
  proficiency: string;
  status: boolean;
}

export interface ProficiencyLevel {
  level: string;
  description: string;
}

interface AddSkillsProps {
  isEditMode?: boolean;
}

const proficiencyLevels: ProficiencyLevel[] = [
  { level: "Beginner", description: "No experience in the area." },
  {
    level: "Basics",
    description: "Ability to complete tasks under supervision",
  },
  {
    level: "Intermediate",
    description: "Able to handle routine tasks independently. ",
  },
  {
    level: "Advance",
    description:
      "Able to complete all tasks unassisted. No supervision is required for non-supervision tasks",
  },
  {
    level: "Expert",
    description:
      "Able to mentor others in the area of expertise as well as create new standards, continuously growing the skill level.",
  },
];

const recentSkillsMock = ["JavaScript", "React", "TypeScript"];
function AddSkills({ isEditMode = false }: Readonly<AddSkillsProps>) {
  const [selectedProficiency, setSelectedProficiency] = useState<string>("");
  const [hoveredProficiency, setHoveredProficiency] = useState<string | null>(
    null,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    clearErrors,
    setError,
  } = useForm<SkillData>({
    defaultValues: {
      skillName: "",
      category: "",
      yearsOfExperience: 0,
      proficiency: "",
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(addSkillsValidationSchema) as any,
    mode: "onBlur",
  });

  const { closeDrawer } = useProfileCardStore();
  const { userId } = useUserDataStore();
  const { addSkillInDB } = useAddSkill();
  const storeUserSkills = useUserSkillStore((state) => state.setUserSkill);
  const storeUpdateUserSkills = useUserSkillStore(
    (state) => state.updateUserSkill,
  );
  const { getUserSkills } = GetSkillComponent(userId);
  const { deleteUserSkillInDB } = useDeleteUserSkill();
  const { userSkill, deleteUserSkill } = useUserSkillStore();
  const { theme } = useThemeContext();
  const { PRIMARY_MAIN, TEXT_SECONDARY, GRAY_LIGHT, GRAY_MAIN, TEXT_PRIMARY } =
    useThemeConstant({
      theme,
    });

  const handleCardClick = (level: string) => {
    setSelectedProficiency(level);
    setValue("proficiency", level);
  };

  const watchedCategory = useWatch({
    control,
    name: "category",
  });

  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filteredSkill, setFilteredSkill] = useState<any>(null);

  // Function to prepare skill data
  const prepareSkillData = (formData: SkillData) => ({
    userId,
    skillId: isEditMode ? filteredSkill.skillId ?? null : null,
    skillName: formData.skillName,
    experienceInYears: formData.yearsOfExperience.toString(),
    skillCategory: formData.category,
    proficiency: formData.proficiency,
    status: true,
  });

  // Function to handle submission
  const onSubmit = (formData: SkillData) => {
    const skillData = prepareSkillData(formData);
    addSkillInDB({
      variables: {
        userId,
        skillId: skillData.skillId,
        userSkills: skillData.skillName,
        skillCategory: skillData.skillCategory,
        proficiency: skillData.proficiency,
        status: skillData.status,
        experienceInYears: skillData.experienceInYears,
      },
    })
      .then((response) => {
        if (response.data?.addUserSkill?.status) {
          storeUpdateUserSkills([skillData]);
          if (isEditMode) {
            storeUpdateUserSkills([skillData]);
          } else {
            storeUserSkills([skillData]);
          }
          getUserSkills();
        }
      })
      .catch((err) => console.error("Error processing skill:", err));

    reset();
    closeDrawer();
  };

  useEffect(() => {
    if (userId) getUserSkills();
  }, []);

  // Update selected category state when the field changes
  useEffect(() => {
    setSelectedCategory(watchedCategory);
  }, [watchedCategory]);

  const [initialData, setInitialData] = useState({
    skillName: "",
    experienceInYears: "",
    skillCategory: "",
    proficiency: "",
  });

  // Function to validate skills
  const validateSkill = (query: string) => {
    const matchedSkill = userSkill?.find(
      (skill) => skill?.skillName.toLowerCase() === query.toLowerCase(),
    );

    if (matchedSkill) {
      clearErrors("skillName");
      setFilteredSkill(matchedSkill);
      setValue("skillName", matchedSkill.skillName);

      // Show "Existing skill" message in !isEditMode and do not clear it afterward
      if (!isEditMode) {
        setError("skillName", {
          type: "manual",
          message: "Existing skill",
        });
      }
    } else if (query) {
      // In !isEditMode, avoid clearing the existing message if a new skill is typed
      if (isEditMode) {
        // In edit mode, show "Skill not available" if the skill doesn't exist
        setError("skillName", {
          type: "manual",
          message: "Not existing skill",
        });
      } else {
        // For adding a new skill (i.e., !isEditMode), do not clear the "Existing skill" message
        // and only clear errors when there's a valid skill typed
        clearErrors("skillName");
      }
    } else {
      clearErrors("skillName"); // Clear errors only when there's no input
    }
  };

  useEffect(() => {
    validateSkill(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, userSkill, setError, clearErrors, setValue]);

  useEffect(() => {
    // isFilteredSkillAvailable is giving boolean value for existance of filteredskill.
    const isFilteredSkillAvailable = !!filteredSkill?.skillName;
    if (isFilteredSkillAvailable && isEditMode) {
      setInitialData({
        skillName: filteredSkill.skillName,
        experienceInYears: filteredSkill.experienceInYears,
        skillCategory: filteredSkill.skillCategory,
        proficiency: filteredSkill.proficiency,
      });
      setValue(
        "yearsOfExperience",
        parseFloat(filteredSkill.experienceInYears),
      );
      setValue("category", filteredSkill.skillCategory);
      setValue("proficiency", filteredSkill.proficiency);
    } else {
      setInitialData({
        skillName: searchQuery,
        experienceInYears: "",
        skillCategory: "",
        proficiency: "",
      });
      setValue("skillName", searchQuery);
      setValue("yearsOfExperience", 0);
      setValue("category", "");
      setValue("proficiency", "");
    }
  }, [filteredSkill, searchQuery, setValue]);

  // Function to handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setInitialData({
      ...initialData,
      [name]: value,
    });

    if (name === "skillName" && value.trim() === "" && isEditMode) {
      reset({
        skillName: "",
        category: "",
        yearsOfExperience: 0,
        proficiency: "",
      });
      setFilteredSkill(null);
    }
  };

  const watchedFields = useWatch({ control });

  const isFormChanged = () => {
    if (!filteredSkill) return false;

    return (
      watchedFields.skillName !== filteredSkill.skillName ||
      watchedFields.category !== filteredSkill.skillCategory ||
      watchedFields.yearsOfExperience?.toString() !==
        filteredSkill.experienceInYears ||
      watchedFields.proficiency !== filteredSkill.proficiency
    );
  };

  const isExistingSkillMatched = () => {
    if (!filteredSkill || !searchQuery.trim()) {
      return false;
    }
    return userSkill?.some(
      (skill) => skill?.skillName.toLowerCase() === searchQuery.toLowerCase(),
    );
  };

  const checkButtonDisabled = (): boolean => {
    const existingSkillMatched = isExistingSkillMatched() ?? false;
    const formChangedStatus = isFormChanged() ?? false;

    return isEditMode
      ? !existingSkillMatched || !formChangedStatus
      : existingSkillMatched;
  };

  const isDisabled: boolean = checkButtonDisabled();

  const { openDeleteModal, setOpenDeleteModal } = useCertificationForm();

  const handleDeleteModalClick = () => {
    setOpenDeleteModal(true);
  };

  const deleteSkill = async () => {
    if (filteredSkill?.skillId && userId) {
      const response = await deleteUserSkillInDB({
        variables: { userId, skillId: filteredSkill.skillId },
      });
      if (response.data?.deleteUserSkill?.status) {
        // remove skill from zustand
        deleteUserSkill(filteredSkill?.skillId);
        closeDrawer();
      }
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} data-testid="add-skill-form">
        <Box sx={{ pb: 1.5 }}>
          <Typography>Skill Name*</Typography>
        </Box>

        <Controller
          name="skillName"
          control={control}
          defaultValue={isEditMode ? initialData.skillName : ""} // Default value for edit mode
          render={({ field }) => (
            <TextField
              {...field}
              sx={{
                width: "100%",
                height: "52px",
              }}
              variant="outlined"
              data-testid="skill-name-input"
              onChange={(e) => {
                field.onChange(e.target.value);
                setSearchQuery(e.target.value);
                handleInputChange(e);
              }}
              onBlur={() => validateSkill(field.value)}
            />
          )}
        />

        {errors.skillName && (
          <Typography variant="caption" color="error">
            {errors.skillName.message}
          </Typography>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <Box sx={{ pb: 1, pt: 2.5 }}>
                <Typography>Skill category*</Typography>
              </Box>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    variant="outlined"
                    data-testid="category-select"
                    disabled={isEditMode}
                  >
                    <MenuItem value="Technical skills">
                      Technical Skills
                    </MenuItem>
                    <MenuItem value="Soft Skills">Soft Skills</MenuItem>
                    <MenuItem value="Functional Skills">
                      Functional Skills
                    </MenuItem>
                  </Select>
                )}
              />

              {errors.category && (
                <Typography variant="caption" color="error">
                  {REQUIRED_FIELD_ERROR}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <Box sx={{ pb: 1, pt: 2.5 }}>
                <Typography>Years of Experience*</Typography>
              </Box>
              <Controller
                name="yearsOfExperience"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    variant="outlined"
                    inputProps={{ step: "0.1" }}
                    fullWidth
                    disabled={selectedCategory === "Soft Skills"}
                    data-testid="years-of-experience-input"
                    sx={{
                      backgroundColor:
                        selectedCategory === "Soft Skills"
                          ? GRAY_LIGHT
                          : "inherit",
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor:
                            selectedCategory === "Soft Skills"
                              ? GRAY_LIGHT
                              : "inherit",
                        },
                      },
                    }}
                  />
                )}
              />
              {errors.yearsOfExperience && (
                <Typography variant="caption" color="error">
                  {errors.yearsOfExperience.type === "required"
                    ? REQUIRED_FIELD_ERROR
                    : DECIMAL_VALUE_ERROR}
                </Typography>
              )}
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, pb: 2 }}>
          <Typography>Select The Level Of Skill Proficiency*</Typography>
        </Box>

        {proficiencyLevels.map((proficiency, index) => (
          <Box
            key={proficiency.level}
            sx={{
              mb: index === proficiencyLevels.length - 1 ? 0 : 2,
            }}
          >
            <Card
              variant="outlined"
              onClick={() => handleCardClick(proficiency.level)}
              onMouseEnter={() => setHoveredProficiency(proficiency.level)}
              onMouseLeave={() => setHoveredProficiency(null)}
              sx={{
                cursor: "pointer",
                width: "100%",

                height: "100%",
                backgroundColor:
                  selectedProficiency === proficiency.level
                    ? PRIMARY_MAIN
                    : "inherit",
                color:
                  selectedProficiency === proficiency.level
                    ? "white"
                    : "inherit",
                "&:hover": {
                  backgroundColor: PRIMARY_MAIN,
                  color: "white",
                },
                alignItems: "center",
                py: 2,
                display: "flex",
                justifyContent: "space-between",
                mb: index === proficiencyLevels.length - 1 ? 0 : 2, // Remove bottom margin for the last card
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  mx: 2,
                }}
              >
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  {proficiency.level}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      selectedProficiency === proficiency.level ||
                      hoveredProficiency === proficiency.level
                        ? "white"
                        : TEXT_SECONDARY,

                    maxWidth: {
                      xs: "250px", // maxWidth for extra small screens
                      sm: "300px", // maxWidth for small screens and above
                      md: "400px",
                    },
                  }}
                >
                  {proficiency.description}
                </Typography>
              </Box>
              <Controller
                name="proficiency"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset" sx={{ m: 0, ml: 2, mr: 0 }}>
                    <RadioGroup
                      {...field}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FormControlLabel
                        value={proficiency.level}
                        control={
                          <Radio
                            sx={{
                              p: 0,

                              color:
                                field.value === proficiency.level
                                  ? "#00D290"
                                  : GRAY_MAIN,
                              "&.Mui-checked": {
                                color: "#00D290",
                              },
                            }}
                          />
                        }
                        label=""
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Card>
          </Box>
        ))}

        {errors.proficiency && (
          <Typography
            variant="caption"
            color="error"
            sx={{ mt: 1 }} // Add top margin to the error message
          >
            {REQUIRED_FIELD_ERROR}
          </Typography>
        )}
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ color: TEXT_PRIMARY }}>
            Recently Added Skills
          </Typography>
          <Box sx={{ mt: 1.5, display: "flex", gap: 1 }}>
            {recentSkillsMock.map((skill) => (
              <Chip
                sx={{ backgroundColor: "white", border: "1px solid black" }}
                // eslint-disable-next-line react/no-array-index-key
                key={skill}
                label={skill}
              />
            ))}
          </Box>
        </Box>
        <Box>
          <Box>
            <ProfileDrawer.Footer>
              {isEditMode ? (
                <Button
                  variant="outlined"
                  onClick={handleDeleteModalClick}
                  disabled={!filteredSkill}
                >
                  Delete
                </Button>
              ) : (
                <Button variant="outlined" onClick={closeDrawer}>
                  Cancel
                </Button>
              )}

              <Button type="submit" variant="contained" disabled={isDisabled}>
                Save
              </Button>
            </ProfileDrawer.Footer>
          </Box>
        </Box>
      </form>

      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={deleteSkill}
        message={DELETE_SKILL_MESSAGE}
        confirmMessage={DELETE_SKILL_CONFIRMATION}
      />
    </Box>
  );
}

export default AddSkills;

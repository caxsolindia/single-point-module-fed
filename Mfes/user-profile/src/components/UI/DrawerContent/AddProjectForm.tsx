import { Box, TextField, Typography, Chip, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useState } from "react";
import {
  ProjectvalidationSchema,
  REQUIRED_FIELD_ERROR,
  WHITE_SPACE_ERROR,
} from "../Validation/ProjectFormValidation.ts";
import { useDeleteProjects } from "../Shared/GraphqlQueries/UserProfile.ts";
import { useCertificationForm } from "../Shared/DrawerMethods.tsx";
import DateSelector from "../Shared/DrawerField.tsx";
import ProfileDrawer from "../ProfileDrawer/ProfileDrawer.tsx";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";
import DeleteConfirmationModal from "../VideoResume/DeleteConfirmationDialog.tsx";
import { useUserDataStore } from "../../../Store/UserDateStore.ts";
import {
  DELETE_PROJECT_CONFIRMATION,
  DELETE_PROJECTS_MESSAGE,
} from "../VideoResume/messages.ts";
import { useUserProjectStore } from "../../../Store/ProjectStore.ts";
import { useSnackbarStore } from "../../../Store/ToasterStore.ts";

interface AddProjectProps {
  isEditModeProject?: boolean;
}

function ProjectForm({ isEditModeProject }: Readonly<AddProjectProps>) {
  const { closeDrawer } = useProfileCardStore();
  // const isDisabled: boolean = checkButtonDisabled();
  const { deleteUserProject } = useUserProjectStore();
  const { projectIdSelected } = useUserProjectStore();
  const setMessage = useSnackbarStore((state) => state.setMessage);

  const { openDeleteModal, setOpenDeleteModal } = useCertificationForm();
  // const [filteredSkill, setFilteredSkill] = useState<any>(null);
  const { userId } = useUserDataStore();
  const { deleteProjectsInDB } = useDeleteProjects();

  const {
    skills,
    skillInput,
    setSkillInput,
    errorSkill,
    handleSkillAdd,
    handleSkillDelete,
    onSubmit,
    months,
    years,
  } = useCertificationForm();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(ProjectvalidationSchema),
    defaultValues: {
      projectTitle: "",
      role: "",
      startMonth: "January",
      startYear: 2021,
      endMonth: "January",
      endYear: 2024,
      projectSummary: "",
      skills: [],
    },
  });

  const handleDeleteModalClick = () => {
    setOpenDeleteModal(true);
  };

  const deleteProject = async () => {
    try {
      if (projectIdSelected) {
        const response = await deleteProjectsInDB({
          variables: { userId, projectId: projectIdSelected },
        });
        const deleteSuccess = response.data?.deleteUserProject?.status ?? false;

        if (deleteSuccess) {
          deleteUserProject(projectIdSelected);
          closeDrawer();
          setMessage("Project deleted successfully!");
        } else {
          setMessage("Failed to delete Project.");
        }
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while deleting the Project.");
    } finally {
      setOpenDeleteModal(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.paper",
        borderRadius: 2,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form-submit">
        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, sm: 7 },
            mt: 2,
            flexDirection: { xs: "column", sm: "row" }, // Responsive direction
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>Project Title *</Typography>
            <Controller
              name="projectTitle"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter project title"
                  fullWidth
                  margin="normal"
                  error={!!errors.projectTitle}
                  helperText={errors.projectTitle?.message}
                  FormHelperTextProps={{
                    sx: {
                      marginLeft: "0",
                    },
                  }}
                />
              )}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 600 }}>Role *</Typography>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  placeholder="Enter role"
                  fullWidth
                  margin="normal"
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  FormHelperTextProps={{
                    sx: {
                      marginLeft: "0",
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
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ mt: 4, fontWeight: 600 }}>
            Skills used in Project
          </Typography>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                margin="normal"
                placeholder="Press Enter to add skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillAdd}
                error={Boolean(errorSkill)}
                helperText={errorSkill || errors.skills?.message}
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

        <Box sx={{ mt: 5 }}>
          <Typography sx={{ fontWeight: 600 }}>Project Summary *</Typography>
          <Controller
            name="projectSummary"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder="Enter project summary"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                inputProps={{ maxLength: 2500 }}
                sx={{
                  "& .MuiInputBase-input": {
                    height: "auto",
                    "&::-webkit-scrollbar": {
                      width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#888",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: "#555",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f1f1f1",
                      borderRadius: "4px",
                    },
                  },
                }}
              />
            )}
          />
          {errors.projectSummary && (
            <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
              {errors.projectSummary.type === "required"
                ? REQUIRED_FIELD_ERROR
                : WHITE_SPACE_ERROR}
            </Typography>
          )}
        </Box>
        <Box>
          <Box>
            <ProfileDrawer.Footer>
              {isEditModeProject ? (
                <Button
                  variant="outlined"
                  onClick={handleDeleteModalClick}
                  // disabled={!filteredSkill}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={closeDrawer}
                  data-testid="cancel-btn"
                >
                  Cancel
                </Button>
              )}

              <Button type="submit" variant="contained">
                Save
              </Button>
            </ProfileDrawer.Footer>
          </Box>
        </Box>
      </form>
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={deleteProject}
        message={DELETE_PROJECTS_MESSAGE}
        confirmMessage={DELETE_PROJECT_CONFIRMATION}
      />
    </Box>
  );
}

export default ProjectForm;

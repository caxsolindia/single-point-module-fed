import { useState, useEffect } from "react";
import { Box, Stack, Typography, IconButton, Chip } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import IconBox from "./IconBox.tsx";
import {
  BriefCaseIcon,
  BulbIcon,
  CalendarIcon,
  EditIcon,
} from "../../../assets/Icon/Icon.tsx";
import { useGetProject } from "../Shared/GraphqlQueries/UserProfile.ts";
import { Project, useUserProjectStore } from "../../../Store/ProjectStore.ts";
// import ProjectListSkeleton from "./CustomSkeleton.tsx"; // Import the skeleton component
import { useUserDataStore } from "../../../Store/UserDateStore.ts";
import { useProfileCardStore } from "../../../Store/ProfileCardStore.ts";

export interface ProjectListProps {
  isExpanded: boolean;
  // onEditClick: (id: string | null | undefined) => void;
}

function ProjectList({ isExpanded }: Readonly<ProjectListProps>) {
  const { theme } = useThemeContext();
  const { TEXT_PRIMARY, TEXT_SECONDARY } = useThemeConstant({ theme });
  const [, setLoading] = useState(true);
  const { userId } = useUserDataStore(); // Get userId from Zustand

  const { userProject, setUserProject, setProjectIdSelected } =
    useUserProjectStore(); // Access Zustand store for projects
  const { loadProject, data } = useGetProject(userId); // Fetch projects from backend
  const { openDrawer } = useProfileCardStore();

  const handleProjectsDrawer = (
    id: string,
    projectId: string | null | undefined,
  ) => {
    if (projectId) {
      openDrawer(id);
      setProjectIdSelected(projectId);
    }
  };

  useEffect(() => {
    if (userId) {
      loadProject();
    }
  }, [loadProject, userId]);

  const userProjects = data?.getUserProjects?.data;

  useEffect(() => {
    if (userProjects) {
      const updatedValue = userProjects?.map((userProjectData) => {
        if (userProject) {
          return {
            userId: userProjectData?.projectId ?? null,
            projectId: userProjectData?.projectId ?? null,
            projectTitle: userProjectData?.projectTitle ?? null,
            role: userProjectData?.role ?? null,
            projectSummary: userProjectData?.projectSummary ?? null,
            startDate: userProjectData?.startDate ?? null,
            endDate: userProjectData?.endDate ?? null,
            userSkills: userProjectData?.userSkills ?? null,
          };
        }
        return null;
      });
      setUserProject(updatedValue);
    }
  }, [userProjects, setUserProject]);

  const projectData = userProject?.map((project: Project | null) => ({
    userId: project?.userId,
    projectId: project?.projectId,
    projectTitle: project?.projectTitle,
    role: project?.role,
    projectSummary: project?.projectSummary,
    startDate: project?.startDate,
    endDate: project?.endDate,
    userSkills: project?.userSkills,
    icons: [BriefCaseIcon, CalendarIcon, BulbIcon],
  }));

  const projectsToRender = isExpanded ? projectData : projectData?.slice(0, 1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {
        // loading ? (
        //   <ProjectListSkeleton count={1} data-testid="project-list-skeleton" /> // Render skeletons while loading
        // ) :
        (projectsToRender ?? []).map((userProjectRender) => (
          <Box
            key={userProjectRender?.projectId}
            sx={{
              width: "100%",
              borderRadius: "8px",
              padding: "16px",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}
            >
              <Box sx={{ display: "flex", ml: 0 }}>
                <Box sx={{ marginRight: "16px", padding: "1px" }}>
                  <IconBox Icon={userProjectRender?.icons[0]} size="3.25rem" />
                </Box>
                <Box sx={{ width: "100%", mt: "2px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: TEXT_PRIMARY, fontWeight: 800 }}
                    >
                      {userProjectRender?.projectTitle}
                    </Typography>
                  </Box>

                  <Box mt={1}>
                    <Typography
                      variant="body1"
                      sx={{ color: TEXT_PRIMARY, fontWeight: "600" }}
                      display="inline"
                    >
                      Role -
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: TEXT_SECONDARY, marginLeft: "5px" }}
                      display="inline"
                    >
                      {userProjectRender?.role}
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <Typography
                      variant="body1"
                      sx={{ color: TEXT_PRIMARY, fontWeight: "600" }}
                      display="inline"
                    >
                      Responsibility -
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: TEXT_SECONDARY, marginLeft: "5px" }}
                      display="inline"
                    >
                      {userProjectRender?.projectSummary}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                ml: { xs: 0, sm: "2px" },
                flexWrap: "nowrap",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: TEXT_PRIMARY,
                  fontWeight: "800",
                  ml: 0,
                  mb: 0,
                }}
              >
                Skills Used
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  padding: "10px",
                  ml: { xs: 0, sm: 2 },
                  mt: { xs: 2, sm: 0 },
                }}
              >
                {userProjectRender?.userSkills?.map((skill: string | null) => (
                  <Chip
                    key={skill}
                    label={skill || "N/A"}
                    sx={{
                      padding: "10px",
                      border: "1px solid purple",
                      borderRadius: "25px",
                      backgroundColor: "#ffffff",
                      color: "black",
                      fontWeight: "500",
                      margin: "5px",
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 2, ml: 0 }}
            >
              <Box sx={{ display: { xs: "flex" } }}>
                <Typography
                  variant="body1"
                  sx={{ color: TEXT_PRIMARY, fontWeight: 700 }}
                >
                  Starting Date -
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: TEXT_SECONDARY, ml: { xs: 2 } }}
                >
                  {userProjectRender?.startDate}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{
                  color: TEXT_SECONDARY,
                  display: { xs: "none", sm: "block" },
                }}
              >
                |
              </Typography>
              <Box sx={{ display: { xs: "flex" } }}>
                <Typography
                  variant="body1"
                  sx={{ color: TEXT_PRIMARY, fontWeight: 700 }}
                >
                  Completion Date -
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: TEXT_SECONDARY, ml: { xs: 2 } }}
                >
                  {userProjectRender?.endDate}
                </Typography>
              </Box>
            </Stack>

            {/* {isExpanded && ( */}
            <IconButton
              onClick={() =>
                handleProjectsDrawer("06", userProjectRender?.projectId)
              }
              sx={{
                position: "absolute",
                top: "16px",
                right: "0px",
              }}
            >
              <EditIcon />
            </IconButton>
            {/* )} */}
          </Box>
        ))
      }
    </Box>
  );
}
export default ProjectList;

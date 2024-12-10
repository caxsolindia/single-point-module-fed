import { useEffect } from "react";
import { Box, IconButton, Stack, styled, Typography } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import IconBox from "./IconBox.tsx";

import {
  BriefCaseIcon,
  BulbIcon,
  CalendarIcon,
  EditingIcon,
  GpsIcon,
} from "../../../assets/Icon/Icon.tsx";
import {
  ExperienceResponse,
  useCompanyStore,
} from "../../../Store/ExperienceStore.ts";
import { useUserDataStore } from "../../../Store/UserDateStore.ts";
import { useGetExperience } from "../Shared/GraphqlQueries/UserProfile.ts";

interface ExperimentContentProps {
  isExpanded: boolean;
  onEditClick: (experience: ExperienceResponse) => void;
}

function ExperienceContent({
  isExpanded,
  onEditClick,
}: Readonly<ExperimentContentProps>) {
  const { userId } = useUserDataStore();
  const { theme } = useThemeContext();
  const { TEXT_PRIMARY, TEXT_SECONDARY, GRAY_MAIN } = useThemeConstant({
    theme,
  });

  const { setViewExperience } = useCompanyStore();

  const { loadExperience, data } = useGetExperience(userId);

  useEffect(() => {
    if (userId) {
      loadExperience();
    }
  }, [loadExperience, userId]);

  const viewExperience = data?.getPreviousCompany?.companies;

  useEffect(() => {
    if (viewExperience) {
      const updatedValue = viewExperience?.map((experience) => {
        if (experience) {
          return {
            id: experience?.id,
            companyName: experience?.companyName,
            designation: experience?.designation,
            startDate: experience?.startDate,
            endDate: experience?.endDate,
            country: experience?.country,
            state: experience?.state,
            locationType: experience?.locationType,
            employmentType: experience?.employmentType,
            jobSummary: experience?.jobSummary,
            skill: experience?.skill,
          };
        }
        return null;
      });
      setViewExperience(updatedValue);
    }
  }, []);

  const experienceData = viewExperience?.map(
    (experience: ExperienceResponse | null) => ({
      id: experience?.id ?? "",
      designation: experience?.designation ?? "",
      companyName: experience?.companyName ?? "",
      employmentType: experience?.employmentType ?? "",
      jobSummary: experience?.jobSummary ?? "",
      startDate: experience?.startDate ?? "",
      endDate: experience?.endDate ?? "",
      state: experience?.state ?? "",
      country: experience?.country ?? "",
      skill: experience?.skill ?? [],
    }),
  );

  const experiencesToRender = isExpanded
    ? experienceData
    : experienceData?.slice(0, 1);

  const Item = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    columnGap: "16px",
    position: "relative",
    paddingBottom: "35px",
    "&:not(:last-child)::after": {
      content: '""',
      position: "absolute",
      left: "19px",
      top: "58%",
      height: "32px",
      width: "3px",
      backgroundImage: `linear-gradient(to bottom, ${GRAY_MAIN} 50%, transparent 50%)`,
      backgroundSize: "2px 9px",
      backgroundRepeat: "repeat-y",
    },
  }));
  return (
    <Box sx={{ width: "100%" }}>
      {experiencesToRender?.map((experience) => (
        <Box
          mb={4}
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
          key={experience?.id}
        >
          <Box sx={{ display: "flex", columnGap: 3 }}>
            <Box>
              <IconBox size="3.25rem" Icon={BriefCaseIcon} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                mb={1}
                sx={{ color: TEXT_PRIMARY, fontWeight: "600" }}
              >
                {experience?.designation}
              </Typography>
              <Box mb={2} sx={{ display: "flex" }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: TEXT_SECONDARY,
                    marginRight: "5px",
                    paddingRight: "15px",
                    borderRight: `3px solid ${GRAY_MAIN}`,
                  }}
                >
                  {experience?.companyName}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: TEXT_SECONDARY, marginLeft: "15px" }}
                >
                  {experience?.employmentType}
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography
                  color={TEXT_PRIMARY}
                  sx={{ fontWeight: "600", lineHeight: "29px" }}
                  maxWidth={1190}
                >
                  Job Responsibility -
                  <Typography
                    variant="soft"
                    color={TEXT_SECONDARY}
                    sx={{ fontWeight: "400", marginLeft: "10px" }}
                  >
                    {experience?.jobSummary}
                  </Typography>
                </Typography>
              </Box>
              <Stack>
                <Item>
                  <IconBox size="2.5rem" Icon={CalendarIcon} />
                  <Typography variant="body1">
                    {experience?.startDate} - {experience?.endDate}
                  </Typography>
                </Item>
                <Item>
                  <IconBox size="2.5rem" Icon={GpsIcon} />
                  <Typography variant="body1">
                    {experience?.state} , {experience?.country}
                  </Typography>
                </Item>
                <Item>
                  <IconBox size="2.5rem" Icon={BulbIcon} />
                  <Typography variant="body1">
                    {experience?.skill?.join(",")}
                  </Typography>
                </Item>
              </Stack>
            </Box>
          </Box>
          {isExpanded && (
            <Box>
              <IconButton
                onClick={() => onEditClick(experience)}
                sx={{ padding: 0 }}
              >
                <EditingIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default ExperienceContent;

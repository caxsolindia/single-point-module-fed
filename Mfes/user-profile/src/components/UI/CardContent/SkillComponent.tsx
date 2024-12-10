import { Box, Typography, Chip } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import { useEffect, useState } from "react";
import SkillLevel from "./SkillLevel.tsx";
import { useProfileStore } from "../../../Store/ProfileStore.ts";
import { useUserSkillStore } from "../../../Store/UserSkillStore.ts";

import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";
import { useUserDataStore } from "../../../Store/UserDateStore.ts";
import { GetSkillComponent } from "../Shared/GraphqlQueries/UserProfile.ts";
import {
  mapProficiencyToLevel,
  mapUserSkills,
} from "../Shared/CommonFunctions.ts";

export const skills = [
  { id: "skill1", name: "JavaScript", level: 3 },
  { id: "skill2", name: "React", level: 3 },
  { id: "skill3", name: "TypeScript", level: 2 },
  { id: "skill4", name: "HTML", level: 4 },
  { id: "skill5", name: "CSS", level: 3 },
  { id: "skill6", name: "Angular", level: 1 },
  { id: "skill7", name: "Java", level: 3 },
  { id: "skill8", name: "Problem Solving", level: 5 },
  { id: "skill9", name: "User Interface Design", level: 4 },
  { id: "skill10", name: "Figma", level: 2 },
  { id: "skill11", name: "Communication", level: 4 },
  { id: "skill12", name: "Communication", level: 4 },
  { id: "skill13", name: "Communication", level: 4 },
];

function SkillComponent() {
  const { userId } = useUserDataStore();
  const { getUserSkills, data } = GetSkillComponent(userId);
  const { userSkill, setUserSkill } = useUserSkillStore();
  const { expandedCardIds } = useProfileStore();
  const isExpanded = expandedCardIds.includes("04");
  const { theme } = useThemeContext();
  const { PRIMARY_LIGHT, PRIMARY_MAIN } = useThemeConstant({ theme });
  const [loading, setLoading] = useState(true);

  // get data from db
  useEffect(() => {
    if (userId) {
      getUserSkills();
    }
  }, []);

  // update zustand from this data
  useEffect(() => {
    if (data) {
      // create constant according to zustand store format for the fetched db data
      const updatedValue = mapUserSkills(data?.getUserSkills?.data);
      // storing in zustand
      setUserSkill(updatedValue);
      if (!userSkill) {
        const timer = setTimeout(() => setLoading(false), 5000);
        if (userSkill) clearTimeout(timer);
      }
      setLoading(false);
    }
  }, [data]);

  const skillData = userSkill
    ?.map((skill) => {
      if (!skill) return null;

      return {
        id: skill.userId,
        skillId: skill.skillId,
        name: skill.skillName,
        experience: skill.experienceInYears
          ? Number(skill.experienceInYears)
          : 0,
        category: skill.skillCategory,
        proficiency: skill.proficiency,
        level: mapProficiencyToLevel(skill.proficiency),
      };
    })
    .filter(Boolean);
  const skillsToShow = isExpanded ? skillData : skillData?.slice(0, 20);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        Data is Loading
      </Box>
    );
  }

  return (
    <Box>
      {skillsToShow?.map((skill) => (
        <Chip
          key={skill?.skillId}
          label={
            <Box display="flex" alignItems="center">
              <SkillLevel level={skill?.level} data-testid="skill-level" />
              <Typography
                variant="body2"
                sx={{ py: 1 }}
                data-testid="skill-name"
              >
                {skill?.name}
              </Typography>
            </Box>
          }
          variant="outlined"
          sx={{
            mb: 2,
            ml: 3,
            minHeight: "40px",
            height: "100%",
            borderRadius: 5,
            "&:hover": {
              bgcolor: PRIMARY_LIGHT,
              "& .MuiTypography-root": {
                color: PRIMARY_MAIN,
              },
            },
          }}
          data-testid="skill-chip"
        />
      ))}
    </Box>
  );
}

export default SkillComponent;

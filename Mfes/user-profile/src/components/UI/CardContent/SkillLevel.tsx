import { Box } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";

interface SkillLevelProps {
  level: number | undefined;
}

function SkillLevel({ level }: Readonly<SkillLevelProps>) {
  const { theme } = useThemeContext();
  const { PRIMARY_MAIN, GRAY_MAIN } = useThemeConstant({ theme });

  // Set level to 0 if it's null
  const displayedLevel = level ?? 0;

  return (
    <Box display="flex" mr={1}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          sx={{ width: "3px", height: "15px", mx: 0.25 }}
          bgcolor={index < displayedLevel ? PRIMARY_MAIN : GRAY_MAIN}
          data-testid={index < displayedLevel ? "filled-bar" : "unfilled-bar"}
        />
      ))}
    </Box>
  );
}

export default SkillLevel;

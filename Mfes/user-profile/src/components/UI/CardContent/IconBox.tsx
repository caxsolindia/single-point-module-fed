import { ElementType } from "react";
import { Box } from "@mui/material";
import useThemeConstant from "styleguide/ThemeConstants";
import { useThemeContext } from "../../../ThemeContext/ThemeContext.tsx";

interface IconBoxProps {
  Icon: ElementType;
  size?: string;
}

function IconBox({ Icon, size = "3.25rem" }: Readonly<IconBoxProps>) {
  const { theme } = useThemeContext();
  const { GRAY_MAIN } = useThemeConstant({ theme });

  return (
    <Box
      data-testid="icon-box"
      sx={{
        background: GRAY_MAIN,
        height: size,
        width: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        padding: "9px",
      }}
    >
      <Icon />
    </Box>
  );
}

export default IconBox;

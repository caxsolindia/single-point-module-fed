import { ReactNode } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";

function CardHeader({
  title,
  icon,
}: Readonly<{ title: string; icon: ReactNode }>) {
  return (
    <Box mb={3}>
      <Box sx={{ p: 4, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{title}</Typography>
        <Stack>
          <Stack>{icon}</Stack>
        </Stack>
      </Box>
      <Divider sx={{ borderWidth: 1 }} />
    </Box>
  );
}

export default CardHeader;

import { CircularProgress, Box } from "@mui/material";

function Loader() {
  return (
    <Box data-testid="loader-container" display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}

export default Loader;

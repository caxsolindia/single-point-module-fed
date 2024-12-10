import { createTheme } from "@mui/material";

const useThemePalette = () => ({
  theme: createTheme({
    palette: {
      primary: {
        main: "#000",
      },
    },
  }),
});

export default useThemePalette;

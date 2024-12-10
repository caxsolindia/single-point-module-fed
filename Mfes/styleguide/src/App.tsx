import { ThemeProvider } from "@mui/material";
import ThemeSelector from "./Pages/ThemeSelector.tsx";
import useCustomTheme from "./Hooks/useCustomTheme.tsx";

function App() {
  const { theme } = useCustomTheme();
  return (
    <ThemeProvider theme={theme}>
      <ThemeSelector />
    </ThemeProvider>
  );
}

export default App;

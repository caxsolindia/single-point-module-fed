import { createTheme } from "@mui/material";

const theme = createTheme();

const themeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#730ba6",
      light: "#F1E6F6",
    },
    secondary: {
      main: "#fa794a",
      light: "#fdf0de",
    },
    success: {
      main: "#00d290",
      light: "#d6f8ed",
    },
    info: {
      main: "#57b9e0",
      light: "#57b9e019",
    },
    error: {
      main: "#d62828",
    },
    background: {
      default: "#ffffff",
    },
    gray: {
      main: "#c4c7cf",
      light: "#c4c7cf3a",
    },
    text: {
      primary: "#0d0b0e",
      secondary: "#838696",
      disabled: "#333333",
      white: "#ffffff",
      green: "#00d290",
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    fontWeightLight: 300, // Light font weight
    fontWeightRegular: 400, // Regular font weight
    fontWeightMedium: 500, // Medium font weight
    fontWeightBold: 700, // Bold font weight
    h4: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: "39px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "1.6rem",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1.2rem",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: "29px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "1.2rem",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "1rem",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.938rem",
      },
    },
    h6: {
      fontSize: "1.25rem",
      lineHeight: "24px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "1.15rem",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "0.938rem",
      },
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "18px",
      [theme.breakpoints.down("lg")]: {
        fontSize: "0.938rem",
      },
      [theme.breakpoints.down("md")]: {
        fontSize: "0.875rem",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.813rem",
      },
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: "#e6e6e6",
          borderStyle: "solid",
          borderWidth: 0,
          borderRadius: 8,
          padding: 24,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#c4c7cf",
          color: "#C4C7CF",
          border: "solid",
          borderWidth: 1,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          borderColor: "#cdcdcd",
          borderStyle: "solid",
          borderWidth: 1,
          borderRadius: 8,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          borderColor: "#c4c7cf",
          borderStyle: "solid",
          borderWidth: "1px",
          background: "#ffffff",
          borderRadius: "4px",
          padding: "10px",
          display: "inline-block",
        },
      },
    },
  },
});

export default themeOptions;

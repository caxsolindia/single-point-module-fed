export interface ThemePalette {
  palette: {
    mode: string;
    background: {
      default: string;
      paper: string;
    };
    primary: {
      main: string;
      dark: string;
      light: string;
      lightest: string;
    };
    secondary: {
      main: string;
      light: string;
    };
    success: {
      main: string;
      light: string;
    };
    info: {
      main: string;
      light: string;
    };
    error: {
      main: string;
    };
    gray: {
      main: string;
      light: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      white: string;
      green: string;
    };
    divider: string;
  };
}

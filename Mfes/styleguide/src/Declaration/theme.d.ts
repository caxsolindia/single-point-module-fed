declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    lightest?: string;
  }
  interface SimplePaletteColorOptions {
    lightest?: string;
  }
}
declare module "@mui/material/styles" {
  interface Palette {
    green?: Palette["primary"];
    gray?: Palette["primary"];
  }
  interface PaletteOptions {
    green?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }
}

export {};

declare module "@mui/material/styles" {
  interface TypeText {
    white: string;
    green: string;
  }
}

import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    custom?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#6EC9DB",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6ba08e",
    },
    error: {
      main: red.A400,
    },
    custom: {
      light: "#ffffff",
      main: "#f57c00",
      dark: "#ef6c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
});

export default theme;

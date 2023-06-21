/* istanbul ignore file */
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

const theme = (props?: any) => {
  const { panel_color } = props || {};
  return createTheme({
    typography: {
      fontFamily: "Montserrat !important",
      subtitle2: {
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "22px",
        lineHeight: "110%",
      },
      subtitle1: {
        fontSize: 20,
      },
      fontSize: 12,
      h6: {
        fontSize: "16px",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "14px",
            textTransform: "capitalize",
          },
        },
      },
    },
    palette: {
      primary: {
        main: panel_color ? panel_color : "#6EC9DB",
        contrastText: "#ffffff",
        light: "#eaf3ff",
      },
      secondary: {
        main: "#6BA08E",
        contrastText: "#ffffff",
      },
      error: {
        main: red.A400,
      },
      custom: {
        light: panel_color ? "#eaf3ff" : "#ffffff",
        main: "#f57c00",
        dark: "#ef6c00",
        contrastText: "rgba(0, 0, 0, 0.87)",
      },
    },
  });
};

export default theme;

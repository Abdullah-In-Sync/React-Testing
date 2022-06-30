import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#6EC9DB",
    },
    secondary: {
      main: "#6ba08e",
    },
    error: {
      main: red.A400,
    },
    custom: {
      light: '#ffffff',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    }
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingTop: "2px",
          paddingBottom: "2px"
        },
      },
    },
  },
});

export default theme;

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#6EC9DB',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        
        root: { paddingTop: "2px",
        paddingBottom: "2px",
          // "&.Mui-selected": {
          //   borderLeft: `5px solid #6EC9DB`
          // }
        }
      }
    }
  }
});

export default theme;
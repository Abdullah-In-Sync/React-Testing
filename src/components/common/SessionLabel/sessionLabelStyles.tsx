import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    content: {
      "& .sessionBox": {
        minWidth: 100,
        textAlign: "center",
        "& .MuiPaper-root": {
          background: "transparent",
          border: `1px solid ${theme.palette.primary.contrastText}`,
          padding: 4,
          color: theme.palette.primary.contrastText,
        },
      },
    },
  };
});

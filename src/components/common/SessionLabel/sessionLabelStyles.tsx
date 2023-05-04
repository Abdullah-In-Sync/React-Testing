import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
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
}));

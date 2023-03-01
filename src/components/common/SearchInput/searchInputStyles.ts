import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  searchWrapper: {
    "& .MuiInputAdornment-positionEnd": {
      cursor: "pointer",
    },
    "& .MuiFormControl-root": {
      [theme.breakpoints.down("lg")]: {
        marginBottom: 5,
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        marginBottom: 5,
        minWidth: 300,
      },
    },
  },
}));

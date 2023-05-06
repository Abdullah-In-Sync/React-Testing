import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
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
  };
});

import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const commonModalWrapperObj = (theme) => ({
  "& .MuiTypography-root": {
    background: theme.palette.primary.main,
    color: theme.palette.custom.light,
    textAlign: "center",
  },
  "& .MuiTypography-root .MuiBox-root ": {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 10,
    color: theme.palette.custom.light,
  },
  "& .MuiTypography-root .MuiBox-root button": {
    color: theme.palette.custom.light,
  },
  "& .MuiOutlinedInput-input": {
    padding: 10,
  },
  "& .MuiOutlinedInput-root": {
    fontSize: "unset",
    lineHeight: "unset",
    letterSpacing: "unset",
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
});

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    commonModalWrapper: commonModalWrapperObj(theme),
    modalC: {
      "& .MuiTypography-root": {
        background: theme.palette.primary.contrastText,
        color: theme.palette.primary.main,
        textAlign: "center",
        height: "auto",
        position: "relative",
      },
      "& .MuiTypography-root .MuiBox-root ": {
        position: "absolute",
        right: 0,
        top: 0,
        padding: 7,
        color: theme.palette.custom.light,
      },
      "& .MuiTypography-root .MuiBox-root button": {
        color: theme.palette.custom.light,
      },
      "& .MuiDialogContent-root": {
        padding: 0,
      },
    },
  };
});

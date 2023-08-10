import { makeStyles } from "@material-ui/core/styles";

const theme = {
  palette: {
    primary: {
      main: "#6EC9DB",
      contrastText: "#ffffff",
      light: "#eaf3ff",
    },
    secondary: {
      main: "#6BA08E",
      contrastText: "#ffffff",
    },

    custom: {
      light: "#ffffff",
      main: "#f57c00",
      dark: "#ef6c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    mode: "light",
  },
};

/* istanbul ignore next */
export const commonModalWrapperObj = () => ({
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

/* istanbul ignore next */
export const useStyles = makeStyles(() => {
  return {
    commonModalWrapper: commonModalWrapperObj(),
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

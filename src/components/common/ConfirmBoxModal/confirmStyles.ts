import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  modalC: {
    "& .MuiTypography-root": {
      background: theme.palette.primary.contrastText,
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
    "& h2 button": {
      color: theme.palette.primary.contrastText,
      background: theme.palette.primary.main,
      boxShadow: "unset",
      borderRadius: "unset",
      width: 30,
      height: 25,
      "& svg": {
        fontSize: 20,
      },
    },
    "& h2 button:hover": {
      color: theme.palette.primary.contrastText,
      background: theme.palette.primary.main,
    },
    "& .confirmBox": {
      textAlign: "center",
      "& .confirmBoxFirst": {
        "& svg": {
          fontSize: "5em",
          color: theme.palette.error.main,
        },
      },
      "& .confirmBoxSecond": {
        padding: "0px 10px 10px 10px",
        "& p": {
          fontWeight: 600,
        },
      },
      "& .confirmBoxThird": {
        paddingTop: 5,
      },
    },
  },
}));

import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  commonModalWrapper: {
    "& .MuiTypography-root": {
      background: theme?.palette?.primary?.main,
      color: theme?.palette?.custom?.light,
      textAlign: "center",
    },
    "& .MuiTypography-root .MuiBox-root ": {
      position: "absolute",
      right: 0,
      top: 0,
      padding: 10,
      color: theme?.palette?.custom?.light,
    },
    "& .MuiTypography-root .MuiBox-root button": {
      color: theme?.palette?.custom?.light,
    },
  },
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
}));

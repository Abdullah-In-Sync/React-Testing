import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";
import { commonModalWrapperObj } from "../../common/CustomModal/commonModalStyles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    tableWrapper: {
      "& .linkWithouDecoration": {
        color: theme.palette.primary.main,
        textDecoration: "none",
      },
    },
    header: {
      "& .uploadButtonWrapper": {
        textAlign: "right",
        "& button": {
          background: theme.palette.primary.main,
          "& svg": {
            fontSize: 15,
            color: theme.palette.primary.contrastText,
          },
        },
      },
    },
    modalWrapper: {
      "& .addUserFormWrapper": {
        paddingTop: 10,
        "& .crow": {
          padding: "7px 0px",
        },
        "& .row4": {
          textAlign: "center",
        },
        [theme.breakpoints.up("md")]: {
          "& .crow": {
            display: "flex",
            flex: 1,
            "& > .MuiBox-root:nth-child(1)": {
              paddingRight: 10,
            },
            "& .MuiBox-root": {
              width: "100%",
            },
          },
        },
        [theme.breakpoints.down("md")]: {
          "& .crow": {
            "& > .MuiBox-root:nth-child(1)": {
              marginBottom: 10,
            },
          },
        },
      },
      ...commonModalWrapperObj(),
    },
  };
});

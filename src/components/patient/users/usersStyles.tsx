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
    addUploadModalWrapper: {
      "& label": {
        fontWeight: 500,
        marginBottom: 5,
        display: "inline-block",
      },
      "& .chooseFileWrapper": {
        "& legend": {
          display: "contents",
        },
        "& .uploadButtonLabel": {
          display: "block",
          marginBottom: 5,
        },
        "& .MuiButton-outlined": {
          marginRight: 10,
        },
      },
      "& .addCategoryFormWrapper": {
        paddingTop: "20px !important",
      },
      "& .crow": {
        padding: "5px 0px",
      },
      "& .row3": {
        display: "flex",
        justifyContent: "space-between",
        "& .accToggleWrapper": {
          textAlign: "right",
          "& .accLabel": {
            display: "inline-block",
            marginRight: 10,
          },
          "& .MuiFormControlLabel-root": {
            margin: 0,
          },
        },
      },
      "& .row5": {
        textAlign: "center",
      },

      ...commonModalWrapperObj(),
    },
  };
});

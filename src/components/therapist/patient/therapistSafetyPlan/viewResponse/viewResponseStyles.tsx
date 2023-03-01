import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: {
    padding: "1rem 0rem",
    "& .bottomActionButtonsWrapper": {
      display: "flex",
      flexWrap: "wrap",
      flex: "1",
      justifyContent: "center",
      padding: "10px 0px",
      "& .MuiBox-root": {
        [theme.breakpoints.down("sm")]: {
          width: "100%",
          marginBottom: 10,
        },
        [theme.breakpoints.up("md")]: {
          padding: "0px 10px",
        },
      },
      "& .cancelButton": {
        background: theme.palette.secondary.main,
      },
      "& .MuiBox-root button": {
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
        [theme.breakpoints.down("md")]: {},
        [theme.breakpoints.up("lg")]: {
          width: "12em",
        },
      },
    },
    "& .fieldsBoxWrapperFirst": {
      "& .fieldBox": {
        "& button": {
          width: "unset",
        },
        textAlign: "right",
      },
      marginBottom: "1rem",
      "& .MuiBox-root": {
        marginBottom: "1rem",
      },
    },
  },
  resouceDetailBoxWrapper: {
    "& .buttonIconWrapper": {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    "& .inputsWrapper": {},
    "& .descriptionBoxWrapper": {
      "& label": {
        color: theme.palette.primary.main,
        fontWeight: "bold",
        fontSize: "1rem",
        paddingBottom: 3,
      },
      "& .MuiBox-root": {
        padding: 10,
        borderRadius: 10,
        border: "1px solid",
        borderColor: "#ccc",
      },
      "& .MuiBox-root p": {
        fonSize: "0.8rem",
        color: theme.palette.custom.contrastText,
      },
    },
  },

  safetyPlanListWrapper: {
    "& .Mui-expanded": {
      borderRadius: "16px 16px 0px 0px",
    },
    "& .MuiCollapse-entered": {
      border: `1px solid #ccc`,
      borderRadius: "0px 0px 16px 16px",
    },
    "& .active": {
      background: `${theme.palette.primary.main} !important`,
    },
  },
}));

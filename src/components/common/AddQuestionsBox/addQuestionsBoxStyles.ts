import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  questionsFieldsWrapper: {
    "& .deleteButtonWrapper": {
      display: "flex",
      flex: 1,
      justifyContent: "flex-end",
      marginBottom: "0.7rem",
    },
    "& .deleteButtonWrapper button": {
      marginRight: 10,
      color: theme.palette.custom.light,
      background: theme.palette.primary.main,
      width: 35,
      height: 0,
    },
    "& .deleteButtonWrapper button svg": {
      fontSize: "1.2rem",
    },
    "& .questionCard": {
      margin: "15px 0px",
      border: "1px solid #ccc",
      "& .autoCompleteWrapper .MuiAutocomplete-tag": {
        border: "1px solid #ccc",
        background: "#fff",
      },
    },
    "& .questionBoxWrapper": {
      padding: 10,
      "& .MuiBox-root": {
        paddingBottom: "1rem",
      },
      "& .selectChooseAnswerTypeWrapper": {
        [theme.breakpoints.up("md")]: {
          width: "25%",
        },
      },
    },
  },
}));

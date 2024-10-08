import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
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
      "& .questionResponseSection": {
        "& label p": {
          marginBottom: 5,
          fontWeight: 800,
          color: theme.palette.primary.main,
        },
        "& .radioAnswerWrapper": {
          "& .radios": {
            border: "1px solid #ccc",
            padding: "5px 15px",
            borderRadius: 7,
          },
        },
        "& .textAnswerWrapper": {},
      },
    },
  };
});

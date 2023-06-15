import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    questionsFieldsWrapper: {
      "& .questionCard": {
        boxShadow: "none",
        border: "1px solid #ccc",
        marginBottom: 10,
        "& .deleteButtonWrapper": {
          marginBottom: 10,
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
    },
    categoryQuestionsWrapper: {
      "& .row1": {
        textAlign: "right",
        marginBottom: 10,
      },
      "& .row2": {
        marginBottom: 10,
      },
      "& .row3": {
        textAlign: "center",
        "& button": {
          minWidth: 150,
        },
        "& button:first-child": {
          marginRight: 10,
        },
      },
    },
  };
});

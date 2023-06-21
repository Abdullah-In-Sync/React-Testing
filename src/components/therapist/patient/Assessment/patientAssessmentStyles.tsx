import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  const commonRow = {
    marginBottom: 5,
  };
  return {
    formWrapper: {
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
      "& .impTxt": {
        color: theme.palette.error.main,
      },
      padding: "20px 0 0 0",
      "& label": {
        fontSize: 15,
        fontWeight: "bold",
      },
      "& .form": {
        "& label": {
          fontSize: 12,
        },
        border: `1px solid #ccc`,
        padding: 10,
        borderRadius: 5,
        "& .formRow1": {
          ...commonRow,
        },
        "& .formRow2": {
          border: `1px solid #ccc`,
          borderRadius: 4,
          padding: 10,
          "& input": {
            height: 0.7,
          },
          "& .MuiOutlinedInput-root": {
            background: "#dadada52",
          },

          ...commonRow,
        },
        "& .formRow3": {
          display: "flex",
          "& input": {
            height: 0.7,
          },
          ...commonRow,
        },
        "& .formRow4": {
          textAlign: "center",
          paddingTop: 10,
          ...commonRow,
        },
      },
    },
    listTitleWrapper: {
      border: `1px solid ${theme.palette.primary.main}`,
      background: theme.palette.primary.main,
      borderRadius: 5,
      padding: 10,
      margin: "5px 0px 5px 0px",
      color: theme.palette.primary.contrastText,
      flexDirection: "row",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      "& .MuiBox-root": {
        display: "flex",
        alignItems: "center",
      },
      "& p": {
        color: theme.palette.primary.contrastText,
        fontWeight: "bold",
      },
    },
  };
});

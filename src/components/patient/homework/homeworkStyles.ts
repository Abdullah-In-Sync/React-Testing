import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    formBoxWrapper: {
      border: "1px solid",
      borderColor: theme.palette.secondary.main,
      borderRadius: "10px",
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
    label: {
      color: theme.palette.primary.main,
      fontSize: "1em",
      display: "block",
    },
    responseInputWrapper: {
      "& textarea": {
        width: "100%",
        background: "#dadada52",
        border: "0px solid #f3f3f3",
        resize: "vertical",
        padding: "6px 11px",
        fontSize: "1em",
        lineHeight: 1.42857143,
        borderRadius: 4,
      },
      "& textarea:focus-visible": {
        outline: "unset",
      },
    },
    questionWrapper: {
      minHeight: 130,
      border: "1px solid #f3f3f3",
      padding: "6px 11px",
      fontSize: "1em",
      lineHeight: 1.42857143,
      borderRadius: 4,
    },
    attachButtonWrapper: {
      padding: "10px 0px",
      textAlign: "right",
    },
    accordion: {
      border: `1px solid ${theme.palette.secondary.main}`,
      borderRadius: "10px",
      "& h6": {
        color: theme.palette.custom.light,
      },
    },
    accordionSummary: {
      background: theme.palette.secondary.main,
    },
    accordionDetails: {},
    saveButtonWrapper: {
      textAlign: "center",
      padding: "10px 0px",
    },
    saveButton: {
      paddingLeft: "50px",
      paddingRight: "50px",
    },
    headerWrapper: {
      display: "flex",
      flex: 1,
      justifyContent: "space-between",
      "& .MuiBox-root": {
        flex: 1,
        alignItems: "center",
        display: "flex",
      },
      "& .MuiFormControl-root": {
        width: "70%",
      },
    },
    accordionAddIcon: {
      color: theme.palette.custom.light,
    },
    attachIcon: {
      fontSize: "1.5em",
    },
    emptyText: {
      color: theme.palette.primary.main,
      textAlign: "center",
      fontWeight: "bold",
    },
  };
});

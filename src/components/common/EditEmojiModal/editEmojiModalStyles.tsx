import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    emojisPickerWrapper: {
      "& label": {
        fontWeight: "bold",
      },
      "& .epr-header": {
        display: "none",
      },
      "& .epr-emoji-category-label": {
        display: "none !important",
      },
      "& .emojis": {
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
        background: "#F5F5F5",

        // alignItems: "center",
        "& > div:first-child": {
          flex: 1,
          paddingLeft: 10,
          borderRadius: "5px 0px 0px 5px",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          display: "flex",
          alignItems: "center",
        },
        "& > div:nth-child(2)": {
          cursor: "pointer",
          padding: 10,
          background: theme.palette.secondary.main,
          color: theme.palette.primary.light,
          border: `1px solid ${theme.palette.secondary.main}`,
          display: "flex",
          alignItems: "center",
          borderRadius: "0px 5px 5px 0px",
        },
      },
      "& > div": {
        padding: "5px 0px",
      },
      "& .saveButtonWrapper": {
        paddingTop: 10,
        textAlign: "center",
      },
    },
  };
});

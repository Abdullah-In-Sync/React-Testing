/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    infoMessageBoxModal: {
      padding: 15,
      "& .boxFirst": {
        flexDirection: "column",
        padding: "10px 10px",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        "& .iconWrapper": {
          padding: 5,
          display: "flex",
          alignItems: "center",
          "& svg": {
            color: "red",
            fontSize: "2.7rem",
          },
        },
        "& .textWrapper": {
          "& h6": {
            color: "unset",
          },
        },
      },
      "& .duplicatesTable": {
        "& table": {
          "& tr:last-child": {
            "& td": {
              borderBottom: "1px solid",
            },
          },
          "& th": {
            borderLeft: "1px solid",
            borderTop: "1px solid",
            borderBottom: "1px solid",
            "& p": {
              color: "unset",
              fontWeight: "bold",
            },
          },
          "& th:last-child": {
            borderRight: "1px solid",
          },
          "& td": {
            borderLeft: "1px solid",
            fontWeight: 600,
          },
          "& td:last-child": {
            borderRight: "1px solid",
          },
        },
      },
      "& .okButtonWrapper": {
        textAlign: "center",
        position: "sticky",
        insetBlockEnd: 0,
        background: theme.palette.primary.contrastText,
        marginTop: 10,
        paddingBottom: 10,
      },
    },
  };
});

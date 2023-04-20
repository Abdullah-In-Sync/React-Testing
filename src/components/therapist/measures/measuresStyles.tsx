import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  measuresWrapper: {
    padding: 10,
    "& .topHeaderWrapper": {
      "& .topHeaderFirstSection": {
        "& h6": {
          fontWeight: "bold",
          color: theme.palette.primary.main,
        },
      },
      display: "flex",
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 10,
      "& button:first-child": {
        marginRight: 10,
      },
    },
    "& .measuresListWrapper": {
      "& .actionWrapper": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },

      "& .actionButton": {
        width: 32,
        height: 32,
        marginRight: 5,
        "& svg": {
          fontSize: 13,
        },
        background: theme.palette.custom.light,
        borderRadius: "50%",
        color: "black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      },

      "& .accordionDetailWrapper": {
        "& .detailFirst": {
          border: "1px solid",
          borderColor: theme.palette.secondary.main,
          padding: 13,
          marginBottom: 10,
          borderRadius: 5,
          textAlign: "center",
          color: theme.palette.secondary.main,
          h6: {
            fontWeight: "bold",
          },
        },
        "& .detailSecond": {
          "& .scoreButton": {
            marginRight: 10,
            backgroundColor: "#d8ecf0 !important",
            color: theme.palette.primary.main,
            fontWeight: "bold",
            boxShadow: "unset",
            "&:hover": {
              backgroundColor: "#d8ecf0",
            },
          },
        },
      },
    },
  },
}));

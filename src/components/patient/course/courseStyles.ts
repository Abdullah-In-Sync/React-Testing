import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: 15,
    "& .headerWrapper": {
      padding: "10px 10px",
      alignItems: "center",
      "& h4": {
        color: theme.palette.primary.main,
        fontWeight: "600",
      },
    },
    "& .boxWrapper": {
      alignItems: "center",
      justifyContent: "center",
      border: `1px solid ${theme.palette.primary.main}`,
      borderRadius: 10,
      padding: 10,
      "& .box": {
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
        [theme.breakpoints.up("md")]: {
          width: "80%",
        },

        "& .firstRow": {
          display: "flex",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        },
        "& .secondRow": {
          background: theme.palette.custom.light,
          borderRadius: 10,
          color: theme.palette.primary.main,
          padding: 15,
          margin: "10px",
          "& p": {
            fontSize: "0.8em",
            fontWeight: 600,
          },
        },
        "& .thirdRow": {
          display: "flex",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 10px",
          "& ul": {
            // padding: 10,
            "& li": {
              padding: "0px 20px",
            },
          },
        },
      },
    },
    "& .secondSection": {
      padding: 10,
      alignItems: "center",
      "& .secondSectionTextWrapper": {
        color: theme.palette.primary.main,
        padding: 10,
        "& p": {
          fontSize: "0.7em",
          fontWeight: 600,
        },
      },
      "& .secondSectionButtonWrapper": {
        display: "flex",
        padding: 10,
        "& .MuiBox-root:nth-child(2)": {
          [theme.breakpoints.up("md")]: {
            paddingLeft: 10,
          },
          "& button": {
            background: theme.palette.custom.light,
            color: theme.palette.primary.main,
          },
        },
        "& button": {
          borderRadius: 50,
          // padding: "10px 50px"
          width: "200px",
          textTransform: "capitalize",
          fontWeight: 600,

          [theme.breakpoints.down("md")]: {
            width: "90vw",
            marginBottom: 10,
          },
        },
        flexWrap: "wrap",
      },
    },
  },
}));

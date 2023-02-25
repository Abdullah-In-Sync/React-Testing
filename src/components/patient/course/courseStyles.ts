import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  container: {
    "& .headerWrapper": {
      padding: "20px 10px",
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
      padding: 20,
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
          padding: "20px 10px",
        },
        "& .secondRow": {
          paddingBottom: 20,
          background: theme.palette.custom.light,
          borderRadius: 10,
          color: theme.palette.primary.main,
          padding: 10,
          margin: "20px 10px",
          "& p": {
            fontSize: "0.8em",
          },
        },
        "& .thirdRow": {
          display: "flex",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: "20px 10px",
          "& ul": {
            padding: 10,
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
      },
      "& .secondSectionButtonWrapper": {
        display: "flex",
        padding: 10,
        "& .MuiBox-root:nth-child(2)": {
          paddingLeft: 10,
          "& button": {
            background: theme.palette.secondary.main,
            color: theme.palette.primary.main,
          },
        },
        "& button": {
          borderRadius: 50,
          // padding: "10px 50px"
          width: "200px",
          textTransform: "capitalize",
        },
      },
    },
  },
}));

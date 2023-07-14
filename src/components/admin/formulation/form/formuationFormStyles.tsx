import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    formWrapper: {
      marginBottom: 10,
      "& .rowc": {
        paddingBottom: 10,
      },
      "& .row1": {
        marginBottom: 5,
        display: "flex",
        [theme.breakpoints.up("sm")]: {
          flexDirection: "row",
          flex: 1,
          flexWrap: "wrap",
        },
        "& .col1": {
          [theme.breakpoints.up("sm")]: {
            display: "flex",
            flexDirection: "row",
            "& .nameInputWrapper": {
              marginRight: 10,
            },
          },
          flex: 1,
          "& .nameInputWrapper": {
            minWidth: 250,
            [theme.breakpoints.down("sm")]: {
              marginBottom: 15,
            },
          },
          "& .selectOrganisationWrapper": {
            minWidth: 250,
          },
        },
        "& .col2": {
          [theme.breakpoints.up("sm")]: {
            flex: 1,
          },
        },
      },
      "& .row2": {
        marginBottom: 5,
      },
      "& .row3": {
        marginBottom: 5,
      },
      "& .row5": {
        textAlign: "center",
      },
    },
    templateWrapper: {
      "& .templateHeading": {
        "& h6": {
          color: theme.palette.primary.main,
          fontWeight: 500,
        },
        marginBottom: 5,
      },
    },
  };
});

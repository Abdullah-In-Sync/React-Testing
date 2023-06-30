/* istanbul ignore file */
import { makeStyles } from "@material-ui/core/styles";

import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    therapistHomeScreen: {
      padding: 10,
      "& .row1": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        "& .contactEmail": {
          color: theme.palette.primary.main,
          fontWeight: 500,
        },
      },
      "& .row2": {
        "& .header": {
          "& h6": {
            fontWeight: "bold",
            color: theme.palette.primary.main,
          },
        },
      },
      "& .row3": {
        "& .gridContainer": {
          "& .cardHeader": {
            "& span h6": {
              fontWeight: "bold",
            },
          },
          "& .headerAvatar": {
            background: theme.palette.primary.main,
          },
          "& .cardWrapper": {
            height: "100%",
            "& .card": {
              height: "100%",
              marginBottom: 10,
              marginRight: 10,
              borderRadius: 7,
            },
          },
        },
      },
    },
  };
});

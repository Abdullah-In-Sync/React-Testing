import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    addUserForm: {
      "& .row1": {
        [theme.breakpoints.up("md")]: {
          display: "flex",
          flex: 1,
          "& > div": {
            flex: 1,
            padding: 10,
          },
        },
        [theme.breakpoints.down("md")]: {
          "& > div": {
            paddingBottom: 10,
          },
        },
      },
      "& .bottomActionButtonsWrapper": {
        marginBottom: 20,
        [theme.breakpoints.up("md")]: {
          display: "flex",
          flex: 1,
          justifyContent: "center",
          "& > div": {
            padding: 10,
          },
        },
        [theme.breakpoints.down("md")]: {
          width: "100%",
          "& > div": {
            paddingBottom: 10,
            width: "100%",
            "& button": {
              width: "100%",
            },
          },
        },
      },
    },
    table: {
      minWidth: 650,
      "& thead tr th": {
        padding: "25px 0px",
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
      },
      "& .activeModule": {
        background: "rgba(110, 201, 219, 0.25)",
        height: 35,
        lineHeight: "35px",
      },
      "& tbody .MuiTableCell-alignCenter": {
        padding: 7,
      },
    },
    sticky: {
      position: "sticky",
      left: 0,
      background: "white",
      zIndex: 1,
    },
    stickyHeader: {
      position: "sticky",
      left: 0,
      zIndex: 999,
    },

    tablePaper: {
      "& .tableContainer": {
        maxHeight: "80vh",
      },
      padding: "10px 0px 10px 0px",
      "& table": {
        width: "100%",
        "& .rowMessageWrapper .stackMesage": {
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "70vh",
        },
        "& .planType": {
          textTransform: "capitalize",
        },
      },
      "& table td p": {
        fontWeight: 400,
      },
      "& table th p": {
        fontWeight: "bold",
      },
      "& .MuiTableContainer-root": {
        paddingBottom: 20,
        border: "1px solid",
        borderColor: theme.palette.secondary.main,
        borderRadius: 10,
      },
    },
  };
});

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { commonModalWrapperObj } from "../../../common/CustomModal/commonModalStyles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    profileContent: {
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
      padding: 10,
      "& .firstCol": {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      "& .secondCol": {
        flex: 3,
        padding: 10,
        margin: 10,
      },
    },
    formWrapper: {
      "& .row1": {},
      "& .crow": {
        padding: 7,
        display: "flex",
        width: "100%",

        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          "& div:nth-of-type(1)": {
            width: "100%",
            marginBottom: 7,
          },
        },

        "& div:nth-of-type(1)": {
          width: "100%",
          marginRight: 7,
        },
        "& div:nth-of-type(2)": {
          width: "100%",
        },
      },
      "& .accToggleWrapper": {
        textAlign: "center",
        "& .accLabel": {
          display: "inline-block",
          marginRight: 10,
        },
      },
      "& .chooseFileWrapper": {
        "& legend": {
          display: "contents",
        },
        "& .uploadButtonLabel": {
          display: "block",
          marginBottom: 5,
        },
        "& .MuiButton-contained": {
          background: "#ccc",
          color: "black",
          borderColor: "#ccc",
          marginRight: 10,
        },
      },
      [theme.breakpoints.up("md")]: {
        "& .fieldsBoxWrapperFirst": {
          display: "flex",
          "& > .chooseFileWrapper:nth-of-type(2)": {
            marginLeft: 10,
          },
        },
      },
      "& .fieldsBoxWrapperFirst": {
        "& legend": {
          color: "#6EC9DB",
        },
      },
    },
    editFormWrapper: {
      "& .formWrapper": {
        padding: "10px 0px",
      },
      "& label": {
        fontWeight: 500,
        marginBottom: 5,
        display: "inline-block",
      },
      "& .addCategoryFormWrapper": {
        paddingTop: "20px !important",
      },
      "& .row7": {
        textAlign: "center",
      },
      ...commonModalWrapperObj(),
    },
  };
});

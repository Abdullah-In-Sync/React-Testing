import { makeStyles } from "@material-ui/core/styles";
import { commonModalWrapperObj } from "../../../common/CustomModal/commonModalStyles";

export const useStyles = makeStyles(() => {
  return {
    profileContent: {
      display: "flex",
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
      "& .row5": {
        textAlign: "center",
      },
      ...commonModalWrapperObj(),
    },
  };
});

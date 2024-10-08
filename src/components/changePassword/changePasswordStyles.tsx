import { makeStyles } from "@material-ui/core/styles";
import { commonModalWrapperObj } from "../common/CustomModal/commonModalStyles";

export const useStyles = makeStyles(() => {
  return {
    changePasswordModalWrapper: {
      "& label": {
        fontWeight: 500,
        marginBottom: 5,
        display: "inline-block",
      },
      "& .changePasswordFormWrapper": {
        paddingTop: "10px !important",
        "& .inputWrapper": {
          marginTop: 15,
        },
      },
      "& .crow": {
        padding: "5px 10px",
      },
      "& .row2": {
        textAlign: "center",
        marginTop: 10,
      },
      ...commonModalWrapperObj(),
    },
  };
});

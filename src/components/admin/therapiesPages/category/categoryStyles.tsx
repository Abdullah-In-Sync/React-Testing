import { makeStyles } from "@material-ui/core/styles";
import { commonModalWrapperObj } from "../../../common/CustomModal/commonModalStyles";

export const useStyles = makeStyles(() => {
  return {
    addCategoryModalWrapper: {
      "& label": {
        fontWeight: 500,
        marginBottom: 5,
        display: "inline-block",
      },
      "& .addCategoryFormWrapper": {
        paddingTop: "20px !important",
      },
      "& .crow": {
        padding: "5px 0px",
      },
      "& .row2": {
        textAlign: "center",
      },
      ...commonModalWrapperObj(),
    },
  };
});

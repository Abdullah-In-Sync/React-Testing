import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/styles";
import { commonModalWrapperObj } from "../../../common/CustomModal/commonModalStyles";

export const useStyles = makeStyles(() => {
  const theme = useTheme() as Theme;
  return {
    viewWrapper: {
      "& .row1": {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      "& .row2": {
        "& .actionWrapper": {
          display: "flex",
          "& .actionButton ": {
            cursor: "pointer",
            height: 23,
            width: 23,
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            background: "#fff",
            borderRadius: "50%",
            marginRight: 10,
            "& svg": {
              fontSize: 15,
              color: "black",
            },
          },
        },
      },
    },
    addMonitorModalWrapper: {
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
      ...commonModalWrapperObj(theme),
    },
  };
});

import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  adminFeedbackTable: {
    "& table": {
      "& .MuiTableCell-head": {
        textAlign: "center",
        fontSize: "14px",
      },
      "& .MuiTableCell-body": {
        textAlign: "center",
      },
    },
  },
}));

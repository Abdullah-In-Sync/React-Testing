import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  adminFeedbackTable: {
    "& table": {
      "& .MuiTableCell-head": {
        textAlign: "center",
      },
      "& .MuiTableCell-body": {
        textAlign: "center",
      },
    },
  },
}));

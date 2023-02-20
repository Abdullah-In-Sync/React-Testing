import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  adminFeedbackValidationTable: {
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

import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  adminFeedbackValidationTable: {
    "& table": {
      "& .MuiTableHead-root": {
        textAlign: "center !important",
        backgroundColor: "#F5F5F5",
        "& th": {
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "17px",
          color: "#25282B",
          textAlign: "center",
        },
      },
      "& table, td, th": {
        border: " 1px solid #000000",
      },
      "& .MuiTableBody-root": {
        textAlign: "center",
        "& td": {
          fontSize: "14px",
          lineHeight: "17px",
          color: "#25282B",
          textAlign: "center",
        },
      },
    },
  },
}));

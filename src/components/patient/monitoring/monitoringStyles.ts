import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  accordion: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "15px !important",
    "& h6": {
      color: theme.palette.custom.light,
    },
  },
  accordionSummary: {
    borderRadius: "10px",
    background: theme.palette.secondary.main,
  },
  accordionDetails: {},
  saveButtonWrapper: {
    textAlign: "center",
    padding: "10px 0px",
  },
  accordionAddIcon: {
    color: theme.palette.custom.light,
  },
  attachIcon: {
    fontSize: "1.5em",
  },
  emptyText: {
    color: theme.palette.primary.main,
    textAlign: "center",
  },
  toolsButton: {
    marginRight: 10,
    backgroundColor: "#d8ecf0",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#d8ecf0",
    },
  },
  listTitleWrapper: {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 7,
    textAlign: "center",
    padding: 10,
    margin: "10px 0px 10px 0px",
    "& p": {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
  },
  listButtonsWrapper: {
    flexDirection: "row",
  },
}));

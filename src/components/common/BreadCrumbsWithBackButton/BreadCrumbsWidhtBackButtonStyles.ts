import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  backButtonBreadcrumbsWrapper: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0px",
    "& .nextButton": {
      marginLeft: 10,
    },
  },
});

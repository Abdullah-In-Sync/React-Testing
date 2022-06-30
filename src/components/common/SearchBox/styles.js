import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  searchBar: {
    padding: 0,
    display: "flex",
    alignItems: "center",
    width: 400,
    boxShadow: "none !important",
    border: "1px solid #ddd",
    borderRadius: "5px !important",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: "100%",
  },
  iconButton: {
    padding: 5,
    backgroundColor: theme.palette.primary.main,
    borderRadius: "0px 5px 5px 0",
    "&:hover": {
      background: theme.palette.primary.main,
    },
  },
  icon: {
    color: "#fff",
  },
}));

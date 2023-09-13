import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => {
  return {
    profileContent: {
      display: "flex",
      padding: 10,
      "& .firstCol": {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      },
      "& .formCard": {
        flex: 3,
        padding: 10,
        margin: 10,
      },
      "& .formWrapper": {
        "& .row1": {},
        "& .crow": {
          padding: 7,
          display: "flex",
          width: "100%",
          "& div:nth-of-type(1)": {
            width: "100%",
            marginRight: 7,
          },
          "& div:nth-of-type(2)": {
            width: "100%",
          },
        },
        "& .accToggleWrapper": {
          textAlign: "center",
          "& .accLabel": {
            display: "inline-block",
            marginRight: 10,
          },
        },
      },
    },
  };
});

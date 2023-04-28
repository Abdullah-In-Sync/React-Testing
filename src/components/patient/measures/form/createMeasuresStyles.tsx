import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => {
  const commonButtonWrapper = {
    display: "flex",
    flexWrap: "wrap",
    flex: "1",
    justifyContent: "center",
    padding: "10px 0px",
    "& .MuiBox-root": {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        marginBottom: 10,
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginBottom: 10,
      },
      [theme.breakpoints.up("md")]: {
        padding: "0px 10px",
      },
    },
    "& .cancelButton": {
      background: theme.palette.secondary.main,
    },
    "& .MuiBox-root button": {
      [theme.breakpoints.down("sm")]: {
        width: "100%",
      },
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      [theme.breakpoints.up("md")]: {
        width: "10em",
      },
      // [theme.breakpoints.down("md")]: {},
      // [theme.breakpoints.up("lg")]: {
      //   width: "10em",
      // },
    },
  };

  return {
    viewForm: {
      "& .autoCompeleteSessionWrapper": {
        "& .MuiAutocomplete-input": {
          padding: 0,
        },
        "& svg": {
          color: theme.palette.primary.contrastText,
        },
        "& label": {
          color: theme.palette.primary.contrastText,
        },
        "& input": {
          color: theme.palette.primary.contrastText,
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary.contrastText,
        },
        "& .MuiOutlinedInput-root.Mui-focused": {
          borderColor: theme.palette.secondary.main,
        },
      },
      "& .MuiToolbar-root": {
        justifyContent: "space-between !important",
        "& .MuiAutocomplete-root": {
          minWidth: 150,
        },
      },
      "& .bottomActionButtonsWrapper": commonButtonWrapper,
      paddingBottom: 20,
      "& > div:first-child": {
        border: "1px solid #ccc",
        borderRadius: 10,
      },
      "& .header-box": {
        border: "unset !important",
        padding: "unset !important",
        borderRadius: "unset !important",
      },
      "& .descBox": {
        padding: 10,
        border: "1px solid #ccc",
        borderRadius: 4,
        marginBottom: 5,
      },
      "& header": {
        "& .MuiToolbar-root": {
          justifyContent: "unset",
        },
        borderRadius: "7px !important",
      },
      "& .templateFromat1Wrapper": {
        "& .introSection": {
          "& .MuiPaper-root": {
            background: "#F3FEFA",
            "& textarea": {
              textAlign: "center",
            },
          },
        },
        "& .descriptionSection ": {
          "& .MuiPaper-root": {
            background: "#F3FEFA",
            "& textarea": {
              textAlign: "center",
            },
          },
        },
        "& .questionsSection": {
          "& .MuiPaper-root": {
            borderColor: theme.palette.primary.main,
          },
        },
        "& .scoreCardWrapper": {
          "& .scoreCard": {
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: 5,
          },
          "& .scoreCardTextWrapper": {
            paddingTop: "20px !important",
          },
          "& .rightArrowIconWrapper": {
            paddingTop: "20px !important",
          },
        },
      },
      "& .templateFromat2Wrapper": {
        "& .inputBox": {
          "& fieldset": {
            border: 0,
          },
        },
        "& .adminQuestions": {
          "& tbody": {
            "& td:nth-child(even)": {
              backgroundColor: "#E4FAFF !important",
            },
            "& td:nth-child(odd)": {
              backgroundColor: "#ECFCFF !important",
            },
          },
        },
      },
      "& .commonBorder": {
        border: "unset",
        padding: "unset",
        borderRadius: "unset",
      },
    },
  };
});

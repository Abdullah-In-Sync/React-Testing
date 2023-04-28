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
    formWrapper: {
      "& .fieldsBoxWrapperFirst": {
        "& .MuiBox-root": {
          paddingBottom: "1rem",
        },
      },
      "& .fieldsBoxWrapper": {
        paddingBottom: 10,
        display: "flex",
        [theme.breakpoints.down("sm")]: {},
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          marginBottom: "1rem",
        },
        [theme.breakpoints.up("lg")]: {},
      },
      "& .first": {
        flex: 1,
        "& .MuiBox-root": {
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            marginBottom: 10,
          },
          [theme.breakpoints.up("md")]: {
            flexDirection: "column",
            marginBottom: 10,
            width: "100%",
            "& .multiSelect": {
              maxWidth: 900,
            },
          },
          [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            marginBottom: 10,
            // width: "50%",
            width: "100%",
            "& .multiSelect": {
              maxWidth: 900,
            },
          },
          [theme.breakpoints.up("lg")]: {
            flex: 1,
            marginRight: "1rem",

            maxWidth: 250,
          },
          [theme.breakpoints.down("lg")]: {
            flex: 1,

            marginRight: "1rem",
            width: "100%",
            "& .multiSelect": {
              width: "100%",
            },
          },
        },
      },
      "& .second": {
        "& .selectFomatDropdown .MuiSelect-select": {
          minWidth: 70,
        },
        "& .formatsOpenModalButtonWrapper": {
          "& button": {
            color: theme.palette.secondary.main,
          },
          [theme.breakpoints.down("sm")]: {},
          [theme.breakpoints.down("md")]: {
            paddingBottom: 10,
          },
          [theme.breakpoints.up("lg")]: {
            paddingRight: 10,
          },
        },
        "& .MuiBox-root": {
          // flex: 2,
        },
        "& button": {
          height: 38,
        },
        [theme.breakpoints.down("sm")]: {},
        [theme.breakpoints.down("md")]: {
          justifyContent: "flex-end",
        },
        [theme.breakpoints.up("lg")]: {
          flex: 2,
          textAlign: "right",
          justifyContent: "flex-end",
        },
      },

      "& .fieldBox": {
        display: "flex",
        flexWrap: "wrap",
        [theme.breakpoints.down("sm")]: {},
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
        [theme.breakpoints.up("lg")]: {},
      },

      "& .bottomActionButtonsWrapper": commonButtonWrapper,
    },
    viewForm: {
      "& .MuiInputLabel-shrink": {
        top: "0 !important",
      },
      "& .autoCompeleteSessionWrapper": {
        "& .MuiAutocomplete-input": {
          padding: 0,
        },
        "& svg": {
          color: theme.palette.primary.contrastText,
        },
        "& label": {
          color: theme.palette.primary.contrastText,
          top: -10,
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

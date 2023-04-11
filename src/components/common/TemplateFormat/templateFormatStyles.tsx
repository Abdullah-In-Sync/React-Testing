/* istanbul ignore file */
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/system";

export const useStyles = makeStyles((theme: Theme) => ({
  templateFromat1Wrapper: {
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 10,
    "& .cSection": {
      padding: 5,
    },
    "& .introSection": {},
    "& .chooseScoreSection": {
      "& .scoreCard": {
        display: "flex",
        flex: 1,
        "& .scoreCardValue": {
          flex: 1,
          textAlign: "center",
          padding: "0px 5px",
          border: 0,
          "& .editableInputWrapper": {
            inlineSize: "70px",
            overflowWrap: "break-word",
            "& .makeStyles-editableInput-6": {
              fontSize: 14,
            },
          },
          "& .MuiFormControl-root": {
            "& .MuiOutlinedInput-root": {
              padding: 0,
              margin: 0,
              "& textarea": {
                textAlign: "center",
                fontSize: 13,
              },
              "& input": {
                border: 0,
                padding: 0,
              },
              "& fieldset": {
                border: 0,
              },
            },
          },
        },
      },
      "& .scoreCardWrapper": {
        overflow: "auto",
        padding: 10,
        border: "1px solid #ccc",
        borderRadius: 7,
        display: "flex",
        // alignItems: "center",
        "& .scoreCardTextWrapper": {
          paddingTop: 13,
        },
        "& .rightArrowIconWrapper": {
          paddingTop: 13,
          justifyContent: "center",
          // alignItems: "center",
          display: "flex",
        },
      },
    },
    "& .questionsSection": {
      "& .question": {
        padding: "5px 0px",
        "& .questionInputWrapper": {
          display: "flex",
          "& p": {
            paddingLeft: 5,
            display: "flex",
            alignItems: "center",
          },
        },
      },
      "& .addQuestionButtonWrapper": {
        textAlign: "right",
      },
      "& .inputPaper": {
        "& div:nth-child(1)": {
          flex: 5,
        },
        "& div:nth-child(2)": {
          flex: 1,
          display: "flex",
          alignItems: "center",
          width: 100,
        },
        "& .inputPaperSecondColumn": {
          // display: "flex"
          marginRight: 10,
          // marginRight: 5
        },
      },
      "& .selectOutline": {
        border: "1px solid #ccc",
        "& .MuiSelect-select": {
          padding: "3px 10px",
        },
      },
    },
    "& .wsasSection": {
      display: "flex",
      flex: 1,
      border: "1px solid #6EC9DB",
      borderRadius: 7,
      alignItems: "center",
      padding: 10,
      backgroundColor: "#ECFCFF",
      "& .MuiBox-root:nth-child(1)": {
        flex: 5,
        textAlign: "center",
        "& p": {
          fontWeight: "bold",
        },
      },
      "& .MuiBox-root:nth-child(2)": {
        flex: 1,
        "& .MuiPaper-root": {
          border: "1px solid #6EC9DB",
          width: 100,
          marginLeft: 5,
          textAlign: "center",
          "& p": {
            color: "#6EC9DB",
          },
        },
      },
    },
    "& .commonFieldWrapper": {
      "& .inputBox": {
        flex: 1,
      },
      "& fieldset": {
        border: "unset",
      },
      "& .css-nen11g-MuiStack-root": {
        width: "100%",
      },
    },

    "& .deleteButtonWrapper": {
      display: "flex",
      //   flex: 1,
      justifyContent: "flex-end",
      marginBottom: "0.7rem",
    },
    "& .deleteButtonWrapper button": {
      marginRight: 10,
      color: theme.palette.custom.light,
      background: theme.palette.primary.main,
      width: 35,
      height: 0,
    },
    "& .deleteButtonWrapper button svg": {
      fontSize: "1.2rem",
    },
  },
  templateFromat2Wrapper: {
    "& .adminQuestions": {
      "& .addQuestionButtonWrapper": {
        textAlign: "right",
        marginBottom: 5,
      },
      "& .tableContainer": {
        "& table": {
          minWidth: 800,
          "& thead": {
            "& th:first-child": {
              borderRadius: "10px 0 0 0",
              width: "37%",
            },

            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "& textarea": {
              color: theme.palette.primary.contrastText,
            },
            "& fieldset": {
              border: 0,
            },
            "& th:nth-child(even)": {
              backgroundColor: "#61C4D8",
            },
            "& th:not(:first-child)": {
              "& textarea": {
                textAlign: "center",
              },
            },
            "& th:last-child": {
              borderRadius: "0 10px 0 0",
              background: theme.palette.primary.main,
            },
          },
          "& tbody": {
            border: "1px solid rgba(224, 224, 224, 1)",
            "& tr:last-child": {
              "& td": {
                border: "none",
              },
            },
            "& fieldset": {
              border: 0,
            },

            "& tr": {
              "& td:nth-child(even)": {
                backgroundColor: "#f5f5f5",
              },
              "& td:not(:first-child)": {
                "& textarea": {
                  textAlign: "center",
                },
              },
              "& td:last-child": {
                background: "#fff",
              },
            },
          },
          "& tfoot": {
            borderRadius: 10,
            "& textarea": {
              textAlign: "center",
            },
            "&::before": {
              content: '"@"',
              display: "block",
              lineHeight: 2,
              textIndent: -99999,
            },
            "& tr": {
              border: "1px solid #6ec9db",
              background: "#ECFCFF",
              "& td:first-child": {
                "& textarea": {
                  color: theme.palette.primary.main,
                },
              },
              "& td:nth-child(even)": {
                backgroundColor: "#BFF5FF",
              },

              "& td:last-child": {
                background: "#ECFCFF",
              },
            },
            "& tr:first-child": {
              "& td": {
                border: 0,
              },
              "& td:first-child": {},
              "& td:last-child": {},
            },
            "& tr:last-child": {
              "& td": {
                border: 0,
              },
              "& td:first-child": {},
              "& td:last-child": {},
              "& td:nth-child(even)": {
                backgroundColor: "#BFF5FF !important",
              },
            },
            "& fieldset": {
              border: 0,
            },
          },
        },
      },
    },
    "& .optionsSection": {
      "& .radiosWrapper": {
        display: "flex",
        flex: 1,
      },
      "& .radioWrapper": {
        "& label": {
          marginLeft: 0,
          marginRight: 0,
        },
        textAlign: "center",
        flex: 1,
        "& .inputBox": {
          "& textarea": {
            textAlign: "center",
          },
          "& fieldset": {
            border: 0,
          },
        },
        "& .radioInputBox .MuiOutlinedInput-root": {
          paddingBottom: 0,
        },
      },
    },
    "& .deleteButtonWrapper": {
      display: "flex",
      //   flex: 1,
      justifyContent: "flex-end",
      marginBottom: "0.7rem",
    },
    "& .deleteButtonWrapper button": {
      marginRight: 10,
      color: theme.palette.custom.light,
      background: theme.palette.primary.main,
      width: 35,
      height: 0,
    },
    "& .deleteButtonWrapper button svg": {
      fontSize: "1.2rem",
    },
  },
  formatImagesBoxModal: {
    alignItems: "center",
    "& .headingTextWrapper p": {
      color: "unset",
    },
    "& .imagesWrapper": {
      "& .imageWrapper": {
        padding: 10,
        "& .image": {
          maxHeight: 300,
        },
      },
      display: "flex",
    },
  },
  modalC: {
    "& .MuiTypography-root": {
      background: theme.palette.primary.contrastText,
      color: theme.palette.primary.main,
      textAlign: "center",
      height: "auto",
      position: "relative",
    },
    "& .MuiTypography-root .MuiBox-root ": {
      position: "absolute",
      right: 0,
      top: 0,
      padding: 7,
      color: theme.palette.custom.light,
    },
    "& .MuiTypography-root .MuiBox-root button": {
      color: theme.palette.custom.light,
    },
  },
}));

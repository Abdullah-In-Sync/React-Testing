import React, { useState } from "react";
import { Box, Divider, Fab, IconButton, InputBase, Paper, Stack, TextField } from "@mui/material";
import FormikTextField from "../FormikFields/FormikTextField";
import { TemplateFormat1Data } from "./templateFormatData";
import { useStyles } from "./templateFormatStyles"
import { Typography } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search';
import { FieldArray, FormikProps, Formik, ErrorMessage } from "formik";
import * as templateTypes from "./types"
import CommonButton from "../Buttons/CommonButton";
import DeleteSharp from "@mui/icons-material/DeleteSharp";
import { ArrowRightAlt } from "@mui/icons-material";
import ConfirmationModal from "../ConfirmationModal";
import FormikSelectDropdown from "../FormikFields/FormikSelectDropdown";
import ViewFormatsModal from "./ViewFomatsModal"
import EditableFormikInput from "../EditableFormikInput/EditableFormikInput";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type propTypes = {
  formikProps: FormikProps<templateTypes.TemplateData>;
};

export default function Format1({ formikProps }: propTypes) {
  const styles = useStyles();
  const { values, setFieldValue, resetForm, errors, touched  } = formikProps;

  console.log("error----->", errors )
  const { templateData } = values;
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    confirmObject: {
      description: "",
    },
  });

  const { data: { intro, scores } } = TemplateFormat1Data;


  const introSection = () => {

    if (templateData.intro === undefined)
      return null
    else
      return (
        <Box className="introSection commonFieldWrapper cSection">
          <Paper
            elevation={0}
            sx={{ p: '2px 4px', display: 'flex', border: "1px solid #ccc" }}
          >
            <FormikTextField
              name={`templateData.intro`}
              id={`templateData.intro`}
              placeholder={
                "Please type here"
              }
              fullWidth
              multiline
              hideError
            />

            {/* <IconButton type="button" sx={{ p: '10px' }} >
        <SearchIcon />
      </IconButton> */}
            {deleteButton({
              i: 0, onDelete: () => {
                delete templateData.intro;
                resetForm({
                 values
                });
              }
            })}
          </Paper>
          {touched.templateData && errors.templateData && errorMessage(errors.templateData.intro)}
        </Box>
      )
  }

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  ];
  const scaleTable = () => {
    return     <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          {/* <TableCell>Dessert (100g serving)</TableCell>
          <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell> */}

          <FieldArray name="scores">
          {() => templateData.scores.map((item, i) => {
            return <TableCell align="center">{item.label}</TableCell>})}
          </FieldArray>
        </TableRow>
      </TableHead>
      <TableBody>
     
          <TableRow
           
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >

{/* {() => templateData.scores.map((item, i) => {
            return <TableCell align="center">{item.label}</TableCell>})} */}
            {/* <TableCell component="th" scope="row">
              {row.name}
            </TableCell> */}

<FieldArray name="scores">
          {() => templateData.scores.map((item, i) => {
            return <TableCell align="right"  sx={{ width: 150 }}>
              <Box className="editableInputWrapper">
    <EditableFormikInput name={`templateData.scores.${i}.value`} value={templateData.scores[i]["value"]}/>
              </Box>
          </TableCell> })}
          </FieldArray>
      
          </TableRow>
  
      </TableBody>
    </Table>
  </TableContainer>
  }

  const scoreCard = () => {
    return <FieldArray name="scores">
      {() =>
        templateData.scores.map((item, i) => {
          const { label, value } = item;
          return (
            <Box className="scoreCardValue">
              <Box className="first">
              <label>
                <Typography>{label}</Typography>
              </label>
              </Box>
     
              <Divider />
          
              {/* <FormikTextField

                name={`templateData.scores.${i}.value`}
                id={`templateData.scores.${i}.value`}
                placeholder={
                  "Type"
                }
                size="small"
              /> */}
              <Box className="editableInputWrapper">
              <EditableFormikInput name={`templateData.scores.${i}.value`} value={templateData.scores[i]["value"]}/>
              </Box>
            </Box>
          )
        })
      }
    </FieldArray>

    // return scaleTable()

  }

  const errorMessage = (errorMsg) => {
    return errorMsg && <Box>
    <Typography className="invalid-input-message">{ typeof errorMsg === "string" ? errorMsg :  `All value required`}</Typography>
  </Box>
  }

  const chooseScoreSection = () => {
    return (
      <Box className="chooseScoreSection cSection">
        <Box className="scoreCardWrapper">
          <Box className="scoreCardTextWrapper">
            <Typography>Choose your scores from</Typography>
          </Box>
          <Box className="rightArrowIconWrapper">
            <ArrowRightAlt />
          </Box>
          <Box className="scoreCard">
            {scoreCard()}
          </Box>
        </Box>
        {/* <ErrorMessage
        name={`templateData.scores.${0}.value`}
        component="div"
        className="invalid-input-message"
      /> */}

{/* templateData */}

{touched.templateData && errors.templateData && errorMessage(errors.templateData.scores)}

{/* {errors.templateData && <Box>
  <Typography className="invalid-input-message">All value required</Typography>
</Box>} */}


       
      </Box>
    )
  }

  const onAddQuesionBox = () => {
    console.log("ttt")
    // if (templateData.questions.length < 15) {
    const questions = [...templateData.questions];
    questions.push({ question: "" });
    setFieldValue("templateData.questions", questions);
    // } else {
    //   confirmModalRef.current?.open();
    // }
  }

  const deleteButton = ({ i, onDelete }) => {
    return (
      <Box className="deleteButtonWrapper">
        <Fab
          key={`deleteIconButton_${i}`}
          aria-label={`deleteIconButton_${i}`}
          data-testid={`iconButtonQuestion_${i}`}
          onClick={onDelete}
        >
          <DeleteSharp />
        </Fab>
      </Box>
    );
  };

  const removeQuestion = (i,) => {
    const questions = [...templateData.questions];
    questions.splice(i, 1);
    setFieldValue("templateData.questions", questions);
  };

  const questionsSection = () => {
    return (
      <Box className="questionsSection commonFieldWrapper cSection">
        <Box className="addQuestionButtonWrapper">
        <CommonButton variant="outlined" onClick={onAddQuesionBox}>Add Question</CommonButton>
        </Box>
        <FieldArray name="questions">
          {() =>
            templateData.questions.map((item, i) => {
              const { question } = item;
              return (
                <Box className="question">
                  <Paper
                    className="inputPaper"
                    elevation={0}
                    sx={{ p: '2px 4px', display: 'flex', border: "1px solid #ccc" }}
                  >
                  
                    <FormikTextField
                      name={`templateData.questions.${i}.question`}
                      id={`templateData.questions.${i}.question`}
                      placeholder={
                        "Please type question here"
                      }
                      fullWidth
                      multiline
                      hideError
                    />
                    
                 <Box>
                    <Box className="inputPaperSecondColumn">
                    <FormikSelectDropdown
                    value="1"
                    name="some"
                    options={[
                      {id: 1, value: "0"},
            
                    ]}
                    mappingKeys={["id", "value"]}
                    size="small"
                    className="selectOutline"
                    extraProps={{ "data-testid": "some" }}
                    disabled
                    fullWidth
                  />
                  </Box>
                
                    {deleteButton({ i, onDelete: () => handleDeleteQuestion(i) })}
                    </Box>
                    {/* <IconButton type="button" sx={{ p: '10px' }} >
            <SearchIcon />
          </IconButton> */}
                  </Paper>
                  {touched?.templateData?.questions[i] &&errors?.templateData?.questions[i] && errorMessage(errors.templateData.questions[i]["question"])}
                </Box>

              )
            })
          }
        </FieldArray>
      </Box>
    )
  }

  const wsasSection = () => {
    return (
      <Box className="cSection">
      <Box className="wsasSection">
        <Box>
          <Typography>Total WSAS Score</Typography>
        </Box>
        <Box>
          <Paper elevation={0}>
            <Typography>0</Typography>
          </Paper>
        </Box>
      </Box>
      <Box></Box>
      </Box>
    )
  }

  const descriptionSection = () => {

    if (templateData.description === undefined)
      return null
    else
      return (
        <Box className="descriptionSection commonFieldWrapper cSection">
          <Paper
            elevation={0}
            sx={{ p: '2px 4px', display: 'flex', border: "1px solid #ccc" }}
          >
            <FormikTextField
              name={`templateData.description`}
              id={`templateData.description`}
              placeholder={
                "Please type here"
              }
              fullWidth
              multiline
              hideError
            />
            {deleteButton({
              i: 0,
              onDelete: () => {
                delete templateData.description;
                resetForm({
                  values
                })
              }
            })}
          </Paper>
          {errors.templateData && errorMessage(errors.templateData.description)}
        </Box>
      )
  }

  const handleDeleteQuestion = (i) => {
    // const { questionId, callback: successDeleteCallback } = v;
    setIsConfirm({
      ...isConfirm,
      ...{
        status: true,
        confirmObject: {
          description: "Are you sure you want to delete the question?",
        },
        storedFunction: (callback) => {
          // callDeleteApi(questionId, successDeleteCallback, callback);
          removeQuestion(i)
          callback();
        },
      },
    });
  };

  const onConfirmSubmit = () => {
    isConfirm.storedFunction(() => {
      setIsConfirm({
        status: false,
        storedFunction: null,
        setSubmitting: null,
      });
    });
  };
  const clearIsConfirm = () => {
    /* istanbul ignore next */
    if (isConfirm.setSubmitting instanceof Function)
      isConfirm.setSubmitting(false);
    /* istanbul ignore next */
    setIsConfirm({
      status: false,
      storedFunction: null,
      setSubmitting: null,
      cancelStatus: false,
    });
  };

  return (
    <Stack className={styles.templateFromat1Wrapper}>
      {introSection()}
      {chooseScoreSection()}
      {questionsSection()}
      {wsasSection()}
      {descriptionSection()}

      {isConfirm.status && (
        <ConfirmationModal
          label={isConfirm.confirmObject.description}
          onCancel={clearIsConfirm}
          onConfirm={onConfirmSubmit}
        />
      )}
      
    </Stack>
  );
}

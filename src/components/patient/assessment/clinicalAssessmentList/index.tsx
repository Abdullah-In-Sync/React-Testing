import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useStyles } from "../style";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import { useMutation } from "@apollo/client";
import { UPDATE_PATIENT_ASSESSMENT } from "../../../../graphql/mutation/therapist";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../../common/ConfirmationModal";

type propTypes = {
  patientClinicalAssessmentList: any;
};

const PatientClinicalAssessmentList = (props: propTypes) => {
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const assessmentCatogeryData = props.patientClinicalAssessmentList;
  const [expanded, setExpanded] = useState<number | boolean>(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isConfirmCancel, setIsConfirmCancel] = useState(false);

  const [assessmentAnswerInputs, setAssessmentAnswerInputs] = useState([]);
  const [updateCatagoryId, setUpdateCatogoryId] = useState("");

  // Mutation
  const [updateAssessment] = useMutation(UPDATE_PATIENT_ASSESSMENT);

  const handleToggle = (index: number) => {
    if (index === -1) {
      setExpanded(true);
    } else if (index === -2) {
      setExpanded(false);
    } else if (expanded === index) {
      setExpanded(false);
    } else {
      setExpanded(index);
    }
  };

  const handlePatientInputChange = (
    accordionIndex: number,
    questionIndex: number,
    value: string,
    Id: string
  ) => {
    const updatedInputs = [...assessmentAnswerInputs];
    const updatedIndex = accordionIndex * 1000 + questionIndex; // Unique index for each question
    updatedInputs[updatedIndex] = {
      question_id: Id,
      answer: value,
    };
    setAssessmentAnswerInputs(updatedInputs);
  };

  const handlerAddAndUpdate = async () => {
    try {
      await updateAssessment({
        variables: {
          category_id: updateCatagoryId,
          question: JSON.stringify(assessmentAnswerInputs),
        },
        onCompleted: () => {
          setIsConfirm(false);
          enqueueSnackbar("Assessment updated successfully!", {
            variant: "success",
          });
          setAssessmentAnswerInputs([]);
        },
      });
    } catch (e) {
      enqueueSnackbar("Something went wrong", { variant: "error" });
    }
  };

  const clearIsConfirmCancel = () => {
    setIsConfirm(false);
    setIsConfirmCancel(false);
  };

  const cancelFunction = () => {
    if (assessmentAnswerInputs.length) {
      setIsConfirmCancel(true);
    }
  };

  const cancelConfirm = () => {
    setAssessmentAnswerInputs([]);
    setIsConfirmCancel(false);
    enqueueSnackbar("Assessment canceled successfully!", {
      variant: "success",
    });
  };

  return (
    <>
      <Box>
        <Box className={styles.topButton}>
          <Box style={{ paddingRight: "10px" }}>
            <Button
              variant="outlined"
              onClick={() => handleToggle(-1)}
              data-testid="expand_button"
            >
              Expand all
            </Button>
          </Box>

          <Box>
            <Button
              variant="outlined"
              onClick={() => handleToggle(-2)}
              data-testid="collapse_button"
            >
              Collapse all
            </Button>
          </Box>
        </Box>

        {assessmentCatogeryData?.category?.map((data2, accordionIndex) => (
          <Box key={accordionIndex} style={{ marginBottom: "20px" }}>
            <Accordion
              data-testid={`accordian_test_${accordionIndex}`}
              expanded={expanded === true || expanded === accordionIndex}
              className={styles.accordianTop}
            >
              <AccordionSummary
                expandIcon={
                  expanded === true || expanded === accordionIndex ? (
                    <RemoveIcon className={styles.accordianIconButton} />
                  ) : (
                    <AddIcon className={styles.accordianIconButton} />
                  )
                }
                aria-controls={`panel${accordionIndex + 1}-content`}
                id={`panel${accordionIndex + 1}-header`}
                onClick={() => handleToggle(accordionIndex)}
              >
                <Typography className={styles.accordianName}>
                  {data2.name}
                </Typography>
              </AccordionSummary>
              <Box className={styles.accordianDetailsBorder}>
                <AccordionDetails
                  style={{
                    borderRadius: "0px, 0px, 10px, 10px ",
                  }}
                  className={styles.accordianDetails}
                >
                  {data2?.questions?.map((data, questionIndex) => (
                    <Box
                      key={questionIndex}
                      className={styles.accordianDetailsQuestionBorder}
                    >
                      <Box className={styles.accordianDetailsQuestionBox}>
                        <Typography
                          className={
                            styles.accordianDetailsQuestionBoxTypography
                          }
                        >
                          {data.question}
                        </Typography>
                      </Box>

                      <Grid item xs={12}>
                        <TextFieldComponent
                          required={true}
                          name="resource_name"
                          id="resource_name"
                          placeholder="Write your response here"
                          value={
                            assessmentAnswerInputs[
                              accordionIndex * 1000 + questionIndex
                            ]
                              ? assessmentAnswerInputs[
                                  accordionIndex * 1000 + questionIndex
                                ].answer
                              : data?.answer
                          }
                          onChange={(e) =>
                            handlePatientInputChange(
                              accordionIndex,
                              questionIndex,
                              e.target.value,
                              data._id
                            )
                          }
                          fullWidth={true}
                          inputProps={{
                            "data-testid": "resource_name",
                          }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                        />
                      </Grid>
                    </Box>
                  ))}

                  <Box className={styles.accordianDetailsSaveCancelButtonBox}>
                    <Grid item xs={6} style={{ paddingRight: "50px" }}>
                      <Button
                        type="submit"
                        className={styles.saveButton}
                        onClick={() => {
                          if (assessmentAnswerInputs.length) {
                            setUpdateCatogoryId(data2._id);
                            setIsConfirm(true);
                          } else {
                            enqueueSnackbar(
                              "Please answer at least one question",
                              {
                                variant: "error",
                              }
                            );
                          }
                        }}
                        variant="contained"
                        data-testid="submitFeedback1"
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                      <Button
                        data-testid="cancelFeedbackButton"
                        variant="contained"
                        className={styles.cancelButton}
                        onClick={cancelFunction}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Box>
                </AccordionDetails>
              </Box>
            </Accordion>
          </Box>
        ))}
      </Box>

      {isConfirm && (
        <ConfirmationModal
          label="Are you sure you want to submit the response?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handlerAddAndUpdate}
        />
      )}

      {isConfirmCancel && (
        <ConfirmationModal
          label="Are you sure you want to cancel the response without submitting?"
          onCancel={clearIsConfirmCancel}
          onConfirm={cancelConfirm}
        />
      )}
    </>
  );
};

export default PatientClinicalAssessmentList;

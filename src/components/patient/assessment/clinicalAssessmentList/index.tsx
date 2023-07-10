import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { useRouter } from "next/router";

type propTypes = {
  patientClinicalAssessmentList: any;
};

const PatientClinicalAssessmentList = (props: propTypes) => {
  const router = useRouter();
  const styles = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const assessmentCatogeryData = props.patientClinicalAssessmentList;

  const [expanded, setExpanded] = useState<number | boolean>(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isConfirmCancel, setIsConfirmCancle] = useState(false);
  const [apiResponseData, setApiResponseData] = useState([]);
  const [questionaries, setQuestionaries] = useState([]);
  const [updateCatagoryId, setUpdateCatogoryId] = useState("");

  useEffect(() => {
    setApiResponseData(assessmentCatogeryData?.category);
  }, [assessmentCatogeryData]);

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

  /* istanbul ignore next */
  const handlePatientInputChange = (
    categoryIndex,
    questionIndex,
    value,
    questionId
  ) => {
    const updatedData = JSON.parse(JSON.stringify(apiResponseData));

    const category = updatedData?.[categoryIndex];
    const question = category?.questions;

    const updatedQuestion = {
      ...question[questionIndex],
      answer: value,
    };

    question[questionIndex] = updatedQuestion;

    const questionData = [...questionaries];

    if (!questionaries.length && !questionData.length) {
      const data = {
        answer: updatedQuestion.answer,
        question_id: questionId,
      };
      questionData.push(data);
      questionaries.push(data);
    } else {
      let found = false;
      questionData.map((data) => {
        if (data.question_id === questionId) {
          data.answer = updatedQuestion.answer;
          found = true;
        }
      });

      if (!found) {
        const data = {
          answer: updatedQuestion.answer,
          question_id: questionId,
        };
        questionData.push(data);
      }

      setQuestionaries(questionData);
    }
    setApiResponseData(updatedData);
  };

  const handlerAddAndUpdate = async () => {
    const updatedData = JSON.parse(JSON.stringify(apiResponseData));
    const filteredQuestions = updatedData?.filter(
      (data) => data?._id === updateCatagoryId
    )[0]?.questions;

    const result = questionaries.filter((o1) =>
      filteredQuestions.some((o2) => o1.question_id === o2._id)
    );

    const updatedResult = JSON.stringify(result);

    try {
      await updateAssessment({
        variables: {
          // category_id: "cd9cd52d-15cf-4364-ad16-1ea751713431",
          category_id: updateCatagoryId,
          question: updatedResult,
        },
        onCompleted: () => {
          setIsConfirm(false);
          enqueueSnackbar("Assessment updated successfully!", {
            variant: "success",
          });
          setQuestionaries([]);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirm(false);
    setIsConfirmCancle(false);
  };

  /* istanbul ignore next */
  const cancleFunction = () => {
    if (questionaries.length) {
      setIsConfirmCancle(true);
    }
  };

  /* istanbul ignore next */
  const cancelConfirm = () => {
    router.reload();
    setIsConfirmCancle(false);
    enqueueSnackbar("Assessment cancel successfully!", {
      variant: "success",
    });
    // setExpanded(false);
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

        {apiResponseData?.map((data2, categoryIndex) => (
          <Box key={categoryIndex} style={{ marginBottom: "20px" }}>
            <Accordion
              data-testid={`accordian_test_${categoryIndex}`}
              expanded={expanded === true || expanded === categoryIndex}
              className={styles.accordianTop}
            >
              <AccordionSummary
                expandIcon={
                  expanded === true || expanded === categoryIndex ? (
                    <RemoveIcon className={styles.accordianIconButton} />
                  ) : (
                    <AddIcon className={styles.accordianIconButton} />
                  )
                }
                aria-controls={`panel${categoryIndex + 1}-content`}
                id={`panel${categoryIndex + 1}-header`}
                onClick={() => handleToggle(categoryIndex)}
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
                  {data2?.questions?.length ? (
                    data2.questions.map((data, questionIndex) => (
                      <Box
                        className={styles.accordianDetailsQuestionBorder}
                        key={data._id}
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
                            value={data?.answer}
                            onChange={(e) =>
                              handlePatientInputChange(
                                categoryIndex,
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
                    ))
                  ) : (
                    <Typography>No data found</Typography>
                  )}

                  {data2?.questions?.length ? (
                    <Box className={styles.accordianDetailsSaveCancelButtonBox}>
                      <Grid item xs={6} style={{ paddingRight: "50px" }}>
                        <Button
                          type="submit"
                          className={styles.saveButton}
                          onClick={() => {
                            /* istanbul ignore next */
                            if (questionaries.length) {
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
                          data-testid="cancleFeedbackButton"
                          variant="contained"
                          className={styles.cancelButton}
                          onClick={
                            /* istanbul ignore next */
                            cancleFunction
                          }
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Box>
                  ) : null}
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

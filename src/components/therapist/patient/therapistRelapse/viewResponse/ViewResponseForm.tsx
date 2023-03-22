import {
  Box,
  Button, Stack,
  Typography
} from "@mui/material";
import { Form } from "formik";
import React, { useRef, useState } from "react";
import AddQuestionsBox from "../../../../common/AddQuestionsBox";
import { useStyles } from "./viewResponseStyles";
// import { InitialFormValues } from "./types";

interface ViewProps {
  formikProps: any;
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
  isEditable?: boolean;
  planDescription?: string;
  questions?: object[];
}

const CommonForm: React.FC<ViewProps> = ({
  onPressCancel,
  formikProps,
  handleDeleteQuestion,
  isEditable,
  planDescription,
  questions
}) => {
  const [isEditView, setIsEditView] = useState();
  // const [isPatientResponse, setIsPatientResponse] = useState(false);
  const { values, isSubmitting } = formikProps;
  const { planId } = values;
  const questionFieldscRef = useRef(null);
  const styles = useStyles();

  console.log("planDescription+++++++",planDescription);

  const inputViewBox = ({ label, description }: any) => {
    return <Box className="inputDes">
      <label>
        <Typography>{label}</Typography>
      </label>
        <Box className="desBox">
          <Typography>{description}</Typography>
        </Box>
      </Box>;
  };

  const toggleEditView = (i) => {
    if (isEditView != i)
      setIsEditView(i)
    else
      setIsEditView(undefined)
  }

  // const ListAnswerType = (props?: any) => {
  //   const { options: answerValues = [], answer, row } = props || {};
  //   return (
  //     <RadioGroup {...row} className="radio-buttons" defaultValue={answer}>
  //       {(answerValues as Array<any>).map((option: string, index: number) => (
  //         <FormControlLabel
  //           key={`answerType_${index}`}
  //           data-testid={`answer_${index}`}
  //           value={option}
  //           control={<Radio />}
  //           label={option}
  //         />
  //       ))}
  //     </RadioGroup>
  //   );
  // };

  // const booleanAnswerType = (props) => {
  //   return <ListAnswerType row booleantype="true" {...props} />;
  // };

  // const answers = (item) => {
  //   const { relapse_ques_typeoption, relapse_ques_type, patient_answer } = item;

  //   switch (relapse_ques_type) {
  //     case "2":
  //       return (
  //         relapse_ques_typeoption &&
  //         booleanAnswerType({
  //           options: relapse_ques_typeoption
  //             .replace(/[\]']+/g, "")
  //             .split(/,+|"[^"]+"/g),
  //           answer: patient_answer,
  //         })
  //       );
  //     case "1":
  //       return inputViewBox({
  //         answer: patient_answer,
  //       });
  //     default:
  //       return null;
  //   }
  // };

  // const paitentResponse = () => {
  //   if (!questions) return null;

  //   return questions.map(
  //     (
  //       item: {
  //         patient_answer?: string;
  //         relapse_additional_details?: string;
  //         relapse_ques?: string;
  //       },
  //       i
  //     ) => {
  //       const { patient_answer, relapse_additional_details, relapse_ques } =
  //         item;
  //       // if (!isPatientResponse && patient_answer) setIsPatientResponse(true);

  //       return (
  //         patient_answer && (
  //           <Stack className={styles.resouceDetailBoxWrapper}>
  //             <Stack className="inputsWrapper">
  //               <Stack className="descriptionBoxWrapper">
  //                 <label className="label">{`${i + 1}. ${relapse_ques}`}</label>
  //                 {relapse_additional_details && (
  //                   <Typography
  //                     pl={1.7}
  //                     pb={0.7}
  //                   >{`${relapse_additional_details}`}</Typography>
  //                 )}
  //                 <Box>{answers(item)}</Box>
  //               </Stack>
  //             </Stack>
  //           </Stack>
  //         )
  //       );
  //     }
  //   );
  // };

  const handleAddQuestion = () => {
    questionFieldscRef.current.onAddQuesionBox();
  };

  return (
    <Stack className={styles.formWrapper}>
      <Form className={!isEditable ? "disbledFields" : ""}>
        <Box className="fieldsBoxWrapperFirst">
          {isEditable && (
            <Box className="fieldBox second">
              <Button
                onClick={handleAddQuestion}
                data-testid={`addNewQuestion_${planId}`}
                variant="outlined"
              >
                Add Question
              </Button>
            </Box>
          )}
          {planDescription && (
            <Stack className={styles.resouceDetailBoxWrapper}>
              <Stack className="inputsWrapper">
                {inputViewBox({
                  label: "Plan Description",
                  description: planDescription,
                })}
              </Stack>
            </Stack>
          )}
          {/* {paitentResponse()} */}
        </Box>

        <AddQuestionsBox
          isEditable={isEditable}
          formikProps={formikProps}
          handleDeleteQuestion={handleDeleteQuestion}
          ref={questionFieldscRef}
          handleEditQuestion
          isEditView={isEditView}
          toggleEditView={toggleEditView}
        />

        {isEditable && values.questions.length > 0 && Boolean(isEditView) && (
          <Box className="bottomActionButtonsWrapper">
            <Box>
              <Button
                type="submit"
                data-testid={`submitForm_${planId}`}
                variant="contained"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                className="cancelButton"
                data-testid={`cancelForm_${planId}`}
                onClick={onPressCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Form>
    </Stack>
  );
};

export default CommonForm;

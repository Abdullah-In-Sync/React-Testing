import { Box, Paper } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import * as React from "react";
import CommonButton from "../../Buttons/CommonButton";
import FormikSelectDropdown from "../../FormikFields/FormikSelectDropdown";
import FormikTextField from "../../FormikFields/FormikTextField";
import DeleteButton from "../DeleteButton";
import ErrorMessage from "../ErrorMessage";
import * as templateTypes from "../types";

interface ViewProps {
    formikProps: FormikProps<templateTypes.TemplateData>;
    handleDeleteQuestion: (value) => void;
}

const QuestionsSection: React.FC<ViewProps> = ({ formikProps, handleDeleteQuestion }) => {
    const { values, setFieldValue, errors, touched } = formikProps;
    const { templateData } = values;

    const onAddQuesionBox = () => {
        // if (templateData.questions.length < 15) {
        const questions = [...templateData.questions];
        questions.push({ question: "" });
        setFieldValue("templateData.questions", questions);
        // } else {
        //   confirmModalRef.current?.open();
        // }
    }

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
                                                    { id: 1, value: "0" },

                                                ]}
                                                mappingKeys={["id", "value"]}
                                                size="small"
                                                className="selectOutline"
                                                extraProps={{ "data-testid": "some" }}
                                                disabled
                                                fullWidth
                                            />
                                        </Box>
                                        <DeleteButton i={i} onDelete={() => handleDeleteQuestion(i)} />
                                    </Box>
                                </Paper>

                                {touched?.templateData?.questions[i] && errors?.templateData?.questions[i] && <ErrorMessage errorMsg={errors.templateData.questions[i]["question"]} />}
                            </Box>

                        )
                    })
                }
            </FieldArray>
        </Box>
    )
};

export default QuestionsSection;

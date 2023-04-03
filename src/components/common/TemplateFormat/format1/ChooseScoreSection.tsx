import { ArrowRightAlt } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import * as React from "react";
import EditableFormikInput from "../../EditableFormikInput/EditableFormikInput";
import ErrorMessage from "../ErrorMessage";
import * as templateTypes from "../types";

interface ViewProps {
    formikProps: FormikProps<templateTypes.TemplateData>;
}

const ChooseScoreSection: React.FC<ViewProps> = ({ formikProps }) => {
    const { values, errors, touched } = formikProps;
    const { templateData } = values;

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

                            <Box className="editableInputWrapper">
                                <EditableFormikInput name={`templateData.scores.${i}.value`} value={templateData.scores[i]["value"]} />
                            </Box>
                        </Box>
                    )
                })
            }
        </FieldArray>
    }

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
            {touched.templateData && errors.templateData && <ErrorMessage errorMsg={errors.templateData.scores} />}
        </Box>
    )
};

export default ChooseScoreSection;

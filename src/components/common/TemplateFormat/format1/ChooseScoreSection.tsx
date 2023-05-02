import { ArrowRightAlt } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { FieldArray, FormikProps } from "formik";
import * as React from "react";
import FormikTextField from "../../FormikFields/FormikTextField";
import ErrorMessage from "../ErrorMessage";
import * as templateTypes from "../types";

interface ViewProps {
  formikProps: FormikProps<templateTypes.TemplateDataFormat1>;
  isView?: boolean;
  isResponse?: boolean;
}

const ChooseScoreSection: React.FC<ViewProps> = ({
  formikProps,
  isResponse,
}) => {
  const { values, errors, touched } = formikProps;
  const { templateData } = values;

  const scoreCard = () => {
    return (
      <FieldArray name="scores">
        {() =>
          templateData.scores.map((item, i) => {
            const { label } = item;
            return (
              <Box className="scoreCardValue" key={`score_${i}`}>
                <Box className="first">
                  <label>
                    <Typography>{label}</Typography>
                  </label>
                </Box>
                <Divider />
                <Box className="editableInputWrapper">
                  <FormikTextField
                    autoFocus
                    name={`templateData.scores.${i}.value`}
                    id={`templateData.scores.${i}.value`}
                    placeholder={"Type"}
                    size="small"
                    hideError
                    multiline
                  />
                </Box>
              </Box>
            );
          })
        }
      </FieldArray>
    );
  };

  return (
    <Box
      className={`chooseScoreSection cSection ${
        isResponse ? "disbledFields" : ""
      }`}
    >
      <Box className="scoreCardWrapper">
        <Box className="scoreCardTextWrapper">
          <Typography>Choose your scores from</Typography>
        </Box>
        <Box className="rightArrowIconWrapper">
          <ArrowRightAlt />
        </Box>
        <Box className="scoreCard">{scoreCard()}</Box>
      </Box>
      {touched.templateData && errors.templateData && (
        <ErrorMessage errorMsg={errors.templateData.scores} />
      )}
    </Box>
  );
};

export default ChooseScoreSection;

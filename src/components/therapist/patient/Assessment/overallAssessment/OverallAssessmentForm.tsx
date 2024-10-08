import { Box, Stack } from "@mui/material";
import { Form } from "formik";
import React from "react";
import CommonAutocomplete from "../../../../common/AutoComplete/AutoComplete";
import CommonButton from "../../../../common/Buttons/CommonButton";
import FormikTextField from "../../../../common/FormikFields/FormikTextField";
import { useStyles } from "../patientAssessmentStyles";
import { TherapistPatientAssessmentProps } from "./OverallAssessment";
import { checkPrivilageAccess } from "../../../../../utility/helper";

const OverallAssessmentForm: React.FC<TherapistPatientAssessmentProps> = ({
  formikProps,
  risksListData = [],
}) => {
  const isAssessmentEdit = checkPrivilageAccess("Assessment", "Edit");
  const { values, isSubmitting, setFieldValue } = formikProps;
  const { risks: initRiskValues } = values;
  const styles = useStyles();

  const initialRisksOptions =
    risksListData === null
      ? []
      : risksListData.map((item) => {
          const obj = {
            label: item.name,
            value: item._id,
          };
          return obj;
        });

  const handleChangeRisks = (_, v) => {
    setFieldValue(`risks`, v);
  };

  return (
    <Stack className={styles.formWrapper}>
      <>
        <label>Overall Assessment</label>
        <Form className="form">
          <Box className="formRow1">
            <Box>
              <FormikTextField
                name="overallAssesmentText"
                id="overallAssesmentText"
                label=""
                fullWidth={true}
                inputProps={{ "data-testid": "overallAssesmentText" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
                multiline
                rows="3"
                disabled={!isAssessmentEdit}
              />
            </Box>
          </Box>
          <Box className="formRow2">
            <Box>
              <label>Select Risk Assessment</label>
              {initRiskValues && (
                <CommonAutocomplete
                  handleSelect={handleChangeRisks}
                  name={`risks`}
                  initialOptions={initialRisksOptions}
                  isOptionEqualToValue={(v) =>
                    initRiskValues.some((item) => v.value === item.value)
                  }
                  multiple={true}
                  defaultValue={initRiskValues}
                  classes={{ paper: "disableClickSelected" }}
                  disabled={!isAssessmentEdit}
                />
              )}
            </Box>
          </Box>

          <Box className="formRow3">
            <Box>
              <label>
                No. of required sessions <span className="impTxt">*</span>
              </label>
              <FormikTextField
                name="pttherapySession"
                id="pttherapySession"
                label=""
                variant="outlined"
                className="form-control-bg"
                size="small"
                type="number"
                InputProps={{
                  inputProps: { "data-testid": "pttherapySession" },
                }}
                disabled={!isAssessmentEdit}
              />
            </Box>
          </Box>

          {isAssessmentEdit && (
            <Box className="formRow4">
              <CommonButton
                type="submit"
                data-testid="submitForm"
                variant="contained"
                disabled={isSubmitting}
              >
                Save
              </CommonButton>
            </Box>
          )}
        </Form>
      </>
    </Stack>
  );
};

export default OverallAssessmentForm;

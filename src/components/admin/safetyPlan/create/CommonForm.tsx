import { Box, Button, Card, CardContent, Stack } from "@mui/material";
import { Form, FormikProps } from "formik";
import React, { useRef } from "react";
import AddQuestionsBox from "../../../common/AddQuestionsBox";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import { useStyles } from "./createSafetyPlanStyles";
import { InitialFormValues } from "./types";

interface ViewProps {
  organizationList?: Array<{
    [key: string]: any;
  }>;
  formikProps: FormikProps<InitialFormValues>;
  onPressCancel?: () => void;
}

const planTypes = [
  {
    id: "fixed",
    value: "Fixed",
  },
  {
    id: "custom",
    value: "Customizable",
  },
];

const CommonForm: React.FC<ViewProps> = ({
  organizationList = [],
  onPressCancel,
  formikProps,
}) => {
  const { values, isSubmitting, setFieldValue } = formikProps;
  const questionFieldscRef = useRef(null);
  const styles = useStyles();
  const csvDecode = (csvString) => {
    return csvString ? csvString.split(",") : [];
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.indexOf("all") > -1) setFieldValue("orgId", "all");
    else setFieldValue("orgId", value.join(","));
  };
  return (
    <Card>
      <CardContent>
        <Stack className={styles.formWrapper}>
          <Form>
            <Box className="fieldsBoxWrapperFirst">
              <Box>
                <FormikTextField
                  name="planName"
                  id="planName"
                  label="Plan Name"
                  fullWidth={true}
                  inputProps={{ "data-testid": "planName" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Box>
              <Box>
                <FormikTextField
                  name="planDescription"
                  id="planDescription"
                  label="Plan Description"
                  fullWidth={true}
                  inputProps={{ "data-testid": "planDescription" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                  multiline
                  rows={5}
                  autoComplete="off"
                />
              </Box>
            </Box>
            <Box className="fieldsBoxWrapper">
              <Box className="fieldBox first">
                <Box>
                  <FormikSelectDropdown
                    fullWidth
                    inputProps={{ "data-testid": organizationList[0]?.name }}
                    onChange={handleChange}
                    id="organizationSelect"
                    labelId="organizationSelect"
                    name="orgId"
                    label="Select Organization"
                    options={[
                      ...[{ _id: "all", name: "Select All" }],
                      ...organizationList,
                    ]}
                    mappingKeys={["_id", "name"]}
                    size="small"
                    className="form-control-bg"
                    extraProps={{ "data-testid": "organizationSelect" }}
                    multiSelect={csvDecode(values.orgId)}
                  />
                </Box>
                <Box>
                  <FormikSelectDropdown
                    id="planTypeSelect"
                    labelId="planTypeSelect"
                    name="planType"
                    showDefaultSelectOption={false}
                    label="Select Plan Type"
                    options={planTypes}
                    mappingKeys={["id", "value"]}
                    size="small"
                    className="form-control-bg"
                    extraProps={{ "data-testid": "planTypeSelect" }}
                  />
                </Box>
              </Box>
              <Box className="fieldBox second">
                <Button
                  onClick={() => questionFieldscRef.current.onAddQuesionBox()}
                  data-testid="addNewQuestionBox"
                  variant="outlined"
                >
                  Add Question
                </Button>
              </Box>
            </Box>
            <AddQuestionsBox
              formikProps={formikProps}
              ref={questionFieldscRef}
            />
            <Box className="bottomActionButtonsWrapper">
              <Box>
                <Button
                  type="submit"
                  data-testid="submitForm"
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
                  data-testid="cancelForm"
                  onClick={onPressCancel}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Form>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CommonForm;

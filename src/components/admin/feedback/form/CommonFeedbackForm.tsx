/* istanbul ignore file */
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Stack,
  Switch,
} from "@mui/material";
import { ErrorMessage, Form, FormikProps } from "formik";
import React, { useEffect, useRef, useState } from "react";
import AddQuestionsBox from "./AddQuestionsBox";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import { useStyles } from "./CreateFeedbackSyles";
import { FeedbackFormData } from "./types";
import { useLazyQuery } from "@apollo/client";
import { CHECK_FEEDBACK_NAME } from "../../../../graphql/Feedback/graphql";
import {
  CheckFeedbackNameRes,
  CheckFeedbackNameVars,
} from "../../../../graphql/Feedback/types";
import CheckFeedbackModel from "./CheckFeedModel/CheckFeedbackNameModel";

interface ViewProps {
  organizationList?: Array<{
    [key: string]: any;
  }>;
  formikProps: FormikProps<FeedbackFormData>;
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const userTypes = [
  {
    id: "client",
    value: "Client",
  },
  {
    id: "therapist",
    value: "Therapist",
  },
];

const sessionNumber = [
  {
    id: "before_therapy",
    value: "Before Therapy",
  },
  {
    id: "after_therapy",
    value: "After Therapy",
  },
  ...Array.from({ length: 50 }).map((i, index) => ({
    id: (index + 1).toString(),
    value: `Session ${index + 1}`,
  })),
];

const CommonFeedbackForm: React.FC<ViewProps> = ({
  organizationList = [],
  onPressCancel,
  formikProps,
  handleDeleteQuestion,
  setLoader,
}) => {
  const { values, isSubmitting, setFieldValue } = formikProps;
  const questionFieldscRef = useRef(null);
  const [showCheckFeedbackModal, setShowCheckFeedbackModal] =
    useState<boolean>(false);
  const styles = useStyles();
  const csvDecode = (csvString) => {
    return csvString ? csvString.split(",") : [];
  };

  const [checkFeedbackName, { data: checkFeedbackNameRes }] = useLazyQuery<
    CheckFeedbackNameRes,
    CheckFeedbackNameVars
  >(CHECK_FEEDBACK_NAME, {
    onCompleted: (data) => {
      setLoader(false);
      if (data?.checkFeedbackName != null) {
        setShowCheckFeedbackModal(true);
      }
    },
  });

  const handleChange = (event, name) => {
    const {
      target: { value },
    } = event;
    if (value.indexOf("all") > -1) setFieldValue(name, "all");
    else setFieldValue(name, value.join(","));
  };

  const onCheckFeedbackModelOk = () => setShowCheckFeedbackModal(false);

  useEffect(() => {
    if (
      values?.orgId != "" &&
      values?.sessionNo != "" &&
      values?.userType != "" &&
      !values?._id
    ) {
      setLoader(true);
      checkFeedbackName({
        variables: {
          orgId: values?.orgId,
          sessionNo: values?.sessionNo,
          userType: values?.userType,
        },
      });
    }
  }, [values?.orgId, values?.sessionNo, values?.userType]);
  return (
    <Card>
      <CardContent>
        <Stack className={styles.formWrapper}>
          <Form>
            <Box className="fieldsBoxWrapperFirst">
              <Box>
                <FormikTextField
                  name="feedBackName"
                  id="FeedbackName"
                  label="Feedback Name"
                  fullWidth={true}
                  inputProps={{ "data-testid": "FeedbackName" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Box>
              <Box>
                <FormikTextField
                  name="feedBackDesc"
                  id="instructions"
                  label="Instructions"
                  fullWidth={true}
                  inputProps={{ "data-testid": "instructions" }}
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
                    onChange={(e) => handleChange(e, "orgId")}
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
                    className="form-control-bg multiSelect"
                    extraProps={{
                      "data-testid": "organizationSelect",
                      disabled: values?._id != undefined,
                    }}
                    multiSelect={csvDecode(values.orgId)}
                  />
                </Box>
                <Box>
                  <FormikSelectDropdown
                    id="userType"
                    labelId="userType"
                    name="userType"
                    showDefaultSelectOption={false}
                    label="Select User Type*"
                    options={userTypes}
                    mappingKeys={["id", "value"]}
                    size="small"
                    className="form-control-bg"
                    extraProps={{
                      "data-testid": "userType",
                      disabled: values?._id != undefined,
                    }}
                  />
                </Box>
                <Box>
                  <FormikSelectDropdown
                    fullWidth
                    inputProps={{ "data-testid": sessionNumber[0]?.value }}
                    onChange={(e) => handleChange(e, "sessionNo")}
                    id="sessionNo"
                    labelId="sessionNo"
                    name="sessionNo"
                    label="Select Session"
                    options={[
                      ...[{ id: "all", value: "Select All" }],
                      ...sessionNumber,
                    ]}
                    mappingKeys={["id", "value"]}
                    size="small"
                    className="form-control-bg multiSelect"
                    extraProps={{
                      "data-testid": "sessionNo",
                      disabled: values?._id != undefined,
                    }}
                    multiSelect={csvDecode(values.sessionNo)}
                  />
                </Box>
              </Box>
            </Box>
            <Box display={"flex"}>
              {formikProps?.values?.userType === "therapist" && (
                <Box>
                  <FormControlLabel
                    disabled={values?._id != undefined}
                    control={
                      <Switch
                        value={formikProps.values?.visiBility}
                        onChange={(e, checked) =>
                          formikProps?.setFieldValue(
                            "visiBility",
                            checked ? 1 : 0
                          )
                        }
                      />
                    }
                    label="Patient Response Visibility"
                  />
                  <ErrorMessage
                    name={"visiBility"}
                    component="div"
                    className="invalid-input-message"
                  />
                </Box>
              )}
              <Box style={{ marginLeft: "auto" }}>
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
              handleDeleteQuestion={handleDeleteQuestion}
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
                  {values?._id ? "Update" : "Save"}
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
      <CheckFeedbackModel
        isOpen={showCheckFeedbackModal}
        validationFailList={checkFeedbackNameRes}
        onOK={onCheckFeedbackModelOk}
      />
    </Card>
  );
};

export default CommonFeedbackForm;

import { Box, Button, Card, CardContent, Stack } from "@mui/material";
import { Form, FormikProps } from "formik";
import React, { useRef } from "react";
import AddQuestionsBox from "../../../common/AddQuestionsBox";
import CommonButton from "../../../common/Buttons/CommonButton";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import { useStyles } from "./createSafetyPlanStyles";
import { InitialFormValues } from "./types";
import { planTypes } from "../../../../lib/constants";
import Format1 from "../../../common/TemplateFormat"
import {
  CommonModal,
  ModalElement,
} from "../../../common/CustomModal/CommonModal";
import ViewFormatsModal from "../../../common/TemplateFormat/ViewFomatsModal";


interface ViewProps {
  organizationList?: Array<{
    [key: string]: any;
  }>;
  formikProps: any//FormikProps<InitialFormValues>;
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
}

const CommonForm: React.FC<ViewProps> = ({
  organizationList = [],
  onPressCancel,
  formikProps,
  handleDeleteQuestion
}) => {
  const { values, isSubmitting, setFieldValue } = formikProps;
  const questionFieldscRef = useRef(null);
  const modalRefFormatsView = useRef<ModalElement>(null);
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
    <>
    <Card>
      <CardContent>
        <Stack className={styles.formWrapper}>
          <Form>
            <Box className="fieldsBoxWrapperFirst">
              <Box>
                <FormikTextField
                
                  name="title"
                  id="title"
                  label="Title"
                  fullWidth={true}
                  inputProps={{ "data-testid": "planName" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Box>
              <Box>
                <FormikTextField
                  name="description"
                  id="description"
                  label="Description"
                  fullWidth={true}
                  inputProps={{ "data-testid": "description" }}
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
                    className="form-control-bg multiSelect"
                    extraProps={{ "data-testid": "organizationSelect" }}
                    multiSelect={csvDecode(values.orgId)}
                  />
                </Box>
                {/* <Box>
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
                </Box> */}
              </Box>
              <Box className="fieldBox second">
                {/* <Button
                  onClick={() => questionFieldscRef.current.onAddQuesionBox()}
                  data-testid="addNewQuestionBox"
                  variant="outlined"
                >
                  Add Question
                </Button> */}

                <Box>
                        <Button
                  onClick={modalRefFormatsView.current?.open}
                  data-testid="formatModal"
                  variant="outlined"
                >
                  Click here to know about the formats
                </Button>
                </Box>
                <Box>
                                  <FormikSelectDropdown
                    id="templateId"
                    labelId="templateId"
                    name="templateId"
             
                    label="Add format"
                    options={[
                      {id: 1, value: "Format 1"},
                      {id: 2, value: "Format 2"}
                    ]}
                    mappingKeys={["id", "value"]}
                    size="small"
                    className="form-control-bg"
                    extraProps={{ "data-testid": "templateFormatSelect" }}
                    fullWidth
                  />
                  </Box>
              </Box>
            </Box>
            {/* <AddQuestionsBox
              isEditable={true}
              formikProps={formikProps}
              handleDeleteQuestion={handleDeleteQuestion}
              ref={questionFieldscRef}
            /> */}

           { values.templateId === 1 &&  <Format1 formikProps={formikProps}/> }
            <Box className="bottomActionButtonsWrapper">
              <Box>
                <CommonButton
                  type="submit"
                  data-testid="submitForm"
                  variant="contained"
                  // disabled={isSubmitting}
                >
                  Save
                </CommonButton>
              </Box>
              <Box>
                <CommonButton
                  variant="contained"
                  className="cancelButton"
                  data-testid="cancelForm"
                  onClick={onPressCancel}
                >
                  Cancel
                </CommonButton>
              </Box>
            </Box>
          </Form>
        </Stack>
      </CardContent>
    </Card>
    <ViewFormatsModal modalRefFormatsView={modalRefFormatsView}/>
    </>
  );
};

export default CommonForm;

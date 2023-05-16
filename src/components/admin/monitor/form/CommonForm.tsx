import { Box, Card, CardContent, Stack } from "@mui/material";
import { Form } from "formik";
import React, { useRef } from "react";
import CommonButton from "../../../common/Buttons/CommonButton";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import InfoModal from "../../../common/CustomModal/InfoModal";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import ViewFormatsModal from "../../../common/TemplateFormat/ViewFomatsModal";
import { useStyles } from "./createMeasuresStyles";

import ConfirmWrapper from "../../../common/ConfirmWrapper";
import { CommonFormProps, ModalRefs } from "../form/types";

import InfoMessageView from "../../../common/InfoMessageView";
import AddQuestionSection from "./AddQuestionSection";

type ViewProps = CommonFormProps & ModalRefs;

const CommonForm: React.FC<ViewProps> = ({
  organizationList = [],
  onPressCancel,
  formikProps,
  confirmRef,
  infoModalRef,
  handleDeleteQuestion,
  edit,
}) => {
  const { values, isSubmitting, setFieldValue } = formikProps;
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
      <ConfirmWrapper ref={confirmRef}>
        <Card>
          <CardContent>
            <Stack className={styles.formWrapper}>
              <Form>
                <Box className="fieldsBoxWrapperFirst">
                  <Box>
                    <FormikTextField
                      name="name"
                      id="name"
                      label="Monitor Name*"
                      fullWidth={true}
                      inputProps={{ "data-testid": "name" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      placeholder="Please enter monitor name*"
                    />
                  </Box>
                  <Box>
                    <FormikSelectDropdown
                      fullWidth
                      inputProps={{
                        "data-testid": organizationList[0]?.name,
                        "aria-label": "Without label",
                      }}
                      label="Select Organization*"
                      onChange={handleChange}
                      id="organizationSelect"
                      labelId="organizationSelect"
                      name="orgId"
                      options={[
                        ...[{ _id: "all", name: "Select All" }],
                        ...organizationList,
                      ]}
                      mappingKeys={["_id", "name"]}
                      size="small"
                      className="form-control-bg multiSelect"
                      extraProps={{
                        "data-testid": "organizationSelect",
                        displayEmpty: true,
                      }}
                      multiSelect={csvDecode(values.orgId)}
                      disabled={edit}
                    />
                  </Box>
                </Box>

                <AddQuestionSection
                  formikProps={formikProps}
                  handleDeleteQuestion={handleDeleteQuestion}
                />
                <Box className="bottomActionButtonsWrapper">
                  <Box>
                    <CommonButton
                      type="submit"
                      data-testid="submitForm"
                      variant="contained"
                      disabled={isSubmitting}
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
        <ViewFormatsModal modalRefFormatsView={modalRefFormatsView} />
        <InfoModal ref={infoModalRef}>
          <InfoMessageView />
        </InfoModal>
      </ConfirmWrapper>
    </>
  );
};

export default CommonForm;

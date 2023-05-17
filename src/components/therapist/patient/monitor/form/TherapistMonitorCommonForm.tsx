import { Box, Card, CardContent, Stack } from "@mui/material";
import { Form } from "formik";
import React, { useRef } from "react";
import CommonButton from "../../../../common/Buttons/CommonButton";
import { ModalElement } from "../../../../common/CustomModal/CommonModal";
import InfoModal from "../../../../common/CustomModal/InfoModal";
import FormikTextField from "../../../../common/FormikFields/FormikTextField";
import InfoMessage from "../../../../common/TemplateFormat/InfoMessage";
import ViewFormatsModal from "../../../../common/TemplateFormat/ViewFomatsModal";
import ConfirmWrapper from "../../../../common/ConfirmWrapper";
import {
  CommonFormProps,
  ModalRefs,
} from "../../../../admin/monitor/form/types";
import AddQuestionSection from "../../../../admin/monitor/form/AddQuestionSection";
import { useStyles } from "../../../../admin/monitor/form/createMeasuresStyles";

type ViewProps = CommonFormProps & ModalRefs;

const TherapistMonoitorCommonForm: React.FC<ViewProps> = ({
  onPressCancel,
  formikProps,
  confirmRef,
  infoModalRef,
}) => {
  const { isSubmitting } = formikProps;
  const modalRefFormatsView = useRef<ModalElement>(null);
  const styles = useStyles();

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
                </Box>

                <AddQuestionSection
                  formikProps={formikProps}
                  // handleDeleteQuestion={handleDeleteQuestion}
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
          <InfoMessage />
        </InfoModal>
      </ConfirmWrapper>
    </>
  );
};

export default TherapistMonoitorCommonForm;

import { Info } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Stack } from "@mui/material";
import { Form } from "formik";
import React, { useRef } from "react";
import CommonButton from "../../../common/Buttons/CommonButton";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import InfoModal from "../../../common/CustomModal/InfoModal";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import Formats from "../../../common/TemplateFormat";
import ConfirmWrapper from "../../../common/TemplateFormat/ConfirmWrapper";
import InfoMessage from "../../../common/TemplateFormat/InfoMessage";
import ViewFormatsModal from "../../../common/TemplateFormat/ViewFomatsModal";
import formatData from "../../../common/TemplateFormat/templateFormatData";
import { useStyles } from "./createMeasuresStyles";

import { CommonFormProps, ModalRefs } from "../form/types";

type ViewProps = CommonFormProps & ModalRefs;

const CommonForm: React.FC<ViewProps> = ({
  onPressCancel,
  formikProps,
  confirmRef,
  infoModalRef,
  isEdit,
}) => {
  const { values, isSubmitting, setFieldValue } = formikProps;
  const FormatTemplate = values.templateId ? Formats[values.templateId] : null;
  const modalRefFormatsView = useRef<ModalElement>(null);
  const styles = useStyles();

  const handleChangeFormat = (e) => {
    if (!isEdit) {
      const {
        target: { value, name },
      } = e;
      setFieldValue(name, value);
      if (value) setFieldValue("templateData", formatData[value]["data"]);
    }
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
                      name="title"
                      id="title"
                      label="Title"
                      fullWidth={true}
                      inputProps={{ "data-testid": "title" }}
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
                  <Box className="fieldBox second">
                    <Box className="formatsOpenModalButtonWrapper">
                      <Button
                        onClick={modalRefFormatsView.current?.open}
                        data-testid="formatModal"
                        variant="outlined"
                        fullWidth
                      >
                        Format Designs &nbsp;
                        <Info />
                      </Button>
                    </Box>
                    <Box className={`${isEdit ? "disbledFields" : ""}`}>
                      <FormikSelectDropdown
                        id="templateId"
                        labelId="templateId"
                        name="templateId"
                        onChange={handleChangeFormat}
                        label="Add format"
                        options={[
                          { id: "format1", value: "Format 1" },
                          { id: "format2", value: "Format 2" },
                        ]}
                        mappingKeys={["id", "value"]}
                        size="small"
                        className="selectFomatDropdown"
                        extraProps={{ "data-testid": "templateFormatSelect" }}
                        fullWidth
                      />
                    </Box>
                  </Box>
                </Box>
                {FormatTemplate && (
                  <FormatTemplate
                    formikProps={formikProps}
                    confirmRef={confirmRef}
                  />
                )}
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

export default CommonForm;

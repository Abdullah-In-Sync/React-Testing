import { Info } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Stack } from "@mui/material";
import { Form, FormikProps } from "formik";
import React, { useRef } from "react";
import CommonButton from "../../../common/Buttons/CommonButton";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import Formats from "../../../common/TemplateFormat";
import ViewFormatsModal from "../../../common/TemplateFormat/ViewFomatsModal";
import { useStyles } from "./createMeasuresStyles";
import * as types from "./types";
import formatData from "../../../common/TemplateFormat/templateFormatData";

interface ViewProps {
  organizationList?: Array<{
    [key: string]: any;
  }>;
  formikProps: FormikProps<types.InitialFormValues>;
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
}

const CommonForm: React.FC<ViewProps> = ({
  organizationList = [],
  onPressCancel,
  formikProps,
}) => {
  const { values, isSubmitting, setFieldValue } = formikProps;
  const FormatTemplate = values.templateId ? Formats[values.templateId] : null;
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
                </Box>
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
                  <Box>
                    <FormikSelectDropdown
                      id="templateId"
                      labelId="templateId"
                      name="templateId"
                      onChange={(e) => {
                        const {
                          target: { value, name },
                        } = e;
                        setFieldValue(name, value);
                        if (value)
                          setFieldValue(
                            "templateData",
                            formatData[value]["data"]
                          );
                      }}
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
              {FormatTemplate && <FormatTemplate formikProps={formikProps} />}
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
    </>
  );
};

export default CommonForm;

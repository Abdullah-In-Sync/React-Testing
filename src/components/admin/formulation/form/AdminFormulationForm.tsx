import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { Form, FormikProps } from "formik";
import React, { ForwardedRef } from "react";
import CommonButton from "../../../common/Buttons/CommonButton";
import FormikTextField from "../../../common/FormikFields/FormikTextField";
import { useStyles } from "./adminFormuationFormStyles";
import { csvDecode } from "../../../../utility/helper";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import ErrorMessage from "../../../common/TemplateFormat/ErrorMessage";
import { FormulationFormInitialData } from "../edit/EditFormulation";
import SelectTemplate from "./SelectTemplate";

interface ViewProps {
  formikProps: FormikProps<FormulationFormInitialData>;
  onPressCancel?: () => void;
  confirmRef?: ForwardedRef<ConfirmElement>;
  organizationList?: Array<{
    [key: string]: any;
  }>;
  selectTemplateRef?: any;
}

const AdminFormulationForm: React.FC<ViewProps> = ({
  onPressCancel,
  formikProps,
  confirmRef,
  organizationList = [],
  selectTemplateRef,
}) => {
  const { values, setFieldValue, submitForm, errors } = formikProps;
  const { all: allError, onlyMe: onlyMeError } = errors;
  const styles = useStyles();
  const { onlyMe, all } = values;

  /* istanbul ignore next */
  const setCheckValue = (e) => {
    const {
      target: { name, checked },
    } = e;
    setFieldValue(name, checked);
  };

  return (
    <>
      <ConfirmWrapper ref={confirmRef}>
        <Card className={styles.formWrapper}>
          <CardContent>
            <Stack>
              <Form>
                <Box className="row1 rowc">
                  <Box className="col1">
                    <Box className="nameInputWrapper">
                      <FormikTextField
                        name="name"
                        id="name"
                        label="Name*"
                        fullWidth={true}
                        inputProps={{ "data-testid": "title" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        autoComplete="off"
                      />
                    </Box>
                    <Box className="selectOrganisationWrapper">
                      <FormikSelectDropdown
                        fullWidth
                        inputProps={{
                          "data-testid": organizationList[0]?.name,
                        }}
                        onChange={null}
                        id="organizationSelect"
                        labelId="organizationSelect"
                        name="orgId"
                        label="Select Organization*"
                        options={[
                          ...[{ _id: "all", name: "Select All" }],
                          ...organizationList,
                        ]}
                        mappingKeys={["_id", "name"]}
                        size="small"
                        className="form-control-bg multiSelect"
                        extraProps={{ "data-testid": "organizationSelect" }}
                        multiSelect={csvDecode(values.orgId)}
                        disabled
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className="row2 rowc">
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
                    rows={3}
                    autoComplete="off"
                  />
                </Box>
                <Box className="row3 rowc">
                  <FormikTextField
                    name="instruction"
                    id="instruction"
                    label="Instruction"
                    fullWidth={true}
                    inputProps={{ "data-testid": "instruction" }}
                    variant="outlined"
                    className="form-control-bg"
                    size="small"
                    multiline
                    rows={3}
                    autoComplete="off"
                  />
                </Box>
                <Box className="row4 rowc">
                  <Box>
                    <label>Select the Availability of Resource*: </label>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="all"
                          onChange={setCheckValue}
                          defaultChecked={all}
                        />
                      }
                      label="All Therapists"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="onlyMe"
                          onChange={setCheckValue}
                          defaultChecked={onlyMe}
                        />
                      }
                      label="Only Me"
                    />
                  </Box>
                  {(allError || onlyMeError) && (
                    <Box mt={-1.7}>
                      <ErrorMessage
                        errorMsg={"Availability of resource is required"}
                      />
                    </Box>
                  )}
                </Box>
                <Box className="row5">
                  <CommonButton
                    data-testid="selectTemplate"
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      selectTemplateRef.current.openSelectTemplate()
                    }
                  >
                    Select Template
                  </CommonButton>
                </Box>
              </Form>
            </Stack>
          </CardContent>
        </Card>
        <Box className={styles.templateWrapper}>
          <SelectTemplate
            values={values}
            setFieldValue={setFieldValue}
            ref={selectTemplateRef}
            submitForm={submitForm}
            handleCancel={onPressCancel}
          />
        </Box>
      </ConfirmWrapper>
    </>
  );
};

export default AdminFormulationForm;

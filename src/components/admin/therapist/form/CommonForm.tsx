import {
  Box,
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { ErrorMessage, Form } from "formik";
import React from "react";
import CommonButton from "../../../common/Buttons/CommonButton";
import InfoModal from "../../../common/CustomModal/InfoModal";
import FormikSelectDropdown from "../../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../../common/FormikFields/FormikTextField";

import { useStyles } from "./addTherapistStyles";

import ConfirmWrapper from "../../../common/ConfirmWrapper";
import { CommonFormProps, ModalRefs } from "../form/types";

import { getUpdatedFileName } from "../../../../lib/helpers/s3";
import InfoMessageView from "../../../common/InfoMessageView";
import { IOSSwitch } from "../../../common/ToggleButton/IosToggleButton";
import UploadButtonComponent from "../../../common/UploadButton/UploadButtonComponent";

type ViewProps = CommonFormProps & ModalRefs;

const CommonForm: React.FC<ViewProps> = ({
  organizationList = [],
  formikProps,
  confirmRef,
  infoModalRef,
  masterData,
}) => {
  const { values, isSubmitting, setFieldValue } = formikProps;
  const {
    plan,
    therapist_poa_attachment = "No file choosen",
    therapist_inscover = "No file choosen",
    therapist_proofaccredition,
  } = values;
  const {
    plan_trial = [],
    professional = [],
    specialization = [],
  } = masterData;
  const styles = useStyles();

  /* istanbul ignore next */
  const fileOnChange = async (
    name,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { target: { files } = {} } = event;
    const fileObj = files && files[0];
    const { fileName } = getUpdatedFileName(fileObj);

    if (!fileName) {
      return;
    }

    setFieldValue(name, fileName);
    setFieldValue(`${name}_file`, fileObj);
  };

  const choosePlanRadio = ({ row, options }) => {
    return (
      <RadioGroup {...row} className="radio-buttons">
        {(options as Array<any>).map((option: string, index: number) => (
          <FormControlLabel
            key={`choosePlan_${index}`}
            data-testid={`choosePlan_${index}`}
            name="plan"
            value={option.toLocaleLowerCase()}
            control={<Radio />}
            label={option}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFieldValue(`plan`, e.target.value)
            }
            checked={plan === option.toLocaleLowerCase()}
            disabled={option === "Paid"}
          />
        ))}
      </RadioGroup>
    );
  };

  return (
    <>
      <ConfirmWrapper ref={confirmRef}>
        <Card className={styles.formWrapper}>
          <CardContent>
            <Stack>
              <Form>
                {/* first row */}
                <Box className="fieldsBoxWrapperFirst">
                  <Box>
                    <FormikTextField
                      name="therapist_name"
                      id="therapist_name"
                      label="Name*"
                      fullWidth={true}
                      inputProps={{ "data-testid": "therapist_name" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      placeholder="Please enter monitor name*"
                    />
                  </Box>
                  <Box>
                    <FormikSelectDropdown
                      id="orgId"
                      labelId="orgLabel"
                      name="org_id"
                      showDefaultSelectOption={false}
                      label="Organization*"
                      options={organizationList}
                      mappingKeys={["_id", "name"]}
                      size="small"
                      className="form-control-bg"
                      extraProps={{
                        "data-testid": "organization",
                      }}
                    />
                  </Box>
                  <Box>
                    <FormikSelectDropdown
                      id="therapist_specialization"
                      labelId="therapist_specialization"
                      name="therapist_specialization"
                      showDefaultSelectOption={false}
                      label="Specialization"
                      options={specialization}
                      mappingKeys={["name", "display_name"]}
                      size="small"
                      className="form-control-bg"
                      extraProps={{
                        "data-testid": "therapist_specialization",
                      }}
                    />
                  </Box>
                </Box>
                {/* second row */}
                <Box className="fieldsBoxWrapperFirst">
                  <Box>
                    <FormikTextField
                      name="email"
                      id="email"
                      label="Email*"
                      fullWidth={true}
                      inputProps={{ "data-testid": "emailInput" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      placeholder="Please enter monitor name*"
                    />
                  </Box>
                  <Box>
                    <FormikTextField
                      type="password"
                      name="password"
                      id="password"
                      label="Password*"
                      fullWidth={true}
                      inputProps={{ "data-testid": "passwordInput" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      placeholder="Please enter monitor name*"
                    />
                  </Box>
                  <Box>
                    <FormikTextField
                      type="password"
                      name="confirm_password"
                      id="confirmPassword"
                      label="Confirm Password*"
                      fullWidth={true}
                      inputProps={{ "data-testid": "confirmPasswordInput" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      placeholder="Please enter monitor name*"
                    />
                  </Box>
                </Box>
                {/* third row */}
                <Box className="fieldsBoxWrapperFirst">
                  <Box>
                    <FormikTextField
                      name="phone_number"
                      id="phone_number"
                      label="Phone*"
                      fullWidth={true}
                      inputProps={{ "data-testid": "phone_number" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      placeholder="Phone*"
                    />
                  </Box>
                  <Box>
                    <FormikTextField
                      name="therapist_add"
                      id="therapist_add"
                      label="Address"
                      fullWidth={true}
                      inputProps={{ "data-testid": "address_input" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      placeholder="Address"
                    />
                  </Box>
                  <Box>
                    <FormikTextField
                      name="therapist_totexp"
                      id="therapist_totexp"
                      label="Total Experience"
                      fullWidth={true}
                      inputProps={{ "data-testid": "therapist_totexp" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      placeholder="Total Experience"
                    />
                  </Box>
                </Box>
                {/* fourth row */}
                <Box className="fieldsBoxWrapperFirst">
                  <Box>
                    <FormikSelectDropdown
                      id="professionalAccreditation"
                      labelId="professionalAccreditation"
                      name="professionalAccreditation"
                      showDefaultSelectOption={false}
                      label="Professional Accreditation"
                      options={professional}
                      mappingKeys={["name", "display_name"]}
                      size="small"
                      className="form-control-bg"
                      extraProps={{
                        "data-testid": "professionalAccreditation",
                      }}
                    />
                  </Box>
                  <Box>
                    <FormikTextField
                      name="accredited_body"
                      id="accredited_body"
                      label="Name of Accredited body"
                      fullWidth={true}
                      inputProps={{ "data-testid": "accredited_body" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      placeholder="Name of Accredited body"
                    />
                  </Box>
                  <Box className="accToggleWrapper">
                    <label className="accLabel">Proof of Accreditation:</label>
                    <FormControlLabel
                      control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                      label=""
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFieldValue(
                          "therapist_proofaccredition",
                          Number(e.target?.checked)
                        )
                      }
                      data-testid="toggleAcc"
                    />
                  </Box>
                </Box>
                {/* fifth row */}
                <Box className="fieldsBoxWrapperFirst">
                  {Boolean(therapist_proofaccredition) && (
                    <Box className="chooseFileWrapper">
                      <label className="uploadButtonLabel">
                        Attach proof of Accreditation:
                      </label>
                      <UploadButtonComponent
                        variant="contained"
                        name="therapist_poa_attachment"
                        inputProps={{
                          "data-testid": "therapist_poa_attachment",
                        }}
                        onChange={(e) =>
                          fileOnChange("therapist_poa_attachment", e)
                        }
                        fileName={therapist_poa_attachment}
                        buttonText="Choose File"
                        hideIcon
                      />
                      <ErrorMessage
                        name={`therapist_poa_attachment_file`}
                        component="div"
                        className="invalid-input-message"
                      />
                    </Box>
                  )}
                  <Box className="chooseFileWrapper">
                    <label className="uploadButtonLabel">
                      Insurance Cover:
                    </label>
                    <UploadButtonComponent
                      variant="contained"
                      name="therapist_inscover"
                      inputProps={{ "data-testid": "therapist_inscover" }}
                      onChange={(e) => fileOnChange("therapist_inscover", e)}
                      fileName={therapist_inscover}
                      buttonText="Choose File"
                      hideIcon
                    />
                    <ErrorMessage
                      name={`therapist_inscover_file`}
                      component="div"
                      className="invalid-input-message"
                    />
                  </Box>
                  <Box />
                </Box>
                {/* sixth row */}
                <Box className="fieldsBoxWrapperFirst" alignItems={"center"}>
                  <Box className="radioErrorMessgeWrapper">
                    <Box className="radioFieldsWrapper">
                      <label className="radioLabel">Choose Plan* :</label>
                      {choosePlanRadio({
                        row: true,
                        options: ["Free", "Paid"],
                      })}
                    </Box>
                    <ErrorMessage
                      name={`plan`}
                      component="div"
                      className="invalid-input-message"
                    />
                  </Box>
                  {plan === "free" && (
                    <Box>
                      <FormikSelectDropdown
                        id="trial_period"
                        labelId="trial_period"
                        name="trial_period"
                        showDefaultSelectOption={false}
                        label="Select trial period*"
                        options={plan_trial}
                        mappingKeys={["name", "display_name"]}
                        size="small"
                        className="form-control-bg"
                        extraProps={{
                          "data-testid": "trial_period",
                        }}
                      />
                    </Box>
                  )}
                  <Box />
                </Box>

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
                </Box>
              </Form>
            </Stack>
          </CardContent>
        </Card>
        <InfoModal ref={infoModalRef} maxWidth={"xs"}>
          <InfoMessageView />
        </InfoModal>
      </ConfirmWrapper>
    </>
  );
};

export default CommonForm;

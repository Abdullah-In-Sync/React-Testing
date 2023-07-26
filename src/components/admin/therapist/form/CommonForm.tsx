import { Box, Card, CardContent, Stack } from "@mui/material";
import { Form } from "formik";
import React from "react";
import InfoModal from "../../../common/CustomModal/InfoModal";

import { useStyles } from "./addTherapistStyles";

import ConfirmWrapper from "../../../common/ConfirmWrapper";
import { CommonFormProps, ModalRefs } from "../form/types";

import { getUpdatedFileName } from "../../../../lib/helpers/s3";
import InfoMessageView from "../../../common/InfoMessageView";
import TherapistInputs from "./TherapistInputs";
import { Typography } from "@material-ui/core";

type ViewProps = CommonFormProps & ModalRefs;

const CommonForm: React.FC<ViewProps> = ({
  organizationList = [],
  formikProps,
  confirmRef,
  infoModalRef,
  masterData,
  viewType,
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

  const bottomCommonInputs = () => (
    <>
      <Box className="fieldsBoxWrapperFirst">
        {TherapistInputs.uploadFileInputs({
          therapist_proofaccredition,
          therapist_poa_attachment,
          fileOnChange,
          therapist_inscover,
        })}
      </Box>
      {/* sixth row */}
      <Box className="fieldsBoxWrapperFirst" alignItems={"center"}>
        {TherapistInputs.choosePlan({
          plan,
          setFieldValue,
          plan_trial,
        })}
      </Box>
      {TherapistInputs.formSubmitButton({ isSubmitting })}
    </>
  );

  const editInputs = () => {
    return (
      <Form>
        {/* first row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.therapistIdInput disabled />
          <TherapistInputs.therapistNameInput />
          <TherapistInputs.organizationDropdown
            organizationList={organizationList}
            disabled
          />
        </Box>
        {/* second row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.specializationDropdown
            specialization={specialization}
          />
          <TherapistInputs.phoneNumberInput disabled />
          <TherapistInputs.emailInput disabled />
        </Box>
        {/* third row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.therapistAddInput />
          <TherapistInputs.totalExpInput />
          <TherapistInputs.professionalAccreditationInput
            professional={professional}
          />
        </Box>
        {/* fourth row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.accreditedBodyInput />
          <TherapistInputs.accToggle setFieldValue={setFieldValue} />
          <Box />
        </Box>
        {bottomCommonInputs()}
      </Form>
    );
  };

  const registrationInputs = () => {
    return (
      <Form>
        {/* first row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.therapistNameInput />
          <TherapistInputs.organizationDropdown
            organizationList={organizationList}
          />
          <TherapistInputs.specializationDropdown
            specialization={specialization}
          />
        </Box>
        {/* second row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.emailInput />
          <TherapistInputs.changePasswordSec />
        </Box>
        {/* third row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.phoneNumberInput />
          <TherapistInputs.therapistAddInput />
          <TherapistInputs.totalExpInput />
        </Box>
        {/* fourth row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.professionalAccreditationInput
            professional={professional}
          />
          <TherapistInputs.accreditedBodyInput />
          <TherapistInputs.accToggle setFieldValue={setFieldValue} />
        </Box>
        {bottomCommonInputs()}
      </Form>
    );
  };

  const viewInputs = () => {
    return (
      <Stack className="viewStack disbledFields">
        {/* first row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.therapistIdInput />
          <TherapistInputs.therapistNameInput />
          <TherapistInputs.organizationDropdown
            organizationList={organizationList}
          />
        </Box>
        {/* second row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.specializationDropdown
            specialization={specialization}
          />
          <TherapistInputs.phoneNumberInput />
          <TherapistInputs.emailInput />
        </Box>
        {/* third row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.therapistAddInput />
          <TherapistInputs.totalExpInput />
          <TherapistInputs.professionalAccreditationInput
            professional={professional}
          />
        </Box>
        {/* fourth row */}
        <Box className="fieldsBoxWrapperFirst">
          <TherapistInputs.accreditedBodyInput />
          {/* <TherapistInputs.accToggle setFieldValue={setFieldValue} /> */}
          <Box />
          <Box />
        </Box>
        <Box className="fieldsBoxWrapperFirst">
          {Boolean(therapist_proofaccredition) && (
            <Box className="chooseFileWrapper">
              <label className="uploadButtonLabel">
                Attach proof of Accreditation:
              </label>
              <Typography className="fileName">
                {therapist_poa_attachment}
              </Typography>
            </Box>
          )}
          <Box className="chooseFileWrapper">
            <label className="uploadButtonLabel">Insurance Cover:</label>
            <Typography className="fileName">{therapist_inscover}</Typography>
          </Box>
          <Box />
        </Box>
        {/* sixth row */}
        <Box className="fieldsBoxWrapperFirst" alignItems={"center"}>
          {TherapistInputs.choosePlan({
            plan,
            setFieldValue,
            plan_trial,
          })}
        </Box>
      </Stack>
    );
  };

  const formInput = () => {
    switch (viewType) {
      case "view":
        return viewInputs();
      case "edit":
        return editInputs();
      default:
        return registrationInputs();
    }
  };

  return (
    <>
      <ConfirmWrapper ref={confirmRef}>
        <Card className={styles.formWrapper}>
          <CardContent>
            <Stack>{formInput()}</Stack>
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

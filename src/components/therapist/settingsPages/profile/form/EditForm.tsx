import { Formik } from "formik";
import React from "react";
import {
  GetMasterDataEntity,
  GetTherapistById,
} from "../../../../../graphql/Therapist/types";
import ProfileForm from "./CommonForm";
import { Stack } from "@mui/material";

interface ViewProps {
  data?: {
    masterData?: {
      specialization: GetMasterDataEntity[];
      professional: GetMasterDataEntity[];
    };
    therapistData?: GetTherapistById;
    onSubmit?: any;
  };
}

const ProfileEditForm: React.FC<ViewProps> = ({
  data: { masterData, therapistData, onSubmit } = {},
}) => {
  if (!therapistData) return null;
  const {
    email = "",
    therapist_name = "",
    therapist_specialization = "",
    therapist_profaccredition = "",
    therapist_proofaccredition = false,
    therapist_totexp = "",
    phone_number = "",
    therapist_poa_attachment,
  } = therapistData || {};

  const initialValues = {
    email,
    therapist_name,
    therapist_specialization,
    therapist_profaccredition,
    therapist_proofaccredition:
      therapist_proofaccredition === null ? 1 : therapist_proofaccredition,
    therapist_totexp,
    phone_number,
    therapist_poa_attachment,
    therapist_poa_attachment_file: undefined,
  };

  const commonform = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        children={(props) => (
          <ProfileForm
            {...props}
            masterData={masterData}
            saveButtonText={"Update"}
          />
        )}
      />
    );
  };
  return (
    <>
      <Stack className="formWrapper">{commonform()}</Stack>
    </>
  );
};

export default ProfileEditForm;

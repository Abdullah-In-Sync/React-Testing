import { Formik } from "formik";
import React from "react";
import {
  GetMasterDataEntity,
  GetTherapistById,
} from "../../../../../graphql/Therapist/types";
import ProfileForm from "./CommonForm";

interface ViewProps {
  masterData?: {
    specialization: GetMasterDataEntity[];
    professional: GetMasterDataEntity[];
  };
  therapistData?: GetTherapistById;
}

const ProfileViewForm: React.FC<ViewProps> = ({
  masterData,
  therapistData,
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
  };

  const commonform = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={null}
        children={(props) => <ProfileForm {...props} masterData={masterData} />}
      />
    );
  };
  return <>{commonform()}</>;
};

export default ProfileViewForm;

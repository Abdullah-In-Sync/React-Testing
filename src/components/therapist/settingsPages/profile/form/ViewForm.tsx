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
  therapistDataLoading?: any;
}

const ProfileViewForm: React.FC<ViewProps> = ({
  masterData,
  therapistData,
  therapistDataLoading,
}) => {
  if (!therapistData || therapistDataLoading) return null;
  /* istanbul ignore next */
  const {
    email = "",
    therapist_name = "",
    therapist_specialization = "",
    therapist_profaccredition = "",
    therapist_proofaccredition = false,
    therapist_totexp = "",
    phone_number = "",
    therapist_add = "",
    therapist_inscover = "",
    therapist_poa_attachment = "",
    accredited_body = "",
  } = therapistData || {};

  const initialValues = {
    email,
    therapist_name,
    therapist_specialization,
    therapist_profaccredition,
    therapist_proofaccredition:
      /* istanbul ignore next */
      therapist_proofaccredition === null ? 1 : therapist_proofaccredition,
    therapist_totexp,
    phone_number,
    therapist_add,
    therapist_poa_attachment,
    therapist_inscover,
    accredited_body,
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
  return (
    <>
      <div className="disbledFields">{commonform()}</div>
    </>
  );
};

export default ProfileViewForm;

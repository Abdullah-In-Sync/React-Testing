import { Formik } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";

import {
  GetMasterDataEntity,
  GetTherapistById,
} from "../../../../graphql/Therapist/types";
import { ModalRefs } from "../form/types";

interface ViewProps {
  organizationList?: object[];
  masterData?: {
    specialization: GetMasterDataEntity[];
    professional: GetMasterDataEntity[];
    plan_trial: GetMasterDataEntity[];
  };
  therapistData?: GetTherapistById;
}

const ViewTherapistForm: React.FC<ViewProps & ModalRefs> = ({
  organizationList,
  confirmRef,
  infoModalRef,
  masterData,
  therapistData,
}) => {
  const {
    email,
    phone_number,
    plan = "free",
    accredited_body,
    org_id,
    therapist_inscover,
    therapist_poa_attachment,
    therapist_specialization,
    therapist_totexp,
    _id,
    therapist_name,
    therapist_proofaccredition,
    therapist_profaccredition,
    therapist_add,
    trial_period = "",
  } = therapistData || {};
  const initialValues = {
    therapist_id: _id,
    email,
    therapist_name,
    org_id,
    plan,
    trial_period,
    therapist_specialization,
    therapist_profaccredition,
    therapist_proofaccredition:
      therapist_proofaccredition === null ? 1 : therapist_proofaccredition,
    accredited_body,
    therapist_totexp,
    therapist_add,
    therapist_inscover,
    therapist_poa_attachment,
    therapist_inscover_file: undefined,
    therapist_poa_attachment_file: undefined,
    phone_number,
  };

  const commonform = () => {
    return (
      <Formik
        initialValues={initialValues}
        onSubmit={null}
        children={(props: any) => (
          <CommonForm
            formikProps={props}
            organizationList={organizationList}
            confirmRef={confirmRef}
            infoModalRef={infoModalRef}
            masterData={masterData}
            viewType="view"
          />
        )}
      />
    );
  };

  return <>{commonform()}</>;
};

export default ViewTherapistForm;

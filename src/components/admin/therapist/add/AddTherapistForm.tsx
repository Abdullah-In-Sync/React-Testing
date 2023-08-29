import { Formik, FormikProps } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";
import { addTherapistValidationSchema } from "../form/addTherapistValidationSchema";

import { InitialFormValues, ModalRefs } from "../form/types";
import { GetMasterDataEntity } from "../../../../graphql/Therapist/types";

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  masterData?: {
    specialization: GetMasterDataEntity[];
    professional: GetMasterDataEntity[];
    plan_trial: GetMasterDataEntity[];
  };
}

const AddTherapistForm: React.FC<ViewProps & ModalRefs> = ({
  submitForm,
  organizationList,
  confirmRef,
  infoModalRef,
  masterData,
}) => {
  const initialValues = {
    email: "",
    therapist_name: "",
    password: "",
    confirm_password: "",
    org_id: "",
    plan: "free",
    trial_period: "",
    therapist_specialization: "",
    therapist_proofaccredition: 1,
    accredited_body: "",
    therapist_totexp: "",
    therapist_add: "",
    therapist_inscover: undefined,
    therapist_poa_attachment: undefined,
    therapist_inscover_file: undefined,
    therapist_poa_attachment_file: undefined,
    phone_number: "+44",
    therapist_profaccredition: "",
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={addTherapistValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props: any) => (
          <CommonForm
            formikProps={props}
            organizationList={organizationList}
            confirmRef={confirmRef}
            infoModalRef={infoModalRef}
            masterData={masterData}
          />
        )}
      />
    );
  };

  return <>{commonform()}</>;
};

export default AddTherapistForm;

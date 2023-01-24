import { FormikProps } from "formik";
import React from "react";
import CreatePlanForm from "./CreatePlanForm";

import { InitialFormValues } from "./types";

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
}

const CreateSafetyPlanComponent: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
}) => {
  return (
    <>
      <CreatePlanForm
        submitForm={submitForm}
        organizationList={organizationList}
        onPressCancel={onPressCancel}
      />
    </>
  );
};

export default CreateSafetyPlanComponent;

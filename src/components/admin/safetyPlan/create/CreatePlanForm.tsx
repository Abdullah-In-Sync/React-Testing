import { Formik, FormikProps } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";

import { InitialFormValues } from "../form/types";
import { safetyPlanValidationSchema } from "../form/safetyPlanValidationSchema";

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
}

const CreatePlanForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
}) => {
  const initialValues = {
    planName: "",
    planDescription: "",
    orgId: "",
    planType: "",
    questions: [],
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props: any) => (
          <CommonForm
            formikProps={props}
            organizationList={organizationList}
            onPressCancel={onPressCancel}
          />
        )}
      />
    );
  };
  // validateOnChange = {false}
  // validateOnBlur ={false} <CommonForm organizationList={organizationList}/>
  return <>{commonform()}</>;
};

export default CreatePlanForm;

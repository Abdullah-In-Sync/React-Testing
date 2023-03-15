import { Formik, FormikProps } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";

import { InitialFormValues } from "../form/types";
import { relapsePlanValidationSchema } from "../form/relapsePlanValidationSchema";

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
    planDesc: "",
    orgId: "",
    planType: "",
    questions: [],
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={relapsePlanValidationSchema}
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

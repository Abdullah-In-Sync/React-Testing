import { Formik, FormikProps } from "formik";
import React from "react";
import CommonForm from "./CommonForm";
import * as Yup from "yup";

import { InitialFormValues } from "./types";

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

  const validationSchema = Yup.object().shape({
    planName: Yup.string().required("Plan name is required"),
    orgId: Yup.string().required("Organization is required"),
    planType: Yup.string().required("Plan type is required"),
  });

  const commonform = () => {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        key={`createPlanForm`}
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

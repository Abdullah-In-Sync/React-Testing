import { Formik, FormikProps } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";

import { InitialFormValues } from "../form/types";
import { measuresValidationSchema } from "../form/measuresValidationSchema";

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
}

const CreateMeasuersForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
}) => {
  const initialValues = {
    title: "",
    description: "",
    orgId: "",
    templateId: "",
    templateData: null,
  };

  const commonform = () => {
    return (
      <Formik
        enableReinitialize
        validationSchema={measuresValidationSchema}
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

  return <>{commonform()}</>;
};

export default CreateMeasuersForm;

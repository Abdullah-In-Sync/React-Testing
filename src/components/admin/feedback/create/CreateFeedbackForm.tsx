/* istanbul ignore file */
import { Formik, FormikProps } from "formik";
import React from "react";

import { CreateFeedbackFormData } from "../form/types";
import { feedbackValidationSchema } from "../form/CreateFeedbackValidationSchema";
import CommonFeedbackForm from "../form/CommonFeedbackForm";

interface ViewProps {
  submitForm?: (
    formData: CreateFeedbackFormData,
    formikHelper: FormikProps<CreateFeedbackFormData>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
}

const CreateFeedbackForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
}) => {
  const initialValues = {
    feedBackName: "",
    orgId: "",
    userType: "",
    sessionNo: "",
    feedBackDesc: "",
    feedQuesData: "",
    questions: [],
    visiBility: 0,
  };

  const commonform = () => {
    return (
      <Formik<CreateFeedbackFormData>
        validationSchema={feedbackValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props: any) => (
          <CommonFeedbackForm
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

export default CreateFeedbackForm;

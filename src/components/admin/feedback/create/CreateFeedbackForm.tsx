/* istanbul ignore file */
import { Formik, FormikProps } from "formik";
import React from "react";

import { FeedbackFormData } from "../form/types";
import { feedbackValidationSchema } from "../form/CreateFeedbackValidationSchema";
import CommonFeedbackForm from "../form/CommonFeedbackForm";

interface ViewProps {
  submitForm?: (
    formData: FeedbackFormData,
    formikHelper: FormikProps<FeedbackFormData>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateFeedbackForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
  setLoader,
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
      <Formik<FeedbackFormData>
        validationSchema={feedbackValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props: any) => (
          <CommonFeedbackForm
            formikProps={props}
            organizationList={organizationList}
            onPressCancel={onPressCancel}
            setLoader={setLoader}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default CreateFeedbackForm;

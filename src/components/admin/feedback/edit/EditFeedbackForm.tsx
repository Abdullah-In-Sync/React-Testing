import { Formik, FormikProps } from "formik";
import React, { useMemo } from "react";
import { ViewFeedbackByAdmin } from "../../../../graphql/Feedback/types";
import CommonFeedbackForm from "../form/CommonFeedbackForm";
import { feedbackValidationSchema } from "../form/CreateFeedbackValidationSchema";
import { FeedbackFormData } from "../form/types";

interface ViewProps {
  feedback?: ViewFeedbackByAdmin;
  submitForm?: (
    formData: FeedbackFormData,
    formikHelper: FormikProps<FeedbackFormData>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
}

const EditFeedbackForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
  feedback,
  handleDeleteQuestion,
}) => {
  const initialValue: FeedbackFormData = useMemo(() => {
    return {
      _id: feedback?._id,
      feedBackName: feedback?.name,
      feedBackDesc: feedback?.description,
      feedQuesData: "",
      questions: feedback?.questions,
      visiBility: feedback?.visibility,
      userType: feedback?.feedback_type,
      sessionNo: feedback?.session_no,
      orgId: feedback?.org_id,
    };
  }, [feedback]);

  const commonForm = () => {
    return (
      <Formik
        validationSchema={feedbackValidationSchema}
        initialValues={initialValue}
        onSubmit={submitForm}
        children={(props: any) => (
          <CommonFeedbackForm
            formikProps={props}
            organizationList={organizationList}
            onPressCancel={onPressCancel}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        )}
      />
    );
  };
  return <>{commonForm()}</>;
};

export default EditFeedbackForm;

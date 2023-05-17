import { Formik, FormikProps } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";
import { monitorValidationSchema } from "../form/monitorValidationSchema";

import { AdminViewMonitorById } from "../../../../graphql/Monitor/types";
import { InitialFormValues, ModalRefs } from "../form/types";

interface ViewProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
  data?: AdminViewMonitorById;
  handleDeleteQuestion?: (v) => void;
}

const EditMonitorForm: React.FC<ViewProps & ModalRefs> = ({
  submitForm,
  organizationList,
  onPressCancel,
  confirmRef,
  infoModalRef,
  data,
  handleDeleteQuestion,
}) => {
  if (!data) return null;

  const { name, org_id: orgId, questions = [] } = data;
  const modifyQuestions = questions.map((item) => ({
    questionId: item._id,
    question: item.question,
    questionType: item.question_type,
    questionOption:
      item.question_type == "emoji"
        ? JSON.parse(item.question_option)
        : item.question_option,
  }));

  const initialValues = {
    name,
    orgId,
    questions: modifyQuestions,
  };

  const commonform = () => {
    return (
      <Formik
        enableReinitialize
        validationSchema={monitorValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props: any) => (
          <CommonForm
            formikProps={props}
            organizationList={organizationList}
            onPressCancel={onPressCancel}
            confirmRef={confirmRef}
            infoModalRef={infoModalRef}
            handleDeleteQuestion={handleDeleteQuestion}
            edit
          />
        )}
      />
    );
  };

  return <>{commonform()}</>;
};

export default EditMonitorForm;

import { Formik, FormikProps } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";

import { InitialFormValues } from "../form/types";
import { AdminViewRelapseById } from "../../../../graphql/Relapse/types";
import { relapsePlanValidationSchema } from "../form/relapsePlanValidationSchema";

interface ViewProps {
  relapsePlan?: AdminViewRelapseById;
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
}

const EditPlanForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
  relapsePlan,
  handleDeleteQuestion,
}) => {
  const {
    name: planName = "",
    description: planDesc = "",
    org_id: orgId = "",
    plan_type: planType = "",
    questions: questions = [],
  } = relapsePlan;

  const modifyQuestions = questions.map((item) => ({
    questionId: item._id,
    question: item.relapse_ques,
    description: item.relapse_additional_details,
    questionType: item.relapse_ques_type,
    questionOption: item.relapse_ques_typeoption,
  }));

  const initialValues: InitialFormValues = {
    planName,
    planDesc,
    orgId,
    planType,
    questions: modifyQuestions,
  };

  const commonform = () => {
    return (
      <Formik<InitialFormValues>
        validationSchema={relapsePlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitForm}
        children={(props: any) => (
          <CommonForm
            formikProps={props}
            organizationList={organizationList}
            onPressCancel={onPressCancel}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default EditPlanForm;

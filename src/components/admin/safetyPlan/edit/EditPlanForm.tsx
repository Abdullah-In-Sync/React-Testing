import { Formik, FormikProps } from "formik";
import React from "react";
import CommonForm from "../form/CommonForm";
import * as safetyPlanInterface from "../../../../graphql/SafetyPlan/types";
import { safetyPlanValidationSchema } from "../form/safetyPlanValidationSchema";

import { InitialFormValues } from "../form/types";

interface ViewProps {
  safetyPlan?: safetyPlanInterface.ViewSafetyPlanById;
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
}

const CreatePlanForm: React.FC<ViewProps> = ({
  submitForm,
  organizationList,
  onPressCancel,
  safetyPlan,
  handleDeleteQuestion,
}) => {
  const {
    name: planName = "",
    description: planDescription = "",
    org_id: orgId = "",
    plan_type: planType = "",
    questions: questions = [],
  } = safetyPlan;

  const modifyQuestions = questions.map((item) => ({
    questionId: item._id,
    question: item.safety_ques,
    description: item.safety_additional_details,
    questionType: item.safety_ques_type,
    questionOption: item.safety_ques_typeoption,
  }));

  const initialValues = {
    planName,
    planDescription,
    orgId,
    planType,
    questions: modifyQuestions,
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
            handleDeleteQuestion={handleDeleteQuestion}
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

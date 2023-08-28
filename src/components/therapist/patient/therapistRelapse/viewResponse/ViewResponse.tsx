import { Formik, FormikProps } from "formik";
import React from "react";
import CommonForm from "./ViewResponseForm";
// import * as safetyPlanInterface from "../../../../../graphql/SafetyPlan/types";

// import { InitialFormValues } from "../form/types";

import * as Yup from "yup";

export const relapsePlanValidationSchema = Yup.object().shape({
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
      // description: Yup.string().required("Description is required"),
      questionType: Yup.string().required("Question type is required"),
      questionOption: Yup.string().when("questionType", {
        is: "2",
        then: Yup.string().required("List option can not be left blank"),
      }),
    })
  ),
});

export interface InitialFormValues {
  planName?: string;
  planDescription?: string;
  orgId?: string;
  planType?: string;
  questions?: object[];
}

interface ViewProps {
  planData?: any;
  submitQustionForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
  isEditable?: boolean;
  isSafetyPlan?: boolean;
}

const CreatePlanForm: React.FC<ViewProps> = ({
  submitQustionForm,
  onPressCancel,
  planData,
  handleDeleteQuestion,
  isEditable,
  isSafetyPlan,
}) => {
  const {
    description: planDescription = "",
    _id: planId = "",
    plan_type: planType = "",
    questions = [],
  } = planData || {};

  const modifyQuestions =
    questions !== null
      ? questions.map((item) => ({
          questionId: item._id,
          question: isSafetyPlan ? item.safety_ques : item.relapse_ques,
          description: isSafetyPlan
            ? item.safety_additional_details
            : item.relapse_additional_details,
          questionType: isSafetyPlan
            ? item.safety_ques_type
            : item.relapse_ques_type,
          questionOption: isSafetyPlan
            ? item.safety_ques_typeoption
            : item.relapse_ques_typeoption,
          patientAnswer: item.patient_answer,
        }))
      : [];

  const initialValues = {
    planId,
    planType,
    questions: modifyQuestions,
  };

  const commonform = () => {
    return (
      <Formik
        enableReinitialize
        validationSchema={relapsePlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitQustionForm}
        children={(props: any) => (
          <CommonForm
            isEditable={isEditable}
            formikProps={props}
            planDescription={planDescription}
            onPressCancel={onPressCancel}
            handleDeleteQuestion={handleDeleteQuestion}
            questions={questions}
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

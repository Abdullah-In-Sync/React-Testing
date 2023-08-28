/* istanbul ignore next */
import { Formik, FormikProps } from "formik";
/* istanbul ignore next */
import React from "react";
/* istanbul ignore next */
import CommonForm from "./ViewResponseForm";
/* istanbul ignore next */
import * as safetyPlanInterface from "../../../../../graphql/SafetyPlan/types";

// import { InitialFormValues } from "../form/types";
/* istanbul ignore next */
import * as Yup from "yup";
/* istanbul ignore next */
export const safetyPlanValidationSchema = Yup.object().shape({
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
  safetyPlan?: safetyPlanInterface.ViewSafetyPlanById;
  submitQustionForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: object[];
  onPressCancel?: () => void;
  handleDeleteQuestion?: (v) => void;
  isEditable?: boolean;
}
/* istanbul ignore next */
const CreatePlanForm: React.FC<ViewProps> = ({
  /* istanbul ignore next */
  submitQustionForm,
  /* istanbul ignore next */
  onPressCancel,
  /* istanbul ignore next */
  safetyPlan,
  /* istanbul ignore next */
  handleDeleteQuestion,
  /* istanbul ignore next */
  isEditable,
}) => {
  const {
    /* istanbul ignore next */
    description: planDescription = "",
    /* istanbul ignore next */
    _id: planId = "",
    /* istanbul ignore next */
    plan_type: planType = "",
    /* istanbul ignore next */
    questions = [],
  } = safetyPlan || {};

  const modifyQuestions =
    /* istanbul ignore next */
    questions !== null
      ? /* istanbul ignore next */
        questions.map((item) => ({
          questionId: item._id,
          question: item.safety_ques,
          description: item.safety_additional_details,
          questionType: item.safety_ques_type,
          questionOption: item.safety_ques_typeoption,
        }))
      : [];
  /* istanbul ignore next */
  const initialValues = {
    planId,
    planType,
    questions: modifyQuestions,
  };
  /* istanbul ignore next */
  const commonform = () => {
    /* istanbul ignore next */
    return (
      <Formik
        enableReinitialize
        validationSchema={safetyPlanValidationSchema}
        initialValues={initialValues}
        onSubmit={submitQustionForm}
        /* istanbul ignore next */
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
  /* istanbul ignore next */
  return <>{commonform()}</>;
};
/* istanbul ignore next */
export default CreatePlanForm;

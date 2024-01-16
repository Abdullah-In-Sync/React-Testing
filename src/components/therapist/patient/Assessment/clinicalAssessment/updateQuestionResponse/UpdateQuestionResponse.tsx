import { Formik, FormikProps } from "formik";
import React from "react";
import { TherapistviewAssessmentQsEntity } from "../../../../../../graphql/assessment/types";
import UpdateQuestionForm from "./UpdateQuestionForm";
export interface InitialQuesionsFormValues {
  questions: object[];
}

interface ViewProps {
  onSubmitAssessmentResponse?: (
    formData: InitialQuesionsFormValues,
    formikHelper: FormikProps<InitialQuesionsFormValues>,
    value
  ) => void;
  assessmentId?: string;
  categoryData?: any;
  assessmentQuestionsViewData?: TherapistviewAssessmentQsEntity[];
  confirmRef?: any;
  toggleContent?: any;
  handleDeleteQuestion?: (v) => void;
  isAssessmentEdit?: boolean;
}

const UpdateQuestionResponse: React.FC<ViewProps> = (vprops) => {
  const {
    onSubmitAssessmentResponse,
    categoryData,
    confirmRef,
    toggleContent,
    handleDeleteQuestion,
    isAssessmentEdit,
  } = vprops;
  const { assessmentQuestionsViewData: questions = [], _id: categoryId } =
    categoryData;

  const modifyQuestions = (questions as Array<any>).map((item) => ({
    question_id: item._id,
    question: item.question,
    answer: item.answer,
  }));

  const initialValues = {
    questions: modifyQuestions,
  };

  const handleOnCancel = () => {
    confirmRef.current.openConfirm({
      confirmFunction: () => {
        toggleContent();
        confirmRef.current.close();
      },
      description:
        "Are you sure you want to cancel the response without submitting?",
    });
  };

  const commonform = () => {
    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(
          v,
          formikHelperProps: FormikProps<InitialQuesionsFormValues>
        ) => onSubmitAssessmentResponse(v, formikHelperProps, categoryData)}
        children={(props) => (
          <UpdateQuestionForm
            {...props}
            onCancel={handleOnCancel}
            handleDeleteQuestion={handleDeleteQuestion}
            categoryId={categoryId}
            isAssessmentEdit={isAssessmentEdit}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default UpdateQuestionResponse;

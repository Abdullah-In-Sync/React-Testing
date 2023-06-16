import { Formik, FormikProps } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  AdminAssessmentViewQsData,
  AdminAssessmentViewQsEntity,
  Category,
} from "../../../../graphql/assessment/types";
import AddUpdateCategoryQuestionForm from "./AddUpdateCategoryQuestionForm";

export interface InitialQuesionsFormValues {
  questions: object[];
}

interface ViewProps {
  onAssessmentCategoryQuestionSubmit?: (
    formData: InitialQuesionsFormValues,
    formikHelper: FormikProps<InitialQuesionsFormValues>,
    value
  ) => void;
  assessmentId?: string;
  categoryData?: Category & {
    assessmentQuestionsViewData: AdminAssessmentViewQsData;
  };
  assessmentQuestionsViewData?: AdminAssessmentViewQsEntity[];
  confirmRef?: any;
  toggleContent?: any;
  handleDeleteQuestion?: (v) => void;
}

export const validationSchema = Yup.object().shape({
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
    })
  ),
});

const AddUpdateCategoryQuestion: React.FC<ViewProps> = (vprops) => {
  const {
    onAssessmentCategoryQuestionSubmit,
    categoryData,
    confirmRef,
    toggleContent,
    handleDeleteQuestion,
  } = vprops;

  const { assessmentQuestionsViewData: questions = [] } = categoryData;

  const modifyQuestions = (questions as Array<any>).map((item) => ({
    question_id: item._id,
    question: item.question,
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
        "Are you sure you want to cancel the question without saving?",
    });
  };

  const commonform = () => {
    return (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(
          v,
          formikHelperProps: FormikProps<InitialQuesionsFormValues>
        ) =>
          onAssessmentCategoryQuestionSubmit(v, formikHelperProps, categoryData)
        }
        children={(props) => (
          <AddUpdateCategoryQuestionForm
            {...props}
            onCancel={handleOnCancel}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddUpdateCategoryQuestion;

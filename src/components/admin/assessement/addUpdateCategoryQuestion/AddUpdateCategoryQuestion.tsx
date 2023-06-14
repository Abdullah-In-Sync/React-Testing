import { Formik, FormikProps } from "formik";
import React, { ForwardedRef } from "react";
import * as Yup from "yup";
import {
  AdminAssessmentViewQsEntity,
  Category,
} from "../../../../graphql/assessment/types";
import AddUpdateCategoryQuestionForm from "./AddUpdateCategoryQuestionForm";
import { ConfirmElement } from "../../../common/ConfirmWrapper";

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
  categoryData?: Category;
  assessmentQuestionsViewData?: AdminAssessmentViewQsEntity[];
  confirmRef?: ForwardedRef<ConfirmElement> | any;
  toggleContent?: any;
}

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Category name is required"),
});

const AddUpdateCategoryQuestion: React.FC<ViewProps> = (vprops) => {
  const {
    onAssessmentCategoryQuestionSubmit,
    categoryData,
    assessmentQuestionsViewData: questions = [],
    confirmRef,
    toggleContent,
  } = vprops;
  const modifyQuestions = questions.map((item) => ({
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
        enableReinitialize
        onSubmit={(
          v,
          formikHelperProps: FormikProps<InitialQuesionsFormValues>
        ) =>
          onAssessmentCategoryQuestionSubmit(v, formikHelperProps, categoryData)
        }
        children={(props) => (
          <AddUpdateCategoryQuestionForm {...props} onCancel={handleOnCancel} />
        )}
      />
    );
  };
  return <>{commonform()}</>;
};

export default AddUpdateCategoryQuestion;

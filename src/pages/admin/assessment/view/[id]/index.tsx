import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import ViewAssessment from "../../../../../components/admin/assessement/view/ViewAssessment";
import { ConfirmElement } from "../../../../../components/common/ConfirmWrapper";
import { ConfirmInfoElement } from "../../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import {
  ADMIN_ADD_ASSESSMENT_CATEGORY_QUESSTION,
  ADMIN_ADD_CATEGORY,
  ADMIN_UPDATE_ASSESSMENT_CATEGORY,
  ADMIN_VIEW_ASSESSMENT,
  ADMIN_VIEW_ASSESSMENT_QUESTIONS,
} from "../../../../../graphql/assessment/graphql";
import {
  AdminAssessmentViewQsData,
  AssessmentViewData,
} from "../../../../../graphql/assessment/types";

const ViewAssessmentPage: NextPage = () => {
  const router = useRouter();
  const { query: { id: assessmentId } = {} } = router;
  const [addCategory] = useMutation(ADMIN_ADD_CATEGORY);
  const [updateCategory] = useMutation(ADMIN_UPDATE_ASSESSMENT_CATEGORY);
  const [addAssessmentCategoryQuestion] = useMutation(
    ADMIN_ADD_ASSESSMENT_CATEGORY_QUESSTION
  );
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [assessmentCategoryategory, setAssessmentCategory] = useState<any>();

  const [
    getAssesssmentData,
    {
      data: { adminViewAssessment: assessmentViewData = undefined } = {},
      refetch: refetchAssessmentData,
      loading: assessmentLoading,
    },
  ] = useLazyQuery<AssessmentViewData>(ADMIN_VIEW_ASSESSMENT, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      const { adminViewAssessment } = data;
      setLoader(false);
      setAssessmentCategory(adminViewAssessment);
    },
  });

  const [
    getAssesssmentQuestions,
    {
      data: {
        adminAssessmentViewQs: assessmentQuestionsViewData = undefined,
      } = {},
      refetch: refetchAssessmentQuestions,
    },
  ] = useLazyQuery<AdminAssessmentViewQsData>(ADMIN_VIEW_ASSESSMENT_QUESTIONS, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    getAssesssmentData({
      variables: { assessmentId },
    });
  }, []);

  const handleBackClick = () => {
    router.back();
  };

  const onAddCategorySubmit = async (formFields, callback) => {
    setLoader(true);
    try {
      await addCategory({
        variables: {
          assessmentId,
          ...formFields,
        },
        onCompleted: (data) => {
          if (data) {
            refetchAssessmentData();
            enqueueSnackbar("Assessment category added successfully.", {
              variant: "success",
            });
            callback();
          }
          setLoader(false);
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      callback();
    }
  };

  const onUpdateCategorySubmit = async (formFields, callback) => {
    setLoader(true);
    const { name, categoryId } = formFields;
    try {
      await updateCategory({
        variables: {
          categoryId,
          updateCat: {
            name,
            status: 1,
          },
        },
        onCompleted: (data) => {
          if (data) {
            refetchAssessmentData();
            enqueueSnackbar("Assessment category updated successfully.", {
              variant: "success",
            });
            callback();
          }
          setLoader(false);
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      callback();
    }
  };

  const onAddCategoryQuestionSubmit = async (
    formFields,
    { _id: categoryId },
    callback,
    setSubmitting
  ) => {
    setLoader(true);
    const { questions } = formFields;
    try {
      await addAssessmentCategoryQuestion({
        variables: {
          categoryId,
          question: JSON.stringify(questions),
        },
        onCompleted: (data) => {
          const { adminAssessmentAddQs } = data;
          if (adminAssessmentAddQs) {
            refetchAssessmentQuestions();
            enqueueSnackbar("Questions saved successfully.", {
              variant: "success",
            });
            callback();
            setSubmitting(false);
          }
          setLoader(false);
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      callback();
    }
  };

  const submitCallback = () => {
    confirmRef.current.close();
    infoModalRef.current.close();
  };

  const handleSubmitForm = (v, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: () => onAddCategorySubmit(v, submitCallback),
      description: "Are you sure you want to add the category?",
      setSubmitting,
    });
  };

  const onPressAddCategory = () => {
    infoModalRef.current.openConfirm({
      data: {
        onSubmit: handleSubmitForm,
      },
    });
  };

  const handleUpdateSubmitForm = (v, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: () => onUpdateCategorySubmit(v, submitCallback),
      description: "Are you sure you want to update the category?",
      setSubmitting,
    });
  };

  const onPressEditCategory = (value) => {
    infoModalRef.current.openConfirm({
      data: {
        value,
        onSubmit: (v, formikProps) =>
          handleUpdateSubmitForm(
            { ...v, ...{ categoryId: value?._id } },
            formikProps
          ),
        headerTitleText: "Edit Category",
      },
    });
  };

  const onDeleteCategorySubmit = async (formFields, callback) => {
    setLoader(true);
    const { _id } = formFields;
    try {
      await updateCategory({
        variables: {
          categoryId: _id,
          updateCat: {
            status: 0,
          },
        },
        onCompleted: (data) => {
          if (data) {
            refetchAssessmentData();
            enqueueSnackbar("Assessment category deleted successfully.", {
              variant: "success",
            });
            callback();
          }
          setLoader(false);
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      callback();
    }
  };

  const handleDeleteCategory = (v) => {
    confirmRef.current.openConfirm({
      confirmFunction: () => onDeleteCategorySubmit(v, submitCallback),
      description: "Are you sure you want to delete the category?",
    });
  };

  const actionButtonClick = (v) => {
    const { pressedIconButton } = v;
    switch (pressedIconButton) {
      case "edit":
        return onPressEditCategory(v);
      case "delete":
        return handleDeleteCategory(v);
      default:
    }
  };

  const onAssessmentCategoryQuestionSubmit = (
    v,
    { setSubmitting },
    categoryData
  ) => {
    confirmRef.current.openConfirm({
      confirmFunction: () =>
        onAddCategoryQuestionSubmit(
          v,
          categoryData,
          submitCallback,
          setSubmitting
        ),
      description: "Are you sure you want to save the question?",
      setSubmitting,
    });
  };

  const handleToggleContent = (_, categoryData, i) => {
    setLoader(true);
    const { _id: categoryId } = categoryData;
    const t = JSON.parse(JSON.stringify(assessmentViewData));
    if (assessmentCategoryategory.category[i]["assessmentQuestionsViewData"]) {
      setAssessmentCategory({ ...assessmentViewData });
      setLoader(false);
    } else
      getAssesssmentQuestions({
        variables: { categoryId },
        onCompleted: (data) => {
          const { adminAssessmentViewQs } = data;
          t.category[i]["assessmentQuestionsViewData"] = adminAssessmentViewQs;
          setAssessmentCategory({ ...assessmentCategoryategory, ...t });
          setLoader(false);
        },
      });
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ViewAssessment
          data={assessmentCategoryategory}
          handleBackClick={handleBackClick}
          infoModalRef={infoModalRef}
          onPressAddCategory={onPressAddCategory}
          confirmRef={confirmRef}
          assessmentLoading={assessmentLoading}
          actionButtonClick={actionButtonClick}
          onAssessmentCategoryQuestionSubmit={
            onAssessmentCategoryQuestionSubmit
          }
          handleToggleContent={handleToggleContent}
          assessmentQuestionsViewData={assessmentQuestionsViewData}
        />
      </Layout>
    </>
  );
};

export default ViewAssessmentPage;

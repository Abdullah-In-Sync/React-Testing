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
  ADMIN_ADD_CATEGORY,
  ADMIN_UPDATE_ASSESSMENT_CATEGORY,
  ADMIN_VIEW_ASSESSMENT,
} from "../../../../../graphql/assessment/graphql";
import { AssessmentViewData } from "../../../../../graphql/assessment/types";

const ViewAssessmentPage: NextPage = () => {
  const router = useRouter();
  const { query: { id: assessmentId } = {} } = router;
  const [addCategory] = useMutation(ADMIN_ADD_CATEGORY);
  const [updateCategory] = useMutation(ADMIN_UPDATE_ASSESSMENT_CATEGORY);
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const [
    getAssesssmentData,
    {
      data: { adminViewAssessment: assessmentViewData = undefined } = {},
      refetch: refetchAssessmentData,
      loading: assessmentLoading,
    },
  ] = useLazyQuery<AssessmentViewData>(ADMIN_VIEW_ASSESSMENT, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
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

  const handleDeleteCategory = (v) => {
    confirmRef.current.openConfirm({
      confirmFunction: () => onDeleteCategorySubmit(v, submitCallback),
      description: "Are you sure you want to delete the category?",
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

  const onPressDeleteCategory = (value) => {
    handleDeleteCategory(value);
  };

  const actionButtonClick = (v) => {
    const { pressedIconButton } = v;
    switch (pressedIconButton) {
      case "edit":
        return onPressEditCategory(v);
      case "delete":
        return onPressDeleteCategory(v);
      default:
    }
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ViewAssessment
          data={assessmentViewData}
          handleBackClick={handleBackClick}
          infoModalRef={infoModalRef}
          onPressAddCategory={onPressAddCategory}
          confirmRef={confirmRef}
          assessmentLoading={assessmentLoading}
          actionButtonClick={actionButtonClick}
        />
      </Layout>
    </>
  );
};

export default ViewAssessmentPage;

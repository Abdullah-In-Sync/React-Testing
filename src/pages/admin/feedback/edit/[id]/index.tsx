/* istanbul ignore file */
import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import ConfirmationModal from "../../../../../components/common/ConfirmationModal";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../components/common/SuccessModal";
import Layout from "../../../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";

import EditFeedbackForm from "../../../../../components/admin/feedback/edit/EditFeedbackForm";
import {
  DELETE_FEEDBACK_QUESTION_BY_ADMIN,
  EDIT_FEEDBACK_BY_ADMIN,
  VIEW_FEEDBACK_BY_ID,
} from "../../../../../graphql/Feedback/graphql";
import {
  DeleteFeedbackQuestionByAdminRes,
  DeleteFeedbackQuestionByAdminVars,
  EditFeedbackByAdminRes,
  EditFeedbackByAdminVars,
  ViewFeedbackByAdminRes,
  ViewFeedbackByAdminVars,
} from "../../../../../graphql/Feedback/types";
import { FeedbackFormData } from "../../../../../components/admin/feedback/form/types";

const EditFeedbackPage: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { query: { id: feedbackId } = {} } = router;
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    questionDeleteStatus: false,
  });

  const selectedQuestion = useRef();

  const [editFeedback] = useMutation<
    EditFeedbackByAdminRes,
    EditFeedbackByAdminVars
  >(EDIT_FEEDBACK_BY_ADMIN);

  const [deleteFeedbackQuestion] = useMutation<
    DeleteFeedbackQuestionByAdminRes,
    DeleteFeedbackQuestionByAdminVars
  >(DELETE_FEEDBACK_QUESTION_BY_ADMIN, {
    onCompleted: () => {
      setLoader(false);
      (selectedQuestion?.current as any)?.callback();
      enqueueSnackbar("The question has been deleted successfully.", {
        variant: "success",
      });
    },
  });

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [getFeedbackById, { data: { viewFeedbackByAdmin = null } = {} }] =
    useLazyQuery<ViewFeedbackByAdminRes, ViewFeedbackByAdminVars>(
      VIEW_FEEDBACK_BY_ID,
      {
        fetchPolicy: "network-only",
        onCompleted: () => {
          setLoader(false);
        },
      }
    );

  useEffect(() => {
    getFeedbackById({
      variables: { feedbackId: feedbackId as string },
    });
    getOrgList();
  }, []);

  const submitForm = async (formFields: FeedbackFormData, doneCallback) => {
    const variables: EditFeedbackByAdminVars = {
      feedbackId: viewFeedbackByAdmin?._id,
      feedBackName: formFields.feedBackName,
      feedBackDesc: formFields.feedBackDesc,
      feedQuesData: JSON.stringify(
        formFields?.questions?.map((q) => ({
          questionId: q._id,
          question: q.question,
          answerType: q.answer_type,
          answerOptions: q.answer_options,
        }))
      ),
    };

    try {
      editFeedback({
        variables,
        fetchPolicy: "network-only",
        onCompleted: () => {
          setSuccessModal(true);
          doneCallback();
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      doneCallback();
    } finally {
      setLoader(false);
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    setIsConfirm({
      status: true,
      storedFunction: (callback) => submitForm(formFields, callback),
      setSubmitting: setSubmitting,
    });
  };

  const onPressCancel = () => {
    setIsConfirm({ ...isConfirm, ...{ cancelStatus: true } });
  };

  const cancelConfirm = () => {
    router.back();
  };

  const clearIsConfirmCancel = () => {
    setIsConfirm({ ...isConfirm, ...{ cancelStatus: false } });
  };

  const onConfirmSubmit = () => {
    setLoader(true);
    isConfirm.storedFunction(() => {
      clearIsConfirm();
    });
  };

  const clearIsConfirm = () => {
    if (isConfirm.setSubmitting) isConfirm.setSubmitting(false);

    setIsConfirm({
      status: false,
      storedFunction: null,
      setSubmitting: null,
      cancelStatus: false,
      questionDeleteStatus: false,
    });
  };

  const handleOk = () => {
    /* istanbul ignore next */
    router.push("/admin/feedback");
    setSuccessModal(false);
  };

  const handleDeleteQuestion = (v) => {
    selectedQuestion.current = v;
    setDeleteModal(true);
  };

  const onCancelDeleteQuestion = () => {
    setDeleteModal(false);
  };

  const onDeleteQuestion = () => {
    const deleteQuestion: string = (
      selectedQuestion.current || { questionId: "" }
    ).questionId as string;
    setDeleteModal(false);
    setLoader(true);
    deleteFeedbackQuestion({
      variables: {
        questionId: deleteQuestion,
      },
    });
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Edit Feedback" />
        {viewFeedbackByAdmin && (
          <EditFeedbackForm
            organizationList={organizationList}
            feedback={viewFeedbackByAdmin}
            submitForm={handleSavePress}
            onPressCancel={onPressCancel}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        )}
        {isConfirm.status && (
          <ConfirmationModal
            label="Are you sure you want to update feedback?"
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {isConfirm.cancelStatus && (
          <ConfirmationModal
            label="Are you sure you are canceling the feedback without saving?"
            onCancel={clearIsConfirmCancel}
            onConfirm={cancelConfirm}
          />
        )}
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="Successfull"
            description={"Feedback has been updated successfully."}
            onOk={handleOk}
          />
        )}
        {deleteModal && (
          <ConfirmationModal
            label="Are you sure you want to delete the question?"
            onCancel={onCancelDeleteQuestion}
            onConfirm={onDeleteQuestion}
          />
        )}
      </Layout>
    </>
  );
};

export default EditFeedbackPage;

import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ConfirmationModal from "../../../../../components/common/ConfirmationModal";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../components/common/SuccessModal";
import Layout from "../../../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";

import EditFeedbackForm from "../../../../../components/admin/feedback/edit/EditFeedbackForm";
import {
  EDIT_FEEDBACK_BY_ADMIN,
  VIEW_FEEDBACK_BY_ID,
} from "../../../../../graphql/Feedback/graphql";
import {
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
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    questionDeleteStatus: false,
  });

  const [editFeedback] = useMutation<
    EditFeedbackByAdminRes,
    EditFeedbackByAdminVars
  >(EDIT_FEEDBACK_BY_ADMIN);
  // const [deleteSafetyPlan] = useMutation(DELETE_SAFETY_PLAN_QUESTION);

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
    console.log(formFields, "formFields");
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
        onCompleted: (data) => {
          if (data) {
            setSuccessModal(true);
          }
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

  const callDeleteApi = (questionId, successDeleteCallback, doneCallback) => {
    try {
      // deleteSafetyPlan({
      //   variables: { questionId },
      //   fetchPolicy: "network-only",
      //   onCompleted: (data) => {
      //     if (data) {
      //       successDeleteCallback();
      //       doneCallback();
      //       enqueueSnackbar("Question successfully deleted.", {
      //         variant: "success",
      //       });
      //     }
      //     setLoader(false);
      //   },
      // });
    } catch (e) {
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      setLoader(false);
      doneCallback();
    } finally {
      setLoader(false);
    }
  };

  const handleDeleteQuestion = (v) => {
    const { questionId, callback: successDeleteCallback } = v;
    setIsConfirm({
      ...isConfirm,
      ...{
        questionDeleteStatus: true,
        storedFunction: (callback) =>
          callDeleteApi(questionId, successDeleteCallback, callback),
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
            label="Are you sure?"
            description="Your want to update feedback"
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {isConfirm.cancelStatus && (
          <ConfirmationModal
            label="Are you sure?"
            description="You are canceling the feedback without saving"
            onCancel={clearIsConfirmCancel}
            onConfirm={cancelConfirm}
          />
        )}
        {isConfirm.questionDeleteStatus && (
          <ConfirmationModal
            label="Are you sure?"
            description="You want to delete feedback"
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
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
      </Layout>
    </>
  );
};

export default EditFeedbackPage;

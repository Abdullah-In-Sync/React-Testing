/* istanbul ignore file */
import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { SuccessModal } from "../../../../components/common/SuccessModal";
import ConfirmationModal from "../../../../components/common/ConfirmationModal";
import { useSnackbar } from "notistack";
import CreateFeedbackForm from "../../../../components/admin/feedback/create/CreateFeedbackForm";
import { CREATE_FEEDBACK } from "../../../../graphql/Feedback/graphql";
import {
  CreateFeedbackRes,
  CreateFeedbackVars,
} from "../../../../graphql/Feedback/types";
import { FeedbackFormData } from "../../../../components/admin/feedback/form/types";

const CreateFeedbackPage: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
  });

  const [createFeedback] = useMutation<CreateFeedbackRes, CreateFeedbackVars>(
    CREATE_FEEDBACK,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  useEffect(() => {
    getOrgList();
  }, []);

  const submitForm = async (formFields: FeedbackFormData, doneCallback) => {
    const variables = {
      ...formFields,
      feedQuesData: JSON.stringify(formFields.questions),
    };

    delete variables.questions;

    try {
      createFeedback({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            setSuccessModal(true);
          }
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
      doneCallback();
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
    isConfirm.storedFunction(() => {
      setLoader(true);
      isConfirm.setSubmitting(false);
      setIsConfirm({
        status: false,
        storedFunction: null,
        setSubmitting: null,
      });
    });
  };

  const clearIsConfirm = () => {
    isConfirm.setSubmitting(false);
    setIsConfirm({
      status: false,
      storedFunction: null,
      setSubmitting: null,
      cancelStatus: false,
    });
  };

  const handleOk = () => {
    /* istanbul ignore next */
    setSuccessModal(false);
    router.push("/admin/feedback");
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Create plan" />
        <CreateFeedbackForm
          organizationList={organizationList}
          submitForm={handleSavePress}
          onPressCancel={onPressCancel}
          setLoader={setLoader}
        />
        {isConfirm.status && (
          <ConfirmationModal
            label="Are you sure you want to save Feedback?"
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
            description={"Feedback has been created successfully."}
            onOk={handleOk}
          />
        )}
      </Layout>
    </>
  );
};
export default CreateFeedbackPage;

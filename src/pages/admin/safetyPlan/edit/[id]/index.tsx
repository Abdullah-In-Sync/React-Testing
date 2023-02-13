import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import EditSafetyPlanComponent from "../../../../../components/admin/safetyPlan/edit/EditPlanForm";
import ConfirmationModal from "../../../../../components/common/ConfirmationModal";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../components/common/SuccessModal";
import Layout from "../../../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import {
  DELETE_SAFETY_PLAN_QUESTION,
  GET_SAFETY_PLAN_BY_ID,
  UPDATE_SAFETY_PLAN,
} from "../../../../../graphql/SafetyPlan/graphql";

const EditSafetyPlanPage: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { query: { id: planId } = {} } = router;
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    questionDeleteStatus: false,
  });

  const [updateSafetyPlan] = useMutation(UPDATE_SAFETY_PLAN);
  const [deleteSafetyPlan] = useMutation(DELETE_SAFETY_PLAN_QUESTION);

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });
  //safetyPlanInterface.ViewSafetyPlanById
  const [
    getSafetyPlanById,
    { data: { viewSafetyPlanById: safetyPlan = null } = {} },
  ] = useLazyQuery(GET_SAFETY_PLAN_BY_ID, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      setLoader(false);
    },
  });

  useEffect(() => {
    getSafetyPlanById({
      variables: { planId },
    });
    getOrgList();
  }, []);

  const selectedOrgIds = (orgId) => {
    if (orgId === "all")
      return organizationList.map((item) => item._id).join(",");
    else return orgId;
  };

  const submitForm = async (formFields, doneCallback) => {
    const { orgId, planDescription, planName, planType, questions } =
      formFields;
    const modifyQuestions =
      questions.length > 0 ? { questions: JSON.stringify(questions) } : {};
    const variables = {
      planId,
      updatePlan: {
        org_id: selectedOrgIds(orgId),
        description: planDescription,
        name: planName,
        plan_type: planType,
      },
    };

    try {
      await updateSafetyPlan({
        variables: { ...variables, ...modifyQuestions },
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
    router.push("/admin/safetyPlan");
    setSuccessModal(false);
  };

  const callDeleteApi = async (
    questionId,
    successDeleteCallback,
    doneCallback
  ) => {
    try {
      await deleteSafetyPlan({
        variables: { questionId },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            successDeleteCallback();
            doneCallback();
            enqueueSnackbar("Question successfully deleted.", {
              variant: "success",
            });
          }
          setLoader(false);
        },
      });
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
        <ContentHeader title="Edit plan" />
        {safetyPlan && (
          <EditSafetyPlanComponent
            organizationList={organizationList}
            safetyPlan={safetyPlan}
            submitForm={handleSavePress}
            onPressCancel={onPressCancel}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        )}
        {isConfirm.status && (
          <ConfirmationModal
            label="Are you sure?"
            description="You want to create safety plan"
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {isConfirm.cancelStatus && (
          <ConfirmationModal
            label="Are you sure?"
            description="You are canceling the plan without saving"
            onCancel={clearIsConfirmCancel}
            onConfirm={cancelConfirm}
          />
        )}
        {isConfirm.questionDeleteStatus && (
          <ConfirmationModal
            label="Are you sure?"
            description="You want to delete safety plan"
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="Successfull"
            description={"Your plan has been created Successfully"}
            onOk={handleOk}
          />
        )}
      </Layout>
    </>
  );
};

export default EditSafetyPlanPage;

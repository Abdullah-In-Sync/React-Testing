import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import EditPlanForm from "../../../../../components/admin/relapsePlan/edit/EditPlanForm";
import { InitialFormValues } from "../../../../../components/admin/relapsePlan/form/types";
import ConfirmationModal from "../../../../../components/common/ConfirmationModal";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../components/common/SuccessModal";
import Layout from "../../../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import {
  ADMIN_DELETE_RELAPSE_PLAN_QS,
  ADMIN_UPDATE_RELAPSE_BY_ID,
  VIEW_RELAPSE_BY_PLAN_ID,
} from "../../../../../graphql/Relapse/graphql";
import {
  AdminDeleteRelapsePlanQsRes,
  AdminDeleteRelapsePlanQsVars,
  AdminUpdateRelapseByIdVars,
} from "../../../../../graphql/Relapse/types";

const EditRelapsePlanPage: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  /* istanbul ignore next */
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

  const [updateRelapsePlan] = useMutation<any, AdminUpdateRelapseByIdVars>(
    ADMIN_UPDATE_RELAPSE_BY_ID
  );
  const [deleteRelapsePlanQuestion] = useMutation<
    AdminDeleteRelapsePlanQsRes,
    AdminDeleteRelapsePlanQsVars
  >(ADMIN_DELETE_RELAPSE_PLAN_QS);

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
    getRelapsePlanById,
    { data: { adminViewRelapseById: relapsePlan = null } = {} },
  ] = useLazyQuery(VIEW_RELAPSE_BY_PLAN_ID, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      setLoader(false);
    },
  });

  useEffect(() => {
    getRelapsePlanById({
      variables: { planId },
    });
    getOrgList();
  }, []);

  const selectedOrgIds = (orgId) => {
    /* istanbul ignore next */
    if (orgId === "all")
      return organizationList.map((item) => item._id).join(",");
    else return orgId;
  };

  const submitForm = async (formFields: InitialFormValues, doneCallback) => {
    console.log(formFields, "formFields");
    const { orgId, planDesc, planName, planType, questions = [] } = formFields;
    /* istanbul ignore next */
    const variables = {
      planId: planId as string,
      updatePlan: {
        org_id: selectedOrgIds(orgId),
        description: planDesc,
        name: planName,
        plan_type: planType,
      },
      questions: JSON.stringify(questions),
    };

    try {
      await updateRelapsePlan({
        variables: { ...variables },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          /* istanbul ignore next */
          if (data) {
            setSuccessModal(true);
          }
          doneCallback();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      /* istanbul ignore next */
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
    /* istanbul ignore next */
    router.back();
  };

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
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
    router.push("/admin/relapsePlan");
    /* istanbul ignore next */
    setSuccessModal(false);
  };

  const callDeleteApi = async (
    questionId,
    successDeleteCallback,
    doneCallback
  ) => {
    try {
      await deleteRelapsePlanQuestion({
        variables: { questionId },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            successDeleteCallback();
            doneCallback();
            enqueueSnackbar("Question has been deleted successfully.", {
              variant: "success",
            });
          }
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
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
        {relapsePlan && (
          <EditPlanForm
            organizationList={organizationList}
            relapsePlan={relapsePlan}
            submitForm={handleSavePress}
            onPressCancel={onPressCancel}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        )}
        {isConfirm.status && (
          <ConfirmationModal
            label="Are you sure you want to update  the relapse plan?"
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {isConfirm.cancelStatus && (
          <ConfirmationModal
            label="Are you sure you are canceling the plan without saving ?"
            onCancel={clearIsConfirmCancel}
            onConfirm={cancelConfirm}
          />
        )}
        {isConfirm.questionDeleteStatus && (
          <ConfirmationModal
            label="Are you sure you want to delete the question?"
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
          />
        )}
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="Successful"
            description={"Your plan has been updated successfully."}
            onOk={handleOk}
          />
        )}
      </Layout>
    </>
  );
};

export default EditRelapsePlanPage;

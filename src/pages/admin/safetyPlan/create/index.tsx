import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateSafetyPlanComponent from "../../../../components/admin/safetyPlan/create/CreatePlanForm";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { CREATE_SAFETY_PLAN } from "../../../../graphql/SafetyPlan/graphql";
import { SuccessModal } from "../../../../components/common/SuccessModal";
import ConfirmationModal from "../../../../components/common/ConfirmationModal";
import { useSnackbar } from "notistack";

const CreateSafetyPlanPage: NextPage = () => {
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

  const [createSafetyPlan] = useMutation(CREATE_SAFETY_PLAN);

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

  const selectedOrgIds = (orgId) => {
    if (orgId === "all") {
      /* istanbul ignore next */
      return organizationList.map((item) => item._id).join(",");
    } else return orgId;
  };

  const submitForm = async (formFields, doneCallback) => {
    const { orgId, planDescription, planName, planType, questions } =
      formFields;

    const variables = {
      orgId: selectedOrgIds(orgId),
      planDesc: planDescription,
      planName,
      planType: planType,
      questions: JSON.stringify(questions),
    };

    try {
      await createSafetyPlan({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            setSuccessModal(true);
          }
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
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
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
    /* istanbul ignore next */
    router.back();
  };

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
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
    router.push("/admin/safetyPlan");
    /* istanbul ignore next */
    setSuccessModal(false);
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Create plan" />
        <CreateSafetyPlanComponent
          organizationList={organizationList}
          submitForm={handleSavePress}
          onPressCancel={onPressCancel}
        />
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
export default CreateSafetyPlanPage;

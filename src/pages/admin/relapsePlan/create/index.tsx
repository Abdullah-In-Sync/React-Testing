import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { SuccessModal } from "../../../../components/common/SuccessModal";
import ConfirmationModal from "../../../../components/common/ConfirmationModal";
import { useSnackbar } from "notistack";
import CreatePlanForm from "../../../../components/admin/relapsePlan/create/CreatePlanForm";
import { ADMIN_CREATE_RELAPSE_PLAN } from "../../../../graphql/Relapse/graphql";
import {
  AdminCreateRelapsePlanRes,
  AdminCreateRelapsePlanVars,
} from "../../../../graphql/Relapse/types";
import CheckFeedbackModel from "../../../../components/admin/feedback/form/CheckFeedModel/CheckFeedbackNameModel";

const CreateRelapsePlan: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [showCheckModal, setShowCheckModal] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
  });

  const createDataRef = useRef<any>();

  const [createRelapsePlan, { data: createRes }] = useMutation<
    AdminCreateRelapsePlanRes,
    AdminCreateRelapsePlanVars
  >(ADMIN_CREATE_RELAPSE_PLAN);

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const fields = [
    {
      key: "name",
      columnName: "Organization",
      visible: true,
      render: (val) => val,
    },
    {
      key: "planName",
      columnName: "Plan Name",
      visible: true,
      render: () => createDataRef?.current?.planName,
    },
    {
      key: "planType",
      columnName: "Plan Type",
      visible: true,
      render: () => createDataRef?.current?.planType,
    },
  ];

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
    const { orgId, planDesc, planName, planType, questions } = formFields;

    const variables = {
      orgId: selectedOrgIds(orgId),
      planDesc: planDesc,
      planName,
      planType: planType,
      questions: JSON.stringify(questions),
    };

    createDataRef.current = variables;

    try {
      setLoader(true);
      await createRelapsePlan({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          setLoader(false);
          if (data?.adminCreateRelapsePlan.result == true) {
            setSuccessModal(true);
          } else {
            setShowCheckModal(true);
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
    router.push("/admin/relapsePlan");
    /* istanbul ignore next */
    setSuccessModal(false);
  };

  const onOkCheckFeedbackModel = () => {
    setShowCheckModal(false);
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Create Plan" />
        <CreatePlanForm
          organizationList={organizationList}
          submitForm={handleSavePress}
          onPressCancel={onPressCancel}
        />
        {isConfirm.status && (
          <ConfirmationModal
            label="Are you sure you want to save the relapse plan?"
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
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="Successful"
            description={"Your plan has been created successfully."}
            onOk={handleOk}
          />
        )}
        <CheckFeedbackModel
          isOpen={showCheckModal}
          validationFailList={createRes?.adminCreateRelapsePlan?.duplicateNames}
          onOK={onOkCheckFeedbackModel}
          fields={fields}
          title={"Following plan already exist! kindly uncheck to proceed"}
        />
      </Layout>
    </>
  );
};
export default CreateRelapsePlan;

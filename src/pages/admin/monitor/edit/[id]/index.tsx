import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../../components/common/Loader";

import EditMonitorForm from "../../../../../components/admin/monitor/edit/EditMonitor";
import { ConfirmElement } from "../../../../../components/common/ConfirmWrapper";
import Layout from "../../../../../components/layout";
import {
  ADMIN_UPDATE_MONITOR,
  ADMIN_VIEW_MONITOR,
} from "../../../../../graphql/Monitor/graphql";
import { AdminMonitorView } from "../../../../../graphql/Monitor/types";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import { modifyQuestions } from "../../../../../utility/helper";

const EditMonitor: NextPage = () => {
  const router = useRouter();
  const { query: { id: monitorId } = {} } = router;
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [updateMonitor] = useMutation(ADMIN_UPDATE_MONITOR);

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [
    getMonitorData,
    { data: { adminViewMonitorById: monitorViewData = null } = {} },
  ] = useLazyQuery<AdminMonitorView>(ADMIN_VIEW_MONITOR, {
    onCompleted: () => {
      setLoader(false);
    },
  });

  useEffect(() => {
    getOrgList();
    getMonitorData({
      variables: { monitorId },
    });
  }, []);

  const selectedOrgIds = (orgId) => {
    if (orgId === "all") {
      /* istanbul ignore next */
      return organizationList.map((item) => item._id).join(",");
    } else return orgId;
  };

  const submitForm = async (formFields, doneCallback) => {
    setLoader(true);
    const { orgId, name, questions } = formFields;

    const variables = {
      monitorId,
      questions: JSON.stringify(modifyQuestions(questions)),
      update: {
        name,
        org_id: selectedOrgIds(orgId),
      },
    };

    try {
      await updateMonitor({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            doneCallback();
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
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => submitForm(formFields, callback),
      description: "‘Are you sure you want to update the monitor?",
      setSubmitting,
    });
  };

  const onPressCancel = () => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => cancelConfirm(callback),
      description:
        "Are you sure you want to cancel the monitor without saving?",
    });
  };

  /* istanbul ignore next */
  const cancelConfirm = (callback) => {
    router.back();
    callback();
  };

  // const removeQuestion = async (callback, {questionId, formFields, i: questionIndex}) => {
  //   setLoader(true);
  //   formFields["questions"][questionIndex]["status"] = 0
  //   submitForm(formFields, callback)
  // }

  // const handleDeleteQuestion = (value) => {
  //   confirmRef.current.openConfirm({
  //     confirmFunction: (callback) => removeQuestion(callback, value),
  //     description: "Are you sure you want to delete the question?",
  //   });
  // };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Edit Monitor" />
        <EditMonitorForm
          organizationList={organizationList}
          submitForm={handleSavePress}
          onPressCancel={onPressCancel}
          confirmRef={confirmRef}
          infoModalRef={infoModalRef}
          data={monitorViewData}
        />
      </Layout>
    </>
  );
};

export default EditMonitor;

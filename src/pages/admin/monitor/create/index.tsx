import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import CreateMonitorComponent from "../../../../components/admin/monitor/create/CreateMonitor";
import ContentHeader from "../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../components/common/Loader";

import Layout from "../../../../components/layout";
import { ADMIN_CREATE_MONITOR } from "../../../../graphql/Monitor/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { ConfirmElement } from "../../../../components/common/ConfirmWrapper";
import { modifyQuestions } from "../../../../utility/helper";

const CreateMonitor: NextPage = () => {
  const router = useRouter();
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [createMonitor] = useMutation(ADMIN_CREATE_MONITOR);

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
    setLoader(true);
    const { orgId, name, questions } = formFields;

    const variables = {
      name,
      orgId: selectedOrgIds(orgId),
      questions: JSON.stringify(modifyQuestions(questions)),
    };

    try {
      await createMonitor({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            const {
              adminCreateMonitor: { duplicateNames },
            } = data;

            if (duplicateNames) {
              infoModalRef.current.openConfirm({
                data: {
                  duplicateNames,
                  message:
                    "This monitor already exists in the given organisation!",
                },
              });
            }
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
      description: "Are you sure you want to create the monitor?",
      setSubmitting,
    });
  };

  const onPressCancel = () => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => cancelConfirm(callback),
      description: "Are you sure you are canceling the monitor without saving?",
    });
  };

  /* istanbul ignore next */
  const cancelConfirm = (callback) => {
    router.back();
    callback();
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Create Monitor" />
        <CreateMonitorComponent
          organizationList={organizationList}
          submitForm={handleSavePress}
          onPressCancel={onPressCancel}
          confirmRef={confirmRef}
          infoModalRef={infoModalRef}
        />
      </Layout>
    </>
  );
};

export default CreateMonitor;

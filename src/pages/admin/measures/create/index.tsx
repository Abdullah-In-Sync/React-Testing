import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import CreateMeasuresComponent from "../../../../components/admin/measures/create/CreateMeasures";
import ContentHeader from "../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../components/common/Loader";
import { ConfirmElement } from "../../../../components/common/TemplateFormat/ConfirmWrapper";
import Layout from "../../../../components/layout";
import { CREATE_MEASURE_TEMPLATE } from "../../../../graphql/Measure/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";

const CreateMeasures: NextPage = () => {
  const router = useRouter();
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [createMeasures] = useMutation(CREATE_MEASURE_TEMPLATE);

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
    const { orgId, description, templateData, templateId, title } = formFields;

    const variables = {
      title,
      description: description,
      orgId: selectedOrgIds(orgId),
      templateData: JSON.stringify(templateData),
      templateId: templateId,
    };

    try {
      await createMeasures({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            const {
              adminCreateMeasures: { duplicateNames },
            } = data;

            if (duplicateNames) {
              infoModalRef.current.openConfirm({
                data: { duplicateNames, measureText: title },
              });
            } else {
              confirmRef.current.showSuccess({
                description: "Your measure has been created successfully.",
                handleOk,
              });
            }
            doneCallback();
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
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => submitForm(formFields, callback),
      description: "Are you sure you want to create the measure?",
      setSubmitting,
    });
  };

  const onPressCancel = () => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => cancelConfirm(callback),
      description:
        "Are you sure you want to cancel the measure without saving?",
    });
  };

  /* istanbul ignore next */
  const cancelConfirm = (callback) => {
    router.back();
    callback();
  };

  /* istanbul ignore next */
  const handleOk = () => {
    router.push(`/admin/measures`);
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Create Measures" />
        <CreateMeasuresComponent
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

export default CreateMeasures;

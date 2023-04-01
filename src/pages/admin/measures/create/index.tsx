import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CreateMeasuresComponent from "../../../../components/admin/measures/create/CreateMeasures";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { CREATE_MEASURE_TEMPLATE } from "../../../../graphql/Measure/graphql";
import { SuccessModal } from "../../../../components/common/SuccessModal";
import ConfirmationModal from "../../../../components/common/ConfirmationModal";
import { useSnackbar } from "notistack";

const CreateMeasures: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    confirmObject: {
      description: "",
    },
  });

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

  // $orgId: String!
  // $templateData: String!
  // $templateId: String!
  // $title: String
  // $description: String

  const submitForm = async (formFields, doneCallback) => {
    const { orgId, description, templateData, templateId, title } =
      formFields;

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
    console.log({formFields})
    setIsConfirm({
      ...isConfirm,
      ...{
        status: true,
        confirmObject: {
          description: "Are you sure you want to create the measure?",
        },
        storedFunction: (callback) => submitForm(formFields, callback),
      },
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

  // const onConfirmSubmit = () => {
  //   isConfirm.storedFunction(() => {
  //     setLoader(true);
  //     isConfirm.setSubmitting(false);
  //     setIsConfirm({
  //       status: false,
  //       storedFunction: null,
  //       setSubmitting: null,
  //     });
  //   });
  // };

  // const clearIsConfirm = () => {
  //   isConfirm.setSubmitting(false);
  //   setIsConfirm({
  //     status: false,
  //     storedFunction: null,
  //     setSubmitting: null,
  //     cancelStatus: false,
  //   });
  // };

  const handleOk = () => {
    setSuccessModal(false);
  };

  // const onPressDeleteQuestion = (v) => {
  //   setIsConfirm({
  //     status: true,
  //     confirmObject: {
  //       description: "Are you sure you want to delete the Relapse plan?",
  //     },
  //     storedFunction: () => handleDeletesafetyPlan(v),
  //   });
  // };

  const onConfirmSubmit = () => {
    isConfirm.storedFunction(() => {
      setLoader(true);
      /* istanbul ignore next */
      if (isConfirm.setSubmitting instanceof Function)
        isConfirm.setSubmitting(false);

      setIsConfirm({
        status: false,
        storedFunction: null,
        setSubmitting: null,
      });
    });
  };
  const clearIsConfirm = () => {
    /* istanbul ignore next */
    if (isConfirm.setSubmitting instanceof Function)
      isConfirm.setSubmitting(false);
    /* istanbul ignore next */
    setIsConfirm({
      status: false,
      storedFunction: null,
      setSubmitting: null,
      cancelStatus: false,
    });
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
        />
        {isConfirm.status && (
        <ConfirmationModal
          label={isConfirm.confirmObject.description}
          onCancel={clearIsConfirm}
          onConfirm={onConfirmSubmit}
        />
      )}
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="Successfull"
            description={"Your plan has been created Successfully."}
            onOk={handleOk}
          />
        )} 
      </Layout>
    </>
  );
};
export default CreateMeasures;

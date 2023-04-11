import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import CreateMeasuresComponent from "../../../../components/admin/measures/create/CreateMeasures";
import ConfirmationModal from "../../../../components/common/ConfirmationModal";
import ContentHeader from "../../../../components/common/ContentHeader";
import InfoModal, {
  ConfirmElement,
} from "../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../components/common/Loader";
import { SuccessModal } from "../../../../components/common/SuccessModal";
import InfoMessage from "../../../../components/common/TemplateFormat/InfoMessage";
import Layout from "../../../../components/layout";
import { CREATE_MEASURE_TEMPLATE } from "../../../../graphql/Measure/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";

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
  const infoModalRef = useRef<ConfirmElement>(null);
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
              doneCallback();
            } else {
              setSuccessModal(true);
              doneCallback();
            }
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
    setIsConfirm({
      ...isConfirm,
      ...{
        status: true,
        setSubmitting,
        confirmObject: {
          description: "Are you sure you want to create the measure?",
        },
        storedFunction: (callback) => submitForm(formFields, callback),
      },
    });
  };

  const onPressCancel = () => {
    setIsConfirm({
      ...isConfirm,
      ...{
        status: true,
        confirmObject: {
          description:
            "Are you sure you are canceling the measures without saving?",
        },
        storedFunction: () => cancelConfirm(),
      },
    });
  };

  const cancelConfirm = () => {
    /* istanbul ignore next */
    router.back();
  };

  const handleOk = () => {
    router.push(`/admin/measures`);
    setSuccessModal(false);
  };

  const onConfirmSubmit = () => {
    isConfirm.storedFunction(() => {
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
        <InfoModal ref={infoModalRef}>
          <InfoMessage />
        </InfoModal>
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            title="Successfull"
            description={"Your measures has been created successfully."}
            onOk={handleOk}
          />
        )}
      </Layout>
    </>
  );
};

export default CreateMeasures;

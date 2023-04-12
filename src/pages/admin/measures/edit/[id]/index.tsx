import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import EditMeasuresComponent from "../../../../../components/admin/measures/edit/EditMeasures";
import ConfirmationModal from "../../../../../components/common/ConfirmationModal";
import ContentHeader from "../../../../../components/common/ContentHeader";
import InfoModal, {
  ConfirmInfoElement,
} from "../../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../components/common/SuccessModal";
import InfoMessage from "../../../../../components/common/TemplateFormat/InfoMessage";
import Layout from "../../../../../components/layout";
import {
  CREATE_MEASURE_TEMPLATE,
  AdMIN_VIEW_MEASURE,
  UPDATE_MEASURE
} from "../../../../../graphql/Measure/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import {
  UpdateMeasureByIdResponse,
  UpdateMeasureByIdVars,
} from "../../../../../graphql/Measure/types";
import {ConfirmElement} from "../../../../../components/common/TemplateFormat/ConfirmWrapper";

const CreateMeasures: NextPage = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const measureId = id as string;
  const [updateMeasure] = useMutation<
  UpdateMeasureByIdResponse,
  UpdateMeasureByIdVars
>(UPDATE_MEASURE); 
const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);

  const [
    getAdminMeasure,
    {
      loading: loadingMeasureData,
      data: { adminViewMeasureById: measureData = {} } = {},
    },
  ] = useLazyQuery(AdMIN_VIEW_MEASURE, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setLoader(false);
    },
  });

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
    getAdminMeasure({
      variables: {
        measureId,
      },
    });
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
      measureId,
      update: {
        title,
        description: description,
        org_id: selectedOrgIds(orgId),
        template_data: JSON.stringify(templateData),
        template_id: templateId,
      },
    }

    setLoader(true);
    try {
      await updateMeasure({
        variables,
        onCompleted: () => {
          confirmRef.current.showSuccess({
            description: "Your measure has been updated successfully.",
            handleOk
          })
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Something is wrong", { variant: "error" });
    } finally {
      doneCallback();
      setLoader(false);
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => submitForm(formFields, callback),
      description: "Are you sure you want to update the measure?",
      setSubmitting
    });
  };

  const onPressCancel = () => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => cancelConfirm(callback),
      description: "Are you sure you are canceling the measures without saving?",
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
        <EditMeasuresComponent
          organizationList={organizationList}
          submitForm={handleSavePress}
          onPressCancel={onPressCancel}
          measureData={measureData}
          confirmRef={confirmRef}
          infoModalRef={infoModalRef}
        />

      </Layout>
    </>
  );
};

export default CreateMeasures;

import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import EditMeasuresComponent from "../../../../../components/admin/measures/edit/EditMeasures";
import ContentHeader from "../../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import {
  AdMIN_VIEW_MEASURE,
  ADMIN_UPDATE_MEASURE,
} from "../../../../../graphql/Measure/graphql";
import {
  UpdateMeasureByIdResponse,
  UpdateMeasureByIdVars,
  ViewMeasureData,
} from "../../../../../graphql/Measure/types";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import { ConfirmElement } from "../../../../../components/common/ConfirmWrapper";

const CreateMeasures: NextPage = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const measureId = id as string;
  const [updateMeasure] = useMutation<
    UpdateMeasureByIdResponse,
    UpdateMeasureByIdVars
  >(ADMIN_UPDATE_MEASURE);
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);

  const [
    getAdminMeasure,
    {
      loading: loadingMeasureData,
      data: { adminViewMeasureById: measureData = null } = {},
    },
  ] = useLazyQuery<ViewMeasureData>(AdMIN_VIEW_MEASURE, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
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
    };

    setLoader(true);
    try {
      await updateMeasure({
        variables,
        onCompleted: () => {
          confirmRef.current.showSuccess({
            description: "Your measure has been updated successfully.",
            handleOk,
          });
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    } finally {
      doneCallback();
      setLoader(false);
    }
  };

  const deleteQuestion = async (templateData, doneCallback) => {
    /* istanbul ignore next */
    setLoader(true);
    const { org_id, description, template_id, title } = measureData;
    /* istanbul ignore next */
    const variables = {
      measureId,
      update: {
        title,
        description: description,
        org_id: org_id,
        template_data: JSON.stringify(templateData),
        template_id,
      },
    };

    try {
      /* istanbul ignore next */
      await updateMeasure({
        variables,
        onCompleted: () => {
          enqueueSnackbar("Question has been deleted successfully", {
            variant: "success",
          });
          doneCallback();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    /* istanbul ignore next */
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => submitForm(formFields, callback),
      description: "Are you sure you want to update the measure?",
      setSubmitting,
    });
  };

  const onPressCancel = () => {
    /* istanbul ignore next */
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

  const handleDeleteQuestion = ({ callback, item }) => {
    /* istanbul ignore next */
    const { template_data } = measureData;
    /* istanbul ignore next */
    const templateData = JSON.parse(template_data);
    /* istanbul ignore next */
    const questions = templateData.questions.bodyRows
      ? templateData.questions.bodyRows
      : templateData.questions;
    const questionIndex = questions.findIndex((value) => item.id === value.id);
    if (questionIndex > -1) {
      /* istanbul ignore next */
      questions.splice(questionIndex, 1);
      deleteQuestion(templateData, callback);
    } else {
      callback();
    }
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Edit Measures" />
        {!loadingMeasureData && (
          <EditMeasuresComponent
            organizationList={organizationList}
            submitForm={handleSavePress}
            onPressCancel={onPressCancel}
            measureData={measureData}
            confirmRef={confirmRef}
            infoModalRef={infoModalRef}
            handleDeleteQuestion={handleDeleteQuestion}
          />
        )}
      </Layout>
    </>
  );
};

export default CreateMeasures;

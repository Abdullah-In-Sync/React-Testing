import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";

import EditMeasuresComponent from "../../../../../../../../components/therapist/measures/edit/EditMeasures";
import ContentHeader from "../../../../../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../../../../../components/common/Loader";
import { ConfirmElement } from "../../../../../../../../components/common/TemplateFormat/ConfirmWrapper";
import Layout from "../../../../../../../../components/layout";
import {
  THERAPIST_VIEW_MEASURE,
  THERAPIST_UPDATE_MEASURE,
} from "../../../../../../../../graphql/Measure/graphql";
import {
  UpdateMeasureByIdResponse,
  UpdateMeasureByIdVars,
  TherapistViewMeasuresData,
} from "../../../../../../../../graphql/Measure/types";

const CreateMeasures: NextPage = () => {
  const router = useRouter();
  const {
    query: { id, measureId: queryMeasureId },
  } = router;
  const patientId = id as string;
  const measureId = queryMeasureId as string;
  const [updateMeasure] = useMutation<
    UpdateMeasureByIdResponse,
    UpdateMeasureByIdVars
  >(THERAPIST_UPDATE_MEASURE);
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);

  const [
    getTherapistMeasure,
    {
      loading: loadingMeasureData,
      data: { therapistViewMeasure: measureData = null } = {},
    },
  ] = useLazyQuery<TherapistViewMeasuresData>(THERAPIST_VIEW_MEASURE, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  useEffect(() => {
    getTherapistMeasure({
      variables: {
        measureId,
      },
    });
  }, []);

  const submitForm = async (formFields, doneCallback) => {
    setLoader(true);
    const { description, templateData, templateId, title } = formFields;

    const variables = {
      measureId,
      update: {
        title,
        description: description,
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
      setLoader(false);
      enqueueSnackbar("Something is wrong", { variant: "error" });
    } finally {
      doneCallback();
      setLoader(false);
    }
  };

  const deleteQuestion = async (templateData, doneCallback) => {
    setLoader(true);
    const { description, template_id, title } = measureData;
    const variables = {
      measureId,
      update: {
        title,
        description: description,
        template_data: JSON.stringify(templateData),
        template_id,
      },
    };

    try {
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
      setLoader(false);
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => submitForm(formFields, callback),
      description: "Are you sure you want to update the measure?",
      setSubmitting,
    });
  };

  const onPressCancel = () => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => cancelConfirm(callback),
      description:
        "Are you sure you are canceling the measures without saving?",
    });
  };

  /* istanbul ignore next */
  const cancelConfirm = (callback) => {
    handleOk();
    callback();
  };

  /* istanbul ignore next */
  const handleOk = () => {
    router.push(`/therapist/patient/view/${patientId}/?tab=measures`);
  };

  const handleDeleteQuestion = ({ callback, item }) => {
    const { template_data } = measureData;
    const templateData = JSON.parse(template_data);

    const questions = templateData.questions.bodyRows
      ? templateData.questions.bodyRows
      : templateData.questions;
    const questionIndex = questions.findIndex((value) => item.id === value.id);
    if (questionIndex > -1) {
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

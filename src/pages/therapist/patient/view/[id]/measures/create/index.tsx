import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import ContentHeader from "../../../../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../../../../components/common/Loader";

import Layout from "../../../../../../../components/layout";
import CreateMeasuresComponent from "../../../../../../../components/therapist/measures/create/CreateMeasures";
import { THERAPIST_CREATE_MEASURES } from "../../../../../../../graphql/Measure/graphql";
import { ConfirmElement } from "../../../../../../../components/common/ConfirmWrapper";

const CreateMeasures: NextPage = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const patientId = id as string;
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [createMeasures] = useMutation(THERAPIST_CREATE_MEASURES);

  const submitForm = async (formFields, doneCallback) => {
    setLoader(true);
    const { description, templateData, templateId, title } = formFields;

    const variables = {
      patientId,
      title,
      description: description,
      templateData: JSON.stringify(templateData),
      templateId: templateId,
    };

    try {
      await createMeasures({
        variables,
        onCompleted: (data) => {
          if (data) {
            const {
              therapistCreateMeasures: { duplicateNames },
            } = data;
            if (duplicateNames) {
              enqueueSnackbar("This measure’s name already exists.", {
                variant: "error",
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
    const { templateData: { questions = [] } = {} } = formFields;
    if (questions.length <= 0) {
      setSubmitting(false);
      enqueueSnackbar("Please add a question.", {
        variant: "error",
      });
    } else
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
    handleOk();
    callback();
  };

  const handleOk = () => {
    router.push(
      `/therapist/patient/view/${patientId}/?mainTab=therapy&tab=measures`
    );
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Create Measures" />
        <CreateMeasuresComponent
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

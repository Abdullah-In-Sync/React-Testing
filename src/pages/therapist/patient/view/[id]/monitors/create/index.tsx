import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useRef } from "react";
import ContentHeader from "../../../../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../../../../components/common/CustomModal/InfoModal";
import Layout from "../../../../../../../components/layout";
import { THERAPIST_CREATE_MONITOR } from "../../../../../../../graphql/Monitor/graphql";
import { ConfirmElement } from "../../../../../../../components/common/ConfirmWrapper";
import TherapistCreateMonitorForm from "../../../../../../../components/therapist/patient/monitor/create/TherapistCreateMonitor";

const TherapistCreateMonitor: NextPage = () => {
  const router = useRouter();
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();

  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [createMonitor] = useMutation(THERAPIST_CREATE_MONITOR);

  /* istanbul ignore next */
  const submitForm = async (formFields, doneCallback) => {
    const { name, questions } = formFields;

    const modifyQuestions = questions.map((item) => {
      const { question, questionType, questionOption } = item;
      const modifiedQuestionOption =
        questionType === "emoji"
          ? JSON.stringify(questionOption)
          : questionOption;

      return {
        question,
        question_type: questionType,
        question_option: modifiedQuestionOption,
      };
    });

    console.debug("Create variable", {
      name,
      questions: JSON.stringify(modifyQuestions),
    });
    try {
      await createMonitor({
        variables: {
          name,
          questions: JSON.stringify(modifyQuestions),
        },
        onCompleted: (data) => {
          if (data.therapistCreateMonitor.status === true) {
            enqueueSnackbar("Monitor created successfully", {
              variant: "success",
            });
            router.back();
          } else {
            enqueueSnackbar(`This monitor's name already exists`, {
              variant: "error",
            });
          }
          doneCallback();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const handleSavePress = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => submitForm(formFields, callback),
      description: "Are you sure you want to create the monitor?",
      setSubmitting,
    });
  };

  /* istanbul ignore next */
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
        <ContentHeader title="Create Monitor" />
        <TherapistCreateMonitorForm
          submitForm={handleSavePress}
          onPressCancel={onPressCancel}
          confirmRef={confirmRef}
          infoModalRef={infoModalRef}
        />
      </Layout>
    </>
  );
};

export default TherapistCreateMonitor;

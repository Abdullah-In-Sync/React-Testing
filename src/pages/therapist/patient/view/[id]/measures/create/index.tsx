import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import ContentHeader from "../../../../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../../../../components/common/Loader";
import { ConfirmElement } from "../../../../../../../components/common/TemplateFormat/ConfirmWrapper";
import Layout from "../../../../../../../components/layout";
import CreateMeasuresComponent from "../../../../../../../components/therapist/measures/create/CreateMeasures";
import { THERAPIST_CREATE_MEASURES } from "../../../../../../../graphql/Measure/graphql";

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
              enqueueSnackbar("This measure name already exist.", {
                variant: "error",
              });
            } else {
              confirmRef.current.showSuccess({
                description: "Your measures has been created successfully.",
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
        "Are you sure you are canceling the measures without saving?",
    });
  };

  /* istanbul ignore next */
  const cancelConfirm = (callback) => {
    handleOk();
    callback();
  };

  const handleOk = () => {
    router.push(`/therapist/patient/view/${patientId}/?tab=measures`);
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

import { useMutation, useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";

import Layout from "../../../../../components/layout";
import TakeTest from "../../../../../components/patient/measures/TakeTest/TakeTest";
import {
  PATIENT_MEASURE_SUBMIT_TEST,
  PATIENT_VIEW_MEASURE,
} from "../../../../../graphql/Measure/graphql";
import {
  PatientViewMeasuresData,
  PatientSubmitTestData,
} from "../../../../../graphql/Measure/types";
import withAuthentication from "../../../../../hoc/auth";
import { ConfirmElement } from "../../../../../components/common/ConfirmWrapper";

const MeasureTestPage: NextPage = () => {
  const router = useRouter();
  const confirmRef = useRef<ConfirmElement>(null);
  const [patientMeasureSubmitTest] = useMutation<PatientSubmitTestData>(
    PATIENT_MEASURE_SUBMIT_TEST
  );
  const {
    query: { id },
  } = router;
  const measureId = id as string;
  const [loader, setLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    loading: loadingMeasureData,
    data: { patientViewMeasure: measureData = null } = {},
  } = useQuery<PatientViewMeasuresData>(PATIENT_VIEW_MEASURE, {
    variables: {
      measureId,
    },
  });

  /* istanbul ignore next */
  const onPressCancel = () => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => {
        callback();
        router.push("/patient/therapy/?tab=measures");
      },
      description:
        "Are you sure you are canceling the response without submitting",
    });
  };

  const takeTestSubmit = async (formFields, callback) => {
    setLoader(true);
    const { templateData, sessionNo, templateId, measureId } = formFields;
    const { totalScore = 0 } = templateData || {};
    const variables = {
      measureId,
      score: totalScore,
      templateData: JSON.stringify(templateData),
      sessionNo,
      templateId,
    };

    try {
      await patientMeasureSubmitTest({
        variables,
        onCompleted: () => {
          router.push("/patient/therapy/?tab=measures");
          callback();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    } finally {
      setLoader(false);
    }
  };

  const submitForm = (formFields, { setSubmitting }) => {
    const { templateData } = formFields;
    const { totalScore = 0 } = templateData || {};
    if (totalScore > 0) {
      confirmRef.current.openConfirm({
        confirmFunction: (callback) => takeTestSubmit(formFields, callback),
        description: "Are you sure you want to save the test score?",
        setSubmitting,
      });
    } else {
      enqueueSnackbar("Please select your score", { variant: "error" });
      setSubmitting(false);
    }
  };

  /* istanbul ignore next */
  const handleBackButton = () => {
    router.back();
  };

  return (
    !loadingMeasureData && (
      <>
        <Layout>
          <ContentHeader title="Measures" />
          <Loader visible={loadingMeasureData || loader} />
          <TakeTest
            backButtonClick={handleBackButton}
            measureData={measureData}
            onPressCancel={onPressCancel}
            submitForm={submitForm}
            confirmRef={confirmRef}
          />
        </Layout>
      </>
    )
  );
};

export default withAuthentication(MeasureTestPage, ["patient"]);

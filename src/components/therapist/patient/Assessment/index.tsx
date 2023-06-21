import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import {
  GET_RISKS_LIST,
  THERAPIST_GET_PATIENT_ASSESSMENT,
  THERAPIST_SUBMIT_ASSESSMENT,
} from "../../../../graphql/assessment/graphql";
import { ConfirmElement } from "../../../common/ConfirmWrapper";
import Loader from "../../../common/Loader";
import TherapistPatientOverallAssessment from "./overallAssessment/OverallAssessment";
import { csvEncode } from "../../../../utility/helper";

const TherapistPatientAssessment: any = () => {
  const router = useRouter();
  const { query: { id: patientId } = {} } = router;
  const confirmRef = useRef<ConfirmElement>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [submitTherapistAssessment] = useMutation(THERAPIST_SUBMIT_ASSESSMENT);
  const { enqueueSnackbar } = useSnackbar();

  const [
    getRisksListData,
    {
      data: { getRisksList: risksListData = undefined } = {},
      loading: risksListLoading,
    },
  ] = useLazyQuery<any>(GET_RISKS_LIST, {
    onCompleted: () => {
      setLoader(false);
    },
    fetchPolicy: "cache-and-network",
  });

  const [
    getAssessmentListData,
    {
      data: {
        therapistGetPatientAssessment: {
          list: assessmentListData = undefined,
          overall_assesment_text: overallAssesmentText = undefined,
          risk = undefined,
          therapies = [],
        } = {},
      } = {},
      loading: assessmentListLoading,
    },
  ] = useLazyQuery<any>(THERAPIST_GET_PATIENT_ASSESSMENT, {
    onCompleted: () => {
      setLoader(false);
    },
    fetchPolicy: "cache-and-network",
  });

  const { pttherapy_session: pttherapySession } =
    therapies.length > 0
      ? therapies[therapies.length - 1]
      : ({} as { pttherapy_session: string });

  useEffect(() => {
    getAssessmentListData({
      variables: { patientId },
    });
    getRisksListData();
  }, []);

  const submitAssessmentApi = async (formFields, doneCallback) => {
    const { risks, overallAssesmentText, pttherapySession } = formFields;
    const riskStringArray = [];
    risks.forEach((item) => {
      riskStringArray.push(item.value);
    });

    try {
      await submitTherapistAssessment({
        variables: {
          ...{
            overallAssesmentText,
            pttherapySession: "" + pttherapySession,
            risk: csvEncode(riskStringArray),
          },
          ...{ patientId },
        },
        onCompleted: (data) => {
          const { therapistSubmitAssessment } = data;
          if (therapistSubmitAssessment) {
            enqueueSnackbar("Overall assessment successfully added.", {
              variant: "success",
            });
            doneCallback();
          }
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      console.log("eeeeeee", e);
      enqueueSnackbar("Something is wrong", { variant: "error" });
      setLoader(false);
    }
  };

  const submitCallback = (setSubmitting) => {
    confirmRef.current.close();
    setSubmitting(false);
  };

  const handleSubmitTherapistAssessment = (v, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: () =>
        submitAssessmentApi(v, () => submitCallback(setSubmitting)),
      description: "Are you sure you want to update the assessment?",
    });
  };

  return (
    <>
      <Loader visible={loader} />
      {!assessmentListLoading && (
        <TherapistPatientOverallAssessment
          risksListData={risksListData}
          assessmentListData={assessmentListData}
          onSubmitTherapistAssessment={handleSubmitTherapistAssessment}
          {...{
            overallAssesmentText,
            pttherapySession,
            risk,
            risksListLoading,
            assessmentListLoading,
            confirmRef,
          }}
        />
      )}
    </>
  );
};

export default TherapistPatientAssessment;

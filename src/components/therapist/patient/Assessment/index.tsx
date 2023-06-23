import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import {
  GET_RISKS_LIST,
  THERAPIST_GET_PATIENT_ASSESSMENT,
  THERAPIST_SUBMIT_ASSESSMENT,
  THERAPIST_VIEW_ASSESSMENT,
} from "../../../../graphql/assessment/graphql";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import Loader from "../../../common/Loader";
import TherapistPatientOverallAssessment from "./overallAssessment/OverallAssessment";
import { csvEncode } from "../../../../utility/helper";
import {
  GetRisksListData,
  TherapistGetPatientAssessmentData,
} from "../../../../graphql/assessment/types";
import TherapistAssessmentMain from "../../../../pages/therapist/patient/view/[id]/assessment";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import ClinicalAssessment from "./clinicalAssessment/ClinicalAssessment";

const TherapistPatientAssessmentList: React.FC = () => {
  const router = useRouter();
  const modalRefAddAssessment = useRef<ModalElement>(null);
  const { query: { id: patientId, assessmentView, assessmentId } = {} } =
    router;
  const confirmRef = useRef<ConfirmElement>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [submitTherapistAssessment] = useMutation(THERAPIST_SUBMIT_ASSESSMENT);
  const { enqueueSnackbar } = useSnackbar();

  const [
    getTherapistViewAssessment,
    {
      data: {
        therapistviewAssessment: { category: categoryListData = [] } = {},
      } = {},
      loading: therapistViewAssessmentLoading,
    },
  ] = useLazyQuery<any>(THERAPIST_VIEW_ASSESSMENT, {
    onCompleted: () => {
      setLoader(false);
    },
    fetchPolicy: "cache-and-network",
  });

  const [
    getRisksListData,
    {
      data: { getRisksList: risksListData = undefined } = {},
      loading: risksListLoading,
    },
  ] = useLazyQuery<GetRisksListData>(GET_RISKS_LIST, {
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
          list: assessmentListData = [],
          overall_assesment_text: overallAssesmentText = undefined,
          risk = undefined,
          therapies = [],
        } = {},
      } = {},
      loading: assessmentListLoading,
      refetch: reFetchAssessmentList,
    },
  ] = useLazyQuery<TherapistGetPatientAssessmentData>(
    THERAPIST_GET_PATIENT_ASSESSMENT,
    {
      onCompleted: () => {
        setLoader(false);
      },
      fetchPolicy: "cache-and-network",
    }
  );

  const { pttherapy_session: pttherapySession } =
    therapies.length > 0
      ? therapies[therapies.length - 1]
      : ({} as { pttherapy_session: string });

  useEffect(() => {
    getRisksListData();
    getAssessmentListData({
      variables: { patientId },
    });
  }, []);

  useEffect(() => {
    setLoader(true);
    if (assessmentId)
      getTherapistViewAssessment({
        variables: { assessmentId },
      });
  }, [assessmentId]);

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
            enqueueSnackbar("Overall assessment submitted successfully.", {
              variant: "success",
            });
            doneCallback();
          }
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
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
      setSubmitting,
    });
  };

  const handleAddAssessment = () => {
    modalRefAddAssessment.current?.open();
  };

  const handleClickAssement = (item) => {
    const { _id: assessmentId } = item;
    router.push(
      `/therapist/patient/view/${patientId}/?mainTab=assessment&assessmentView=clinical-assessment&assessmentId=${assessmentId}`
    );
  };

  const onPressBack = () => {
    router.back();
  };

  const currentView = () => {
    switch (assessmentView) {
      case "clinical-assessment":
        return (
          !therapistViewAssessmentLoading && (
            <ClinicalAssessment {...{ onPressBack, categoryListData }} />
          )
        );
      default:
        return (
          !assessmentListLoading && (
            <>
              <TherapistPatientOverallAssessment
                risksListData={risksListData}
                onSubmitTherapistAssessment={handleSubmitTherapistAssessment}
                onClickAddAssessment={handleAddAssessment}
                {...{
                  overallAssesmentText,
                  pttherapySession,
                  risk,
                  assessmentListData,
                  risksListLoading,
                  assessmentListLoading,
                  confirmRef,
                  handleClickAssement,
                }}
              />
              <TherapistAssessmentMain
                modalRefAddAssessment={modalRefAddAssessment}
                reFetchAssessmentList={reFetchAssessmentList}
              />
            </>
          )
        );
    }
  };

  return (
    <ConfirmWrapper ref={confirmRef}>
      <Loader visible={loader} />
      {currentView()}
    </ConfirmWrapper>
  );
};

export default TherapistPatientAssessmentList;

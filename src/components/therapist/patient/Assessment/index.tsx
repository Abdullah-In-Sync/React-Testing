import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import {
  GET_RISKS_LIST,
  THERAPIST_GET_PATIENT_ASSESSMENT,
  THERAPIST_SUBMIT_ASSESSMENT,
  THERAPIST_UPDATE_ASSESSMENT_CATEGORY,
  THERAPIST_VIEW_ASSESSMENT,
} from "../../../../graphql/assessment/graphql";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import Loader from "../../../common/Loader";
import TherapistPatientOverallAssessment from "./overallAssessment/OverallAssessment";
import { csvEncode } from "../../../../utility/helper";
import {
  GetRisksListData,
  TherapistGetPatientAssessmentData,
  TherapistviewAssessmentData,
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
  const [initialFetchAssessmentList, setInitialFetchAssessmentList] =
    useState<boolean>(true);
  const [submitTherapistAssessment] = useMutation(THERAPIST_SUBMIT_ASSESSMENT);
  const [updateTherapitAssessmentCategory] = useMutation(
    THERAPIST_UPDATE_ASSESSMENT_CATEGORY
  );
  const { enqueueSnackbar } = useSnackbar();

  const [
    getTherapistViewAssessment,
    {
      data: {
        therapistviewAssessment: { category: categoryListData = [] } = {},
      } = {},
      loading: therapistViewAssessmentLoading,
      refetch: refetchGetTherapistViewAssessment,
    },
  ] = useLazyQuery<TherapistviewAssessmentData>(THERAPIST_VIEW_ASSESSMENT, {
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
        if (initialFetchAssessmentList) setInitialFetchAssessmentList(false);

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
    if (!assessmentId) {
      getRisksListData({
        onCompleted: () => {
          getAssessmentListData({
            variables: { patientId },
          });
        },
      });
    }
  }, []);

  useEffect(() => {
    if (assessmentId) {
      setLoader(true);
      getTherapistViewAssessment({
        variables: { assessmentId },
      });
    }
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

  const updateAssessmentCategoryApi = async (formFields, doneCallback) => {
    try {
      await updateTherapitAssessmentCategory({
        variables: formFields,
        onCompleted: (data) => {
          const { therapistUpdateAssessmentCat } = data;
          if (therapistUpdateAssessmentCat) {
            refetchGetTherapistViewAssessment();
            enqueueSnackbar("Assessment shared successfully.", {
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

  const actionButtonClick = (item) => {
    const { _id: categoryId } = item;
    confirmRef.current.openConfirm({
      confirmFunction: () =>
        updateAssessmentCategoryApi(
          { categoryId, patientId, updateCat: { share_status: 1 } },
          () => confirmRef.current.close()
        ),
      description: "Are you sure you want to share the assessment?",
    });
  };

  const currentView = () => {
    switch (assessmentView) {
      case "clinical-assessment":
        return (
          <ClinicalAssessment
            {...{
              onPressBack,
              categoryListData,
              actionButtonClick,
              therapistViewAssessmentLoading,
            }}
          />
        );
      default:
        return (
          !initialFetchAssessmentList && (
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

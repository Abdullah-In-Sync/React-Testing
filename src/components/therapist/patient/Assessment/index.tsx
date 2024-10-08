import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import {
  GET_RISKS_LIST,
  THERAPIST_ASSESSMENT_SUBMIT_ANSWER,
  THERAPIST_GET_PATIENT_ASSESSMENT,
  THERAPIST_SUBMIT_ASSESSMENT,
  THERAPIST_UPDATE_ASSESSMENT_CATEGORY,
  THERAPIST_UPDATE_ASSESSMENT_QUESTION,
  THERAPIST_VIEW_ASSESSMENT,
  THERAPIST_GET_ASSESSMENT_SUMMARY_VIEW,
  THERAPIST_VIEW_ASSESSMENT_QUESTION,
} from "../../../../graphql/assessment/graphql";
import {
  GetRisksListData,
  TherapistGetPatientAssessmentData,
  TherapistViewAssessmentQuestionsData,
  TherapistviewAssessmentData,
} from "../../../../graphql/assessment/types";
import TherapistAssessmentMain from "../../../../pages/therapist/patient/view/[id]/assessment";
import { csvEncode } from "../../../../utility/helper";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import { ModalElement } from "../../../common/CustomModal/CommonModal";
import Loader from "../../../common/Loader";
import ClinicalAssessment from "./clinicalAssessment/ClinicalAssessment";
import TherapistPatientOverallAssessment from "./overallAssessment/OverallAssessment";
import SummaryView from "./clinicalAssessment/SummaryView";
const TherapistPatientAssessmentList: React.FC = () => {
  const router = useRouter();
  const modalRefAddAssessment = useRef<ModalElement>(null);
  /* istanbul ignore next */
  const { query: { id: patientId, assessmentView, assessmentId } = {} } =
    router;
  const confirmRef = useRef<ConfirmElement>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [initialFetchCategoriesList, setInitialFetchCategoriesList] =
    useState<boolean>(true);
  const [submitTherapistAssessment] = useMutation(THERAPIST_SUBMIT_ASSESSMENT);
  const [updateTherapitAssessmentCategory] = useMutation(
    THERAPIST_UPDATE_ASSESSMENT_CATEGORY
  );
  const [updateAssessmentQuestion] = useMutation(
    THERAPIST_UPDATE_ASSESSMENT_QUESTION
  );
  const [submitAssessmentResponse] = useMutation(
    THERAPIST_ASSESSMENT_SUBMIT_ANSWER
  );
  const [assessmentCategory, setAssessmentCategory] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();

  const [
    getTherapistViewAssessment,
    {
      data: {
        therapistviewAssessment: { data: assessmentViewData = undefined } = {},
      } = {},
      loading: therapistViewAssessmentLoading,
      refetch: refetchGetTherapistViewAssessment,
    },
  ] = useLazyQuery<TherapistviewAssessmentData>(THERAPIST_VIEW_ASSESSMENT, {
    onCompleted: (data) => {
      const { therapistviewAssessment } = data;
      setLoader(false);
      setInitialFetchCategoriesList(false);
      /* istanbul ignore next */
      setAssessmentCategory(therapistviewAssessment?.data);
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

  const [getAssessmentQuestionData] =
    useLazyQuery<TherapistViewAssessmentQuestionsData>(
      THERAPIST_VIEW_ASSESSMENT_QUESTION,
      {
        fetchPolicy: "cache-and-network",
      }
    );

  const [
    getAssessmentListData,
    {
      data: {
        therapistGetPatientAssessment: {
          data: {
            list: assessmentListData = [],
            overall_assesment_text: overallAssesmentText = undefined,
            risk = undefined,
            therapies = [],
          } = {},
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

  const [
    getTherapistAssessmentSummaryView,
    { data: therapistAssessmentSummaryViewData },
  ] = useLazyQuery(THERAPIST_GET_ASSESSMENT_SUMMARY_VIEW, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  /* istanbul ignore next */
  // useEffect(() => {
  //   if (assessmentId) {
  //     getTherapistAssessmentSummaryView({
  //       variables: {
  //         patient_id: patientId,
  //         assessment_id: assessmentId,

  //         // assessment_id: "57450002-c884-4c4a-9b32-4c536135231d",
  //         // patient_id: "5aa455d5de8248848b71c8113118e3f5",
  //       },
  //     });
  //   }
  // }, [assessmentId, patientId]);

  const { pttherapy_session: pttherapySession } =
    therapies.length > 0
      ? therapies[therapies.length - 1]
      : ({} as { pttherapy_session: string });

  useEffect(() => {
    if (!assessmentId && !assessmentView) {
      setLoader(true);
      getRisksListData({
        onCompleted: () => {
          getAssessmentListData({
            variables: { patientId },
          });
        },
      });
    }
  }, [assessmentView]);

  useEffect(() => {
    if (assessmentId) {
      setLoader(true);
      setInitialFetchCategoriesList(true);
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
          /* istanbul ignore next */
          const {
            therapistSubmitAssessment: { result, message },
          } = data;
          if (result) {
            enqueueSnackbar("Overall assessment submitted successfully.", {
              variant: "success",
            });
            reFetchAssessmentList();
            doneCallback();
          } else if (!result) {
            enqueueSnackbar(message, {
              variant: "error",
            });
          }
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
      /* istanbul ignore next */
      setLoader(false);
    }
  };

  const updateAssessmentCategoryApi = async (formFields, doneCallback) => {
    try {
      await updateTherapitAssessmentCategory({
        variables: formFields,
        onCompleted: (data) => {
          const {
            therapistUpdateAssessmentCat: { result },
          } = data;
          if (result) {
            /* istanbul ignore next */
            refetchGetTherapistViewAssessment();
            /* istanbul ignore next */
            enqueueSnackbar("Assessment shared successfully.", {
              variant: "success",
            });
            /* istanbul ignore next */
            doneCallback();
          }
          /* istanbul ignore next */
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
      /* istanbul ignore next */
      setLoader(false);
    }
  };

  const deleteAssessmentQuestion = async (formFields, doneCallback) => {
    /* istanbul ignore next */
    try {
      await updateAssessmentQuestion({
        variables: formFields,
        onCompleted: (data) => {
          const {
            therapistUpdateAssessmentQs: { result },
          } = data;
          if (result) {
            /* istanbul ignore next */
            enqueueSnackbar("Question deleted successfully.", {
              variant: "success",
            });
            /* istanbul ignore next */
            doneCallback();
          }
          /* istanbul ignore next */
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
      /* istanbul ignore next */
      setLoader(false);
    }
  };

  const submitAssessmentResponseApi = async (formFields, doneCallback) => {
    const { response, _id: categoryId } = formFields;

    try {
      await submitAssessmentResponse({
        variables: {
          categoryId,
          patientId,
          quesData: JSON.stringify(response),
        },
        onCompleted: (data) => {
          const {
            therapistAssessmentSubmitAns: { result },
          } = data;
          if (result) {
            /* istanbul ignore next */
            enqueueSnackbar("Response submitted successfully.", {
              variant: "success",
            });
            /* istanbul ignore next */
            doneCallback();
          }
          /* istanbul ignore next */
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
      /* istanbul ignore next */
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

  /* istanbul ignore next */
  const handleAddAssessment = () => {
    modalRefAddAssessment.current?.open();
  };

  const handleClickAssement = (item) => {
    const { _id: assessmentId } = item;
    router.push(
      `/therapist/patient/view/${patientId}/?mainTab=assessment&assessmentView=clinical-assessment&assessmentId=${assessmentId}`
    );
  };

  /* istanbul ignore next */
  const onPressSummaryView = () => {
    // refetch();
    getTherapistAssessmentSummaryView({
      variables: {
        patient_id: patientId,
        assessment_id: assessmentId,
      },
    });
    router.push(
      `/therapist/patient/view/${patientId}/?mainTab=assessment&assessmentView=summary-view`
    );
  };

  /* istanbul ignore next */
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

  const onToggleQuestionAccordion = (_, categoryData, i) => {
    setLoader(true);
    const { _id: categoryId } = categoryData;
    const t = JSON.parse(JSON.stringify(assessmentViewData));
    if (assessmentCategory.category[i]["assessmentQuestionsViewData"]) {
      setAssessmentCategory({ ...assessmentViewData });
      setLoader(false);
    } else
      getAssessmentQuestionData({
        variables: { patientId, categoryId },
        onCompleted: (data) => {
          /* istanbul ignore next */
          const {
            therapistviewAssessmentQs: {
              data: therapistviewAssessmentQsData,
            } = {},
          } = data;
          t.category[i]["assessmentQuestionsViewData"] =
            therapistviewAssessmentQsData;
          setAssessmentCategory({ ...assessmentCategory, ...t });
          setLoader(false);
        },
      });
  };

  const onSubmitAssessmentResponse = (v, formikHelperProps, categoryData) => {
    const { setSubmitting } = formikHelperProps;
    const { questions } = v;
    const answerArr = [];

    const response = questions.map(({ question_id, answer }) => {
      if (answer && answer !== "") answerArr.push(answer);

      return { question_id, answer };
    });

    if (answerArr.length <= 0) {
      setSubmitting(false);
      return enqueueSnackbar(
        "Patient response text box cannot be left empty.",
        {
          variant: "error",
        }
      );
    }

    confirmRef.current.openConfirm({
      confirmFunction: () =>
        submitAssessmentResponseApi({ response, ...categoryData }, () =>
          closeCallback({ setSubmitting })
        ),
      description: "Are you sure you want to submit the response?",
      setSubmitting,
    });
  };

  const closeCallback = ({ setSubmitting }) => {
    setSubmitting(false);
    confirmRef.current.close();
  };

  const handleDeleteQuestion = (v) => {
    setLoader(true);
    const { questionId, categoryId, callback } = v;
    deleteAssessmentQuestion(
      { patientId, categoryId, questionId, update: { status: 0 } },
      callback
    );
  };

  const currentView = () => {
    switch (assessmentView) {
      case "clinical-assessment":
        return (
          !initialFetchCategoriesList && (
            <ClinicalAssessment
              onToggleQuestionAccordion={onToggleQuestionAccordion}
              {...{
                onPressBack,
                categoryListData: assessmentCategory,
                actionButtonClick,
                therapistViewAssessmentLoading,
                onSubmitAssessmentResponse,
                confirmRef,
                handleDeleteQuestion,
                onPressSummaryView,
              }}
            />
          )
        );
      case "summary-view":
        return (
          <SummaryView
            therapistAssessmentSummaryViewData={
              therapistAssessmentSummaryViewData
            }
          />
        );
      default:
        return (
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

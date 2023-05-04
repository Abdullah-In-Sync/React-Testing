import { useLazyQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  GET_THERAPIST_MEASURES_LIST,
  GET_THERAPIST_MEASURES_SCORE_LIST,
  THERAPIST_MEASURE_SUBMIT_TEST,
  UPDATE_THERAPIST_MEASURE,
} from "../../../graphql/Measure/graphql";
import {
  TherapistMeasuresData,
  UpdateTherapistMeasureRes,
  UpdateTherapistMeasureVars,
} from "../../../graphql/Measure/types";
import {
  ADD_THERAPIST_MEASURE_PLAN_ADD,
  GET_THERAPIST_MEASURES_PLAN_LIST,
} from "../../../graphql/SafetyPlan/graphql";
import ConfirmationModal from "../../common/ConfirmationModal";
import {
  CommonModal,
  ModalElement,
} from "../../common/CustomModal/CommonModal";
import Loader from "../../common/Loader";
import { SuccessModal } from "../../common/SuccessModal";
import { ConfirmElement } from "../../common/TemplateFormat/ConfirmWrapper";
import AddMeasuresPlanForm from "./AddMeasuresPlan";
import MeasureContent from "./MeasuresContent";

const Measures: React.FC = () => {
  const confirmRef = useRef<ConfirmElement>(null);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isConfirmAddTask, setIsConfirmAddTask] = useState(false);
  const [loader, setLoader] = useState(false);
  const [addTasksuccessModal, setAddTaskSuccessModal] =
    useState<boolean>(false);
  const [accodionView, setAccodionView] = useState<any>();

  const [accodionViewScore, setAccodionViewScore] = useState();

  const [planid, setPlanId] = useState();
  const modalRefAddPlan = useRef<ModalElement>(null);
  const [addTherapistMeasuresPlan] = useMutation(
    ADD_THERAPIST_MEASURE_PLAN_ADD
  );
  const [therapistMeasureSubmitTest] = useMutation(
    THERAPIST_MEASURE_SUBMIT_TEST
  );
  /* istanbul ignore next */
  const patId = router?.query?.id as string;

  const handleOpenAddPlanModal = useCallback(
    /* istanbul ignore next */
    () => modalRefAddPlan.current?.open(),
    []
  );

  const handleCloseAddPlanModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddPlan.current?.close();
  }, []);
  const {
    query: { id },
  } = router;
  const patientId = id as string;
  const [isConfirmationModel, setIsConfirmationModel] = React.useState(false);
  const selectedMeasure = React.useRef<any>();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const onClear = () => {
    setIsConfirmationModel(false);
  };
  const onConfirmSubmit = () => {
    const {
      _id,
      description,
      share_status,
      status,
      template_data,
      template_id,
      title,
      pressedIconButton,
    } = selectedMeasure.current;
    setIsConfirmationModel(false);
    updateMeasure({
      variables: {
        measure_id: _id,
        update: {
          description,
          share_status: pressedIconButton == "share" ? 1 : share_status,
          status: pressedIconButton == "delete" ? 0 : status,
          template_data,
          template_id,
          title,
        },
      },
    });
  };
  const [
    getTherapistMeasuresList,
    {
      loading: loadingMeasuresList,
      data: { therapistListMeasures: listData = [] } = {},
      refetch,
    },
  ] = useLazyQuery<TherapistMeasuresData>(GET_THERAPIST_MEASURES_LIST, {
    fetchPolicy: "cache-and-network",
  });

  const [updateMeasure] = useMutation<
    UpdateTherapistMeasureRes,
    UpdateTherapistMeasureVars
  >(UPDATE_THERAPIST_MEASURE, {
    onCompleted: () => {
      /* istanbul ignore next */
      setIsSuccess(true);
    },
  });

  const [getMeasuresTherapistPlanList, { data: therapistListData }] =
    useLazyQuery(GET_THERAPIST_MEASURES_PLAN_LIST, {
      fetchPolicy: "network-only",
      onCompleted: () => {
        /* istanbul ignore next */
      },
    });

  const [getTherapistViewScoreData] = useLazyQuery(
    GET_THERAPIST_MEASURES_SCORE_LIST,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        const { therapistViewScoreList = {} } = data || {};
        setAccodionViewScore(therapistViewScoreList);
      },
    }
  );

  useEffect(() => {
    getTherapistMeasuresList({
      variables: { patientId },
    });

    /* istanbul ignore next */
    getMeasuresTherapistPlanList();
  }, []);

  /* istanbul ignore next */
  const handleCreateMeasure = () => {
    router.push(`/therapist/patient/view/${patientId}/measures/create`);
  };

  /* istanbul ignore next */
  const actionButtonClick = (value) => {
    selectedMeasure.current = value;
    const { pressedIconButton, _id } = value;
    switch (pressedIconButton) {
      case "edit":
        router.push(
          `/therapist/patient/view/${patientId}/measures/edit/${_id}`
        );
        break;
      case "share":
      case "delete":
        setIsConfirmationModel(true);
        break;
      case "takeTest":
        setAccodionView({ data: value, type: pressedIconButton });
        break;
      case "viewscores":
        getTherapistViewScoreData({
          variables: {
            measure_id: value._id,
          },
        });
        break;
    }
  };

  /* istanbul ignore next */
  const receivePlanId = (value) => {
    setPlanId(value);
  };

  /* istanbul ignore next */
  const handleAddPlan = async () => {
    try {
      await addTherapistMeasuresPlan({
        variables: {
          patient_id: patId,
          measure_id: planid,
        },
        onCompleted: (data) => {
          /* istanbul ignore next */
          setIsConfirmAddTask(false);
          /* istanbul ignore next */
          const result = data.therapistAddMeasure.result;
          /* istanbul ignore next */
          if (result == true) {
            setAddTaskSuccessModal(true);
          } else {
            enqueueSnackbar("This measure already exist.", {
              variant: "error",
            });
          }
          /* istanbul ignore next */
        },
      });
      /* istanbul ignore next */
      handleCloseAddPlanModal();
      // refetch();
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirmAddTask(false);
  };

  /* istanbul ignore next */
  const handleOk = () => {
    /* istanbul ignore next */
    setAddTaskSuccessModal(false);
    setIsSuccess(false);
    /* istanbul ignore next */
    refetch();
  };

  const onPressCancel = () => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => {
        setAccodionView(undefined);
        callback();
      },
      description: "Are you sure you want to cancel the test without saving?",
    });
  };

  const onPressCancelBack = () => {
    setAccodionViewScore(undefined);
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
      await therapistMeasureSubmitTest({
        variables,
        onCompleted: () => {
          confirmRef.current.showSuccess({
            description: "Your test score has been saved successfully.",
            handleOk: () => {
              refetch();
              callback();
              setAccodionView(undefined);
            },
          });
        },
      });
    } catch (e) {
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    } finally {
      setLoader(false);
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    const { templateData } = formFields;
    const { totalScore = 0 } = templateData || {};
    // const isRadioResponse = optionsQuestions[0].labels.some(
    //   (item) => item.answer === true
    // );
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

  const onHandleResponse = (v) => {
    setAccodionView({ data: v, type: "viewResponse" });
  };

  const handleViewResponseBackClick = () => {
    setAccodionView(undefined);
  };

  return (
    <>
      <Loader visible={loadingMeasuresList || loader} />
      <MeasureContent
        listData={listData}
        onClickCreateMeasure={handleCreateMeasure}
        actionButtonClick={actionButtonClick}
        accordionViewData={accodionView}
        onPressAddPlan={handleOpenAddPlanModal}
        onPressCancel={onPressCancel}
        submitForm={handleSavePress}
        confirmRef={confirmRef}
        accodionViewScore={accodionViewScore}
        onPressCancelBack={onPressCancelBack}
        onViewResponseClick={onHandleResponse}
        viewResponseBackClick={handleViewResponseBackClick}
      />

      <CommonModal
        ref={modalRefAddPlan}
        headerTitleText="Add Measure"
        maxWidth="sm"
      >
        <AddMeasuresPlanForm
          onPressSubmit={() => setIsConfirmAddTask(true)}
          therapistSafetyPlanList={therapistListData}
          receivePlanId={receivePlanId}
        />
      </CommonModal>

      {isConfirmAddTask && (
        <ConfirmationModal
          label="Are you sure you want to add the measure?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handleAddPlan}
        />
      )}
      {isConfirmationModel && (
        <ConfirmationModal
          label={`Are you sure you want to ${selectedMeasure.current.pressedIconButton}
      the Measure?`}
          onCancel={onClear}
          onConfirm={onConfirmSubmit}
        />
      )}
      {isSuccess && (
        <SuccessModal
          isOpen={Boolean(isSuccess)}
          title="Successful"
          description={`Your Measure has been ${selectedMeasure.current.pressedIconButton}d successfully.`}
          onOk={handleOk}
        />
      )}

      {
        /* istanbul ignore next */
        addTasksuccessModal && (
          <SuccessModal
            isOpen={addTasksuccessModal}
            title="Successful"
            description={"Your measure has been added successfully."}
            onOk={handleOk}
          />
        )
      }
    </>
  );
};

export default Measures;

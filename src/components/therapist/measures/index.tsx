import { useLazyQuery, useMutation } from "@apollo/client";
import * as React from "react";
import { GET_THERAPIST_MEASURES_LIST } from "../../../graphql/Measure/graphql";
import MeasureContent from "./MeasuresContent";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { TherapistMeasuresData } from "../../../graphql/Measure/types";
import Loader from "../../common/Loader";
import {
  CommonModal,
  ModalElement,
} from "../../common/CustomModal/CommonModal";
import {
  ADD_THERAPIST_MEASURE_PLAN_ADD,
  GET_THERAPIST_MEASURES_PLAN_LIST,
} from "../../../graphql/SafetyPlan/graphql";
import AddMeasuresPlanForm from "./AddMeasuresPlan";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../common/ConfirmationModal";
import { SuccessModal } from "../../common/SuccessModal";

const Measures: React.FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isConfirmAddTask, setIsConfirmAddTask] = useState(false);
  const [addTasksuccessModal, setAddTaskSuccessModal] =
    useState<boolean>(false);

  const [planid, setPlanId] = useState();
  const modalRefAddPlan = useRef<ModalElement>(null);
  const [addTherapistMeasuresPlan] = useMutation(
    ADD_THERAPIST_MEASURE_PLAN_ADD
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

  const [getMeasuresTherapistPlanList, { data: therapistListData }] =
    useLazyQuery(GET_THERAPIST_MEASURES_PLAN_LIST, {
      fetchPolicy: "network-only",
      onCompleted: () => {
        /* istanbul ignore next */
      },
    });

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
  const actionButtonClick = (v) => {
    const { pressedIconButton, _id } = v;
    switch (pressedIconButton) {
      case "edit":
        return router.push(
          `/therapist/patient/view/${patientId}/measures/edit/${_id}`
        );
    }
  };

  if (loadingMeasuresList) return <Loader visible={true} />;

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
    /* istanbul ignore next */
    refetch();
  };
  return (
    <>
      <MeasureContent
        listData={listData}
        onClickCreateMeasure={handleCreateMeasure}
        actionButtonClick={actionButtonClick}
        onPressAddPlan={handleOpenAddPlanModal}
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

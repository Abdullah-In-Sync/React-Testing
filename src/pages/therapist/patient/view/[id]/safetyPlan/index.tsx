import { useLazyQuery, useMutation } from "@apollo/client";
import { Box } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import ConfirmationModal from "../../../../../../components/common/ConfirmationModal";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import {
  CommonModal,
  ModalElement,
} from "../../../../../../components/common/CustomModal/CommonModal";
import Loader from "../../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../../components/common/SuccessModal";
import TherapistSafetyPlanComponent from "../../../../../../components/therapist/patient/therapistSafetyPlan";
import CreateSafetyPlan from "../../../../../../components/therapist/patient/therapistSafetyPlan/create/CreateSafetyPlan";
import {
  ADD_THERAPIST_SAFETY_PLAN,
  CREATE_THERAPIST_SAFETY_PLAN,
  DELETE_THERAPIST_SAFETY_PLAN,
  GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
  GET_THERAPIST_SAFETY_PLAN_LIST,
  UPDATE_THERAPIST_SAFETY_PLAN,
  UPDATE_THERAPIST_SAFETY_PLAN_QUESTION,
  VIEW_PATIENT_SAFETY_PLAN_BY_ID,
  DELETE_THERAPIST_SAFETY_PLAN_QUESTION,
} from "../../../../../../graphql/SafetyPlan/graphql";
import { ViewSafetyPlanById } from "../../../../../../graphql/SafetyPlan/types";

import AddPlanForm from "../../../../../../components/therapist/patient/therapistSafetyPlan/create/AddSafetyPlan";
import { useAppContext } from "../../../../../../contexts/AuthContext";

const TherapistSafetyPlanIndex: NextPage = () => {
  const router = useRouter();
  const { user } = useAppContext();
  const orgId = user?.therapist_data.org_id;
  const { enqueueSnackbar } = useSnackbar();
  const modalRef = useRef<ModalElement>(null);
  const modalRefAddPlan = useRef<ModalElement>(null);
  const handleOpenCreatePlanModal = useCallback((_, v) => {
    setCurrentSafetyPlan(v);
    return modalRef.current?.open();
  }, []);
  const handleCloseCreatePlanModal = useCallback(() => {
    // setCurrentSafetyPlan(undefined)
    return modalRef.current?.close();
  }, []);

  const handleOpenAddPlanModal = useCallback(
    () => modalRefAddPlan.current?.open(),
    []
  );
  const handleCloseAddPlanModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddPlan.current?.close();
  }, []);

  const [successModal, setSuccessModal] = useState<any>();
  /* istanbul ignore next */
  const patId = router?.query?.id as string;
  const [planid, setPlanId] = useState();
  const [searchInputValue, setSearchInputValue] = useState();
  const [currentSafetyPlan, setCurrentSafetyPlan] =
    useState<ViewSafetyPlanById>();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [createTherapistSafetyPlan] = useMutation(CREATE_THERAPIST_SAFETY_PLAN);
  const [updateTherapistSafetyPlan] = useMutation(UPDATE_THERAPIST_SAFETY_PLAN);
  const [addTherapistSafetyPlan] = useMutation(ADD_THERAPIST_SAFETY_PLAN);
  const [updateTherapistSafetyPlanQuestions] = useMutation(
    UPDATE_THERAPIST_SAFETY_PLAN_QUESTION
  );
  const [deleteSafetyPlan] = useMutation(DELETE_THERAPIST_SAFETY_PLAN_QUESTION);
  const [deletePlane] = useMutation(DELETE_THERAPIST_SAFETY_PLAN);

  const [accordionOpen, setAccordionOpen] = useState();

  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    confirmObject: {
      description: "",
    },
  });

  useEffect(() => {
    getSafetyPlanList({
      variables: { patientId: patId },
    });

    getSafetyTherapistPlanList({
      variables: { orgId: orgId },
    });
  }, []);

  const [
    getSafetyPlanList,
    { loading: loadingSafetyPlanList, data: listData, refetch },
  ] = useLazyQuery(GET_SAFETY_PLAN_LIST_FOR_THERAPIST, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [
    getSafetyPlanById,
    { data: { viewPatientSafetyPlanById: planData = null } = {} } = {},
  ] = useLazyQuery(VIEW_PATIENT_SAFETY_PLAN_BY_ID, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const fetchPlanData = async (planId) => {
    setLoader(true);
    await getSafetyPlanById({
      variables: { patientId: patId, planId },
    });
  };

  // VIEW_PATIENT_SAFETY_PLAN_BY_ID
  const [getSafetyTherapistPlanList, { data: therapistListData }] =
    useLazyQuery(GET_THERAPIST_SAFETY_PLAN_LIST, {
      fetchPolicy: "network-only",
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
    });

  /* istanbul ignore next */
  const handleAddIconButton = async (index, id) => {
    setAccordionOpen(undefined);
    /* istanbul ignore next */
    if (index !== accordionOpen) {
      await fetchPlanData(id);
      setAccordionOpen(index);
    }
  };

  const submitForm = async (formFields, doneCallback) => {
    setLoader(true);
    const { planDesc, planName } = formFields;

    const variables = {
      planName,
      planDesc,
      patientId: patId,
    };

    try {
      createTherapistSafetyPlan({
        variables,
        fetchPolicy: "network-only",
        onCompleted: async (data) => {
          if (data) {
            const {
              createTherapistSafetyPlan: { _id },
            } = data;
            /* istanbul ignore next */
            setSuccessModal({
              description: "Your plan has been created successfully.",
            });
            await handleAddIconButton(0, _id);
            getSafetyPlanList({
              variables: { patientId: patId },
            });
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      /* istanbul ignore next */
      doneCallback();
    } finally {
      setLoader(false);
      /* istanbul ignore next */
      doneCallback();
    }
  };

  const handleAddPlan = async () => {
    try {
      await addTherapistSafetyPlan({
        variables: {
          patientId: patId,
          planId: planid,
        },
        onCompleted: () => {
          /* istanbul ignore next */
          enqueueSnackbar("Plan added Successfully", { variant: "success" });
        },
      });
      /* istanbul ignore next */
      handleCloseAddPlanModal();
      refetch();
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };

  //patientId: patId,
  const handleDeletesafetyPlan = async (v) => {
    try {
      await deletePlane({
        variables: {
          planId: v._id,
          updatePlan: { status: 0 },
        },
        onCompleted: () => {
          setIsConfirm(false);
          getSafetyPlanList({
            variables: { patientId: patId },
          });
          /* istanbul ignore next */
          setSuccessModal({
            description: "Your plan has been deleted successfully.",
          });
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const submitUpdateSafetyPlan = async (formFields, doneCallback) => {
    setLoader(true);
    const { planDesc, planName, share_status, shareObject } = formFields;
    const { _id } = shareObject ? shareObject : currentSafetyPlan;
    const variables = {
      planId: _id,
      updatePlan: share_status
        ? { share_status }
        : {
            description: planDesc,
            name: planName,
          },
    };

    try {
      await updateTherapistSafetyPlan({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            /* istanbul ignore next */
            setSuccessModal({
              description: share_status
                ? "Your plan has been shared successfully."
                : "Your plan has been updated successfully.",
            });
            getSafetyPlanList({
              variables: { patientId: patId },
            });
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      /* istanbul ignore next */
      doneCallback();
    } finally {
      setLoader(false);
      /* istanbul ignore next */
      doneCallback();
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    setIsConfirm({
      status: true,
      confirmObject: {
        description: currentSafetyPlan
          ? "Are you sure you want to update the safety plan?"
          : "Are you sure you want to create the safety plan?",
      },
      storedFunction: (callback) =>
        currentSafetyPlan
          ? submitUpdateSafetyPlan(formFields, callback)
          : submitForm(formFields, callback),
      setSubmitting: setSubmitting,
    });
  };

  const onPressSharePlan = (v) => {
    // setCurrentSafetyPlan(v)
    setIsConfirm({
      status: true,
      confirmObject: {
        description: "Are you sure you want to share the safety plan?",
      },
      storedFunction: (callback) =>
        submitUpdateSafetyPlan({ share_status: 1, shareObject: v }, callback),
    });
  };

  const onPressDeletePlan = (v) => {
    setIsConfirm({
      status: true,
      confirmObject: {
        description: "Are you sure you want to delete the safety plan?",
      },
      storedFunction: () => handleDeletesafetyPlan(v),
    });
  };
  const onChangeSearchInput = (e) => {
    setSearchInputValue(() => {
      getSafetyPlanList({
        variables: {
          patientId: patId,
          searchText: e.target.value,
        },
      });

      return e.target.value;
    });
  };

  const onChangeFilterDropdown = (e) => {
    const temp = selectFilterOptions;
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};

    /* istanbul ignore next */
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    getSafetyPlanList({
      variables: {
        patientId: patId,
        ...searchText,
        ...temp,
      },
    });
    /* istanbul ignore next */

    setSelectFilterOptions({ ...temp });
  };

  const onConfirmSubmit = () => {
    isConfirm.storedFunction(() => {
      setLoader(true);
      if (isConfirm.setSubmitting instanceof Function)
        isConfirm.setSubmitting(false);

      setIsConfirm({
        status: false,
        storedFunction: null,
        setSubmitting: null,
      });
    });
  };

  const clearIsConfirm = () => {
    /* istanbul ignore next */
    if (isConfirm.setSubmitting instanceof Function)
      isConfirm.setSubmitting(false);
    /* istanbul ignore next */
    setIsConfirm({
      status: false,
      storedFunction: null,
      setSubmitting: null,
      cancelStatus: false,
    });
  };

  const handleOk = () => {
    /* istanbul ignore next */
    handleCloseCreatePlanModal();
    /* istanbul ignore next */
    setSuccessModal(undefined);
  };

  /* istanbul ignore next */
  const receivePlanId = (value) => {
    setPlanId(value);
  };

  const submitQuestionForm = async (formFields, doneCallback) => {
    setLoader(true);

    const { planId, questions } = formFields;
    const modifyQuestions =
      questions.length > 0 ? { questions: JSON.stringify(questions) } : {};
    const variables = {
      planId,
      patientId: patId,
    };

    try {
      await updateTherapistSafetyPlanQuestions({
        variables: { ...variables, ...modifyQuestions },
        fetchPolicy: "network-only",
        onCompleted: async (data) => {
          if (data) {
            setSuccessModal({
              description: "Your question has been updated successfully.",
            });
            await fetchPlanData(planId);
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
      doneCallback();
    }
  };

  const handleSubmitQustionForm = (formFields, { setSubmitting }) => {
    setIsConfirm({
      status: true,
      confirmObject: {
        description: "Are you sure you want to update the question?",
      },
      storedFunction: (callback) => submitQuestionForm(formFields, callback),
      setSubmitting: setSubmitting,
    });
  };

  const callDeleteApi = async (
    questionId,
    successDeleteCallback,
    doneCallback
  ) => {
    setLoader(true);
    try {
      await deleteSafetyPlan({
        variables: { questionId },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            successDeleteCallback();
            doneCallback();
            setSuccessModal({
              description: "Your question has been deleted successfully.",
            });
          }
        },
      });
    } catch (e) {
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      setLoader(false);
      doneCallback();
    } finally {
      setLoader(false);
    }
  };

  const handleDeleteQuestion = (v) => {
    const { questionId, callback: successDeleteCallback } = v;
    setIsConfirm({
      ...isConfirm,
      ...{
        status: true,
        confirmObject: {
          description: "Are you sure you want to delete the question?",
        },
        storedFunction: async (callback) => {
          await callDeleteApi(questionId, successDeleteCallback, callback);
        },
      },
    });
  };

  return (
    <>
      <Box style={{ paddingTop: "10px" }} data-testid="resource_name">
        <Loader visible={loader} />
        <ContentHeader title="Safety Plan" />
        <Box style={{ paddingTop: "10px" }}>
          <TherapistSafetyPlanComponent
            safetyPlanList={listData}
            searchInputValue={searchInputValue}
            onChangeSearchInput={onChangeSearchInput}
            selectFilterOptions={selectFilterOptions}
            onChangeFilterDropdown={onChangeFilterDropdown}
            loadingSafetyPlanList={loadingSafetyPlanList}
            onPressCreatePlan={handleOpenCreatePlanModal}
            onPressSharePlan={onPressSharePlan}
            onPressAddPlan={handleOpenAddPlanModal}
            submitQustionForm={handleSubmitQustionForm}
            fetchPlanData={fetchPlanData}
            planData={planData}
            handleDeleteQuestion={handleDeleteQuestion}
            onPressDeletePlan={onPressDeletePlan}
            handleAddIconButton={handleAddIconButton}
            accordionOpen={accordionOpen}
          />
        </Box>
      </Box>
      {isConfirm.status && (
        <ConfirmationModal
          label={isConfirm.confirmObject.description}
          onCancel={clearIsConfirm}
          onConfirm={onConfirmSubmit}
        />
      )}
      {successModal && (
        <SuccessModal
          isOpen={Boolean(successModal)}
          title="Successful"
          description={successModal.description}
          onOk={handleOk}
        />
      )}
      <CommonModal
        ref={modalRef}
        headerTitleText={currentSafetyPlan ? "Edit Plan" : "Create Plan"}
        maxWidth="sm"
      >
        <CreateSafetyPlan
          currentSafetyPlan={currentSafetyPlan}
          submitForm={handleSavePress}
          onPressCancel={handleCloseCreatePlanModal}
        />
      </CommonModal>

      <CommonModal
        ref={modalRefAddPlan}
        headerTitleText="Add Plan"
        maxWidth="sm"
      >
        <AddPlanForm
          onPressSubmit={handleAddPlan}
          therapistSafetyPlanList={therapistListData}
          receivePlanId={receivePlanId}
        />
      </CommonModal>
    </>
  );
};

export default TherapistSafetyPlanIndex;

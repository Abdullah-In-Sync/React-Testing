import { useLazyQuery, useMutation } from "@apollo/client";
import { Box } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useRef, useState } from "react";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import Loader from "../../../../../../components/common/Loader";
import TherapistRelapsePlanComponent from "../../../../../../components/therapist/patient/therapistRelapse";
import { useAppContext } from "../../../../../../contexts/AuthContext";
import {
  ADD_THERAPIST_RELAPSE_PLAN,
  DELETE_THERAPIST_RELAPSE_PLAN,
  THERAPIST_GET_ADMIN_RELAPSE_LIST,
  UPDATE_THERAPIST_RELAPSE_PLAN,
  THERAPIST_VIEW_PATIENT_RELAPSE,
  THERAPIST_CREATE_RELAPSE_QUES,
  DELETE_THERAPIST_RELAPSE_PLAN_QUESTION,
} from "../../../../../../graphql/Relapse/graphql";

import { TherapistGetAdminRelapseListData } from "../../../../../../graphql/Relapse/types";

import {
  CREATE_THERAPIST_RELAPSE_PLAN,
  GET_RELAPSE_LIST_FOR_THERAPIST,
} from "../../../../../../graphql/SafetyPlan/graphql";

import {
  CommonModal,
  ModalElement,
} from "../../../../../../components/common/CustomModal/CommonModal";
import { SuccessModal } from "../../../../../../components/common/SuccessModal";
import CreateSafetyPlan from "../../../../../../components/therapist/patient/therapistSafetyPlan/create/CreateSafetyPlan";

import ConfirmationModal from "../../../../../../components/common/ConfirmationModal";

const TherapistRelapsePlanIndex: NextPage = () => {
  const router = useRouter();
  const { user } = useAppContext();
  const {
    therapist_data: { org_id: orgId },
  } = user;
  const [accordionOpen, setAccordionOpen] = useState();
  const { enqueueSnackbar } = useSnackbar();
  const [addTherapistRelapsePlan] = useMutation(ADD_THERAPIST_RELAPSE_PLAN);
  const [updateTherapistRelapsePlan] = useMutation(
    UPDATE_THERAPIST_RELAPSE_PLAN
  );
  const [updateRelapseRelapsePlanQuestions] = useMutation(
    THERAPIST_CREATE_RELAPSE_QUES
  );
  const [deleteRelapsePlan] = useMutation(
    DELETE_THERAPIST_RELAPSE_PLAN_QUESTION
  );
  const modalRefAddPlan = useRef<ModalElement>(null);

  const handleCloseAddPlanModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddPlan.current?.close();
  }, []);

  /* istanbul ignore next */
  const patId = router?.query?.id as string;
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [currentSafetyPlan, setCurrentSafetyPlan] = useState<any>();
  const [successModal, setSuccessModal] = useState<any>();
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
    confirmObject: {
      description: "",
    },
  });

  //Models Open
  const modalRef = useRef<ModalElement>(null);
  /* istanbul ignore next */
  const handleOpenCreatePlanModal = useCallback((_, v) => {
    setCurrentSafetyPlan(v);
    return modalRef.current?.open();
  }, []);
  const handleCloseCreatePlanModal = useCallback(() => {
    /* istanbul ignore next */
    return modalRef.current?.close();
  }, []);

  //Mutations
  const [createTherapistRelapsePlan] = useMutation(
    CREATE_THERAPIST_RELAPSE_PLAN
  );
  const [deletePlane] = useMutation(DELETE_THERAPIST_RELAPSE_PLAN);

  //UseEffects
  useEffect(() => {
    getRelapsePlanList({
      variables: { patientId: patId },
    });
  }, []);

  const [
    getRelapsePlanList,
    { loading: loadingRelapsePlanList, data: listData, refetch },
  ] = useLazyQuery(GET_RELAPSE_LIST_FOR_THERAPIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [
    getAdminRelapseList,
    {
      loading: relapseDropdownListloading,
      data: { therapistGetAdminRelapseList: relapsePlanList = [] } = {},
    },
  ] = useLazyQuery<TherapistGetAdminRelapseListData>(
    THERAPIST_GET_ADMIN_RELAPSE_LIST,
    {
      fetchPolicy: "cache-and-network",
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );

  const handleOpenAddPlanModal = useCallback(() => {
    setLoader(true);
    getAdminRelapseList({
      variables: { orgId },
    });
    /* istanbul ignore next */
    if (!relapseDropdownListloading) modalRefAddPlan.current?.open();
  }, []);

  /* istanbul ignore next */
  const onChangeSearchInput = (e) => {
    /* istanbul ignore next */
    setSearchInputValue(() => {
      getRelapsePlanList({
        variables: {
          patientId: patId,
          searchText: e.target.value,
        },
      });

      return e.target.value;
    });
  };

  /* istanbul ignore next */
  const onChangeFilterDropdown = (e) => {
    const temp = selectFilterOptions;
    /* istanbul ignore next */
    const searchText =
      searchInputValue && searchInputValue !== ""
        ? { searchText: searchInputValue }
        : {};

    /* istanbul ignore next */
    temp[e.target.name] = e.target.value !== "all" ? e.target.value : "";
    getRelapsePlanList({
      variables: {
        patientId: patId,
        ...searchText,
        ...temp,
      },
    });
    /* istanbul ignore next */
    setSelectFilterOptions({ ...temp });
  };

  /* istanbul ignore next */
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

  /* istanbul ignore next */
  const onConfirmSubmit = () => {
    isConfirm.storedFunction(() => {
      setLoader(true);
      /* istanbul ignore next */
      if (isConfirm.setSubmitting instanceof Function)
        isConfirm.setSubmitting(false);

      setIsConfirm({
        status: false,
        storedFunction: null,
        setSubmitting: null,
      });
    });
  };

  /* istanbul ignore next */
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
      await updateTherapistRelapsePlan({
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
            refetch();
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
  const submitForm = async (formFields, doneCallback) => {
    setLoader(true);
    const { planDesc, planName } = formFields;

    const variables = {
      planName,
      planDesc,
      patientId: patId,
    };

    try {
      createTherapistRelapsePlan({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            const {
              therapistCreateRelapsePlan: { _id },
            } = data;
            refetch();
            handleAddIconButton(0, _id);
            /* istanbul ignore next */
            setSuccessModal({
              description: "Your plan has been created successfully.",
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
      doneCallback();
    }
  };

  /* istanbul ignore next */
  const handleSavePress = (formFields, { setSubmitting }) => {
    let isDuplicate = false;
    if (!currentSafetyPlan || currentSafetyPlan.name !== formFields.planName) {
      console.log("INSIDE IF CONDITION");
      isDuplicate = (
        listData?.getRelapsePlanListByPatientId as Array<{ name: string }>
      )?.some((item) => item.name === formFields.planName);
    }

    if (isDuplicate) {
      enqueueSnackbar("This plan already exists", {
        variant: "error",
      });
      return;
    }

    setIsConfirm({
      status: true,
      confirmObject: {
        description: currentSafetyPlan
          ? "Are you sure you want to update the relapse plan?"
          : "Are you sure you want to create the relapse plan?",
      },
      storedFunction: (callback) =>
        currentSafetyPlan
          ? submitUpdateSafetyPlan(formFields, callback)
          : submitForm(formFields, callback),
      setSubmitting: setSubmitting,
    });
  };

  const handleOk = () => {
    /* istanbul ignore next */
    handleCloseCreatePlanModal();
    /* istanbul ignore next */
    setSuccessModal(false);
    /* istanbul ignore next */
    refetch();
  };
  const handleAddPlan = async (planId) => {
    try {
      await addTherapistRelapsePlan({
        variables: {
          patientId: patId,
          planId,
        },
        onCompleted: () => {
          enqueueSnackbar("Plan added Successfully", { variant: "success" });
          refetch();
          handleCloseAddPlanModal();
          setLoader(false);
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    }
  };

  const onPressAddRelapsePlan = (value) => {
    const { planId } = value;
    setLoader(true);
    handleAddPlan(planId);
  };

  const onPressSharePlan = (v) => {
    setIsConfirm({
      status: true,
      confirmObject: {
        description: "Are you sure you want to share the relapse plan?",
      },
      storedFunction: (callback) =>
        submitUpdateSafetyPlan({ share_status: 1, shareObject: v }, callback),
    });
  };
  /* istanbul ignore next */
  const [
    getRelapsePlanById,
    {
      data: { therapistViewPatientRelapse: planData = null } = {},
      refetch: refetchRelapsePlan = null,
    } = {},
  ] = useLazyQuery(THERAPIST_VIEW_PATIENT_RELAPSE, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const fetchPlanData = async (planId) => {
    setLoader(true);
    await getRelapsePlanById({
      variables: { patientId: patId, planId },
    });
  };

  /* istanbul ignore next */
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
      await updateRelapseRelapsePlanQuestions({
        variables: { ...variables, ...modifyQuestions },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            setSuccessModal({
              description: "Your question has been updated successfully.",
            });
            refetchRelapsePlan();
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
      await deleteRelapsePlan({
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

  /* istanbul ignore next */
  const handleDeleteQuestion = (v) => {
    const { questionId, callback: successDeleteCallback } = v;
    setIsConfirm({
      ...isConfirm,
      ...{
        status: true,
        confirmObject: {
          description: "Are you sure you want to delete the question?",
        },
        storedFunction: (callback) => {
          callDeleteApi(questionId, successDeleteCallback, callback);
        },
      },
    });
  };

  /* istanbul ignore next */
  const handleAddIconButton = async (index, id) => {
    /* istanbul ignore next */
    if (index !== accordionOpen) {
      await fetchPlanData(id);
      setAccordionOpen(index);
    } else {
      setAccordionOpen(undefined);
    }
  };

  const handleDeletesafetyPlan = async (v) => {
    try {
      await deletePlane({
        variables: {
          planId: v._id,
          updatePlan: { status: 0 },
        },
        onCompleted: () => {
          refetch();
          if (accordionOpen || accordionOpen === 0) setAccordionOpen(undefined);

          setIsConfirm(false);

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

  const onPressDeletePlan = (v) => {
    setIsConfirm({
      status: true,
      confirmObject: {
        description: "Are you sure you want to delete the Relapse plan?",
      },
      storedFunction: () => handleDeletesafetyPlan(v),
    });
  };

  return (
    <>
      <Box style={{ paddingTop: "10px" }} data-testid="resource_name">
        <Loader visible={loader} />
        <ContentHeader title="Relapse" />
        <Box style={{ paddingTop: "10px" }}>
          <TherapistRelapsePlanComponent
            safetyPlanList={listData}
            searchInputValue={searchInputValue}
            onChangeSearchInput={onChangeSearchInput}
            selectFilterOptions={selectFilterOptions}
            onChangeFilterDropdown={onChangeFilterDropdown}
            loadingSafetyPlanList={loadingRelapsePlanList}
            onPressCreatePlan={handleOpenCreatePlanModal}
            onPressSharePlan={onPressSharePlan}
            onPressAddPlan={handleOpenAddPlanModal}
            submitQustionForm={handleSubmitQustionForm}
            fetchPlanData={fetchPlanData}
            planData={planData}
            handleDeleteQuestion={handleDeleteQuestion}
            onPressDeletePlan={onPressDeletePlan}
            modalRefAddPlan={modalRefAddPlan}
            onPressAddRelapsePlan={onPressAddRelapsePlan}
            relapsePlanList={relapsePlanList}
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
        headerTitleText={
          /* istanbul ignore next */
          currentSafetyPlan ? "Edit Plan" : "Create Plan"
        }
        maxWidth="sm"
      >
        <CreateSafetyPlan
          currentSafetyPlan={currentSafetyPlan}
          submitForm={handleSavePress}
          onPressCancel={handleCloseCreatePlanModal}
        />
      </CommonModal>
    </>
  );
};

export default TherapistRelapsePlanIndex;

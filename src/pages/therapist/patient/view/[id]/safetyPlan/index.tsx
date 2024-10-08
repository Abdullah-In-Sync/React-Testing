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
import TherapistRelapsePlanComponent from "../../../../../../components/therapist/patient/therapistRelapse";
import { checkPrivilageAccess } from "../../../../../../utility/helper";

const TherapistSafetyPlanIndex: NextPage = () => {
  const isSafetyPlanAdd = checkPrivilageAccess("Safety Plan", "Add");
  const router = useRouter();
  /* istanbul ignore next */
  const { user } = useAppContext();
  /* istanbul ignore next */
  const orgId = user?.therapist_data.org_id;
  const { enqueueSnackbar } = useSnackbar();
  const modalRef = useRef<ModalElement>(null);
  const modalRefAddPlan = useRef<ModalElement>(null);
  const handleOpenCreatePlanModal = useCallback((_, v) => {
    setCurrentSafetyPlan(v);
    return modalRef.current.open();
  }, []);

  /* istanbul ignore next */
  const handleCloseCreatePlanModal = useCallback(() => {
    // setCurrentSafetyPlan(undefined)
    return modalRef?.current?.close();
  }, []);

  /* istanbul ignore next */
  const handleOpenAddPlanModal = useCallback(
    () => modalRefAddPlan.current.open(),
    []
  );
  const handleCloseAddPlanModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddPlan.current.close();
  }, []);

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
    if (patId)
      getSafetyPlanList({
        variables: { patientId: patId },
      });

    if (isSafetyPlanAdd && orgId)
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
    {
      /* istanbul ignore next */ data: {
        viewPatientSafetyPlanById: { data: planData = null } = {},
      } = {},
      /* istanbul ignore next */
      error: getSafetyPlanByIdError = undefined,
    } = {},
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
        onCompleted: async () => {
          enqueueSnackbar("Plan has been created successfully!", {
            variant: "success",
          });
          handleCloseCreatePlanModal();
          /* istanbul ignore next */
          getSafetyPlanList({
            variables: { patientId: patId },
          });
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

          enqueueSnackbar("Plan has been deleted successfully!", {
            variant: "success",
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
        onCompleted: () => {
          enqueueSnackbar(
            share_status
              ? "Plan has been shared successfully."
              : "Plan has been updated successfully.",
            {
              variant: "success",
            }
          );
          handleCloseCreatePlanModal();
          getSafetyPlanList({
            variables: { patientId: patId },
          });
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

  /* istanbul ignore next */
  const receivePlanId = (value) => {
    setPlanId(value);
  };

  const submitQuestionForm = async (formFields, doneCallback) => {
    setLoader(true);

    const { planId, questions } = formFields;
    /* istanbul ignore next */
    const modifyQuestions =
      /* istanbul ignore next */
      questions.length > 0 ? { questions: JSON.stringify(questions) } : {};
    const variables = {
      planId,
      patientId: patId,
    };

    try {
      /* istanbul ignore next */
      await updateTherapistSafetyPlanQuestions({
        variables: { ...variables, ...modifyQuestions },
        /* istanbul ignore next */
        fetchPolicy: "network-only",
        /* istanbul ignore next */
        onCompleted: async () => {
          enqueueSnackbar("Question has been updated successfully", {
            variant: "success",
          });
          /* istanbul ignore next */
          await fetchPlanData(planId);
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

  const handleSubmitQustionForm = (formFields, { setSubmitting }) => {
    setIsConfirm({
      status: true,
      confirmObject: {
        description: "Are you sure you want to update the question?",
      },
      /* istanbul ignore next */
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
        onCompleted: () => {
          /* istanbul ignore next */
          successDeleteCallback();
          /* istanbul ignore next */
          doneCallback();

          enqueueSnackbar("Question has been deleted successfully", {
            variant: "success",
          });
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      doneCallback();
    } finally {
      setLoader(false);
    }
  };

  const handleDeleteQuestion = (v) => {
    /* istanbul ignore next */
    const { questionId, callback: successDeleteCallback } = v;
    setIsConfirm({
      ...isConfirm,
      ...{
        status: true,
        confirmObject: {
          description: "Are you sure you want to delete the question?",
        },
        /* istanbul ignore next */
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
          <TherapistRelapsePlanComponent
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
            accordionOpen={!getSafetyPlanByIdError && accordionOpen}
            isSafetyPlan={true}
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

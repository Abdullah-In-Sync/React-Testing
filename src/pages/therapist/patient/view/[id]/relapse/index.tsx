import { useLazyQuery, useMutation } from "@apollo/client";
import { Box } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import Loader from "../../../../../../components/common/Loader";
import {
  CREATE_THERAPIST_RELAPSE_PLAN,
  GET_RELAPSE_LIST_FOR_THERAPIST,
} from "../../../../../../graphql/SafetyPlan/graphql";
import TherapistRelapsePlanComponent from "../../../../../../components/therapist/patient/therapistRelapse";
import {
  CommonModal,
  ModalElement,
} from "../../../../../../components/common/CustomModal/CommonModal";
import CreateSafetyPlan from "../../../../../../components/therapist/patient/therapistSafetyPlan/create/CreateSafetyPlan";
import { SuccessModal } from "../../../../../../components/common/SuccessModal";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../../../../../components/common/ConfirmationModal";

const TherapistRelapsePlanIndex: NextPage = () => {
  const router = useRouter();
  /* istanbul ignore next */
  const { enqueueSnackbar } = useSnackbar();
  /* istanbul ignore next */
  const patId = router?.query?.id as string;
  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [currentSafetyPlan, setCurrentSafetyPlan] = useState();
  console.log("Koca: currentSafetyPlan ", currentSafetyPlan);
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
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

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
    console.log("Koca: doneCallback ", doneCallback);
    console.log("Koca: formFields ", formFields);
    //Edit plan function
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
      /* istanbul ignore next */
      doneCallback();
    }
  };

  /* istanbul ignore next */
  const handleSavePress = (formFields, { setSubmitting }) => {
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
            // onPressSharePlan={onPressSharePlan}
            // onPressAddPlan={handleOpenAddPlanModal}
            // submitQustionForm={handleSubmitQustionForm}
            // fetchPlanData={fetchPlanData}
            // planData={planData}
            // handleDeleteQuestion={handleDeleteQuestion}
            // onPressDeletePlan={onPressDeletePlan}
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

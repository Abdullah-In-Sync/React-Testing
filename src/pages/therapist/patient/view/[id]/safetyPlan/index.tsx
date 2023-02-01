import { useLazyQuery, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useCallback } from "react";
import Loader from "../../../../../../components/common/Loader";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import { Box } from "@mui/material";
import {
  GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
  CREATE_THERAPIST_SAFETY_PLAN,
  UPDATE_THERAPIST_SAFETY_PLAN,
} from "../../../../../../graphql/SafetyPlan/graphql";
import { ViewSafetyPlanById } from "../../../../../../graphql/SafetyPlan/types";
import TherapistSafetyPlanComponent from "../../../../../../components/therapist/patient/therapistSafetyPlan";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../../../../../components/common/ConfirmationModal";
import {
  CommonModal,
  ModalElement,
} from "../../../../../../components/common/CustomModal/CommonModal";
import CreateSafetyPlan from "../../../../../../components/therapist/patient/therapistSafetyPlan/create/CreateSafetyPlan";
import { SuccessModal } from "../../../../../../components/common/SuccessModal";
const TherapistSafetyPlanIndex: NextPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const modalRef = useRef<ModalElement>(null);
  const handleOpenCreatePlanModal = useCallback((_, v) => {
    setCurrentSafetyPlan(v);
    return modalRef.current?.open();
  }, []);
  const handleCloseCreatePlanModal = useCallback(() => {
    // setCurrentSafetyPlan(undefined)
    return modalRef.current?.close();
  }, []);
  const [successModal, setSuccessModal] = useState<any>();
  /* istanbul ignore next */
  const patId = router?.query.id as string;

  const [searchInputValue, setSearchInputValue] = useState();
  const [currentSafetyPlan, setCurrentSafetyPlan] =
    useState<ViewSafetyPlanById>();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [createTherapistSafetyPlan] = useMutation(CREATE_THERAPIST_SAFETY_PLAN);
  const [updateTherapistSafetyPlan] = useMutation(UPDATE_THERAPIST_SAFETY_PLAN);
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
  }, []);

  const [
    getSafetyPlanList,
    { loading: loadingSafetyPlanList, data: listData },
  ] = useLazyQuery(GET_SAFETY_PLAN_LIST_FOR_THERAPIST, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

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
        onCompleted: (data) => {
          if (data) {
            /* istanbul ignore next */
            setSuccessModal({
              description: "Your plan has been created successfully",
            });
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
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
      updateTherapistSafetyPlan({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          if (data) {
            /* istanbul ignore next */
            setSuccessModal({
              description: share_status
                ? "Your plan has been shared successfully"
                : "Your plan has been updated successfully",
            });
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
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

  const handleSavePress = (formFields, { setSubmitting }) => {
    setIsConfirm({
      status: true,
      confirmObject: {
        description: currentSafetyPlan
          ? "You want to update safety Plan"
          : "You want to create safety Plan",
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
        description: "You want to share safety Plan",
      },
      storedFunction: (callback) =>
        submitUpdateSafetyPlan({ share_status: 1, shareObject: v }, callback),
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
    if (isConfirm.setSubmitting instanceof Function)
      isConfirm.setSubmitting(false);

    setIsConfirm({
      status: false,
      storedFunction: null,
      setSubmitting: null,
      cancelStatus: false,
    });
  };

  const handleOk = () => {
    /* istanbul ignore next */
    getSafetyPlanList({
      variables: { patientId: patId },
    });
    handleCloseCreatePlanModal();
    setSuccessModal(undefined);
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
          />
        </Box>
      </Box>
      {isConfirm.status && (
        <ConfirmationModal
          label="Are you sure?"
          description={isConfirm.confirmObject.description}
          onCancel={clearIsConfirm}
          onConfirm={onConfirmSubmit}
        />
      )}
      {successModal && (
        <SuccessModal
          isOpen={Boolean(successModal)}
          title="Successfull"
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
    </>
  );
};

export default TherapistSafetyPlanIndex;

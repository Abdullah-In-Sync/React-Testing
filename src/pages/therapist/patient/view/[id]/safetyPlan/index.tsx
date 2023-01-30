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
} from "../../../../../../graphql/SafetyPlan/graphql";
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
  const handleOpenCreatePlanModal = useCallback(
    () => modalRef.current?.open(),
    []
  );
  const handleCloseCreatePlanModal = useCallback(() => {
    modalRef.current?.close();
  }, []);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  /* istanbul ignore next */
  const patId = router?.query.id as string;

  const [searchInputValue, setSearchInputValue] = useState();
  const [selectFilterOptions, setSelectFilterOptions] = useState({});
  const [loader, setLoader] = useState<boolean>(true);
  const [createTherapistSafetyPlan] = useMutation(CREATE_THERAPIST_SAFETY_PLAN);
  const [isConfirm, setIsConfirm] = useState<any>({
    status: false,
    storedFunction: null,
    setSubmitting: null,
    cancelStatus: false,
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
            setSuccessModal(true);
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

  const handleSavePress = (formFields, { setSubmitting }) => {
    setIsConfirm({
      status: true,
      storedFunction: (callback) => submitForm(formFields, callback),
      setSubmitting: setSubmitting,
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
      isConfirm.setSubmitting(false);
      setIsConfirm({
        status: false,
        storedFunction: null,
        setSubmitting: null,
      });
    });
  };

  const clearIsConfirm = () => {
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
    setSuccessModal(false);
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
          />
        </Box>
      </Box>
      {isConfirm.status && (
        <ConfirmationModal
          label="Are you sure?"
          description="You want to create safety plan"
          onCancel={clearIsConfirm}
          onConfirm={onConfirmSubmit}
        />
      )}
      {successModal && (
        <SuccessModal
          isOpen={successModal}
          title="Successfull"
          description={"Your plan has been created Successfully"}
          onOk={handleOk}
        />
      )}
      <CommonModal ref={modalRef} headerTitle="Create Plan" maxWidth="sm">
        <CreateSafetyPlan
          submitForm={handleSavePress}
          onPressCancel={handleCloseCreatePlanModal}
        />
      </CommonModal>
    </>
  );
};

export default TherapistSafetyPlanIndex;

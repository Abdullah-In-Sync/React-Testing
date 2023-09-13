import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CommonModal,
  ModalElement,
} from "../../../../common/CustomModal/CommonModal";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import AddModalForm from "../add/AddModal";
import { GET_DISORDER_DATA_BY_ORG_ID } from "../../../../../graphql/query/common";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { useSnackbar } from "notistack";
import { ADMIN_ADD_MODAL } from "../../../../../graphql/assessment/graphql";
import Loader from "../../../../common/Loader";
import CommonButton from "../../../../common/Buttons/CommonButton";
interface ViewProps {
  refetchList?: () => void;
}

const AddModal: React.FC<ViewProps> = ({ refetchList }) => {
  const { enqueueSnackbar } = useSnackbar();
  const modalRefAddPlan = useRef<ModalElement>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [isConfirmCompleteTask, setIsConfirmCompleteTask] = useState(false);
  const [getName, setGetName] = useState("");
  const [getOrgId, setGetOrgId] = useState();
  const [getDisordorId, setGetDisordorId] = useState();

  const [addModal] = useMutation(ADMIN_ADD_MODAL);

  const [
    getOrgList,
    /* istanbul ignore next */
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    /* istanbul ignore next */
    fetchPolicy: "cache-and-network",
    /* istanbul ignore next */
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  useEffect(() => {
    getOrgList();
  }, []);

  const [getDisorderByOrgId, { data: disorderDataList }] = useLazyQuery(
    GET_DISORDER_DATA_BY_ORG_ID,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );

  useEffect(() => {
    /* istanbul ignore next */
    if (getOrgId) {
      /* istanbul ignore next */
      getDisorderByOrgId({
        variables: { orgId: getOrgId },
      });
    }
  }, [getOrgId]);
  /* istanbul ignore next */
  const handleOpenAddModal = useCallback(
    /* istanbul ignore next */
    () => modalRefAddPlan.current?.open(),
    []
  );

  const handleCloseAddModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddPlan.current?.close();
  }, []);

  /* istanbul ignore next */
  const receiveOrgId = (value) => {
    setGetOrgId(value);
  };

  /* istanbul ignore next */
  const receiveDisordorId = (value) => {
    setGetDisordorId(value);
  };

  /* istanbul ignore next */
  const receiveName = (value) => {
    setGetName(value);
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirmCompleteTask(false);
  };

  const handleAddModal = async () => {
    try {
      await addModal({
        variables: {
          model_name: getName,
          disorder_id: getDisordorId,
        },
        onCompleted: () => {
          /* istanbul ignore next */
          handleCloseAddModal();
          /* istanbul ignore next */
          setIsConfirmCompleteTask(false);
          /* istanbul ignore next */
          enqueueSnackbar("Model added successfully!", {
            variant: "success",
          });
          /* istanbul ignore next */
          refetchList();
        },
      });
    } catch (e) {
      console.log(e);
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };
  return (
    <>
      <Loader visible={loader} />
      <CommonButton
        data-testid="addModalButton"
        variant="contained"
        onClick={handleOpenAddModal}
        size="small"
      >
        Add Modal
      </CommonButton>

      <CommonModal
        ref={modalRefAddPlan}
        headerTitleText={"Add Modal"}
        maxWidth="sm"
      >
        <AddModalForm
          /* istanbul ignore next */
          onPressSubmit={() => setIsConfirmCompleteTask(true)}
          organizationList={organizationList}
          disorderDataList={disorderDataList}
          receiveOrgId={receiveOrgId}
          receiveDisorderId={receiveDisordorId}
          receiveName={receiveName}
        />
      </CommonModal>

      {isConfirmCompleteTask && (
        <ConfirmationModal
          label="Are you sure you want to add this modal?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handleAddModal}
        />
      )}
    </>
  );
};
export default AddModal;

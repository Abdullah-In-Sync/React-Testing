import { useLazyQuery, useMutation } from "@apollo/client";
import { Box, Button } from "@mui/material";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ContentHeader from "../../../common/ContentHeader";
import {
  CommonModal,
  ModalElement,
} from "../../../common/CustomModal/CommonModal";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import AddModalForm from "./add/AddModal";
import { GET_DISORDER_DATA_BY_ORG_ID } from "../../../../graphql/query/common";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { useSnackbar } from "notistack";
import { ADMIN_ADD_MODAL } from "../../../../graphql/assessment/graphql";
import Loader from "../../../common/Loader";

const ModalListPage: NextPage = () => {
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
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    fetchPolicy: "cache-and-network",
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
    if (getOrgId !== "") {
      getDisorderByOrgId({
        variables: { orgId: getOrgId },
      });
    }
  }, [getOrgId]);

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
          handleCloseAddModal();
          setIsConfirmCompleteTask(false);
          // refetch();
          enqueueSnackbar("Modal added successfully!", {
            variant: "success",
          });
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };
  return (
    <>
      <Loader visible={loader} />
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ContentHeader title="Modal" style={{ flexGrow: 1 }} />

        <Button
          onClick={handleOpenAddModal}
          data-testid="addModalButton"
          variant="contained"
          style={{
            color: "#ffff",
            fontWeight: "bold",
          }}
        >
          Add Modal
        </Button>
      </Box>

      <CommonModal
        ref={modalRefAddPlan}
        headerTitleText={"Add Modal"}
        maxWidth="sm"
      >
        <AddModalForm
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
export default ModalListPage;

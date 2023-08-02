import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_PATIENTSESSION_DATA } from "../../../graphql/query/patient";
import Loader from "../../../components/common/Loader";
import { Box, Button, Typography } from "@mui/material";
import { Accordion } from "../../../components/common/Accordion";
import ContentHeader from "../../../components/common/ContentHeader";
import {
  CommonModal,
  ModalElement,
} from "../../../components/common/CustomModal/CommonModal";
import {
  GET_DISORDER_DATA_BY_ORG_ID,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../../../graphql/query/common";
import { useAppContext } from "../../../contexts/AuthContext";
import AddAgendaForm from "./AddAgenda";
import {
  ADD_THERAPIST_ADD_AGENDA,
  GET_PATIENT_AGENDA_DETAILS,
} from "../../../graphql/SafetyPlan/graphql";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { SuccessModal } from "../../../components/common/SuccessModal";

type propTypes = {
  setTherapy: any;
};

export default function TherapisTherapyList(props: propTypes) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const modalRefAddAgenda = useRef<ModalElement>(null);
  /* istanbul ignore next */
  const patId = router?.query?.id as string;
  /* istanbul ignore next */
  const {
    user: { therapist_data: { org_id: orgId = "" } = {} },
  } = useAppContext();
  const [loader, setLoader] = useState<boolean>(true);
  const [selectedDisorderId, setSelectedDisorderId] = useState("");
  const [selectedModelId, setSelectedModelId] = useState("");
  const [isConfirmCompleteTask, setIsConfirmCompleteTask] = useState(false);
  const [completeAgendaAddModal, setCompleteAgendaAddModal] =
    useState<boolean>(false);
  /* istanbul ignore next */
  const handleOpenAddAgendaModal = useCallback(
    () => modalRefAddAgenda.current?.open(),
    []
  );
  const handleCloseAddAgendaModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddAgenda.current?.close();
  }, []);

  const [addTherapistAgenda] = useMutation(ADD_THERAPIST_ADD_AGENDA);

  const [getPatientSessionData, { data: patientSessionData }] = useLazyQuery(
    GET_PATIENTSESSION_DATA,
    {
      onCompleted: () => {
        setLoader(false);
      },
    }
  );

  const [getPatientAgendaDetails, { data: agendaDetails, refetch }] =
    useLazyQuery(GET_PATIENT_AGENDA_DETAILS, {
      onCompleted: () => {
        setLoader(false);
      },
    });

  const [getDisorderByOrgId, { data: disorderData }] = useLazyQuery(
    GET_DISORDER_DATA_BY_ORG_ID,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );

  const [getModelByDisorderId, { data: modelData }] = useLazyQuery(
    GET_MODEL_BY_DISORDERID_DATA,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );
  useEffect(() => {
    getDisorderByOrgId({
      variables: { orgId: orgId },
    });

    if (selectedDisorderId.length) {
      getModelByDisorderId({
        variables: { disorderId: selectedDisorderId },
      });
    }
  }, [orgId, selectedDisorderId]);

  useEffect(() => {
    getPatientSessionData({
      variables: {
        pttherapyId: props.setTherapy,
        patientId: sessionStorage.getItem("patient_id"),
      },
    });

    getPatientAgendaDetails({
      variables: {
        patient_id: sessionStorage.getItem("patient_id"),
      },
    });
  }, [props.setTherapy]);

  const handleAddPlan = async () => {
    try {
      await addTherapistAgenda({
        variables: {
          disorder_id: selectedDisorderId,
          model_id: selectedModelId,
          patient_id: patId,
        },
        onCompleted: () => {
          setCompleteAgendaAddModal(true);
        },
      });

      setIsConfirmCompleteTask(false);
      handleCloseAddAgendaModal();
      // refetch();
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };

  const receiveDisorderId = (value) => {
    setSelectedDisorderId(value);
  };

  const receiveModelId = (value) => {
    setSelectedModelId(value);
  };

  const clearIsConfirmCancel = () => {
    /* istanbul ignore next */
    setIsConfirmCompleteTask(false);
  };

  const handleOk = () => {
    /* istanbul ignore next */
    setCompleteAgendaAddModal(false);

    refetch();
  };
  return (
    <>
      <Box>
        <Loader visible={loader} />
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Box style={{ flex: 1 }}>
            <ContentHeader title="Therapy" />
          </Box>

          {agendaDetails?.getPatientAgendaDetail?.result !== true && (
            <Box style={{ marginLeft: "10px" }}>
              <Button
                data-testid="addAgendaButton"
                variant="contained"
                onClick={handleOpenAddAgendaModal}
              >
                Add Agenda
              </Button>
            </Box>
          )}
        </Box>

        <Box marginBottom={"20px"}>
          {
            /* istanbul ignore next */
            !loader &&
            patientSessionData?.getPatientSessionList &&
            patientSessionData?.getPatientSessionList.length > 0
              ? patientSessionData?.getPatientSessionList.map((v) => {
                  return (
                    <Accordion
                      key={`according-${v.ptsession_no}`}
                      title={`Session ${v.ptsession_no}`}
                      marginBottom={"20px !important"}
                      detail={() => {
                        return <Typography>Work in progress</Typography>;
                      }}
                    />
                  );
                })
              : patientSessionData?.getPatientSessionList?.length == 0 && (
                  <Box display={"flex"} justifyContent="center">
                    <Typography>No data found!</Typography>
                  </Box>
                )
          }
        </Box>

        <CommonModal
          ref={modalRefAddAgenda}
          headerTitleText="Add Agenda"
          maxWidth="sm"
        >
          <AddAgendaForm
            onPressSubmit={() => setIsConfirmCompleteTask(true)}
            disorderList={disorderData}
            receiveDisorderId={receiveDisorderId}
            modelList={modelData}
            receiveModelId={receiveModelId}
          />
        </CommonModal>
      </Box>

      {isConfirmCompleteTask && (
        <ConfirmationModal
          label="Are you sure you want to add this agenda?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handleAddPlan}
        />
      )}

      {completeAgendaAddModal && (
        <SuccessModal
          isOpen={completeAgendaAddModal}
          title="Successful"
          description={
            "Agenda added Successfully, You can not add agenda again"
          }
          onOk={handleOk}
        />
      )}
    </>
  );
}

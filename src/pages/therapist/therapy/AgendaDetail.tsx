import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableGenerator from "../../../components/common/TableGenerator";
import { Button, IconButton } from "@mui/material";
import NextLink from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ShareIcon from "@mui/icons-material/Share";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  GET_PATIENT_AGENDA_DETAILS_LIST,
  PATIENT_DELETE_AGENDA_BY_ID,
} from "../../../graphql/SafetyPlan/graphql";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../../components/common/ConfirmationModal";

type propTypes = {
  sessionNo?: any;
};
export default function AgendaDetailAccordian(props: propTypes) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  /* istanbul ignore next */
  const patientId = sessionStorage.getItem("patient_id");
  const [loader, setLoader] = useState<boolean>(false);
  const [deletModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteAgendaId, setDeleteAgendaId] = useState(null);

  const [deleteAgenda] = useMutation(PATIENT_DELETE_AGENDA_BY_ID);

  const [getPatientAgendaDetailsList, { data: agendaDetailList, refetch }] =
    useLazyQuery(GET_PATIENT_AGENDA_DETAILS_LIST, {
      onCompleted: () => {
        setLoader(false);
      },
    });

  useEffect(() => {
    getPatientAgendaDetailsList({
      variables: {
        session: props.sessionNo,
        patient_id: sessionStorage.getItem("patient_id"),
      },
    });
  }, [props.sessionNo]);

  const handleDeleteAgenda = async () => {
    console.debug("Delete agenda variable", {
      patient_id: patientId,
      ptagenda_id: deleteAgendaId,
    });
    try {
      await deleteAgenda({
        variables: {
          patient_id: patientId,
          ptagenda_id: deleteAgendaId,
        },
        onCompleted: () => {
          setDeleteModalOpen(false);

          enqueueSnackbar("Agenda deleted successfully!", {
            variant: "success",
          });
          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setDeleteModalOpen(false);
  };

  const fields = [
    {
      key: "empty",
      columnName: "",
      visible: true,
      render: () => null,
    },
    {
      key: "display_order",
      columnName: "Order",
      visible: true,
      render: (val) => val,
    },
    {
      key: "agenda_name",
      columnName: "Agenda",
      visible: true,
      render: (val) => val,
    },

    {
      key: "actions",
      columnName: "Delete",
      visible: true,
      render: (_, value) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              setDeleteModalOpen(true);
              setDeleteAgendaId(value._id);
            }}
            data-testid="delete-icon-button"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },

    {
      key: "actions",
      columnName: "Resource",
      visible: true,
      render: (_, value) => (
        <>
          <NextLink href={"/admin/organization/edit/" + value._id} passHref>
            <IconButton size="small" data-testid="edit-icon-button">
              <VisibilityIcon />
            </IconButton>
          </NextLink>

          <NextLink href={"/admin/organization/config/" + value._id} passHref>
            <IconButton size="small" data-testid={"viewIcon_" + value._id}>
              <CheckIcon />
            </IconButton>
          </NextLink>

          <IconButton size="small">
            <ShareIcon data-testid="deleteIcon" />
          </IconButton>
        </>
      ),
    },
  ];

  const noteForSession = () => {
    router.push(
      `/therapist/patient/view/${patientId}/?mainTab=notes&SessionNo=${props.sessionNo}`
    );
  };

  return (
    <div>
      <Box
        style={{
          paddingBottom: 30,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <TableGenerator
          fields={fields}
          data={agendaDetailList?.getPatientAgendaList}
          loader={loader}
          backendPagination={false}
          selectedRecords={[]}
          rowOnePage={10}
          showPagination={false}
        />
      </Box>

      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ flex: 1 }}>
          <Box style={{ marginLeft: "10px" }}>
            <Button data-testid="addAgendaItemButton" variant="contained">
              Add Agenda Item
            </Button>
          </Box>
        </Box>

        <Box style={{ marginLeft: "10px" }}>
          <Button
            data-testid="notesForSession"
            variant="contained"
            onClick={noteForSession}
          >
            Notes for Session {props.sessionNo}
          </Button>
        </Box>
      </Box>

      {deletModalOpen && (
        <ConfirmationModal
          label="Are you sure want to delete this agenda?"
          onCancel={clearIsConfirmCancel}
          onConfirm={() => {
            /* istanbul ignore next */
            handleDeleteAgenda();
          }}
        />
      )}
    </div>
  );
}

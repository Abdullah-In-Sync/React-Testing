import { Box } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TableGenerator from "../../../components/common/TableGenerator";
import { Button, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  ASSIGN_RESOURCE_AGENDA,
  GET_PATIENT_AGENDA_DETAILS_LIST,
  PATIENT_DELETE_AGENDA_BY_ID,
  THERAPIST_ADD_ITEM_AGENDA,
} from "../../../graphql/SafetyPlan/graphql";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import {
  CommonModal,
  ModalElement,
} from "../../../components/common/CustomModal/CommonModal";
import AddAgendaItemForm from "./AddAgendaItem";
import ResourcePopup from "../../../components/therapist/patient/TherapsitHomework/resourcePopup";
import { GET_POPUP_RESOURCE_LIST_DATA } from "../../../graphql/query/therapist";
import { useAppContext } from "../../../contexts/AuthContext";

type propTypes = {
  sessionNo?: any;
  sessionId?: any;
  therapyId?: any;
};
export default function AgendaDetailAccordian(props: propTypes) {
  const { user } = useAppContext();
  const router = useRouter();
  const orgId = user?.therapist_data?.org_id;
  const sessionNo = props.sessionNo;
  const session = parseInt(sessionNo, 10);
  const { enqueueSnackbar } = useSnackbar();
  /* istanbul ignore next */
  const patientId = sessionStorage.getItem("patient_id");
  const modalRefAddAgendaItem = useRef<ModalElement>(null);

  const [loader, setLoader] = useState<boolean>(false);
  const [deletModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteAgendaId, setDeleteAgendaId] = useState(null);
  const [displayOrderInput, setDisplayOrderInput] = useState();
  const [agendaItemInput, setAgendaItemInput] = useState("");
  const [isConfirmAddAgendaTask, setIsConfirmAddAgendaTask] = useState(false);

  const [openResourceModal, setOpenResourceModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [myResource, setMyResource] = useState(0);
  const [myFavourites, setMyFavourites] = useState(0);
  const [checkForResourceId, setCheckForResourceId] = useState("");
  const [isConfirmCompleteTask, setIsConfirmCompleteTask] = useState(false);
  const [reassignedResourceId, setReassignedResourceId] = useState("");

  const [deleteAgenda] = useMutation(PATIENT_DELETE_AGENDA_BY_ID);
  const [addAgendaItem] = useMutation(THERAPIST_ADD_ITEM_AGENDA);
  const [assigneResource] = useMutation(ASSIGN_RESOURCE_AGENDA);

  const [getPatientAgendaDetailsList, { data: agendaDetailList, refetch }] =
    useLazyQuery(GET_PATIENT_AGENDA_DETAILS_LIST, {
      fetchPolicy: "network-only",
      onCompleted: () => {
        setLoader(false);
      },
    });
  console.log("Koca: agendaDetailList ", agendaDetailList);

  useEffect(() => {
    getPatientAgendaDetailsList({
      variables: {
        session: props.sessionNo,
        patient_id: sessionStorage.getItem("patient_id"),
      },
    });
  }, [props.sessionNo]);

  const [getPopupData, { data: popupData }] = useLazyQuery(
    GET_POPUP_RESOURCE_LIST_DATA,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        console.log("Koca: data ", data);
      },
    }
  );

  useEffect(() => {
    if (openResourceModal === true) {
      console.debug("Get resource popup data", {
        therapyId: props.therapyId,
        orgId: orgId,
        searchText: searchValue,
        myResource: myResource,
        myFav: myFavourites,
      });
      getPopupData({
        variables: {
          therapyId: props.therapyId,
          orgId: orgId,
          searchText: searchValue,
          myResource: myResource,
          myFav: myFavourites,
        },
      });
    }
  }, [
    props.sessionId,
    props.sessionNo,
    props.therapyId,
    patientId,
    searchValue,
    myResource,
    myFavourites,
    openResourceModal,
  ]);

  const handleDeleteAgenda = async () => {
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
    setIsConfirmAddAgendaTask(false);
    setIsConfirmCompleteTask(false);
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
          <IconButton
            style={{
              borderRadius: "50%",
              border: "1px solid #000",
              marginRight: "10px",
            }}
            size="small"
            data-testid="edit-icon-button"
            onClick={() => {
              setOpenResourceModal(true);
              setDeleteAgendaId(value._id);
              setCheckForResourceId(value.resource_id);
            }}
          >
            {/* {value.resource_id} */}
            <VisibilityIcon />
          </IconButton>

          <IconButton
            style={{
              borderRadius: "50%",
              border: "1px solid #000",
              marginRight: "10px",
              backgroundColor: value.resource_id !== "" ? "#6EC9DB" : undefined,
            }}
            size="small"
            data-testid={"viewIcon_" + value._id}
          >
            <CheckIcon
              style={{
                color: value.resource_id !== "" ? "#ffff" : undefined,
              }}
            />
          </IconButton>

          <IconButton
            style={{
              borderRadius: "50%",
              border: "1px solid #000",
            }}
            size="small"
          >
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

  const handleOpenAddAgendaItemModal = useCallback(
    () => modalRefAddAgendaItem.current?.open(),
    []
  );
  const handleCloseAddAgendaItemModal = useCallback(() => {
    /* istanbul ignore next */
    modalRefAddAgendaItem.current?.close();
  }, []);

  const handleAgendaItem = async () => {
    try {
      await addAgendaItem({
        variables: {
          patient_id: patientId,
          display_order: parseInt(displayOrderInput),
          agenda_name: agendaItemInput,
          session: props.sessionNo,
        },
        onCompleted: (data) => {
          setIsConfirmAddAgendaTask(false);
          handleCloseAddAgendaItemModal();

          /* istanbul ignore next */
          if (data.addPatientAgendaItem.message === null) {
            enqueueSnackbar("Agenda item added successfully!", {
              variant: "success",
            });
          } else {
            enqueueSnackbar(`This agenda item already exists`, {
              variant: "error",
            });
          }

          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong.", { variant: "error" });
    }
  };

  const receiveDisplayValue = (value) => {
    setDisplayOrderInput(value);
  };

  const receivedAgendaValue = (value) => {
    setAgendaItemInput(value);
  };

  /* istanbul ignore next */
  const handleSearchData = (data) => {
    setSearchValue(data);
  };

  /* istanbul ignore next */
  const handleMyRes = () => {
    if (myFavourites === 1) {
      setMyFavourites(0);
    }
    setMyResource((prevValue) => (prevValue === 1 ? 0 : 1));
  };

  /* istanbul ignore next */
  const handleMyFav = () => {
    if (myResource === 1) {
      setMyResource(0);
    }
    setMyFavourites((prevValue) => (prevValue === 1 ? 0 : 1));
  };

  const assigneAgendaResources = async (resourceId) => {
    try {
      await assigneResource({
        variables: {
          patient_id: patientId,
          ptagenda_id: deleteAgendaId,
          ptsharres_id: checkForResourceId,
          resource_id: resourceId,
          session: session,
        },
        onCompleted: () => {
          enqueueSnackbar("Resource assigned successfully!", {
            variant: "success",
          });

          setOpenResourceModal(false);
          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const reassigneAgendaResources = async () => {
    try {
      await assigneResource({
        variables: {
          patient_id: patientId,
          ptagenda_id: deleteAgendaId,
          ptsharres_id: checkForResourceId,
          resource_id: reassignedResourceId,
          session: session,
        },
        onCompleted: () => {
          enqueueSnackbar("Resource re-assigned successfully!", {
            variant: "success",
          });

          setIsConfirmCompleteTask(false);
          setOpenResourceModal(false);

          refetch();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
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
          rowOnePage={100}
          showPagination={false}
        />
      </Box>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Box style={{ flex: 1 }}>
          <Box style={{ marginLeft: "10px" }}>
            <Button
              data-testid="addAgendaItemButton"
              variant="contained"
              onClick={handleOpenAddAgendaItemModal}
            >
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
      <CommonModal
        ref={modalRefAddAgendaItem}
        headerTitleText="Add Item"
        maxWidth="sm"
      >
        <AddAgendaItemForm
          onPressSubmit={() => setIsConfirmAddAgendaTask(true)}
          receiveDisplayValue={receiveDisplayValue}
          receivedAgendaValue={receivedAgendaValue}
        />
      </CommonModal>
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
      {isConfirmAddAgendaTask && (
        <ConfirmationModal
          label="Are you sure you want to add this item?"
          onCancel={clearIsConfirmCancel}
          onConfirm={handleAgendaItem}
        />
      )}
      <ResourcePopup
        openResourceModal={openResourceModal}
        setOpenResourceModal={setOpenResourceModal}
        popupData={popupData}
        onSearchData={handleSearchData}
        assigneHomeworkResources={(resourceId) => {
          /* istanbul ignore next */
          if (!checkForResourceId.length) {
            assigneAgendaResources(resourceId);
          } else {
            setIsConfirmCompleteTask(true);
            setReassignedResourceId(resourceId);
          }
        }}
        handleMyRes={handleMyRes}
        handleMyFav={handleMyFav}
      />

      {isConfirmCompleteTask && (
        <ConfirmationModal
          label="Resource already assigned, would you like to change it?"
          onCancel={clearIsConfirmCancel}
          onConfirm={reassigneAgendaResources}
        />
      )}
    </div>
  );
}

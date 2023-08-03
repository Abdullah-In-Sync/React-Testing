import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import TableGenerator from "../../../components/common/TableGenerator";
import { Button, IconButton } from "@mui/material";
import NextLink from "next/link";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ShareIcon from "@mui/icons-material/Share";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_AGENDA_DETAILS_LIST } from "../../../graphql/SafetyPlan/graphql";

type propTypes = {
  sessionNo?: any;
};
export default function AgendaDetailAccordian(props: propTypes) {
  const [loader, setLoader] = useState<boolean>(false);

  const [getPatientAgendaDetailsList, { data: agendaDetailList }] =
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
      render: () => (
        <>
          <IconButton size="small">
            <DeleteIcon data-testid="deleteIcon" />
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
          <Button data-testid="notesForSession" variant="contained">
            Notes for Session {props.sessionNo}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

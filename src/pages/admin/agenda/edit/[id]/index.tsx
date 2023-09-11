import React, { useEffect, useState } from "react";
import AdminAddAgendaForm from "../../../../../components/admin/agenda/addAgenda";
import { Box } from "@mui/material";
import { addAdminAgendaFormField } from "../../../../../utility/types/resource_types";
import { useLazyQuery, useMutation } from "@apollo/client";
import { ADMIN_UPDATE_AGENDA_BY_ID } from "../../../../../graphql/mutation/resource";
import { useSnackbar } from "notistack";
import Layout from "../../../../../components/layout";
import { useRouter } from "next/router";
import Loader from "../../../../../components/common/Loader";
import { GET_ADMIN_AGENDA_BY_ID } from "../../../../../graphql/mutation/admin";
import ContentHeader from "../../../../../components/common/ContentHeader";

export default function EditAdminAgendaMain() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  /* istanbul ignore next */
  const agendaId = router?.query.id as string;

  const [loader, setLoader] = useState<boolean>(false);
  const [updateAdminAgenda] = useMutation(ADMIN_UPDATE_AGENDA_BY_ID);

  const [getAdminAgendaById, { data: adminAgendaData }] = useLazyQuery(
    GET_ADMIN_AGENDA_BY_ID,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );

  useEffect(() => {
    setLoader(true);
    getAdminAgendaById({
      variables: { agenda_id: agendaId },
    });
  }, [agendaId]);

  const submitEditFormHandler = async (formFields: addAdminAgendaFormField) => {
    try {
      updateAdminAgenda({
        variables: {
          agenda_id: agendaId,
          updateAgenda: {
            agenda_name: formFields.agenda_name,
            disorder_id: formFields.disorder_id,
            display_order: formFields.display_order,
            model_id: formFields.model_id,
            session: formFields.session,
            therapy_id: formFields.therapy_id,
            org_id: formFields.org_id,
          },
        },
        onCompleted: () => {
          /* istanbul ignore next */
          enqueueSnackbar("Agenda updated successfully!", {
            variant: "success",
            autoHideDuration: 2000,
          });
          /* istanbul ignore next */
          router.push("/admin/agenda");
        },
      });
      setLoader(false);
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong.", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <Box>
      <Layout boxStyle={{ height: "100vh" }}>
        <Loader visible={loader} />
        <ContentHeader title="Edit Agenda" />

        <AdminAddAgendaForm
          onSubmit={submitEditFormHandler}
          adminAgendaData={adminAgendaData}
          setLoader={setLoader}
        />
      </Layout>
    </Box>
  );
}

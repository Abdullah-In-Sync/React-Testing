import React, { useState } from "react";
import AdminAddAgendaForm from "../../../../components/admin/agenda/addAgenda";
import { Box } from "@mui/material";
import { addAdminAgendaFormField } from "../../../../utility/types/resource_types";
import { useMutation } from "@apollo/client";
import { ADD_AGENDA } from "../../../../graphql/mutation/resource";
import { useSnackbar } from "notistack";
import Layout from "../../../../components/layout";
import { useRouter } from "next/router";
import Loader from "../../../../components/common/Loader";

export default function AddAdminAgendaMain() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [addAdminAgenda] = useMutation(ADD_AGENDA);

  const submitFormHandler = async (formFields: addAdminAgendaFormField) => {
    try {
      addAdminAgenda({
        variables: {
          agenda_name: formFields.agenda_name,
          disorder_id: formFields.disorder_id,
          display_order: formFields.display_order,
          model_id: formFields.model_id,
          session: formFields.session,
          therapy_id: formFields.therapy_id,
        },
        onCompleted: () => {
          /* istanbul ignore next */
          enqueueSnackbar("Agenda added successfully!", {
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
    <div>
      <Box>
        <Layout boxStyle={{ height: "100vh" }}>
          <Loader visible={loader} />
          <AdminAddAgendaForm
            onSubmit={submitFormHandler}
            setLoader={setLoader}
          />
        </Layout>
      </Box>
    </div>
  );
}

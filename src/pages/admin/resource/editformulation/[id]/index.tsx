import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { editFormulationFormField } from "../../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";
import withAuthentication from "../../../../../hoc/auth";
import EditFormFormulation from "../../../../../components/common/EditFormulationForm/EditFormulationForm";
import { UPDATE_ADMIN_FORMULATION_BY_ID } from "../../../../../graphql/formulation/graphql";

const EditFormulation = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);

  const [updateFormulation] = useMutation(UPDATE_ADMIN_FORMULATION_BY_ID);

  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query.id as string;

  useEffect(() => {
    setLoader(true);
  }, []);

  /* istanbul ignore next */
  const updateFormulationHandler = async (
    formFields: editFormulationFormField
  ) => {
    try {
      await updateFormulation({
        variables: {
          formulation_id: id,
          updateFormulation: {
            formulation_desc: formFields.formulation_desc,
            formulation_instruction: formFields.formulation_instruction,
            formulation_name: formFields.formulation_name,
            org_id: formFields.org_id,
            formulation_img: formFields.file_name,

            formulation_avail_for: JSON.stringify(
              formFields.formulation_avail_for
            ),
          },
        },
        onCompleted: () => {
          enqueueSnackbar("Formulation updated successfully!", {
            variant: "success",
          });

          router.push("/admin/resource");
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Edit Formulation" />
        <EditFormFormulation
          resourceType="edit"
          onSubmit={updateFormulationHandler}
          setLoader={setLoader}
        />
      </Layout>
    </>
  );
};

export default withAuthentication(EditFormulation, ["admin"]);

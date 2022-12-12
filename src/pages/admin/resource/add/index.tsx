import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AddForm from "../../../../components/admin/resource/addForm";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import { CREATE_RESOURCE } from "../../../../graphql/mutation/resource";
import { addResourceFormField } from "../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";
import withAuthentication from "../../../../hoc/auth";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);

  const [createResource] = useMutation(CREATE_RESOURCE);

  const router = useRouter();

  const submitFormHandler = async (formFields: addResourceFormField) => {
    try {
      createResource({
        variables: {
          disorderId: formFields.disorder_id,
          modelId: formFields.model_id,
          resourceAvailOnlyme: formFields.resource_avail_onlyme,
          resourceAvailTherapist: formFields.resource_avail_therapist,
          resourceFilename: formFields.file_name,
          resourceName: formFields.resource_name,
          resourceType: formFields.resource_type,
          agendaId: formFields.agenda_id,
          categoryId: formFields.category_id,
          resourceDesc: formFields.resource_desc,
          resourceInstruction: formFields.resource_instruction,
          resourceIsformualation: "0",
          resourceIssmartdraw: "0",
          resourceReferences: formFields.resource_references,
          templateData: "",
          templateId: "",
          orgId: formFields.org_id,
        },
        onCompleted: (data) => {
          if (data && data.createResource && data.createResource._id) {
            enqueueSnackbar("Resource added successfully", {
              variant: "success",
              autoHideDuration: 2000,
            });
            router.push("/admin/resource");
          }
        },
      });

      setLoader(false);
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Please fill the all fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Add Resource" />
        <AddForm
          resourceType="add"
          onSubmit={submitFormHandler}
          setLoader={setLoader}
        />
      </Layout>
    </>
  );
};

export default withAuthentication(Index, ["admin"]);

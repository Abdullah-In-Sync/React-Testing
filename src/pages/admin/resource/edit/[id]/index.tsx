import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { UPDATE_RESOURCE_BY_ID } from "../../../../../graphql/mutation/resource";
import { editResourceFormField } from "../../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";
import EditForm from "../../../../../components/common/EditResourceForm/EditResourceForm";
import withAuthentication from "../../../../../hoc/auth";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);

  const [updateResource] = useMutation(UPDATE_RESOURCE_BY_ID);

  const router = useRouter();
  const id = router?.query.id as string;

  useEffect(() => {
    setLoader(true);
  }, []);

  const editFormHandler = async (formFields: editResourceFormField) => {
    try {
      updateResource({
        variables: {
          resourceId: id,
          update: {
            resource_name: formFields.resource_name,
            resource_type: formFields.resource_type,
            resource_isformualation: "0",
            disorder_id: formFields.disorder_id,
            model_id: formFields.model_id,
            category_id: formFields.category_id,
            resource_desc: formFields.resource_desc,
            resource_instruction: formFields.resource_instruction,
            resource_references: formFields.resource_references,
            agenda_id: formFields.agenda_id,
            resource_avail_therapist: formFields.resource_avail_therapist,
            resource_avail_onlyme: formFields.resource_avail_onlyme,
            resource_filename: formFields.file_name,
            resource_issmartdraw: formFields?.resource_issmartdraw || "0",
            ...(formFields?.resource_issmartdraw == "1"
              ? {
                  template_id: formFields?.template_id,
                  template_data: formFields?.template_data,
                }
              : {}),
            org_id: formFields.org_id,
          },
        },
        onCompleted: (data) => {
          console.log("data: ", data);
          if (data && data.updateResourceById) {
            enqueueSnackbar("Resource edit successfully", {
              variant: "success",
            });
            router.push("/admin/resource");
          }
        },
      });

      setLoader(false);
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Please fill the all fields", { variant: "error" });
    }
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Edit Resource" />
        <EditForm
          resourceType="edit"
          onSubmit={editFormHandler}
          setLoader={setLoader}
        />
      </Layout>
    </>
  );
};

export default withAuthentication(Index, ["admin"]);

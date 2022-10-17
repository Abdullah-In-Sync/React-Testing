import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { UPDATE_RESOURCE_BY_ID } from "../../../../../graphql/mutation/resource";
import { buildAdminTokenValidationQuery } from "../../../../../lib/helpers/auth";
import { editResourceFormField } from "../../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";
import EditForm from "../../../../../components/common/EditResourceForm/EditResourceForm";

export default function Index() {
  const { enqueueSnackbar } = useSnackbar();
  const [adminId, setadminId] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);

  const [updateResource] = useMutation(UPDATE_RESOURCE_BY_ID);

  const router = useRouter();

  const [gettokenData, tokenLoading] = buildAdminTokenValidationQuery(
    (adminData) => {
      /* istanbul ignore next */
      setadminId(adminData._id);
    }
  );

  useEffect(() => {
    gettokenData();
  }, []);

  useEffect(() => {
    setLoader(true);
    gettokenData();
  }, []);

  /* istanbul ignore next */
  if (gettokenData && !tokenLoading && adminId) {
    /* istanbul ignore next */
    console.debug(adminId);
  }

  const editFormHandler = async (formFields: editResourceFormField) => {
    console.debug("formfield", {
      resourceId: "12274a23-4932-49b6-9eec-ae7f9f6b804d",
      update: {
        resource_name: formFields.resource_name,
        resource_type: formFields.resource_type,
        resource_issmartdraw: "0",
        resource_isformualation: "0",
        disorder_id: formFields.disorder_id,
        model_id: formFields.model_id,
        category_id: formFields.category_id,
        resource_desc: formFields.resource_desc,
        resource_instruction: formFields.resource_instruction,
        resource_references: formFields.resource_references,
        agenda_id: formFields.agenda_id,
        resource_avail_admin: formFields.resource_avail_admin,
        resource_avail_therapist: formFields.resource_avail_therapist,
        resource_avail_onlyme: formFields.resource_avail_onlyme,
        resource_avail_all: formFields.resource_avail_all,
        resource_filename: "invalid.pdf",
      },
    });
    console.log("formfield", formFields);
    try {
      updateResource({
        variables: {
          resourceId: formFields._id,
          update: {
            resource_name: formFields.resource_name,
            resource_type: formFields.resource_type,
            resource_issmartdraw: "0",
            resource_isformualation: "0",
            disorder_id: formFields.disorder_id,
            model_id: formFields.model_id,
            category_id: formFields.category_id,
            resource_desc: formFields.resource_desc,
            resource_instruction: formFields.resource_instruction,
            resource_references: formFields.resource_references,
            agenda_id: formFields.agenda_id,
            resource_avail_admin: formFields.resource_avail_admin,
            resource_avail_therapist: formFields.resource_avail_therapist,
            resource_avail_onlyme: formFields.resource_avail_onlyme,
            resource_avail_all: formFields.resource_avail_all,
            resource_filename: formFields.file_name,
          },
        },
        onCompleted: (data) => {
          // console.log("datafinal: ", data);
          console.debug("api response", data);

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
          userType="admin"
          onSubmit={editFormHandler}
          setLoader={setLoader}
        />
      </Layout>
    </>
  );
}

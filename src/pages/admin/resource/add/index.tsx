import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddForm from "../../../../components/admin/resource/addForm";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import { CREATE_RESOURCE } from "../../../../graphql/mutation/resource";
import { IS_ADMIN } from "../../../../lib/constants";
import { buildAdminTokenValidationQuery } from "../../../../lib/helpers/auth";
import { addResourceFormField } from "../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";

export default function Index() {
  const { enqueueSnackbar } = useSnackbar();
  const [adminId, setadminId] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);

  const [createResource] = useMutation(CREATE_RESOURCE);

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

  /* istanbul ignore next */
  if (gettokenData && !tokenLoading && adminId) {
    /* istanbul ignore next */
    console.debug(adminId);
  }

  const submitFormHandler = async (formFields: addResourceFormField) => {
    try {
      createResource({
        variables: {
          disorderId: formFields.disorder_id,
          modelId: formFields.model_id,
          resourceAvailAdmin: formFields.resource_avail_admin,
          resourceAvailAll: formFields.resource_avail_all,
          resourceAvailOnlyme: formFields.resource_avail_onlyme,
          resourceAvailTherapist: formFields.resource_avail_therapist,
          resourceFilename: formFields.file_name,
          resourceName: formFields.resource_name,
          resourceType: formFields.resource_type,
          agendaId: formFields.agenda_id,
          categoryId: formFields.category_id,
          orgId: "",
          resourceDesc: formFields.resource_desc,
          resourceInstruction: formFields.resource_instruction,
          resourceIsformualation: "0",
          resourceIssmartdraw: "0",
          resourceReferences: formFields.resource_references,
          resourceStatus: 1,
          userType: IS_ADMIN,
        },
        onCompleted: (data) => {
          if (data && data.createResource && data.createResource._id) {
            enqueueSnackbar("Resource added successfully", {
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
        <ContentHeader title="Add Resource" />
        <AddForm
          resourceType="add"
          userType="admin"
          onSubmit={submitFormHandler}
          setLoader={setLoader}
        />
      </Layout>
    </>
  );
}

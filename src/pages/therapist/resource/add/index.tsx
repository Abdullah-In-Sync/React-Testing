import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AddForm from "../../../../components/admin/resource/addForm";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import { ADMIN_CREATE_RESOURCE } from "../../../../graphql/mutation/resource";
import { IS_THERAPIST } from "../../../../lib/constants";
import { buildTherapistTokenValidationQuery } from "../../../../lib/helpers/auth";
import { addResourceFormField } from "../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";

export default function Index() {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);

  const [createResource] = useMutation(ADMIN_CREATE_RESOURCE);

  const router = useRouter();

  const [therapistData, setTherapistData] = useState<{
    _id: string;
    org_id: string;
  }>({
    _id: "",
    org_id: "",
  });

  const [gettokenData, tokenLoading] = buildTherapistTokenValidationQuery(
    (therapistData) => {
      setTherapistData({
        _id: therapistData.therapist_data._id,
        org_id: therapistData.therapist_data.org_id,
      });
      setLoader(false);
    }
  );

  useEffect(() => {
    setLoader(true);
    gettokenData();
  }, []);

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
          orgId: therapistData.org_id,
          resourceDesc: formFields.resource_desc,
          resourceInstruction: formFields.resource_instruction,
          resourceIsformualation: "0",
          resourceIssmartdraw: "0",
          resourceReferences: formFields.resource_references,
          resourceStatus: 1,
          userType: IS_THERAPIST,
        },
        onCompleted: (data) => {
          if (data && data.createResource && data.createResource._id) {
            enqueueSnackbar("Resource added successfully", {
              variant: "success",
            });
            router.push("/therapist/resource");
          }
        },
      });
      setLoader(false);
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Please fill the all fields", { variant: "error" });
    }
  };

  return (
    <>
      <Layout>
        <Loader visible={loader || tokenLoading} />
        <ContentHeader title="Add Resource" />
        <AddForm
          resourceType="add"
          userType="therapist"
          onSubmit={submitFormHandler}
          setLoader={setLoader}
        />
      </Layout>
    </>
  );
}

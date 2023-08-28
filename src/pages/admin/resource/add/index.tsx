import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import AddForm from "../../../../components/admin/resource/addForm";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import {
  CREATE_RESOURCE,
  CREATE_RESOURCE_FORMULATION,
} from "../../../../graphql/mutation/resource";
import { addResourceFormField } from "../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";
import withAuthentication from "../../../../hoc/auth";
import InfoModal, {
  ConfirmInfoElement,
} from "../../../../components/common/CustomModal/InfoModal";
import InfoMessageView from "../../../../components/common/InfoMessageView";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);
  const infoModalRef = useRef<ConfirmInfoElement>(null);

  const [createResource] = useMutation(CREATE_RESOURCE);
  const [createFormulation] = useMutation(CREATE_RESOURCE_FORMULATION);
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
          const {
            createResource: { duplicateNames },
          } = data;
          /* istanbul ignore next */
          if (duplicateNames != null) {
            infoModalRef.current.openConfirm({
              data: {
                duplicateNames,
                message:
                  "This Resource already exists in the following organisations! ",
              },
            });
          } else {
            /* istanbul ignore next */
            enqueueSnackbar("Resource added successfully", {
              variant: "success",
              autoHideDuration: 2000,
            });
            /* istanbul ignore next */
            router.push("/admin/resource");
          }
        },
      });
      setLoader(false);
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Please fill the all fields", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };

  const submitFormHandlerFormulation = async (
    formFields: addResourceFormField
  ) => {
    try {
      createFormulation({
        variables: {
          formulation_name: formFields.resource_name,
          formulation_filename: formFields.file_name,
          formulation_type: 1,
          org_id: formFields.org_id,
          formulation_desc: formFields.resource_desc,
          formulation_instruction: formFields.resource_instruction,
          formulation_avail_for: JSON.stringify(
            formFields.formulation_avail_for
          ),
        },
        onCompleted: (data) => {
          /* istanbul ignore next */
          if (data?.createFormulation?.duplicateNames === null) {
            enqueueSnackbar("Formulation added successfully!", {
              variant: "success",
              autoHideDuration: 2000,
            });
            router.push("/admin/resource/?tab=formulation");
          } else {
            /* istanbul ignore next */
            enqueueSnackbar("This formulation name already exist!", {
              variant: "error",
              autoHideDuration: 2000,
            });
            /* istanbul ignore next */
            router.push("/admin/resource/?tab=formulation");
          }
        },
      });

      setLoader(false);
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("There is something wrong", {
        variant: "error",
        autoHideDuration: 2000,
      });
    }
  };
  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <AddForm
          resourceType="add"
          onSubmit={submitFormHandler}
          setLoader={setLoader}
          formulationSubmit={submitFormHandlerFormulation}
        />
      </Layout>
      <InfoModal ref={infoModalRef}>
        <InfoMessageView />
      </InfoModal>
    </>
  );
};

export default withAuthentication(Index, ["admin"]);

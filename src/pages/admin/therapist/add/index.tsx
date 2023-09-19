import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import ContentHeader from "../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../components/common/Loader";

import AddTherapistForm from "../../../../components/admin/therapist/add/AddTherapistForm";
import { queryMasterData } from "../../../../components/admin/therapist/hook/fetchDropdown";
import { ConfirmElement } from "../../../../components/common/ConfirmWrapper";
import Layout from "../../../../components/layout";
import { ADD_ADMIN_THERAPIST } from "../../../../graphql/Therapist/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { fetchUrlAndUploadFile } from "../../../../hooks/fetchUrlAndUploadFile";
import { cogMessageToJson, removeProp } from "../../../../utility/helper";

const AddTherapistPage: NextPage = () => {
  const router = useRouter();
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [addTherapist] = useMutation(ADD_ADMIN_THERAPIST);
  const { uploadFile } = fetchUrlAndUploadFile();
  const [specializationQuery, professionalQuery, planTrialQuery] =
    queryMasterData();

  const { data: { getMasterData: specialization = undefined } = {} } =
    specializationQuery;
  const { data: { getMasterData: professional = undefined } = {} } =
    professionalQuery;
  const { data: { getMasterData: plan_trial = undefined } = {} } =
    planTrialQuery;

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  useEffect(() => {
    getOrgList();
  }, []);

  /* istanbul ignore file */
  const getUrlAndUploadFile = ({ fileName, file }, callback) => {
    uploadFile({ fileName, file, imageFolder: "resource" }, callback, () => {
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    });
  };

  /* istanbul ignore file */
  const submitForm = async (variables, doneCallback) => {
    try {
      await addTherapist({
        variables,
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          const {
            addTherapist: { result = undefined, message = undefined } = {},
          } = data;
          if (result && result != "error") {
            enqueueSnackbar("Therapist added successfully!", {
              variant: "success",
            });
            router.push("/admin/therapist/list");
          } else if (message) {
            const { message: messageText } = cogMessageToJson(message);
            infoModalRef.current.openConfirm({
              data: {
                message: messageText,
              },
            });
          }
        },
      });
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
      doneCallback();
    } finally {
      setLoader(false);
      doneCallback();
    }
  };

  /* istanbul ignore next */
  const uploadFileAndSubmitForm = async (formFields, doneCallback) => {
    setLoader(true);
    const {
      therapist_poa_attachment,
      therapist_poa_attachment_file,
      therapist_inscover,
      therapist_inscover_file,
      therapist_proofaccredition,
    } = formFields;
    let removePropList = [
      "therapist_poa_attachment_file",
      "therapist_inscover_file",
      "confirm_password",
    ];

    if (!therapist_proofaccredition) {
      removePropList = [...removePropList, ...["therapist_poa_attachment"]];
    }

    if (therapist_poa_attachment_file && therapist_inscover_file) {
      const variables = removeProp(formFields, removePropList);
      getUrlAndUploadFile(
        { fileName: therapist_inscover, file: therapist_inscover_file },
        () =>
          !therapist_proofaccredition
            ? submitForm(variables, doneCallback)
            : getUrlAndUploadFile(
                {
                  fileName: therapist_poa_attachment,
                  file: therapist_poa_attachment_file,
                },
                () => submitForm(variables, doneCallback)
              )
      );
    } else if (therapist_poa_attachment_file && therapist_proofaccredition) {
      const variables = removeProp(formFields, removePropList);
      getUrlAndUploadFile(
        {
          fileName: therapist_poa_attachment,
          file: therapist_poa_attachment_file,
        },
        () => submitForm(variables, doneCallback)
      );
    } else if (therapist_inscover_file) {
      const variables = removeProp(formFields, removePropList);
      getUrlAndUploadFile(
        { fileName: therapist_inscover, file: therapist_inscover_file },
        () => submitForm(variables, doneCallback)
      );
    } else {
      submitForm(
        removeProp(formFields, [
          ...removePropList,
          ...["therapist_poa_attachment", "therapist_inscover"],
        ]),
        doneCallback
      );
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) =>
        uploadFileAndSubmitForm(formFields, callback),
      description: "Are you sure you want to add this therapist?",
      setSubmitting,
    });
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Add Therapist" />
        {specialization && professional && plan_trial && (
          <AddTherapistForm
            organizationList={organizationList}
            submitForm={handleSavePress}
            confirmRef={confirmRef}
            infoModalRef={infoModalRef}
            masterData={{
              specialization,
              professional,
              plan_trial,
            }}
          />
        )}
      </Layout>
    </>
  );
};

export default AddTherapistPage;

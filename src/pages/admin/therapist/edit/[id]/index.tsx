import { useLazyQuery, useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../../components/common/Loader";

import EditTherapistForm from "../../../../../components/admin/therapist/edit/EditTherapist";
import { queryMasterData } from "../../../../../components/admin/therapist/hook/fetchDropdown";
import { ConfirmElement } from "../../../../../components/common/ConfirmWrapper";
import Layout from "../../../../../components/layout";
import {
  GET_THERAPIST_BY_ID,
  UPDATE_THERAPIST_BY_ID,
} from "../../../../../graphql/Therapist/graphql";
import { TherapistData } from "../../../../../graphql/Therapist/types";
import { GET_FILE_UPLOAD_URl } from "../../../../../graphql/query/common";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";
import { uploadToS3 } from "../../../../../lib/helpers/s3";
import { removeProp } from "../../../../../utility/helper";

const EditTherapistPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { id: therapistId },
  } = router;
  const confirmRef = useRef<ConfirmElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [updateTherapist] = useMutation(UPDATE_THERAPIST_BY_ID);
  const [specializationQuery, professionalQuery, planTrialQuery] =
    queryMasterData();

  const { data: { getMasterData: specialization = undefined } = {} } =
    specializationQuery;
  const { data: { getMasterData: professional = undefined } = {} } =
    professionalQuery;
  const { data: { getMasterData: plan_trial = undefined } = {} } =
    planTrialQuery;

  const [
    getTherapist,
    { data: { getTherapistById: therapistData = undefined } = {} },
  ] = useLazyQuery<TherapistData>(GET_THERAPIST_BY_ID, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [getUploadUrl] = useLazyQuery(GET_FILE_UPLOAD_URl);

  useEffect(() => {
    getOrgList();
    getTherapist({
      variables: {
        user_id: therapistId,
      },
    });
  }, []);

  /* istanbul ignore file */
  const getUrlAndUploadFile = ({ fileName, file }, callback) => {
    getUploadUrl({
      variables: {
        fileName,
        imageFolder: "resource",
      },
      onCompleted: async (data) => {
        const { getFileUploadUrl: { upload_file_url = undefined } = {} } = data;
        if (upload_file_url) {
          if (await uploadToS3(file, upload_file_url)) callback();
        }
      },
      onError: () => {
        enqueueSnackbar("Server error please try later.", {
          variant: "error",
        });
      },
    });
  };

  /* istanbul ignore file */
  const submitForm = async (formFields, doneCallback) => {
    const {
      therapist_name,
      accredited_body,
      org_id,
      plan,
      therapist_add,
      therapist_inscover,
      therapist_poa_attachment,
      therapist_proofaccredition,
      therapist_profaccredition,
      therapist_specialization,
      therapist_totexp,
      trial_period,
    } = formFields;

    try {
      await updateTherapist({
        variables: {
          user_id: therapistId,
          therapist_add,
          therapist_name,
          update: {
            therapist_name,
            therapist_add,
            accredited_body,
            org_id,
            therapist_inscover,
            therapist_poa_attachment,
            therapist_profaccredition,
            therapist_specialization,
            therapist_status: 1,
            therapist_totexp,
            therapist_proofaccredition,
            plan,
            trial_period,
          },
        },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          const { updateTherapistById: { _id = undefined } = {} } = data;
          if (_id) {
            router.push("/admin/therapist/list");
            enqueueSnackbar("Therapist updated successfully!", {
              variant: "success",
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
          // ...["therapist_poa_attachment", "therapist_inscover"],
        ]),
        doneCallback
      );
    }
  };

  const handleSavePress = (formFields, { setSubmitting }) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) =>
        uploadFileAndSubmitForm(formFields, callback),
      description: "Are you sure you want to update this Therapist?",
      setSubmitting,
    });
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Edit Therapist" />
        {specialization && professional && plan_trial && therapistData && (
          <EditTherapistForm
            organizationList={organizationList}
            submitForm={handleSavePress}
            confirmRef={confirmRef}
            infoModalRef={infoModalRef}
            therapistData={therapistData}
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

export default EditTherapistPage;

import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";

import { useAppContext } from "../../../../contexts/AuthContext";
import {
  GET_THERAPIST_BY_ID,
  UPDATE_THERAPIST_BY_ID,
} from "../../../../graphql/Therapist/graphql";
import { TherapistData } from "../../../../graphql/Therapist/types";
import TherapistProfileView from "./TherapistProfileView";
import { queryMasterData } from "./hook/fetchDropdown";
import Loader from "../../../common/Loader";
import { ConfirmInfoElement } from "../../../common/CustomModal/InfoModal";
import { ConfirmElement } from "../../../common/ConfirmWrapper";
import { useSnackbar } from "notistack";
import { GET_FILE_UPLOAD_URl } from "../../../../graphql/query/common";
import { uploadToS3 } from "../../../../lib/helpers/s3";
import { removeProp } from "../../../../utility/helper";

const TherapistProfile: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { user: { _id: user_id } = {} } = useAppContext();
  const [specializationQuery, professionalQuery] = queryMasterData();
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const confirmRef = useRef<ConfirmElement>(null);
  const [updateTherapist] = useMutation(UPDATE_THERAPIST_BY_ID);
  const [getUploadUrl] = useLazyQuery(GET_FILE_UPLOAD_URl);
  const { data: { getMasterData: specialization = undefined } = {} } =
    specializationQuery;
  const { data: { getMasterData: professional = undefined } = {} } =
    professionalQuery;

  const [
    getTherapist,
    {
      data: { getTherapistById: therapistData = undefined } = {},
      loading: therapistDataLoading,
      refetch: refetchTherapistById,
    },
  ] = useLazyQuery<TherapistData>(GET_THERAPIST_BY_ID, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    if (user_id)
      getTherapist({
        variables: {
          user_id,
        },
      });
  }, [user_id]);

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

  const submitUpdateProfileApi = async (formFields, doneCallback) => {
    try {
      await updateTherapist({
        variables: {
          user_id,
          update: formFields,
        },
        fetchPolicy: "network-only",
        onCompleted: (data) => {
          const { updateTherapistById: { _id = undefined } = {} } = data;
          if (_id) {
            refetchTherapistById();
            enqueueSnackbar("Profile updated successfully!", {
              variant: "success",
            });
            doneCallback();
          }
        },
      });
    } catch (e) {
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    }
  };

  const onPressEditProfileButton = () => {
    infoModalRef?.current?.openConfirm({
      data: {
        therapistData,
        masterData: {
          specialization,
          professional,
        },
        headerTitleText: "Edit Profile",
        onSubmit: submitUpdateProfile,
      },
    });
  };

  const submitCallback = () => {
    confirmRef.current.close();
    infoModalRef.current.close();
  };

  const submitUpdateProfile = (v, { setSubmitting }) => {
    const {
      therapist_poa_attachment,
      therapist_poa_attachment_file,
      therapist_proofaccredition,
    } = v;
    const variables = removeProp(v, [
      "therapist_poa_attachment_file",
      "phone_number",
      "email",
    ]);
    if (therapist_poa_attachment_file && therapist_proofaccredition) {
      getUrlAndUploadFile(
        {
          fileName: therapist_poa_attachment,
          file: therapist_poa_attachment_file,
        },
        () =>
          confirmRef.current.openConfirm({
            confirmFunction: () =>
              submitUpdateProfileApi(variables, submitCallback),
            description: "Are you sure you want to update the profile?",
            setSubmitting,
          })
      );
    } else {
      confirmRef.current.openConfirm({
        confirmFunction: () =>
          submitUpdateProfileApi(variables, submitCallback),
        description: "Are you sure you want to update the profile?",
        setSubmitting,
      });
    }
  };

  return (
    <>
      <Loader visible={therapistDataLoading} />
      <TherapistProfileView
        masterData={{
          specialization,
          professional,
        }}
        therapistData={therapistData}
        onPressEditProfileButton={onPressEditProfileButton}
        infoModalRef={infoModalRef}
        confirmRef={confirmRef}
        therapistDataLoading={therapistDataLoading}
      />
    </>
  );
};

export default TherapistProfile;

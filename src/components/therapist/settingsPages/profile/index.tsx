import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";

import { useSnackbar } from "notistack";
import { useAppContext } from "../../../../contexts/AuthContext";
import {
  GET_THERAPIST_BY_ID,
  UPDATE_THERAPIST_BY_ID,
} from "../../../../graphql/Therapist/graphql";
import { TherapistData } from "../../../../graphql/Therapist/types";
import { fetchUrlAndUploadFile } from "../../../../hooks/fetchUrlAndUploadFile";
import { removeProp } from "../../../../utility/helper";
import { ConfirmElement } from "../../../common/ConfirmWrapper";
import { ConfirmInfoElement } from "../../../common/CustomModal/InfoModal";
import Loader from "../../../common/Loader";
import TherapistProfileView from "./TherapistProfileView";
import { queryMasterData } from "./hook/fetchDropdown";

const TherapistProfile: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { uploadFile } = fetchUrlAndUploadFile();
  /* istanbul ignore next */
  const { user: { therapist_data: { user_id } } = {} } = useAppContext();
  const [specializationQuery, professionalQuery] = queryMasterData();
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const confirmRef = useRef<ConfirmElement>(null);
  const [updateTherapist] = useMutation(UPDATE_THERAPIST_BY_ID);
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
    uploadFile({ fileName, file, imageFolder: "resource" }, callback, () => {
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
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
          /* istanbul ignore next */
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
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    }
  };

  const onPressEditProfileButton = () => {
    /* istanbul ignore next */
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
      therapist_inscover,
      therapist_inscover_file,
    } = v;
    const variables = removeProp(v, [
      "therapist_poa_attachment_file",
      "therapist_inscover_file",
      "phone_number",
      "email",
    ]);

    if (therapist_poa_attachment_file && therapist_inscover_file) {
      getUrlAndUploadFile(
        { fileName: therapist_inscover, file: therapist_inscover_file },
        () =>
          /* istanbul ignore next */
          !therapist_proofaccredition
            ? confirmToSubmit(variables, { setSubmitting, submitCallback })
            : getUrlAndUploadFile(
                {
                  fileName: therapist_poa_attachment,
                  file: therapist_poa_attachment_file,
                },
                () =>
                  confirmToSubmit(variables, { setSubmitting, submitCallback })
              )
      );
    } else if (therapist_poa_attachment_file && therapist_proofaccredition) {
      /* istanbul ignore next */
      getUrlAndUploadFile(
        {
          fileName: therapist_poa_attachment,
          file: therapist_poa_attachment_file,
        },
        () => confirmToSubmit(variables, { setSubmitting, submitCallback })
      );
    } else {
      confirmToSubmit(variables, { setSubmitting, submitCallback });
    }
  };

  const confirmToSubmit = (variables, { setSubmitting, submitCallback }) => {
    confirmRef.current.openConfirm({
      confirmFunction: () => submitUpdateProfileApi(variables, submitCallback),
      description: "Are you sure you want to update the profile?",
      setSubmitting,
    });
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

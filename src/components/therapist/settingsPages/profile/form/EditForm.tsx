import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
  GetMasterDataEntity,
  GetTherapistById,
} from "../../../../../graphql/Therapist/types";
import ProfileForm from "./CommonForm";
import { Stack } from "@mui/material";

interface ViewProps {
  data?: {
    masterData?: {
      specialization: GetMasterDataEntity[];
      professional: GetMasterDataEntity[];
    };
    therapistData?: GetTherapistById;
    onSubmit?: any;
  };
}

export const editTherapistValidationSchema = Yup.object().shape({
  therapist_name: Yup.string().required("Name is required"),
  therapist_poa_attachment_file: Yup.mixed().when(
    "therapist_proofaccredition",
    {
      is: 1,
      then: Yup.mixed()
        .test("optional", null, (value) => {
          return value != null;
        })
        .test("type", "Only support PDF, PNG and JPEG file.", function (value) {
          if (value == "undefined" || value) {
            return (
              value &&
              (value.type === "image/jpg" ||
                value.type === "image/jpeg" ||
                value.type === "image/png" ||
                value.type === "application/pdf")
            );
          } else {
            return true;
          }
        }),
    }
  ),
});

const ProfileEditForm: React.FC<ViewProps> = ({
  data: { masterData, therapistData, onSubmit } = {},
}) => {
  if (!therapistData) return null;
  const {
    email = "",
    therapist_name = "",
    therapist_specialization = "",
    therapist_profaccredition = "",
    therapist_proofaccredition = false,
    therapist_totexp = "",
    phone_number = "",
    therapist_poa_attachment,
    therapist_add = "",
    therapist_inscover = "",
    accredited_body = "",
  } = therapistData || {};

  const initialValues = {
    email,
    therapist_name,
    therapist_specialization,
    therapist_profaccredition,
    therapist_proofaccredition:
      therapist_proofaccredition === null ? 1 : therapist_proofaccredition,
    therapist_totexp,
    phone_number,
    therapist_poa_attachment,
    therapist_poa_attachment_file: undefined,
    therapist_add,
    therapist_inscover,
    therapist_inscover_file: undefined,
    accredited_body,
  };

  const commonform = () => {
    return (
      <Formik
        validationSchema={editTherapistValidationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        children={(props) => (
          <ProfileForm
            {...props}
            masterData={masterData}
            saveButtonText={"Update"}
          />
        )}
      />
    );
  };
  return (
    <>
      <Stack className="formWrapper">{commonform()}</Stack>
    </>
  );
};

export default ProfileEditForm;

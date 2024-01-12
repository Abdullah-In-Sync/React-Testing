import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ProfileForm from "../../../../../../../components/common/ProfileForm/profileForm";
import { GET_PROFILE_DATA_FOR_THERAPIST } from "../../../../../../../graphql/query/patient";
import { styled } from "@mui/material/styles";
import { IconButton, Box, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { patientEditProfileFormFeild } from "../../../../../../../utility/types/resource_types";
import { UPDATE_PROFILE_DATA_FROM_THERAPIST } from "../../../../../../../graphql/mutation/patient";
import { useSnackbar } from "notistack";
import Loader from "../../../../../../../components/common/Loader";
import { useRouter } from "next/router";
import { checkPrivilageAccess } from "../../../../../../../utility/helper";

const IconButtonWrapper = styled(IconButton)(
  () => `
  background-color: #6EC9DB;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
`
);

export default function TherapistProfileDetails() {
  const isProfileEdit = checkPrivilageAccess("Personal Info", "Edit");
  const router = useRouter();
  /* istanbul ignore next */
  const patientId = router?.query?.id as string;

  // const patientId = sessionStorage.getItem("patient_id");
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);

  // const editValue = router?.query?.editValue as string;

  // useEffect(() => {
  //   if (editValue === "true") {
  //     setEditable(true);
  //   }
  // }, []);

  const [updatePatient] = useMutation(UPDATE_PROFILE_DATA_FROM_THERAPIST);

  const [
    getPatientProfileDataforTherapist,
    { loading: profileLoading, data: therapistProfileData, refetch },
  ] = useLazyQuery(GET_PROFILE_DATA_FOR_THERAPIST, {
    onCompleted: (data) => {
      console.log("Koca: response data ", data);
    },
  });

  useEffect(() => {
    getPatientProfileDataforTherapist({ variables: { patient_id: patientId } });
    if (!profileLoading) {
      setLoader(false);
    }
  }, [therapistProfileData]);

  const editFormHandler = async (
    e,
    formFields: patientEditProfileFormFeild
  ) => {
    e.preventDefault();
    setLoader(true);
    /* istanbul ignore next */

    if (formFields.birthdate == "Invalid Date") {
      enqueueSnackbar("Birthdate can not be empty", { variant: "error" });
    } else {
      try {
        updatePatient({
          variables: {
            patient_id: patientId,
            first_name: formFields.patient_firstname,
            birthdate: formFields?.birthdate,
            address_line1: formFields?.addressline1,
            address_line2: formFields?.addressline2,
            home_no: formFields?.home_no,
            kin_addressline1: formFields?.kin_addressline1,
            kin_addressline2: formFields?.kin_addressline2,
            kin_city: formFields?.kin_city,
            kin_contact: formFields?.kin_contact_no,
            kin_email_address: formFields?.kin_email_address,
            kin_name: formFields?.kin_name,
            kin_postal: formFields?.kin_postal,
            kin_relationship: formFields?.kin_relationship,
            last_name: formFields.patient_lastname,
            nhs_no: formFields?.nhsno,
            patient_city: formFields?.city,
            postal_code: formFields?.postal_code,
            religon: formFields?.religion,

            updateData: {
              patient_firstname: formFields.patient_firstname,
              patient_sexuality: formFields?.patient_sexuality,
              patient_lastname: formFields.patient_lastname,
              patient_marrital: formFields?.patient_marrital,
              patient_gender: formFields?.patient_gender,
              patient_lang: formFields?.patient_lang,
              patient_employment: formFields?.patient_employment,

              patient_gpemailaddress: formFields?.patient_gpemailaddress,
              patient_gppostalcode: formFields?.patient_gppostalcode,
              patient_gpsurgeryname: formFields?.patient_gpsurgeryname,
              patient_gpname: formFields?.patient_gpname,
              patient_gpcontactno: formFields?.patient_gpcontactno,
              patient_gpcity: formFields?.patient_gpcity,
              patient_gpaddressline2: formFields?.patient_gpaddressline2,
              patient_gpaddress: formFields?.patient_gpaddress,

              patient_education: formFields?.patient_education,
              patient_ethnic_group: formFields?.patient_ethnic_group,
              patient_physical_health: formFields?.patient_physical_health,
              patient_illness_ability: formFields?.patient_illness_ability,
            },
          },
          onCompleted: (data) => {
            if (data && data.updatePatientProfileById.result) {
              enqueueSnackbar("Patient details saved successfully", {
                variant: "success",
              });
              setEditable(false);
              refetch();
            }
          },
          onError: (error) => {
            console.log("data error: ", error);
            enqueueSnackbar("Something is wrong", { variant: "error" });
          },
        });

        setLoader(false);
      } catch (e) {
        /* istanbul ignore next */
        setLoader(false);
        /* istanbul ignore next */
        enqueueSnackbar("Something is wrong", { variant: "error" });
      }
    }
  };

  return (
    <>
      <Loader visible={loader} />
      <Box>
        {isProfileEdit && (
          <Box
            style={{
              marginRight: "10px",
              paddingTop: "10px",
            }}
          >
            {editable ? (
              <Box
                sx={{
                  backgroundColor: "#689C8B",
                  borderRadius: "10px 10px 0 0",
                  paddingBottom: "13px",
                }}
              >
                <div
                  style={{
                    padding: "14px 0 0 30px",
                  }}
                >
                  <Typography sx={{ color: "white", fontWeight: "bold" }}>
                    Edit Personal Info
                  </Typography>
                </div>
              </Box>
            ) : (
              <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButtonWrapper
                  aria-label="create"
                  size="small"
                  onClick={() => {
                    setEditable(true);
                  }}
                  data-testid="edit-icon-button"
                >
                  <CreateIcon style={{ color: "#ffff" }} />
                </IconButtonWrapper>
              </Box>
            )}
          </Box>
        )}
        <ProfileForm
          therapistProfileData={therapistProfileData}
          onSubmit={editFormHandler}
          // onSubmit={setModleOpen}
          disabled={!editable}
          userType={"userType"}
          setEditable={setEditable}
          setLoader={setLoader}
        />
      </Box>
    </>
  );
}

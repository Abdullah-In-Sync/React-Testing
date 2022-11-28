import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Loader from "../../../../components/common/Loader";
import Typography from "@mui/material/Typography";
import { useLazyQuery, useMutation } from "@apollo/client";
import Layout from "../../../../components/layout";
import { IconButton, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import { useRouter } from "next/router";
import { GET_PROFILE_DATA } from "../../../../graphql/query/patient";
import {
  patientEditProfileFormFeild,
  patientProfileFormFeild,
} from "../../../../utility/types/resource_types";
import { UPDATE_PROFILE_DATA } from "../../../../graphql/mutation/patient";
import { useSnackbar } from "notistack";

import Agreement from "../../agreement";

import TabsGenerator from "../../../../components/common/TabsGenerator";
import ProfileForm from "../../../../components/common/ProfileForm/profileForm";

import withAuthentication from "../../../../hoc/auth";
import { useAppContext } from "../../../../contexts/AuthContext";
import dayjs from "dayjs";

const defaultFormValue = {
  _id: "",
  patient_contract: 0,
  patient_employment: "",
  patient_firstname: "",
  patient_gender: "",
  patient_gpaddress: "",
  patient_gpaddressline2: "",
  patient_gpcity: "",
  patient_gpcontactno: "",
  patient_gpemailaddress: "",
  patient_gpname: "",
  patient_gppostalcode: "",
  patient_gpsurgeryname: "",
  patient_lang: "",
  patient_lastname: "",
  patient_marrital: "",
  patient_no: "",
  patient_sexuality: "",
  __typename: "",
  addressline2: "",
  birthdate: "",
  created_date: "",
  email: "",
  home_no: "",
  hos_id: "",
  kin_addressline1: "",
  kin_addressline2: "",
  kin_city: "",
  kin_contact_no: "",
  kin_email_address: "",
  kin_postal: "",
  kin_name: "",
  kin_relationship: "",
  nhsno: "",
  patient_consent: 0,
  patient_availability: "",
  org_id: "",
  city: "",
  religion: "",
  patient_status: "",
  addressline1: "",
  phone_number: "",
  postal_code: "",
};

//STYLE
const IconButtonWrapper = styled(IconButton)(
  () => `
  background-color: #ffff;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
`
);

const PatientById: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [formFields, setFormFields] =
    useState<patientProfileFormFeild>(defaultFormValue);

  const [editable, setEditable] = useState<boolean>(false);
  const {
    user: { user_type: userType },
  } = useAppContext();

  //Queries GraphQl
  const [
    getPatientData,
    { loading: profileLoading, data: profileData, refetch },
  ] = useLazyQuery(GET_PROFILE_DATA, {
    onCompleted: (data) => {
      if (data!.getProfileById) {
        setFormFields(data.getProfileById);
      }
    },
  });

  const [updatePatient] = useMutation(UPDATE_PROFILE_DATA);

  //USE EFFECT
  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    setLoader(true);
    getPatientData({ variables: { groupName: userType } });
    setLoader(false);
  }, [userType]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!profileLoading) {
      setLoader(false);
    }
  }, [profileData]);

  //Function and handler.

  const editFormHandler = (e, formFields: patientEditProfileFormFeild) => {
    e.preventDefault();
    setLoader(true);

    try {
      updatePatient({
        variables: {
          groupName: "patient",
          firstName: formFields.patient_firstname,
          dob: formFields?.birthdate,
          city: formFields?.city,
          addressLine2: formFields?.addressline2,
          addressLine1: formFields?.addressline1,
          homeNo: formFields?.home_no,
          kinAddressLine1: formFields?.kin_addressline1,
          kinAddressLine2: formFields?.kin_addressline2,
          kinCity: formFields?.kin_city,
          kinContactNo: formFields?.kin_contact_no,
          kinEmailAddress: formFields?.kin_email_address,
          kinName: formFields?.kin_name,
          kinPostal: formFields?.kin_postal,
          kinRelationship: formFields?.kin_relationship,
          lastName: formFields.patient_lastname,
          nhsNo: formFields?.nhsno,
          postalCode: formFields?.postal_code,
          religion: formFields?.religion,

          update: {
            patient_sexuality: formFields?.patient_sexuality,
            patient_lastname: formFields.patient_lastname,
            patient_marrital: formFields?.patient_marrital,
            patient_gender: formFields?.patient_gender,
            patient_firstname: formFields.patient_firstname,
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
          },
        },
        onCompleted: (data) => {
          console.log("data: ", data);
          if (data && data.updateProfileById) {
            enqueueSnackbar("Profile edit successfully", {
              variant: "success",
            });
            setEditable(false);
            router.reload();
          }
        },
        onError: (error) => {
          console.log("data error: ", error);
          enqueueSnackbar("Something is wrong", { variant: "error" });
        },
      });

      setLoader(false);
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const tabs = [
    {
      label: "Personal Info",
      value: "prsonal-info",
      component: (
        <ProfileForm
          onSubmit={editFormHandler}
          setLoader={setLoader}
          disabled={!editable}
          userType={userType}
          setEditable={setEditable}
        />
      ),
    },
    {
      label: "Agreement",
      value: "agreement",
      component: <Agreement />,
    },
  ];

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        {editable ? (
          <Box
            sx={{
              backgroundColor: "#2593A9",
              borderRadius: "10px 10px 0 0",
              paddingBottom: "13px",
            }}
          >
            <div
              style={{
                padding: "14px 0 0 60px",
              }}
            >
              <Typography sx={{ color: "white", fontWeight: "bold" }}>
                Edit Personal Info
              </Typography>
            </div>
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: "#6BA08E",
              borderRadius: "10px 10px 0 0",
              paddingBottom: "13px",
            }}
          >
            <div
              style={{
                padding: "14px 0 0 60px",
                display: "flex",
                placeItems: "center",
              }}
            >
              <div
                style={{
                  marginRight: "auto",
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  {formFields?.patient_firstname +
                    " " +
                    formFields?.patient_lastname}
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                  }}
                >
                  {dayjs(formFields?.birthdate).format("DD-MM-YYYY")}
                </Typography>
              </div>

              <div
                style={{
                  marginRight: "10px",
                }}
              >
                <IconButtonWrapper
                  style={{ marginLeft: "auto" }}
                  aria-label="create"
                  size="small"
                  onClick={() => {
                    setEditable(true);
                  }}
                  data-testid="edit-icon-button"
                >
                  <CreateIcon />
                </IconButtonWrapper>
              </div>
            </div>
          </Box>
        )}

        <div>
          <TabsGenerator
            editable={editable}
            tabsList={tabs}
            activeTabs="prsonal-info"
          />
        </div>
      </Layout>
    </>
  );
};
export default withAuthentication(PatientById, ["patient"]);

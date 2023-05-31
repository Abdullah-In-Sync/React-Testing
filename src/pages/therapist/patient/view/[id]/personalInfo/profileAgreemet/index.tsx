import { useLazyQuery } from "@apollo/client";
import {
  Box,
  FormControl,
  FormGroup,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { patientProfileFormFeild } from "../../../../../../../utility/types/resource_types";
import { env } from "../../../../../../../lib/env";
import { GET_PROFILE_DATA_FOR_THERAPIST } from "../../../../../../../graphql/query/patient";
import { GET_TOKEN_DATA } from "../../../../../../../graphql/query/common";
import Loader from "../../../../../../../components/common/Loader";
import CheckBoxLabelComponent from "../../../../../../../components/common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";

const defaultFormValue = {
  _id: "",
  patient_contract: 1,
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
  addressline1: "",
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
  phone_number: "",
  postal_code: "",
  patient_agree: 0,
  patient_education: "",
  patient_ethnic_group: "",
  patient_physical_health: "",
  patient_illness_ability: "",
};

const TherapistProfileAgreement = () => {
  const patientId = sessionStorage.getItem("patient_id");
  const [loader, setLoader] = useState<boolean>(false);
  const [formFields, setFormFields] =
    useState<patientProfileFormFeild>(defaultFormValue);
  const terms = env.corpWebsite.terms;
  const privacy = env.corpWebsite.privacy;
  const cookies = env.corpWebsite.cookies;

  const [
    getPatientProfileDataforTherapist,
    { loading: profileLoading, data: profileData },
  ] = useLazyQuery(GET_PROFILE_DATA_FOR_THERAPIST, {
    onCompleted: (data) => {
      /* istanbul ignore next */
      if (data!.getPatientDetailById) {
        setFormFields((oldValues) => {
          return {
            ...{
              ...oldValues,
              ...{
                patient_agree: data?.getPatientDetailById?.patient_consent,
              },
            },
            ...data.getPatientDetailById,
          };
        });
      }
    },
  });

  const [getTokenData, { loading: templateLoading, data: templateData }] =
    useLazyQuery(GET_TOKEN_DATA, {
      onCompleted: () => {
        /* istanbul ignore next */
        setLoader(false);
      },
    });

  useEffect(() => {
    setLoader(true);
    getPatientProfileDataforTherapist({ variables: { patient_id: patientId } });
    getTokenData();
    setLoader(false);
  }, [patientId]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!profileLoading && !templateLoading) {
      setLoader(false);
    }
  }, [profileData]);

  return (
    <>
      <Loader visible={loader} />
      <form
        data-testid="agreement-form"
        style={{
          paddingBottom: "30px",
          paddingTop: "10px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#6EC9DB",
            borderRadius: "10px 10px 0 0",
            paddingBottom: "13px",
          }}
        >
          <Box
            style={{
              padding: "14px 0 0 30px",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                textAlign: "left",
              }}
            >
              Agreement
            </Typography>
          </Box>
        </Box>
        <div
          style={{
            padding: "30px",
            border: "2px ",
            borderStyle: "solid",
            borderColor: "#6EC9DB",
            overflow: "visible",
            zIndex: 0,
          }}
        >
          <div>
            <td
              dangerouslySetInnerHTML={{
                /* istanbul ignore next */
                __html:
                  /* istanbul ignore next */
                  templateData?.getTokenData?.organization_settings?.contract,
              }}
            />
            <div>
              <div>
                <Grid container spacing={2} marginBottom={5}>
                  <Grid item xs={12}>
                    <Box display="flex">
                      <FormControl
                        sx={{
                          m: 1,
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        variant="standard"
                      >
                        <FormGroup aria-label="position">
                          <CheckBoxLabelComponent
                            value="1"
                            name="patient_agree"
                            required
                            label="I accept the Terms with this agreement."
                            inputProps={{
                              "data-testid": "patient_agree",
                            }}
                            checked={formFields.patient_agree}
                            disabled={
                              profileData?.getPatientDetailById
                                ?.patient_consent === 1
                                ? true
                                : false
                            }
                            size="small"
                          />
                          <CheckBoxLabelComponent
                            value="1"
                            name="patient_consent"
                            required
                            label={
                              <Grid>
                                <span>I accept the </span>
                                <Link
                                  data-testid="edit-upload-file"
                                  href={terms}
                                  underline="none"
                                  target="_blank"
                                >
                                  Terms of use
                                </Link>
                                <span> of this website </span>
                              </Grid>
                            }
                            placement="end"
                            inputProps={{
                              "data-testid": "patient_consent",
                            }}
                            checked={
                              /* istanbul ignore next */
                              formFields?.patient_consent
                            }
                            disabled={
                              profileData?.getPatientDetailById
                                ?.patient_consent === 1
                                ? true
                                : false
                            }
                            size="small"
                          />
                          <CheckBoxLabelComponent
                            value="1"
                            name="patient_contract"
                            disabled={
                              profileData?.getPatientDetailById
                                ?.patient_contract === 1
                                ? true
                                : false
                            }
                            required
                            label={
                              <Grid>
                                <span>I accept the </span>
                                <Link
                                  data-testid="edit-upload-file"
                                  href={privacy}
                                  underline="none"
                                  target="_blank"
                                >
                                  Privacy
                                </Link>
                                <span> and </span>
                                <Link
                                  data-testid="edit-upload-file"
                                  href={cookies}
                                  underline="none"
                                  target="_blank"
                                >
                                  Cookie Policy.
                                </Link>
                              </Grid>
                            }
                            placement="end"
                            inputProps={{
                              "data-testid": "patient_contract",
                            }}
                            checked={
                              /* istanbul ignore next */
                              formFields?.patient_contract
                            }
                            size="small"
                          />
                        </FormGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default TherapistProfileAgreement;

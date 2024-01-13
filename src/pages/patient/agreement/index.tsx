import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import CheckBoxLabelComponent from "../../../components/common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";
import Loader from "../../../components/common/Loader";
import { useAppContext } from "../../../contexts/AuthContext";
import { UPDATE_PROFILE_DATA } from "../../../graphql/mutation/patient";
import { GET_TOKEN_DATA } from "../../../graphql/query/common";
import { GET_PROFILE_DATA } from "../../../graphql/query/patient";
import { env } from "../../../lib/env";
import {
  patientEditProfileFormFeild,
  patientProfileFormFeild,
} from "../../../utility/types/resource_types";
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

const Agreement = ({ isPersonallInfoEnabled }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);
  const [formFields, setFormFields] =
    useState<patientProfileFormFeild>(defaultFormValue);
  const { user, setUser } = useAppContext();
  const { user_type: userType } = user;
  const terms = env.corpWebsite.terms;
  const privacy = env.corpWebsite.privacy;
  const cookies = env.corpWebsite.cookies;
  const [getPatientData, { loading: profileLoading, data: profileData }] =
    useLazyQuery(GET_PROFILE_DATA, {
      onCompleted: (data) => {
        /* istanbul ignore next */
        if (data!.getProfileById) {
          setFormFields((oldValues) => {
            return {
              ...{
                ...oldValues,
                ...{
                  patient_agree: data?.getProfileById?.data?.patient_consent,
                },
              },
              ...data.getProfileById?.data,
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
  const [updatePatient] = useMutation(UPDATE_PROFILE_DATA);
  const setCheckBox = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    setFormFields((oldValues) => {
      return {
        ...oldValues,
        [name]: Math.abs(oldValues[name] - 1),
      };
    });
  };
  const editFormHandler = (e, formFields: patientEditProfileFormFeild) => {
    e.preventDefault();
    setLoader(true);
    try {
      updatePatient({
        variables: {
          groupName: userType,
          firstName: "",
          dob: "",
          city: "",
          addressLine2: "",
          addressLine1: "",
          homeNo: "",
          kinAddressLine1: "",
          kinAddressLine2: "",
          kinCity: "",
          kinContactNo: "",
          kinEmailAddress: "",
          kinName: "",
          kinPostal: "",
          kinRelationship: "",
          lastName: "",
          nhsNo: "",
          postalCode: "",
          religion: "",
          update: {
            patient_consent: formFields?.patient_consent,
            patient_contract: formFields?.patient_contract,
          },
        },
        onCompleted: (data) => {
          console.log("data: ", data);
          /* istanbul ignore next */
          if (data && data.updateProfileById) {
            const { patient_consent, patient_contract } = formFields || {};
            enqueueSnackbar("Agreement successfull", {
              variant: "success",
            });
            /* istanbul ignore next */
            if (!isPersonallInfoEnabled) {
              const patient_data = {
                patient_consent,
                patient_contract,
              };
              setUser({ ...user, ...{ patient_data } });
              router.back();
            } else router.reload();
          }
        },
        onError: (error) => {
          console.log("data error: ", error);
        },
      });
      setLoader(false);
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
    }
  };

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getTokenData();
    setLoader(false);
  }, []);

  useEffect(() => {
    setLoader(true);
  }, []);

  useEffect(() => {
    setLoader(true);
    getPatientData({ variables: { groupName: userType } });
    setLoader(false);
  }, [userType]);

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
        onSubmit={(e) => editFormHandler(e, formFields)}
        data-testid="agreement-form"
        style={{
          paddingBottom: "30px",
        }}
      >
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
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Agreement
            </Typography>
          </div>
        </Box>
        <div
          style={{
            padding: "30px",
            border: "2px ",
            borderStyle: "solid",
            borderColor: "#6BA08E",
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
                            onChange={setCheckBox}
                            required
                            label="I accept the Terms with this agreement."
                            inputProps={{
                              "data-testid": "patient_agree",
                            }}
                            checked={formFields.patient_agree}
                            disabled={
                              profileData?.getProfileById?.data
                                ?.patient_consent === 1
                                ? true
                                : false
                            }
                            size="small"
                          />
                          <CheckBoxLabelComponent
                            value="1"
                            name="patient_consent"
                            onChange={setCheckBox}
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
                              profileData?.getProfileById?.data
                                ?.patient_consent === 1
                                ? true
                                : false
                            }
                            size="small"
                          />
                          <CheckBoxLabelComponent
                            value="1"
                            name="patient_contract"
                            onChange={setCheckBox}
                            disabled={
                              profileData?.getProfileById?.data
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
              {
                /* istanbul ignore next */
                profileData?.getProfileById?.data?.patient_consent ||
                profileData?.getProfileById?.data?.patient_contract === 1 ? (
                  ""
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      p: 1,
                      m: 1,
                      bgcolor: "background.paper",
                      borderRadius: 1,
                      // paddingTop: "50px",
                    }}
                  >
                    <Grid item xs={6} style={{ paddingRight: "50px" }}>
                      <Button
                        data-testid="agreementSubmitButton"
                        variant="contained"
                        type="submit"
                        style={{ paddingLeft: "50px", paddingRight: "50px" }}
                      >
                        Save
                      </Button>
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                      <Button
                        data-testid="editCancleAgreementButton"
                        variant="contained"
                        style={{
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          backgroundColor: "#6BA08E",
                        }}
                        onClick={() =>
                          /* istanbul ignore next */
                          router.reload()
                        }
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Box>
                )
              }
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default Agreement;

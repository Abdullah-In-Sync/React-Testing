import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";

import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import CheckBoxLabelComponent from "../../../components/common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";
import Loader from "../../../components/common/Loader";
import { UPDATE_PROFILE_DATA } from "../../../graphql/mutation/patient";
import { GET_PROFILE_DATA } from "../../../graphql/query/patient";
import { buildPatientTokenValidationQuery } from "../../../lib/helpers/auth";
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
};

export default function Agreement() {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);
  const [userType, setUserType] = useState<any>("patient");
  const [formFields, setFormFields] =
    useState<patientProfileFormFeild>(defaultFormValue);

  const [gettokenData, tokenLoading] = buildPatientTokenValidationQuery(
    (tokenData) => {
      setUserType(tokenData.user_type);
    }
  );

  const [getPatientData, { loading: profileLoading, data: profileData }] =
    useLazyQuery(GET_PROFILE_DATA, {
      onCompleted: (data) => {
        if (data!.getProfileById) {
          setFormFields(data.getProfileById);
        }
      },
    });

  const [updatePatient] = useMutation(UPDATE_PROFILE_DATA);

  const setCheckBox = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const name = e.target.name;
    setFormFields((oldValues) => ({
      ...oldValues,
      [name]: Math.abs(oldValues[name] - 1),
    }));
  };

  const editFormHandler = (e, formFields: patientEditProfileFormFeild) => {
    e.preventDefault();
    setLoader(true);

    if (!formFields?.patient_contract && !formFields?.patient_consent) {
      enqueueSnackbar("Please select the checkbox.", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }

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
          if (data && data.updateProfileById) {
            enqueueSnackbar("Agreement successfull", {
              variant: "success",
            });
          }
        },
        onError: (error) => {
          console.log("data error: ", error);
        },
      });

      setLoader(false);
    } catch (e) {
      setLoader(false);
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  useEffect(() => {
    setLoader(true);
    gettokenData({ variables: {} });
  }, []);

  useEffect(() => {
    setLoader(true);
    getPatientData({ variables: { groupName: userType } });
    setLoader(false);
  }, [userType]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!tokenLoading && !profileLoading) {
      setLoader(false);
    }
  }, [profileData]);

  return (
    <>
      <Loader visible={loader} />

      <form
        onSubmit={(e) => editFormHandler(e, formFields)}
        data-testid="agreement-form"
      >
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
              Agreement
            </Typography>
          </div>
        </Box>
        <div
          style={{
            padding: "30px",
            border: "2px ",
            borderStyle: "solid",
            borderColor: "#2593A9",
            overflow: "visible",
            zIndex: 0,
          }}
        >
          <div>
            <h3 style={{ color: "#6EC9DB" }}>SUMMARY OF THE AGREEMENT </h3>
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: "12px",
              }}
            >
              <p>
                This Agreement is a legally binding contract between You and the
                Therapist for Therapy. A summary of the main matters dealt
                within this agreement are listed below:
              </p>
            </div>
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: "12px",
              }}
            >
              <h5>&#x2022; What the Therapist will do for You;</h5>
              <h5>&#x2022; What is expected from You;</h5>
              <h5>&#x2022; Confidentiality and Data Protection;</h5>
              <h5>&#x2022; Ending this Agreement; and</h5>
              <h5>&#x2022; General terms (ie feedback and concern</h5>
            </div>
            <h3 style={{ color: "#6EC9DB" }}>
              IMPORTANT – PLEASE READ CAREFULLY
            </h3>
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: "12px",
              }}
            >
              <p>
                Therapy is a collaborative endeavour requiring both the
                Therapist and You to work together to achieve mutually agreed
                goals. To achieve these goals both the Therapist and You need to
                make a good-faith effort to engage in the Therapy process
                together. It is important that You talk with your Therapist if
                You have any concerns about the process, the direction of
                therapy or have any concerns about your well-being and safety.
              </p>
            </div>
            <h3 style={{ color: "#6EC9DB" }}>TERMS AND CONDITIONS</h3>
            <h4>1. DEFINITION</h4>
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: "12px",
              }}
            >
              <p>
                1.1 The following definitions shall apply in this agreement:
              </p>
              <p>
                <b>MyHelp:</b> MyHelp Limited company registered in the United
                Kingdom with registration number 12495501
              </p>
              <p>
                <b>BABCP:</b> British Association for Behavioural and Cognitive
                Psychotherapists
              </p>
              <p>
                <b>BACP:</b> British Association for Therapy and Psychotherapy
              </p>
              <p>
                <b>BPS:</b> British Psychological Society
              </p>
              <p>
                <b>Therapy Services:</b> the provision of Therapy services to
                meet your requirements by the Therapist to You.
              </p>
              <p>
                <b>Therapy Sessions:</b> the agreed number of Therapy sessions
                to be provided by the Therapist to You.
              </p>
              <p>
                <b>Fee:</b> the agreed charge for Therapy Services if
                applicable.
              </p>
              <p>
                <b>UKCP:</b> UK Council for Psychotherapy.
              </p>
            </div>

            <h4>2. What the Therapist will do </h4>
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: "12px",
              }}
            >
              <p>2.1 The Therapist will use reasonable endeavours to:</p>
              <p>a. Provide You with the Therapy Services;</p>
              <p>
                b. ensure that he or she is suitably qualified and is able to
                provide the Therapy Services in accordance within the procedures
                and regulations directed by BABCP, BACP, BPS, UKCP or such
                similar professional body from time to time;
              </p>
              <p>
                c. offer a quiet, appropriate and undisturbed space for the
                Therapy Services where the Therapy Sessions are delivered in
                person;
              </p>
              <p>
                d. ensure that he or she is available at the agreed times and
                location where meeting in person;
              </p>
              <p>e. provide the agreed number of Therapy Sessions;</p>
              <p>f. maintain safe professional boundaries;</p>
              <p>
                g. comply with necessary safeguarding policies and procedures
                and work within the ethical frameworks and Professional Codes of
                Conduct for the BABCP, BACP, BPS, UKCP and/or any other
                professional organisation to which the Therapist is associated
                with.
              </p>
            </div>
            <h4>3. What the Therapist expects from you</h4>
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: "12px",
              }}
            >
              <p>3.1 You shall:</p>
              <p>a. Provide You with the Therapy Services;</p>

              <p>
                a. pay to the Therapist the agreed Fee for the Therapy
                Services;;
              </p>

              <p>
                b. attend punctually all Therapy Sessions agreed with the
                Therapist;;
              </p>

              <p>
                c. give the Therapist a minimum of 24 hours’ notice when
                cancelling or rearranging a Therapy Session;;
              </p>

              <p>d. comply with any confidentiality provisions;;</p>

              <p>
                e. and be respectful to the Therapist and his/her property; and;
              </p>

              <p>
                f. use reasonable endeavour to complete the agreed number of
                Therapy Sessions.;
              </p>

              <p>
                3.2 Where You cancel a session without giving the notice
                required under clause 3.1(c) the Therapist reserves the right to
                charge the Fee in full for that session. Where You are late for
                any session the Therapist will provide the Therapy Session for
                the remainder of the time allocated for original your Therapy
                Session and You will be charged the Fee in full for that Therapy
                Session.
              </p>
            </div>

            <h4>4. Confidentiality and data protection</h4>
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: "12px",
              }}
            >
              <p>
                4.1 Subject to clause 4.2 and 4.4 each party undertakes that it
                shall not at any time disclose to any person any confidential
                information concerning the Therapy Services, this agreement, or
                any information relating to either party unless required to do
                so by law.
              </p>
              <p>
                4.2 You acknowledge and understand that the Therapist has a duty
                to disclose confidential information where the Therapist
                believes You may cause serious physical or emotional harm to
                yourself or others or have harm caused to You in order to comply
                with legal, professional, and ethical codes of practice.
                Wherever possible the Therapist will discuss the breaking of
                confidentiality with You prior to disclosing information to any
                other person.
              </p>
              <p>
                4.3 Where You disclose to the Therapist acts of terrorism,
                vulnerable adult or child protection issues or drug trafficking
                issues You acknowledge and understand that the Therapist has a
                duty to disclose this information to the relevant authorities
                without delay.
              </p>
              <p>
                4.4 The Therapist will make notes during and after each session
                to aid the therapeutic process. Notes will be included on the
                MyHelp platform and stored securely in accordance with data
                protection legislation in place from time to time.
              </p>
              <p>
                4.5 Where you consent the Therapist may take audio or video
                recordings of the Therapy Sessions. These will be uploaded to
                the MyHelp platform to assist with the Therapy Services and will
                be stored in accordance with data protection legislation in
                place from time to time. You will be consulted and will have the
                option to decline prior to any audio or video recording being
                made.
              </p>
              <p>
                4.6 Data protection legislation restricts the sharing of
                information gained in Therapy. You consent to the Therapist
                sharing information with MyHelp for monitoring and feedback
                purposes and the Therapist confirms that it has entered or will
                enter into a written agreement with MyHelp incorporating this
                term. The Therapist shall remain fully liable to You for all
                acts and omissions of MyHelp relating to information shared
                under this clause
              </p>
              <p>
                4.7 The Therapist shall comply with all applicable requirements
                of data protection legislation and associated codes of practice
                in force from time to time when processing personal data
                relating to You.
              </p>

              <h4>5. Supervision</h4>
              <p>
                5.1 The Therapist is required to carry out continuing
                professional development and engage in regular on-going clinical
                supervision. You consent to the Therapist sharing anonymised
                information with their supervisor. This is to help ensure that
                the Therapy Services You receive are ethical and professional.
              </p>
              <h4>
                6.Limitation of Liability: Your Attention is drawn to this
                clause
              </h4>
              <p>
                6.1 The Therapist shall maintain appropriate insurance for the
                duration of this agreement with a reputable insurer to insure
                any risks associated with the Therapist carrying out the Therapy
                Services.
              </p>
            </div>

            <h4>7. Ending this Agreement</h4>
            <div
              style={{
                fontFamily: "Montserrat",
                fontSize: "12px",
              }}
            >
              <p>
                7.1 You can end this agreement immediately at any time by giving
                notice in writing to the Therapist, however You are encouraged
                to discuss the ending of the Therapy Services with the Therapist
                within a session in order that an end date can be agreed.
              </p>
              <p>
                7.2 The Therapist may end this agreement with immediate effect
                and with no liability to provide further sessions if at any time
                You:
              </p>
              <p>a) commit any serious or repeated breach or</p>
              <p>
                b) non-observance of any of the provisions of this agreement;
              </p>
              <p>
                c) miss two or more consecutive sessions without contacting the
                Therapist to cancel or rearrange the sessions;
              </p>
              <p>
                d) cause the Therapist, in his reasonable opinion, to believe
                You to be under the influence of alcohol or non-prescribed
                substances or medication during any of the sessions;
              </p>
              <p>
                e) fail to pay for the sessions in accordance with the terms
                agreed;
              </p>
              <p>
                f) intentionally deceive or set out to manipulate the Therapy
                and thereby misusing the purpose of the relationship; or cause
                the Therapist to feel threatened or abused by You.
              </p>
              <p>
                7.3 Any provision of this agreement relating to confidentiality
                or data protection shall remain in full force and effect
                following the termination of this agreement.
              </p>
            </div>

            <h4>8. Feedback and Concerns</h4>
            <div style={{ fontFamily: "Montserrat" }}>
              <p>
                8.1 The Therapist will ask You for your feedback at the end of
                each session or will ask you to complete the feedback form on
                MyHelp and You are encouraged to communicate any issues you have
                with the process verbally with the Therapist in the first
                instance.
              </p>
              <p>
                8.2 The Therapist welcomes You to discuss any difficulties that
                may arise in relation to the provision of the Therapy Services
                and shall endeavour to work with You to
              </p>
            </div>
            <p style={{ fontFamily: "Montserrat", fontSize: "12px" }}>
              <b>
                To confirm accept of the terms relating to using the plateform,
                please select the below checkbox.
              </b>
            </p>
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
                            name="patient_consent"
                            onChange={setCheckBox}
                            label="I accept the Terms with this agreement."
                            // placement="end"
                            inputProps={{
                              "data-testid": "patient_consent",
                            }}
                            checked={formFields?.patient_consent}
                            size="small"
                          />
                          <CheckBoxLabelComponent
                            value="1"
                            name="patient_consent"
                            onChange={setCheckBox}
                            label="I accept the term of use of this website."
                            placement="end"
                            inputProps={{
                              "data-testid": "for_future",
                            }}
                            checked={formFields?.patient_consent}
                            size="small"
                          />
                          <CheckBoxLabelComponent
                            value="1"
                            name="patient_contract"
                            onChange={setCheckBox}
                            label="I accept the Privacy and Cookie Policy."
                            placement="end"
                            inputProps={{
                              "data-testid": "patient_contract",
                            }}
                            checked={formFields?.patient_contract}
                            size="small"
                          />
                        </FormGroup>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
              </div>
              {profileData?.getProfileById.patient_consent ||
              profileData?.getProfileById.patient_contract === 1 ? (
                ""
              ) : (
                <div style={{ paddingTop: "25px" }}>
                  <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={6} textAlign="center">
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
                        data-testid="editCancleSubmitButton"
                        variant="contained"
                        type="submit"
                        style={{
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          backgroundColor: "#6BA08E",
                        }}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Loader from "../../../../components/common/Loader";
import Typography from "@mui/material/Typography";

// GRAPHQL
import { useLazyQuery } from "@apollo/client";

// MUI COMPONENTS
import Layout from "../../../../components/layout";
import { IconButton, Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import Grid from "@mui/material/Grid";

import NextLink from "next/link";
import TextFieldComponent from "../../../../components/common/TextField/TextFieldComponent";
import SingleSelectComponent from "../../../../components/common/SelectBox/SingleSelect/SingleSelectComponent";
import { GET_PROFILE_DATA } from "../../../../graphql/query/patient";
import { buildPatientTokenValidationQuery } from "../../../../lib/helpers/auth";
import { patientProfileFormFeild } from "../../../../utility/types/resource_types";

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
};

//STYLE
const IconButtonWrapper = styled(IconButton)(
  () => `
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
`
);

const genderOptions = [
  { id: "Male", value: "Male" },
  { id: "Female", value: "Female" },
];

const sexualityOptions = [
  { id: "Asexual", value: "Asexual" },
  { id: "Bisexual", value: "Bisexual" },
  { id: "Hetrosexual", value: "Hetrosexual" },
  { id: "Homosexual", value: "Homosexual" },
];

const maritalStausOption = [
  { id: "Married", value: "Married" },
  { id: "Single", value: "Single" },
  { id: "Other", value: "Other" },
];

const relationshipStausOption = [
  { id: "Sibling", value: "Sibling" },
  { id: "Father", value: "Father" },
  { id: "Mother", value: "Mother" },
  { id: "Spous", value: "Spous" },
  { id: "Son", value: "Son" },
  { id: "Daughter", value: "Daughter" },
  { id: "Other Relative", value: "Other Relative" },
  { id: "Friend", value: "Friend" },
  { id: "Other", value: "Other" },
];

const employmentOption = [
  { id: "FullTime", value: "FullTime" },
  { id: "PartTime", value: "PartTime" },
  { id: "Student", value: "Student" },
];
const PatientById: NextPage = () => {
  //Hooks
  const [value, setValue] = useState(
    "this is being used until not getting API updated"
  );

  const [loader, setLoader] = useState<boolean>(false);
  const [formFields, setFormFields] =
    useState<patientProfileFormFeild>(defaultFormValue);
  const [userType, setUserType] = useState<any>();
  const [editable, setEditable] = useState<boolean>();

  const [gettokenData, tokenLoading] = buildPatientTokenValidationQuery(
    (tokenData) => {
      setUserType(tokenData.user_type);
    }
  );

  const set2 = () => {
    //set data
  };

  //Function and handler.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    //submit form
  };

  //Queries GraphQl

  const [getPatientData, { loading: profileLoading, data: profileData }] =
    useLazyQuery(GET_PROFILE_DATA, {
      onCompleted: (data) => {
        if (data!.getProfileById) {
          setFormFields(data.getProfileById);
        }
      },
    });
  console.log("Koca: profileData ", profileData);

  //USE EFFECT
  useEffect(() => {
    setLoader(true);
    gettokenData({ variables: {} });
  }, []);

  useEffect(() => {
    setLoader(true);
    getPatientData({ variables: { groupName: userType } });
  }, [userType]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!tokenLoading && !profileLoading) {
      setLoader(false);
    }
  }, [profileData]);

  return (
    <>
      <Layout>
        <Loader visible={loader} />

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
            <Typography sx={{ color: "white" }}>
              {formFields?.patient_firstname}
            </Typography>
            <Typography sx={{ color: "white" }}>01-01-1970</Typography>
          </div>
        </Box>

        <div>
          <div
            style={{
              borderTop: "2px solid #fff ",
              borderBottom: "2px solid #6BA08E",
              margin: "20px 14px 30px 18px",
              display: "flex",
            }}
          >
            <Button
              sx={{
                backgroundColor: "#6BA08E",
                borderRadius: "5px 5px 0 0 ",
              }}
              variant="contained"
            >
              Personal Info
            </Button>
            <Button
              sx={{
                backgroundColor: "#6BA08E",
                borderRadius: "5px 5px 0 0 ",
              }}
              variant="contained"
            >
              Agreement
            </Button>
            <IconButtonWrapper
              style={{ marginLeft: "auto" }}
              aria-label="create"
              size="small"
              onClick={() => {
                setEditable(!editable);
              }}
              data-testid="edit-icon-button"
            >
              <NextLink href={""}>
                <CreateIcon />
              </NextLink>
            </IconButtonWrapper>
          </div>
          <form onSubmit={handleSubmit} data-testid="patient-profile-form">
            <div>
              <div
                style={{
                  padding: "30px",
                  border: "2px ",
                  borderStyle: "solid",
                  borderColor: "#2593A9",
                  borderRadius: "5px ",
                  overflow: "visible",
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    marginTop: -45,
                    left: 50,
                    backgroundColor: "white",
                    zIndex: 1,
                    height: 20,
                    // width: 150,
                    color: "#2593A9",
                    fontWeight: "bold",
                  }}
                >
                  Personal Details
                </div>

                <Box
                  sx={{ flexGrow: 1, border: "1px solid #cecece" }}
                  p={5}
                  borderRadius="7px"
                >
                  <Grid container spacing={2} marginBottom={5}>
                    <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                      <TextFieldComponent
                        required={true}
                        name="patient_firstname"
                        id="patientFirstname"
                        label="First Name"
                        value={formFields?.patient_firstname}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "patient_firstname" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={!editable}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={true}
                        name="patient_lastname"
                        id="last_name"
                        label="Last Name"
                        value={formFields?.patient_lastname}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "patient_lastname" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={!editable}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={true}
                        name="date_of_birth"
                        id="date_of_birth"
                        label="Date of birth"
                        value={value}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "date_of_birth" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={!editable}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={4}>
                      <SingleSelectComponent
                        fullWidth={true}
                        required={true}
                        id="patientGenderSelect"
                        labelId="patientGender"
                        name="patient_gender"
                        value={formFields?.patient_gender}
                        label="Gender"
                        onChange={set2}
                        inputProps={{ "data-testid": "patient_gender" }}
                        options={genderOptions}
                        mappingKeys={["id", "value"]}
                        size="small"
                        className="form-control-bg"
                        disabled={!editable}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SingleSelectComponent
                        fullWidth={true}
                        required={true}
                        id="patientSexuality"
                        labelId="patientSexuality"
                        name="patient_sexuality"
                        value={formFields?.patient_sexuality}
                        label="Sexuality"
                        onChange={set2}
                        inputProps={{ "data-testid": "patient_sexuality" }}
                        options={sexualityOptions}
                        mappingKeys={["id", "value"]}
                        size="small"
                        className="form-control-bg"
                        disabled={!editable}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <SingleSelectComponent
                        fullWidth={true}
                        required={true}
                        id="patientMaritalStatus"
                        labelId="patientMaritalStatus"
                        name="patient_marrital"
                        value={formFields?.patient_marrital}
                        label="Marital Status"
                        onChange={set2}
                        inputProps={{ "data-testid": "patient_marrital" }}
                        options={maritalStausOption}
                        mappingKeys={["id", "value"]}
                        size="small"
                        className="form-control-bg"
                        disabled={!editable}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={true}
                        name="nhs_no"
                        id="nhs_no"
                        label="NHS No."
                        value={value}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "nhs_no" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={!editable}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={true}
                        name="patient_lang"
                        id="language"
                        label="Language"
                        value={formFields?.patient_lang}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "patient_lang" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={!editable}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={true}
                        name="region"
                        id="region"
                        label="Region"
                        value={value}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "region" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={!editable}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={4}>
                      <SingleSelectComponent
                        fullWidth={true}
                        required={true}
                        id="employment"
                        labelId="employment"
                        name="patient_employment"
                        value={formFields?.patient_employment}
                        label="Employment"
                        onChange={set2}
                        inputProps={{ "data-testid": "patient_employment" }}
                        options={employmentOption}
                        mappingKeys={["id", "value"]}
                        size="small"
                        className="form-control-bg"
                        disabled={!editable}
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                </Box>
              </div>
              <div style={{ paddingTop: "30px", paddingBottom: "30px" }}>
                <div
                  style={{
                    padding: "30px",
                    border: "2px ",
                    borderStyle: "solid",
                    borderColor: "#2593A9",
                    borderRadius: "5px ",
                    overflow: "visible",
                    zIndex: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      marginTop: -45,
                      left: 50,
                      backgroundColor: "white",
                      zIndex: 1,
                      height: 20,
                      // width: 150,
                      color: "#2593A9",
                      fontWeight: "bold",
                    }}
                  >
                    Address and Contact Details
                  </div>

                  <Box
                    sx={{ flexGrow: 1, border: "1px solid #cecece" }}
                    p={5}
                    borderRadius="7px"
                  >
                    <Grid container spacing={2} marginBottom={5}>
                      <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="contact_number"
                          id="contact_number"
                          label="Contact no"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "contact_number" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="email_address"
                          id="email_address"
                          label="Email Address"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "email_address" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="home_no"
                          id="home_no"
                          label="Home No./Name"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "home_no" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                      <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="address_line_1"
                          id="address_line_1"
                          label="Address Line 1"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "address_line_1" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="address_line_2"
                          id="address_line_2"
                          label="Address Line 2"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "address_line_2" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="city"
                          id="city"
                          label="City"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "city" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="postal_code"
                          id="postal_code"
                          label="Postal Code"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "postal_code" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}></Grid>
                      <Grid item xs={4}></Grid>
                    </Grid>
                  </Box>
                </div>
              </div>
              <div style={{ paddingBottom: "30px" }}>
                <div
                  style={{
                    padding: "30px",
                    border: "2px ",
                    borderStyle: "solid",
                    borderColor: "#2593A9",
                    borderRadius: "5px ",
                    overflow: "visible",
                    zIndex: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      marginTop: -45,
                      left: 50,
                      backgroundColor: "white",
                      zIndex: 1,
                      height: 20,
                      // width: 150,
                      color: "#2593A9",
                      fontWeight: "bold",
                    }}
                  >
                    GP Details
                  </div>

                  <Box
                    sx={{ flexGrow: 1, border: "1px solid #cecece" }}
                    p={5}
                    borderRadius="7px"
                  >
                    <Grid container spacing={2} marginBottom={5}>
                      <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="patient_gpname"
                          id="gp_name"
                          label="Gp Name"
                          value={formFields?.patient_gpname}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "patient_gpname" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="patient_gpsurgeryname"
                          id="surgery_name"
                          label="Surgery Name"
                          value={formFields?.patient_gpsurgeryname}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{
                            "data-testid": "patient_gpsurgeryname",
                          }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="patient_gpcontactno"
                          id="constact_number"
                          label="Contact Number"
                          value={formFields?.patient_gpcontactno}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "patient_gpcontactno" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                      <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="patient_gpemailaddress"
                          id="gp_email_address"
                          label="Email Address"
                          value={formFields?.patient_gpemailaddress}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{
                            "data-testid": "patient_gpemailaddress",
                          }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="patient_gpaddress"
                          id="gp_address_line_1"
                          label="Address Line 1"
                          value={formFields?.patient_gpaddress}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "patient_gpaddress" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="patient_gpaddressline2"
                          id="gp_address_line_2"
                          label="Address Line 2"
                          value={formFields?.patient_gpaddressline2}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{
                            "data-testid": "patient_gpaddressline2",
                          }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="patient_gpcity"
                          id="gp_city"
                          label="City"
                          value={formFields?.patient_gpcity}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "patient_gpcity" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="patient_gppostalcode"
                          id="gp_postal_code"
                          label="Postal Code"
                          value={formFields?.patient_gppostalcode}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "patient_gppostalcode" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>

                      <Grid item xs={4}></Grid>
                    </Grid>
                  </Box>
                </div>
              </div>

              <div style={{ paddingBottom: "30px" }}>
                <div
                  style={{
                    padding: "30px",
                    border: "2px ",
                    borderStyle: "solid",
                    borderColor: "#2593A9",
                    borderRadius: "5px ",
                    overflow: "visible",
                    zIndex: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      marginTop: -45,
                      left: 50,
                      backgroundColor: "white",
                      zIndex: 1,
                      height: 20,
                      // width: 150,
                      color: "#2593A9",
                      fontWeight: "bold",
                    }}
                  >
                    Next of kin details
                  </div>

                  <Box
                    sx={{ flexGrow: 1, border: "1px solid #cecece" }}
                    p={5}
                    borderRadius="7px"
                  >
                    <Grid container spacing={2} marginBottom={5}>
                      <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="next_name"
                          id="next_name"
                          label="Name"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "next_name" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <SingleSelectComponent
                          fullWidth={true}
                          required={true}
                          id="relationship"
                          labelId="relationship"
                          name="relationship"
                          value={value}
                          label="Relationship"
                          onChange={set2}
                          inputProps={{ "data-testid": "relationship" }}
                          options={relationshipStausOption}
                          mappingKeys={["id", "value"]}
                          size="small"
                          className="form-control-bg"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="next_contact_no"
                          id="next_contact_no"
                          label="Contact No"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "next_contact_no" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                      <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="next_email_address"
                          id="next_email_address"
                          label="Email Address"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "next_email_address" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="next_address_line_1"
                          id="next_address_line_1"
                          label="Address Line 1"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "next_address_line_1" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="next_address_line_2"
                          id="next_address_line_2"
                          label="Address Line 2"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "next_address_line_2" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="next_city"
                          id="next_city"
                          label="City"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "next_city" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TextFieldComponent
                          required={true}
                          name="next_postal_code"
                          id="next_postal_code"
                          label="Postal Code"
                          value={value}
                          onChange={handleChange}
                          fullWidth={true}
                          inputProps={{ "data-testid": "next_postal_code" }}
                          variant="outlined"
                          className="form-control-bg"
                          size="small"
                          disabled={!editable}
                        />
                      </Grid>
                      <Grid item xs={4}></Grid>
                    </Grid>
                  </Box>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default PatientById;

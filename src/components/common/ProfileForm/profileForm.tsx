import React, { useEffect, useState } from "react";

import { Box, Button, Grid, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useLazyQuery } from "@apollo/client";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";

import { patientProfileFormFeild } from "../../../utility/types/resource_types";
import { GET_PROFILE_DATA } from "../../../graphql/query/patient";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
};

type propTypes = {
  onSubmit?: any;
  setLoader?: any;
  disabled?: any;
  userType?: any;
  setEditable: any;
};
//STYLE

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
  { id: "father", value: "father" },
  { id: "mother", value: "mother" },
  { id: "spous", value: "spous" },
  { id: "son", value: "son" },
  { id: "daughter", value: "daughter" },
  { id: "other Relative", value: "other Relative" },
  { id: "friend", value: "friend" },
  { id: "other", value: "other" },
];

const employmentOption = [
  { id: "FullTime", value: "FullTime" },
  { id: "PartTime", value: "PartTime" },
  { id: "Student", value: "Student" },
];

export default function ProfileForm(props: propTypes) {
  const [formFields, setFormFields] =
    useState<patientProfileFormFeild>(defaultFormValue);

  const changeDate = (date: string) => {
    setFormFields((prev) => ({
      ...prev,
      birthdate: dayjs(date).format("MM-DD-YYYY"),
    }));
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

  useEffect(() => {
    props.setLoader(true);
    getPatientData({ variables: { groupName: props.userType } });
    props.setLoader(false);
  }, [props.userType]);

  useEffect(() => {
    /* istanbul ignore else */
    if (!profileLoading) {
      props.setLoader(false);
    }
  }, [profileData]);

  //Function and handler.

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  return (
    <>
      <form
        onSubmit={(e) => props.onSubmit(e, formFields)}
        data-testid="patient-profile-form"
      >
        <div>
          <div style={{ paddingTop: "20px" }}>
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
                      disabled={props.disabled}
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
                      disabled={props.disabled}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Stack spacing={1}>
                        <DatePicker
                          InputProps={{
                            sx: {
                              height: "40px",
                            },
                          }}
                          disableFuture
                          inputFormat="DD-MM-YYYY"
                          disabled={props.disabled}
                          label="Date of Birth"
                          openTo="year"
                          views={["year", "month", "day"]}
                          value={formFields?.birthdate}
                          onChange={changeDate}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>
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
                      onChange={handleChange}
                      inputProps={{ "data-testid": "patient_gender" }}
                      options={genderOptions}
                      mappingKeys={["id", "value"]}
                      size="small"
                      className="form-control-bg"
                      disabled={props.disabled}
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
                      onChange={handleChange}
                      inputProps={{ "data-testid": "patient_sexuality" }}
                      options={sexualityOptions}
                      mappingKeys={["id", "value"]}
                      size="small"
                      className="form-control-bg"
                      disabled={props.disabled}
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
                      onChange={handleChange}
                      inputProps={{ "data-testid": "patient_marrital" }}
                      options={maritalStausOption}
                      mappingKeys={["id", "value"]}
                      size="small"
                      className="form-control-bg"
                      disabled={props.disabled}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginBottom={5}>
                  <Grid item xs={4}>
                    <TextFieldComponent
                      required={true}
                      name="nhsno"
                      id="nhs_no"
                      label="NHS No."
                      value={formFields?.nhsno}
                      onChange={handleChange}
                      fullWidth={true}
                      inputProps={{ "data-testid": "nhs_no" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      disabled={props.disabled}
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
                      disabled={props.disabled}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextFieldComponent
                      required={true}
                      name="religion"
                      id="region"
                      label="Religion"
                      value={formFields?.religion}
                      onChange={handleChange}
                      fullWidth={true}
                      inputProps={{ "data-testid": "region" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                      disabled={props.disabled}
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
                      onChange={handleChange}
                      inputProps={{ "data-testid": "patient_employment" }}
                      options={employmentOption}
                      mappingKeys={["id", "value"]}
                      size="small"
                      className="form-control-bg"
                      disabled={props.disabled}
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
                        required={false}
                        name="can not chanege"
                        id="contact_number"
                        label="Contact no"
                        value={formFields?.phone_number}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "contact_number" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="can not chanege"
                        id="email_address"
                        label="Email Address"
                        value={formFields?.email}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "email_address" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="home_no"
                        id="home_no"
                        label="Home No./Name"
                        value={formFields?.home_no}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "home_no" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginBottom={5}>
                    <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="addressline1"
                        id="addressline1"
                        label="Address Line 1"
                        value={formFields?.addressline1}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "address_line_1" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="addressline2"
                        id="address_line_2"
                        label="Address Line 2"
                        value={formFields?.addressline2}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "address_line_2" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="city"
                        id="city"
                        label="City"
                        value={formFields?.city}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "city" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="postal_code"
                        id="postal_code"
                        label="Postal Code"
                        value={formFields?.postal_code}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "postal_code" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
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
                        required={false}
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
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
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
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="patient_gpcontactno"
                        id="constact_number"
                        label="Contact Number"
                        value={formFields?.patient_gpcontactno}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{
                          "data-testid": "patient_gpcontactno",
                        }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginBottom={5}>
                    <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                      <TextFieldComponent
                        required={false}
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
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
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
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
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
                        disabled={props.disabled}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
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
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="patient_gppostalcode"
                        id="gp_postal_code"
                        label="Postal Code"
                        value={formFields?.patient_gppostalcode}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{
                          "data-testid": "patient_gppostalcode",
                        }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
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
                  Next of Kin Details
                </div>

                <Box
                  sx={{ flexGrow: 1, border: "1px solid #cecece" }}
                  p={5}
                  borderRadius="7px"
                >
                  <Grid container spacing={2} marginBottom={5}>
                    <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="kin_name"
                        id="kin_name"
                        label="Name"
                        value={formFields?.kin_name}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "next_name" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <SingleSelectComponent
                        fullWidth={true}
                        required={false}
                        id="kin_relationship"
                        labelId="relationship"
                        name="kin_relationship"
                        value={formFields?.kin_relationship}
                        label="Relationship"
                        onChange={handleChange}
                        inputProps={{ "data-testid": "kin_relationship" }}
                        options={relationshipStausOption}
                        mappingKeys={["id", "value"]}
                        size="small"
                        className="form-control-bg"
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="kin_contact_no"
                        id="next_contact_no"
                        label="Contact No"
                        value={formFields?.kin_contact_no}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "next_contact_no" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginBottom={5}>
                    <Grid style={{ alignSelf: "stretch" }} item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="kin_email_address"
                        id="kinEmaiLaddress"
                        label="Email Address"
                        value={formFields?.kin_email_address}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "next_email_address" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="kin_addressline1"
                        id="next_address_line_1"
                        label="Address Line 1"
                        value={formFields?.kin_addressline1}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{
                          "data-testid": "next_address_line_1",
                        }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="kin_addressline2"
                        id="next_address_line_2"
                        label="Address Line 2"
                        value={formFields?.kin_addressline2}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{
                          "data-testid": "next_address_line_2",
                        }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} marginBottom={5}>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="kin_city"
                        id="next_city"
                        label="City"
                        value={formFields?.kin_city}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "next_city" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextFieldComponent
                        required={false}
                        name="kin_postal"
                        id="next_postal_code"
                        label="Postal Code"
                        value={formFields?.kin_postal}
                        onChange={handleChange}
                        fullWidth={true}
                        inputProps={{ "data-testid": "next_postal_code" }}
                        variant="outlined"
                        className="form-control-bg"
                        size="small"
                        disabled={props.disabled}
                      />
                    </Grid>
                    <Grid item xs={4}></Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            {!props.disabled ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  paddingBottom: "50px",
                }}
              >
                <Grid item xs={6} style={{ paddingRight: "50px" }}>
                  <Button
                    data-testid="editProfileSubmitButton"
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
                    onClick={() => {
                      // cancleFunction();
                      setFormFields(profileData?.getProfileById);
                      props.setEditable(false);
                    }}
                    style={{
                      paddingLeft: "40px",
                      paddingRight: "40px",
                      backgroundColor: "#6BA08E",
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Box>
            ) : (
              ""
            )}
          </div>
        </div>
      </form>
    </>
  );
}

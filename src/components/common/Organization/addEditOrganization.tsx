import React, { FormEvent, useEffect, useState } from "react";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
//To ignore text encoder issue.
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_UPLOAD_LOGO_URL } from "../../../graphql/query/resource";
import { useSnackbar } from "notistack";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import UploadButtonComponent from "../../common/UploadButton/UploadButtonComponent";
import { getUpdatedFileName, uploadToS3 } from "../../../lib/helpers/s3";
import { addAndEditOrganizationFormFields } from "../../../utility/types/resource_types";
import SureModal from "../../admin/resource/SureModal";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import SingleSelectComponent from "../SelectBox/SingleSelect/SingleSelectComponent";
import {
  GET_DISORDER_LIST_BY_THERAPY_ID,
  GET_MODLE_DISORDER_LIST_BY_DISORDER_ID,
  GET_THERAPIST_LIST_BY_ORG_ID,
} from "../../../graphql/mutation/admin";

const Editor: any = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
const defaultFormValue = {
  _id: "",
  contract: "",
  created_date: "",
  logo: "invalid.jpg",
  logo_url: "",
  name: "",
  panel_color: "",
  patient: "",
  patient_plural: "",
  patient_welcome_email: "",
  side_menu_color: "",
  therapist: "",
  therapy: "",
  file_name: "",
  model_id: "",
  therapy_id: "",
  disorder_id: "",
};

/* istanbul ignore next */
type propTypes = {
  onSubmit?: any;
  setLoader: any;
  orgData?: any;
};

export default function AddEditOrganization(props: propTypes) {
  const { enqueueSnackbar } = useSnackbar();
  const [formFields, setFormFields] =
    useState<addAndEditOrganizationFormFields>(defaultFormValue);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [selectedTherapistId, setSelectedTherapistId] = useState("");
  const [selectedDisorerId, setSelectedDisorderId] = useState("");

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  //Contract
  const [editorStateContract, setEditorStateContract] = useState(() =>
    EditorState.createEmpty()
  );
  //patient Welcome Email
  const [editorStateEmail, setEditorStateEmail] = useState(() =>
    EditorState.createEmpty()
  );

  const { data: uploadOrgURL } = useQuery(GET_UPLOAD_LOGO_URL, {
    variables: {
      fileName: formFields && formFields.file_name,
      imageFolder: "images",
    },
  });

  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  const fileOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    /* istanbul ignore next */
    const fileObj = event.target.files && event.target.files[0];
    const { fileName } = getUpdatedFileName(event.target.files[0]);
    props.setLoader(true);
    /* istanbul ignore next */
    if (!fileName) {
      return;
    }
    /* istanbul ignore next */
    setSelectedFile(fileObj);
    setFormFields((oldValues) => ({ ...oldValues, ["file_name"]: fileName }));
    props.setLoader(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next */
    e.preventDefault();
    /* istanbul ignore next */
    if (
      formFields?.contract === "<p></p>" ||
      formFields?.patient_welcome_email === "<p></p>"
    ) {
      enqueueSnackbar("Please fill the require fields.", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    setModalOpen(true);
    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  const uploadFile = async () => {
    try {
      props.setLoader(true);
      if (!uploadOrgURL?.getFileUploadUrl?.upload_file_url) {
        props.onSubmit(formFields);
      } else {
        if (
          !(await uploadToS3(
            selectedFile,
            uploadOrgURL.getFileUploadUrl.upload_file_url
          ))
        ) {
          throw new Error("There is an error with file upload!");
        }
        props.onSubmit(formFields);
      }
    } catch (e) {
      enqueueSnackbar(e.message, {
        variant: "error",
        autoHideDuration: 2000,
      });
    } finally {
      props.setLoader(false);
    }
  };

  //Editor data set
  useEffect(() => {
    const updatedContract = convertToHTML(
      editorStateContract.getCurrentContent()
    );
    const updatedWelcomeEmail = convertToHTML(
      editorStateEmail.getCurrentContent()
    );

    const formData = { ...formFields };
    formData.contract = updatedContract;
    formData.patient_welcome_email = updatedWelcomeEmail;

    setFormFields(formData);
  }, [editorStateContract, editorStateEmail]);

  useEffect(() => {
    const data = props.orgData?.viewOrganizationById;

    setEditorStateContract(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(
            data
              ? data.contract
              : "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet similique cum totam culpa placeat explicabo ratione unde quas itaque, perferendis. Eos, voluptatum in repellat dolore. Vero numquam odio, enim reiciendis.</p>"
          )
        )
      )
    );

    setEditorStateEmail(
      EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(
            data
              ? data.patient_welcome_email
              : "<p>Welcome to MyHelp</p><p>Your details have been given by [THERAPIST_NAME] to provide you access with the MyHelp platform. The platform will support your therapy allowing you to share information between yourself and your therapist. We have created the MyHelp platform to support both therapist&#x27;s and patients in their pursuit of a smoother therapy process.</p><p></p><p>MyHelp empowers therapist&#x27;s throughout the entire process and delivers personalised care with the aim to improve patient outcomes. Simultaneously, patients can access their own platform to access key information to support their progress and communicate more efficiently with their therapist. We believe the MyHelp platform will enhance the therapeutic relationship in order to deliver better results. In order to access your private area of the MyHelp platform you will need to:</p><p>Visit the website: https://portal.dev-myhelp.co.uk/</p><p>Enter the access details: Username – your email address, Password – Happ1ness</p><p>We recommend that you change your password by clicking the icon in the right hand corner to something personal and more memorable.</p><p>Now you have access to your personal therapy guide, which will be developed with the support of your therapist over the period of your therapy This will allow you to access the information and resources now and in the future.</p><p>If you have any other questions then please email info@myhelp.co.uk and we will endeavor to get back to you within 24 hours.</p><p>Thank you,</p><p>MyHelp Team.</p><p>P.S. Need help getting started? Please have a look at our help documentation or just reply to this email with any questions or issues you may have. The MyHelp support team is available to help with the platform only. Unfortunately, we do not provide mental health services and cannot support you in this respect. Please contact your therapist in such cases.</p>"
          )
        )
      )
    );
  }, [props.orgData]);

  useEffect(() => {
    const data = props.orgData?.viewOrganizationById;
    /* istanbul ignore next */
    if (data) {
      setFormFields(data);
    }
  }, [props.orgData]);

  const handleChangeTherapy = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setSelectedTherapistId(value);

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  const handleChangeDisoder = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setSelectedDisorderId(value);

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  const handleChangeModel = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  const [getTherapistList, { data: therapistDropdownData }] = useLazyQuery(
    GET_THERAPIST_LIST_BY_ORG_ID,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  const [getDisordorList, { data: disorderDropdownData }] = useLazyQuery(
    GET_DISORDER_LIST_BY_THERAPY_ID,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  const [getModelList, { data: modelDropdownData }] = useLazyQuery(
    GET_MODLE_DISORDER_LIST_BY_DISORDER_ID,
    {
      onCompleted: () => {
        /* istanbul ignore next */
        props.setLoader(false);
      },
    }
  );

  useEffect(() => {
    getTherapistList();

    if (selectedTherapistId.length) {
      getDisordorList({
        variables: { therapyId: selectedTherapistId },
      });
    }

    if (selectedDisorerId.length) {
      getModelList({
        variables: { disorderId: selectedDisorerId },
      });
    }
  }, [selectedDisorerId, selectedTherapistId]);

  useEffect(() => {
    if (props?.orgData) {
      getTherapistList();

      getDisordorList({
        variables: {
          therapyId: props.orgData?.viewOrganizationById.therapy_id,
        },
      });

      getModelList({
        variables: {
          disorderId: props.orgData?.viewOrganizationById.disorder_id,
        },
      });
    }
  }, [props.orgData]);
  return (
    <>
      <Box
        sx={{ flexGrow: 1, border: "1px solid #cecece" }}
        p={5}
        borderRadius="7px"
      >
        <>
          <form onSubmit={handleSubmit} data-testid="organization-add-form">
            <Grid container spacing={2} marginBottom={5}>
              <Grid item xs={4}>
                <TextFieldComponent
                  required={true}
                  name="name"
                  id="name"
                  label="Name"
                  value={formFields?.name}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "name" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextFieldComponent
                  required={true}
                  name="panel_color"
                  id="panel_color"
                  label="Panel Color"
                  value={formFields?.panel_color}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "panel_color" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Grid>

              <Grid item xs={4}>
                <TextFieldComponent
                  required={true}
                  name="side_menu_color"
                  id="side_menu_color"
                  label="Side Menu Color"
                  value={formFields?.side_menu_color}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "side_menu_color" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={5}>
              <Grid item xs={4}>
                <TextFieldComponent
                  required={true}
                  name="patient"
                  id="patient"
                  label="Patient (Text)"
                  value={formFields?.patient}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "patient" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextFieldComponent
                  required={true}
                  name="therapist"
                  id="therapist"
                  label="Therapist (Text)"
                  value={formFields?.therapist}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "therapist" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextFieldComponent
                  required={true}
                  name="patient_plural"
                  id="patient_plural"
                  label="Patient Plural (Text)"
                  value={formFields?.patient_plural}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "patient_plural" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
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
                  name="therapy_id"
                  value={formFields?.therapy_id}
                  label="Select Therapy"
                  onChange={handleChangeTherapy}
                  inputProps={{ "data-testid": "therapy_id" }}
                  options={
                    (therapistDropdownData &&
                      therapistDropdownData?.getTherapyListByOrgId) ||
                    []
                  }
                  mappingKeys={["_id", "therapy_name"]}
                  size="small"
                  className="form-control-bg"
                  disabled={props.orgData}
                />
              </Grid>
              <Grid item xs={4}>
                <SingleSelectComponent
                  fullWidth={true}
                  required={true}
                  id="patientSexuality"
                  labelId="patientSexuality"
                  name="disorder_id"
                  value={formFields?.disorder_id}
                  label="
                  Select Disorder"
                  onChange={handleChangeDisoder}
                  inputProps={{ "data-testid": "disorder_id" }}
                  options={
                    (disorderDropdownData &&
                      disorderDropdownData?.getDisorderByTherapyId) ||
                    []
                  }
                  // options={[]}
                  mappingKeys={["_id", "disorder_name"]}
                  size="small"
                  className="form-control-bg"
                  disabled={props.orgData}
                />
              </Grid>

              <Grid item xs={4}>
                <SingleSelectComponent
                  fullWidth={true}
                  required={true}
                  id="patientMaritalStatus"
                  labelId="patientMaritalStatus"
                  name="model_id"
                  value={formFields?.model_id}
                  label="Select Model"
                  onChange={handleChangeModel}
                  inputProps={{ "data-testid": "model_id" }}
                  options={
                    (modelDropdownData &&
                      modelDropdownData?.getModelDisorderList) ||
                    []
                  }
                  // options={[]}
                  // mappingKeys={["id", "value"]}
                  mappingKeys={["_id", "model_name"]}
                  size="small"
                  className="form-control-bg"
                  disabled={props.orgData}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} marginBottom={5}>
              <Grid item xs={4}>
                <TextFieldComponent
                  required={true}
                  name="therapy"
                  id="therapy"
                  label="Therapy (Text)"
                  value={formFields?.therapy}
                  onChange={set2}
                  fullWidth={true}
                  inputProps={{ "data-testid": "therapy" }}
                  variant="outlined"
                  className="form-control-bg"
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <Box display="flex" alignItems="center">
                  <UploadButtonComponent
                    variant="contained"
                    name="RESOURCE_FILENAME"
                    inputProps={{ "data-testid": "resource_file_upload" }}
                    onChange={fileOnChange}
                    fileName={selectedFile?.name}
                    buttonText={"Logo"}
                  />
                </Box>
                <Box data-testid="edit-upload-file">
                  <Link
                    href={props.orgData?.viewOrganizationById.logo_url}
                    underline="none"
                    target="_blank"
                  >
                    {props.orgData?.viewOrganizationById.logo}
                  </Link>
                </Box>
              </Grid>
              <Grid item xs={4}></Grid>
            </Grid>

            <Box
              className="App"
              sx={{
                display: "flex",
                justifyContent: "center",
                borderRadius: " 25px",
                border: "2px solid #6BA08E",
                padding: "20px",
              }}
            >
              <Box
                style={{
                  paddingRight: "15px",
                  width: "50%",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>Contract:</Typography>
                <Editor
                  editorState={editorStateContract}
                  onEditorStateChange={setEditorStateContract}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
              </Box>
              <Box
                style={{
                  paddingLeft: "15px",
                  width: "50%",
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>
                  Patient Welcome Email:
                </Typography>
                <Editor
                  editorState={editorStateEmail}
                  onEditorStateChange={setEditorStateEmail}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                />
              </Box>
            </Box>

            <SureModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setConfirmSubmission={setConfirmSubmission}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: "27px",
                }}
              >
                {props.orgData
                  ? "Are you sure want to Update This Organisation?"
                  : "Are you sure want to add organisation?"}
              </Typography>
              <Box marginTop="20px" display="flex" justifyContent="end">
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  data-testid="addOrganizationCancleButton"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  sx={{ marginLeft: "5px" }}
                  size="small"
                  data-testid="addOrganizationConfirmButton"
                  onClick={() => {
                    setModalOpen(false);
                    uploadFile();
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </SureModal>

            <Grid container spacing={5} marginBottom={5}>
              <Grid
                item
                xs={12}
                textAlign="center"
                style={{ paddingTop: "70px" }}
              >
                <Button
                  data-testid="addOrganizationSubmitButton"
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      </Box>
    </>
  );
}

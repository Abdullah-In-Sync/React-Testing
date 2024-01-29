import React, { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
} from "@mui/material";

import { useLazyQuery, useQuery } from "@apollo/client";

import {
  GET_FORMULATION_BY_ID,
  GET_UPLOAD_LOGO_URL,
} from "../../../graphql/query/resource";
import { useSnackbar } from "notistack";
import TextFieldComponent from "../../common/TextField/TextFieldComponent";
import SingleSelectComponent from "../../common/SelectBox/SingleSelect/SingleSelectComponent";
import UploadButtonComponent from "../../common/UploadButton/UploadButtonComponent";
import { getUpdatedFileName, uploadToS3 } from "../../../lib/helpers/s3";
import { editFormulationFormField } from "../../../utility/types/resource_types";
import Link from "@mui/material/Link";
import Loader from "../Loader";
import { useAppContext } from "../../../contexts/AuthContext";
import { GET_ORG_DATA } from "../../../graphql/query";
import ConfirmationModal from "../ConfirmationModal";

const defaultFormValue = {
  _id: "",
  formulation_name: "",
  formulation_type: 2,
  formulation_status: 1,
  org_id: "",
  formulation_desc: "",
  formulation_instruction: "",
  formulation_url: null,
  formulation_avail_for: "",
  formulation_img: "",
  download_formulation_url: "",
  file_name: "invalid.pdf",
  uploadFile: null,
};

/* istanbul ignore next */
type propTypes = {
  resourceType: "edit" | "update";
  onSubmit?: any;
  setLoader: any;
};

export default function EditFormFormulation(props: propTypes) {
  /* istanbul ignore next */
  const {
    user: { user_type: userType, therapist_data: { org_id: orgId = "" } = {} },
  } = useAppContext();
  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query.id as string;
  const { enqueueSnackbar } = useSnackbar();

  const [formFields, setFormFields] = useState<editFormulationFormField>({
    ...defaultFormValue,
    org_id: orgId,
  });

  /* istanbul ignore next */
  const handleCheckboxChange = (event) => {
    const { checked } = event.target;
    const value = parseInt(event.target.value);

    setFormFields((prevFormFields) => {
      let updatedFormulationAvailFor = [];

      if (Array.isArray(prevFormFields.formulation_avail_for)) {
        if (checked) {
          updatedFormulationAvailFor = [
            ...prevFormFields.formulation_avail_for,
            value,
          ];
        } else {
          updatedFormulationAvailFor =
            prevFormFields.formulation_avail_for.filter((v) => v !== value);
        }
      } else {
        if (checked) {
          updatedFormulationAvailFor = [value];
        }
      }

      return {
        ...prevFormFields,
        formulation_avail_for: updatedFormulationAvailFor,
      };
    });
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const [getOrgData, { data: orgData }] = useLazyQuery(GET_ORG_DATA, {
    onCompleted: () => {
      /* istanbul ignore next */
      props.setLoader(false);
    },
  });

  const { data: uploadFormulationURL } = useQuery(GET_UPLOAD_LOGO_URL, {
    variables: {
      fileName: formFields.file_name,
      imageFolder: "formulation",
    },
  });

  //FOR PREFILLED INPUT
  const [getFormulationData, { data: resourceData, loading }] = useLazyQuery(
    GET_FORMULATION_BY_ID
  );

  useEffect(() => {
    props.setLoader(true);
    if (userType == "admin") {
      getOrgData();
    }
  }, []);

  useEffect(() => {
    /* istanbul ignore next */
    setLoader(true);
    getFormulationData({
      variables: { formulation_id: id },
      onCompleted: (data) => {
        setFormFields(data?.getFormulationById?.data);
        setLoader(false);
      },
    });
  }, []);

  /* istanbul ignore next */
  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  /* istanbul ignore next */
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

  /* istanbul ignore next */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formFields.formulation_avail_for.length) {
      enqueueSnackbar("Please select availability of resource", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return;
    }
    setIsConfirm(true);

    if (!isConfirm) return;
  };

  /* istanbul ignore next */
  const uploadFileFormulation = async () => {
    try {
      props.setLoader(true);
      if (!uploadFormulationURL?.getFileUploadUrl?.upload_file_url) {
        props.onSubmit(formFields);
      } else {
        if (
          !(await uploadToS3(
            selectedFile,
            uploadFormulationURL?.getFileUploadUrl?.upload_file_url
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

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirm(false);
  };

  return (
    <>
      <Loader visible={loader} />

      <Box
        sx={{ flexGrow: 1, border: "1px solid #cecece" }}
        p={5}
        borderRadius="7px"
      >
        <>
          {
            /* istanbul ignore next */
            !loading && (
              <form onSubmit={handleSubmit} data-testid="formulation-edit-form">
                <Grid container spacing={2} marginBottom={5}>
                  <Grid item xs={4}>
                    <TextFieldComponent
                      required={true}
                      name="formulation_name"
                      id="formulation_name"
                      label="Name"
                      value={formFields?.formulation_name}
                      onChange={set2}
                      fullWidth={true}
                      inputProps={{ "data-testid": "formulation_name" }}
                      variant="outlined"
                      className="form-control-bg"
                      size="small"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <SingleSelectComponent
                      fullWidth={true}
                      required={true}
                      id="resourceOrgSelect"
                      labelId="resourceOrg"
                      name="org_id"
                      value={formFields?.org_id}
                      label="Select Organization"
                      onChange={set2}
                      inputProps={{ "data-testid": "org_id" }}
                      options={(orgData && orgData?.getOrganizationData) || []}
                      mappingKeys={["_id", "name"]}
                      size="small"
                      className="form-control-bg"
                      disabled={true}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginBottom={5}>
                  <Grid item xs={12}>
                    <TextFieldComponent
                      name="formulation_desc"
                      id="descrption"
                      label="Description"
                      value={
                        /* istanbul ignore next */
                        formFields?.formulation_desc
                      }
                      multiline
                      rows={4}
                      onChange={set2}
                      inputProps={{ "data-testid": "formulation_desc" }}
                      fullWidth={true}
                      className="form-control-bg"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginBottom={5}>
                  <Grid item xs={12}>
                    <TextFieldComponent
                      name="formulation_instruction"
                      id="instructions"
                      label="Instructions"
                      value={
                        /* istanbul ignore next */
                        formFields?.formulation_instruction
                      }
                      multiline
                      rows={4}
                      onChange={set2}
                      inputProps={{ "data-testid": "formulation_instruction" }}
                      fullWidth={true}
                      className="form-control-bg"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginBottom={5}>
                  <Grid item xs={7}>
                    Upload Resource :
                    <Link
                      data-testid="edit-upload-file"
                      href={
                        resourceData?.getFormulationById?.data
                          ?.download_formulation_url
                      }
                      underline="none"
                      target="_blank"
                    >
                      {resourceData?.getFormulationById?.data?.formulation_img}
                    </Link>
                  </Grid>

                  <Grid item xs={7}>
                    <Box display="flex" alignItems="center">
                      <UploadButtonComponent
                        variant="contained"
                        name="RESOURCE_FILENAME"
                        inputProps={{ "data-testid": "resource_file_upload" }}
                        onChange={fileOnChange}
                        fileName={selectedFile?.name}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginBottom={5}>
                  <Grid item xs={12}>
                    <Box>
                      <FormLabel required={true} sx={{ mr: 1 }}>
                        Select the Availability of Resource:
                      </FormLabel>
                      <FormControlLabel
                        control={
                          <Checkbox
                            // disabled={true}
                            checked={
                              /* istanbul ignore next */
                              formFields.formulation_avail_for?.includes(1) ||
                              false
                            }
                            name="allTherapists"
                            value={1}
                            onChange={handleCheckboxChange}
                          />
                        }
                        label="All Therapists"
                      />
                      <FormControlLabel
                        data-testid="resource_avail_onlyme"
                        control={
                          <Checkbox
                            // disabled={true}
                            checked={
                              /* istanbul ignore next */
                              formFields.formulation_avail_for?.includes(2) ||
                              false
                            }
                            name="onlyMe"
                            onChange={handleCheckboxChange}
                            value={2}
                          />
                        }
                        label="Only me"
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={2} marginBottom={5}>
                  <Grid item xs={12} textAlign="center">
                    <Button
                      data-testid="editFormulationSubmitButton"
                      variant="contained"
                      type="submit"
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )
          }
        </>
      </Box>
      {isConfirm && (
        <ConfirmationModal
          label="Are you sure you want to update this formulation?"
          onCancel={clearIsConfirmCancel}
          onConfirm={() => {
            /* istanbul ignore next */
            uploadFileFormulation();
          }}
        />
      )}
    </>
  );
}

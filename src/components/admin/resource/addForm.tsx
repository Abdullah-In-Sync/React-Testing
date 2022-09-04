import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_AGENDA_BY_DISORDER_AND_MODEL_DATA, GET_CATEGORY_BY_MODELID_DATA, GET_DISORDER_DATA, GET_MODEL_BY_DISORDERID_DATA } from '../../../graphql/query/common';
import { GET_UPLOAD_RESOURCE_URL } from '../../../graphql/query/resource';
import { useSnackbar } from 'notistack';
import { ADMIN_CREATE_RESOURCE } from '../../../graphql/mutation/resource';
import Loader from '../../common/Loader';
import TextFieldComponent from '../../common/TextField/TextFieldComponent';
import SingleSelectComponent from '../../common/SelectBox/SingleSelect/SingleSelectComponent';
import UploadButtonComponent from '../../common/UploadButton/UploadButtonComponent';
import { uploadToS3 } from '../../../lib/helpers/s3';
import CheckBoxLabelComponent from '../../common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent';

type resourceFormField = {
    resource_name: string;
    resource_type: string;
    disorder_id: string;
    model_id: string;
    category_id: string;
    resource_desc: string;
    resource_instruction: string;
    resource_references: string;
    agenda_id: string;
    resource_session_no: string;
    file_name: string;
    resource_avail_admin: string;
    resource_avail_therapist: string;
    resource_avail_onlyme: string;
    resource_avail_all: string;
}

const defaultFormValue = { resource_name: "", resource_type: "", disorder_id: "", model_id: "", category_id: "", resource_desc: "", resource_instruction: "", resource_references: "", resource_avail_admin: "", resource_avail_all: "", resource_avail_onlyme: "", resource_avail_therapist: "", agenda_id: "", resource_session_no: "", file_name: "" };

export default function addForm() {
    const { enqueueSnackbar } = useSnackbar();
    const [formFields, setFormFields] = useState<resourceFormField>(defaultFormValue);
    const [loader, setLoader] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const preSignedURL = useRef<string>(null);
    const resourceTypeOptions = [
        { 'id': "1", 'value': 'Info Sheets' },
        { 'id': "2", 'value': 'Work Sheets' },
        { 'id': "3", 'value': 'Audio File' },
        { 'id': "4", 'value': 'Video File' }
    ]

    const [
        getDisorderData,
        { loading: disorderLoading, data: disorderData },
    ] = useLazyQuery(GET_DISORDER_DATA);

    const [
        getModelByDisorderId,
        { loading: modelLoading, data: modelData },
    ] = useLazyQuery(GET_MODEL_BY_DISORDERID_DATA);

    const [
        getCategoryByModelId,
        { loading: categoryLoading, data: categoryData },
    ] = useLazyQuery(GET_CATEGORY_BY_MODELID_DATA);

    const [
        getAgendaByDisorderModelId,
        { loading: agendaLoading, data: agendaData },
    ] = useLazyQuery(GET_AGENDA_BY_DISORDER_AND_MODEL_DATA);

    const [
        getPreSignedURL,
        { loading: preSignedLoading, data: preSignedData },
    ] = useLazyQuery(GET_UPLOAD_RESOURCE_URL);

    const [createResource] = useMutation(ADMIN_CREATE_RESOURCE);

    useEffect(() => {
        setLoader(true);
        getDisorderData();
    }, []);

    useEffect(() => {
        if (formFields.disorder_id) {
            setLoader(true);
            setFormFields(oldValues => ({ ...oldValues, model_id: "", category_id: "", agenda_id: "" }));
            getModelByDisorderId({
                variables: { disorderId: formFields.disorder_id },
            });
        }
    }, [formFields.disorder_id]);

    useEffect(() => {
        if (formFields.model_id) {
            setLoader(true);
            setFormFields(oldValues => ({ ...oldValues, category_id: "", agenda_id: "" }));
            getCategoryByModelId({
                variables: { modelId: formFields.model_id },
            });

            getAgendaByDisorderModelId({
                variables: { disorderId: formFields.disorder_id, modelId: formFields.model_id },
            });
        }
    }, [formFields.model_id]);

    useEffect(() => {
        /* istanbul ignore else */
        if (
            !disorderLoading && !modelLoading && !categoryLoading && !agendaLoading && !preSignedLoading
        ) {
            setLoader(false);
        }
    }, [
        disorderData,
        modelData,
        categoryData,
        agendaData,
        preSignedData
    ]);

    // const set = (fieldName: string) => {
    //     return ({ target: { value } }) => {
    //         setFormFields(oldValues => ({ ...oldValues, [fieldName]: value }));
    //         if (fieldName == "agenda_id") {
    //             let index = agendaData.getAgendaByDisorderAndModel.findIndex(p => p._id == value);
    //             let session = agendaData.getAgendaByDisorderAndModel[index].session;
    //             setFormFields(oldValues => ({ ...oldValues, resource_session_no: session }));
    //         }
    //     }
    // };

    const set2 = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let fieldName = e.target.name;
        let value = e.target.value;
        if (value) {
            setFormFields(oldValues => ({ ...oldValues, [fieldName]: value }));
            if (fieldName == "agenda_id") {
                // debugger;
                let index = agendaData.getAgendaByDisorderAndModel.findIndex(p => p._id == value);
                let session = agendaData.getAgendaByDisorderAndModel[index].session;
                setFormFields(oldValues => ({ ...oldValues, resource_session_no: session }));
            }
        }
    };

    const handleFileChange = (fileObj: File, fileName: string, url: string) => {
        setSelectedFile(fileObj);
        formFields.file_name = fileName;
        preSignedURL.current = url;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (getPreSignedURL) {

                setLoader(true);
                const uploadStatus = await uploadToS3(selectedFile, preSignedURL.current);

                if (uploadStatus) {
                    createResource({
                        variables: {
                            disorderId: formFields.disorder_id,
                            modelId: formFields.model_id,
                            resourceAvailAdmin: formFields.resource_avail_admin,
                            resourceAvailAll: formFields.resource_avail_all,
                            resourceAvailOnlyme: formFields.resource_avail_onlyme,
                            resourceAvailTherapist: formFields.resource_avail_therapist,
                            resourceFilename: formFields.file_name,
                            resourceName: formFields.resource_name,
                            resourceType: formFields.resource_type,
                            agendaId: formFields.agenda_id,
                            categoryId: formFields.category_id,
                            orgId: "",
                            resourceDesc: formFields.resource_desc,
                            resourceInstruction: formFields.resource_instruction,
                            resourceIsformualation: "0",
                            resourceIssmartdraw: "0",
                            resourceReferences: formFields.resource_references,
                            resourceStatus: 1,
                            userType: "admin",
                            resource_session_no: formFields.resource_session_no
                        },
                        onCompleted: (data) => {
                            if (data && data.adminCreateResource && data.adminCreateResource._id) {
                                enqueueSnackbar("Resource added successfully", {
                                    variant: "success",
                                });
                            }
                        },
                    });
                } else {
                    enqueueSnackbar("There is an error with file upload!", { variant: "error" });
                }
                setLoader(false);
            } else {
                setLoader(false);
                enqueueSnackbar("Please select file!", { variant: "error" });
            }
        } catch (e) {
            setLoader(false);
            enqueueSnackbar("Please fill the all fields", { variant: "error" });
        }
    }

    return (
        <>
            <Loader visible={loader} />
            <form onSubmit={handleSubmit} data-testid="resource-add-form">
                <Box
                    sx={{ flexGrow: 1, border: "1px solid #cecece" }}
                    p={5}
                    borderRadius="7px"
                >
                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={4}>
                            <TextFieldComponent
                                required={true}
                                name="resource_name"
                                id="resource_name"
                                label="Name"
                                value={formFields?.resource_name}
                                onChange={set2}
                                fullWidth={true}
                                inputProps={{ "data-testid": "resource_name" }}
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <SingleSelectComponent
                                fullWidth={true}
                                required={true}
                                id="resourceTypeSelect"
                                labelId='resourceType'
                                name='resource_type'
                                value={formFields?.resource_type}
                                label='Resource Type'
                                onChange={set2}
                                inputProps={{ "data-testid": "resource_type" }}
                                options={resourceTypeOptions}
                                mappingKeys={["id", "value"]}
                            />
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={4}>
                            <SingleSelectComponent
                                fullWidth={true}
                                required={true}
                                id="resourceDisorderSelect"
                                labelId='resourceDisorder'
                                name='disorder_id'
                                value={formFields?.disorder_id}
                                label='Disorder'
                                onChange={set2}
                                inputProps={{ "data-testid": "disorder_id" }}
                                options={(disorderData && disorderData.getAllDisorder) || []}
                                mappingKeys={["_id", "disorder_name"]}
                            />
                        </Grid>
                        <Grid item xs={4}>
                        <SingleSelectComponent
                                fullWidth={true}
                                required={true}
                                id="modelTypeSelect"
                                labelId='modelType'
                                name='model_id'
                                value={formFields?.model_id}
                                label='Custom Model'
                                onChange={set2}
                                inputProps={{ "data-testid": "model_id" }}
                                options={(modelData && modelData?.getModelByDisorderId) || []}
                                mappingKeys={["_id", "model_name"]}
                            />
                        </Grid>
                        <Grid item xs={4}>
                        <SingleSelectComponent
                                fullWidth={true}
                                id="categorySelect"
                                labelId='category'
                                name='category_id'
                                value={formFields?.category_id}
                                label='Category'
                                onChange={set2}
                                inputProps={{ "data-testid": "category_id" }}
                                options={(categoryData && categoryData.getCategoryByModelId) || []}
                                mappingKeys={["_id", "category_name"]}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                name="resource_desc"
                                id="descrption"
                                label="Description"
                                value={formFields?.resource_desc}
                                multiline
                                rows={4}
                                onChange={set2}
                                inputProps={{ "data-testid": "resource_desc" }}
                                fullWidth={true} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                name="resource_instruction"
                                id="instructions"
                                label="Instructions"
                                value={formFields?.resource_instruction}
                                multiline
                                rows={4}
                                onChange={set2}
                                inputProps={{ "data-testid": "resource_instruction" }}
                                fullWidth={true} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={12}>
                            <TextFieldComponent
                                name="resource_references"
                                id="references"
                                label="References"
                                value={formFields?.resource_references}
                                multiline
                                rows={4}
                                onChange={set2}
                                inputProps={{ "data-testid": "resource_references" }}
                                fullWidth={true} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={3}>
                        <SingleSelectComponent
                                fullWidth={true}
                                id="agendaSelect"
                                labelId='agenda'
                                name='agenda_id'
                                value={formFields?.agenda_id}
                                label='Suggested Agenda'
                                onChange={set2}
                                inputProps={{ "data-testid": "agenda" }}
                                options={(agendaData && agendaData.getAgendaByDisorderAndModel) || []}
                                mappingKeys={["_id", "agenda_name"]}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <UploadButtonComponent 
                                variant="contained" 
                                name="RESOURCE_FILENAME" 
                                inputProps={{ "data-testid": "resource_file_upload" }}
                                onChange={handleFileChange} />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Select the Availability of Resource</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <CheckBoxLabelComponent 
                                        value="1"
                                        name='resource_avail_admin'
                                        onChange={set2}
                                        label="Admin"
                                        placement='start'
                                        inputProps={{ "data-testid": "resource_avail_admin" }}
                                    />
                                    <CheckBoxLabelComponent 
                                        value="1"
                                        name='resource_avail_therapist'
                                        onChange={set2}
                                        label="All Therapists"
                                        placement='start'
                                        inputProps={{ "data-testid": "resource_avail_therapist" }}
                                    />
                                    <CheckBoxLabelComponent 
                                        value="1"
                                        name='resource_avail_onlyme'
                                        onChange={set2}
                                        label="Only Me"
                                        placement='start'
                                        inputProps={{ "data-testid": "resource_avail_onlyme" }}
                                    />
                                    <CheckBoxLabelComponent 
                                        value="1"
                                        name='resource_avail_all'
                                        onChange={set2}
                                        label="Everyone"
                                        placement='start'
                                        inputProps={{ "data-testid": "resource_avail_all" }}
                                    />
                                </FormGroup>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={12} textAlign="center">
                            <Button variant="contained" type='submit'>Save</Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </>
    )
}

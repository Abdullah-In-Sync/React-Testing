import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import React, { FormEvent, useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_AGENDA_BY_DISORDER_AND_MODEL_DATA, GET_CATEGORY_BY_MODELID_DATA, GET_DISORDER_DATA, GET_MODEL_BY_DISORDERID_DATA } from '../../../graphql/query/common';
import { GET_UPLOAD_RESOURCE_URL } from '../../../graphql/query/resource';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { ADMIN_CREATE_RESOURCE } from '../../../graphql/mutation/resource';
import { msToTime } from '../../../lib/helpers/common';
import Loader from '../../common/Loader';

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

export default function addForm() {
    const { enqueueSnackbar } = useSnackbar();
    const [formFields, setFormFields] = useState<resourceFormField>({ resource_name: "", resource_type: "", disorder_id: "", model_id: "", category_id: "", resource_desc: "", resource_instruction: "", resource_references: "", resource_avail_admin: "", resource_avail_all: "", resource_avail_onlyme: "", resource_avail_therapist: "", agenda_id: "", resource_session_no: "", file_name: "" });
    const [loader, setLoader] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    const set = (fieldName: string) => {
        return ({ target: { value } }) => {
            setFormFields(oldValues => ({ ...oldValues, [fieldName]: value }));
            if (fieldName == "agenda_id") {
                let index = agendaData.getAgendaByDisorderAndModel.findIndex(p => p._id == value);
                let session = agendaData.getAgendaByDisorderAndModel[index].session;
                setFormFields(oldValues => ({ ...oldValues, resource_session_no: session }));
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }
        setSelectedFile(event.target.files[0]);
    };

    useEffect(() => {
        if (selectedFile) {
            let today = new Date();
            let date =
                today.getFullYear() +
                '' +
                ((today.getMonth() + 1) < 10) ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1) +
                '' +
                today.getDate();
            let time = msToTime(today.getTime());
            formFields.file_name = date + '' + time + '__' + selectedFile.name;

            getPreSignedURL({
                variables: { fileName: formFields.file_name },
            });
        }
    }, [selectedFile]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (preSignedData && preSignedData.getUploadResourceUrl && preSignedData.getUploadResourceUrl.resource_upload) {
                setLoader(true);
                const formData = new FormData();
                formData.append('file', selectedFile);

                const response = await axios.put(preSignedData.getUploadResourceUrl.resource_upload, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                if (response.status == 200) {
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
                            resourceIssmartdraw: "1",
                            resourceReferences: formFields.resource_references,
                            resourceStatus: 1,
                            userType: "admin"
                        },
                        onCompleted: (data) => {
                            if(data && data.adminCreateResource && data.adminCreateResource._id) {
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
                console.log(response);
            } else {
                enqueueSnackbar("Please select file!", { variant: "error" });
            }
        } catch (e) {
            setLoader(false);
            console.log(`failed! ${e.message}`);
            enqueueSnackbar("Please fill the all fields", { variant: "error" });
        }
    }

    return (
        <>
            <Loader visible={loader} />
            <form onSubmit={handleSubmit}>
                <Box
                    sx={{ flexGrow: 1, border: "1px solid #cecece" }}
                    p={5}
                    borderRadius="7px"
                >
                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                required
                                id="resource_name"
                                name="resource_name"
                                label="Name"
                                value={formFields?.resource_name}
                                onChange={set('resource_name')}
                                variant="outlined" />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth required>
                                <InputLabel id="resourceType">Resource Type</InputLabel>
                                <Select
                                    labelId="resourceType"
                                    id="resourceTypeSelect"
                                    name='resource_type'
                                    value={formFields?.resource_type}
                                    label="Resource Type"
                                    onChange={set('resource_type')}
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="1">Info Sheets</MenuItem>
                                    <MenuItem value="2">Work Sheets</MenuItem>
                                    <MenuItem value="3">Audio File</MenuItem>
                                    <MenuItem value="4">Video File</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={4}>
                            <FormControl fullWidth required>
                                <InputLabel id="resourceDisorder">Disorder</InputLabel>
                                <Select
                                    labelId="resourceDisorder"
                                    id="resourceDisorderSelect"
                                    name="disorder_id"
                                    value={formFields?.disorder_id}
                                    label="Disorder"
                                    onChange={set('disorder_id')}
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    {disorderData && disorderData.getAllDisorder && disorderData.getAllDisorder.map((v: any) => {
                                        return (
                                            <MenuItem key={`disorder${v._id}`} value={v._id}>{v.disorder_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth required>
                                <InputLabel id="modelType">Model</InputLabel>
                                <Select
                                    labelId="modelType"
                                    id="modelTypeSelect"
                                    name='model_id'
                                    value={formFields?.model_id}
                                    label="Model"
                                    onChange={set('model_id')}
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    {modelData && modelData.getModelByDisorderId && modelData.getModelByDisorderId.map((v: any) => {
                                        return (
                                            <MenuItem key={`model${v._id}`} value={v._id}>{v.model_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth >
                                <InputLabel id="category">Category</InputLabel>
                                <Select
                                    labelId="category"
                                    id="categorySelect"
                                    value={formFields?.category_id}
                                    name='category_id'
                                    label="Category"
                                    onChange={set('category_id')}
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    {categoryData && categoryData.getCategoryByModelId && categoryData.getCategoryByModelId.map((v: any) => {
                                        return (
                                            <MenuItem key={`category${v._id}`} value={v._id}>{v.category_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={12}>
                            <TextField
                                id="descrption"
                                label="Description"
                                name='resource_desc'
                                fullWidth
                                multiline
                                rows={4}
                                onChange={set('resource_desc')}
                                defaultValue={formFields?.resource_desc}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={12}>
                            <TextField
                                id="instructions"
                                label="Instructions"
                                name='resource_instruction'
                                fullWidth
                                multiline
                                rows={4}
                                onChange={set('resource_instruction')}
                                defaultValue={formFields?.resource_instruction}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={12}>
                            <TextField
                                id="references"
                                label="References"
                                name='resource_references'
                                fullWidth
                                multiline
                                rows={4}
                                onChange={set('resource_references')}
                                defaultValue={formFields?.resource_references}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="agenda">Suggested Agenda</InputLabel>
                                <Select
                                    labelId="agenda"
                                    id="agendaSelect"
                                    name='agenda_id'
                                    value={formFields?.agenda_id}
                                    label="Suggested Agenda"
                                    onChange={set('agenda_id')}
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    {agendaData && agendaData.getAgendaByDisorderAndModel && agendaData.getAgendaByDisorderAndModel.map((v: any) => {
                                        return (
                                            <MenuItem key={`agenda${v._id}`} value={v._id}>{v.agenda_name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant="contained" component="label" startIcon={<SendIcon />}>
                                Upload
                                <input hidden name='RESOURCE_FILENAME' onChange={handleFileChange} type="file" />
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginBottom={5}>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Select the Availability of Resource</FormLabel>
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="1"
                                        name='resource_avail_admin'
                                        control={<Checkbox onChange={set('resource_avail_admin')} />}
                                        label="Admin"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        name='resource_avail_therapist'
                                        control={<Checkbox onChange={set('resource_avail_therapist')} />}
                                        label="All Therapists"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        name='resource_avail_onlyme'
                                        control={<Checkbox onChange={set('resource_avail_onlyme')} />}
                                        label="Only Me"
                                        labelPlacement="start"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        name='resource_avail_all'
                                        control={<Checkbox onChange={set('resource_avail_all')} />}
                                        label="Everyone"
                                        labelPlacement="start"
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

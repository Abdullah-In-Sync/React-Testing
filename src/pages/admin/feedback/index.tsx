
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import _ from "lodash";
import { useSnackbar } from "notistack";

// GRAPHQL 
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { GET_FEEDBACK_DATA, GET_ORG_DATA, GET_FEEDBACK_BY_ID } from "../../../graphql/query"
import { ADD_FEEDBACK, DELETE_FEEDBACK, UPDATE_FEEDBACK } from "../../../graphql/mutation";

// MUI COMPONENTS
import Box from '@mui/material/Box';
import Layout from '../../../components/layout';
const TableGenerator = dynamic(import('../../../components/common/TableGenerator'), { ssr: false })
import ContentHeader from "../../../components/common/ContentHeader";
import { IconButton, Chip, TextField, Autocomplete } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { AddButton } from "../../../components/common/Buttons";
import CrudDialog from "../../../components/common/CrudDialog";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';



// COMPONENT STYLES
const crudButtons = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
    flexDirection: 'row-reverse'
}

export const Feedback: React.FunctionComponent<any> = (props) => {

    const { enqueueSnackbar } = props.notistackService || useSnackbar();

    // COMPONENT STATE
    const [addModal, setAddModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [viewModal, setViewModal] = useState<boolean>(false);
    const [deletConfirmationModal, setDeletConfirmationModal] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<any>([]);
    const [sessionList, setSessionList] = useState<any>([]);
    const [dataList, setDataList] = useState<any>([]);
    const [selectedId, setSelectedId] = useState<any>("");
    const [selectedUserData, setSelectedUserData] = useState<any>([]);


    // TABLE PROPS
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataCount, setDataCount] = useState(0);
    const [page, setPage] = useState(0);
    const [loader, setLoader] = useState(false);


    // GRAPHQL 
    const [addFeedback, { data, loading, error }] = useMutation(ADD_FEEDBACK);
    const { loading: orgLoading, error: orgError, data: orgData } = useQuery(GET_ORG_DATA);
    const { loading: dataListLoading, error: dataListError, data: dataListData, refetch } = useQuery(GET_FEEDBACK_DATA, {
        variables: { status: 'active', pageNo: 1 },
    });


    const [viewFeedback, { loading: feedbackLoader, error: feedbackError, data: feedbackData }] = useLazyQuery(GET_FEEDBACK_BY_ID);

    const [deleteFeedback, { loading: deleteDataLoading, error: deleteDataError, data: deleteData }] = useMutation(DELETE_FEEDBACK);
    const [updateFeedback, { loading: updateDataLoading, error: updateDataError, data: updateData }] = useMutation(UPDATE_FEEDBACK);



    useEffect(() => {
        // do some checking here to ensure data exist
        setLoader(true);
        if (dataListData) {
            // mutate data if you need to
            setDataList(dataListData?.getAdminFeedbackList)
            setLoader(false);
        }
    }, [dataListData])

    useEffect(() => {
        let session = []
        for (var i = 1; i <= 50; i++) {
            session.push({ label: `Session-${i}`, value: i })
        }
        setSessionList(session)
    }, [])

    //**  TABLE DATA COLUMNS **//
    const fields = [
        {
            key: "session_no",
            columnName: "Session No.",
            visible: true,
            render: (val) => val ?? "---"
        },
        {
            key: "organization_name",
            columnName: "Organization",
            visible: true,
            render: (val) => val ?? "---"
        },
        {
            key: "question",
            columnName: "Questions",
            visible: true,
            render: (val) => val ?? "---"
        },
        {
            key: "feedback_type",
            columnName: "Type",
            visible: true,
            render: (val) => val ?? "---"
        },
        {
            key: "created_date",
            columnName: "Created on",
            visible: true,
            render: (val) => val ?? "---"
        },
        {
            key: "actions",
            columnName: "Actions",
            visible: true,
            render: (_, value) => (
                <>
                    <IconButton
                        size="small"
                        variant="contained"
                        onClick={() => handleView(value._id)}
                    >
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        variant="contained"
                        onClick={() => { handleViewEdit(value._id); setSelectedId(value._id) }}
                    >
                        <CreateIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        variant="contained"
                        // onClick={() => handleDelete(value._id)}
                        onClick={() => { setDeletConfirmationModal(true), setSelectedId(value._id) }}

                    >
                        <DeleteIcon />
                    </IconButton>
                </>

            ),
        }

    ];

    // ADD DIALOG FIELDS
    const dialogFields = [[
        {
            key: "org_id",
            label: "Organization Name",
            visible: true,
            freeSolo: false,
            show: true,
            required: true,
            type: "autocomplete",
            options: orgData?.getOrganizationData?.length > 0 ? [...orgData?.getOrganizationData?.map(val => ({ "label": val.name, "value": val._id }))] : []

        }, {
            key: "session_no",
            label: "Session Name",
            visible: true,
            freeSolo: false,
            show: true,
            required: true,
            type: "autocomplete",
            options: sessionList.length > 0 ? sessionList : []
        }, {
            key: "feedback_type",
            label: "Feedback Type",
            visible: true,
            freeSolo: false,
            show: true,
            required: true,
            type: "autocomplete",
            options: [
                { label: "Quality", value: "quality" },
                { label: "Session", value: "session" },
            ],
        }
    ],

    ]
    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;

    let handleAdd = (val) => {
        let valid = false
        if (formValues.length === 0) {
            enqueueSnackbar("Please fill the all fields");
            return null
        } else {

            formValues.map(x => {
                if (!x.question || !x.answer_type) {
                    enqueueSnackbar("Please fill the all fields");
                    return valid = false
                }
                else {
                    return valid = true
                }
            })
        }

        if (valid) {
            const data = formValues.map(x => ({ ...x, ...val, session_no: [x.session_no] }))

            const dataJson = JSON.stringify(data);
            addFeedback({
                variables: { feedQuesData: dataJson },
                onCompleted: () => {
                    refetch();
                    setAddModal(false)
                }
            });
        }
    }

    let handleFormValues = (val) => {
        setFormValues(val)
    }

    let handleEdit = (val) => {
        const data = formValues.map(x => ({ question: x.question, answer_type: x.answer_type, ...val })) // ,answer_options: x.answer_options

        updateFeedback({
            variables: {
                feedbackId: selectedId,
                update: data[0]
            },
            onCompleted: () => { refetch(); setEditModal(false); }
        });
    }


    let handleViewEdit = (id) => {
        const val = dataList.filter(x => x._id === id);
        setSelectedUserData(val);
        setEditModal(true)
    }

    let handleDelete = (id) => {
        deleteFeedback({
            variables: {
                feedbackId: id,
                update: { status: "deleted" }
            },
            onCompleted: () => { setDeletConfirmationModal(false); refetch(); }
        });
    }

    let handleView = (id) => {
        const val = dataList.filter(x => x._id === id);
        setSelectedUserData(val);
        setViewModal(true)
    }

    return (
        <>
            <Layout>
                <ContentHeader title="Feedback" />
                <Box sx={crudButtons}>
                    <AddButton
                        className="mr-3"
                        label="Create Questionnaire"

                        onClick={() => setAddModal(true)}
                    />

                </Box>
                <Box >
                    <TableGenerator
                        fields={fields}
                        loader={loader}
                        data={dataListData?.getAdminFeedbackList}
                        currentPage={page}
                        onPageChange={(page, direction) => {
                            setPage(page);
                            if (direction === "next") {
                                changePage(nextPage);
                            } else if (direction === "back") {
                                changePage(previousPage);
                            } else if (direction === "first") {
                                changePage(firstPage);
                            } else if (direction === "last") {
                                changePage(lastPage);
                            }
                        }}
                        backendPagination={true}
                        onRowPerPageChange={(rows) => {
                            // getDeviceType(null, rows);
                            setRowsPerPage(rows);
                        }}
                        rowOnePage={10}
                    />




                    <CrudDialog
                        title="Create Questionnaire"
                        okText="Save"
                        fields={dialogFields}
                        // submitButtonDisabled={isMutating}
                        description="Please fill in the details below."
                        onFieldChange={(_, images) => {
                            //   handlUploadImages(images);
                        }}
                        onsubmit={(values, hasErrors) => {
                            handleAdd(values);
                        }}
                        dynamicForm={<DynamicForm buttonText="Add Question" callBackFormValues={handleFormValues} />}
                        open={addModal}
                        onClose={() => { setAddModal(false); setFormValues([]) }}
                    />

                    <CrudDialog
                        title="Edit Question"
                        okText="Update"
                        fields={dialogFields}
                        values={selectedUserData[0]}
                        onsubmit={(values, hasErrors) => {
                            handleEdit(values);
                        }}
                        dynamicForm={<DynamicForm callBackFormValues={handleFormValues} values={selectedUserData[0]} />}
                        open={editModal}
                        onClose={() => setEditModal(false)}
                    />

                    <CrudDialog
                        title="View Question"
                        viewData={true}
                        fields={dialogFields}
                        values={selectedUserData[0]}
                        dynamicForm={<DynamicForm type="view" values={selectedUserData[0]} />}
                        open={viewModal}
                        onClose={() => setViewModal(false)}
                    />

                    <CrudDialog
                        title="Delete Question"
                        description="Are you sure you want to delete this question? You will not be able to restore this again."

                        okText="Delete"
                        onsubmit={() => handleDelete(selectedId)}
                        open={deletConfirmationModal}
                        onClose={() => setDeletConfirmationModal(false)}
                    />


                </Box>
            </Layout >
        </>
    );
};

// DYNAMIC FORM
const DynamicForm = ({ callBackFormValues = () => { }, values = {}, buttonText = false, type }) => {
    // debugger
    const [formValues, setFormValues] = useState<any>([]);

    useEffect(

        () => {

            if (values && Object.keys(values).length > 0) {
                setFormValues([{ question: values.question, answer_type: values.answer_type, answer_options: values.answer_options }])
            }

        }, []
    )
    callBackFormValues(formValues);

    let addFormFields = () => {
        setFormValues([...formValues, { question: "", answer_type: "text", answer_options: "" }])
    }

    let handleChange = (i, e, chip_val) => {

        if (e.target.name == "answer_type" && e.target.value == "text") {
            let newFormValues = [...formValues];
            newFormValues[i]["answer_options"] = "";
            setFormValues(newFormValues);
        }

        if (e.target.name == "answer_options") {
            let newFormValues = [...formValues];
            newFormValues[i][e.target.name] = chip_val;
            setFormValues(newFormValues);
        }
        else {

            let newFormValues = [...formValues];
            newFormValues[i][e.target.name] = e.target.value;
            setFormValues(newFormValues);
        }

    }

    let removeFormFields = (i) => {
        const newData = formValues.filter((val, index) => {
            return i != index
        })
        setFormValues(newData)
    }
    // console.log("formValues",formValues)
    return (
        <form >
            {
                buttonText && (
                    <Button onClick={() => addFormFields()} sx={{ marginBottom: 1 }} variant="outlined"  >
                        {buttonText}
                    </Button>
                )
            }
            {formValues?.map((element, index) => (
                <div className="form-inline" key={index}>
                    <Paper elevation={3} sx={{ padding: '15px 11px', marginBottom: '15px' }} >


                        {Object.keys(values).length === 0 && <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                            <IconButton
                                size="small"
                                variant="contained"
                                onClick={() => removeFormFields(index)}
                                sx={{
                                    position: 'relative',
                                    left: '14px',
                                    top: '-7px'
                                }}
                            >
                                <CancelIcon sx={{ color: "error.main" }} />
                            </IconButton>
                        </Box>
                        }
                        <TextField
                            value={element.question}
                            onChange={e => handleChange(index, e)}
                            name="question"
                            disabled={type === "view" ? true : false}
                            label="Type your Question"
                            multiline
                            rows={4}
                            sx={{ width: '100%' }}
                            m={2}
                        />

                        <FormControl sx={{ mt: 2, mb: 2, minWidth: 220 }} size="small">
                            <InputLabel id="answer_type">Choose answer type</InputLabel>
                            <Select
                                labelId="answer_type"
                                name="answer_type"
                                disabled={type === "view" ? true : false}
                                value={element.answer_type || ""}
                                label="Choose answer type"
                                onChange={e => handleChange(index, e)}
                            >
                                {/* <MenuItem value="Checkbox">Checkbox</MenuItem> */}
                                <MenuItem value="text">Text</MenuItem>
                                {/* <MenuItem value="Radio button">Radio button</MenuItem> */}
                                <MenuItem value="list">List</MenuItem>
                            </Select>
                        </FormControl>

                        {element.answer_type === "list" &&
                            <Autocomplete
                                multiple
                                id="tags-filled"
                                name="answer_options"
                                options={[]}
                                disabled={type === "view" ? true : false}
                                defaultValue={element.answer_options || []}
                                onChange={(_, val) => {
                                    handleChange(index, _, val)
                                }}
                                freeSolo
                                renderTags={(value: string[], getTagProps) =>
                                    value.map((option: string, index: number) => {
                                        return (
                                            <Chip
                                                key={index}
                                                variant="outlined"
                                                label={option}
                                                {...getTagProps({ index })}
                                            />
                                        );
                                    })
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Question Options"
                                        placeholder="Add a option by pressing enter after write it "
                                        name="answer_options"
                                    />
                                )}
                            />


                        }

                    </Paper >
                </div>
            ))}
            <div className="button-section">
                {/* <button className="button add" type="button" onClick={() => addFormFields()}>Add</button> */}

                {/* <button className="button submit" type="submit">Submit</button> */}
            </div>
        </form>
    );
};
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
import _ from "lodash";

// GRAPHQL 
import { useMutation, useQuery,useLazyQuery } from '@apollo/client';
import { GET_FEEDBACK_DATA, GET_ORG_DATA,GET_FEEDBACK_BY_ID } from "../../../graphql/query"
import { ADD_FEEDBACK,DELETE_FEEDBACK,UPDATE_FEEDBACK } from "../../../graphql/mutation";

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


// COMPONENT STYLES
const crudButtons = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
    flexDirection: 'row-reverse'
}

const Feedback: React.FunctionComponent<any> = (props) => {

    // COMPONENT STATE
    const [addModal, setAddModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [viewModal, setViewModal] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<any>([]);
    const [sessionList, setSessionList] = useState<any>([]);
    const [dataList, setDataList] = useState<any>([]);

    // TABLE PROPS
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataCount, setDataCount] = useState(0);
    const [page, setPage] = useState(0);
    const [loader, setLoader] = useState(false);


    // GRAPHQL 
    const [addFeedback, { data, loading, error }] = useMutation(ADD_FEEDBACK);
    const { loading: orgLoading, error: orgError, data: orgData } = useQuery(GET_ORG_DATA);
    const { loading: dataListLoading, error: dataListError, data: dataListData } = useQuery(GET_FEEDBACK_DATA, {
        variables: { status: 'active',pageNo:1 },
        // pollInterval: 500,
    });

    
  const [viewFeedback, { loading:feedbackLoader, error:feedbackError, data:feedbackData }] = useLazyQuery(GET_FEEDBACK_BY_ID);

    const [deleteFeedback, { loading: deleteDataLoading, error: deleteDataError, data: deleteData }] = useMutation(DELETE_FEEDBACK);
    const [updateFeedback, { loading: updateDataLoading, error: updateDataError, data: updateData }] = useMutation(UPDATE_FEEDBACK);
    
    
    
    if ( dataListLoading) {
        console.log("Loading")
        // setLoader(true);
    };


    useEffect(() => {
        for (var i = 1; i <= 50; i++) {
            setSessionList((prev) => [...prev, { label: `Session-${i}`, value: i }])
        }
        // setLoader(true);
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
                    onClick={
                        () => {viewFeedback({ variables: { feedbackId: value._id },onCompleted:()=>setViewModal(true) }) }
                    }
                >
                    <VisibilityIcon />
                </IconButton>
                <IconButton
                    size="small"
                    variant="contained"
                    onClick={
                        () => {viewFeedback({ variables: { feedbackId: value._id },onCompleted:()=>setEditModal(true) }) }
                    }
                >
                    <CreateIcon />
                </IconButton>
                <IconButton
                    size="small"
                    variant="contained"                                 
                    onClick={
                        () => {deleteFeedback({ variables: {feedbackId:value._id,update:{status:"deleted"}  } }); }
                        
                    }
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
            type: "autocomplete",
            options: orgData?.getOrganizationData?.length > 0 ? [...orgData?.getOrganizationData?.map(val => ({ "label": val.name, "value": val._id }))] : []
            // defaultValue: { label: "Pepsi", value: "Pepsi" }
        }, {
            key: "session_no",
            label: "Session Name",
            visible: true,
            freeSolo: false,
            show: true,
            type: "autocomplete",
            options: sessionList.length > 0 ? sessionList : []
            // defaultValue: { label: "Enable", value: "Enable" }
        }, {
            key: "feedback_type",
            label: "Feedback Type",
            visible: true,
            freeSolo: false,
            show: true,
            type: "autocomplete",
            options: [
                { label: "Quality", value: "quality" },
                { label: "Session", value: "session" },
            ],
            // defaultValue: { label: "Enable", value: "Enable" }
        }
    ],

    ]
    // if (loading) return 'Submitting...';
    // if (error) return `Submission error! ${error.message}`;

    let handleAdd = (val) => {
        const data =formValues.map(x =>({...x,...val,session_no:[x.session_no]}))
        const dataJson = JSON.stringify(data);
        addFeedback({ variables: { feedQuesData: dataJson } });
    }
    // let handleAdd = (val) => {
    //     const dataJson = JSON.stringify([{ ...val, feedQuesData: { ...formValues } }]);
    //     addFeedback({ variables: { feedQuesData: dataJson } });
    // }

    let handleEdit = (val) => {
        debugger
        const data =formValues.map(x =>({...x,...val,session_no:[x.session_no]}))
        const dataJson = JSON.stringify(data);
        updateFeedback({ variables: { feedQuesData: dataJson } });
    }

    


    let addFormFields = () => {
        setFormValues([...formValues, { question: "", answer_type: "Text", answer_options: "" }])
    }

    let handleChange = (i, e, chip_val) => {
            debugger
        if (e.target.name == "answer_type" && e.target.value == "Textarea") {
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
                        //   searchQuery={query}
                        //   initialSort={"id"}
                        //   searchColumnsFilter={true}
                        fields={fields}
                          loader={loader}
                        data={dataListData?.getAdminFeedbackList}
                          currentPage={page}
                        //   handleSortChange={(ordering) => {
                        //     setOrdering(ordering);
                        //     getDeviceType(ordering);
                        //   }}
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
                        //   dataCount={dataCount}
                        //   // onChangePage={(page) => console.log(page)}
                        //   selectedRecords={modulesSelected}
                        rowOnePage={10}
                    //   onChangeSelected={(modulesSelected) =>
                    //     setModulesSelected(modulesSelected)
                    //   }
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
                        extraButtonText="Add Question"
                        onExtraButton={() => {
                            addFormFields()
                        }}
                        dynamicForm={<DynamicForm formValues={formValues} handleChange={handleChange} removeFormFields={removeFormFields} />}
                        open={addModal}
                        onClose={() => { setAddModal(false); setFormValues([]) }}
                    />

        <CrudDialog
          title="Edit Question"
          okText="Update"
          fields={dialogFields}
          values={feedbackData?.getFeedbackQuestionById[0]}
          onFieldChange={(_, images) => {
            debugger
            //   handlUploadImages(images);
        }}
          onsubmit={(values, hasErrors) => {
            handleEdit(values);
        }}
          dynamicForm={<DynamicForm formValues={feedbackData?.getFeedbackQuestionById}  handleChange={handleChange} removeFormFields={removeFormFields}  />}
          open={editModal}
          onClose={() => setEditModal(false)}
        />

<CrudDialog
          title="View Question"
          viewData={true}
          fields={dialogFields}
          values={feedbackData?.getFeedbackQuestionById[0]}
          dynamicForm={<DynamicForm formValues={feedbackData?.getFeedbackQuestionById}  />}
          open={viewModal}
          onClose={() => setViewModal(false)}
        />

              </Box>
            </Layout >
        </>
    );
};

export default Feedback;




// DYNAMIC FORM
const DynamicForm = (props) => {
    const { children, handleSubmit, formValues=[], handleChange, removeFormFields, ...other } = props;
debugger
    return (
        <form onSubmit={handleSubmit}>
            {formValues?.map((element, index) => (
                <div className="form-inline" key={index}>
                    <Paper elevation={3} sx={{padding: '5px 11px', marginBottom:'15px'}} >
                    <Box sx={{display:'flex', justifyContent: 'end'}}>
                    <IconButton
                        size="small"
                        variant="contained"
                        onClick={() => removeFormFields(index)}
                        sx={{position: 'relative',
                            left: '14px',
                            top: '-7px'}}
                    >
                        <CancelIcon sx={{ color: "error.main" }} />
                    </IconButton>
                    </Box>
                    <TextField
                        value={element.question || ""} 
                        onChange={e => handleChange(index, e)}
                        name="question"
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
                            value={element.answer_type || ""}
                            label="Choose answer type"
                            onChange={e => handleChange(index, e)}
                        >
                            <MenuItem value="Checkbox">Checkbox</MenuItem>
                            <MenuItem value="Textarea">Textarea</MenuItem>
                            <MenuItem value="Radio button">Radio button</MenuItem>
                            <MenuItem value="List">List</MenuItem>
                        </Select>
                    </FormControl>

                    {element.answer_type == "List" &&
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            name="answer_options"
                            options={[]}
                            defaultValue={element.answer_options || []}
                            // defaultValue={_.isEmpty(element.answer_options) ? []: [element.answer_options]  }
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
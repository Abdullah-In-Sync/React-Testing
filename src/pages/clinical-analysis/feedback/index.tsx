import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Layout from '../../../components/layout';
import TableGenerator from "../../../components/common/TableGenerator";
import ContentHeader from "../../../components/common/ContentHeader";
import { IconButton, Chip, TextField, Autocomplete } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import { AddButton } from "../../../components/common/Buttons";
import CrudDialog from "../../../components/common/CrudDialog";
// import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import _ from "lodash";

// import { Chip, TextField } from "@material-ui/core";
// import { Autocomplete } from "@material-ui/lab";

const fields = [
    {
        key: "session_no",
        columnName: "Session No.",
        visible: true,
    },
    {
        key: "organization",
        columnName: "Organization",
        visible: true,
    },
    {
        key: "questions",
        columnName: "Questions",
        visible: true,
    },
    {
        key: "feedback_type",
        columnName: "Type",
        visible: true,
    },
    {
        key: "created_on",
        columnName: "Created on",
        visible: true,
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
                        () => { }
                    }
                >
                    <VisibilityIcon />
                </IconButton>
                <IconButton
                    size="small"
                    variant="contained"
                    onClick={
                        () => { }
                    }
                >
                    <CreateIcon />
                </IconButton>
                <IconButton
                    size="small"
                    variant="contained"
                    onClick={
                        () => { }
                    }
                >
                    <DeleteIcon />
                </IconButton>
            </>

        ),
    }

];

const dialogFields = [[
    
    {
    key: "organization",
    label: "Organization Name",
    visible: true,
    freeSolo: false,
    show: true,
    type: "autocomplete",
    options: [
        { label: "Pepsi", value: "Pepsi" },
        { label: "Coca Cola", value: "Coca Cola" },
        { label: "Nestle", value: "Nestle" },
    ],
    // defaultValue: { label: "Pepsi", value: "Pepsi" }
},
{
    key: "session",
    label: "Session Name",
    visible: true,
    freeSolo: false,
    show: true,
    type: "autocomplete",
    options: [
        { label: "Session-1", value: "Session-1" },
        { label: "Session-2", value: "Session-2" },
        { label: "Session-3", value: "Session-3" },
        { label: "Session-4", value: "Session-4" },
    ],
    // defaultValue: { label: "Enable", value: "Enable" }
}
    ,
{
    key: "feedback_type",
    label: "Feedback Type",
    visible: true,
    freeSolo: false,
    show: true,
    type: "autocomplete",
    options: [
        { label: "Quality", value: "Quality" },
        { label: "Session", value: "Session" },
    ],
    // defaultValue: { label: "Enable", value: "Enable" }
}
],

]

const crudButtons = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 1,
    flexDirection: 'row-reverse'
}
const Feedback: React.FunctionComponent<any> = (props) => {

    const [addModal, setAddModal] = useState<boolean>(false);
    const [formValues, setFormValues] = useState([])
    const [dataList, setDataList] = useState<any>([
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            feedback_type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            feedback_type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            feedback_type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            feedback_type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            feedback_type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            feedback_type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            feedback_type: 'Quality',
            created_on: '10 May 22'
        },
    ]);

    let addFormFields = () => {
        setFormValues([...formValues, { question_details: "", answer_type: "Text", answer_options: "" }])
    }

    let handleChange = (i, e, chip_val) => {

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
        const newData = formValues.filter((val,index)=>{
            return i!=index
        } )
        setFormValues(newData)
    }

    let handleAdd = (val)=>{
        debugger
        console.log("Form Data", formValues)
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
                        //   loader={loader}
                        data={dataList}
                        //   currentPage={page}
                        //   handleSortChange={(ordering) => {
                        //     setOrdering(ordering);
                        //     getDeviceType(ordering);
                        //   }}
                        //   onPageChange={(page, direction) => {
                        //     setPage(page);
                        //     if (direction === "next") {
                        //       changePage(nextPage);
                        //     } else if (direction === "back") {
                        //       changePage(previousPage);
                        //     } else if (direction === "first") {
                        //       changePage(firstPage);
                        //     } else if (direction === "last") {
                        //       changePage(lastPage);
                        //     }
                        //   }}
                        backendPagination={true}
                        //   onRowPerPageChange={(rows) => {
                        //     getDeviceType(null, rows);
                        //     setRowsPerPage(rows);
                        //   }}
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
                        onFieldChange= {(_,images) => {
                            // debugger
                        //   handlUploadImages(images);
                        }}
                        onsubmit={(values, hasErrors) => {
                            // debugger
                            handleAdd(values);
                        }}
                        extraButtonText="Add Question"
                        onExtraButton={() => {
                            // alert('onExtraButton')
                            addFormFields()
                            // setAdPresentationModal(true);
                        }}
                        dynamicForm={<DynamicForm formValues={formValues} handleChange={handleChange} removeFormFields={removeFormFields} />}
                        open={addModal}
                        onClose={() => {setAddModal(false); setFormValues([])}}
                    />

                </Box>

            </Layout >
        </>
    );
};

export default Feedback;





const DynamicForm = (props) => {
    const { children, handleSubmit, formValues, handleChange, removeFormFields, ...other } = props;

    return (
        <form onSubmit={handleSubmit}>
            {formValues.map((element, index) => (
                <div className="form-inline" key={index}>
                    <IconButton
                        size="small"
                        variant="contained"
                        onClick={() => removeFormFields(index)}
                    >
                        <CancelIcon sx={{ color: "error.main" }} />
                    </IconButton>
                    <TextField
                        value={element.question_details || ""} onChange={e => handleChange(index, e)}
                        name="question_details"
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
                        //  <TextField
                        //            value={element.answer_options || ""} onChange={e => handleChange(index, e)}
                        //           name="answer_options"
                        //           label="List of answer options"
                        //         //   multiline
                        //         //   rows={4}
                        //           sx={{width:'100%'}}
                        //           m={2}
                        //         />
                        <Autocomplete
                            multiple
                            id="tags-filled"
                            name="answer_options"
                            options={[]}
                            defaultValue={ element.answer_options ||[]}
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


                </div>
            ))}
            <div className="button-section">
                {/* <button className="button add" type="button" onClick={() => addFormFields()}>Add</button> */}
                {/* <button className="button submit" type="submit">Submit</button> */}
            </div>
        </form>
    );
};
import React, { useState,useMemo } from 'react';
import Box from '@mui/material/Box';
import Layout from '../../../components/layout';
import TableGenerator from "../../../components/common/TableGenerator";
import ContentHeader from "../../../components/common/ContentHeader";
import { IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddButton } from "../../../components/common/Buttons";
import CrudDialog from "../../../components/common/CrudDialog";

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
        key: "type",
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

const dialogFields = [[{
    key: "organization",
    label: "Organization Name",
    visible: true,
    freeSolo: false,
    show: true,
    type: "autocomplete",
    options: [
      { label: "Enable", value: "Enable" },
      { label: "Disable", value: "Disable" },
    ],
    defaultValue:{ label: "Enable", value: "Enable" }
  },
  {key: "session",
  label: "Session Name",
  visible: true,
  freeSolo: false,
  show: true,
  type: "autocomplete",
  options: [
    { label: "Enable", value: "Enable" },
    { label: "Disable", value: "Disable" },
  ],
  defaultValue:{ label: "Enable", value: "Enable" }
}],
{key: "feedback_type",
  label: "Feedback Type",
  visible: true,
  freeSolo: false,
  show: true,
  type: "autocomplete",
  options: [
    { label: "Enable", value: "Enable" },
    { label: "Disable", value: "Disable" },
  ],
  defaultValue:{ label: "Enable", value: "Enable" }
}

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
    const [dataList, setDataList] = useState<any>([
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            type: 'Quality',
            created_on: '10 May 22'
        },
        {
            session_no: '2',
            organization: 'Pepsi',
            questions: '2',
            type: 'Quality',
            created_on: '10 May 22'
        },
    ]);



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
                
 {/* {useMemo(() => {
    <CrudDialog
  title="Add Product"
  okText="Add Product"
  fields={dialogFields}
  // submitButtonDisabled={isMutating}
  description="Please fill in the details below."
  // onFieldChange= {(_,images) => {
  //   handlUploadImages(images);
  // }}
  onSubmit={(values, hasErrors) => {
      // handleAdd(values);
  }}
  open={addModal}
  onClose={() => setAddModal(false)}
/>;
}, [addModal])} */}

<CrudDialog
  title="Create Questionnaire"
  okText="Save"
  fields={dialogFields}
  // submitButtonDisabled={isMutating}
  description="Please fill in the details below."
  // onFieldChange= {(_,images) => {
  //   handlUploadImages(images);
  // }}
  onSubmit={(values, hasErrors) => {
      // handleAdd(values);
  }}
  open={addModal}
  onClose={() => setAddModal(false)}
/>
                   
                </Box>

            </Layout >
        </>
    );
};

export default Feedback;

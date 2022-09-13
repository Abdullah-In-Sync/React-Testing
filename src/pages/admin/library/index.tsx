import React, { useState } from "react";
import type { NextPage } from "next";
import Loader from "../../../components/common/Loader";


// MUI COMPONENTS
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";
import { IconButton, Box, Button } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import CreateIcon from "@mui/icons-material/Create";
import ListAltIcon from '@mui/icons-material/ListAlt';
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { AddButton } from "../../../components/common/Buttons";
import CardGenerator from "../../../components/common/CardGenerator";
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import AsyncAutoComplete from "../../../components/common/AsyncAutoComplete/index";
import CrudForm from "../../../components/common/CrudForm";

// COMPONENT STYLES
const crudButtons = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  marginBottom: 1,
  flexDirection: "row",
};

const IconButtonWrapper = styled(IconButton)(
  () => `
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
`
);

import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.25),
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0.20),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));


const Library: NextPage = () => {

  // COMPONENT STATE
  const [dataList] = useState<any>([{
    id: 1,
    text: "description 1",
    title: "title 1"
  },
  {
    id: 2,
    text: "description 2",
    title: "title 2"
  },
  {
    id: 3,
    text: "description 3",
    title: "title 3"
  }, {
    id: 4,
    text: "description 4",
    title: "title 4"
  }, {
    id: 5,
    text: "description 5",
    title: "title 5"
  }, {
    id: 6,
    text: "description 6",
    title: "title 6"
  },]);

  // TABLE PROPS
  const [loader, setLoader] = useState<boolean>(false);


  //**  TABLE DATA COLUMNS **//
  /* istanbul ignore next */


  const fields = [
    {
      key: "text",
      visible: true,

    },
    {
      key: "resource_details",
      visible: true,
      render: (_, value) => (
        <Button variant="contained" sx={{ width: "100%" }}>{value.title}</Button>
      ),
    },
    {
      key: "actions",
      visible: true,
      render: (_, value) => (
        <>
          <IconButtonWrapper aria-label="create" size="small">
            <CreateIcon />
          </IconButtonWrapper>

          <IconButtonWrapper aria-label="favorite" size="small">
            <FavoriteBorderIcon />
          </IconButtonWrapper>

          <IconButtonWrapper aria-label="delete" size="small">
            <DeleteIcon />
          </IconButtonWrapper>

          <IconButtonWrapper aria-label="download" size="small">
            <CloudDownloadIcon />
          </IconButtonWrapper>
        </>
      ),
    },
  ];

  const filterList = [
    [{
      key: "resources", visible: true,
      freeSolo: false,
      show: true, label: "Select Resources", type: "asynccomplete", options: [{ value: "all", label: "All" }, { value: "my-resources", label: "My Resources" }, { value: "my-favourites", label: "My Favourites" }]
    },
    {
      key: "disorder", label: "Select Disorder", visible: true,
      freeSolo: false,
      show: true, type: "asynccomplete", options: [{ value: "all", label: "All" }]
    },
    {
      key: "modalities", label: "Select Modalities", visible: true,
      freeSolo: false,
      show: true, type: "asynccomplete", options: [{ value: "all", label: "All" }]
    },
    {
      key: "type", label: "Select Type", visible: true,
      freeSolo: false,
      show: true, type: "asynccomplete", options: [{ value: "all", label: "All" }, { value: "info-sheet", label: "Info Sheet" }, { value: "work-sheet", label: "Work Sheet" }, { value: "audio-file", label: "Audio File" }, { value: "video-file", label: "Video File" }]
    },
    {
      key: "category", label: "Select Category", visible: true,
      freeSolo: false,
      show: true, type: "asynccomplete", options: [{ value: "all", label: "All" }]
    }
    ]
  ]
  // setFilterValue([{key:"resource"})
  const handleFilterChange = (val) => {
    console.log("Filter", val)
  }

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Library" />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Grid>
          <Grid item xs={9}>
            <Box sx={crudButtons}>
              <AddButton
                className="mr-3"
                label="Add Resource"
                startIcon={<ListAltIcon />}
              />
              <AddButton
                className="mr-3"
                label="Create Resource"
                startIcon={<ListAltIcon />}
              />
            </Box>
          </Grid>
        </Grid>

        <CrudForm
          title="Create Questionnaire"
          okText="Save"
          fields={filterList}
          description="Please fill in the details below."
          onFieldChange={(value) => {
            handleFilterChange(value)
          }}
        />
        {/* <FilterBar filterList={filterList} filterChange={filterChangeHandle} loader={false} /> */}
        <Box>

          <CardGenerator data={dataList} fields={fields} />

        </Box>
      </Layout>
    </>
  );
};

export default Library;





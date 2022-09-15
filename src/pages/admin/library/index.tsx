import React, { useState } from "react";
import type { NextPage } from "next";
import Loader from "../../../components/common/Loader";

// GRAPHQL
import { useQuery } from "@apollo/client";
import {
  GET_ADMIN_RESOURCE_DATA,
  GET_DISORDER_MODEL_LIST,
  GET_CATEGORY,
} from "../../../graphql/query/resource";

// MUI COMPONENTS
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";
import { IconButton, Box, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { AddButton } from "../../../components/common/Buttons";
import CardGenerator from "../../../components/common/CardGenerator";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.25),
  "&:hover": {
    backgroundColor: alpha(theme.palette.secondary.main, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(0.2),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

const Library: NextPage = () => {
  // COMPONENT STATE
  const [modelData, setModelData] = useState<any>([]);
  const [filterValue, setFilterValue] = useState<any>({});
  const [searchText, setSearchText] = useState<string>("");

  // GRAPHQL
  const { loading, data: dataListData } = useQuery(GET_ADMIN_RESOURCE_DATA, {
    variables: {
      userType: "admin",
      resourceStatus: 1,
      categoryId: filterValue?.categoryId ?? "",
      disorderId: filterValue?.disorderId ?? "",
      mode: filterValue?.mode ?? "",
      modelId: filterValue?.modelId ?? "",
      myFav: filterValue?.mode === "favourite" ? 1 : 0,
      myResource: filterValue?.mode === "resource" ? 1 : 0,
      resourceType: filterValue?.resourceType ?? "",
      searchText: searchText ?? "",
    },
  });

  const { data: disorderList } = useQuery(GET_DISORDER_MODEL_LIST);

  const { data: categoryList } = useQuery(GET_CATEGORY, {
    variables: {
      modelId: filterValue?.modelId ?? "",
    },
  });

  //**  TABLE DATA COLUMNS **//
  /* istanbul ignore next */

  const fields = [
    {
      key: "resource_desc",
      visible: true,
    },
    {
      key: "resource_name",
      visible: true,
      render: (_, value) => (
        <Button variant="contained" sx={{ width: "100%", height: "40px" }}>
          {value?.resource_name?.substring(0, 40)}
        </Button>
      ),
    },
    {
      key: "actions",
      visible: true,
      render: () => (
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
    [
      {
        key: "mode",
        visible: true,
        freeSolo: false,
        defaultValue: { label: "All", value: "" },
        show: true,
        label: "Select Resources",
        type: "asynccomplete",
        options: [
          { value: "", label: "All" },
          { value: "resource", label: "My Resources" },
          { value: "favourite", label: "My Favourites" },
        ],
      },
      {
        key: "disorderId",
        label: "Select Disorder",
        visible: true,
        freeSolo: false,
        show: true,
        type: "asynccomplete",
        defaultValue: { label: "All", value: "" },
        options: disorderList?.getDisorderModel?.length
          ? [
              { label: "All", value: "" },
              ...disorderList.getDisorderModel.map((x) => ({
                label: x.disorder_name,
                value: x._id,
              })),
            ]
          : [{ label: "All", value: "" }],
      },
      {
        key: "modelId",
        label: "Select Modalities",
        visible: true,
        freeSolo: false,
        show: true,
        type: "asynccomplete",
        defaultValue: { label: "All", value: "" },
        options: modelData?.length
          ? [
              { label: "All", value: "" },
              ...modelData.map((x) => ({
                label: x.model_name,
                value: x._id,
              })),
            ]
          : [{ label: "All", value: "" }],
      },
      {
        key: "resourceType",
        label: "Select Type",
        visible: true,
        freeSolo: false,
        defaultValue: { label: "All", value: "" },
        show: true,
        type: "asynccomplete",
        options: [
          { value: "", label: "All" },
          { value: 1, label: "Info Sheet" },
          { value: 2, label: "Work Sheet" },
          { value: 3, label: "Audio File" },
          { value: 4, label: "Video File" },
        ],
      },
      {
        key: "categoryId",
        label: "Select Category",
        visible: true,
        freeSolo: false,
        show: true,
        type: "asynccomplete",
        defaultValue: { label: "All", value: "" },
        options: categoryList?.getCategoryByModelId?.length
          ? [
              { label: "All", value: "" },
              ...categoryList.getCategoryByModelId.map((x) => ({
                label: x.category_name,
                value: x._id,
              })),
            ]
          : [{ label: "All", value: "" }],
      },
    ],
  ];

  const handleFilterChange = (value) => {
    setFilterValue(value);
    const modelList = disorderList?.getDisorderModel?.find(
      (val) => val._id === value?.disorderId
    );
    setModelData(modelList?.disordermodel_data);
  };

  return (
    <>
      <Layout>
        <ContentHeader title="Library" />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => setSearchText(e.target.value)}
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
          fields={filterList}
          onFieldChange={(value) => {
            handleFilterChange(value);
          }}
        />

        <Box>
          <Loader visible={loading} />
          <CardGenerator
            data={dataListData?.getAdminResourceList}
            fields={fields}
          />
        </Box>
      </Layout>
    </>
  );
};

export default Library;

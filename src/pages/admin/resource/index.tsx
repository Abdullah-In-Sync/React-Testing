import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Loader from "../../../components/common/Loader";
import { useSnackbar } from "notistack";

// GRAPHQL
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  GET_ADMIN_RESOURCE_DATA,
  GET_DISORDER_MODEL_LIST,
  GET_CATEGORY,
  GET_UNAPPROVE_RESOURCE,
} from "../../../graphql/query/resource";
import {
  ADD_FAVOURITE,
  DELETE_RESOURCE,
  REMOVE_FAVOURITE,
} from "../../../graphql/mutation/resource";

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
import DeleteSureModal from "../../../components/admin/resource/DeleteSureModal";

import NextLink from "next/link";

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

// TYPES

interface FavResourceData {
  _id: string;
  resource_id: string;
  user_id: string;
  user_type: string;
  resfav_status: string;
  created_date: string;
}
interface ResourceList {
  _id: string;
  fav_res_detail: FavResourceData[];
  resource_desc: string;
  resource_name: string;
  user_id: string;
}

interface ResourceListData {
  getResourceList: ResourceList[];
}

interface ResourceListVars {
  userType: string;
  categoryId: string;
  disorderId: string;
  modelId: string;
  myFav: number;
  myResource: number;
  resourceType: string;
  searchText: string;
  orgId: string;
}

const Resource: NextPage = () => {
  // COMPONENT STATE
  const [modelData, setModelData] = useState<any>([]);
  const [filterValue, setFilterValue] = useState<any>({});
  const [searchText, setSearchText] = useState<string>("");
  const [dataList, setDataList] = useState<any>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [addFavourite] = useMutation(ADD_FAVOURITE);
  const [resourceId, setResourceId] = useState<any>("");
  const [isMutating, setIsMutation] = useState<boolean>(false);
  const [removeFavourite] = useMutation(REMOVE_FAVOURITE);
  const [deleteResource] = useMutation(DELETE_RESOURCE);

  // GRAPHQL
  const {
    loading,
    data: dataListData,
    refetch,
  } = useQuery<ResourceListData, ResourceListVars>(GET_ADMIN_RESOURCE_DATA, {
    variables: {
      userType: "admin",
      categoryId: filterValue?.categoryId ?? "",
      disorderId: filterValue?.disorderId ?? "",
      modelId: filterValue?.modelId ?? "",
      myFav: filterValue?.mode === "favourite" ? 1 : 0,
      myResource: filterValue?.mode === "resource" ? 1 : 0,
      resourceType: filterValue?.resourceType ?? "",
      searchText: searchText ?? "",
      orgId: "",
    },
  });

  const { data: disorderList } = useQuery(GET_DISORDER_MODEL_LIST);
  const [
    getUnApproveResource,
    { loading: unapproveLoading, data: unApproveResourceList },
  ] = useLazyQuery(GET_UNAPPROVE_RESOURCE, {
    fetchPolicy: "no-cache",
  });

  const { data: categoryList } = useQuery(GET_CATEGORY, {
    variables: {
      modelId: filterValue?.modelId ?? "",
    },
  });

  useEffect(() => {
    // do some checking here to ensure data exist
    /* istanbul ignore next */
    if (dataListData) {
      /* istanbul ignore next */
      setDataList(dataListData?.getResourceList);
    }
  }, [dataListData]);

  useEffect(() => {
    if (unApproveResourceList) {
      /* istanbul ignore next */
      setDataList(unApproveResourceList?.getAdminUnApproveResourceList);
    }
  }, [unApproveResourceList]);

  /* istanbul ignore next */
  const addFavour = async (id: string, isFav: string) => {
    if (!isFav) {
      addFavourite({
        variables: {
          resourceId: id,
        },
        onCompleted: () => {
          refetch();
          document.getElementById("fav_" + id).style.color = "red";
        },
      });
    } else {
      // remove from favourite
      removeFavourite({
        variables: {
          resfavId: isFav,
        },
        onCompleted: () => {
          refetch();
          document.getElementById("fav_" + id).style.color =
            "rgba(0, 0, 0, 0.54)";
        },
      });
    }
  };

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
        <NextLink href={"/admin/resource/" + value?._id} passHref>
          <Button variant="contained" sx={{ width: "100%", height: "40px" }}>
            {value?.resource_name?.substring(0, 40)}
          </Button>
        </NextLink>
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
            <FavoriteBorderIcon
              data-testid={"fav_" + value?._id}
              id={"fav_" + value?._id}
              onClick={() =>
                addFavour(
                  value?._id,
                  value?.fav_res_detail && value?.fav_res_detail.length > 0
                    ? value?.fav_res_detail[0]._id
                    : ""
                )
              }
              sx={{
                color:
                  value?.fav_res_detail && value?.fav_res_detail.length > 0
                    ? "red"
                    : "",
              }}
            />
          </IconButtonWrapper>

          {value?.user_type == "admin" && (
            <IconButtonWrapper
              onClick={() => {
                setModalOpen(true);
                setResourceId(value?._id);
              }}
              data-testid={"deleteIcon_" + value?._id}
              aria-label="delete"
              size="small"
            >
              <DeleteIcon />
            </IconButtonWrapper>
          )}
          <IconButtonWrapper aria-label="download" size="small">
            <CloudDownloadIcon />
          </IconButtonWrapper>
        </>
      ),
    },
  ];

  /* istanbul ignore next */
  const filterList = [
    [
      {
        key: "mode",
        visible: true,
        freeSolo: false,
        defaultValue: { label: "Select Resources", value: "" },
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
        disabled: filterValue?.mode === "approve_resource" ? true : false,
        defaultValue: { label: "Select Disorder", value: "" },
        options: disorderList?.getDisorderModel?.length
          ? [
              { label: "Select Disorder", value: "" },
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
        disabled: filterValue?.mode === "approve_resource" ? true : false,
        defaultValue: { label: "Select Modalities", value: "" },
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
        defaultValue: { label: "Select Type", value: "" },
        show: true,
        type: "asynccomplete",
        disabled: filterValue?.mode === "approve_resource" ? true : false,
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
        disabled: filterValue?.mode === "approve_resource" ? true : false,
        defaultValue: { label: "Select Category", value: "" },
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

  /* istanbul ignore next */
  const handleDelete = async (id) => {
    /* istanbul ignore else */
    setIsMutation(true);
    deleteResource({
      variables: {
        resourceId: id,
      },
      onCompleted: () => {
        setIsMutation(false);
        enqueueSnackbar("Data deleted successfully!", { variant: "error" });
        window.location.reload();
      },
    });
  };

  const handleFilterChange = (value) => {
    /* istanbul ignore next */
    setFilterValue(value);
    /* istanbul ignore next */
    const modelList = disorderList?.getDisorderModel?.find(
      (val) => val._id === value?.disorderId
    );
    /* istanbul ignore next */
    setModelData(modelList?.disordermodel_data);
    /* istanbul ignore next */
    if (value?.mode === "approve_resource") {
      getUnApproveResource();
    }
  };

  return (
    <>
      <Layout>
        <ContentHeader title="Resource" />
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={
                  /* istanbul ignore next */
                  (e) => setSearchText(e.target.value)
                }
              />
            </Search>
          </Grid>
          <Grid item xs={9}>
            <Box sx={crudButtons}>
              <Button
                className={`text-white`}
                variant="contained"
                sx={{ textTransform: "none", bottom: "4px", height: "35px" }}
                onClick={() => {
                  handleFilterChange({ mode: "approve_resource" });
                }}
              >
                Approved Resource
              </Button>

              <AddButton
                href="/v2/admin/resource/add"
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
            /* istanbul ignore next */
            handleFilterChange(value);
          }}
          values={filterValue}
        />

        <Box>
          <Loader visible={loading || unapproveLoading} />
          <CardGenerator data={dataList} fields={fields} />
        </Box>
        <DeleteSureModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <Box marginTop="20px" display="flex" justifyContent="end">
            <Button
              variant="contained"
              color="inherit"
              size="small"
              data-testid="deleteResourceModalCancelButton"
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
              data-testid="deleteResourceModalConfirmButton"
              disabled={isMutating}
              onClick={() => {
                setModalOpen(false);
                handleDelete(resourceId);
              }}
            >
              Confirm
            </Button>
          </Box>
        </DeleteSureModal>
      </Layout>
    </>
  );
};

export default Resource;

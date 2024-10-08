import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Loader from "../../../components/common/Loader";
import { useSnackbar } from "notistack";

// GRAPHQL
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  GET_RESOURCE_DATA,
  GET_DISORDER_MODEL_LIST,
  GET_CATEGORY,
  GET_UNAPPROVE_RESOURCE,
} from "../../../graphql/query/resource";
import {
  ADD_FAVOURITE,
  DELETE_RESOURCE,
  REMOVE_FAVOURITE,
  APPROVE_RESOURCE,
} from "../../../graphql/mutation/resource";

// MUI COMPONENTS
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";
import { IconButton, Box, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CardGenerator from "../../../components/common/CardGenerator";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import CrudForm from "../../../components/common/CrudForm";
import DeleteSureModal from "../../../components/admin/resource/DeleteSureModal";
import ApproveSureModal from "../../../components/admin/resource/ApproveSureModal";
import DoneIcon from "@mui/icons-material/Done";

import NextLink from "next/link";
import withAuthentication from "../../../hoc/auth";
import { useAppContext } from "../../../contexts/AuthContext";
import Formulation from "../formulation";
import { useRouter } from "next/router";
import CheckBoxLabelComponent from "../../../components/common/CheckBoxs/CheckBoxLabel/CheckBoxLabelComponent";
import {
  GET_UNAPPROVE_FORMULATION_LIST,
  UPDATE_ADMIN_FORMULATION_BY_ID,
} from "../../../graphql/formulation/graphql";

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
  getResourceList: { data: ResourceList[] };
}

interface ResourceListVars {
  categoryId: string;
  disorderId: string;
  modelId: string;
  myFav: number;
  myResource: number;
  resourceType: number;
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
  const [approveResource] = useMutation(APPROVE_RESOURCE);
  const [approveFormulation] = useMutation(UPDATE_ADMIN_FORMULATION_BY_ID);
  const [isFormulation, setIsFormulation] = useState<boolean>(false);
  const [isUnapproveFormulation, setIsUnapproveFormulation] = useState(0);
  const [approveTab, setApproveTab] = useState(false);
  const {
    user: { _id: adminId },
  } = useAppContext();
  const [approveModal, setApproveModal] = useState<boolean>(false);
  const router = useRouter();

  // GRAPHQL
  const {
    loading,
    data: dataListData,
    refetch,
  } = useQuery<ResourceListData, ResourceListVars>(GET_RESOURCE_DATA, {
    variables: {
      categoryId: filterValue?.categoryId ?? "",
      disorderId: filterValue?.disorderId ?? "",
      modelId: filterValue?.modelId ?? "",
      myFav: filterValue?.mode === "favourite" ? 1 : 0,
      myResource: filterValue?.mode === "resource" ? 1 : 0,
      resourceType: filterValue?.resourceType ?? 0,
      searchText: searchText ?? "",
      orgId: "",
    },
    /* istanbul ignore next */
    fetchPolicy: "cache-and-network",
    /* istanbul ignore next */
    onError: () => {
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    },
  });

  const { data: disorderList } = useQuery(GET_DISORDER_MODEL_LIST);

  const [
    getUnApproveResource,
    { loading: unapproveLoading, data: unApproveResourceList },
  ] = useLazyQuery(GET_UNAPPROVE_RESOURCE, {
    fetchPolicy: "no-cache",
  });

  const [getUnApproveFormulation, { loading: unapproveFormulationLoading }] =
    useLazyQuery(GET_UNAPPROVE_FORMULATION_LIST, {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        if (data?.getUnApproveFormulationList) {
          const formateData = data.getUnApproveFormulationList.map((f) => {
            return {
              _id: f._id,
              resource_name: f.formulation_name,
              resource_desc: f.formulation_desc,
              user_id: f.user_id,
            };
          });
          setDataList(formateData);
        }
      },
    });

  const { data: categoryList } = useQuery(GET_CATEGORY, {
    variables: {
      modelId: filterValue?.modelId ?? "",
    },
  });

  useEffect(() => {
    // do some checking here to ensure data exist
    /* istanbul ignore next */
    if (!loading && dataListData) {
      /* istanbul ignore next */
      setDataList(dataListData?.getResourceList?.data);
    }
  }, [dataListData]);

  useEffect(() => {
    refetch();
  }, []);

  /* istanbul ignore next */
  const setSearch = (value) => {
    console.log(value, "on change");
    // eslint-disable-next-line no-useless-escape
    const disallowedPattern = /[^A-Za-z0-9_]/g;
    /* istanbul ignore next */
    const sanitizedInput = value.replace(disallowedPattern, "");
    /* istanbul ignore next */
    setSearchText(sanitizedInput);
  };

  useEffect(() => {
    if (unApproveResourceList) {
      /* istanbul ignore next */
      setDataList(unApproveResourceList?.getAdminUnApproveResourceList);
    }
    if (isUnapproveFormulation == 1) {
      getUnApproveFormulation();
    }
  }, [unApproveResourceList, isUnapproveFormulation]);
  useEffect(() => {
    /* istanbul ignore next */
    if (router?.query?.tab) {
      if (router?.query.tab == "approveResource") {
        setIsFormulation(false);
        setApproveTab(true);
        handleFilterChange({ mode: "approve_resource" });
      }
      /* istanbul ignore next */
      if (router?.query.tab == "formulation") {
        setIsFormulation(true);
      }
    }
  }, []);

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
          <Button
            variant="contained"
            sx={{ width: "100%", height: "40px", textTransform: "none" }}
          >
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
          {value?.user_id == adminId && (
            <IconButtonWrapper aria-label="create" size="small">
              <NextLink href={"/admin/resource/edit/" + value._id} passHref>
                <CreateIcon />
              </NextLink>
            </IconButtonWrapper>
          )}
          {filterValue?.mode != "approve_resource" && (
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
          )}

          {filterValue?.mode === "approve_resource" && (
            <IconButtonWrapper
              onClick={() => {
                setApproveModal(true);
                setResourceId(value?._id);
              }}
              data-testid={"doneIcon_" + value?._id}
              id={"doneIcon_" + value?._id}
              aria-label="Done"
              size="small"
              aria-hidden="true"
            >
              <DoneIcon />
            </IconButtonWrapper>
          )}

          {(value?.user_id == adminId ||
            filterValue?.mode === "approve_resource") && (
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
          {filterValue?.mode != "approve_resource" && (
            <NextLink
              href={
                value?.download_resource_url != null
                  ? value?.download_resource_url
                  : "#"
              }
              passHref
            >
              <IconButtonWrapper aria-label="download" size="small">
                <CloudDownloadIcon />
              </IconButtonWrapper>
            </NextLink>
          )}
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
          { value: 0, label: "All" },
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
        refetch();
      },
    });
  };

  /* istanbul ignore next */
  const handleApprove = async (id) => {
    /* istanbul ignore else */
    setIsMutation(true);
    if (isUnapproveFormulation == 1) {
      await approveFormulation({
        variables: {
          formulation_id: id,
          updateFormulation: {
            formulation_status: 1,
          },
        },
        onCompleted: () => {
          setIsMutation(false);
          setApproveTab(true);
          handleFilterChange({ mode: "approve_resource" });
          enqueueSnackbar("Formulation Approved successfully!", {
            variant: "success",
          });
        },
      });
    } else {
      approveResource({
        variables: {
          resourceId: id,
        },
        onCompleted: () => {
          setIsMutation(false);
          enqueueSnackbar("Resource Approved successfully!", {
            variant: "success",
          });
          handleFilterChange({ mode: "approve_resource" });
          setApproveTab(true);
        },
      });
    }
  };

  const handleFilterChange = (value) => {
    /* istanbul ignore next */
    setFilterValue(value);
    /* istanbul ignore next */
    if (value.mode == "") {
      window.location.reload();
    }
    /* istanbul ignore next */
    const modelList = disorderList?.getDisorderModel?.find(
      (val) => val._id === value?.disorderId
    );
    /* istanbul ignore next */
    setModelData(modelList?.disordermodel_data);
    /* istanbul ignore next */
    if (value?.mode === "approve_resource") {
      setApproveTab(true);
      if (isUnapproveFormulation == 1) {
        /* istanbul ignore next */
        getUnApproveFormulation();
      } else {
        /* istanbul ignore next */
        getUnApproveResource();
      }
    }
  };

  const setCheckBox = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | any>
  ) => {
    const name = e.target.name;

    if (name === "formulation") {
      /* istanbul ignore next */
      setIsUnapproveFormulation(!e.target.checked ? 0 : 1);
    }
  };

  return (
    <>
      <Layout>
        <ContentHeader page={"resource"} title="Library" />
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems={"center"}
        >
          <Grid
            xs={3}
            style={{
              opacity: isFormulation ? 0 : 1,
              padding: " 0px 0px 0px 16px",
            }}
            marginBottom={"16px"}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                /* istanbul ignore next */
                value={searchText}
                onChange={
                  /* istanbul ignore next */
                  (e) => setSearch(e.target.value)
                }
              />
            </Search>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={"end"}
            gap={"8px"}
            marginBottom={"16px"}
            paddingLeft={"16px"}
          >
            <Button
              className={`text-white`}
              variant="contained"
              sx={{
                textTransform: "none",
                height: "35px",
                minWidth: "100px",
                padding: " 6px 0px",
              }}
              /* istanbul ignore next */
              onClick={() => {
                /* istanbul ignore next */
                setIsFormulation(false);
                /* istanbul ignore next */
                setApproveTab(false);
                /* istanbul ignore next */
                setIsUnapproveFormulation(0);
                /* istanbul ignore next */
                setFilterValue({});
              }}
            >
              Resource
            </Button>
            <Button
              className={`text-white`}
              {...(isFormulation ? { color: "secondary" } : {})}
              variant="contained"
              sx={{
                textTransform: "none",
                height: "35px",
                minWidth: "120px",
              }}
              data-testid="formulationTab"
              onClick={() => {
                setIsFormulation(true);
                setApproveTab(false);
                router.push(`?tab=formulation`);
              }}
            >
              Formulation
            </Button>
            <Button
              className={`text-white`}
              variant="contained"
              sx={{
                textTransform: "none",
                height: "35px",
              }}
              data-testid="approveresourcelist"
              onClick={() => {
                setIsFormulation(false);
                setApproveTab(true);
                handleFilterChange({ mode: "approve_resource" });
                router.push(`?tab=approveResource`);
              }}
            >
              Approve Resource
            </Button>
            <NextLink href={"/admin/resource/template/list"} passHref>
              <Button
                className={`text-white`}
                variant="contained"
                sx={{
                  textTransform: "none",
                  height: "35px",
                }}
                data-testid="templateList"
              >
                Templates
              </Button>
            </NextLink>
            <NextLink href={"/admin/resource/add"} passHref>
              <Button
                color={"secondary"}
                variant="contained"
                sx={{
                  textTransform: "none",
                  height: "35px",
                }}
              >
                Add Resource
              </Button>
            </NextLink>
            <NextLink href={"/admin/resource/create"} passHref>
              <Button
                color={"secondary"}
                variant="contained"
                sx={{
                  textTransform: "none",
                  height: "35px",
                }}
              >
                Create Resource
              </Button>
            </NextLink>
          </Grid>
        </Grid>
        {isFormulation ? (
          <Formulation />
        ) : (
          <>
            {isUnapproveFormulation == 0 && (
              <CrudForm
                fields={filterList}
                onFieldChange={(value) => {
                  /* istanbul ignore next */
                  handleFilterChange(value);
                }}
                values={filterValue}
              />
            )}
            {approveTab && (
              <Box display={"flex"} justifyContent={"flex-end"}>
                <CheckBoxLabelComponent
                  value="1"
                  name="formulation"
                  onChange={setCheckBox}
                  label="Formulation"
                  placement="end"
                  inputProps={{
                    "data-testid": "formulationCheckbox",
                  }}
                  checked={isUnapproveFormulation}
                  size="small"
                />
              </Box>
            )}
            <Box>
              <Loader
                visible={
                  loading || unapproveLoading || unapproveFormulationLoading
                }
              />
              <CardGenerator data={dataList} fields={fields} />
            </Box>
            <ApproveSureModal
              modalOpen={approveModal}
              setModalOpen={setApproveModal}
              msg={
                isUnapproveFormulation == 1
                  ? "Are you sure you want to approve this formulation?"
                  : "Are you sure want to approve this resource?"
              }
            >
              <Box marginTop="20px" display="flex" justifyContent="end">
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  data-testid="approveResourceModalCancelButton"
                  onClick={() => {
                    setApproveModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  sx={{ marginLeft: "5px" }}
                  size="small"
                  data-testid="approveResourceModalConfirmButton"
                  disabled={isMutating}
                  onClick={() => {
                    setApproveModal(false);
                    handleApprove(resourceId);
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </ApproveSureModal>
            <DeleteSureModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
              <Box marginTop="20px" display="flex" justifyContent="end">
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  data-testid="deleteResourceModalCancelButton"
                  /* istanbul ignore next */
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
                  /* istanbul ignore next */
                  onClick={() => {
                    setModalOpen(false);
                    handleDelete(resourceId);
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </DeleteSureModal>
          </>
        )}
      </Layout>
    </>
  );
};

export default withAuthentication(Resource, ["admin"]);

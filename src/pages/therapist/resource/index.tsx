import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Loader from "../../../components/common/Loader";
import { useSnackbar } from "notistack";

// GRAPHQL
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_RESOURCE_DATA,
  GET_DISORDER_MODEL_LIST,
  GET_CATEGORY,
  GET_PATIENT_LIST,
} from "../../../graphql/query/resource";
import {
  ADD_FAVOURITE,
  DELETE_RESOURCE,
  REMOVE_FAVOURITE,
  SHARE_RESOURCE,
} from "../../../graphql/mutation/resource";

// MUI COMPONENTS
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";
import { IconButton, Box, Button, useTheme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import RedoIcon from "@mui/icons-material/Redo";
import { AddButton } from "../../../components/common/Buttons";
import CardGenerator from "../../../components/common/CardGenerator";
import InputBase from "@mui/material/InputBase";
import Grid from "@mui/material/Grid";
import CrudForm from "../../../components/common/CrudForm";
import DeleteSureModal from "../../../components/admin/resource/DeleteSureModal";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Transition } from "../../../components/common/Transition";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";

import NextLink from "next/link";
import { GET_THERAPIST_TOKEN_DATA } from "../../../graphql/query/common";

// COMPONENT STYLES
const crudButtons = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  marginBottom: 1,
  flexDirection: "row",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
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
  const [shareResource] = useMutation(SHARE_RESOURCE);

  const [userId, setuserId] = useState<string>("");
  const [orgId, setorgId] = useState<string>("");
  const [shareResId, setshareResId] = useState<string>("");
  const [isPatientDialogOpen, setIsPatientDialogOpen] =
    useState<boolean>(false);
  const theme = useTheme();
  const [patientId, setPatientId] = useState<string[]>([]);
  const [isSubmitDisabled, setisSubmitDisabled] = useState<boolean>(true);

  const closeSelectDialog = () => {
    setIsPatientDialogOpen(false);
    setPatientId([]);
    setshareResId("");
  };

  useQuery(GET_THERAPIST_TOKEN_DATA, {
    onCompleted: async (data) => {
      /* istanbul ignore next */
      if (data.getTokenData) {
        const user_type: string = data!.getTokenData.user_type;

        /* istanbul ignore next */
        if (user_type !== "therapist") {
          window.location.href =
            "https://" + window.location.hostname + "/account";
        } else {
          setorgId(data!.getTokenData.therapist_data.org_id);
          setuserId(data!.getTokenData._id);
        }
      }
    },
  });

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
      orgId: orgId,
    },
  });

  const { data: disorderList } = useQuery(GET_DISORDER_MODEL_LIST);

  const { data: categoryList } = useQuery(GET_CATEGORY, {
    variables: {
      modelId: filterValue?.modelId ?? "",
    },
  });

  const { data: patientList } = useQuery(GET_PATIENT_LIST);

  useEffect(() => {
    // do some checking here to ensure data exist
    /* istanbul ignore next */
    refetch();
    if (!loading && dataListData) {
      /* istanbul ignore next */
      setDataList(dataListData?.getResourceList);
    }
  }, [dataListData]);

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
        <NextLink href={"/therapist/resource/" + value?._id} passHref>
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
          {/* {value?.user_id == userId && ( */}
          <IconButtonWrapper aria-label="create" size="small">
            <NextLink href={"/therapist/resource/edit/" + value._id} passHref>
              <CreateIcon />
            </NextLink>
          </IconButtonWrapper>
          {/* )} */}
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

          {value?.user_id == userId && (
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

          <IconButtonWrapper
            aria-label="share"
            size="small"
            data-testid={"shareIcon_" + value?._id}
            onClick={() => {
              setIsPatientDialogOpen(true);
              setshareResId(value?._id);
            }}
          >
            <RedoIcon />
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
        disabled: false,
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
        disabled: false,
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
        disabled: false,
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
        disabled: false,
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
        enqueueSnackbar("Resource has been deleted successfully!", {
          variant: "error",
        });
        refetch();
      },
    });
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
  };

  const handleChange = (event: SelectChangeEvent<typeof patientId>) => {
    const {
      target: { value },
    } = event;
    setisSubmitDisabled(false);
    /* istanbul ignore next */
    setPatientId(typeof value === "string" ? value.split(",") : value);
  };

  /* istanbul ignore next */
  const handleShare = async () => {
    /* istanbul ignore else */
    shareResource({
      variables: {
        resourceId: shareResId,
        patientId: patientId.join().toString(),
      },
      onCompleted: (data) => {
        if (data && data.therapistShareResource.result) {
          setPatientId([]);
          setshareResId("");
          enqueueSnackbar("Resource has been shared successfully!", {
            variant: "success",
          });
        }
        setIsPatientDialogOpen(false);
      },
    });
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
                onChange={
                  /* istanbul ignore next */
                  (e) => setSearchText(e.target.value)
                }
              />
            </Search>
          </Grid>
          <Grid item xs={9}>
            <Box sx={crudButtons}>
              <AddButton
                href="/v2/therapist/resource/add"
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
          <Loader visible={loading} />
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
        <Dialog
          data-testid="sharePatientDialogue"
          open={isPatientDialogOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={closeSelectDialog}
          aria-describedby="alert-dialog-slide-description"
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "500px", // Set your width here
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "transparent" }}>A</div>
            <div>{"Select Patient"}</div>
            <IconButton sx={{ justifySelf: "flex-end" }}>
              <CloseIcon data-testid="closeIcon" onClick={closeSelectDialog} />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              sx={{ padding: "30px 30px 5px 0" }}
              id="alert-dialog-slide-description"
            >
              <Select
                multiple
                id="selectPatient"
                displayEmpty
                value={patientId}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Select Patient to share</em>;
                  }
                  return patientList?.therapistPatientList
                    .filter((name) => selected.includes(name._id))
                    .map(
                      (record) =>
                        record.patient_firstname + " " + record.patient_lastname
                    )
                    .join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{
                  "aria-label": "Without label",
                  "data-testid": "selectPatient",
                }}
              >
                {patientList?.therapistPatientList.map((val) => (
                  <MenuItem key={val._id} value={val._id}>
                    {val.patient_firstname + " " + val.patient_lastname}
                  </MenuItem>
                ))}
              </Select>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <AddButton
              color="primary"
              data-testid="shareButton"
              sx={{
                paddingX: "2px",
                textTransform: "capitalize",
                color: "white",
              }}
              disabled={isSubmitDisabled}
              label="Share"
              onClick={() => {
                handleShare();
              }}
            />
          </DialogActions>
        </Dialog>
      </Layout>
    </>
  );
};

export default Resource;

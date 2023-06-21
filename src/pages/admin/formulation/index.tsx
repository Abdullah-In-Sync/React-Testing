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
import {
  IconButton,
  Box,
  Button,
  Tooltip,
  Typography,
  InputAdornment,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AddButton } from "../../../components/common/Buttons";
import Grid from "@mui/material/Grid";
import CrudForm from "../../../components/common/CrudForm";
import NextLink from "next/link";
import withAuthentication from "../../../hoc/auth";
import { useAppContext } from "../../../contexts/AuthContext";
import {
  GetFormulationList,
  GetFormulationListVars,
} from "../../../graphql/formulation/types";
import { GET_FORMULATION_LIST } from "../../../graphql/formulation/graphql";
import FormulationCardGenerator from "../../../components/common/formulationCardGenerator";

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

const Resource: NextPage = () => {
  // COMPONENT STATE
  const [filterValue, setFilterValue] = useState<any>({});
  const [dataList, setDataList] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [myFormulation, setMyFormulation] = useState<number>(0);
  const [myFavourite, setMyFavourite] = useState<number>(0);
  const {
    user: { _id: adminId },
  } = useAppContext();

  // GRAPHQL
  const {
    loading,
    data: dataListData,
    refetch,
  } = useQuery<GetFormulationList, GetFormulationListVars>(
    GET_FORMULATION_LIST,
    {
      variables: {
        my_fav: myFavourite,
        my_formulation: myFormulation,
        search_text: searchText,
      },
    }
  );

  useEffect(() => {
    // do some checking here to ensure data exist
    /* istanbul ignore next */
    if (!loading && dataListData) {
      console.log(dataListData, "dataListData");
      /* istanbul ignore next */
      if (dataListData?.getFormulationList == null) {
        console.log(
          dataListData?.getFormulationList,
          "dataListData?.getFormulationList"
        );
        setDataList([]);
      } else {
        setDataList(dataListData?.getFormulationList);
      }
    }
  }, [dataListData]);

  useEffect(() => {
    refetch();
  }, [searchText, myFavourite, myFormulation]);

  //**  TABLE DATA COLUMNS **//
  /* istanbul ignore next */

  const fields = [
    {
      key: "formulation_desc",
      visible: true,
    },
    {
      key: "formulation_name",
      visible: true,
      render: (_, value) => (
        <NextLink href={""} passHref>
          <Tooltip title={`${value?.formulation_name}`} placement="top">
            <Button
              variant="contained"
              style={{ boxShadow: "none", borderRadius: "0px" }}
              fullWidth
            >
              <Typography className="ellipsisTextWrapper" textAlign={"center"}>
                {`${value?.formulation_name}`}
              </Typography>
            </Button>
          </Tooltip>
        </NextLink>
      ),
    },
    {
      key: "actions",
      visible: true,
      render: (_, value) => (
        <>
          <IconButtonWrapper aria-label="create" size="small">
            <NextLink href={"/admin/resource/edit/" + value._id} passHref>
              <CreateIcon />
            </NextLink>
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

          {value?.user_id == adminId && (
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
        defaultValue: { label: "Filter", value: "" },
        show: true,
        type: "asynccomplete",
        options: [
          { value: "all_formulation", label: "All Formulation" },
          { value: "my_formulation", label: "My Formulation" },
          { value: "my_favourites", label: "My Favourites" },
        ],
      },
    ],
  ];

  const handleFilterChange = (value) => {
    console.log(value, "value");
    /* istanbul ignore next */
    setFilterValue(value);
    /* istanbul ignore next */
    if (value.mode == "") {
      setMyFormulation(0);
      setMyFavourite(0);
      window.location.reload();
    }
    if (value.mode == "all_formulation") {
      setMyFormulation(0);
      setMyFavourite(0);
    }
    if (value.mode == "my_formulation") {
      setMyFormulation(1);
      setMyFavourite(0);
    }
    if (value.mode == "my_favourites") {
      setMyFavourite(1);
      setMyFormulation(0);
    }
  };

  return (
    <>
      <Layout>
        <ContentHeader title="Library" />
        <Grid container spacing={2}>
          <Grid item xs={9} style={{ marginLeft: "391px" }}>
            <Box sx={crudButtons}>
              <AddButton
                href="/v2/admin/formulation"
                className="mr-3"
                label="Formulation"
              />
              <Button
                className={`text-white`}
                variant="contained"
                sx={{
                  textTransform: "none",
                  bottom: "4px",
                  height: "35px",
                  marginLeft: "8px",
                }}
                data-testid="approveresourcelist"
                onClick={() => {
                  handleFilterChange({ mode: "approve_resource" });
                }}
              >
                Approve Resource
              </Button>

              <div style={{ paddingLeft: "8px" }}>
                <Button
                  className={`text-white`}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    bottom: "4px",
                    height: "35px",
                  }}
                  data-testid="templateList"
                  href={"/v2/admin/resource/template/list"}
                >
                  Templates
                </Button>
              </div>
              <AddButton
                href="/v2/admin/resource/add"
                className="mr-3"
                label="Add Resource"
              />
              <AddButton
                href="/v2/admin/resource/create"
                className="mr-3"
                label="Create Resource"
              />
            </Box>
          </Grid>
        </Grid>

        <Box
          display={"flex"}
          style={{ marginBottom: "25px" }}
          gap={2}
          alignItems={"center"}
        >
          <TextField
            style={{
              marginBottom: "2px",
            }}
            variant="outlined"
            placeholder="Search"
            onChange={
              /* istanbul ignore next */
              (e) => setSearchText(e.target.value)
            }
            InputProps={{
              style: {
                width: "192px",
                height: "36.7px",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <CrudForm
            fields={filterList}
            onFieldChange={(value) => {
              /* istanbul ignore next */
              handleFilterChange(value);
            }}
            values={filterValue}
            page="formulation"
          />
        </Box>

        <Box>
          <Loader visible={loading} />
          <FormulationCardGenerator data={dataList} fields={fields} />
        </Box>
      </Layout>
    </>
  );
};

export default withAuthentication(Resource, ["admin"]);

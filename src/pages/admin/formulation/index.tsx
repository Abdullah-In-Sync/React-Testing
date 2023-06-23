import { useState, useEffect } from "react";
import Loader from "../../../components/common/Loader";

// GRAPHQL
import { useLazyQuery } from "@apollo/client";
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
import CrudForm from "../../../components/common/CrudForm";
import NextLink from "next/link";
import withAuthentication from "../../../hoc/auth";
import { useAppContext } from "../../../contexts/AuthContext";
import { GET_FORMULATION_LIST } from "../../../graphql/formulation/graphql";
import FormulationCardGenerator from "../../../components/common/formulationCardGenerator";
import { ShareOutlined } from "@mui/icons-material";

const IconButtonWrapper = styled(IconButton)(
  () => `
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
  background-color: #6EC9DB;
  color: #FFFFFF;
`
);

const Formulation = () => {
  const [filterValue, setFilterValue] = useState<any>({});
  const [dataList, setDataList] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [myFormulation, setMyFormulation] = useState<number>(0);
  const [myFavourite, setMyFavourite] = useState<number>(0);
  const {
    user: { _id: adminId },
  } = useAppContext();

  useEffect(() => {
    getFormulationList({
      variables: {
        my_fav: myFavourite,
        my_formulation: myFormulation,
        search_text: searchText,
      },
    });
  }, [searchText, myFavourite, myFormulation]);

  const [getFormulationList, { loading: loading }] = useLazyQuery(
    GET_FORMULATION_LIST,
    {
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        setDataList(data.getFormulationList);
        /* istanbul ignore next */
      },
      onError: () => {
        setDataList([]);
      },
    }
  );

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
          {value?.user_id == adminId && (
            <>
              <IconButtonWrapper
                data-testid={"deleteIcon_" + value?._id}
                aria-label="delete"
                size="small"
              >
                <DeleteIcon />
              </IconButtonWrapper>
              <IconButtonWrapper aria-label="create" size="small">
                <NextLink href={""} passHref>
                  <CreateIcon />
                </NextLink>
              </IconButtonWrapper>
            </>
          )}
          <IconButtonWrapper aria-label="favorite" size="small">
            <FavoriteBorderIcon
              data-testid={"fav_" + value?._id}
              id={"fav_" + value?._id}
              sx={{
                color:
                  value?.fav_res_detail && value?.fav_res_detail.length > 0
                    ? "red"
                    : "",
              }}
            />
          </IconButtonWrapper>
          <IconButtonWrapper aria-label="favorite" size="small">
            <ShareOutlined
              data-testid={"fav_" + value?._id}
              id={"fav_" + value?._id}
              sx={{
                color:
                  value?.fav_res_detail && value?.fav_res_detail.length > 0
                    ? "red"
                    : "",
              }}
            />
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
    </>
  );
};

export default withAuthentication(Formulation, ["admin"]);

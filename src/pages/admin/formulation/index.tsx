import { useState, useEffect, useRef } from "react";
import Loader from "../../../components/common/Loader";

// GRAPHQL
import { useLazyQuery, useMutation } from "@apollo/client";
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
import {
  ADD_FAV_FORMULATION,
  ADMIN_SHARE_FORMULATION,
  GET_FORMULATION_LIST,
  REMOVE_FAV_FORMULATION,
  UPDATE_ADMIN_FORMULATION_BY_ID,
} from "../../../graphql/formulation/graphql";
import FormulationCardGenerator from "../../../components/common/formulationCardGenerator";
import { ShareOutlined } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import ShareAssessmentForm from "../../../components/admin/assessement/shareAssessment/ShareAssessmentForm";
import { ModalElement } from "../../../components/common/CustomModal/CommonModal";

const IconButtonWrapper = styled(IconButton)(
  () => `
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
  background-color: #6EC9DB;
  color: #FFFFFF;
`
);

const Formulation = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<any>({});
  const [dataList, setDataList] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [myFormulation, setMyFormulation] = useState<number>(0);
  const [myFavourite, setMyFavourite] = useState<number>(0);
  const [addFavFormulation] = useMutation(ADD_FAV_FORMULATION);
  const [removeFavFormulation] = useMutation(REMOVE_FAV_FORMULATION);
  const [deleteFormulationId, setDeleteFormulationId] = useState<string>("");
  const [isConfirmCompleteTask, setIsConfirmCompleteTask] = useState(false);
  const shareInfoModalRef = useRef<ModalElement>(null);
  const [isConfirmShare, setIsConfirmShare] = useState(false);
  const [shareOrgIds, setShareOrgIds] = useState();
  const [selectFormulation, setSelectFormulation] = useState("");
  const [selectFormulationName, setSelectFormulationName] =
    useState<string>(",");

  console.log("Koca: deleteFormulationId ", deleteFormulationId);

  // Mutation
  const [deleteFormulation] = useMutation(UPDATE_ADMIN_FORMULATION_BY_ID);
  const [shareFormulation] = useMutation(ADMIN_SHARE_FORMULATION);

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

  const [getFormulationList, { loading: loading, refetch }] = useLazyQuery(
    GET_FORMULATION_LIST,
    {
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        setDataList(data.getFormulationList.data);
        /* istanbul ignore next */
      },
      onError: () => {
        /* istanbul ignore next */
        setDataList([]);
      },
    }
  );

  const addFavFormulationApi = async (formFields, index) => {
    setLoader(true);
    try {
      await addFavFormulation({
        variables: formFields,
        onCompleted: (data) => {
          const {
            addFavouriteFormulation: { fav_formulation_id = undefined } = {},
          } = data;
          if (fav_formulation_id) {
            enqueueSnackbar("Formulation added to favorites successfully", {
              variant: "success",
            });
            const tempDataList = JSON.parse(JSON.stringify(dataList));
            tempDataList[index]["fav_for_detail"] = [
              {
                _id: fav_formulation_id,
              },
            ];
            setDataList(tempDataList);
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  const removeFavFormulationApi = async (formFields, index) => {
    setLoader(true);
    try {
      await removeFavFormulation({
        variables: formFields,
        onCompleted: (data) => {
          const { deleteFavouriteFormulation: { deleted = undefined } = {} } =
            data;
          if (deleted) {
            enqueueSnackbar("Formulation removed from favorites successfully", {
              variant: "success",
            });
            const tempDataList = JSON.parse(JSON.stringify(dataList));
            tempDataList[index]["fav_for_detail"] = [];
            setDataList(tempDataList);
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", {
        variant: "error",
      });
    } finally {
      setLoader(false);
    }
  };

  const handleRemoveFavFormulation = ({ fav_formulation_id, index }) => {
    removeFavFormulationApi({ fav_formulation_id }, index);
  };

  const handleAddFavFormulation = ({ formulation_id, index }) => {
    addFavFormulationApi({ formulation_id }, index);
  };

  const toggleFav = (e, v, index) => {
    e.stopPropagation();
    const { _id: formulation_id, fav_for_detail = [] } = v;
    if (fav_for_detail.length > 0)
      handleRemoveFavFormulation({
        fav_formulation_id: fav_for_detail[0]["_id"],
        index,
      });
    else handleAddFavFormulation({ formulation_id, index });
  };

  /* istanbul ignore next */
  const onClickEdit = (e, value) => {
    e.stopPropagation();
    if (value.download_formulation_url === null) {
      router.push(`/admin/formulation/edit/${value._id}`);
    } else {
      router.push(`/admin/resource/editformulation/${value._id}`);
    }
  };

  /* istanbul ignore next */
  const deleteFormulationHandler = async () => {
    try {
      await deleteFormulation({
        variables: {
          formulation_id: deleteFormulationId,
          updateFormulation: {
            formulation_status: 0,
          },
        },
        onCompleted: () => {
          setIsConfirmCompleteTask(false);
          refetch();
          enqueueSnackbar("Formulation deleted successfully!", {
            variant: "success",
          });
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const clearIsConfirmCancel = () => {
    setIsConfirmCompleteTask(false);
  };

  const onPressShareFormulation = (formulationId: string, name: string) => {
    console.log(formulationId, name, "onclick share");
    setSelectFormulation(formulationId);
    setSelectFormulationName(name);
    shareInfoModalRef.current?.open();
  };

  /* istanbul ignore next */
  const fields = [
    {
      /* istanbul ignore next */
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
      render: (_, value, index) => (
        <>
          {value?.user_id == adminId && (
            <>
              <IconButtonWrapper
                aria-label="create"
                size="small"
                onClick={(e) => onClickEdit(e, value)}
              >
                <CreateIcon />
              </IconButtonWrapper>
              <IconButtonWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  onPressShareFormulation(value?._id, value?.formulation_name);
                }}
                aria-label="favorite"
                size="small"
                data-testid={"shareBtn_" + value?._id}
              >
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
          )}
          <IconButtonWrapper
            onClick={(e) => toggleFav(e, value, index)}
            data-testid={"fav_btn_" + value?._id}
            aria-label="favorite"
            size="small"
          >
            <FavoriteBorderIcon
              data-testid={"fav_" + value?._id}
              id={"fav_" + value?._id}
              sx={{
                color:
                  value?.fav_for_detail && value?.fav_for_detail.length > 0
                    ? "red"
                    : "",
              }}
            />
          </IconButtonWrapper>
          <IconButtonWrapper
            data-testid={"deleteIcon_" + value?._id}
            aria-label="delete"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setDeleteFormulationId(value?._id);
              setIsConfirmCompleteTask(true);
            }}
          >
            <DeleteIcon />
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
    /* istanbul ignore next */
    setFilterValue(value);
    /* istanbul ignore next */
    if (value.mode == "") {
      setMyFormulation(0);
      setMyFavourite(0);
      window.location.reload();
    }
    /* istanbul ignore next */
    if (value.mode == "all_formulation") {
      setMyFormulation(0);
      setMyFavourite(0);
    }
    /* istanbul ignore next */
    if (value.mode == "my_formulation") {
      setMyFormulation(1);
      setMyFavourite(0);
    }
    /* istanbul ignore next */
    if (value.mode == "my_favourites") {
      setMyFavourite(1);
      setMyFormulation(0);
    }
  };

  // share formulation
  const handleShareAssessment = async () => {
    try {
      await shareFormulation({
        variables: {
          formulation_id: selectFormulation,
          org_id: shareOrgIds,
        },
        onCompleted: (data) => {
          const {
            adminShareFormulation: { duplicateNames },
          } = data;

          if (duplicateNames) {
            /* istanbul ignore next */
            setIsConfirmShare(false);
            /* istanbul ignore next */
            shareInfoModalRef.current?.close();
          } else {
            shareInfoModalRef.current?.close();
            setIsConfirmShare(false);
            refetch();
            setSelectFormulation(undefined);
            setShareOrgIds(undefined);

            enqueueSnackbar("Formulation shared successfully!", {
              variant: "success",
            });
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };
  const receiveSharePlanIds = (value) => {
    const formattedValue = value.join(",");
    setShareOrgIds(formattedValue);
  };

  const clearIsConfirmShareCancel = () => {
    /* istanbul ignore next */
    setIsConfirmShare(false);
  };

  const onPressCard = (value) => {
    const { _id } = value;
    router.push(`/admin/formulation/view/${_id}`);
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
        <FormulationCardGenerator
          data={dataList}
          fields={fields}
          onPressCard={onPressCard}
        />
      </Box>
      <Loader visible={loader} />

      {isConfirmCompleteTask && (
        <ConfirmationModal
          label="Are you sure you want to delete this formulation?"
          onCancel={clearIsConfirmCancel}
          onConfirm={deleteFormulationHandler}
        />
      )}
      <ShareAssessmentForm
        isOpen={shareInfoModalRef}
        onPressSubmit={() => setIsConfirmShare(true)}
        selectAssessmentName={selectFormulationName}
        receivePlanId={receiveSharePlanIds}
        shareType={"Formulation"}
        headerTitleText={"Share formulation"}
      />
      {isConfirmShare && (
        <ConfirmationModal
          label="Are you sure you want to share the formulation?"
          onCancel={clearIsConfirmShareCancel}
          onConfirm={handleShareAssessment}
        />
      )}
    </>
  );
};

export default withAuthentication(Formulation, ["admin"]);

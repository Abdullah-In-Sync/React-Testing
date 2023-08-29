import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
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
  Grid,
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
  GET_FORMULATION_LIST,
  REMOVE_FAV_FORMULATION,
  THERAPIST_SHARE_FORMULATION_BY_ID,
  UPDATE_FORMULATION,
} from "../../../graphql/formulation/graphql";

import { ShareOutlined } from "@mui/icons-material";
import Layout from "../../../components/layout";
import ContentHeader from "../../../components/common/ContentHeader";
import { AddButton } from "../../../components/common/Buttons";
import FormulationCardGenerator from "../../../components/common/formulationCardGenerator";
import ConfirmWrapper, {
  ConfirmElement,
} from "../../../components/common/ConfirmWrapper";
import { UpdateFormulationData } from "../../../graphql/formulation/types";
import { useSnackbar } from "notistack";
import ShareAssessmentForm from "../../../components/admin/assessement/shareAssessment/ShareAssessmentForm";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { ModalElement } from "../../../components/common/CustomModal/CommonModal";

const IconButtonWrapper = styled(IconButton)(
  () => `
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  margin-right: 5px;
  background-color: #6EC9DB;
  color: #FFFFFF;
`
);
const crudButtons = {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  marginBottom: 1,
  flexDirection: "row",
};

const TherapistFormulation = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  const confirmRef = useRef<ConfirmElement>(null);
  const [filterValue, setFilterValue] = useState<any>({});
  const [dataList, setDataList] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [myFormulation, setMyFormulation] = useState<number>(0);
  const [myFavourite, setMyFavourite] = useState<number>(0);
  const shareInfoModalRef = useRef<ModalElement>(null);
  const [isConfirmShare, setIsConfirmShare] = useState(false);
  const [selectFormulationName, setSelectFormulationName] =
    useState<string>(",");
  const [shareOrgIds, setShareOrgIds] = useState();
  const [selectFormulation, setSelectFormulation] = useState("");
  const [updateFormulation] =
    useMutation<UpdateFormulationData>(UPDATE_FORMULATION);
  const [shareFormulation] = useMutation(THERAPIST_SHARE_FORMULATION_BY_ID);
  const [addFavFormlation] = useMutation(ADD_FAV_FORMULATION);
  const [deleteFavFormlation] = useMutation(REMOVE_FAV_FORMULATION);

  const {
    user: { _id: Id },
  } = useAppContext();
  console.log("Koca: Id ", Id);

  useEffect(() => {
    getFormulationList({
      variables: {
        my_fav: myFavourite,
        my_formulation: myFormulation,
        search_text: searchText,
      },
    });
  }, [searchText, myFavourite, myFormulation]);

  /* istanbul ignore next */
  const [
    getFormulationList,
    { loading: loading, refetch: refetchFormulationList },
  ] = useLazyQuery(GET_FORMULATION_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setDataList(data.getFormulationList);
      /* istanbul ignore next */
    },
    onError: () => {
      /* istanbul ignore next */
      setDataList([]);
    },
  });

  const deleteApi = async (value, doneCallback) => {
    setLoader(true);
    const { _id: formulation_id } = value;
    const variables = {
      formulation_id,
      updateFormulation: {
        formulation_status: 0,
      },
    };
    try {
      await updateFormulation({
        variables,
        onCompleted: (data) => {
          const { updateFormulationById } = data;
          if (updateFormulationById) {
            refetchFormulationList();
            enqueueSnackbar("Formulation deleted successfully.", {
              variant: "success",
            });
          }
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    } finally {
      doneCallback();
      setLoader(false);
    }
  };

  const handlePressEdit = (v) => {
    const { _id } = v;
    router.push(`/therapist/formulation/edit/${_id}`);
  };

  const handlePressDelete = (value) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => deleteApi(value, callback),
      description: "Are you sure you want to delete the formulation?",
    });
  };

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
      /* istanbul ignore next */
      key: "actions",
      visible: true,
      render: (_, value) => (
        <>
          {value?.user_id === Id && (
            <>
              <IconButtonWrapper
                data-testid={`editIcon_${value._id}`}
                aria-label="create"
                size="small"
                onClick={() => handlePressEdit(value)}
              >
                <CreateIcon />
              </IconButtonWrapper>
            </>
          )}

          <>
            <IconButtonWrapper
              data-testid={"deleteIcon_" + value?._id}
              aria-label="delete"
              size="small"
              onClick={() => handlePressDelete(value)}
            >
              <DeleteIcon />
            </IconButtonWrapper>
            <IconButtonWrapper
              data-testid={"fav_btn_" + value?._id}
              aria-label="favorite"
              size="small"
              onClick={() => {
                /* istanbul ignore next */
                if (value?.fav_for_detail.length) {
                  handlerRemoveFav(value.fav_for_detail[0]._id);
                } else {
                  handlerAddFav(value._id);
                }
              }}
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
              aria-label="favorite"
              size="small"
              data-testid={"shareBtn_" + value?._id}
              onClick={(e) => {
                e.stopPropagation();
                onPressShareFormulation(value?._id, value?.formulation_name);
              }}
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

  /* istanbul ignore next */
  const handleFilterChange = (value) => {
    setFilterValue(value);
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

  const receiveSharePlanIds = (value) => {
    const formattedValue = value.join(",");
    setShareOrgIds(formattedValue);
  };
  const clearIsConfirmShareCancel = () => {
    /* istanbul ignore next */
    setIsConfirmShare(false);
  };

  const onPressShareFormulation = (formulationId: string, name: string) => {
    console.log(formulationId, name, "onclick share");
    setSelectFormulation(formulationId);
    setSelectFormulationName(formulationId);
    shareInfoModalRef.current?.open();
  };

  // share formulation
  const handleShareAssessment = async () => {
    try {
      await shareFormulation({
        variables: {
          formulation_id: selectFormulation,
          patient_id: shareOrgIds,
        },
        onCompleted: (data) => {
          const {
            therapistShareFormulationById: { duplicateNames },
          } = data;

          if (duplicateNames) {
            /* istanbul ignore next */
            setIsConfirmShare(false);
            /* istanbul ignore next */
            shareInfoModalRef.current?.close();
          } else {
            shareInfoModalRef.current?.close();
            setIsConfirmShare(false);
            refetchFormulationList();
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
      console.log(e);
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const handlerAddFav = async (formulationId) => {
    try {
      await addFavFormlation({
        variables: {
          formulation_id: formulationId,
        },
        onCompleted: () => {
          enqueueSnackbar("Formulation added to favorites successfully", {
            variant: "success",
          });
          refetchFormulationList();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  const handlerRemoveFav = async (removeFormulationId) => {
    try {
      await deleteFavFormlation({
        variables: {
          fav_formulation_id: removeFormulationId,
        },
        onCompleted: () => {
          enqueueSnackbar("Formulation added to favorites successfully", {
            variant: "success",
          });
          refetchFormulationList();
        },
      });
    } catch (e) {
      /* istanbul ignore next */
      enqueueSnackbar("Something is wrong", { variant: "error" });
    }
  };

  /* istanbul ignore next */
  const onPressCard = () => {
    // Do something in future
  };
  return (
    <>
      <Layout>
        <ContentHeader title="Library" />

        <Grid item xs={9}>
          <Box sx={crudButtons}>
            <AddButton
              href="/therapist/resource"
              className="mr-3"
              label="Resource"
              data-testid={`resource`}
            />
            <AddButton
              href="/therapist/formulation"
              style={{
                backgroundColor: "#6EC9DB",
              }}
              className="mr-3"
              label="Formulation"
            />
            <AddButton
              href="/therapist/resource/add"
              className="mr-3"
              label="Add Resource"
            />
            <AddButton
              href="/therapist/resource/create"
              className="mr-3"
              label="Create Resource"
            />
          </Box>
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
            values={
              /* istanbul ignore next */
              filterValue
            }
            page="formulation"
          />
        </Box>
        <Box>
          <Loader visible={loading || loader} />
          <ConfirmWrapper ref={confirmRef}>
            <FormulationCardGenerator
              onPressCard={onPressCard}
              data={dataList}
              fields={fields}
            />
          </ConfirmWrapper>
        </Box>
      </Layout>
      <ShareAssessmentForm
        isOpen={shareInfoModalRef}
        onPressSubmit={() => setIsConfirmShare(true)}
        selectAssessmentName={selectFormulationName}
        receivePlanId={receiveSharePlanIds}
        shareType={"Formulation"}
        headerTitleText={"Share formulation"}
        listType={"patient"}
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

export default withAuthentication(TherapistFormulation, ["therapist"]);

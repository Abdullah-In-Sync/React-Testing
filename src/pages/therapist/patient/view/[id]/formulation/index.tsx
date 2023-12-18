import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import Loader from "../../../../../../components/common/Loader";
import { useLazyQuery, useMutation } from "@apollo/client";
import CommonTable from "../../../../../../components/common/CommonTable";
import moment from "moment";
import {
  GET_PAT_FORMULATION_LIST,
  THERAPIST_DELETE_FORMULATION_BY_ID,
} from "../../../../../../graphql/formulation/graphql";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../../../../../components/common/ConfirmationModal";
import { useRouter } from "next/router";
import { checkPrivilageAccess } from "../../../../../../utility/helper";

const TherapistPatientFormulation: NextPage = () => {
  const isDelete = checkPrivilageAccess("Formulation", "Delete");
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);
  const [formulationList, setFormulationList] = useState([]);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const id = sessionStorage.getItem("patient_id");
  const [deleteFormulation] = useMutation(THERAPIST_DELETE_FORMULATION_BY_ID);
  const router = useRouter();

  const [
    getPatFormulationList,
    { loading: loadingFormulationList, refetch: refetchFormulationList },
  ] = useLazyQuery(GET_PAT_FORMULATION_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      /* istanbul ignore next */
      let list = data.getPatFormulationList?.data?.map((f) => ({
        ...f,
        formulationId: f.formulation_data[0]._id,
        formulation_name: f.formulation_data[0].formulation_name,
        download_formulation_url:
          f.formulation_data[0].download_formulation_url,
        formulation_avail_for: f.formulation_data[0].formulation_avail_for,
        formulation_img: f.formulation_data[0].formulation_img,
        formulation_returnurl: f.formulation_data[0].formulation_returnurl,
        formulation_url: f.formulation_data[0].formulation_url,
        isAttachment:
          f.formulation_data[0].formulation_img == "" &&
          f.template_detail == null
            ? false
            : true,
      }));
      list = list?.map((f) => {
        return {
          ...f,
          created_date: moment(f.created_date).format("DD-MM-YYYY"),
        };
      });
      setFormulationList(list);
      setLoader(false);
    },
  });

  const handleDeleteFormulation = async () => {
    setLoader(true);
    try {
      const {
        data: { therapistDeleteFormulationById },
      } = await deleteFormulation({
        variables: {
          patient_formulation_id: selectedId,
        },
      });
      if (therapistDeleteFormulationById?.result) {
        enqueueSnackbar("Formulation deleted successfully.", {
          variant: "success",
        });
        refetchFormulationList();
      }
    } catch (e) {
      /* istanbul ignore next */
      console.log(e);
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      setIsConfirmDelete(false);
      setLoader(false);
    }
  };

  const clearIsConfirmDeleteCancel = () => {
    setIsConfirmDelete(false);
  };

  useEffect(() => {
    getPatFormulationList({
      variables: { patientId: id },
    });
  }, []);

  const formulationListHeader = [
    {
      id: "created_date",
      label: "Date",
    },
    {
      id: "formulation_name",
      label: "Formulation  Name",
    },
    {
      id: "actions",
      label: "Actions",
    },
  ];

  const iconButtonsFormulationData = [
    {
      id: "view",
      icon: require("@mui/icons-material/Visibility").default,
      styles: { background: "#ffffff" },
    },
    /* istanbul ignore next */
    isDelete && {
      id: "delete",
      icon: require("@mui/icons-material/DeleteSharp").default,
    },
    {
      id: "attachment",
      icon: require("@mui/icons-material/AttachFileOutlined").default,
    },
  ];

  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleActionButtonClick = (value) => {
    const { _id, pressedIconButton } = value;
    if (pressedIconButton == "delete") {
      setSelectedId(_id);
      setIsConfirmDelete(true);
    }
    if (pressedIconButton == "view") {
      router.push(`/therapist/patient/view/${id}/formulation/edit/${_id}`);
    }
  };

  return (
    <>
      <Loader visible={loader} />
      <ContentHeader title="Formulation" />
      <CommonTable
        data={{ list: formulationList, total: 0 }}
        pageActionButtonClick={handleActionButtonClick}
        loading={loadingFormulationList}
        headerData={formulationListHeader}
        hidePagination={true}
        actionButton={iconButtonsFormulationData}
      />
      {isConfirmDelete && (
        <ConfirmationModal
          label="Are you sure you want to delete the formulation?"
          onCancel={clearIsConfirmDeleteCancel}
          onConfirm={handleDeleteFormulation}
        />
      )}
    </>
  );
};
export default TherapistPatientFormulation;

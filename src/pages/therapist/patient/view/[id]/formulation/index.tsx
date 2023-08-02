import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import Loader from "../../../../../../components/common/Loader";
import { useLazyQuery } from "@apollo/client";
import CommonTable from "../../../../../../components/common/CommonTable";
import moment from "moment";
import { useRouter } from "next/router";
import { GET_PAT_FORMULATION_LIST } from "../../../../../../graphql/formulation/graphql";

const TherapistPatientFormulation: NextPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [formulationList, setFormulationList] = useState([]);
  const id = router?.query?.id;

  const [getPatFormulationList, { loading: loadingFormulationList }] =
    useLazyQuery(GET_PAT_FORMULATION_LIST, {
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        /* istanbul ignore next */
        let list = data.getPatFormulationList?.map((f) => ({
          ...f,
          ...f.formulation_data[0],
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
    {
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
    // const { _id } = value;
    // router.push(`formulation/edit/${_id}`);
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
    </>
  );
};
export default TherapistPatientFormulation;

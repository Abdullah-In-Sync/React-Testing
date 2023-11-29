import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import ContentHeader from "../../../common/ContentHeader";
import Loader from "../../../common/Loader";
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_FORMULATION_LIST } from "../../../../graphql/formulation/graphql";
import CommonTable from "../../../common/CommonTable";
import moment from "moment";
import { useRouter } from "next/router";

const PatientFormulation: NextPage = () => {
  const router = useRouter();
  const [loader, setLoader] = useState<boolean>(false);
  const [formulationList, setFormulationList] = useState([]);

  const [getPatientFormulationList, { loading: loadingFormulationList }] =
    useLazyQuery(GET_PATIENT_FORMULATION_LIST, {
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        /* istanbul ignore next */
        let list = data.getPatientFormulationList?.data?.map((f) => ({
          ...f,
          ...f.formulation_data[0],
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
    getPatientFormulationList();
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
  ];

  /* istanbul ignore next */
  const handleActionButtonClick = (value) => {
    const { _id } = value;
    router.push(`formulation/edit/${_id}`);
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
export default PatientFormulation;

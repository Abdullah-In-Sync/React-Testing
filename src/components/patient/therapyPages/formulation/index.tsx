import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import ContentHeader from "../../../common/ContentHeader";
import Loader from "../../../common/Loader";
import { useLazyQuery } from "@apollo/client";
import { GET_PATIENT_FORMULATION_LIST } from "../../../../graphql/formulation/graphql";
import CommonTable from "../../../common/CommonTable";
import moment from "moment";

const PatientFormulation: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const [formulationList, setFormulationList] = useState([]);

  const [getPatientFormulationList, { loading: loadingFormulationList }] =
    useLazyQuery(GET_PATIENT_FORMULATION_LIST, {
      fetchPolicy: "cache-and-network",
      onCompleted: (data) => {
        /* istanbul ignore next */
        let list = data.getPatientFormulationList.map(
          (f) => f.formulation_data[0]
        );
        list = list.map((f) => {
          return {
            ...f,
            created_date: moment(f.created_date).format("DD-MM-YYYY"),
          };
        });
        setFormulationList(list);
        console.log(list, "list");
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

  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  const handleActionButtonClick = (value) => {};

  return (
    <>
      <Loader visible={loader} />
      <ContentHeader title="Formulation" />
      <CommonTable
        data={{ list: formulationList, total: 0 }}
        pageActionButtonClick={handleActionButtonClick}
        loading={loadingFormulationList}
        headerData={formulationListHeader}
        view={"patientFormulation"}
      />
    </>
  );
};
export default PatientFormulation;

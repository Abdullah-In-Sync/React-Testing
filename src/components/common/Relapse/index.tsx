import React, { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Accordion } from "../Accordion";

import { GET_PATIENT_RELAPSE_PLANS } from "../../../graphql/Relapse/graphql";
import { GetPatientRelapsePlansRes } from "../../../graphql/Relapse/types";
import { Box } from "@material-ui/core";

type propTypes = {
  setLoader: any;
};

const RelapsePlan = (props: propTypes) => {
  const [getPatientRelapsePlans, { data: relapsePlanData, loading }] =
    useLazyQuery<GetPatientRelapsePlansRes>(GET_PATIENT_RELAPSE_PLANS, {
      onCompleted: () => {
        props.setLoader(false);
      },
      fetchPolicy: "no-cache",
    });

  useEffect(() => {
    getPatientRelapsePlans();
  }, []);

  return (
    <>
      {relapsePlanData?.getPatientRelapsePlans?.map((s) => (
        <Accordion
          key={s._id}
          title={s.name}
          detail={() => <span> detail </span>}
        />
      ))}
      {!loading && !relapsePlanData?.getPatientRelapsePlans?.length && (
        <Box marginTop={"10px"}>No data found</Box>
      )}
    </>
  );
};
export default RelapsePlan;

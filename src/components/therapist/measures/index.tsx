import { useLazyQuery } from "@apollo/client";
import * as React from "react";
import { GET_THERAPIST_MEASURES_LIST } from "../../../graphql/Measure/graphql";
import MeasureContent from "./MeasuresContent";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { TherapistMeasuresData } from "../../../graphql/Measure/types";
import Loader from "../../common/Loader";

const Measures: React.FC = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const patientId = id as string;
  const [
    getTherapistMeasuresList,
    {
      loading: loadingMeasuresList,
      data: { therapistListMeasures: listData = [] } = {},
    },
  ] = useLazyQuery<TherapistMeasuresData>(GET_THERAPIST_MEASURES_LIST, {
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    getTherapistMeasuresList({
      variables: { patientId },
    });
  }, []);

  /* istanbul ignore next */
  const handleCreateMeasure = () => {
    router.push(`/therapist/patient/view/${patientId}/measures/create`);
  };

  /* istanbul ignore next */
  const actionButtonClick = (v) => {
    const { pressedIconButton, _id } = v;
    switch (pressedIconButton) {
      case "edit":
        return router.push(
          `/therapist/patient/view/${patientId}/measures/edit/${_id}`
        );
    }
  };

  if (loadingMeasuresList) return <Loader visible={true} />;

  return (
    <MeasureContent
      listData={listData}
      onClickCreateMeasure={handleCreateMeasure}
      actionButtonClick={actionButtonClick}
    />
  );
};

export default Measures;

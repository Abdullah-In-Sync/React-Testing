import { useQuery } from "@apollo/client";
import { FC } from "react";
import { GET_PATIENT_MEASURE_LIST } from "../../../graphql/query/Measure/graphql";
import {
  GetPatientMeasureListRes,
  GetPatientMeasureListVars,
} from "../../../graphql/query/Measure/types";
import Loader from "../../common/Loader";
import { MeasureTile } from "./measureTile";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MeasureListProps {}

const MeasureList: FC<MeasureListProps> = () => {
  const { data: measureListRes, loading } = useQuery<
    GetPatientMeasureListRes,
    GetPatientMeasureListVars
  >(GET_PATIENT_MEASURE_LIST);

  return (
    <>
      <Loader visible={loading} />
      {measureListRes?.getPatientMeasureList?.map((measure) => (
        <MeasureTile measure={measure} />
      ))}
    </>
  );
};

export default MeasureList;

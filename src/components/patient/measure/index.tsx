import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { GET_PATIENT_MEASURE_LIST } from "../../../graphql/Measure/graphql";
import {
  GetPatientMeasureListRes,
  GetPatientMeasureListVars,
  Measure,
} from "../../../graphql/Measure/types";
import Loader from "../../common/Loader";
import { SuccessModal } from "../../common/SuccessModal";
import { MeasureTile } from "./measureTile";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MeasureListProps {}

const MeasureList: FC<MeasureListProps> = () => {
  const router = useRouter();
  const [errorModal, setErrorModal] = useState(false);
  const [testErrorModal, setTestErrorModal] = useState(false);

  const { data: measureListRes, loading } = useQuery<
    GetPatientMeasureListRes,
    GetPatientMeasureListVars
  >(GET_PATIENT_MEASURE_LIST, {
    fetchPolicy: "no-cache",
  });

  const onClickTest = (measure: Measure) => {
    const lastTestDate = measure?.last_completed_date?.split("T")[0];
    const todayDate = new Date().toISOString().split("T")[0];
    if (measure?.last_completed_date && lastTestDate == todayDate) {
      setTestErrorModal(true);
    } else {
      router.push(`/patient/measure/test/${measure._id}`);
    }
  };
  const onClickScore = (measure: Measure) => {
    if (measure?.last_completed_date) {
      router.push(`/patient/measure/score/${measure._id}`);
    } else {
      setErrorModal(true);
    }
  };

  return (
    <>
      <Loader visible={loading} />
      {measureListRes?.getPatientMeasureList?.map((measure) => (
        <MeasureTile
          measure={measure}
          onClickScore={onClickScore}
          onClickTest={onClickTest}
        />
      ))}
      {errorModal && (
        <SuccessModal
          isOpen={errorModal}
          icon={
            <Image
              alt="My Help"
              src="/images/error.png"
              height="67"
              width="67"
            />
          }
          title="Error"
          description="No Score information is available"
          onOk={() => {
            setErrorModal(false);
          }}
        />
      )}
      {testErrorModal && (
        <SuccessModal
          isOpen={testErrorModal}
          icon={
            <Image
              alt="My Help"
              src="/images/error.png"
              height="67"
              width="67"
            />
          }
          title="Error"
          description="Today test has been taken already"
          onOk={() => {
            setTestErrorModal(false);
          }}
        />
      )}
    </>
  );
};

export default MeasureList;

import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { GET_PAITENT_MEASURES_LIST } from "../../../graphql/Measure/graphql";
import {
  PatientListMeasureData,
  PatientMeasureListEntity,
} from "../../../graphql/Measure/types";
import {
  checkPrivilageAccess,
  getSessionOptions,
  getfiterObject,
  isAfter,
} from "../../../utility/helper";
import Loader from "../../common/Loader";
import { SuccessModal } from "../../common/SuccessModal";
import { MeasureTile } from "./measureTile";

const MeasureList: FC = () => {
  const router = useRouter();
  const [errorModal, setErrorModal] = useState(false);
  const [testErrorModal, setTestErrorModal] = useState(false);
  const sessionOptions = getSessionOptions();

  const isViewScore = checkPrivilageAccess("Measures", "View");
  const isTakeTest = checkPrivilageAccess("Measures", "Update response");

  const { data: { patientMeasureList = null } = {}, loading } =
    useQuery<PatientListMeasureData>(GET_PAITENT_MEASURES_LIST, {
      fetchPolicy: "no-cache",
    });

  const onClickTest = (measure: PatientMeasureListEntity) => {
    const { score_date } = measure;
    if (isAfter({ date: score_date }))
      router.push(`/patient/measures/test/${measure._id}`);
    else setTestErrorModal(true);
  };
  const onClickScore = (measure: PatientMeasureListEntity) => {
    const { score_date } = measure;
    if (score_date && score_date != "") {
      router.push(`/patient/measures/score/${measure._id}`);
    } else {
      setErrorModal(true);
    }
  };

  return (
    <>
      <Loader visible={loading} />
      {(patientMeasureList?.data || [])?.map((measure) => (
        <MeasureTile
          measure={measure}
          onClickScore={onClickScore}
          onClickTest={onClickTest}
          sessionObj={getfiterObject(sessionOptions, measure?.session_no)}
          isViewScore={isViewScore}
          isTakeTest={isTakeTest}
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
          description="Today’s test has been taken already"
          onOk={() => {
            setTestErrorModal(false);
          }}
        />
      )}
    </>
  );
};

export default MeasureList;

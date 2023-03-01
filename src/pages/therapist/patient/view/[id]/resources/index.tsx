import { useLazyQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Patients from "../../../../../../components/therapist/patient";
import { GET_PATH_RESOURCE_LIST } from "../../../../../../graphql/query/resource";
import Loader from "../../../../../../components/common/Loader";

const PatientEditTemplatePage2: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const router = useRouter();

  const { id: patientId } = router.query || {};

  const [getPatientResourceList, { data: { getPatResourceList = [] } = {} }] =
    useLazyQuery(GET_PATH_RESOURCE_LIST, {
      onCompleted: () => {
        setLoader(false);
      },
    });

  useEffect(() => {
    setLoader(true);
    getPatientResourceList({
      variables: { patientId },
    });
  }, []);

  const handleIconButtonClick = (value) => {
    const { resource_id, pressedIconButton } = value;
    if (pressedIconButton == "view")
      router.push(`/therapist/resource/${resource_id}/${patientId}`);
  };

  return (
    <>
      <Loader visible={loader} />
      {patientId && (
        <Patients
          patientResourceList={getPatResourceList}
          buttonClick={handleIconButtonClick}
        />
      )}
    </>
  );
};

export default PatientEditTemplatePage2;

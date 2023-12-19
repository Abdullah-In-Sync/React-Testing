import { useLazyQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { ResourceDataInterface } from "../../../../../components/patient/resource/edit/patientTemplateEditInterface";
import ResourceDetail from "../../../../../components/therapist/resource/ResourceDetail";
import { GET_PATH_RESOURCE_BY_ID } from "../../../../../graphql/query/resource";

const PatientResourceDetailPage: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [resourceData, setRecourceData] = useState({} as ResourceDataInterface);
  const router = useRouter();
  /* istanbul ignore next */
  const { patientId, id: resourceId } = router.query || {};

  const [getPatientResourceDetail] = useLazyQuery(GET_PATH_RESOURCE_BY_ID, {
    onCompleted: (data) => {
      /* istanbul ignore next */
      if (data!.getPatResourceById) {
        const resourceDetail = data!.getPatResourceById.data[0];
        if (resourceDetail) {
          setRecourceData(resourceDetail?.resource_data[0]);
        }
      }
      setLoader(false);
    },
  });

  useEffect(() => {
    setLoader(true);
    getPatientResourceDetail({
      variables: { resourceId, patientId },
    });
  }, []);

  const handleNextButton = () => {
    router.push(`/therapist/resource/view/${patientId}/${resourceId}`);
  };

  const onPressBack = () => {
    router.back();
  };

  return (
    <>
      <Layout boxStyle={{ height: "100vh" }} cardClass="layoutCard">
        <Loader visible={loader} />
        <ContentHeader title={"Resource Detail"} />
        <ResourceDetail
          handleNextButton={handleNextButton}
          resourceData={resourceData}
          onPressBack={onPressBack}
        />
      </Layout>
    </>
  );
};

export default PatientResourceDetailPage;

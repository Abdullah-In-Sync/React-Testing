import { useLazyQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import Loader from "../../../../../../components/common/Loader";
import Layout from "../../../../../../components/layout";
import PatientEditTemplate from "../../../../../../components/patient/resource/edit";
import {
  ResourceDataInterface,
  TemplateDetailInterface,
} from "../../../../../../components/patient/resource/edit/patientTemplateEditInterface";
import { GET_PATH_RESOURCE_BY_ID } from "../../../../../../graphql/query/resource";

const PatientEditTemplatePage: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [resourceData, setRecourceData] = useState<ResourceDataInterface>();
  const [templateDetail, setTemplateDetail] =
    useState<TemplateDetailInterface>();
  const [templateResponse, setTemplateResponse] = useState<string>();
  const router = useRouter();

  const { patientId, resourceId } = router.query || {};

  if (!patientId || !resourceId) return null;

  const [getPatientResourceDetail] = useLazyQuery(GET_PATH_RESOURCE_BY_ID, {
    onCompleted: (data) => {
      if (data!.getPatResourceById) {
        const resourceDetail = data!.getPatResourceById[0];
        if (resourceDetail) {
          setTemplateDetail(resourceDetail?.template_detail);
          setRecourceData(resourceDetail?.resource_data[0]);
          setTemplateResponse(resourceDetail?.template_response);
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

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title={"Resource Detail"} />
        <PatientEditTemplate
          resourceData={resourceData}
          templateDetail={templateDetail}
          mode={`patientView`}
          templateResponse={templateResponse}
        />
      </Layout>
    </>
  );
};

export default PatientEditTemplatePage;

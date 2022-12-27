import { useLazyQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import PatientEditTemplate from "../../../../../components/patient/resource/edit";
import {
  ResourceDataInterface,
  TemplateDetailInterface,
} from "../../../../../components/patient/resource/edit/patientTemplateEditInterface";
import { GET_RESOURCE_DETAIL } from "../../../../../graphql/query/resource";

const PatientEditTemplatePage: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const [resourceData, setRecourceData] = useState<ResourceDataInterface>();
  const [templateDetail, setTemplateDetail] =
    useState<TemplateDetailInterface>();
  const [templateResponse, setTemplateResponse] = useState<string>();
  const router = useRouter();

  const id = router?.query?.id as string;

  const [getPatientResourceDetail] = useLazyQuery(GET_RESOURCE_DETAIL, {
    onCompleted: (data) => {
      /* istanbul ignore else */
      if (data!.getResourceById) {
        /* istanbul ignore else */
        const resourceDetail = data!.getResourceById[0];
        if (resourceDetail) {
          /* istanbul ignore else */
          setTemplateDetail(resourceDetail?.template_detail);
          // setRecourceData(resourceDetail?.resource_data[0]);
          // setTemplateResponse(resourceDetail?.template_response);
          setRecourceData(resourceDetail);
        }
      }
      /* istanbul ignore else */
      setLoader(false);
    },
  });

  useEffect(() => {
    setLoader(true);
    getPatientResourceDetail({
      variables: { resourceId: id },
    });
  }, []);

  const handleBackButton = (): any => {
    router.push(`/therapist/resource/${id}`);
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title={"Resource Detail"} />
        <PatientEditTemplate
          resourceData={resourceData}
          templateDetail={templateDetail}
          templateResponse={templateResponse}
          mode={`patientView`}
          onPressBack={handleBackButton}
        />
      </Layout>
    </>
  );
};

export default PatientEditTemplatePage;

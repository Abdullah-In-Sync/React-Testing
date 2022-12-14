import { useLazyQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Layout from "../../../../../components/layout";

import {
  GET_PATIENT_RESOURCE_TEMPLATE
} from "../../../../../graphql/query/resource";

import { ResourceDataInterface, TemplateDetailInterface } from "../../../../../components/patient/resource/edit/patientTemplateEditInterface";

import PatientEditTemplate from "../../../../../components/patient/resource/edit";

const TemplateList: NextPage = () => {
  const [resourceData, setRecourceData] = useState<ResourceDataInterface>()
  const [templateDetail, setTemplateDetail] = useState<TemplateDetailInterface>()
  const router = useRouter();

  const id = router.query.id as string;

  const [
    getPatientResourceTemplate,
    { loading: resourceLoading, data: patientResourceData },
  ] = useLazyQuery(GET_PATIENT_RESOURCE_TEMPLATE, {
    onCompleted: (data) => {
      /* istanbul ignore else */
      const resourceDetail = data!.getResourceDetailById[0]
      console.log('data!.getResourceDetailById>>>>', resourceDetail.resource_data[0])
      if (resourceDetail) {
        setTemplateDetail(resourceDetail?.template_detail)
        setRecourceData(resourceDetail?.resource_data[0])
      }
    },
  });

  useEffect(() => {
    getPatientResourceTemplate({
      variables: { ptsharresId: id },
    });
  }, []);

  return (
    <>
      <Layout>
        <ContentHeader title="Resource Edit" />
        <PatientEditTemplate resourceData={resourceData} templateDetail={templateDetail} onSubmit={(v) => console.log('onSubmitvalue', v)} />
      </Layout>
    </>
  );
};

export default TemplateList;

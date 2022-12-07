import { useLazyQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ViewTemplate from "../../../../../../components/admin/resource/templates/view";
import { ViewTemplateData } from "../../../../../../components/admin/resource/templates/view/viewInterface";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import Layout from "../../../../../../components/layout";
import { GET_TEMPLATE_DETAIL } from "../../../../../../graphql/query/resource";

const View: NextPage = () => {
  const [currentTemplateData, setCurrentTemplateData] =
    useState<ViewTemplateData>();

  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query.id as string;

  const [getTemplateViewData] = useLazyQuery(GET_TEMPLATE_DETAIL, {
    /* istanbul ignore next */
    onCompleted: (data) => {
      /* istanbul ignore next */
      setCurrentTemplateData(data?.getTemplateById);
    },
  });

  useEffect(() => {
    getTemplateViewData({
      variables: { templateId: id },
    });
  }, []);

  return (
    <>
      <Layout>
        <ContentHeader title="Template Preveiw" />
        {currentTemplateData && <ViewTemplate currentTemplateData={currentTemplateData} /> }
      </Layout>
    </>
  );
};

export default View;

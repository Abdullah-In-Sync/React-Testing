import { useLazyQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ViewTemplate from "../../../../../../components/admin/resource/templates/view";
import { ViewTemplateData } from "../../../../../../components/admin/resource/templates/view/view.model";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import Layout from "../../../../../../components/layout";
import { GET_TEMPLATE_DETAIL } from "../../../../../../graphql/query/resource";

const defaultFormValue = {
  _id: "",
  category: "",
  name: "Test",
  component_name: "TemplateTable",
};

const View: NextPage = () => {
  const [currentTemplateData, setCurrentTemplateData] =
    useState<ViewTemplateData>(defaultFormValue);

  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query.id as string;

  const [getResourceData] = useLazyQuery(GET_TEMPLATE_DETAIL, {
    /* istanbul ignore next */
    onCompleted: (data) => {
      /* istanbul ignore next */
      setCurrentTemplateData(data?.getTemplateById);
    },
  });

  useEffect(() => {
    getResourceData({
      variables: { templateId: id },
    });
  }, []);

  return (
    <>
      <Layout>
        <ContentHeader title="Template Preveiw" />
        <ViewTemplate currentTemplateData={currentTemplateData} />
      </Layout>
    </>
  );
};

export default View;
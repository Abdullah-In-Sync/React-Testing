import { NextPage } from "next";
import ContentHeader from "../../../components/common/ContentHeader";
import Layout from "../../../components/layout";
import TemplatePreview from "../../../components/template/Preview";

import { useRouter } from "next/router";
import withAuthentication from "../../../hoc/auth";

const ResourcePreview: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  const { data } = JSON.parse(sessionStorage.getItem(id as string));

  return (
    <Layout>
      <ContentHeader title="Preview Resource" />
      <TemplatePreview initialData={data} />
    </Layout>
  );
};

export default withAuthentication(ResourcePreview, ["admin", "therapist"]);

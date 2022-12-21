import { NextPage } from "next";
import ContentHeader from "../../../components/common/ContentHeader";
import Layout from "../../../components/layout";
import TemplatePreview from "../../../components/template/Preview";
import { CustomBreadcrumbs } from "../../../components/common/Breadcrumbs";

import withAuthentication from "../../../hoc/auth";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";

const ResourcePreview: NextPage = () => {
  const breadcrumbsPathLabels: Array<string> = ["Library", "Grid"];
  const {
    query: { id },
  } = useRouter();

  const { data, name } = JSON.parse(sessionStorage.getItem(id));

  return (
    <Layout>
      <ContentHeader title="Preview Resource" />
      <Grid
        container
        justifyContent={"end"}
        alignItems="center"
        margin={"43px 0px 15px 0px"}
      >
        <CustomBreadcrumbs labels={[...breadcrumbsPathLabels, ...[name]]} />
      </Grid>
      <TemplatePreview initialData={data} />
    </Layout>
  );
};

export default withAuthentication(ResourcePreview, ["admin", "therapist"]);

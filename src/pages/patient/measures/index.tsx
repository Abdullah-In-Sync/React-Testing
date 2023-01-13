import { NextPage } from "next";
import ContentHeader from "../../../components/common/ContentHeader";
import Layout from "../../../components/layout";
import MeasureList from "../../../components/patient/measures";
import withAuthentication from "../../../hoc/auth";

const Measure: NextPage = () => {
  return (
    <>
      <Layout>
        <ContentHeader title="Measures" />
        <MeasureList />
      </Layout>
    </>
  );
};

export default withAuthentication(Measure, ["patient"]);

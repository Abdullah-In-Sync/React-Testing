import { NextPage } from "next";
import ContentHeader from "../../../components/common/ContentHeader";
import MeasureList from "../../../components/patient/measures";
import withAuthentication from "../../../hoc/auth";

const Measure: NextPage = () => {
  return (
    <>
      <ContentHeader title="Measures" />
      <MeasureList />
    </>
  );
};

export default withAuthentication(Measure, ["patient"]);

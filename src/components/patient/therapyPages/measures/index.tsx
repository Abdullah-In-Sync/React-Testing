import { NextPage } from "next";
import withAuthentication from "../../../../hoc/auth";
import ContentHeader from "../../../common/ContentHeader";
import MeasureList from "../../../patient/measures";

const Measure: NextPage = () => {
  return (
    <>
      <ContentHeader title="Measures" />
      <MeasureList />
    </>
  );
};

export default withAuthentication(Measure, ["patient"]);

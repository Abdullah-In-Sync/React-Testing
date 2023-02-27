import type { NextPage } from "next";
import Layout from "../../../components/layout";
import withAuthentication from "../../../hoc/auth";
import Course from "../../../components/patient/course/Course";

const PatientById: NextPage = () => {
  return (
    <>
      <Layout>
        <Course />
      </Layout>
    </>
  );
};
export default withAuthentication(PatientById, ["patient"]);

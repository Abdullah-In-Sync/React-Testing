import type { NextPage } from "next";
import TherapistHomeComponent from "../../../components/therapist/home";
import Layout from "../../../components/layout";

const TherpaistDashboard: NextPage = () => {
  return (
    <>
      <Layout>
        <TherapistHomeComponent />
      </Layout>
    </>
  );
};

export default TherpaistDashboard;

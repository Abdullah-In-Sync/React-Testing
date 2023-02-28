import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import Course from "../../../components/patient/course/Course";
import withAuthentication from "../../../hoc/auth";

const b2b_redirect_url =
  "https://actions.learning.dev/learner/browse/56b3982f-49e1-362f-b02c-9aec72e33d4c";

const PatientById: NextPage = () => {
  const router = useRouter();
  const handleUseFulInfo = () => {
    router.push("/patient/resource");
  };
  const handleContinueButtonClick = () => {
    const newTab = window.open();
    newTab.opener = null;
    newTab.location = b2b_redirect_url;
  };
  return (
    <>
      <Layout boxStyle={{ height: "100vh" }}>
        <Course
          handleUseFulInfo={handleUseFulInfo}
          handleContinueButtonClick={handleContinueButtonClick}
        />
      </Layout>
    </>
  );
};
export default withAuthentication(PatientById, ["patient"]);

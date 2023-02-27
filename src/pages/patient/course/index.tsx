import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import Course from "../../../components/patient/course/Course";
import withAuthentication from "../../../hoc/auth";

const b2b_redirect_url =
  process.env.NEXT_PUBLIC_ENVIRONMENT == "dev"
    ? null
    : "https://actions.learning.dev/learner/browse/56b3982f-49e1-362f-b02c-9aec72e33d4c";

const PatientById: NextPage = () => {
  const router = useRouter();
  const handleUseFulInfo = () => {
    router.push("/patient/resource");
  };
  const handleContinueButtonClick = () => {
    if (b2b_redirect_url) window.open(b2b_redirect_url, "_blank");
  };
  return (
    <>
      <Layout>
        <Course
          handleUseFulInfo={handleUseFulInfo}
          handleContinueButtonClick={handleContinueButtonClick}
        />
      </Layout>
    </>
  );
};
export default withAuthentication(PatientById, ["patient"]);

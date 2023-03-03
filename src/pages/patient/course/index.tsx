import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import Course from "../../../components/patient/course";
import { useAppContext } from "../../../contexts/AuthContext";
import withAuthentication from "../../../hoc/auth";
import { env } from "../../../lib/env";

const b2b_redirect_url = env.btb.course1.url;

const PatientById: NextPage = () => {
  const router = useRouter();
  const { user } = useAppContext();
  /* istanbul ignore next */
  const {
    patient_data: { patient_consent, patient_contract },
  } = user;

  const handleUseFulInfo = () => {
    router.push("/patient/resource");
  };

  /* istanbul ignore next */
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  /* istanbul ignore next */
  const handleContinueButtonClick = () => {
    openInNewTab(b2b_redirect_url);
  };

  const handleOk = () => {
    /* istanbul ignore next */
    if (patient_consent && patient_contract) handleContinueButtonClick();
    /* istanbul ignore next */ else router.push("/patient/view/");
  };
  return (
    <>
      <Layout>
        <Course
          handleUseFulInfo={handleUseFulInfo}
          handleContinueButtonClick={handleContinueButtonClick}
          handleOk={handleOk}
          isAgreed={patient_consent && patient_contract}
        />
      </Layout>
    </>
  );
};
export default withAuthentication(PatientById, ["patient"]);

import { useQuery } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import Loader from "../../../../../../components/common/Loader";
import Layout from "../../../../../../components/layout";
import ViewResponse from "../../../../../../components/patient/measures/ViewResponse/ViewResponse";
import { PATIENT_VIEW_SCORE } from "../../../../../../graphql/Measure/graphql";
import withAuthentication from "../../../../../../hoc/auth";

const PatientResponsePage: NextPage = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const scoreId = id as string;

  const {
    loading: loadingMeasureData,
    data: { patientViewScore: measureData = null } = {},
  } = useQuery(PATIENT_VIEW_SCORE, {
    variables: {
      scoreId,
    },
    fetchPolicy: "network-only",
  });
  console.log("Koca: measureData ", measureData);

  /* istanbul ignore next */
  const handleBackButton = () => {
    router.back();
  };

  return (
    <>
      <Layout>
        <ContentHeader title="Measures" />
        <Loader visible={loadingMeasureData} />
        <ViewResponse
          backButtonClick={handleBackButton}
          measureData={measureData?.data}
        />
      </Layout>
    </>
  );
};

export default withAuthentication(PatientResponsePage, ["patient"]);

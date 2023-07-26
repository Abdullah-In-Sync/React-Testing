import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import { ConfirmInfoElement } from "../../../../../components/common/CustomModal/InfoModal";
import Loader from "../../../../../components/common/Loader";

import { queryMasterData } from "../../../../../components/admin/therapist/hook/fetchDropdown";
import ViewTherapistForm from "../../../../../components/admin/therapist/view/ViewTherapist";
import { ConfirmElement } from "../../../../../components/common/ConfirmWrapper";
import Layout from "../../../../../components/layout";
import { GET_THERAPIST_BY_ID } from "../../../../../graphql/Therapist/graphql";
import { TherapistData } from "../../../../../graphql/Therapist/types";
import { GET_ORGANIZATION_LIST } from "../../../../../graphql/query/organization";

const ViewTherapistPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { id: therapistId },
  } = router;
  const confirmRef = useRef<ConfirmElement>(null);

  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ConfirmInfoElement>(null);
  const [specializationQuery, professionalQuery, planTrialQuery] =
    queryMasterData();

  const { data: { getMasterData: specialization = undefined } = {} } =
    specializationQuery;
  const { data: { getMasterData: professional = undefined } = {} } =
    professionalQuery;
  const { data: { getMasterData: plan_trial = undefined } = {} } =
    planTrialQuery;

  const [
    getTherapist,
    { data: { getTherapistById: therapistData = undefined } = {} },
  ] = useLazyQuery<TherapistData>(GET_THERAPIST_BY_ID, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  const [
    getOrgList,
    { data: { getOrganizationData: organizationList = [] } = {} },
  ] = useLazyQuery(GET_ORGANIZATION_LIST, {
    onCompleted: () => {
      /* istanbul ignore next */
      setLoader(false);
    },
  });

  useEffect(() => {
    getOrgList();
    getTherapist({
      variables: {
        user_id: therapistId,
      },
    });
  }, []);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="View Therapist" />
        {specialization && professional && plan_trial && therapistData && (
          <ViewTherapistForm
            organizationList={organizationList}
            confirmRef={confirmRef}
            infoModalRef={infoModalRef}
            therapistData={therapistData}
            masterData={{
              specialization,
              professional,
              plan_trial,
            }}
          />
        )}
      </Layout>
    </>
  );
};

export default ViewTherapistPage;

import { useLazyQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ViewFormulation from "../../../../../components/admin/formulation/view/ViewFormulation";
import ContentHeader from "../../../../../components/common/ContentHeader";
import { ModalElement } from "../../../../../components/common/CustomModal/CommonModal";
import Loader from "../../../../../components/common/Loader";
import Layout from "../../../../../components/layout";
import { GET_FORMULATION_BY_ID } from "../../../../../graphql/formulation/graphql";
import { FormulationData } from "../../../../../graphql/formulation/types";

const ViewFormulationPage: NextPage = () => {
  const router = useRouter();
  const { query: { id: formulation_id } = {} } = router;
  const [loader, setLoader] = useState<boolean>(true);
  const infoModalRef = useRef<ModalElement>(null);

  const [
    getFormulation,
    { data: { getFormulationById: formulationData = undefined } = {} },
  ] = useLazyQuery<FormulationData>(GET_FORMULATION_BY_ID, {
    fetchPolicy: "cache-and-network",
    onCompleted: () => {
      setLoader(false);
    },
  });

  useEffect(() => {
    getFormulation({
      variables: { formulation_id },
    });
  }, []);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Formulation Detail" />
        {formulationData && (
          <ViewFormulation data={formulationData} infoModalRef={infoModalRef} />
        )}
      </Layout>
    </>
  );
};

export default ViewFormulationPage;

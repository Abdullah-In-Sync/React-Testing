import React, { useState } from "react";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import withAuthentication from "../../../../hoc/auth";
import CreateResource from "../../../../components/common/CreateResource/createResource";

const Index = () => {
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Create Resource" />
        <CreateResource setLoader={setLoader} />
      </Layout>
    </>
  );
};

export default withAuthentication(Index, ["therapist"]);

import { useState } from "react";
import CreateResource from "../../../../components/common/CreateResource/createResource";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import withAuthentication from "../../../../hoc/auth";

const Index = () => {
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <CreateResource setLoader={setLoader} />
      </Layout>
    </>
  );
};

export default withAuthentication(Index, ["admin"]);

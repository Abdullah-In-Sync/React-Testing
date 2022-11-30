import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AddForm from "../../../../components/admin/resource/addForm";
import ContentHeader from "../../../../components/common/ContentHeader";
import Loader from "../../../../components/common/Loader";
import Layout from "../../../../components/layout";
import { CREATE_RESOURCE } from "../../../../graphql/mutation/resource";
import { addResourceFormField } from "../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";
import withAuthentication from "../../../../hoc/auth";
import CreateResource from "../../../../components/common/CreateResource/createResource";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);

  const [createResource] = useMutation(CREATE_RESOURCE);

  const router = useRouter();

  const submitFormHandler = async (formFields: addResourceFormField) => {
    //create resource function
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Create Resource" />
        <CreateResource onSubmit={submitFormHandler} setLoader={setLoader} />
      </Layout>
    </>
  );
};

export default withAuthentication(Index, ["admin"]);

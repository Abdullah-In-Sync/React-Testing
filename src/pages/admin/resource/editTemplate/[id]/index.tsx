import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Layout from "../../../../../components/layout";
import { UPDATE_TEMPLATE_BY_ID } from "../../../../../graphql/mutation/resource";
import { editTemplatesFormField } from "../../../../../utility/types/resource_types";
import { useSnackbar } from "notistack";

import Loader from "../../../../../components/common/Loader";

import EditTemplate from "../../../../../components/common/EditTemplateForm/editTemplateForm";
import withAuthentication from "../../../../../hoc/auth";

const Index = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(false);

  const [updateTemplate] = useMutation(UPDATE_TEMPLATE_BY_ID);

  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query.id as string;

  useEffect(() => {
    setLoader(true);
  }, []);

  const editTemplate = async (e, formFields: editTemplatesFormField) => {
    e.preventDefault();
    setLoader(true);
    try {
      updateTemplate({
        variables: {
          templateId: id,
          update: {
            category: formFields.category,
            name: formFields.name,
          },
        },
        onCompleted: (data) => {
          console.log("data: ", data);
          if (data && data.updateTemplateById) {
            enqueueSnackbar("Template edit successfully", {
              variant: "success",
            });
            router.push("/admin/resource/templateList");
          }
        },
        onError: (error) => {
          /* istanbul ignore next */
          console.log("data error: ", error);
        },
      });

      setLoader(false);
    } catch (e) {
      /* istanbul ignore next */
      setLoader(false);
      /* istanbul ignore next */
      enqueueSnackbar("Please fill the all fields", { variant: "error" });
    }
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Edit Resource" />
        <EditTemplate onSubmit={editTemplate} setLoader={setLoader} />
      </Layout>
    </>
  );
};

export default withAuthentication(Index, ["admin"]);

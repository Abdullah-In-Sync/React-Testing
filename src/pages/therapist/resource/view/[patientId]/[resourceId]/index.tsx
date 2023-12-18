import { useLazyQuery, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../../components/common/ContentHeader";
import Loader from "../../../../../../components/common/Loader";
import Layout from "../../../../../../components/layout";
import PatientEditTemplate from "../../../../../../components/patient/resource/edit";
import { ResourceDataInterface } from "../../../../../../components/patient/resource/edit/patientTemplateEditInterface";
import { THERAPIST_UPDATE_RESOURCE_TEMPLATE_RESPONSE } from "../../../../../../graphql/mutation/resource";
import { GET_PATH_RESOURCE_BY_ID } from "../../../../../../graphql/query/resource";

const PatientEditTemplatePage: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const [updateResourceTemplateResponse] = useMutation(
    THERAPIST_UPDATE_RESOURCE_TEMPLATE_RESPONSE
  );
  const router = useRouter();
  /* istanbul ignore next */
  const { patientId, resourceId } = router.query || {};

  const [
    getPatientResourceDetail,
    { data: { getPatResourceById: { data = [] } = {} } = {} },
  ] = useLazyQuery(GET_PATH_RESOURCE_BY_ID, {
    onCompleted: () => {
      setLoader(false);
    },
  });

  const {
    template_detail: templateDetail,
    resource_data = [],
    template_response: templateResponse,
    _id: ptsharresId,
  } = data[0] || {};
  const resourceData: ResourceDataInterface = resource_data[0];

  const handleSubmitTemplateData = async (value) => {
    setLoader(true);
    try {
      const {
        data: { updatePatientResourceById },
      } = await updateResourceTemplateResponse({
        variables: {
          ptsharresId,
          patientId,
          update: {
            template_response:
              templateDetail.component_name == "ArrowTemplate"
                ? value
                : JSON.stringify(value),
          },
        },
      });
      if (updatePatientResourceById)
        enqueueSnackbar("Patient worksheet has been submitted successfully.", {
          variant: "success",
        });
    } catch {
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    setLoader(true);
    getPatientResourceDetail({
      variables: { resourceId, patientId },
    });
  }, []);

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title={"Resource Detail"} />
        <PatientEditTemplate
          resourceData={resourceData}
          templateDetail={templateDetail}
          templateResponse={templateResponse}
          onSubmit={handleSubmitTemplateData}
          resourceDetailUrl={`/therapist/resource/${resourceId}/${patientId}`}
          arrowTemplatedefaultIsPreview={true}
          defaultUserType={"patient"}
        />
      </Layout>
    </>
  );
};

export default PatientEditTemplatePage;

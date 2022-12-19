import { useLazyQuery, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import ContentHeader from "../../../../../components/common/ContentHeader";
import Loader from "../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../components/common/SuccessModal";
import Layout from "../../../../../components/layout";
import PatientEditTemplate from "../../../../../components/patient/resource/edit";
import {
  ResourceDataInterface,
  TemplateDetailInterface,
} from "../../../../../components/patient/resource/edit/patientTemplateEditInterface";
import { UPDATE_RESOURCE_TEMPLATE_RESPONSE } from "../../../../../graphql/mutation/resource";
import { GET_PATIENT_RESOURCE_TEMPLATE } from "../../../../../graphql/query/resource";

const PatientEditTemplatePage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const [resourceData, setRecourceData] = useState<ResourceDataInterface>();
  const [templateDetail, setTemplateDetail] =
    useState<TemplateDetailInterface>();
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const router = useRouter();

  const id = router?.query?.id as string;

  const [updateResourceTemplateResponse] = useMutation(
    UPDATE_RESOURCE_TEMPLATE_RESPONSE
  );

  const [getPatientResourceTemplate] = useLazyQuery(
    GET_PATIENT_RESOURCE_TEMPLATE,
    {
      onCompleted: (data) => {
        /* istanbul ignore else */
        const resourceDetail = data!.getResourceDetailById[0];
        if (resourceDetail) {
          /* istanbul ignore else */
          setTemplateDetail(resourceDetail?.template_detail);
          setRecourceData(resourceDetail?.resource_data[0]);
        }
        /* istanbul ignore else */
        setLoader(false);
      },
    }
  );

  useEffect(() => {
    getPatientResourceTemplate({
      variables: { ptsharresId: id },
    });
  }, []);

  const handleSubmitTemplateData = async (value) => {
    setLoader(true);
    try {
      const {
        data: { updatePatientResourceById },
      } = await updateResourceTemplateResponse({
        variables: {
          ptsharresId: id,
          update: {
            template_response: JSON.stringify(value),
          },
        },
      });
      if (updatePatientResourceById) setSuccessModal(true);
    } catch {
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader title="Resource Edit" />
        <PatientEditTemplate
          resourceData={resourceData}
          templateDetail={templateDetail}
          onSubmit={handleSubmitTemplateData}
        />
        {successModal && (
          <SuccessModal
            isOpen={successModal}
            onOk={() => setSuccessModal(false)}
          />
        )}
      </Layout>
    </>
  );
};

export default PatientEditTemplatePage;

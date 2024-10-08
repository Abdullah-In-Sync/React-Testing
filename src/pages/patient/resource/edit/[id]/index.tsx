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
  const [templateResponse, setTemplateResponse] = useState<string>();
  const [isViewEnabled, setIsViewEnabled] = useState<boolean>(false);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const router = useRouter();
  /* istanbul ignore next */
  const id = router?.query?.id as string;

  const [updateResourceTemplateResponse] = useMutation(
    UPDATE_RESOURCE_TEMPLATE_RESPONSE
  );

  const [getPatientResourceTemplate] = useLazyQuery(
    GET_PATIENT_RESOURCE_TEMPLATE,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        /* istanbul ignore next */
        if (data!.getResourceDetailById) {
          const resourceDetail = data!.getResourceDetailById.data[0];
          if (resourceDetail) {
            /* istanbul ignore next */
            setTemplateDetail(resourceDetail?.template_detail);
            setRecourceData(resourceDetail?.resource_data[0]);
            setTemplateResponse(resourceDetail?.template_response);
          }
        }
        /* istanbul ignore next */
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
            template_response:
              templateDetail.component_name == "ArrowTemplate"
                ? value
                : JSON.stringify(value),
          },
        },
      });
      /* istanbul ignore next */
      if (updatePatientResourceById) setSuccessModal(true);
    } catch {
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      setLoader(false);
    }
  };

  const handleViewOpen = () => {
    setIsViewEnabled(!isViewEnabled);
  };

  /* istanbul ignore next */
  const handleSuccessOk = () => {
    router.back();
    setSuccessModal(false);
  };
  /* istanbul ignore next */
  const onPressBack = () => {
    router.back();
  };

  return (
    <>
      <Layout>
        <Loader visible={loader} />
        <ContentHeader
          title={
            /* istanbul ignore next */
            `${isViewEnabled ? "Resource Preview" : "Resource Edit"}`
          }
        />
        <PatientEditTemplate
          resourceData={resourceData}
          templateDetail={templateDetail}
          templateResponse={templateResponse}
          onSubmit={handleSubmitTemplateData}
          onClickView={handleViewOpen}
          mode={`${isViewEnabled ? "patientView" : "edit"}`}
          onPressBack={onPressBack}
        />
        {
          /* istanbul ignore next */
          successModal && (
            <SuccessModal
              isOpen={successModal}
              description={"Your worksheet has been submitted successfully."}
              onOk={handleSuccessOk}
            />
          )
        }
      </Layout>
    </>
  );
};

export default PatientEditTemplatePage;

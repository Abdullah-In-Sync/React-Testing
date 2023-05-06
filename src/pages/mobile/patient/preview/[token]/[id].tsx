import { useLazyQuery, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import PatientEditTemplate from "../../../../../components/patient/resource/edit";
import {
  ResourceDataInterface,
  TemplateDetailInterface,
} from "../../../../../components/patient/resource/edit/patientTemplateEditInterface";
import { UPDATE_RESOURCE_TEMPLATE_RESPONSE } from "../../../../../graphql/mutation/resource";
import { GET_PATIENT_RESOURCE_TEMPLATE } from "../../../../../graphql/query/resource";

import Loader from "../../../../../components/common/Loader";
import { SuccessModal } from "../../../../../components/common/SuccessModal";
import TemplateArrow from "../../../../../components/templateArrow";
import Cookies from "js-cookie";

const PatientMobileArrowTemplatePage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const [resourceData, setRecourceData] = useState<ResourceDataInterface>();
  const [templateDetail, setTemplateDetail] =
    useState<TemplateDetailInterface>();
  const [templateResponse, setTemplateResponse] = useState<string>();
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const router = useRouter();

  const id = router?.query?.id as string;

  const [updateResourceTemplateResponse] = useMutation(
    UPDATE_RESOURCE_TEMPLATE_RESPONSE
  );

  const [getPatientResourceTemplate] = useLazyQuery(
    GET_PATIENT_RESOURCE_TEMPLATE,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        /* istanbul ignore else */
        if (data!.getResourceDetailById) {
          const resourceDetail = data!.getResourceDetailById[0];
          if (resourceDetail) {
            /* istanbul ignore else */
            setTemplateDetail(resourceDetail?.template_detail);
            setRecourceData(resourceDetail?.resource_data[0]);
            setTemplateResponse(resourceDetail?.template_response);
          }
        }
        /* istanbul ignore else */
        setLoader(false);
      },
    }
  );
  const token = router.query.token as string;

  useEffect(() => {
    Cookies.set("myhelptoken", token);
    Cookies.set("user_type", "patient");
    if (token !== undefined) {
      getPatientResourceTemplate({
        variables: { ptsharresId: id },
      });
    }
  }, [token]);

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
      if (updatePatientResourceById) setSuccessModal(true);
    } catch {
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      setLoader(false);
    }
  };

  const handleSuccessOk = () => {
    router.push(`/patient/therapy/?tab=resources`);
    setSuccessModal(false);
  };
  const templateData =
    templateResponse && templateResponse !== ""
      ? templateResponse
      : resourceData?.template_data;

  const resourceDetailUrl = `/patient/therapy/?tab=resources`;

  return (
    <>
      <Loader visible={loader} />
      {templateDetail?.component_name == "ArrowTemplate" && (
        <TemplateArrow
          mode="mobile"
          nodesData={JSON.parse(templateData).nodes}
          edgesData={JSON.parse(templateData).edges}
          onSubmit={handleSubmitTemplateData}
          onCancel={() => router.push(resourceDetailUrl)}
          userType="patient"
        />
      )}
      {successModal && (
        <SuccessModal
          isOpen={successModal}
          description={"Your worksheet has been submitted successfully."}
          onOk={handleSuccessOk}
        />
      )}
    </>
  );
};

export default PatientMobileArrowTemplatePage;

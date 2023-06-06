import { useLazyQuery, useMutation } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {
  ResourceDataInterface,
  TemplateDetailInterface,
} from "../../../../components/patient/resource/edit/patientTemplateEditInterface";
import { UPDATE_RESOURCE_TEMPLATE_RESPONSE } from "../../../../graphql/mutation/resource";
import { GET_PATIENT_RESOURCE_TEMPLATE } from "../../../../graphql/query/resource";
import Loader from "../../../../components/common/Loader";
import TemplateArrow from "../../../../components/templateArrow";
import Cookies from "js-cookie";
import ConfirmationModal from "../../../../components/common/ConfirmationModal";

const PatientMobileArrowTemplatePage: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState<boolean>(true);
  const [resourceData, setRecourceData] = useState<ResourceDataInterface>();
  const [templateDetail, setTemplateDetail] =
    useState<TemplateDetailInterface>();
  const [templateResponse, setTemplateResponse] = useState<string>();
  const router = useRouter();
  const [isConfirm, setIsConfirm] = useState({
    confirm: false,
    data: "",
  });

  const id = router?.query?.sourceId as string;
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

  const handleToken = (event) => {
    if (event?.target?.value) {
      Cookies.set("myhelptoken", event?.target?.value);
      Cookies.set("user_type", "patient");
      getPatientResourceTemplate({
        variables: { ptsharresId: id },
      });
    }
  };

  const handleSubmitTemplateData = async (value) => {
    setIsConfirm({
      confirm: true,
      data: value,
    });
  };

  const clearIsConfirm = () => {
    setIsConfirm({
      confirm: false,
      data: "",
    });
  };

  const onConfirmSubmit = async () => {
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
                ? isConfirm.data
                : JSON.stringify(isConfirm.data),
          },
        },
      });
      if (updatePatientResourceById) {
        //to send event to mobile app
        const cancelData = {
          msg: "",
          type: "success",
          data: updatePatientResourceById,
        };
        console.log(cancelData);
      }
    } catch {
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      setLoader(false);
      setIsConfirm({
        confirm: false,
        data: "",
      });
    }
  };

  const oncancelEvent = () => {
    //to send event to mobile app
    const cancelData = { msg: "", type: "cancel" };
    console.log(cancelData);
  };
  const templateData =
    templateResponse && templateResponse !== ""
      ? templateResponse
      : resourceData?.template_data;

  return (
    <>
      <input
        id="token"
        data-testid="tokenInput"
        type="hidden"
        onClick={handleToken}
      />
      <Loader visible={loader} />
      {templateDetail?.component_name == "ArrowTemplate" && (
        <TemplateArrow
          mode="mobile"
          nodesData={JSON.parse(templateData).nodes}
          edgesData={JSON.parse(templateData).edges}
          onSubmit={handleSubmitTemplateData}
          onCancel={oncancelEvent}
          userType="patient"
        />
      )}
      {isConfirm.confirm && (
        <ConfirmationModal
          label="Are you sure?"
          description="you want to save response"
          onCancel={clearIsConfirm}
          onConfirm={onConfirmSubmit}
          mode="mobile"
        />
      )}
    </>
  );
};

export default PatientMobileArrowTemplatePage;

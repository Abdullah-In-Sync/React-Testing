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
import {
  GET_FORMULATION_BY_SHARE_ID,
  UPDATE_PAT_FORMULATION_BY_ID,
} from "../../../../graphql/formulation/graphql";

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
  /* istanbul ignore next */
  const id = router?.query?.sourceId as string;
  /* istanbul ignore next */
  const isFormulation = router?.query?.isFormulation;
  /* istanbul ignore next */
  const updateKey = isFormulation ? "updateShareForm" : "update";
  /* istanbul ignore next */
  const resKey = isFormulation
    ? "updatePatFormulationById"
    : "updatePatientResourceById";
  const [updateResourceTemplateResponse] = useMutation(
    isFormulation
      ? UPDATE_PAT_FORMULATION_BY_ID
      : UPDATE_RESOURCE_TEMPLATE_RESPONSE
  );

  const [getPatientResourceTemplate] = useLazyQuery(
    isFormulation ? GET_FORMULATION_BY_SHARE_ID : GET_PATIENT_RESOURCE_TEMPLATE,
    {
      fetchPolicy: "network-only",
      onCompleted: (data) => {
        /* istanbul ignore next */
        if (data.getResourceDetailById) {
          const resourceDetail = data.getResourceDetailById.data[0];
          /* istanbul ignore next */
          if (resourceDetail) {
            /* istanbul ignore next */
            setTemplateDetail(resourceDetail.template_detail);
            setRecourceData(resourceDetail.resource_data[0]);
            setTemplateResponse(resourceDetail.template_response);
          }
        }
        /* istanbul ignore next */
        if (data.getFormulationByShareId) {
          const formulationDetail = data.getFormulationByShareId[0];
          if (formulationDetail) {
            /* istanbul ignore next */
            setTemplateDetail(formulationDetail.template_detail);
            setRecourceData(formulationDetail.formulation_data[0]);
            setTemplateResponse(formulationDetail.template_response);
          }
        }
        /* istanbul ignore next */
        setLoader(false);
      },
    }
  );
  const secureSetCookies = (key: string, value: string) => {
    Cookies.set(key, value, {
      secure: true,
      sameSite: "strict",
    });
  };

  const handleToken = (event) => {
    /* istanbul ignore next */
    if (event?.target?.value) {
      secureSetCookies("myhelptoken", event.target.value);
      secureSetCookies("user_type", "patient");
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

  /* istanbul ignore next */
  const clearIsConfirm = () => {
    setIsConfirm({
      confirm: false,
      data: "",
    });
  };

  /* istanbul ignore next */
  const onConfirmSubmit = async () => {
    setLoader(true);
    try {
      const {
        data: { [resKey]: updatedData },
      } = await updateResourceTemplateResponse({
        variables: {
          ptsharresId: id,
          [updateKey]: {
            template_response:
              templateDetail.component_name == "ArrowTemplate"
                ? isConfirm.data
                : JSON.stringify(isConfirm.data),
          },
        },
      });
      /* istanbul ignore next */
      if (updatedData) {
        //to send event to mobile app
        const cancelData = {
          msg: "",
          type: "success",
          data: updatedData,
        };
        console.log(cancelData, "event data");
      }
    } catch {
      /* istanbul ignore next */
      enqueueSnackbar("Server error please try later.", { variant: "error" });
    } finally {
      /* istanbul ignore next */
      setLoader(false);
      setIsConfirm({
        confirm: false,
        data: "",
      });
    }
  };

  /* istanbul ignore next */
  const oncancelEvent = () => {
    //to send event to mobile app
    const cancelData = { msg: "", type: "cancel" };
    console.log(cancelData);
  };
  /* istanbul ignore next */
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
      {
        /* istanbul ignore next */
        templateDetail?.component_name == "ArrowTemplate" && (
          <TemplateArrow
            mode="mobile"
            nodesData={JSON.parse(templateData).nodes}
            edgesData={JSON.parse(templateData).edges}
            onSubmit={handleSubmitTemplateData}
            onCancel={oncancelEvent}
            userType="patient"
          />
        )
      }
      {
        /* istanbul ignore next */
        isConfirm.confirm && (
          <ConfirmationModal
            label="Are you sure?"
            description="you want to save response"
            onCancel={clearIsConfirm}
            onConfirm={onConfirmSubmit}
            mode="mobile"
          />
        )
      }
    </>
  );
};

export default PatientMobileArrowTemplatePage;

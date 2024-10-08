import { useRouter } from "next/router";
import React from "react";
import { TemplateFormData } from "../../../templateTable/table.model";

import BreadCrumbsWithBackButton from "../../../common/BreadCrumbsWithBackButton";
import { templateComponents } from "./patientTemplateData";

import * as PatientTemplateInterface from "./patientTemplateEditInterface";

import { useAppContext } from "../../../../contexts/AuthContext";
import TemplateArrow from "../../../templateArrow";

interface ViewProps {
  resourceData?: PatientTemplateInterface.ResourceDataInterface;
  templateDetail?: PatientTemplateInterface.TemplateDetailInterface;
  templateResponse?: string;
  onSubmit?: (v) => void;
  onClickView?: () => void;
  mode?: string;
  onPressBack?: () => void;
  resourceDetailUrl?: string;
  arrowTemplatedefaultIsPreview?: boolean;
  defaultUserType?: string;
}

const PatientTemplateEdit: React.FC<ViewProps> = ({
  resourceData,
  templateDetail,
  templateResponse,
  onSubmit,
  onClickView,
  mode,
  onPressBack,
  resourceDetailUrl = `/patient/therapy/?mainTab=therapy&tab=resources`,
  arrowTemplatedefaultIsPreview,
  defaultUserType,
}) => {
  const { user: { user_type: userType = "patient" } = {} } = useAppContext();
  const router = useRouter();
  const onClickViewProps = { ...(mode === "edit" && { onClickView }) };

  const TemplateDynamic = templateComponents[templateDetail?.component_name];
  const templateData =
    templateResponse && templateResponse !== ""
      ? templateResponse
      : resourceData?.template_data;
  const staticTemplate: TemplateFormData =
    templateData && JSON.parse(templateData);

  const handleBackButton = (): any => {
    const fromUrl = router?.query?.from as string;
    return mode !== "edit" && onClickView
      ? onClickView()
      : fromUrl
      ? router.push(fromUrl)
      : router.back();
  };

  return (
    <>
      <BreadCrumbsWithBackButton
        heading={resourceData?.resource_name || ""}
        breadCrumbsLabels={[
          "Diorder Name",
          "Model Name",
          resourceData?.resource_name || "",
        ]}
        backButtonClick={onPressBack ? onPressBack : handleBackButton}
        {...onClickViewProps}
        mode={
          templateDetail?.component_name == "ArrowTemplate" ? "arrowView" : ""
        }
      >
        {staticTemplate &&
          TemplateDynamic &&
          templateDetail?.component_name == "TemplateTable" && (
            <TemplateDynamic
              mode={mode}
              initialData={staticTemplate}
              onSubmit={onSubmit}
              userType={userType}
              onCancel={() => router.push(resourceDetailUrl)}
            />
          )}
        {templateDetail?.component_name == "ArrowTemplate" && (
          <TemplateArrow
            mode={"patientView"}
            nodesData={JSON.parse(templateData).nodes}
            edgesData={JSON.parse(templateData).edges}
            onSubmit={onSubmit}
            onCancel={() => router.push(resourceDetailUrl)}
            userType={defaultUserType ? defaultUserType : userType}
            defaultIsPreview={arrowTemplatedefaultIsPreview}
          />
        )}
      </BreadCrumbsWithBackButton>
    </>
  );
};

export default PatientTemplateEdit;

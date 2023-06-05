import { useRouter } from "next/router";
import React from "react";
import { TemplateFormData } from "../../../templateTable/table.model";

import BreadCrumbsWithBackButton from "../../../common/BreadCrumbsWithBackButton";
import { templateComponents } from "./patientTemplateData";

import * as PaitentTemplateInterface from "./patientTemplateEditInterface";

import { useAppContext } from "../../../../contexts/AuthContext";
import TemplateArrow from "../../../templateArrow";

interface ViewProps {
  resourceData?: PaitentTemplateInterface.ResourceDataInterface;
  templateDetail?: PaitentTemplateInterface.TemplateDetailInterface;
  templateResponse?: string;
  onSubmit?: (v) => void;
  onClickView?: () => void;
  mode?: string;
  onPressBack?: () => void;
}

const PaitentTemplateEdit: React.FC<ViewProps> = ({
  resourceData,
  templateDetail,
  templateResponse,
  onSubmit,
  onClickView,
  mode,
  onPressBack,
}) => {
  const { user: { user_type: userType = "patient" } = {} } = useAppContext();
  const router = useRouter();
  const onClickViewProps = { ...(mode === "edit" && { onClickView }) };
  const resourceDetailUrl = `/patient/therapy/?tab=resources`;

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
            mode={`${mode == "patientView" ? "patientView" : "edit"}`}
            nodesData={JSON.parse(templateData).nodes}
            edgesData={JSON.parse(templateData).edges}
            onSubmit={onSubmit}
            onCancel={() => router.push(resourceDetailUrl)}
            userType={userType}
          />
        )}
      </BreadCrumbsWithBackButton>
    </>
  );
};

export default PaitentTemplateEdit;

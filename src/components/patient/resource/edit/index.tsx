import { useRouter } from "next/router";
import React from "react";
import { TemplateFormData } from "../../../templateTable/table.model";

import BreadCrumbsWithBackButton from "../../../common/BreadCrumbsWithBackButton";
import { templateComponents } from "./patientTemplateData";

import * as PaitentTemplateInterface from "./patientTemplateEditInterface";

import { useAppContext } from "../../../../contexts/AuthContext";

interface ViewProps {
  resourceData?: PaitentTemplateInterface.ResourceDataInterface;
  templateDetail?: PaitentTemplateInterface.TemplateDetailInterface;
  templateResponse?: string;
  onSubmit?: (v) => void;
  onClickView?: () => void;
  mode?: string;
}

const PaitentTemplateEdit: React.FC<ViewProps> = ({
  resourceData,
  templateDetail,
  templateResponse,
  onSubmit,
  onClickView,
  mode,
}) => {
  const { user: { user_type: userType = "patient" } = {} } = useAppContext();
  const router = useRouter();
  const id = router?.query?.id as string;
  const onClickViewProps = { ...(mode === "edit" && { onClickView }) };
  const resourceDetailUrl = `/patient/resource/${id}/?tabName=work-sheet`;

  const TemplateDynamic = templateComponents[templateDetail?.component_name];
  const templateData =
    templateResponse && templateResponse !== ""
      ? templateResponse
      : resourceData?.template_data;
  const staticTemplate: TemplateFormData =
    templateData && JSON.parse(templateData);

  const handleBackButton = (): any => {
    return mode !== "edit" ? onClickView() : router.push(resourceDetailUrl);
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
        backButtonClick={handleBackButton}
        {...onClickViewProps}
      >
        {staticTemplate && TemplateDynamic && (
          <TemplateDynamic
            mode={mode}
            initialData={staticTemplate}
            onSubmit={onSubmit}
            userType={userType}
            onCancel={() => router.push(resourceDetailUrl)}
          />
        )}
      </BreadCrumbsWithBackButton>
    </>
  );
};

export default PaitentTemplateEdit;

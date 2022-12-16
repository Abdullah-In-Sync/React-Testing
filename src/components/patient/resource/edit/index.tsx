import { useRouter } from "next/router";
import React from "react";
import { TemplateFormData } from "../../../templateTable/table.model";

import BreadCrumbsWithBackButton from "../../../common/BreadCrumbsWithBackButton";
import { templateComponents } from "./paitentTemplateData";

import * as PaitentTemplateInterface from "./patientTemplateEditInterface";

import { useAppContext } from "../../../../contexts/AuthContext";

interface ViewProps {
  resourceData?: PaitentTemplateInterface.ResourceDataInterface;
  templateDetail?: PaitentTemplateInterface.TemplateDetailInterface;
  onSubmit?: (v) => void;
}

const PaitentTemplateEdit: React.FC<ViewProps> = ({
  resourceData,
  templateDetail,
  onSubmit,
}) => {
  const { user: { user_type: userType } = {} } = useAppContext();
  const router = useRouter();
  const id = router?.query?.id as string;
  const TemplateDynamic = templateComponents[templateDetail?.component_name];

  const staticTemplate: TemplateFormData =
    resourceData?.template_data && JSON.parse(resourceData?.template_data);

  return (
    <>
      <BreadCrumbsWithBackButton
        heading={resourceData?.resource_name || ""}
        breadCrumbsLabels={[
          "Diorder Name",
          "Model Name",
          resourceData?.resource_name || "",
        ]}
        backButtonClick={() => {
          /* istanbul ignore else */
          router.push(`/patient/resource/${id}/?tabName=work-sheet`);
          /* istanbul ignore else */
        }}
      >
        {staticTemplate && TemplateDynamic && (
          <TemplateDynamic
            mode="edit"
            initialData={staticTemplate}
            onSubmit={onSubmit}
            userType={userType}
          />
        )}
      </BreadCrumbsWithBackButton>
    </>
  );
};

export default PaitentTemplateEdit;
